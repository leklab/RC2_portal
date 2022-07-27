import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"
import { Page, PageHeading, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

import TCACycle from './TCACycle'
import './metabolicflux.css'

import Userfront from '@userfront/react'
import { Redirect } from 'react-router-dom'

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


const fluxHover = {
  fill: '#f68d6f',
  stroke:'#f68d6f',
  cursor: 'grab'
}

Userfront.init('8nw8qjpb')


class MetabolicFluxPage extends Component {



  mouseOverEffect = (e) => {

    //console.log("first class")
    //console.log(this.className)

    //console.log("second class")
    //console.log(e.currentTarget.className)


    //e.currentTarget.classList.add({fluxHover});
    e.currentTarget.classList.add('fluxHover');

  }
  
  mouseOutEffect = (e) => {

    //console.log("first class")
    //console.log(this.className)

    //console.log("second class")
    //console.log(e.currentTarget.className)

    //e.currentTarget.classList.remove({fluxHover});
    e.currentTarget.classList.remove('fluxHover');

  }

  
  openPopup = (e) => {
    var popup = document.getElementById("myPopup")    
    popup.classList.toggle("show")
  }
  

  componentDidMount(){
    var flux = document.getElementsByClassName('flux');
    
    for (var i = 0; i < flux.length; i++) {
      flux[i].addEventListener('mouseover', this.mouseOverEffect);
      flux[i].addEventListener('mouseout', this.mouseOutEffect);
      flux[i].addEventListener('click', this.openPopup);
    }

  }


	render() {

    if(!Userfront.accessToken()){
      return(
        <Redirect to={{pathname: '/login'}} />
      )
    }


		return (
        <Page>
        <DocumentTitle title="Metabolic Flux" />
        <PageHeading>Metabolic Flux</PageHeading>
        <TCACycle />
        </Page>
		)
	}
}

export default MetabolicFluxPage
//<img src="https://mageik.org/Metabolic_Flux.png" width="65%" height="65%"></img>
