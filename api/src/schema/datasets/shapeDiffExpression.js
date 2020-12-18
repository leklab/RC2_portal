const shapeDiffExpression = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	gene_symbol: variantData.gene_symbol,
	    	genotype1: variantData.genotype1,
	    	genotype2: variantData.genotype2,
	    	time_point: variantData.time_point,	    	
	    	logfc: variantData.logfc,
	    	pvalue: variantData.pvalue

	    }
  	}



}

export default shapeDiffExpression