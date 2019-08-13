import React, { useContext } from 'react';
// material-ui
import Grid from '@material-ui/core/Grid';
// locals
import DeckNav from '../../../comps/Deck/DeckNav';
import { AuthContext } from '../../../context/auth';
// import { CardContext } from '../../../context/card';
import DeckCard from '../../../comps/Deck/DeckCard';
import AltListForm from '../../../comps/Deck/AltListForm';
import AltCardForm from '../../../comps/Deck/AltCardForm';

// import { getCard } from './utils';

function Edit (props) {
    const authContext = useContext(AuthContext);
    // const cardContext = useContext(CardContext);

    const deck =
        authContext.user &&
        authContext.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

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
