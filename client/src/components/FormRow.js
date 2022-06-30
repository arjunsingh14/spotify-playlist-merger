import React from 'react'


const FormRow = ({ name, label, value, type, handleChange}) => {
  return (
    <div className=" container-sm">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}

export default FormRow


