const shapeExpression = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	gene_id: variantData.gene_id,
	    	genotype: variantData.genotype,
	    	phenotype: variantData.phenotype,
	    	sex: variantData.sex,
	    	time_point: variantData.time_point,	    	
	    	rpkm: variantData.rpkm
	    }
  	}



}

export default shapeExpression