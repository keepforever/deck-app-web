import React from 'react';
// import Select, { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
// locals
import {
    NoOptionsMessage,
    Control,
    Option,
    Placeholder,
    ValueContainer,
    Menu,
    SingleValue,
    useStyles
} from './helperComps';
// data
import cardOptions from '../../../assets/reactSelectOptions.json';

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

const filterColors = (inputValue) => {
    return cardOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterColors(inputValue));
    }, 1000);
};

export default function IntegrationReactSelect () {
    const classes = useStyles();
    const theme = useTheme();
    const [single, setSingle] = React.useState(null);

    function handleChangeSingle (value) {
        setSingle(value);
    }

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit'
            }
        })
    };

    return (
        <div className={classes.root}>
            <NoSsr>
                <AsyncSelect
                    // filterOption={createFilter({ ignoreAccents: false })}
                    loadOptions={loadOptions}
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    TextFieldProps={{
                        label: 'Card',
                        InputLabelProps: {
                            htmlFor: 'react-select-single',
                            shrink: true
                        }
                    }}
                    placeholder="Search for a card..."
                    options={cardOptions}
                    components={components}
                    value={single}
                    onChange={handleChangeSingle}
                />
            </NoSsr>
        </div>
    );
}
