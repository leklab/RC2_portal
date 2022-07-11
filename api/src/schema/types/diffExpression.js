import {   
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
 } from 'graphql'


import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import shapeDiffExpression from '../datasets/shapeDiffExpression'

export const diffExpressionType = new GraphQLObjectType({
  name: 'DiffExpression',
  fields: {
    gene_id: { type: GraphQLString },
    gene_name: { type: GraphQLString },
    genotype1: { type: GraphQLString },
    genotype2: { type: GraphQLString },
    time_point: { type: GraphQLString },
    sex: { type: GraphQLString },
    logfc: { type: GraphQLFloat },
    pvalue: { type: GraphQLFloat },
    avg_expression: { type: GraphQLFloat },    
  },
});

export const fetchDiffExpressionDetails = async (ctx, time_point,genotype1,genotype2,sex) => {

  console.log("in here " + time_point)

  //const response = await ctx.database.elastic.search({

  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'diff_expression_v5',
    type: '_doc',
    size: 1,
    body: {
      query : {
        bool: {
          filter: [
            {term: { time_point: time_point}},
            {term: { genotype1: genotype1}},
            {term: { genotype2: genotype2}},
            {term: { sex: sex}},
            { range: { [`pvalue`]: { lt: 0.05 } } },
          ]
        },
      },
    },
  })

  //const doc = response.hits._source[0]
  console.log(hits)
  
  const data = hits.map(shapeDiffExpression())
  console.log(data)


  //return doc ? doc._source : null // eslint-disable-line no-underscore-dangle
  return data

}
