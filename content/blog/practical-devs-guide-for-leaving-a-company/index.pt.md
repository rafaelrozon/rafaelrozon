---
title: Um React Provider para a todos governar
date: '2021-06-01T24:00:00Z'
description: 'Centralizando React Providers para melhor manutenção e legibilidade'
lang: 'pt'
path: 'um-react-provider'
coverImg: 'https://res.cloudinary.com/rafael-rozon-developer/image/upload/c_scale,h_480/v1625057619/lucas-van-oort-2k7KnGSc6Q8-unsplash_tx4bit.jpg'
coverImgAlt: "Foto com a palavra 'One'"
coverImgCredit: 'Foto de [Lucas van Oort](https://unsplash.com/@switch_dtp_fotografie)'
---

Eu já escrevi e vi código como este abaixo em applicativos React:

```jsx
function App() {
    return (
        <AuthProvider>
            <ReduxProvider store={store}>
                <ThemeProvider theme={theme}>
                    <IntlProvider locale={locale}>
                        <Router>
                            <Switch>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </Router>
                    </IntlProvider>
                </ThemeProvider>
            </ReduxProvider>
        </AuthProvider>
    );
}
```

Nada de fundamentalmente errado com esse código, mas pode ser melhor. Por exemplo, se nós quisermos usar Storybook, e provavelmente devamos, será muito provável que vários componentes React, se não todos, precisarão desses providers. Muito provavelmente o IntlProvider e o ThemeProvider, talvez até mesmo o ReduxProvider. Além do mais, pode ser que precisamos deles nos testes dos componentes. Se algum dos componentes usar hooks que acessem algum contexto (context), então, com certeza um provider será necessário.

## Como Melhorar

Desde que quase tudo em React é um componente, vamos criar um novo para centralizar todos os providers do applicativo. O component seria assim:

```jsx
// file: AppProvider.tsx
const AppProvider = ({ children, store, theme, locale }) => {
    return (
        <AuthProvider>
            <ReduxProvider store={store}>
                <ThemeProvider theme={theme}>
                    <IntlProvider locale={locale}>{children}</IntlProvider>
                </ThemeProvider>
            </ReduxProvider>
        </AuthProvider>
    );
};

export default AppProvider;

// file: App.tsx
import AppProvider from './AppProvider';

function App() {
    return (
        <AppProvider store={store} theme={theme} locale={locale}>
            <Router>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </AppProvider>
    );
}
```

O componente AppProvider reunie todos os providers globais do app e recebe quaisquer props necessárias a eles, porque pode ser que precisamos inicializar alguns deles. Agora, se quisermos utilizar todos os providers no Storybook, por exemplo, podemos fazer assim:

```jsx
// file: SomeComponent.stories.js
export default {
    component: SomeComponent,
    decorators: [
        Story => (
            <AppProvider store={store} theme={theme} locale={locale}>
                <Story />
            </AppProvider>
        )
    ]
};
```

As vantages desse método são:

-   Única fonte para todos os providers (Single source of truth). Se algum deles precisar ser alterado, isso é feito em um lugar. Isso também ajuda com facilidade de manutenção do app.
-   Reusabilidade
-   Legibilidade. Quando nós estamos lendo o arquivo App, nós focamos no que é importante. Quando nós vemos o componente AppProvider, vemos que ele dá ao app algum tipo de estado (state) e de funcionalidades. Se precisarmos ir mais à fundo, é simplesmente abrir o arquivo e focar somente nos providers. Na minha experiência, pequenas optimizacões de legibilidade como essa ajudam a evitar muita ginástica mental ao ler códigos. Muito provavelmente, o projeto vai crescer e legibilidade e simplicidade serão de grande importância para a manutenção.

## Poréms

Como profissionais, grande parte do nosso trabalho é usar o nosso julgamento e experiência para tomar boas decisões. Então, nós temos de exercitar isso. Se alguns providers causam mais complicações do que benefícios, não inclua eles no component AppProviders. Um exemplo, muito provavelmente algo como um AuthProvider (provedor de autenticação) não é preciso em Storybook ou em testes. Logo, talvez seja melhor não incluí-lo no AppProvider e mantê-lo no arquivo App. Isso é algo que tem de ser decidido caso-a-caso.

Eu espero que esse post tenha sido útil para você!

Se você tiver alguma recomendação ou sugestão, é só comentar no Twitter.

Obrigado!
