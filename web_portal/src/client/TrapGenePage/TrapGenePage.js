import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"
import { Page, PageHeading, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

//import throttle from 'lodash.throttle'
import DETable from './DEList/DETable'
import sortGenes from './DEList/sortGenes'

import { SignificanceControl } from './SignificanceControl'
import { DirectionControl } from './DirectionControl'


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



class TrapGenePage extends Component {

  /*
	static propTypes = {
        gene_name: PropTypes.string,
	}
  */


  constructor(props) {
    super(props)

    const defaultSortKey = 'sko_expr'
    const defaultSortOrder = 'descending'

    
    this.state = {
      gene_trap_data: null,
      timepoint: 'W10',
      sex: 'M',
      sortKey: defaultSortKey,
      sortOrder: defaultSortOrder,
      includeUp: true,
      includeDown: true,
      includeFDR005: true,
      includeFDR025: true
    }
    
  }


  includeDataPoint = (data) => {
    return this.includeDirection(data) && this.includeSignificance(data)    
  }


  includeDirection = (data) => {
    if(this.state.includeUp && data.direction.localeCompare("Up") == 0){
      return true
    }
    else if(this.state.includeDown && data.direction.localeCompare("Down") == 0){
      return true
    }
    else{
      return false
    }
  }

  includeSignificance = (data) => {
    if(this.state.includeFDR005 && data.sig_code.localeCompare("FDR005") == 0){
      //console.log("Include FDR005 data point")
      //console.log(data)
      return true
    }
    else if(this.state.includeFDR025 && data.sig_code.localeCompare("FDR025") == 0){
      //console.log("Include FDR025 data point")
      //console.log(data)
      return true
    }
    else{
      return false
    }
  }


   onFilter = (state) => {
      console.log("In Filter")
      console.log(state)
      this.setState(state)

      /*
      const {gene_trap_data, display_trap_data,sortKey, sortOrder} = this.state
      var filteredData = []

      console.log("Before filtering")
      console.log(gene_trap_data)

      for (var i = 0; i < gene_trap_data.length; i++){
        if(this.includeDataPoint(gene_trap_data[i])){
          filteredData.push(gene_trap_data[i])
        }
      }

      console.log("After filtering")
      console.log(filteredData)
      
      
      const sorted_gene_trap_data = sortGenes(filteredData, {
        sortKey: sortKey,
        sortOrder: sortOrder,
      })
      

      this.setState({display_trap_data: sorted_gene_trap_data})
      */
    }

   filterData = (trap_data) => {
      var filteredData = []
      const {sortKey, sortOrder} = this.state


      console.log("Before filtering")
      console.log(trap_data)

      for (var i = 0; i < trap_data.length; i++){
        if(this.includeDataPoint(trap_data[i])){
          filteredData.push(trap_data[i])
        }
      }

      console.log("After filtering")
      console.log(filteredData)
      
      
      const sorted_gene_trap_data = sortGenes(filteredData, {
        sortKey: sortKey,
        sortOrder: sortOrder,
      })
      
      return sorted_gene_trap_data

      //this.setState({display_trap_data: sorted_gene_trap_data})
      
    }


  
   onSort = newSortKey => {
      this.setState(state => {
        const { display_trap_data, sortKey } = this.state

        let newSortOrder = 'descending'
        if (newSortKey === sortKey) {
          newSortOrder = this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'
        }

        // Since the filter hasn't changed, sort the currently rendered variants instead
        // of filtering the input variants.

        
        const sorted_gene_trap_data = sortGenes(display_trap_data, {
          sortKey: newSortKey,
          sortOrder: newSortOrder,
        })        
        return {
          display_trap_data: sorted_gene_trap_data,
          sortKey: newSortKey,
          sortOrder: newSortOrder,
        }
      })
    }


    fetchTrapGenes = async(time_point,sex) => {
        const query = `{
          trap_genes(time_point: "${time_point}", sex: "${sex}"){
            gene_name
            gene_id
            direction
            sig_code
            sko_expr
            dko_expr
            wt_expr
            time_point
            sex
          }
        }
        ` 
        try{
          console.log("Requesting data")
          console.log(query)
          const data = await request("https://mageik.org/api", query)    
          console.log(data)
          
          return data.trap_genes
          //this.setState({data: expression_data})

        }catch(error){
          console.log(error)
          return undefined
          //console.log(error)
        }
    }

    async componentDidMount() {
        //componentDidMount() {

        const gene_trap_data = await this.fetchTrapGenes(this.state.timepoint,this.state.sex)

        this.mounted = true
        //this.setState({gene_trap_data: gene_trap_data})
        this.updateData(gene_trap_data)

        console.log("In componentDidMount")

    }

    componentWillUnmount() {
        this.mounted = false
    }


    updateData = (gene_trap_data) => {

        const defaultSortKey = 'sko_expr'
        const defaultSortOrder = 'descending'

        
        const sorted_gene_trap_data = sortGenes(gene_trap_data, {
          sortKey: defaultSortKey,
          sortOrder: defaultSortOrder,
        })
        

        this.setState({ sortKey: defaultSortKey,
                        sortOrder: defaultSortOrder,
                        display_trap_data: [...sorted_gene_trap_data],
                        gene_trap_data: sorted_gene_trap_data})

    }



	render() {

      if(!this.mounted){
        console.log("DiffExpressionTab not mounted")
        return(            
          <p>Loading</p>
        )
      }
    console.log("In Render and new state")
    console.log(this.state)

    const display_data = this.filterData(this.state.display_trap_data)


		return (
        <Page>
        <DocumentTitle title="TRAO Genes" />
        <PageHeading>TRAP Overlap Genes</PageHeading>
            <Wrapper>
              &nbsp; &nbsp; Timepoint: &nbsp; &nbsp;
              <SegmentedControl
                id="timepoint-selection"
                onChange={ t => {
                    this.setState({ timepoint: t })
                    this.fetchTrapGenes(t,this.state.sex).then( data =>{
                        this.updateData(data)
                      })
                }}
                options={[
                  { label: 'W7', value: 'W7'},
                  { label: 'W10', value: 'W10'},
                ]}
                value={this.state.timepoint}
              />
              &nbsp; &nbsp; Sex: &nbsp; &nbsp;
              <SegmentedControl
                id="sex-selection"
                onChange={ s => {
                    this.setState({ sex: s })
                    this.fetchTrapGenes(this.state.timepoint,s).then( data =>{
                        this.updateData(data)
                      })
                }}
                options={[
                  { label: 'Male', value: 'M'},
                  { label: 'Female', value: 'F'}
                ]}
                value={this.state.sex}
              />
            </Wrapper>
        
        <br /><br />
        <DETable
          sortKey={this.state.sortKey}
          sortOrder={this.state.sortOrder}
          de_genes={display_data}
          onRequestSort={this.onSort}
          onVisibleRowsChange = {this.onVisibleRowsChange}
        />            

        <SettingsWrapper>
          <ConsequenceFiltersWrapper>
            <DirectionControl
              categorySelections={this.state}
              id="direction-filter"
              onChange={this.onFilter}
            />
            <SignificanceControl
              categorySelections={this.state}
              id="significance-filter"
              onChange={this.onFilter}
            />            
          </ConsequenceFiltersWrapper>
        </SettingsWrapper>
        <br /><br />



        </Page>
		)
	}
}

export default TrapGenePage
