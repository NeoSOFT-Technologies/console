# Console - Admin Panel[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NeoSOFT-Technologies_console&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=NeoSOFT-Technologies_console) [![CI](https://github.com/NeoSOFT-Technologies/console/actions/workflows/ci.yml/badge.svg)](https://github.com/NeoSOFT-Technologies/console/actions/workflows/ci.yml)



## Overview
 - Console is an Admin template which is basically a set of web pages, built with HTML, CSS, and Javascript or any javascript libraries (in our case ReactJS in conjunction with typescript) used to create the user interface of the backend of a web application. These pre-built pages are integrated with the web application for doing backend tasks like maintaining the website, user and content management, installation and configuration of website software, and tracking data like network traffic and user visits to the website, to improve the performance of the website.

- [REACT JS](https://github.com/NeoSOFT-Technologies/frontend-reactjs) library Starter repository.

- ReactJS improves performance due to virtual DOM. The DOM is a cross-platform and programming API which deals with HTML, XML or XHTML. Most of the developers faced the problem when the DOM was updated, which slowed down the performance of the application. ReactJS solved this problem by introducing virtual DOM.

- ReactJS is choosen by most of the web developers. It is because it offers a very rich JavaScript library. The JavaScript library provides more flexibility to the web developers to choose the approch they want to follow.

Take it for a test drive. We'd love to hear any feedback you have or if you've thought of a new feature.

## Motivation

- With this template, you can easily start a Admin template using Reactjs.
- Rather than spending time on the project setup, get on with the important stuff right away. 

## Table of Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Miscellaneous](#miscellaneous)
- [Trainings](#trainings)
- [Contributing To This Project](#contributing-to-this-project)
- [Issues and Discussions](#issues-and-discussions)
- [Stay in touch](#stay-in-touch)

## Features

- **Quick start**
- **Integrated ESLint, Prettier and Husky**
- **Simple and Standard scaffolding**
- **Production-Ready Skeleton**
- **Common Error Handler**
- **Authentication and authorization**
- **Form Validation Using Regex**
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Environment variables**: segregated env files for easier variable management.
- **Santizing**: sanitize request data against xss and query injection
- **CI**: Continuous integration
- **Docker support**
- **Git hooks**: with [husky](https://github.com/typicode/husky) 
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **[Api Interceptor](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/Features/api-interceptor.md)**
- **[Refresh Token](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/Features/api-interceptor.md/refreshtoken.md)**

## Getting started

Makes easier to write good redux applications and speeds up development.

- Node <https://nodejs.org/en/> *use the LTS version*
- NPM

### Create Development Environment

  Use template strings, object destructuring, arrow functions, Interfaces, JSX syntax and more.

- [Learn more about TypeScript](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/features/typescript.md)

```bash
// clone the application
$ git clone https://github.com/NeoSOFT-Technologies/console.git
```
#### Install The Dependencies

- [Learn more about Sass](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/features/sass.md)

```bash
// Install the required npm modules
$ npm install
```

#### Create The Environment Variables

The `env` file should be placed in root folder with the following variables.

- `.env` : Default Environment File
- `.env.test` : Test Environment File
- `.env.production` : Production Environment File
- `.env.staging` : Staging Environment File


```
# .env example

PORT= <port_no_for_application>
REACT_APP_API_BASEURL=<backend_api_base_url>
REACT_APP_CDN_URL=/global
REACT_APP_IMAGES_CDN_URL=<baseurl_where_images_is_situated>
REACT_APP_HOST=<frontend_api_base_url>
```


#### Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

#### Test

For this project, We chose [Jest](https://facebook.github.io/jest/) as our test framework.



```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:coverage
```


#### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script      | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `start`         | Start project in development mode                                 |
| `start:prod`    | this script runs project in production mode                       |
| `build`         | Full build. Runs ALL build tasks                                  |
| `clean`         | On Run clean the installed node packages                          |
| `clean:cdn`     | On Run clean css from build                                       |
| `build:prod`    | Runs build and build:css together                                 |
| `test`          | Runs tests using Jest test runner                                 |
| `eject`         | Runs react-scripts eject                                          |
| `format`        | Runs prettier roles on project files                              |
| `test:coverage` | Gives the code coverage infrom to table                           |
| `lint`          | Runs ESLint on project files                                      |
| `lint:fix`      | Runs lint and fix the resolve able errors                         |
| `lint:quiet`    | Run lint to show errors only                                      |
| `prepare`       | install husky                                                     |
| `precommit`     | Runs lint:fix and format before commit                            |
| `prepush`       | Runs lint before push                                             |

## NPM Modules

Node Modules folder is the repository of modules/library which you are using inside your project. What ever you are importing in your project that module or library should present inside the mode_module folder.When you do npm install that time that module or the library install inside the node_module folder and one entry added in package.json file. In your case frontend and backend are different project than obviously there will be 2 different node_modules folder for each of them.
To check the list of modules used by us in this boilerplate click [here](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/npm_modules/index.md)




## Project Structure


Please find below a detailed description of the app's folder structures:

| Name                           | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **.github**                    | Contains GitHub settings and configurations, including the GitHub Actions workflows |
| **.husky**                     | Contains precommit and prepush rules                                                |
| **node_modules**               | Contains all your npm dependencies                                                  |
| **public**                     | Contains static files and images                                                    |
| **public/global/**             | Contains static files and images at global scope                                    |
| **public/global/css**          | Contains css files at global scope                                                  |
| **public/global/images**       | Contains static  images                                                             |
| **src**                        | Contains your source code that will be compiled to the dist dir                     |
| **src/components/**            | Contains the compoments for the template                                            |
| **src/pages/**                 | Contains the template common and specfic pages                                      |
| **src/pages/error-pages/**     | Contains the all the error pages(400,401,etc)                                       |
| **src/pages/features/**        | Contains the pages for the admin, tenant & user                                     |
| **src/pages/features/admin/**  | Contains the pages for the admin                                                    |
| **src/pages/features/tenant/** | Contains the pages for the tenant                                                   |
| **src/pages/features/user/**   | Contains the pages for the user                                                     |
| **src/pages/features/login/**  | Contains the common login for all                                                   |
| **src/resources/**             | Contains the files for constants and asset                                          |
| **src/routes/**                | Contain the 3 folders (features , gateway , SaaS)                                   |
| **src/routes/features**        | Contain the routes for the admin, tenant & user                                     |
| **src/routes/gateway**         | Contain the gateway routes for the admin, tenant & user                             |
| **src/routes/saas**            | Contain the SaaS routes for the admin, tenant & user                                |
| **src/services/**              | Contain the api calls and the token sevices                                         |
| **src/store/**                 | Contain the redux toolkit & central store                                           |
| **src/store/features**         | Contain slices for admin, tenant and user                                           |
| **src/styles/**                | Contain the common sass file for the template                                       |
| **src/type/**                  | Contain the interface for the template                                              |
| **src/util/**                  | Contain the interface for the utilities                                             |
| **wiki**                       | Contain concepts and npm modules documentation                                      |
| .eslintignore                  | Contain the file which are ignored by lint                                          |
| .eslintrc                      | Config settings for ESLint code style checking                                      |
| .env                           | contains the enviroment variables                                                   |
| .env.production                | File that contains enviroment variables at production                               |
| .env.test                      | File that contains enviroment variables at testing                                  |
| .env.staging                   | File that contains enviroment variables at staging                                  |
| Dockerfile                     | File that contains commands to build docker image                                   |
| docker-compose.yml             | File that contains command to build the docker container                            |
| .dockerignore                  | Ignore files from adding into an image when building a docker image                 |
| .gitignore                     | file specifies intentionally untracked files that Git should ignore                 |
| .prettierignore                | Contain the file which are ignored by prettier                                      |
| prettierrc.json                | Config settings for prettier code style checking                                    |
| package.json                   | File that contains npm dependencies                                                 |
| package-lock.json              | File that contains complete npm dependency tree                                     |
| tsconfig.json                  | Config settings for Typescript                                                      |


## Documentation

### Console Overview

![Console Overview](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/images/console.drawio.png?raw=true)

### Route based Request Response WorkFlow:-

![Request and Response Cycle](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/images/tenant-login-flow.png?raw=true)
### NPM Modules

- [Axios](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/axios.md)
- [Bootstrap](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/bootstrap.md)
- [compass-mixins](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/compass-mixins.md)
- [data-grid](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/data-grid.md)
- [eslint](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/eslint.md)
- [husky](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/husky.md)
- [prettier](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/prettier.md)
- [react-dom](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/react-dom.md)
- [react-redux](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/react-redux.md)
- [react-router-dom](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/react-router-dom.md)
- [react-scripts](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/react-scripts.md)
- [react-toastify](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/react-toastify.md)
- [redux-mock-store](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/redux-mock-store.md)
- [redux-toolkit](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/npm-modules/redux-toolkit.md)

## Miscellaneous

- [Known Issues](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/issues/known-issues.md)


## Trainings

- [Concepts Required](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/setup/concepts.md)
- [setup](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/HowtoGetStarted.md)
- [`env` Usage](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/setup/.env.md)
- [How to add a component](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/ComponentAndPages.md)
- [Redux toolkit](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/HowToAddReduxToolkitSlice.md)
- [Routes for Page setup](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/HowToAddRouteForPage.md)
- [Routes for SideBar](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/HowToAddRouteInSidebar.md)
- [How to Use Api Factory](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/trainings/HowToUseApiFactory.md)

## Contributing To This Project

Contributions are welcome from anyone and everyone. We encourage you to review the [guiding principles for contributing](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/contribution/contribution.md)

* [Bug reports](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/contribution/bug-reports.md)
* [Feature requests](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/contribution/feature-requests.md)
* [Pull requests](https://github.com/NeoSOFT-Technologies/console/blob/main/wiki/contribution/pull-requests.md)

## Issues and Discussions

- [Create New Issue](https://github.com/NeoSOFT-Technologies/console/issues/new)
- [Check Existing Issues](https://github.com/NeoSOFT-Technologies/console/issues)
- [Discussions](https://github.com/NeoSOFT-Technologies/console/discussions)

## Stay in touch

* Website - [https://www.neosofttech.com/](https://www.neosofttech.com/)
* Twitter - [@neosofttech](https://twitter.com/neosofttech)
* Meetup -  [https://www.meetup.com/neosoft-technologies/](https://www.meetup.com/neosoft-technologies/)
* Medium -  [https://medium.com/@neosofttech-technologies-blog](https://medium.com/@neosofttech-technologies-blog)
* GitHub - [https://github.com/NeoSOFT-Technologies](https://github.com/NeoSOFT-Technologies)
* Discord - [Nesoft Technologies](https://discord.gg/9xW5gQhQa4)
