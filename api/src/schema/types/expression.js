
/*
var {   
	GraphQLObjectType,
	GraphQLString,
  GraphQLInt,
 } = require('graphql');

*/


import {   
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
 } from 'graphql'


import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import shapeExpression from '../datasets/shapeExpression'

export const expressionType = new GraphQLObjectType({
  name: 'RNAExpression',
  fields: {
    gene_id: { type: GraphQLString },
    mouse_id: { type: GraphQLString },
    read_count: { type: GraphQLInt },
  },
});

export const fetchExpressionDetails = async (ctx, gene_id) => {

  console.log("in here")

  //const response = await ctx.database.elastic.search({

  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'transcript_expression',
    type: '_doc',
    size: 1,
    body: {
        query : {
            query_string: {
                default_field: 'gene_id',
                query: gene_id
            }
        }
    },
  })

  const data = hits.map(shapeExpression())
  //const doc = response.hits._source[0]
  //console.log(data)
  //console.log(hits)


  //return doc ? doc._source : null // eslint-disable-line no-underscore-dangle
  return data

}
