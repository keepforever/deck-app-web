import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth';
// locals
import { Container } from './styled';
import UserPlacard from '../../comps/Home/UserPlacard';
import DecksList from '../../comps/Home/DecksList';
import CommunityDeckList from '../../comps/Home/CommunityDeckList';
import GenericPlacard from '../../comps/GenericPlacard';

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
                    <GenericPlacard title="Your Decks" />
                    <DecksList decks={authContext.user.decks} />
                </div>
            )}

            <GenericPlacard title="Community Decks" />
            <CommunityDeckList history={props.history} />
            <br />
        </Container>
    );
};

export default Home;
