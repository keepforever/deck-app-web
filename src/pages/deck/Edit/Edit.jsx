import React /* , { useContext } */ from 'react';
import { useQuery } from '@apollo/react-hooks';
// material-ui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import DeckNav from '../../../comps/Deck/DeckNav';
// import { AuthContext } from '../../../context/auth';
// import { CardContext } from '../../../context/card';
import DeckCard from '../../../comps/Deck/DeckCard';
import AltListForm from '../../../comps/Deck/AltListForm';
import AltCardForm from '../../../comps/Deck/AltCardForm';
// graphql
import DECK_SINGLE_QUERY from '../../../graphql/q/DECK_SINGLE_QUERY';

// import { getCard } from './utils';

function Edit (props) {
    // const authContext = useContext(AuthContext);
    // const cardContext = useContext(CardContext);

    // const deck =
    //     authContext.user &&
    //     authContext.user.decks.filter(d => {
    //         return d.id === props.match.params.id;
    //     })[0];

    const {
        loading,
        data: { singleDeck: deck }
    } = useQuery(DECK_SINGLE_QUERY, {
        variables: { id: props.match.params.id }
    });

    !loading && console.log('\n', '\n', `singleDeck = `, deck, '\n', '\n');

    if (loading) return <CircularProgress />;

    return (
        <div>
            <DeckNav {...props} />
            <DeckCard {...deck} />
            <Grid container justify="center" spacing={1}>
                <Grid item>{deck && <AltListForm id={deck.id} />}</Grid>
                <Grid item>
                    <div style={{ maxWidth: 400 }}>
                        {deck && <AltCardForm id={deck.id} deck={deck} />}
                    </div>
                </Grid>
            </Grid>

            <h2>Hello Edit</h2>
        </div>
    );
}

export default Edit;
