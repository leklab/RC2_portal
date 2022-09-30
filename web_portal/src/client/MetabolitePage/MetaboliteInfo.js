import React from 'react'
import PropTypes from 'prop-types'

import { ExternalLink } from '@broad/ui'

import AttributeList from '../AttributeList'

const MetaboliteInfo = ({ metabolite }) => {
  const {
    biochemical,
    comp_id,
    kegg,
    group_hmdb,
    pubchem,
    super_pathway
  } = metabolite

  const keggUrl = `https://www.kegg.jp/entry/${kegg}`
  const hmdbUrl = `https://hmdb.ca/metabolites/${group_hmdb}`
  const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/compound/${pubchem}`

  //console.log("In MouseGeneInfo")
  //console.log(geneName)
  //console.log(geneId)

  return (
    <AttributeList labelWidth={160}>
      <AttributeList.Item label="KEGG ID">
        <ExternalLink href={keggUrl}>{kegg}</ExternalLink>
      </AttributeList.Item>
      <AttributeList.Item label="Group HMDB">
        <ExternalLink href={hmdbUrl}>{group_hmdb}</ExternalLink>
      </AttributeList.Item>
      <AttributeList.Item label="PubChem">
        <ExternalLink href={pubchemUrl}>{pubchem}</ExternalLink>
      </AttributeList.Item>
      <AttributeList.Item label="Super Pathway">
        {super_pathway}
      </AttributeList.Item>

    </AttributeList>
  )
}

MetaboliteInfo.propTypes = {
  metabolite: PropTypes.shape({
    biochemical: PropTypes.string.isRequired,
    comp_id: PropTypes.string.isRequired,
    kegg: PropTypes.string.isRequired,
    pubchem: PropTypes.string.isRequired,    
    super_pathway: PropTypes.string.isRequired
  }).isRequired,
}

export default MetaboliteInfo
