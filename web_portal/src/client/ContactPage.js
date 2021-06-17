import React from 'react'
import styled from 'styled-components'

import { ExternalLink, PageHeading } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'


const PageContent = styled.div`
  width: 80%;
  text-align: justify;
`

export default () => (
  <InfoPage>
    <DocumentTitle title="Contact" />
    <PageHeading>Contact</PageHeading>
    <PageContent>
    	<h3>Contact Principal Investigator</h3>
    	<ExternalLink href="https://medicine.yale.edu/profile/stefan_somlo">Stefan Somlo</ExternalLink>
    	<br />
    	<h3>Principal Investigators</h3>
    	<ExternalLink href="https://medicine.yale.edu/profile/stefan_somlo">Stefan Somlo</ExternalLink><br />
    	<ExternalLink href="https://medicine.yale.edu/profile/stefan_somlo">Gerald Shulman</ExternalLink><br />
    	<ExternalLink href="https://medicine.yale.edu/profile/michael_caplan">Michael Caplan</ExternalLink><br />
    	<br />
    	<h3>NIH/NIDDK Program Officier</h3>
      <ExternalLink href="https://www.niddk.nih.gov/about-niddk/staff-directory/biography/maric-bilkan-christine">Christine Maric Bilkan</ExternalLink><br />

    	<br />

    </PageContent>
  </InfoPage>
)
