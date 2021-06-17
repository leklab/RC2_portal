import LinkIcon from '@fortawesome/fontawesome-free/svgs/solid/link.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { ExternalLink, PageHeading } from '@broad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'
import SampleCountTable from './SampleCountTable'

const AnchorLink = styled.a.attrs({ 'aria-hidden': 'true' })`
  position: absolute;
  top: 0;
  left: -15px;
  display: flex;
  align-items: center;
  width: 15px;
  height: 1em;
  visibility: hidden;
  vertical-align: middle;
`

const AnchorWrapper = styled.span`
  position: relative;

  :hover {
    ${AnchorLink} {
      visibility: visible;
    }
  }
`
const PageContent = styled.div`
  width: 80%;
  text-align: justify;
`

const withAnchor = Component => {
  const ComposedComponent = ({ children, id }) => (
    <AnchorWrapper>
      <Component>
        <AnchorLink href={`#${id}`} id={id}>
          <LinkIcon height={12} width={12} />
        </AnchorLink>
        {children}
      </Component>
    </AnchorWrapper>
  )
  const componentName = Component.displayName || Component.name || 'Component'
  ComposedComponent.displayName = `withAnchor(${componentName})`
  ComposedComponent.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
  }
  return ComposedComponent
}

const FAQSectionHeading = withAnchor(styled.h2``)

const Question = withAnchor(
  styled.dt`
    margin-bottom: 0.5em;
    font-weight: bold;
  `
)

const Answer = styled.dd`
  margin: 0 0 1em;
`

export default () => (
  <InfoPage>
    <DocumentTitle title="FAQ" />
    <PageHeading>Frequently Asked Questions</PageHeading>
    <PageContent>
      Q. What are the different ways of exploring gene expression? <br /><br />
      A. Gene expression can be accessed in three different ways. <br />
      (1) Through the search bar on the <ExternalLink href="/">landing/home page</ExternalLink> <br />
      (2) Using the search bar on the Navigation bar on the top of each page <br />
      (3) Selecting from the table of <ExternalLink href="/diffExpression">differential expressed genes</ExternalLink>
    </PageContent>

  </InfoPage>
)
