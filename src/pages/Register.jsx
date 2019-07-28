import React from 'react';
// locals
import RegisterForm from '../comps/RegisterForm/RegisterForm';

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
            <RegisterForm />
        </div>
    );
};

export default Register;
