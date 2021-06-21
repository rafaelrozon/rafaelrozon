// jest.mock("gatsby");
// jest.mock("@emotion/react");
// jest.mock("gatsby-plugin-image", () => ({
//     StaticImage: ({children}) => (<div>{children}</div>)
// }));

// jest.unmock("react-i18next")
// jest.unmock("i18next")
// jest.unmock("../../utils/typography")
// jest.unmock("../../locales/pt/main.json")
// jest.unmock("../../locales/en/main.json")

// import theme from "../../utils/theme";

// jest.mock('@emotion/react', () => ({
//     ...jest.requireActual("@emotion/react"),
//     useTheme: () => require('../../utils/theme').default
// }))

// import * as React from 'react';
// import { render, screen } from "../../utils/testUtils";
// import { css, jsx, useTheme, ThemeProvider } from '@emotion/react';
// import { useStaticQuery, graphql } from 'gatsby';

// import Bio from "./Bio";
// // useTheme.mockImplementation(() => theme);

// describe("Bio", () => {
//     it("should render bio information", () => {
//         useStaticQuery.mockImplementation(() => ({

//                 site: {
//                     siteMetadata: {
//                         autor: {
//                             name: "Rafa",
//                             summary: "this is a summary"
//                         },
//                         social: {
//                             twitter: "@rafa"
//                         }
//                     }
//                 }

//         }));
//         render(<Bio  />)
//         screen.debug()
//         expect(true).toBe(false);
//     });
// });
