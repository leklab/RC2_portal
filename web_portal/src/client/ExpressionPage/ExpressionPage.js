import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"

import { Page, PageHeading, Checkbox } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

import { TestTranscript } from './TestTranscript'
import { GenotypesControl } from './GenotypesControl'
import MouseGeneInfo from './MouseGeneInfo'

import styled from 'styled-components'


const ControlSection = styled.div`
  margin-top: 1em;
  label {
    margin-left: 1em;
  }
`
const GeneInfoColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }

  /* Matches responsive styles in AttributeList */
  @media (max-width: 600px) {
    align-items: stretch;
  }
`

const SettingsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`

const ConsequenceFiltersWrapper = styled.div`
  margin-bottom: 1em;
`


//#5da4d6
//#ff8f0e
//#2ca064

const GENOTYPE_COLORS = {
  PKD1_KO: 'rgba(93, 164, 214, 0.5)',
  DKO: 'rgba(255, 144, 14, 0.5)',
  WT: 'rgba(44, 160, 101, 0.5)'  
}

//const ExpressionPage = ({ variantId }) => {

export class ExpressionPage extends Component {
  /*
  const expression_data = await fetchExpression(variantId)
  console.log(expression_data)

  //const layout = {width: 800, height: 400, title: 'N00b test'}

  const layout = {
    title: `${variantId} Expression`,
    autosize: false,
    width: 800,
    height: 500,
    yaxis: {
      autorange: true,
      zeroline: true,
      gridcolor: 'rgb(255, 255, 255)',
      gridwidth: 1,
      zerolinecolor: 'rgb(255, 255, 255)',
      zerolinewidth: 2
    },
    boxmode: 'group',
    margin: {
      l: 40,
      r: 30,
      b: 80,
      t: 100
    },
    paper_bgcolor: 'rgb(243, 243, 243)',
    plot_bgcolor: 'rgb(243, 243, 243)'

  }

  const trace5 = {
    y: [26, 36, 56],
    x: ['Week 7', 'Week 7', 'Week 7'],
    type: 'box',
    name: 'PKD1 KO',
    boxpoints: 'all',
    hoveron: 'points',
    marker: { size: 8 }
  }

  const trace6 = {
    y: [16, 17, 58],
    x: ['Week 7', 'Week 7', 'Week 7'],
    type: 'box',
    name: 'DKO',
    boxpoints: 'all',
    hoveron: 'points',
    marker: { size: 8 }
  }

  const trace7 = {
    y: [22, 30, 20],
    x: ['Week 7', 'Week 7', 'Week 7'],
    type: 'box',
    name: 'WT',
    boxpoints: 'all',
    hoveron: 'points',
    marker: { size: 8 }
  }

  const data = [ trace5, trace6, trace7 ];


  let plot_data = []
  console.log(expression_data.length)

  for (var i = 0; i < expression_data.length; i++){

    let x_data = []
    
    for(var j= 0; j < expression_data[i].read_count.length; j++){
      x_data.push(expression_data[i].time_point)
    }

    console.log(x_data)

    
    
    plot_data.push({
      y: expression_data[i].read_count,  
      x: x_data,
      name: expression_data[i].genotype,
      boxpoints: 'all',
      hoveron: 'points',
      marker: {size: 8}
    })
    

  }
  */


  static propTypes = {
    variantId: PropTypes.string.isRequired,
  }

  state = {
    gene_data: null,
    includeWT: true,
    includeDKO: true,
    includePKD1_KO: true
  }

  fetchExpression = async(gene_id) => {

    const query = `{
      gene(gene_name: "${gene_id}"){
        gene_id
        gene_name
        chrom
        start
        stop
        strand

  			expression{
  			   phenotype
  	       genotype
  	       time_point
  	       read_count
  	    }
  	    composite_transcript{
        	 exons{
          	 feature_type
          	 chrom
          	 start
          	 stop
        	 }
        }
      }      
    }
    ` 
    try{
      console.log("Requesting data")
      const gene_data = await request("http://35.209.10.92:4000", query)    
      console.log(gene_data)
      
      return gene_data

      //this.setState({data: expression_data})

    }catch(error){
      return undefined
      //console.log(error)
    }

  }

  onGenotypeFilter = (state) => {
    console.log("In Genotype Filter")
    console.log(state)
    this.setState(state)
  }

  async componentDidMount() {
  //componentDidMount() {

    const { variantId } = this.props
    const gene_data = await this.fetchExpression(variantId)
    //const expression_data = this.fetchExpression(variantId)

    this.mounted = true
    this.setState({gene_data: gene_data})

  }

  componentWillUnmount() {
    this.mounted = false
  }

  async componentDidUpdate(prevProps) {

  	console.log("In componentDidUpdate")

    if (this.props.variantId !== prevProps.variantId){
      console.log("props.variantId changed")

      const gene_data = await this.fetchExpression(this.props.variantId)
      this.setState({gene_data: gene_data})
    }
  	
  }


  /* 
  async loadData() {

    const { variantId } = this.props

    const expression_data = await fetchExpression(variantId)
    console.log(expression_data)
    console.log(expression_data.length)

    this.setState({data: expression_data})

  }
  */

  /*
  componentDidUpdate(prevProps) {
    if (
      this.props.query !== prevProps.query ||
      !areVariablesEqual(this.props.variables, prevProps.variables)
    ) {
      this.loadData()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }
  */

  includeDataPoint = (data) => {

    if(this.state.includePKD1_KO && data.genotype.localeCompare("PKD1_KO") == 0){
      return true
    }

    else if(this.state.includeDKO && data.genotype.localeCompare("DKO") == 0){
      return true
    }

    else if(this.state.includeWT && data.genotype.localeCompare("WT") == 0){
      return true
    }
    else{
      return false
    }
    
  }

  render() {

    const { variantId } = this.props
    const {gene_data} = this.state

    console.log("Rendering ExpressionPage")

    if(!this.mounted){
      console.log("ExpressionPage not mounted")
      return(
        <Page>
        <DocumentTitle title="Loading" />
        <PageHeading>Loading Data</PageHeading>
        <p>Loading</p>
      </Page>
      )
    }

    //console.log(expression_data)

    const layout = {
      title: `${variantId} Expression`,
      autosize: false,
      width: 800,
      height: 500,
      yaxis: {
        autorange: true,
        zeroline: true,
        gridcolor: 'rgb(255, 255, 255)',
        gridwidth: 1,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2,
        title: 'Raw Read Count'
      },
      xaxis: {
        title: 'Timepoint'
      },
      boxmode: 'group',
      margin: {
        l: 60,
        r: 30,
        b: 60,
        t: 80
      },
      paper_bgcolor: 'rgb(243, 243, 243)',
      plot_bgcolor: 'rgb(243, 243, 243)',
      showlegend: false
    }

    const config = {
      displayModeBar: false
    }

    let plot_data = []
    
    //console.log(expression_data.length)
    const expression_data = gene_data.gene.expression
    
    for (var i = 0; i < expression_data.length; i++){


      //var check_genotype = this.includeDataPoint(expression_data[i])
      //console.log("Genotype: "+expression_data[i].genotype + " "+check_genotype)

      if(!this.includeDataPoint(expression_data[i])){
        //console.log("Skipping genotype: "+expression_data[i].genotype)
        continue
      }

      let x_data = []
      
      for(var j= 0; j < expression_data[i].read_count.length; j++){
        x_data.push(expression_data[i].time_point)
      }

      // console.log(x_data)  
      
      plot_data.push({
        y: expression_data[i].read_count,  
        x: x_data,
        type: 'box',
        name: expression_data[i].genotype,
        boxpoints: 'all',
        hoveron: 'points',
        marker: {
          color: GENOTYPE_COLORS[expression_data[i].genotype],
          size: 8
        }
      })
      
    }
    
    //console.log("PKD1_KO: " + this.state.includePKD1_KO)
    //console.log(plot_data)

    return (
      <Page>
        <DocumentTitle title="Gene Expression" />
        <PageHeading>{variantId}</PageHeading>
          <GeneInfoColumnWrapper>
            <MouseGeneInfo gene={gene_data.gene} />
          </GeneInfoColumnWrapper>
        <Plot
          data={plot_data}
          layout={layout}
          config={config}
        />
        {/*<ControlSection>
          Include Genotype:
          <Checkbox
            checked={this.state.includePKD1_KO}
            id="PKD1_KO"
            label="PKD1_KO"
            disabled={
              this.state.includePKD1_KO && !this.state.includeDKO && !this.state.includeWT
            }
            onChange={includePKD1_KO => {
              this.setState({ includePKD1_KO })
            }}
          />
          <Checkbox
            checked={this.state.includeDKO}
            id="DKO"
            label="DKO"
            disabled={
              this.state.includeDKO && !this.state.includePKD1_KO && !this.state.includeWT
            }
            onChange={includeDKO => {
              this.setState({ includeDKO })
            }}
          />
          <Checkbox
            checked={this.state.includeWT}
            id="WT"
            label="WT"
            disabled={
              this.state.includeWT && !this.state.includePKD1_KO && !this.state.includeDKO
            }
            onChange={includeWT => {
              this.setState({ includeWT })
            }}
          />
        </ControlSection>
        <ControlSection>
          Include Timepoint:
          <Checkbox
            id="W7"
            label="W7"
            disabled={true}
          />
          <Checkbox
            id="W14"
            label="W14"
            disabled={true}
          />
          <Checkbox
            id="W28"
            label="W28"
            disabled={true}
          />
        </ControlSection>*/}
        <SettingsWrapper>
          <ConsequenceFiltersWrapper>
            <GenotypesControl
              categorySelections={this.state}
              id="variant-filter"
              onChange={this.onGenotypeFilter}
            />

          </ConsequenceFiltersWrapper>
        </SettingsWrapper>

        <TestTranscript
          gene_name={gene_data.gene.gene_name}
        	strand={gene_data.gene.strand} 
        	composite_transcript={gene_data.gene.composite_transcript}
        />
      </Page>
    )
  }

}



//export default ExpressionPage
