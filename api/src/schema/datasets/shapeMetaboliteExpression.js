const shapeMetaboliteExpression = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	biochemical: variantData.biochemical,
	    	platform: variantData.platform,
	    	comp_id: variantData.comp_id,
	    	kegg: variantData.kegg,
	    	group_hmdb: variantData.group_hmdb,	    	
	    	pubchem: variantData.pubchem,	    	
	    	fc: variantData.fc,
	    	pvalue: variantData.pvalue,
			adj_pvalue: variantData.adj_pvalue,
			super_pathway: variantData.super_pathway,
	    	avg_exp: variantData.avg_exp
	    }
  	}



}

export default shapeMetaboliteExpression