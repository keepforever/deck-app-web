import React, { useContext } from 'react';
// material-ui
import Grid from '@material-ui/core/Grid';
// locals
import { AuthContext } from '../../../context/auth';
import { CardContext } from '../../../context/card';
import CardItem from '../../../comps/Deck/CardItem';
import DeckNav from '../../../comps/Deck/DeckNav';
// utils
import utils from '../../../utils';

const CardDetails = props => {
    const { getCard } = utils;
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    const deck =
        authContext.user &&
        authContext.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

    return (
        <>
            <DeckNav {...props} />
            {deck && <h2>Deck Title: {deck.title}</h2>}
            {deck && (
                <Grid
                    container
                    style={{
                        padding: 0,
                        margin: 0,
                        maxWidth: 'calc(100vw - 32px)'
                    }}
                    spacing={4}
                >
                    {deck.list.split('\n').map(card => {
                        const finalCard = getCard(card, cardContext);
                        return (
                            <Grid item key={finalCard.name}>
                                <CardItem {...finalCard} />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </>
    );
};

export default CardDetails;
