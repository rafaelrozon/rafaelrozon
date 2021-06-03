---
title: Web Config Chaos
date: '2021-05-01T24:00:00Z'
description: 'Better developer experience, better software'
lang: 'en'
path: 'web-config-chaos'
draft: true
---

context

- lots of different tools and configuration files
  - transformation of files to a format that browsers understand
  - devops tools
  - debugger configurations
  - DX tools: 
  - code quality: ESLint, Prettier, 
  - conventions: Commitizen
  - environment & project: nvmrc, lerna.json, npmrc
  - testing
- urge to put order to the chaos
- why
  - The gap between what browsers support and what the languages (JS, CSS, HTML) offer and what developers want to use
  - Tools to make the apps accessible to users
  - DX tools
  
the problem

- some tools assume the configuration file is in a specific place
  - if it's in another place, a flag needs to be passed to scripts and IDE integration may need to be tweaked
- we want to share configuration with projects that are similar
  - example
    - a library of react components and a web app in react may need a babel config file for parsing JSX
    - libraries of utility functions need babel file for a specific version of node
    - reusing Jest configuration between React projects
- we want to extend configuration where it needs to be different
  - example:
    - extend a base jest configuration and modify the testEnvironment to be jsdom so it can test React
    - extend a tsconfig file to exclude test files so they're not present in the bundle exported from a library

how to approach

- folder and its scope
- how to share configuration between projects in different repositories
  - create a package that exports config files
  - create a cli tool that can generate config files with defaults
- how to share configuration between projects in a monorepo
  - use scripty

an example

advice

- Resist the urge to tidy everything up. If a tool expects the configuration to be in a specific place, it's probably better to follow the recommendation. Configuration files don't change often, so it's not something that will create lots of overhead daily.
