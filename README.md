# React Admin template

## Description

- Admin templates are a set of web pages, built with HTML, CSS, and Javascript or any javascript libraries used to create the user interface of the backend of a web application. These pre-built pages are integrated with the web application for doing backend tasks like maintaining the website, user and content management, installation and configuration of website software, and tracking data like network traffic and user visits to the website, to improve the performance of the website.
- ### Features of React js

  - Virtual DOM.
  - Easy to use, learn and master
  - JavaScript XML or JSX
  - Versatile
  - Progressive
  - One-Way Data Binding
  - Declarative UI
  - Component Based Architecture
  - Enables Building Rich UI
  - Documentation
  - Open Source
  - Large & Active Community

## Motivation

- With this template, we can easily start a Admin template using Node.js, JavaScript and Reactjs.
- Rather than spending time on the project setup, get on with the important stuff right away.

Take it for a test drive. We'd love to hear any feedback you have or if you've thought of a new feature.

## Common Features

- Quick start
- Integrated ESLint, Prettier and Husky
- Common Error Handler
- Simple and Standard scaffolding
- Production-Ready Skeleton


## Getting started

Skeleton for REST API applications written in Node JS & Nest JS with TypeScript

### Prerequisites

- Node <https://nodejs.org/en/> _use the LTS version_
- NPM

### Create Development Environment

To get started, clone the repository to your local computer. Use the following command to run in your terminal.

#### Clone The Application

bash
// clone the application
$ git clone https://github.com/NeoSOFT-Technologies/console.git

#### Quick Installation

Next, install the packages that are required for this project.

bash
// Install the required npm modules
$ npm install

### Running the app

bash

# development

$ npm run start

### Test

For this project, We chose [Jest](https://facebook.github.io/jest/) as our test framework.
While Mocha is probably more common, Mocha seems to be looking for a new maintainer and setting up TypeScript testing in Jest is wicked simple.

bash

# unit tests

$ npm run test

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `build`    | Full build. Runs ALL build tasks                                  |
| `lint`     | Runs ESLint on project files                                      |
| `start`    | Does the same as 'npm run serve'. Can be invoked with `npm start` |
| `test`     | Runs tests using Jest test runner                                 |

## Project Structure

Please find below a detailed description of the app's folder structures:

| Name                     | Description                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| **.github**              | Contains GitHub settings and configurations, including the GitHub Actions workflows      |
| **node_modules**         | Contains all your npm dependencies                                                       |
| **src**                  | Contains your source code that will be compiled to the dist dir                          |
| **src/config**           | Here you will find all the environment configuration necessary to access the application |
| **src/app**              | Components define group of files/source that respond to various module(http requests)    |
| **src/app/dashboard/**   | contain the main dashboard                                                               |
| **src/app/error-pages/** | error page for 404 and 500                                                               |
| **src/app/shared/**      | Contain the other components like sidebar and navigationBar                              |
| **src/app/user-pages**   | login page register page and lockscreen                                                  |
| **src/app/AppRoutes**    | Conatian all the Routes                                                                  |
| **src/asset**            | conatin images, svgs and SASS files                                                      |
| package.json             | File that contains npm dependencies                                                      |
| .eslintrc                | Config settings for ESLint code style checking                                           |

## Stay in touch

- Website - [https://www.neosofttech.com/](https://www.neosofttech.com/)
- Twitter - [@neosofttech](https://twitter.com/neosofttech)
- Meetup - [https://www.meetup.com/neosoft-technologies/](https://www.meetup.com/neosoft-technologies/)
- Medium - [https://medium.com/@neosofttech-technologies-blog](https://medium.com/@neosofttech-technologies-blog)
- GitHub - [https://github.com/NeoSOFT-Technologies](https://github.com/NeoSOFT-Technologies)
- Discord - [NodeJS](https://discord.gg/9xW5gQhQa4)
