import { scaleLinear } from 'd3-scale'
import { area } from 'd3-shape'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import {json} from 'd3-fetch'

export class TestTranscript extends Component {

	static propTypes = {
        strand: PropTypes.string,
        gene_name: PropTypes.string,

        composite_transcript: PropTypes.arrayOf(
            PropTypes.shape({
                feature_type: PropTypes.string,
                chrom: PropTypes.string,
                start: PropTypes.number,
                stop: PropTypes.number
            })
        ),

        transcripts: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({
                    feature_type: PropTypes.string,
                    chrom: PropTypes.string,
                    start: PropTypes.number,
                    stop: PropTypes.number
                })
            )
        ),
        /*
        filtered_gene_exons: PropTypes.arrayOf(
            PropTypes.shape({
                feature_type: PropTypes.string,
                chrom: PropTypes.string,
                start: PropTypes.number,
                stop: PropTypes.number
            })
        ),
        */

		xScale: PropTypes.func
	}

	/*
	static defaultProps = {
    	xScale: () => 'dummy'
  	}
	*/

    /*
    constructor(props) {
        super(props)

    }
    */

    /*
	fetchGeneModel = async(gene_id) => {

		const exons = await json('https://gtexportal.org/rest/v1/dataset/collapsedGeneModelExon?gencodeId=ENSG00000143632.14&datasetId=gtex_v8')	
		//console.log(gene_model)

		return exons['collapsedGeneModelExon']

	}
    */

	state = {
    	exons: null
  	}


    /*
	async componentDidMount() {

	    //const exons = await this.fetchGeneModel('genecodeId')
        //console.log("In component did mount")

	    this.mounted = true
	    //this.setState({exons: exons})
  	}

  	componentWillUnmount() {
    	this.mounted = false
  	}
    */

  	setXscale(w){
        // concept explained:
        // assuming the canvas width is fixed
        // the task is how to render all exons + fixed-width introns within the canvas
        // first find the largest exon,
        // then set the x scale of the canvas to accommodate max(exon length)*exon counts,
        // this ensures that there's always space for rendering introns
        // the fixed intron width is calculated as such:
        // ((max(exon length) * exon counts) - total exon length)/(exon counts - 1)

        /*
        this.exons.sort((a,b)=>{
            if (Number(a.chromStart) < Number(b.chromStart)) return -1;
            if (Number(a.chromStart) > Number(b.chromStart)) return 1;
            return 0;
        });
		*/

		// const exons = this.state.exons
		const maxIntronLength = 1000

        //const { filtered_gene_exons } = this.props

        //const filtered_exons = this.props.filtered_gene_exons

        
        const filtered_exons = this.props.composite_transcript.exons.filter(
            exon => exon.feature_type === 'CDS'
        )
        


 		console.log("In setXscale")
		//console.log(filtered_exons)

        filtered_exons.sort((a,b)=>{
            if (Number(a.start) < Number(b.start)) return -1
            if (Number(a.start) > Number(b.start)) return 1
            return 0
        }) 

		//console.log(filtered_exons)

        let sum = 0

        console.log("maxIntronLength: "+maxIntronLength)
       	filtered_exons.forEach((d, i)=>{
            d.length = Number(d.stop) - Number(d.start) + 1
            if (i == 0){
                // the first exon
                sum += d.length
            } else {
                let nb = filtered_exons[i-1] // the upstream neighbor exon
                d.intronLength = Number(d.start) - Number(nb.stop) + 1
                sum += d.length + (d.intronLength > maxIntronLength ? maxIntronLength : d.intronLength)
            }
        })


       	console.log("Sum: "+sum)
		//console.log(filtered_exons)


        const domain = [0, sum]
        const range = [0, w]
        
        
        this.props.xScale = scaleLinear()
            .domain(domain)
            .range(range)

    }

    renderModel = (exon_type) => {
        var exonY = 100
        var transcriptY = 150

        const exonHeight = 15
        const transcript_space = 50

        console.log("In renderModel")

        if(exon_type === 'gene'){
            return(<Fragment>
                        <line x1={0} y1={exonY+(exonHeight/2)} x2={800} y2={exonY+(exonHeight/2)} style={{stroke:'#555f66', strokeWidth: '1px'}} />
                        {this.renderExons(this.props.composite_transcript.exons,exonY)}
                        <text x={this.props.xScale.range()[0]} y={exonY + 30}>
                            {`${this.props.gene_name} Gene Model`}
                        </text>
                </Fragment>)
        }
        else{

            return this.props.transcripts.map(transcript => {
                console.log(transcript.exons)
                transcriptY = transcriptY + transcript_space
                //console.log("exonY: "+exonY)
                //this.renderExons(transcript.exons,exonY)
                return(<Fragment>
                        <line x1={0} y1={transcriptY+(exonHeight/2)} x2={800} y2={transcriptY+(exonHeight/2)} style={{stroke:'#555f66', strokeWidth: '1px'}} />
                        {this.renderExons(transcript.exons,transcriptY)}
                        <text x={this.props.xScale.range()[0]} y={transcriptY + 30}>
                            {`${transcript.transcript_id}`}
                        </text>

                        </Fragment>)
            })
        }
    }
    
 	//renderExons(){
    renderExons = (exons,exonY) => {
		const exonHeight = 15
		//const exonY = 100
		const minExonWidth = 0
		const maxIntronLength = 1000

 		console.log("In render exons")
 		//console.log(this.gene_model)


        //if (this.gene.strand == "+") this.exons.sort((a, b)=>{return Number(a.exonNumber)-Number(b.exonNumber)});
        //else this.exons.sort((a, b)=>{return Number(b.exonNumber)-Number(a.exonNumber)});
        //const { filtered_gene_exons } = this.props
 
        //filtered_exons = this.props.filtered_gene_exons

        //console.log(filtered_exons)

        /*
        const filtered_exons = this.props.composite_transcript.exons.filter(
            exon => exon.feature_type === 'CDS'
        )
        */

        const filtered_exons = exons.filter(
            exon => exon.feature_type === 'CDS'
        )

        //filtered_exons.sort((a, b)=>{return Number(b.exonNumber)-Number(a.exonNumber)})

        filtered_exons.sort((a,b)=>{
            if (Number(a.start) < Number(b.start)) return -1
            if (Number(a.start) > Number(b.start)) return 1
            return 0
        }) 


       	filtered_exons.forEach((d, i) => {
            d.length = Number(d.stop) - Number(d.start) + 1

            if (i == 0) {
                d.x = 0
            } else {
                let nb = filtered_exons[i-1] // the upstream neighbor exon
                d.intronLength = Number(d.start) - Number(nb.stop) + 1

                d.x = 	filtered_exons[i-1].x + 
                		filtered_exons[i-1].w + 
                		this.props.xScale(d.intronLength > maxIntronLength ? maxIntronLength : d.intronLength);
            }
            d.w = this.props.xScale(d.length) < minExonWidth ? minExonWidth : this.props.xScale(d.length)
        })

 		console.log(filtered_exons)

        // var sortedExons = this.gene_model.sort((a, b)=>{return Number(a.exonNumber)-Number(b.exonNumber)})


          
        return filtered_exons.map(exon => {
        		return(
        			<rect 
        				y={exonY} 
        				x={exon.x} 
        				width={exon.w} 
        				height={exonHeight} 
        				fill="#000" 
        				cursor="default"
        			>
                        <title>Exon x {`${exon.chrom}_${exon.start}_${exon.stop}`}</title>
                    </rect>
      			)
        	}
        )
        

 	}

	render() {

		const exonHeight = 15
		const exonY = 100

        /*
        this.props.filtered_gene_exons = this.props.composite_transcript.exons.filter(
            exon => exon.feature_type === 'CDS'
        )
        */
        console.log("Transcript List")
        console.log(this.props.transcripts)

		this.setXscale(800)
        console.log("After set scale")
        //console.log(this.props.filtered_gene_exons)

		return (
			<div>
				<svg height={400} width={820}>
					<g>
                        {this.renderModel('gene')}
                        {this.renderModel('transcript')}                        
					</g>
				</svg>
			</div>
		)
	}
}


