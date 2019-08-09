import React from 'react';
import styled from 'styled-components';
import utils from '../../utils';

const { rarityBorderColor } = utils;

const CardContainer = styled.div`
    box-sizing: border-box;
    border: ${({ rarity }) => `2px solid ${rarityBorderColor(rarity)}`};
    padding: 5px;
    background: black;
    min-height: 352px;
    width: 252px;
    font-size: 12;
    color: cornsilk;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardContainerTransform = styled.div`
    box-sizing: border-box;
    border: ${({ rarity }) => `2px solid ${rarityBorderColor(rarity)}`};
    padding: 5px;
    background: black;
    min-height: 180px;
    width: 252px;
    font-size: 12;
    color: cornsilk;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Name = styled.div`
    font-size: 25px;
    color: gold;
`;

const Type = styled.div`
    font-size: 19px;
`;

const Text = styled.div`
    font-size: 17px;
    margin: 10px 0px;
    color: cornsilk;
`;

const CardItem = props => {
    const { name, text, type_line, layout } = props;

    if (layout === 'transform') {
        return (
            <>
                {props.card_faces.map(
                    ({ name: tName, text: tText, type_line: tType }) => {
                        return (
                            <CardContainerTransform key={tName} {...props}>
                                <Name>{tName}</Name>
                                <Type>{tType}</Type>
                                <Text>{tText}</Text>
                            </CardContainerTransform>
                        );
                    }
                )}
            </>
        );
    }

    return (
        <CardContainer {...props}>
            <Name>{name}</Name>
            <Type>{type_line}</Type>
            <Text>{text}</Text>
        </CardContainer>
    );
};

export default CardItem;
