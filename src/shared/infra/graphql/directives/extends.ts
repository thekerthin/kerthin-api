import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLObjectType } from 'graphql';

export class ExtendsDirective extends SchemaDirectiveVisitor {
  visitObject(type: GraphQLObjectType) {
    const fields = type.getFields();
    const baseType = this.schema.getTypeMap()[this.args.type] as any;
    Object.entries(baseType.getFields()).forEach(([name, field]: any) => {
      if (fields[name] === undefined) {
        fields[name] = { ...field };
      }
    });
  }
}
