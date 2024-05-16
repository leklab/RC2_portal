import {   
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
 } from 'graphql'



import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import shapeTrapGenes from '../datasets/shapeTrapGenes'

export const trapGeneType = new GraphQLObjectType({
  name: 'TrapGene',
  fields: {
    gene_id: { type: GraphQLString },
    gene_name: { type: GraphQLString },
    mouse_model: { type: GraphQLString },
    time_point: { type: GraphQLString },
    sex: { type: GraphQLString },
    sko_expr: { type: GraphQLFloat },
    dko_expr: { type: GraphQLFloat },
    wt_expr: { type: GraphQLFloat },
    sig_code: { type: GraphQLString },
    direction: { type: GraphQLString }
  },
});

export const fetchTrapGeneDetails = async (ctx, mouse_model,time_point,sex) => {

  console.log("in here " + time_point)

  //const response = await ctx.database.elastic.search({

  const hits = await fetchAllSearchResults(ctx.database.elastic, {
    index: 'trap_genes_v5',
    type: '_doc',
    size: 1,
    body: {
      query : {
        bool: {
          filter: [
            {term: { mouse_model: mouse_model}},
            {term: { time_point: time_point}},
            {term: { sex: sex}}
          ]
        },
      },
    },
  })

  //const doc = response.hits._source[0]
  console.log(hits)
  
  const data = hits.map(shapeTrapGenes())
  console.log(data)


  //return doc ? doc._source : null // eslint-disable-line no-underscore-dangle
  return data

}
