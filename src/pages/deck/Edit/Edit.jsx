import React, { useContext } from 'react';
// material-ui
import Grid from '@material-ui/core/Grid';
// locals
import DeckNav from '../../../comps/Deck/DeckNav';
import { AuthContext } from '../../../context/auth';
import { CardContext } from '../../../context/card';
import DeckCard from '../../../comps/Deck/DeckCard';
import AltListForm from '../../../comps/Deck/AltListForm';

// import { getCardNew } from './utils';

function Edit (props) {
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    const deck =
        authContext.user &&
        authContext.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

    return (
        <div>
            <DeckNav {...props} />
            <Grid container justify="center" spacing={1}>
                <DeckCard {...deck} />
                {deck && <AltListForm id={deck.id} />}
            </Grid>

            <h2>Hello Edit</h2>
        </div>
    );
}

export default Edit;
