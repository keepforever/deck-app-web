import React from 'react';
import uuid from 'uuid';
// material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// locals
import { useAltCardListItemExpansionStyles } from './styles';
import CardItem from '../comps/Deck/CardItem';

export default function AltCardListItemExpansion (props) {
    const { name, onDialogOpen, altCards = [] } = props;
    const classes = useAltCardListItemExpansionStyles(altCards.length);
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
                <Grid
                    container
                    spacing={1}
                    alignContent="center"
                    justify="space-between"
                >
                    <Grid
                        item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={onDialogOpen}>
                            Add Alt
                        </Button>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
                <Grid container spacing={4}>
                    {!!altCards.length &&
                        altCards.map(c => {
                            return (
                                <Grid item key={uuid.v4()}>
                                    <CardItem {...c} />
                                </Grid>
                            );
                        })}
                    {!altCards.length && (
                        <Grid item>
                            <Typography variant="h5">
                                No Alternative Cards Have Been Submitted
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
