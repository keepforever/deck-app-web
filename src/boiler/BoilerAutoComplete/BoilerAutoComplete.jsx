import React from 'react';
import Select, { createFilter } from 'react-select';
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
import suggestions from '../../assets/reactSelectOptions.json';

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
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
                <Select
                    filterOption={createFilter({ ignoreAccents: false })}
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
                    options={suggestions}
                    components={components}
                    value={single}
                    onChange={handleChangeSingle}
                />
            </NoSsr>
        </div>
    );
}
