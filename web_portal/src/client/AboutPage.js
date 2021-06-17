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

const PageContent = styled.div`
  width: 80%;
  text-align: justify;
`


export default () => (
  <InfoPage>
    <DocumentTitle title="About MAGEIK" />
    <PageHeading id="about-mageik">About Metabolism And Gene Expression in Kidney (MAGEIK)</PageHeading>
    
    <PageContent>

    Autosomal dominant polycystic kidney disease (ADPKD) is the most common cause of inherited kidney disease; it causes the kidneys to enlarge and 
    stop working and many times patients need either dialysis or transplantation to replace the kidneys’ function. This research program is designed 
    to use innovative mouse models based on inactivation of the same genes as cause the human disease in combination with other recent technological 
    advances to create large, comprehensive data sets of the specific changes in gene expression and metabolic function in the subset of cells in the 
    kidney that will give rise to the cysts that ultimately destroy kidney function. These data sets will be made publicly available so that the maximum 
    number of investigators can make use of them in their efforts to understand how this disease occurs and, more importantly, to develop the therapies 
    that will slow this disease without causing unnecessary side effects to patients.

    {/* <h3>Mouse Models</h3>


    <br />
    <h3>Data Generation</h3>


    <br />
    <h3>Data Processing</h3>

    <br /> */}
    <h3>Web development</h3>
    The website was custom designed for this project and led by <ExternalLink href="https://medicine.yale.edu/profile/monkol_lek">Monkol Lek</ExternalLink>. 
    The open source code for this website is available on <ExternalLink href="https://github.com/leklab/PKD_portal"> github.</ExternalLink>  Please report any issues or suggestions on the <ExternalLink href="https://github.com/leklab/PKD_portal/issues">issues section</ExternalLink> on the github repository.
    <br />
    <h3>Funding</h3>
    This work was supported by the following grant from the National Institute of Diabetes and Digestive and Kidney Diseases 
    (NIDDK)/National Institutes of Health (NIH): RC2 DK120534.

    </PageContent>

  </InfoPage>
)
