import { forwardRef } from "react"

export const InputM = ({
  label,
  required,
  error, 
  renderInput = undefined,
  name = "",
  ...inputProps
}, 
ref) =>{
  return (
  <div className="form-group">
    <label className="label" htmlFor={name}>
      {label} {required && <span>*</span>}
    </label>
    {renderInput?.({...inputProps, ref: ref}) || (
      <input
      ref={ref}
      className={`form-control $(!!error ? "input-error" : "")`}
      name={name}
      id={name}
      {...inputProps}
      />
    )}
    <p className="form-error" style={{minHeight: 23}}>
      {error || ""}
    </p>
  </div>
  )
}
export const Input =  forwardRef(InputM)