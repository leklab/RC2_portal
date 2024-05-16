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
    <DocumentTitle title="About MAGICK" />
    <PageHeading id="about-magick">About Metabolism And Genomics in Cystic Kidney (MAGICK)</PageHeading>
    
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
    <h3>Citation</h3>
    When using this data, please cite the following reference.<br />
    Zhang, C., Rehman, M., Tian, X., Pei, S.L.C., Gu, J., Bell, T.A., Dong, K., Tham, M.S., Cai, Y., Wei, Z., et al. (2024). Glis2 is an early effector 
    of polycystin signaling and a target for therapy in polycystic kidney disease. <ExternalLink href="https://www.nature.com/articles/s41467-024-48025-6">Nat. Commun. 15, 3698. 10.1038/s41467-024-48025-6.</ExternalLink>
    <br />
    
    <h3>Transcriptomic Datasets</h3>
    <b>Our goal:</b> To develop cell type specific in vivo translatome datasets based on mouse model systems to support discovery of mechanisms of 
    ADPKD pathogenesis and of new therapeutic targets.

    <i>This resource has been developed with the following principles:</i>

    <h4>Cell type specific translatome.</h4>
    Specificity only for kidney cells in which Pkd genes were inactivated was achieved using Translating Ribosome Affinity Purification (TRAP) RNASeq

    <h4>Precystic disease stage.</h4>
    Pkd gene inactivation was induced in all models from postnatal days 28 to 42 (4-6 weeks age)
    TRAP RNASeq was performed at 7 weeks age and 10 weeks age. At these time points, polycystin proteins and cilia are gone from cells where Cre recombinase has been active, but discernible cyst formation has not yet begun.

    <h4>Separate analysis of male and female mice.</h4>
    Separate analyses for male and female mice were prespecified because female mice are relatively protected and progress more slowly in adult inducible models of Pkd1 and Pkd2 inactivation.

    <h4>CDCA data set comparisons</h4>
    The "Cilia Dependent Cyst Activation (CDCA) pattern" in the data set comparisons is premised on the biological understanding that <u>cyst-relevant</u> signals in <i>Pkd</i>-only single knockouts, 
    which are destined to form cysts, differ in the <u>same direction</u> from both Non-cystic and the respective <i>Pkd</i>+cilia double knockout. Furthermore, signals 
    relevant to cyst formation should <u>not</u> differ between the Non_cystic and Pkd+cilia double knockouts since the latter are protected from cyst formation 
    despite the inactivation of a <i>Pkd</i> gene.    

    <h4>Overview of TRAP RNASeq procedure</h4>
    <img src="/TRAP_RNAseq.jpg" width="80%" height="80%"></img><br />

    <h4>Overview of the data analysis interpretation</h4>
    <img src="/CDCA_figure.jpg" width="80%" height="80%"></img><br />

    <h3>Web development</h3>
    The website was custom designed for this project and led by <ExternalLink href="https://medicine.yale.edu/profile/monkol_lek">Monkol Lek</ExternalLink>. 
    The open source code for this website is available on <ExternalLink href="https://github.com/leklab/PKD_portal"> github.</ExternalLink>  Please report any issues or suggestions on the <ExternalLink href="https://github.com/leklab/PKD_portal/issues">issues section</ExternalLink> on the github repository.
    <br />
    <h3>Funding</h3>
    This work was supported by the following grant from the National Institute of Diabetes and Digestive and Kidney Diseases 
    (NIDDK)/National Institutes of Health (NIH): RC2 DK120534.
    <br /><br /><br />
    </PageContent>

  </InfoPage>
)
