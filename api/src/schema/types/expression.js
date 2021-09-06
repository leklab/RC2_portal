
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
  GraphQLList,
  GraphQLFloat,
 } from 'graphql'


import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import shapeExpression from '../datasets/shapeExpression'

export const expressionType = new GraphQLObjectType({
  name: 'RNAExpression',
  fields: {
    gene_id: { type: GraphQLString },
    genotype: { type: GraphQLString },
    phenotype: { type: GraphQLString },
    time_point: { type: GraphQLString },
    rpkm: { type: new GraphQLList(GraphQLFloat) },
    //read_count: { type: new GraphQLList(GraphQLInt) },
  },
});

export const fetchExpressionDetails = async (ctx, gene_id) => {

  console.log("in here " + gene_id)

  //const response = await ctx.database.elastic.search({

  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'transcript_expression_v2',
    type: '_doc',
    size: 1,
    body: {
        query : {
            query_string: {
                default_field: 'gene_id',
                query: gene_id
            },
        }
    },
  })

  //const doc = response.hits._source[0]
  console.log(hits)
  
  const data = hits.map(shapeExpression())
  console.log(data)


  //return doc ? doc._source : null // eslint-disable-line no-underscore-dangle
  return data

}
