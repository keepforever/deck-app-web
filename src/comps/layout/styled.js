import styled from 'styled-components';

export const Container = styled.div`
    /* height: calc(100vh - 64px); */
    height: 100%;
    display: flex;
    color: #282828;
    /* background: lightgrey; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const layoutStyles = theme => ({
    root: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '85vw',
        maxWidth: '86vw',
        minHeight: '75vh',
        padding: '40px'
    }
});

export const navbarStyles = {
    root: {
        flexGrow: 1,
        marginBottom: '68px'
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};
