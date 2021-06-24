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
 *
 *
 * https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500
 * https://coolors.co/06aed5-086788-f0c808-fff1d0-dd1c1a
 * https://coolors.co/d62839-ba324f-175676-4ba3c3-cce6f4
 * https://coolors.co/05668d-427aa1-ebf2fa-679436-a5be00
 *
 * https://visme.co/blog/website-color-schemes/
 * https://www.nurturedigital.com/
 *
 *
 * !!! https://coolors.co/3d5a80-98c1d9-e0fbfc-ee6c4d-293241
 * https://coolors.co/003049-d62828-f77f00-fcbf49-eae2b7
 */

import { Theme } from '../types';

const theme: Theme = {
    colors: {
        blue: ['#e0fbfc', '#98c1d9', '#3d5a80'],
        gray: ['#e5e5e5', '#f5f5f5', '#708090'],
        primary: '#293241',
        secondary: '#d62828',
        background: 'white',
        white: '#fff'
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
