const shapeExpression = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	gene_id: variantData.gene_id,
	    	mouse_id: variantData.mouse_id,
	    	read_count: variantData.read_count
	    }
  	}



}

export default shapeExpression