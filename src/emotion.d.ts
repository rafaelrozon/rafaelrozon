import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            blue: string[];
            gray: string[];
            primary: string;
            secondary: string;
            background: string;
            white: string;
        };
        space: string[];
        border: {
            radius: string;
        };
    }
}
