import React from "react";

const FormRowSelect = ({ label, name, value, handleChange, list}) => {
  return (
    <div className="container-sm">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e)=>handleChange(e)}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue.name}>
              {itemValue.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
