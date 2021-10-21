const shapeTrapGenes = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	gene_id: variantData.gene_id,
	    	gene_name: variantData.gene_name,
	    	time_point: variantData.time_point,	    	
	    	sex: variantData.sex,	    	
	    	sko_expr: variantData.sko_expr,	    	
	    	dko_expr: variantData.dko_expr,	    	
	    	wt_expr: variantData.wt_expr,	    	
	    	sig_code: variantData.sig_code,	    	
	    	direction: variantData.direction
	    }
  	}



}

export default shapeTrapGenes