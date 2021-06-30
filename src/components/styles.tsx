/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { mq } from '../utils/theme';
import { rh } from '../utils/typography';

export const icon = css`
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

// TODO: figure out a better way of doing this instead of passing the first object returned
export const container = mq({
    margin: `0 auto`,
    maxWidth: [rh(26), rh(24), rh(24), rh(26)],
    padding: `${rh(1)} 0`
})[0];
