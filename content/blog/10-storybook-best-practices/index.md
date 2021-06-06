---
title: 10 Storybook Best Practices
date: '2021-05-01T22:12:03.284Z'
description: 'Learn how to scale and integrate Storybook in your development workflow.'
lang: 'en'
path: '10-storybook-best-practices'
---

This is a post about Storybook and conventions. It is based on my experience using Storybook over several years and from the experiences of other developers. The best practices I define here aren't silver bullets that will fix and improve every project. They're a baseline of ideas and conventions that I think are worth trying. Hopefully, they can help you and your team have a better developer experience and ultimately deliver better software to the world.
I assume you know what Storybook is and that you have some experience with it. The ideas here can be applied to apps of any size and are not particular to any specific framework (e.g., React or Vue), but I wrote them with a large app in mind with a large team and multiple contributors.

## 1. One Storybook File Per Component

The story file should have:

- one Default story
- a Playground story
- and other stories that reflect a specific state or API of the component.

The default story displays the component with only its required props defined. It creates a visual baseline representation for everyone. When people think about a specific component, ideally, they will remember what's reproduced by the default story.
The playground story is used to help consumers of the component try different combinations of props and see how the component responds. It can be implemented in Storybook up to version 5 using [the knobs add-on](https://www.npmjs.com/package/@storybook/addon-knobs). You provide knobs for all props of the component:

```jsx
import React from "react";
import {storiesOf} from "@storybook/react";
import { withKnobs, text } from '@storybook/addon-knobs';
import Button from ".";


const storiesOf("Button", module).
    addDecorator(withKnobs)
    add("Default", () => {
        return <Button type="button" text="Click me" />
    }).
    add("Playground", () => {
        const typePropLabel = 'type';
        const typePropOptions = {
            submit: 'submit',
            input: 'input'
        };
        const typePropDefaultValue = typePropOptions.submit;

        const textPropLabel = "text";
        const textDefaultValue = "Click me";

        return (
            <Button 
                type={select(typePropLabel, typePropOptions, typePropDefaultValue)} 
                text={text(textPropLabel, textDefaultValue)} 
            />
        )
    })
```

For the latest version of Storybook (version 6), the playground story can be written using the new [Args feature](https://storybook.js.org/docs/react/writing-stories/args). It looks something like this:

```jsx
import React from "react";
import Button from ".";

// Args Setup
const Template = (args) => <Button {...args} />;

export const Playground = Template.bind({});

const buttonTypes = {
  SUBMIT: 'submit',
  INPUT: 'input'
}

Playground.args = {
  type: buttonTypes.INPUT,
  text: "Primary",
};

Playground.argTypes = {
  type: {
    control: {
      type: "select",
      options: [buttonTypes.INPUT, buttonTypes.SUBMIT]
    }
  },
  text: {
    control: "text"
  }
}

export const DefaultStory = () => <Button type="button" text="Click me" />;

DefaultStory.storyName = "Default";

export default {
  title: "Components/Button",
  component: DefaultStory,
};
```

Finally, the other stories should reflect a specific state or API of the component. For example, if we have a button component that has a type props that accepts the values `primary`, `secondary`, `tertiary`, or `error`. Then, we would have four stories: `Button/Primary`, `Button/Secondary`, `Button/Tertiary`, and `Button/Error`. There are a few reasons to follow this pattern:

- It is easier to share a link of a component that precisely defines a state that you want to reference, which is useful when communicating with QA and designers.
- If Storybook is combined with testing tools, like snapshot testing or visual regression testing, each story becomes a unit testing. If one of them fails, you know exactly which one.
- By making the stories explicit, we avoid hiding components states under the knobs.

## 2. Co-location: A Storybook File Should Stay With Its Component

Code that changes for the same reasons should be kept together. In that sense, the Storybook file for a given component will very likely change when that component changes — so keep them together. Also, if the component folder is moved to another place in the project or even to another project, it will be easier to move the Storybook file along.

## 3. Naming Convention

Name the storybook files `[ComponentName].stories.[js|jsx|tsx]`. Honestly, the important thing is that you and your team agree on a naming convention, and everyone follows it. I like to include the name of the component in the file name because it makes it easier to find in the code editor. Otherwise, I could end up with five files called index.stories.tsx, and then I'd have to open each one or perform a search to find the right one.

## 4. New Components Must Have a Storybook

It helps to create a library of components and gain the benefits of having one. If your team has a PR checklist, Storybook could be one to check before merging the code into master.

## 5. Prefer the Component Story Format

[Component Story Format or CSF](https://storybook.js.org/docs/react/api/csf) is the recommended way to write stories according to the Storybook maintainers. It's a set of conventions to be used in the story files. Instead of using the storiesOf API, you write regular JavaScript functions and export them. Storybook converts the named and the default exports to stories. One big advantage of the CSF format is that the code looks cleaner and is easier to read. Instead of the Storybook boilerplate, you can focus on what your code is doing

## 6. Architect Stories as You Architect Your Codebase

When you use Storybook, you should have a clear idea of how your app is organized. I got this from [Loïc Goyet](https://dev.to/loicgoyet) in the awesome post [How I manage to make my Storybook project the most efficient possible](https://dev.to/loicgoyet/how-i-manage-to-make-my-storybook-project-the-most-efficient-possible-2d8o). His idea is to make the stories menu reflect the location of the stories in the app:

![Storybook Menu](./storybook_menu.png)

Do you see how the menu in Storybook above aligns with the app folder structure?
This structure will help you to:

- Find stories more easily
- Understand how the code is organized.

If co-location is used in your app, keeping related items together, the folder structure gives you an idea of how the app is structured. But do not confuse folder structure with architecture. They're not the same thing. 

## 7. Consistent Environment

When we develop in Storybook, we want isolation. But it is very likely that we still use some resources shared with the app, such as images, data, CSS, icons, translations, etc. And, this is good because we want to make sure that our components will behave in the same way when used in the context of the app. For example, if a localization library is used in the app, it can probably be reused with the same configuration inside Storybook. Another example: If third-party CSS is used, it should be included inside Storybook because we want to find out if that CSS will conflict with our CSS. The objective is to avoid surprises when using the component in the app.

## 8. Keep Data Under Control

If you notice that you need the same data in many different stories, it may be a good idea to create a folder called 'mocks' and add JavaScript files that export factory functions. These are functions that return a new object every time they're called. Let us suppose that we have an avatar component that displays the user image, name, anchor, and this component is used in multiple places. We could have a file named mocks/user.js which has something like this:

```js
const getUser = (overrides = {}) => {
    const defaultValues = {
        username: "Some User",
        anchor: "@someuser",
        image: "https://webapp/static/images/someuser.png"
    };
    return Object.assign(defaultValues, overrides);
};
export default getUser;
```

Why the factory functions? To make sure we are getting a new object every time. If we imported an object, we could accidentally modify it and cause wrong results. I have seen it. Also, here I'm using Object.assign as an example, but you may need something more sophisticated that handles the merging of arrays and objects. [Lodash](https://lodash.com/docs/4.17.15#mergeWith) and [RamdaJS](https://ramdajs.com/docs/#merge) have functions for that — RamdaJS is awesome!

## 9. Create Your Own Decorators and Add-ons (when it makes sense)

[Decorators](https://storybook.js.org/docs/react/writing-stories/decorators) are functions that wrap another piece of code and give it extra functionality. In Storybook decorators can be applied to individual stories (called Story decorators), all stories of a component (called Component Decorators), or to all stories in the project (called Global Decorators). The baseline is this:

```jsx
const myDecorator = (Story) => (
    <div>
        <Story />
    </div>
)
```

It is common in React apps to have providers wrapping the app or portions of the app. If you need, for example, to wrap your components in a provider, a decorator is a way to go. Or, if you want to add a margin to some component so that it does not touch the borders of the canvas, you could have a decorator like this one:

```jsx
const withMargin = (Story) => (
    <div style={{ margin: '3em' }}>
        <Story/>
    </div>
)
```

[Add-ons](https://storybook.js.org/docs/react/api/addons) are extensions to Storybook that can help you to configure and extend Storybook in many fancy ways. It's more involving to develop add-ons, but it's not hard, and you have more power and flexibility.

## 10. Take Storybook Use and Maintenance Seriously

Storybook can be of huge help in developing a UI because it encourages you to focus on the interface of your components, which will help you have more generic and lean components. Generic and lean components are flexible and can be used in different contexts. In the end, you may need fewer components if you have some flexible components. Fewer components mean less code; less code means less chance of bugs; fewer bugs means happier users and happier developers. So, maintain and keep Storybook running and well oiled, don't let broken stories stick around, and refactor and rearrange things when they get messy.
In my experience, things only are improved when people take ownership. If there's no group of people responsible for taking care of Storybook, it will be very difficult to keep it evolving and to gain the benefits of using it. Everyone is responsible for contributing and following the team's conventions, but it may be helpful to assign someone, or a group of people, as the Storybook maintainer(s). The Storybook maintainer can hold others accountable for following the conventions and improve the use of Storybook in your team.

## Conclusion

These are some ideas I've collected after using Storybook for five years and from the experience of other developers smarter than me. I truly hope you learned something new and are excited to try Storybook or make it better for you and your team. If you have any questions or suggestions to make this article better, let me know in the comments below.

Thanks!

### References

- https://storybook.js.org/
- https://www.learnstorybook.com/
- https://dev.to/loicgoyet/how-i-manage-to-make-my-storybook-project-the-most-efficient-possible-2d8o
- https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07?gi=48bcfdd9231b
- https://www.learnstorybook.com/design-systems-for-developers/react/en/distribute/
- https://www.richsoni.com/posts/2019-01-29-storybook-architecture-audit/
- https://github.com/lauthieb/awesome-storybook
