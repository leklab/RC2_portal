import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"

import { Page, PageHeading, Checkbox, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

import { ModelTranscript } from './ModelTranscript'
import { GenotypesControl } from './GenotypesControl'
import MouseGeneInfo from './MouseGeneInfo'

import Tabs from './Tabs'

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

/* stylelint-disable block-no-empty */
const ControlWrapper = styled.span``
/* stylelint-enable block-no-empty */

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    ${ControlWrapper} {
      margin-bottom: 1em;
    }
  }
`


//#5da4d6
//#ff8f0e
//#2ca064

const GENOTYPE_COLORS = {
  PKD1_KO: 'rgba(93, 164, 214, 0.5)',
  DKO: 'rgba(255, 144, 14, 0.5)',
  WT: 'rgba(44, 160, 101, 0.5)'  
}


const base_y_axis = {
  autorange: true,
  zeroline: true,
  gridcolor: 'rgb(255, 255, 255)',
  gridwidth: 1,
  zerolinecolor: 'rgb(255, 255, 255)',
  zerolinewidth: 2,
  exponentformat: 'E',
  rangemode: 'tozero'  
}

const base_layout = {
  //title: `${variantId} Expression`,
  autosize: false,
  width: 800,
  height: 500,
  margin: {
    l: 60,
    r: 30,
    b: 60,
    t: 80
  },
  paper_bgcolor: 'rgb(243, 243, 243)',
  plot_bgcolor: 'rgb(243, 243, 243)',
  showlegend: false,
  boxmode: 'group',
  xaxis: {
    title: 'Timepoint'
  }
}


//const ExpressionPage = ({ variantId }) => {

export class ExpressionPage extends Component {

  static propTypes = {
    variantId: PropTypes.string.isRequired,
  }

  state = {
    gene_data: null,
    includeWT: true,
    includeDKO: true,
    includePKD1_KO: true,
    yaxis_scale: 'linear'
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
        transcripts{
          transcript_id
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
    //console.log(state)
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
      //console.log("props.variantId changed")

      const gene_data = await this.fetchExpression(this.props.variantId)
      this.setState({gene_data: gene_data})
    }
  	
  }

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

  filterData = (expression_data) => {
    let plot_data = []
    
    //const expression_data = gene_data.gene.expression
    
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

    return plot_data

  }

  render() {

    const { variantId } = this.props
    const { gene_data } = this.state

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


    var layout = {
      title: `${variantId} Expression`,      
      ...base_layout,
      yaxis: {
        ...base_y_axis,
        title: 'Raw Read Count'
      }
    }

    if(this.state.yaxis_scale === 'log'){
      layout = {
        title: `${variantId} Expression`,      
        ...base_layout,
        yaxis: {
          ...base_y_axis,
          title: 'log2(Raw Read Count)',
          type: 'log',
          dtick: Math.log10(2)
        }
      }
    }

    //console.log(test_layout)


    const config = {
      displayModeBar: false
    }

    const plot_data = this.filterData(gene_data.gene.expression)
    //console.log("Filtered Plot Data")
    //console.log(plot_data)
    
    return (
      <Page>
        <DocumentTitle title="Gene Expression" />
        <PageHeading>{variantId}</PageHeading>
          <GeneInfoColumnWrapper>
            <MouseGeneInfo gene={gene_data.gene} />
          </GeneInfoColumnWrapper>
        
        <Wrapper>
          <SegmentedControl
            id="y-axis-scale"
            onChange={scale => {
                this.setState({ yaxis_scale: scale })
            }}
            options={[
              { label: 'Linear', value: 'linear'},
              { label: 'Log', value: 'log' }
            ]}
            value={this.state.yaxis_scale}
          />
        </Wrapper>

        <Plot
          data={plot_data}
          layout={layout}
          config={config}
        />

        {/*<ControlSection>
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

        <ModelTranscript
          gene_name={gene_data.gene.gene_name}
        	strand={gene_data.gene.strand} 
        	composite_transcript={gene_data.gene.composite_transcript}
          transcripts={gene_data.gene.transcripts}
        />
        <Tabs>
          <div label="Transcript">
            Expression tab1
          </div>
          <div label="Exon">
            Expression tab2
          </div>
          <div label="Splice Junction">
            Expression tab3
          </div>
          <div label="Differential Expression">
            Expression tab4
          </div>
        </Tabs>
      </Page>
    )
  }

}



//export default ExpressionPage
