const shapeMetaboliteRecord = () => {
  

	console.log("In function")

  	return esHit => {
    // eslint-disable-next-line no-underscore-dangle
    const variantData = esHit._source
    console.log(variantData)
    
	    return {
	    	comp_id: variantData.comp_id,
	    	ctrl_values: variantData.ctrl_values,
	    	exp_values: variantData.exp_values
	    }
  	}


}

export default shapeMetaboliteRecord