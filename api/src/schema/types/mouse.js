
var {   
	GraphQLObjectType,
	GraphQLString,
 } = require('graphql');


export const mouseType = new GraphQLObjectType({
  name: 'MouseDetails',
  fields: {
    mouse_id: { type: GraphQLString },
    age: { type: GraphQLString },
    genotype: { type: GraphQLString },
    phenotype: { type: GraphQLString },
  },
});

export const fetchMouseDetails = async (ctx, mouse_id) => {

  const response = await ctx.database.elastic.search({
    index: 'mouse_details',
    type: '_doc',
    size: 1,
    body: {
        query : {
            query_string: {
                default_field: 'mouse_id',
                query: mouse_id
            }
        }
    },
  })

  const doc = response.hits.hits[0]
  console.log(doc)

  return doc ? doc._source : null // eslint-disable-line no-underscore-dangle
}
