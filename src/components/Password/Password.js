import React, { useState } from "react";

const Password = ({ fieldName, fieldValue, onChange, ...other }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-space-btw w-100">
      <input
        type={`${showPassword ? "text" : "password"}`}
        placeholder="*******"
        className="input-box"
        value={fieldValue}
        onChange={onChange}
        name={fieldName}
        required
        {...other}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="show-icon"
      >
        <i
          className={`fa-solid  ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
        ></i>
      </span>
    </div>
  );
};

export default Password;
