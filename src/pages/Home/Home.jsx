import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// locals
import { Container } from './styled';
import { AuthContext } from '../../context/auth';
import DecksList from '../../comps/Home/DecksList';
import CommunityDeckList from '../../comps/Home/CommunityDeckList';

const Home = props => {
    const authContext = useContext(AuthContext);

    if (!authContext.user) return <Redirect to="/login" />;

    const {
        user: { name, arenaHandle, decks = [] }
    } = authContext;

    return (
        <Container>
            <h1>Welcome {name}</h1>
            <h4>Handle: {arenaHandle}</h4>

            {!!decks.length && (
                <div>
                    <h4>You're Decks</h4>
                    <DecksList decks={authContext.user.decks} />
                </div>
            )}

            <h4>Community Decks</h4>
            <CommunityDeckList history={props.history} />
        </Container>
    );
};

export default Home;
