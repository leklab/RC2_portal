import { scaleLinear } from 'd3-scale'
import { area } from 'd3-shape'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import {json} from 'd3-fetch'

import {
  calculateOffsetRegions,
  calculatePositionOffset,
  invertPositionOffset,
  calculateXScale,
} from './coordinates'


export class ModelTranscript extends Component {

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
        
        filtered_gene_exons: PropTypes.arrayOf(
            PropTypes.shape({
                feature_type: PropTypes.string,
                chrom: PropTypes.string,
                start: PropTypes.number,
                stop: PropTypes.number
            })
        ),
        
		scalePosition: PropTypes.func
	}

	state = {
    	exons: null
  	}

    renderExons = (exons,exonY) => {
        const exonHeight = 15
        //const exonY = 100
        const minExonWidth = 0
        const maxIntronLength = 1000

        console.log("In render exons")
          
        return exons.map(exon => {
            const x1 = this.scalePosition(exon.start)
            const x2 = this.scalePosition(exon.stop)

                return(
                    <rect 
                        y={exonY} 
                        x={x1} 
                        width={x2 - x1} 
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

    renderModel = (exon_type) => {
        var exonY = 100
        var transcriptY = 150

        const exonHeight = 15
        const transcript_space = 50

        console.log("In renderModel")

        if(exon_type === 'gene'){
            return(<Fragment>
                        <line x1={0} y1={exonY+(exonHeight/2)} x2={800} y2={exonY+(exonHeight/2)} style={{stroke:'#555f66', strokeWidth: '1px'}} />
                        {this.renderExons(this.props.filtered_gene_exons,exonY)}
                        <text x={0} y={exonY + 30}>
                            {`${this.props.gene_name} Gene Model`}
                        </text>
                </Fragment>)
        }
        
        else{

            return this.props.transcripts.map(transcript => {
                console.log(transcript.exons)
                
                const filtered_exons = transcript.exons.filter(
                    exon => exon.feature_type === 'CDS'
                )

                //console.log("exonY: "+exonY)
                //this.renderExons(transcript.exons,exonY)

                if(filtered_exons.length > 0){
                    transcriptY = transcriptY + transcript_space
                    return(<Fragment>
                            <line x1={0} y1={transcriptY+(exonHeight/2)} x2={800} y2={transcriptY+(exonHeight/2)} style={{stroke:'#555f66', strokeWidth: '1px'}} />
                            {this.renderExons(filtered_exons,transcriptY)}
                            <text x={0} y={transcriptY + 30}>
                                {`${transcript.transcript_id}`}
                            </text>

                            </Fragment>)
                }

            })
        }

    }


	render() {

		const exonHeight = 15
		const exonY = 100

        console.log("Composite transcripts")

        this.props.filtered_gene_exons = this.props.composite_transcript.exons.filter(
            exon => exon.feature_type === 'CDS'
        )

        console.log(this.props.filtered_gene_exons)

        const padding = 50
        const panelWidth = 800

        const offsetRegions = calculateOffsetRegions(padding, this.props.filtered_gene_exons)
        const positionOffset = calculatePositionOffset(offsetRegions)
        const xScale = calculateXScale(panelWidth, offsetRegions)
        const invertOffset = invertPositionOffset(offsetRegions, xScale)
        this.scalePosition = pos => xScale(positionOffset(pos).offsetPosition)
        this.scalePosition.invert = invertOffset

        /*
        this.props.filtered_gene_exons.forEach((d, i) => {
            const x1 = this.scalePosition(d.start)
            const x2 = this.scalePosition(d.stop)

            console.log("o_start: "+d.start+" o_stop: "+d.stop)
            console.log("start: "+x1+" stop: "+x2)

        })
        */


		return (
			<div>
                <svg height={800} width={820}>
                    <g>
                        {this.renderModel('gene')}
                        {this.renderModel('transcript')}
                    </g>
                </svg>
			</div>
		)
	}
}


