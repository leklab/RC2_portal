import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"

import { Page, PageHeading, Checkbox, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

// import { ModelTranscript } from './ModelTranscript'
// import { GenotypesControl } from './GenotypesControl'
// import { SexControl } from './SexControl'

import MetaboliteInfo from './MetaboliteInfo'
// // import DiffExpressionTab from './DiffExpressionTab'
// import Tabs from './Tabs'

import styled from 'styled-components'

import Userfront from '@userfront/react'
import { Redirect } from 'react-router-dom'


const ControlSection = styled.div`
  margin-top: 1em;
  label {
    margin-left: 1em;
  }
`
const MetaboliteFullName = styled.span`
  font-size: 0.75em;
  font-weight: 400;
`

const MetaboliteInfoColumnWrapper = styled.div`
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

/*
const GENOTYPE_COLORS = {
  PKD1_KO: 'rgba(93, 164, 214, 0.2)',
  DKO: 'rgba(255, 144, 14, 0.2)',
  WT: 'rgba(44, 160, 101, 0.2)'  
}
*/

const GENOTYPE_COLORS = {
  PKD1_KO: 'rgb(93, 164, 214)',
  DKO: 'rgb(255, 144, 14)',
  WT: 'rgb(44, 160, 101)'  
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

Userfront.init('8nw8qjpb')

//const ExpressionPage = ({ variantId }) => {

export class MetabolitePage extends Component {

  static propTypes = {
    comp_id: PropTypes.string.isRequired,
  }

  state = {
    metabolite_data: null,
    includeWT: true,
    includeDKO: true,
    includePKD1_KO: true,
    includeM: true,
    includeF: true,
    combineSex: false,
    yaxis_scale: 'linear'
  }

  fetchExpression = async(comp_id) => {

    const query = `{
      metabolite(comp_id: "${comp_id}"){
        comp_id
        biochemical
        kegg
        group_hmdb
        pubchem
        super_pathway
        
      }      
    }
    ` 
    try{
      console.log("Requesting data")
      console.log(query)
      const metabolite_data = await request("http://34.125.140.232/api", query)    
      console.log(metabolite_data)
      
      return metabolite_data


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

    const { comp_id } = this.props
    const metabolite_data = await this.fetchExpression(comp_id)
    //const expression_data = this.fetchExpression(variantId)

    this.mounted = true
    this.setState({metabolite_data: metabolite_data})

  }

  componentWillUnmount() {
    this.mounted = false
  }

  async componentDidUpdate(prevProps) {

  	console.log("In componentDidUpdate")

    if (this.props.comp_id !== prevProps.comp_id){
      //console.log("props.comp_id changed")

      const metabolite_data = await this.fetchExpression(this.props.comp_id)
      this.setState({metabolite_data: metabolite_data})
    }
  	
  }

  // includeDataPoint = (data) => {
  //   return this.includeGenotype(data) && this.includeSex(data)    
  // }

  // includeGenotype = (data) => {

  //   if(this.state.includePKD1_KO && data.genotype.localeCompare("PKD1_KO") == 0){
  //     return true
  //   }

  //   else if(this.state.includeDKO && data.genotype.localeCompare("DKO") == 0){
  //     return true
  //   }

  //   else if(this.state.includeWT && data.genotype.localeCompare("WT") == 0){
  //     return true
  //   }

  //   else{
  //     return false
  //   }
    
  // }

  // includeSex = (data) => {

  //   if(this.state.includeM && data.sex.localeCompare("M") == 0){
  //     return true
  //   }

  //   else if(this.state.includeF && data.sex.localeCompare("F") == 0){
  //     return true
  //   }

  //   else if(data.sex.localeCompare("") == 0){
  //     return true
  //   }

  //   else{
  //     return false
  //   }
    
  // }

  // combineSexData = (expression_data) => {
  //   var combined_data = []
  //   var j = 0


  //   console.log("In combineSexData")
  //   // massive assumption that the data is sorted!
  //   // currently male first then female
  //   for (var i = 0; i < expression_data.length; i+= 2){
  //     combined_data[j] = {...expression_data[i]}
  //     //combined_data[j] = expression_data[i]
  //     combined_data[j].sex = ''

  //     // concat female rpkm data with the male data
  //     combined_data[j].rpkm = expression_data[i].rpkm.concat(expression_data[i+1].rpkm)
  //     j++
      
  //   }

  //   console.log("After combining sex data")
  //   console.log(combined_data)

  //   return combined_data

  // }

  // filterData = (expression_data) => {
  //   let plot_data = []
    
  //   //const expression_data = gene_data.gene.expression

  //   //console.log("Before sorting")
  //   //console.log(expression_data)

    
  //   expression_data.sort((a,b) => {

  //     if(a.time_point != b.time_point){
  //       if(a.time_point == 'W7' && b.time_point == 'W10'){
  //         return -1
  //       }
  //       else if(a.time_point == 'W10' && b.time_point == 'W7'){
  //         return 1
  //       }
  //       else{
  //         return 0
  //       }
  //     }
      
  //     else if(a.genotype != b.genotype){
  //       if(a.genotype == 'WT' && b.genotype == 'PKD1_KO'){
  //         return -1
  //       }
  //       else if(a.genotype == 'WT' && b.genotype == 'DKO'){
  //         return -1
  //       }
  //       else if(b.genotype == 'WT' && a.genotype == 'DKO'){
  //         return 1
  //       }
  //       else if(b.genotype == 'WT' && a.genotype == 'PKD1_KO'){
  //         return 1
  //       }
  //       else if(a.genotype == 'PKD1_KO' && b.genotype == 'DKO'){
  //         return -1
  //       }
  //       else if(a.genotype == 'DKO' && b.genotype == 'PKD1_KO'){
  //         return 1
  //       }
  //       else{
  //         return 0
  //       }
        
  //     }
  //     else{
  //       if(a.sex == 'M' && b.sex == 'F'){
  //         return -1
  //       }
  //       else if(a.sex == 'F' && b.sex == 'M'){
  //         return 1
  //       }
  //       else{
  //         return 0
  //       }        
  //     }

  //     /*
  //     else{
  //       if(a.genotype == 'WT' && b.genotype == 'PKD1_KO'){
  //         return -1
  //       }
  //       else if(a.genotype == 'WT' && b.genotype == 'DKO'){
  //         return -1
  //       }
  //       else if(b.genotype == 'WT' && a.genotype == 'DKO'){
  //         return 1
  //       }
  //       else if(b.genotype == 'WT' && a.genotype == 'PKD1_KO'){
  //         return 1
  //       }
  //       else if(a.genotype == 'PKD1_KO' && b.genotype == 'DKO'){
  //         return -1
  //       }
  //       else if(a.genotype == 'DKO' && b.genotype == 'PKD1_KO'){
  //         return 1
  //       }
  //       else{
  //         return 0
  //       }
        
  //     }*/
  //   })
    
  //   //console.log("After sorting")
  //   //console.log(expression_data)
    
    
  //   if (this.state.includeM && this.state.includeF && this.state.combineSex){
  //     expression_data = this.combineSexData(expression_data)

  //   }
    

  //   console.log("Before plotting/filtering")
  //   console.log(expression_data)

  //   for (var i = 0; i < expression_data.length; i++){


  //     //var check_genotype = this.includeDataPoint(expression_data[i])
  //     //console.log("Genotype: "+expression_data[i].genotype + " "+check_genotype)

  //     if(!this.includeDataPoint(expression_data[i])){
  //       //console.log("Skipping genotype: "+expression_data[i].genotype)
  //       continue
  //     }

  //     let x_data = []
      
  //     for(var j= 0; j < expression_data[i].rpkm.length; j++){
  //       x_data.push(expression_data[i].time_point)
  //     }

  //     plot_data.push({
  //         y: expression_data[i].rpkm,  
  //         x: x_data,
  //         type: 'box',
  //         name: expression_data[i].genotype + ' ' + expression_data[i].sex,
  //         boxpoints: 'all',
  //         hoveron: 'points',
  //         pointpos: 0,
  //         marker: {
  //           color: GENOTYPE_COLORS[expression_data[i].genotype],
  //           size: 8
  //         }
  //       })
    

  //   }


  //   console.log("Showing data to plot")
  //   console.log(plot_data)  

  //   return plot_data

  // }

  render() {

     if(!Userfront.accessToken()){
        return(
          <Redirect to={{pathname: '/login'}} />
        )
      }


    const { comp_id } = this.props
    const { metabolite_data } = this.state

    console.log("Rendering MetabolitePage")

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


    // var layout = {
    //   title: `${comp_id} Expression`,      
    //   ...base_layout,
    //   yaxis: {
    //     ...base_y_axis,
    //     title: 'TPM'
    //   }
    // }

    // if(this.state.yaxis_scale === 'log'){
    //   layout = {
    //     title: `${variantId} Expression`,      
    //     ...base_layout,
    //     yaxis: {
    //       ...base_y_axis,
    //       title: 'log2(TPM)',
    //       type: 'log',
    //       dtick: Math.log10(2)
    //     }
    //   }
    // }

    // //console.log(test_layout)


    // const config = {
    //   displayModeBar: false
    // }

    // const plot_data = this.filterData(metabolite_data.metabolite.expression)
    // //console.log("Filtered Plot Data")
    // //console.log(plot_data)
    
    return (
      <Page>
        <DocumentTitle title="Metabolite" />
        <PageHeading>{metabolite_data.metabolite.biochemical} <MetaboliteFullName>COMP ID: {comp_id}</MetaboliteFullName></PageHeading>
          <MetaboliteInfoColumnWrapper>
            <MetaboliteInfo metabolite={metabolite_data.metabolite} />
          </MetaboliteInfoColumnWrapper>
          {/*
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
            <SettingsWrapper>
              <ConsequenceFiltersWrapper>
                <GenotypesControl
                  categorySelections={this.state}
                  id="genotypes-filter"
                  onChange={this.onGenotypeFilter}
                />
                <SexControl
                  categorySelections={this.state}
                  id="sex-filter"
                  onChange={this.onGenotypeFilter}
                />
              </ConsequenceFiltersWrapper>
            </SettingsWrapper>
            <br /><br /> */}


        {/*<Tabs>
          <div label="Gene">
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
            <SettingsWrapper>
              <ConsequenceFiltersWrapper>
                <GenotypesControl
                  categorySelections={this.state}
                  id="genotypes-filter"
                  onChange={this.onGenotypeFilter}
                />
                <SexControl
                  categorySelections={this.state}
                  id="sex-filter"
                  onChange={this.onGenotypeFilter}
                />
              </ConsequenceFiltersWrapper>
            </SettingsWrapper>
            <br /><br />
          </div>

          <div label="Transcript">

            <Plot
              data={plot_data}
              layout={layout}
              config={config}
            />

            <ModelTranscript
              gene_name={gene_data.gene.gene_name}
              strand={gene_data.gene.strand} 
              composite_transcript={gene_data.gene.composite_transcript}
              transcripts={gene_data.gene.transcripts}
            />
          </div>

          <div label="Exon">
            Exon expression development in progress
          </div>
          <div label="Splice Junction">
            Splice junction expression development in progress
          </div>

           <div label="Differential Expression">
            <DiffExpressionTab
              gene_name={gene_data.gene.gene_name}
            />
          </div>
        </Tabs>*/}


        



      </Page>
    )
  }

}



//export default ExpressionPage
