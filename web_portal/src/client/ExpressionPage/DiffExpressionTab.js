import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"
import { SegmentedControl } from '@broad/ui'

import DETable from '../DEList/DETable'

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


const base_layout = {
  title: 'Differential Gene Expression',
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

  xaxis: {
    title: 'log(Fold Change)'
  },

  yaxis: {
    title: '-log(p value)'
  }
}



export class DiffExpressionTab extends Component {

	static propTypes = {
        gene_name: PropTypes.string,
	}

	state = {
    	expression_data: null,
        group1: 'WT',
        group2: 'PKD1_KO',
        timepoint1: 'W7',
        timepoint2: 'W7'
  	}


    fetchExpression = async(time_point,genotype1,genotype2) => {
        const query = `{
          diff_expression(time_point: "${time_point}", genotype1: "${genotype1}", genotype2: "${genotype2}"){
            gene_symbol
            pvalue
            logfc
          }
        }
        ` 
        try{
          console.log("Requesting data")
          console.log(query)
          const expression_data = await request("https://mageik.org/api", query)    
          //console.log(expression_data)
          
          return expression_data
          //this.setState({data: expression_data})

        }catch(error){
          console.log(error)
          return undefined
          //console.log(error)
        }
    }

    async componentDidMount() {
        //componentDidMount() {

        const expression_data = await this.fetchExpression("W7","WT","KO")

        this.mounted = true
        this.setState({expression_data: expression_data})

    }

    componentWillUnmount() {
        this.mounted = false
    }


    filterData = (expression_data) => {
        let plot_data = []  
        let x_data = []
        let y_data = []
        
        for (var i = 0; i < expression_data.length; i++){
            x_data.push(expression_data[i].logfc)    
            y_data.push(-1*Math.log10(expression_data[i].pvalue))    
                    
        }

        plot_data.push({
            y: y_data,  
            x: x_data,
            type: 'scatter',
            mode: 'markers',
            name: 'Test1',
            hoverinfo: 'none',
            marker: { size: 4 }
        }) 

        console.log(plot_data)

        return plot_data

      }


	render() {

        if(!this.mounted){
          console.log("DiffExpressionTab not mounted")
          return(            
            <p>Loading</p>
          )
        }

        const config = {
            displayModeBar: false
        }

        //console.log(this.state.expression_data.diff_expression)        
        const plot_data = this.filterData(this.state.expression_data.diff_expression)

        const sortKey = 'pvalue'
        const sortOrder = 'ascending'

		return (
        <div>
            <Wrapper>
              Group 1: &nbsp; &nbsp; <SegmentedControl
                id="group1-selection"
                onChange={ g1 => {
                    this.setState({ group1: g1 })
                }}
                options={[
                  { label: 'WT', value: 'WT'},
                  { label: 'PKD1_KO', value: 'PKD1_KO' },
                  { label: 'DKO', value: 'DKO' },                  
                ]}
                value={this.state.group1}
              />
              &nbsp; &nbsp; Timepoint 1: &nbsp; &nbsp;
              <SegmentedControl
                id="timepoint1-selection"
                onChange={ t1 => {
                    this.setState({ timepoint1: t1 })
                }}
                options={[
                  { label: 'W7', value: 'W7'},
                  { label: 'W14', value: 'W14' },
                  { label: 'W28', value: 'W28' },                  
                ]}
                value={this.state.timepoint1}
              />
            </Wrapper>
            <Wrapper>  
              Group 2: &nbsp; &nbsp; <SegmentedControl
                id="group2-selection"
                onChange={ g2 => {
                    this.setState({ group2: g2 })
                }}
                options={[
                  { label: 'WT', value: 'WT'},
                  { label: 'PKD1_KO', value: 'PKD1_KO' },
                  { label: 'DKO', value: 'DKO' },                  
                ]}
                value={this.state.group2}
              />
              &nbsp; &nbsp; Timepoint 2: &nbsp; &nbsp;
              <SegmentedControl
                id="timepoint2-selection"
                onChange={ t2 => {
                    this.setState({ timepoint2: t2 })
                }}
                options={[
                  { label: 'W7', value: 'W7'},
                  { label: 'W14', value: 'W14' },
                  { label: 'W28', value: 'W28' },                  
                ]}
                value={this.state.timepoint2}
              />              
            </Wrapper>
            <br />
            <Plot
              data={plot_data}
              layout={base_layout}
              config={config}
            />
            <br /><br /><br />

            <DETable
              sortKey={sortKey}
              sortOrder={sortOrder}
              de_genes={this.state.expression_data.diff_expression}
            />

        </div>
		)
	}
}


