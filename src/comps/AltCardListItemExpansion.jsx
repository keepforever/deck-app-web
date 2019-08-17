import React from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AltCardListItemExpansion (props) {
    const { name, type_line, onDialogOpen } = props;
    return (
        <ExpansionPanel
            color="inherit"
            key={name}
            disabled={false}
            style={{
                width: '100%'
            }}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{name}</Typography>
                <Button color="inherit" onClick={onDialogOpen}>
                    Add Alt
                </Button>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>{type_line}</Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
