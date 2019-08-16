import React from 'react';
// locals
import RegisterForm from '../comps/RegisterForm';

const Register = props => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <RegisterForm {...props} />
        </div>
    );
};

export default Register;
