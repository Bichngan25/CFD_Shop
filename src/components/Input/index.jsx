import React, { forwardRef } from 'react'

const Input = ({label, required, error,renderInput, ...rest}, ref) => {
  
  return (
    <div>
       <div className="form-group"
       >
              <label>{label} {required && <span>*</span>}</label>
              {
                renderInput?.({...rest, error}) || (
                <input 

                type="text"
                {...rest}
                className={`form-control ${error ? "formerror" : ""}`} 
                ref={ref}/>
                )
              }
              {error && <p className="form-error">{error}</p>}
            </div>
    </div>
  )
}

export default forwardRef(Input)