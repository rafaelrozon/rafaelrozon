/**
 *
 *  light green: #60E280
    pink: #7F01BC
    green: #39AE6D
    light pink: #B89FFF
    light blue: #4FACCC
    yellow: #F1C809
    red: #DA0109
    lilas: #B8A2FE
    light grey: #A9A9A9

    mostard: #EEA047, #FFB244
    red: #EB4D55
    amarelo: #F0D01A
    blue: #2367D2
    light red: #F75C4F
    pink: #EC80AF
    gree: #82C0D0
    blue: #80C1F2

    greys:
    slate: #708090
    cultured: #f5f5f5
    platinum: #e5e5e5

    https://coolors.co/141649-f95f36-0a808f-ececf7-ff87a1-fec742

 */
import facepaint from 'facepaint';
import { Theme } from '../types';

const breakpoints = [576, 768, 992, 1200];

export const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

// TODO: fill this in as per spec of Design Systems
const theme: Theme = {
    colors: {
        blue: ['#e0fbfc', '#98c1d9', '#3d5a80'],
        gray: ['#e5e5e5', '#f5f5f5', '#708090'],
        primary: '#141649',
        secondary: '#F95F36',
        background: '#fff',
        white: '#fff',
        pink: '#ff87a1',
        mustard: '#fec742',
        lightGray: '#ececf7',
        green: '#0a808f'
    },
    space: [
        '0',
        '0.146rem', // 2px
        '0.236rem', // 4px
        '0.618rem', // 11px
        '1rem', // 18px
        '1.618rem', // 29px
        '2.618rem', // 47px
        '4.236rem', // 76px
        '6.854rem', // 123px
        '11.089rem' // 199px
    ],
    border: {
        radius: '12px'
    }
};

export default theme;
