
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
import {metaboliteExpressionType, fetchMetaboliteExpressionDetails} from './types/metaboliteExpression'
import {metaboliteRecordType, fetchRecordDetails} from './types/metaboliteRecord'
import {trapGeneType, fetchTrapGeneDetails} from './types/trapGenes'

import geneType, {
  lookupGeneByGeneId,
  lookupGeneByName,
} from './types/gene'



import metaboliteType, {
  lookupMetaboliteByCompId,
} from './types/metabolite'

import { withCache } from '../utilities/redis'

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
        console.log("In diff_expression resolve")
        return withCache(ctx, `diff_exp:${args.genotype1}_${args.genotype2}_${args.time_point}_${args.sex}`, async () => {
          return fetchDiffExpressionDetails(ctx, args.time_point, args.genotype1, args.genotype2, args.sex)
        })
      },
    },

    metabolite_expression : {
      description: 'Look up metabolite expression',
      type: new GraphQLList(metaboliteExpressionType),

      args: {
        time_point: { type: GraphQLString },
        genotype1: { type: GraphQLString },
        genotype2: { type: GraphQLString },        
        sex: { type: GraphQLString }              
      },
      resolve: (obj, args, ctx) => {
        return fetchMetaboliteExpressionDetails(ctx, args.time_point, args.genotype1, args.genotype2, args.sex)
      },
    },

    metabolite_record : {
      description: 'Look up metabolite expression by comp id',
      type: metaboliteRecordType,

      args: {
        comp_id: { type: GraphQLString }         
      },
      resolve: (obj, args, ctx) => {
        return fetchRecordDetails(ctx, args.comp_id)
      },
    },

    trap_genes : {
      description: 'Look up Differential Expression in candidate TRAP genes',
      type: new GraphQLList(trapGeneType),

      args: {
        mouse_model: { type: GraphQLString }, 
        time_point: { type: GraphQLString },
        sex: { type: GraphQLString }              
      },
      resolve: (obj, args, ctx) => {
        return fetchTrapGeneDetails(ctx, args.mouse_model, args.time_point, args.sex)
      },
    },

   
    metabolite: {
      description: 'Look up metabolite by comp ID',
      type: metaboliteType,
      args: {
        comp_id: { type: GraphQLString },
      },
      resolve: (obj, args, ctx) => {
        if (args.comp_id) {
          return lookupMetaboliteByCompId(ctx.database.mouse_db, args.comp_id)
        }
        return 'No lookup found'
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
