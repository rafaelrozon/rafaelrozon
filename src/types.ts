export enum Lang {
    EN = 'en',
    PT = 'pt'
}

export interface Translation {
    lang: string;
    link: string;
}

export interface Post {
    frontmatter: {
        lang: string;
        title: string;
        path: string;
        date: string;
        description?: string;
        coverImg: string;
        coverImgAlt: string;
    };
    timeToRead: string;
    excerpt?: string;
    html: string;
    fields: {
        slug: string;
        directoryName: string;
    };
}

export interface SiteMetadata {
    githubRepository: string;
    githubUsername: string;
    contentFolderPath: string;
    siteUrl: string;
    social: {
        twitter: string;
        github: string;
        linkedin: string;
    };
}

export interface Site {
    siteMetadata: SiteMetadata;
}

export interface Theme {
    colors: {
        blue: string[];
        gray: string[];
        primary: string;
        secondary: string;
        background: string;
        white: string;
        pink: string;
        mustard: string;
        lightGray: string;
        green: string;
    };
    space: string[];
    border: {
        radius: string;
    };
}
