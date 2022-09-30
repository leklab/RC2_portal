/* eslint-disable camelcase */

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql'



const metaboliteType = new GraphQLObjectType({
  name: 'Metabolite',
  fields: () => ({
    comp_id: { type: GraphQLString },
    biochemical: { type: GraphQLString },
    kegg: { type: GraphQLString },
    group_hmdb: {type: GraphQLString},
    pubchem: { type: GraphQLString },
    super_pathway: { type: GraphQLString },
    

  }),
})

export default metaboliteType

export const lookupMetaboliteByCompId = (db, comp_id) =>
  db.collection('metabolites').findOne({ comp_id })

