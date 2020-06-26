
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'


import {mouseType, fetchMouseDetails} from './types/mouse'
import {expressionType, fetchExpressionDetails} from './types/expression'

const rootType = new GraphQLObjectType({
  name: 'Root',
  description: `
The fields below allow for different ways to look up RC2 data.
  `,
  fields: () => ({

    mouse: {
      description: 'Look up mouse data by mouse ID',
      type: mouseType,
      args: {
        mouse_id: { type: GraphQLString },
      },
      resolve: (obj, args, ctx) => {
      	return fetchMouseDetails(ctx, args.mouse_id)
      },
    },

    transcript : {
      description: 'Look up RNA Exoression by gene ID',
      type: new GraphQLList(expressionType),

      args: {
        gene_id: { type: GraphQLString },
      },
      resolve: (obj, args, ctx) => {
        return fetchExpressionDetails(ctx, args.gene_id)
      },
    }



  }),
})

const Schema = new GraphQLSchema({
  query: rootType,
  types: [mouseType],
  //types: datasetSpecificTypes,
})

export default Schema
