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
      sortOrder: defaultSortOrder
    }
    
  }
  
   onSort = newSortKey => {
      this.setState(state => {
        const { gene_trap_data, sortKey } = this.state

        let newSortOrder = 'descending'
        if (newSortKey === sortKey) {
          newSortOrder = this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'
        }

        // Since the filter hasn't changed, sort the currently rendered variants instead
        // of filtering the input variants.

        
        const sorted_gene_trap_data = sortGenes(gene_trap_data, {
          sortKey: newSortKey,
          sortOrder: newSortOrder,
        })
        
        return {
          gene_trap_data: sorted_gene_trap_data,
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
                        gene_trap_data: sorted_gene_trap_data})

    }

	render() {

        if(!this.mounted){
          console.log("DiffExpressionTab not mounted")
          return(            
            <p>Loading</p>
          )
        }


		return (
        <Page>
        <DocumentTitle title="Trap Genes" />
        <PageHeading>Trap Genes</PageHeading>
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
                  { label: 'W28', value: 'W28', disabled: true },                  
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
          de_genes={this.state.gene_trap_data}
          onRequestSort={this.onSort}
          onVisibleRowsChange = {this.onVisibleRowsChange}
        />            

        </Page>
		)
	}
}

export default TrapGenePage
