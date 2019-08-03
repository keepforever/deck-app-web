export function rarityBorderColor (str) {
    switch (str) {
        case 'mythic':
            return 'orange';
        case 'rare':
            return 'yellow';
        case 'uncommon':
            return 'blue';
        case 'common':
            return 'white';
        default:
            return 'white';
    }
}

export default {
    rarityBorderColor
};
