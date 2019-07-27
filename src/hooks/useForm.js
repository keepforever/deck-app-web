import { useState } from 'react';

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        },
        () => {
            setValues(prevState => {
                const stateKeys = Object.keys(prevState);
                const clearStateObj = {};
                stateKeys.forEach(el => {
                    clearStateObj[el] = '';
                });
                return {
                    ...clearStateObj
                };
            });
        }
    ];
};
