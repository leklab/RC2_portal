import React from 'react'
import styled from 'styled-components'
import { ExternalLink, PageHeading } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'

const Credits = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;

  @media (max-width: 992px) {
    flex-direction: column;
    font-size: 16px;
  }
`

const CreditsSection = styled.div`
  width: calc(${props => props.width} - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`

const ContributorList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  line-height: 1.5;

  ul {
    padding-left: 20px;
    margin: 0.5em 0;
    list-style-type: none;
  }
`

const PrincipalInvestigatorList = styled(ContributorList)`
  columns: 2;

  @media (max-width: 992px) {
    columns: 1;
  }
`

const FundingSourceList = styled(ContributorList)`
  li {
    margin-bottom: 1em;
  }
`

export default () => (
  <InfoPage>
    <DocumentTitle title="About MAGEIK" />
    <PageHeading id="about-mageik">About Metabolism And Gene Expression in Kidney (MAGEIK)</PageHeading>
    <p>

    Autosomal dominant polycystic kidney disease (ADPKD) is the most common cause of inherited kidney disease; it causes the kidneys to enlarge and 
    stop working and many times patients need either dialysis or transplantation to replace the kidneys’ function. This research program is designed 
    to use innovative mouse models based on inactivation of the same genes as cause the human disease in combination with other recent technological 
    advances to create large, comprehensive data sets of the specific changes in gene expression and metabolic function in the subset of cells in the 
    kidney that will give rise to the cysts that ultimately destroy kidney function. These data sets will be made publicly available so that the maximum 
    number of investigators can make use of them in their efforts to understand how this disease occurs and, more importantly, to develop the therapies 
    that will slow this disease without causing unnecessary side effects to patients.



    </p>

  </InfoPage>
)
