import React from 'react'
import styled from 'styled-components'

import { ExternalLink } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'
import Link from './Link'
import Searchbox from './Searchbox'
import GnomadHeading from './GnomadHeading'

const HomePage = styled(InfoPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 740px;
  margin-top: 90px;
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`

const SubHeading = styled.h2`
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1.2em;
  font-weight: lighter;
  letter-spacing: 2px;
  text-align: center;
`

export default () => (
  <HomePage>
    <DocumentTitle />
    <HeadingContainer>
      {/* <GnomadHeading width="60%" /> */}
      <SubHeading>Metabolism And Gene Expression In Kidney (MAGEIK)</SubHeading>
      <Searchbox width="80%" />
      <p>
        Examples - Gene:{' '}
        <Link to="/expression/Pkd2">
          Pkd2
        </Link>
        </p>
    </HeadingContainer>

    <p>
    The interactive data within this website are from mouse models based on inactivation of genes associated with Autosomal dominant polycystic kidney 
    disease (ADPKD). This comprehensive large data sets include specific changes in gene expression and metabolic function in the 
    subset of cells in the kidney that will give rise to the cysts that ultimately destroy kidney function.
    </p>
  </HomePage>
)
