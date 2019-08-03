// import React from 'react';
import grn from '../assets/sets/grn.json';
import m19 from '../assets/sets/m19.json';
import dar from '../assets/sets/dar.json';
import xln from '../assets/sets/xln.json';
import rna from '../assets/sets/rna.json';

export const loadSetData = setCode => {
    const valueSwitch = set => {
        switch (set) {
            case 'grn':
                return grn;
            case 'm19':
                return m19;
            case 'dar':
                return dar;
            case 'xln':
                return xln;
            case 'rna':
                return rna;
            default:
                return 'error-in-valueSwitch';
        }
    };

    return valueSwitch(setCode);
};
