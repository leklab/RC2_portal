import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"
import { Page, PageHeading, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

/* stylelint-disable block-no-empty */
const ControlWrapper = styled.span``
/* stylelint-enable block-no-empty */

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    ${ControlWrapper} {
      margin-bottom: 1em;
    }
  }
`


class MetabolicFluxPage extends Component {


	render() {

		return (
        <Page>
        <DocumentTitle title="Metabolic Flux" />
        <PageHeading>Metabolic Flux</PageHeading>
        <img src="https://mageik.org/Metabolic_Flux.png" width="65%" height="65%"></img>
        </Page>
		)
	}
}

export default MetabolicFluxPage
