import React from 'react'
import PropTypes from 'prop-types'

import { ExternalLink } from '@broad/ui'

import AttributeList from '../AttributeList'

const MouseGeneInfo = ({ gene }) => {
  const {
    chrom,
    gene_name: geneName,
    gene_id: geneId,
    start,
    stop,
  } = gene

  const ensemblGeneUrl = `http://ensembl.org/Mus_musculus/Gene/Summary?g=${geneId}`
  const ucscUrl = `http://genome.ucsc.edu/cgi-bin/hgTracks?db=mm10&position=chr${chrom}%3A${start - 1}-${stop}`

  //console.log("In MouseGeneInfo")
  //console.log(geneName)
  //console.log(geneId)

  return (
    <AttributeList labelWidth={160}>
      <AttributeList.Item label="Ensembl gene ID">
        <ExternalLink href={ensemblGeneUrl}>{geneId}</ExternalLink>
      </AttributeList.Item>
      <AttributeList.Item label="UCSC Browser">
        <ExternalLink href={ucscUrl}>{`${chrom}:${start}-${stop}`}</ExternalLink>
      </AttributeList.Item>
    </AttributeList>
  )
}

MouseGeneInfo.propTypes = {
  gene: PropTypes.shape({
    chrom: PropTypes.string.isRequired,
    gene_name: PropTypes.string.isRequired,
    gene_id: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    stop: PropTypes.number.isRequired,
  }).isRequired,
}

export default MouseGeneInfo
