import * as React from 'react';
import { render as renderRTL } from '@testing-library/react';

import AppProviders from '../AppProviders';

const render = (Component: React.ReactElement, options = {}): React.ReactElement => {
    renderRTL(<AppProviders>{Component}</AppProviders>, options);
};

export * from '@testing-library/react';
export { render };
