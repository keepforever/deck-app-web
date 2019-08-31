import React, { useState } from 'react';
import styled from 'styled-components';
import utils from '../../utils';
import Button from '@material-ui/core/Button';

const { rarityBorderColor } = utils;

const CardContainer = styled.div`
    box-sizing: border-box;
    border: ${({ rarity }) => `3px solid ${rarityBorderColor(rarity)}`};
    border-radius: 10px;
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
    border-radius: 10px;
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

const CardContainerSplit = styled.div`
    box-sizing: border-box;
    border: ${({ rarity }) => `2px solid ${rarityBorderColor(rarity)}`};
    border-radius: 10px;
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

    const [cardFaceToShow, setCardFaceToShow] = useState(0);

    function handleFlipCard () {
        setCardFaceToShow(face => (face === 0 ? 1 : 0));
    }

    if (props.isUnknown) {
        return (
            <CardContainer {...props}>
                <Name>
                    <span role="img" aria-label="question_mark">
                        ❓
                    </span>
                </Name>
                <Type>
                    <span role="img" aria-label="question_mark">
                        ❓
                    </span>
                </Type>
                <Text>
                    <span role="img" aria-label="question_mark">
                        ❓
                    </span>
                </Text>
            </CardContainer>
        );
    }

    if (layout === 'transform') {
        return (
            <>
                {props.card_faces.map(
                    (
                        {
                            name: transformName,
                            text: transformText,
                            type_line: transformTypeLine
                        },
                        index
                    ) => {
                        return (
                            <CardContainerTransform
                                key={transformName}
                                show={cardFaceToShow === index}
                                {...props}
                            >
                                <Name>{transformName}</Name>
                                <Type>{transformTypeLine}</Type>
                                <Text>{transformText}</Text>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFlipCard}
                                    fullWidth
                                >
                                    Flip
                                </Button>
                            </CardContainerTransform>
                        );
                    }
                )}
            </>
        );
    }

    // "xxx230rna": {
    //     "name": "Warrant // Warden",
    //     "lookup": "xxx230rna",
    //     "cmc": 7,
    //     "arena_id": 69376,
    //     "collector_number": "230",
    //     "set": "rna",
    //     "mana_cost": "{W/U}{W/U} // {3}{W}{U}",
    //     "rarity": "rare",
    //     "pt": "undefined/undefined",
    //     "color": "UW",
    //     "layout": "split",
    //     "card_faces": [
    //         {
    //             "name": "Warrant",
    //             "type_line": "Instant",
    //             "mana_cost": "{W/U}{W/U}",
    //             "text": "Put target attacking or blocking creature on top of its owner's library.",
    //             "color": null
    //         },
    //         {
    //             "name": "Warden",
    //             "type_line": "Sorcery",
    //             "mana_cost": "{3}{W}{U}",
    //             "text": "Create a 4/4 white and blue Sphinx creature token with flying and vigilance.",
    //             "color": null
    //         }
    //     ]
    // },

    if (layout === 'split') {
        console.log('\n', '\n', `hello split = `, '\n', '\n');
        return (
            <>
                {props.card_faces.map(
                    (
                        {
                            name: splitName,
                            text: splitText,
                            type_line: splitTypeLine
                        },
                        index
                    ) => {
                        console.log(
                            '\n',
                            '\n',
                            `cardFaceToShow === index = `,
                            cardFaceToShow === index,
                            '\n',
                            '\n'
                        );
                        return (
                            <CardContainerSplit
                                style={{
                                    display:
                                        cardFaceToShow === index ? null : 'none'
                                }}
                                {...props}
                            >
                                <Name>{splitName}</Name>
                                <Type>{splitTypeLine}</Type>
                                <Text>{splitText}</Text>
                                <Button
                                    variant="contained"
                                    onClick={handleFlipCard}
                                    color="primary"
                                    fullWidth
                                >
                                    Flip
                                </Button>
                            </CardContainerSplit>
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
