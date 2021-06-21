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
    };
    excerpt?: string;
    fields: {
        slug: string;
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
    };
    space: string[];
    border: {
        radius: string;
    };
}
