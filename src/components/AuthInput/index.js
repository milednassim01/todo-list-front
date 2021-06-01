import React from 'react';


function AuthInput({ value, handleFunction, typeInput, placeholder, icon, name,submitFunction }) {
    console.log(submitFunction,'uffff')
    return (
        <div className="input-card" >
            {icon}
            <input
                {...submitFunction}
                className="input"
                name={name}
                type={typeInput}
                value={value}
                placeholder={placeholder}
                onChange={handleFunction}
            />
        </div>
    );
}

export default AuthInput;
