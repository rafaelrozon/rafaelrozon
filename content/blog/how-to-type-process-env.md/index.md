---
title: How to type process.env
date: '2021-05-01T22:12:03.284Z'
description: 'Learn how to type the process.env variable and get auto-completion'
lang: 'en'
path: 'how-to-type-process-env'
coverImg: 'https://res.cloudinary.com/rafael-rozon-developer/image/upload/v1625057616/storybook_swbsmw.png'
coverImgAlt: 'Text 10 Storybook Best Practices'
coverImgCredit: ''
---

```ts
type AppEnvModes = 'development' | 'staging' | 'production';

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv {
            [key: string]: string | undefined;
            APP_ENV: AppEnvModes | undefined;
            NODE_ENV: string | undefined;
        }
    }
}

export {};
```

-   type def file needs to be included by Typescript, i.e., it needs to be in a folder that is under the folder(s) or file(s) listed in the include field of tsconfig.json
-   we should not assume that any variable in process.env is 100% certain to be populated. The values are provided at runtime and could not be there. That's why the value is always `someType | undefined`
-   process:
    -   https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts#L27
    -   https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/process.d.ts#L240
-   process.env:
    -   https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/process.d.ts#L547
    -   https://github.com/DefinitelyTyped/DefinitelyTyped/blob/87eb15066717815490ebeae83a566879b055db01/types/node/process.d.ts#L107
-   dict: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/87eb15066717815490ebeae83a566879b055db01/types/node/globals.d.ts#L278

-   https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation
-   https://www.typescriptlang.org/docs/handbook/module-resolution.html#tracing-module-resolution
-   https://www.typescriptlang.org/docs/handbook/namespaces.html#ambient-namespaces
-   https://lukasznojek.com/blog/2020/02/typescript-declaration-files/
