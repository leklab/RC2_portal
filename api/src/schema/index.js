
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
import {diffExpressionType, fetchDiffExpressionDetails} from './types/diffExpression'
import {trapGeneType, fetchTrapGeneDetails} from './types/trapGenes'

import geneType, {
  lookupGeneByGeneId,
  lookupGeneByName,
} from './types/gene'

/*
import transcriptType, {
  lookupTranscriptsByTranscriptId,
} from './types/transcript'
*/

//import regionType from './types/region'
import { SearchResultType, resolveSearchResults } from './types/search'


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

    expression : {
      description: 'Look up RNA Expression by gene ID',
      type: new GraphQLList(expressionType),

      args: {
        gene_id: { type: GraphQLString },
      },
      resolve: (obj, args, ctx) => {
        return fetchExpressionDetails(ctx, args.gene_id)
      },
    },

    diff_expression : {
      description: 'Look up Differential Expression by timepoint',
      type: new GraphQLList(diffExpressionType),

      args: {
        time_point: { type: GraphQLString },
        genotype1: { type: GraphQLString },
        genotype2: { type: GraphQLString },        
        sex: { type: GraphQLString }              
      },
      resolve: (obj, args, ctx) => {
        return fetchDiffExpressionDetails(ctx, args.time_point, args.genotype1, args.genotype2, args.sex)
      },
    },

    trap_genes : {
      description: 'Look up Differential Expression in candidate TRAP genes',
      type: new GraphQLList(trapGeneType),

      args: {
        time_point: { type: GraphQLString },
        sex: { type: GraphQLString }              
      },
      resolve: (obj, args, ctx) => {
        return fetchTrapGeneDetails(ctx, args.time_point, args.sex)
      },
    },


    gene: {
      description: 'Look up variant data by gene name. Example: Actn4.',
      type: geneType,
      args: {
        gene_name: { type: GraphQLString },
        gene_id: { type: GraphQLString },
        filter: { type: GraphQLString },
      },
      resolve: (obj, args, ctx) => {
        if (args.gene_name) {
          return lookupGeneByName(ctx.database.mouse_db, args.gene_name)
        }
        if (args.gene_id) {
          return lookupGeneByGeneId(ctx.database.mouse_db, args.gene_id)
        }
        return 'No lookup found'
      },
    },

    /*
    transcript: {
      description: 'Look up variant data by transcript ID. Example: ENST00000407236.',
      type: transcriptType,
      args: {
        transcript_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, ctx) => {
        return lookupTranscriptsByTranscriptId(ctx.database.mouse_db, args.transcript_id)
      },
    },
    */
    
    searchResults: {
      type: new GraphQLList(SearchResultType),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, ctx) => resolveSearchResults(ctx, args.query),
    },
    
  }),
})

const Schema = new GraphQLSchema({
  query: rootType,
  types: [mouseType],
  //types: datasetSpecificTypes,
})

export default Schema
