import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Plot from 'react-plotly.js'
import { request } from "graphql-request"
import { Page, PageHeading, SegmentedControl } from '@broad/ui'
import DocumentTitle from '../DocumentTitle'

import throttle from 'lodash.throttle'
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


const base_layout = {
  title: 'Differential Gene Expression',
  autosize: false,
  width: 650,
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
    title: '-log(p value)',
    rangemode: 'tozero'
  }
}



class DiffExpressionPage extends Component {

  /*
	static propTypes = {
        gene_name: PropTypes.string,
	}
  */


  constructor(props) {
    super(props)

    const defaultSortKey = 'pvalue'
    const defaultSortOrder = 'ascending'

/*    const renderedVariants = sortVariants(
      mergeExomeAndGenomeData(filterVariants(props.variants, defaultFilter)),
      {
        sortKey: defaultSortKey,
        sortOrder: defaultSortOrder,
      }
    )
*/

    /*
    this.state = {
      filter: defaultFilter,
      hoveredVariant: null,
      rowIndexLastClickedInNavigator: 0,
      renderedVariants,
      visibleVariantWindow: [0, 19],
    }
    */

    this.state = {
      expression_data: null,
      group1: 'WT',
      group2: 'KO',
      timepoint1: 'W7',
      timepoint2: 'W7',
      sex: 'M',
      sortKey: defaultSortKey,
      sortOrder: defaultSortOrder,
      visibleGeneWindow: [0, 14],
    }

  }
   onSort = newSortKey => {
      this.setState(state => {
        const { expression_data, sortKey } = this.state

        let newSortOrder = 'descending'
        if (newSortKey === sortKey) {
          newSortOrder = this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'
        }

        // Since the filter hasn't changed, sort the currently rendered variants instead
        // of filtering the input variants.
        const sortedGenes = sortGenes(expression_data, {
          sortKey: newSortKey,
          sortOrder: newSortOrder,
        })

        return {
          expression_data: sortedGenes,
          sortKey: newSortKey,
          sortOrder: newSortOrder,
        }
      })
    }

    onVisibleRowsChange = throttle(({ startIndex, stopIndex }) => {
      this.setState({ visibleGeneWindow: [startIndex, stopIndex] })
    }, 100)

    fetchExpression = async(time_point,genotype1,genotype2) => {
        const query = `{
          diff_expression(time_point: "${time_point}", genotype1: "${genotype1}", genotype2: "${genotype2}"){
            gene_name
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
          
          return expression_data.diff_expression
          //this.setState({data: expression_data})

        }catch(error){
          console.log(error)
          return undefined
          //console.log(error)
        }
    }

    async componentDidMount() {
        //componentDidMount() {

        const expression_data = await this.fetchExpression("W7",this.state.group1,this.state.group2)

        this.mounted = true
        this.setState({expression_data: expression_data})

        console.log("In componentDidMount")

    }

    componentWillUnmount() {
        this.mounted = false
    }

    updateData = (expression_data) => {

        const defaultSortKey = 'pvalue'
        const defaultSortOrder = 'ascending'

        const sortedGenes = sortGenes(expression_data, {
          sortKey: defaultSortKey,
          sortOrder: defaultSortOrder,
        })
        
        this.setState({ sortKey: defaultSortKey,
                        sortOrder: defaultSortOrder,
                        visibleGeneWindow: [0, 14],
                        expression_data: sortedGenes})

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
            marker: { size: 4, color: 'rgb(174, 214, 241)'}
        }) 


        const window_start = this.state.visibleGeneWindow[0]
        const window_end = this.state.visibleGeneWindow[1]

        //console.log("start index: "+ window_start)
        //console.log("stop index: "+ window_end)


        for (var i= window_start; i <= window_end; i++){
          plot_data.push({
              y: [-1*Math.log10(expression_data[i].pvalue)],  
              x: [expression_data[i].logfc],
              type: 'scatter',
              mode: 'markers',
              hoverinfo: 'name',
              name: expression_data[i].gene_name,
              hoveron: 'points',
              marker: { size: 6, color: 'rgb(44, 160, 101)'}
          }) 

        }

        //console.log(plot_data)

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
        const plot_data = this.filterData(this.state.expression_data)
        //console.log("Visible Window Changed")
        //console.log(this.state.visibleGeneWindow)


		return (
        <Page>
        <DocumentTitle title="Differential Gene Expression" />
        <PageHeading>Differential Gene Expression</PageHeading>
            <Wrapper>
              Group 1: &nbsp; &nbsp; <SegmentedControl
                id="group1-selection"
                onChange={ g1 => {
                    this.setState({ group1: g1 })

                    console.log("Loading new data")
                    console.log("group1: "+this.state.group1)
                    console.log("g1 group1: "+g1)                    
                    console.log("group2: "+this.state.group2)

                    if(g1 === 'KO'){
                      this.setState({ group2: 'DKO' })
                      this.fetchExpression("W7",g1,'DKO').then( data =>{
                          //this.setState({expression_data: data})
                          this.updateData(data)
                        })
                    }
                    else{
                      this.fetchExpression("W7",g1,this.state.group2).then( data =>{
                          //this.setState({expression_data: data})
                          this.updateData(data)
                        })
                    }
                    
                    //const expression_data = await this.fetchExpression("W7",this.state.group1,this.state.group2)
                    //this.setState({expression_data: expression_data})                    
                    
                }}
                options={[
                  { label: 'Normal', value: 'WT'},
                  { label: 'Pkd1_KO', value: 'KO' },
                  { label: 'Pkd1_Kif3a_KO', value: 'DKO', disabled: true },                  
                ]}
                value={this.state.group1}
              />
              &nbsp; &nbsp; Timepoint: &nbsp; &nbsp;
              <SegmentedControl
                id="timepoint1-selection"
                onChange={ t1 => {
                    this.setState({ timepoint1: t1 })
                }}
                options={[
                  { label: 'W7', value: 'W7'},
                  { label: 'W10', value: 'W10', disabled: true },
                  { label: 'W28', value: 'W28', disabled: true },                  
                ]}
                value={this.state.timepoint1}
              />
              &nbsp; &nbsp; Sex: &nbsp; &nbsp;
              <SegmentedControl
                id="sex-selection"
                onChange={ s => {
                    this.setState({ sex: s })
                }}
                options={[
                  { label: 'Male', value: 'M'},
                  { label: 'Female', value: 'F'}
                ]}
                value={this.state.sex}
              />
            </Wrapper>
            <Wrapper>  
              Group 2: &nbsp; &nbsp; <SegmentedControl
                id="group2-selection"
                onChange={ g2 => {
                    this.setState({ group2: g2 })

                    console.log("Loading new data")
                    console.log("group1: "+this.state.group1)
                    console.log("group2: "+this.state.group2)
                    console.log("g2 group2: "+g2)

                    // const expression_data = await this.fetchExpression("W7",this.state.group1,this.state.group2)
                    //this.setState({expression_data: expression_data})

                    this.fetchExpression("W7",this.state.group1,g2).then( data =>{
                        //this.setState({expression_data: data})
                        this.updateData(data)
                      })

                }}
                options={[
                  { label: 'Normal', value: 'WT', disabled: true},
                  { label: 'Pkd1_KO', value: 'KO', disabled: !(this.state.group1 === 'WT') },
                  { label: 'Pkd1_Kif3a_KO', value: 'DKO' },                  
                ]}
                value={this.state.group2}
              />
            </Wrapper>
            <br />

            <Wrapper>
            <Plot
              data={plot_data}
              layout={base_layout}
              config={config}
            />
            <br />
            <DETable
              sortKey={this.state.sortKey}
              sortOrder={this.state.sortOrder}
              de_genes={this.state.expression_data}
              onRequestSort={this.onSort}
              onVisibleRowsChange = {this.onVisibleRowsChange}
            />            
            </Wrapper>


        </Page>
		)
	}
}

export default DiffExpressionPage
