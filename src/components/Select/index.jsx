import React from 'react'
// chuyen opstions
const Select = ({options,error, ...rest}) => {
  return (
    <div>
        <select {...rest} className={`form-control ${error ? "formerror" : ""}`}>
            {
                options?.map((option, index) => <option key={option?. value || index} value={option?.value}>{option?.label || ""}</option>)
            }
        </select>
    </div>
  )
}

export default Select