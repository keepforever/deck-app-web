import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// locals
import UserPlacard from '../../comps/Home/UserPlacard';
import { Container } from './styled';
import { AuthContext } from '../../context/auth';
import DecksList from '../../comps/Home/DecksList';
import Typography from '@material-ui/core/Typography';
import CommunityDeckList from '../../comps/Home/CommunityDeckList';

const Home = props => {
    const authContext = useContext(AuthContext);

    if (!authContext.user) return <Redirect to="/login" />;

    const {
        user: { name, arenaHandle, decks = [] }
    } = authContext;

    return (
        <Container>
            <UserPlacard name={name} handle={arenaHandle} />
            {!!decks.length && (
                <div>
                    <Typography variant="h3">You're Decks</Typography>
                    <DecksList decks={authContext.user.decks} />
                </div>
            )}

            <h4>Community Decks</h4>
            <CommunityDeckList history={props.history} />
        </Container>
    );
};

export default Home;
