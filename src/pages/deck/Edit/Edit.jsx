import React /* , { useContext } */ from 'react';
import { useQuery } from '@apollo/react-hooks';
// material-ui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import DeckNav from '../../../comps/Deck/DeckNav';
import { Container } from './styled';
// import { AuthContext } from '../../../context/auth';
// import { CardContext } from '../../../context/card';
import DeckCard from '../../../comps/Deck/DeckCard';
import AltCardForm from '../../../comps/Deck/AltCardForm';
// graphql
import DECK_SINGLE_QUERY from '../../../graphql/q/DECK_SINGLE_QUERY';
import utils from '../../../utils';
// import { getCard } from './utils';

function Edit (props) {
    const { buildCardAlternateMap, buildCopyDeckString } = utils;
    const {
        loading,
        data: { singleDeck: deck }
    } = useQuery(DECK_SINGLE_QUERY, {
        variables: { id: props.match.params.id }
    });

    let parsedAltCard;
    let cardAlternateMap;

    if (!loading) {
        parsedAltCard = JSON.parse(deck.altCard);
        cardAlternateMap = buildCardAlternateMap(parsedAltCard);
    }

    if (loading) return <CircularProgress />;

    return (
        <>
            <DeckNav {...props} copyDeckString={buildCopyDeckString(deck)} />
            <Container>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <DeckCard {...deck} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {deck && (
                            <AltCardForm
                                cardAlternateMap={cardAlternateMap}
                                id={deck.id}
                                deck={deck}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Edit;
