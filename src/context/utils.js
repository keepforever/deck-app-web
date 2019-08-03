import React from 'react';
import AnaSet from '../assets/sets/ana.json';
import DarSet from '../assets/sets/dar.json';

export const loadSetData = setCode => {
    const valueSwitch = set => {
        switch (set) {
            case 'ANA':
                return AnaSet;
            case 'DAR':
                return DarSet;
            default:
                return 'error-in-valueSwitch';
        }
    };

    return valueSwitch(setCode);
};
