import {   
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
 } from 'graphql'

import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import shapeMetaboliteRecord from '../datasets/shapeMetaboliteRecord'

export const metaboliteRecordType = new GraphQLObjectType({
  name: 'MetaboliteRecord',
  fields: {
    comp_id: { type: GraphQLString },
    ctrl_values: { type: new GraphQLList(GraphQLFloat) },
    exp_values: { type: new GraphQLList(GraphQLFloat) }
  },
});

export const fetchRecordDetails = async (ctx, comp_id) => {

  const response = await ctx.database.elastic.search({
    index: 'metabolite_record',
    size: 1,
    body: {
        query : {
            query_string: {
                default_field: 'comp_id',
                query: comp_id
            } 
        }
    },
  })

  const doc = response.hits.hits[0]
  console.log(doc)

  return doc ? doc._source : null // eslint-disable-line no-underscore-dangle

}