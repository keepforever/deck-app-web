import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
// material-ui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import DeckCard from '../../../comps/Deck/DeckCard';
import { Container } from './styled';
import { CardContext } from '../../../context/card';
import CardItem from '../../../comps/Deck/CardItem';
import DeckNav from '../../../comps/Deck/DeckNav';
import DECK_SINGLE_QUERY from '../../../graphql/q/DECK_SINGLE_QUERY';
// utils
import utils from '../../../utils';

const CardDetails = props => {
    const { getCard } = utils;
    const cardContext = useContext(CardContext);

    const {
        loading,
        data: { singleDeck: deck }
    } = useQuery(DECK_SINGLE_QUERY, {
        variables: { id: props.match.params.id }
    });

    if (loading) return <CircularProgress />;

    return (
        <>
            <DeckNav {...props} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Container>
                    {deck && <DeckCard {...deck} maxWidth={540} />}
                    {deck && (
                        <Paper
                            style={{
                                marginTop: 30,
                                maxWidth: 'calc(100vw - 32px)'
                            }}
                        >
                            <Grid
                                container
                                style={{
                                    padding: 30
                                }}
                                spacing={4}
                            >
                                {deck.list.split('\n').map(card => {
                                    const finalCard = getCard(
                                        card,
                                        cardContext
                                    );
                                    return (
                                        <Grid item key={finalCard.name}>
                                            <CardItem {...finalCard} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Paper>
                    )}
                    {deck &&
                        deck.sideBoardList &&
                        deck.sideBoardList.length && <h2>Side Board</h2>}
                    {deck && deck.sideBoardList && deck.sideBoardList.length && (
                        <Grid
                            container
                            style={{
                                padding: 0,
                                margin: 0,
                                maxWidth: 'calc(100vw - 32px)'
                            }}
                            spacing={4}
                        >
                            {deck.sideBoardList.split('\n').map(card => {
                                const finalCard = getCard(card, cardContext);
                                return (
                                    <Grid item key={finalCard.name}>
                                        <CardItem {...finalCard} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Container>
            </div>
        </>
    );
};

export default CardDetails;
