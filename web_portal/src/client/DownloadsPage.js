import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { PageHeading, ExternalLink } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

const DownloadSection = styled.div`
  flex-basis: calc(50% - 25px);
  line-height: 1.5;

  @media (max-width: 900px) {
    flex-basis: 100%;
  }

  &:last-child {
    flex-basis: 100%;
  }

  ${ExternalLink} {
    word-break: break-word;
  }

  h3 {
    margin: 1.25em 0 0.5em;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      margin-bottom: 0.5em;

      ul {
        list-style: circle;
        padding-left: 20px;
        margin-top: 0.25em;
      }
    }
  }
`

export default () => (
  <InfoPage>
    <DocumentTitle title="Downloads" />
    <Wrapper>
      <DownloadSection>
        <PageHeading id="download-mageik">Downloads</PageHeading>
        Place holder text
      </DownloadSection>
    </Wrapper>
  </InfoPage>
)
