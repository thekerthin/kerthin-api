import { PaginationRepository } from './PaginationRepository';

export abstract class PaginationOptions {
  limit?: number;
  offset?: number;

  first?: number;
  after?: string;

  last: number;
  before: string;

  getOffset?: () => { offset: number };
  getPage?: () => number;
}

export abstract class Edge<T> {
  node?: T;
  cursor?: string;
}

export abstract class PageInfo {
  startCursor?: string;
  hasNextPage?: boolean;
  endCursor?: string;
  hasPreviousPage?: boolean;
}

export abstract class PaginationResult<T> {
  totalCount: number;
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

const encode = (value: any): string => {
  return Buffer.from(JSON.stringify(value)).toString('base64');
};

const decode = (value: string): any => {
  return JSON.parse(Buffer.from(value, 'base64').toString());
};

const addOptionsFns = (options: PaginationOptions): PaginationOptions => {
  options.getOffset = (): any => {
    if (options.offset) return { offset: options.offset };
    if (options.after) return { offset: decode(options.after).offset };
    if (options.before) return { offset: decode(options.before).offset };

    return {};
  };

  options.getPage = () => {
    let metadata: any = {};
    if (options.after) metadata = decode(options.after);
    if (options.before) metadata = decode(options.before);

    return metadata.page ? metadata.page : 0;
  };

  return options;
};

const buildEdges = <T = any>(edges: T[]): Edge<T>[] => {
  return edges.map((edge: any) => ({
    cursor: edge.id || edge._id, // FIXME: fix this
    node: edge,
  }));
};

const buildPageInfo = (options: PaginationOptions, count: number): PageInfo => {
  let startCursor = null;
  let hasNextPage = false;
  let endCursor = null;
  let hasPreviousPage = false;

  if (options.last) {
    const last = Number(options.last);
    const currentPage = options.getPage();
    const cursor = { offset: last * (currentPage + 1), page: currentPage - 1 };

    hasPreviousPage = count > cursor.offset;
    endCursor = encode(cursor);
  }
  if (options.first && options.after) {
    const afterDecoded = decode(options.after);
    const first = Number(options.first);
    const page = Number(afterDecoded.page);
    const pages = Math.floor(count / first);
    hasPreviousPage = pages > 1 && page + 1 > 1;
  }
  if (options.first) {
    const first = Number(options.first);
    const currentPage = options.getPage();
    const cursor = { offset: first * (currentPage + 1), page: currentPage + 1 };

    hasNextPage = count > cursor.offset;
    startCursor = encode(cursor);
  }
  if (options.last && options.before) {
    const beforeDecoded = decode(options.before);
    const last = Number(options.last);
    const page = Number(beforeDecoded.page);
    const pages = Math.floor(count / last);
    hasNextPage = pages > 1 && pages > page;
  }

  return {
    startCursor,
    hasNextPage,
    endCursor,
    hasPreviousPage,
  };
};

export const pagination = async <T = any>(
  repo: PaginationRepository<T>,
  options: PaginationOptions,
): Promise<PaginationResult<T>> => {
  const _options = addOptionsFns(options);
  const [items, count] = await repo.findAndCount(_options);
  const totalCount = count;
  const edges = buildEdges<T>(items);
  const pageInfo = buildPageInfo(options, count);

  return {
    totalCount,
    edges,
    pageInfo,
  };
};
