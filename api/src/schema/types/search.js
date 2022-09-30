import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { escapeRegExp } from 'lodash'

export const SearchResultType = new GraphQLObjectType({
  name: 'SearchResult',
  fields: {
    label: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
})

const REGION_ID_REGEX = /^(chr)?(\d+|x|y|m|mt)[-:]([0-9]+)([-:]([0-9]+)?)?$/i

export const isRegionId = str => {
  const match = REGION_ID_REGEX.exec(str)
  if (!match) {
    return false
  }

  const chrom = match[2].toLowerCase()
  const chromNumber = Number(chrom)
  if (!Number.isNaN(chromNumber) && (chromNumber < 1 || chromNumber > 22)) {
    return false
  }

  const start = match[3]
  const end = match[5]

  if (end && end < start) {
    return false
  }

  return true
}

export const normalizeRegionId = regionId => {
  const parts = regionId.split(/[-:]/)
  const chrom = parts[0].toUpperCase().replace(/^CHR/, '')
  let start = Number(parts[1])
  let end

  if (parts[2]) {
    end = Number(parts[2])
  } else {
    end = start + 20
    start = Math.max(start - 20, 0)
  }

  return `${chrom}-${start}-${end}`
}

const VARIANT_ID_REGEX = /^(chr)?(\d+|x|y|m|mt)[-:]([0-9]+)[-:]([acgt]+)[-:]([acgt]+)$/i

export const isVariantId = str => {
  const match = VARIANT_ID_REGEX.exec(str)
  if (!match) {
    return false
  }

  const chrom = match[2].toLowerCase()
  const chromNumber = Number(chrom)
  if (!Number.isNaN(chromNumber) && (chromNumber < 1 || chromNumber > 22)) {
    return false
  }

  return true
}

export const normalizeVariantId = variantId =>
  variantId
    .toUpperCase()
    .replace(/:/g, '-')
    .replace(/^CHR/, '')

export const resolveSearchResults = async (ctx, query) => {
  
  //console.log(query)
  if (isVariantId(query)) {
    const variantId = normalizeVariantId(query)
    return [
      {
        label: variantId,
        url: `/variant/${variantId}`,
      },
    ]
  }

  if (isRegionId(query)) {
    const regionId = normalizeRegionId(query)
    return [
      {
        label: regionId,
        url: `/region/${regionId}`,
      },
    ]
  }

  const startsWithQuery = { $regex: `^${escapeRegExp(query).toUpperCase()}` }

  //ENSMUSG
  if (/^ensmusg[0-9]/i.test(query)) {
    const matchingGenesMeta = await ctx.database.mouse_db
      .collection('search_terms')
      .find({ id: startsWithQuery })
      .limit(5)
      .toArray()

    return matchingGenesMeta.map(item => ({
      label: `${item.id} (${item.name_upper})`,
      url: 
        item.isGene
          ? `/expression/${item.name}`
          : `/metabolite/${item.id}`,
    }))
  }

  //ENSMUST
  if (/^ensmust[0-9]/i.test(query)) {
    const matchingTranscripts = await ctx.database.mouse_db
      .collection('transcripts')
      .find({ transcript_id: startsWithQuery })
      .limit(5)
      .toArray()

    return matchingTranscripts.map(transcript => ({
      label: `${transcript.transcript_id}`,
      url: `/gene/${transcript.gene_id}/transcript/${transcript.transcript_id}`,
    }))
  }

  const matchingGenesMeta = await ctx.database.mouse_db
    .collection('search_terms')
    .find({
      $or: [{ name_upper: startsWithQuery }, { id: startsWithQuery, isGene: false}],
    })
    .limit(5)
    .toArray()

  const geneMetaNameCounts = {}
  matchingGenesMeta.forEach(item => {
    if (geneMetaNameCounts[item.name_upper] === undefined) {
      geneMetaNameCounts[item.name_upper] = 0
    }
    geneMetaNameCounts[item.name_upper] += 1
  })

  const geneMetaResults = matchingGenesMeta.map(item => ({
    label:
      geneMetaNameCounts[item.name_upper] > 1
        ? `${item.name} (${item.id})`
        : item.name,
    url: 
      item.isGene
        ? `/expression/${item.name}`
        : `/metabolite/${item.id}`,
  }))

  /*
  if (geneResults.length < 5 && /^rs[0-9]/i.test(query)) {
    const response = await ctx.database.elastic.search({
      index: 'gnomad_exomes_2_1_1,gnomad_genomes_2_1_1',
      type: 'variant',
      _source: ['rsid', 'variant_id'],
      body: {
        query: {
          term: { rsid: query.toLowerCase() },
        },
      },
      size: 5 - geneResults.length,
    })

    const variantResults = response.hits.hits.map(doc => ({
      label: `${doc._source.variant_id} (${doc._source.rsid})`, // eslint-disable-line no-underscore-dangle
      url: `/variant/${doc._source.variant_id}`, // eslint-disable-line no-underscore-dangle
    }))

    return geneResults.concat(variantResults)
  }
  */

  return geneMetaResults
}
