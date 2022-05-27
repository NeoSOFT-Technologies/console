# Console - Admin Panel[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NeoSOFT-Technologies_console&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=NeoSOFT-Technologies_console) [![CI](https://github.com/NeoSOFT-Technologies/console/actions/workflows/ci.yml/badge.svg)](https://github.com/NeoSOFT-Technologies/console/actions/workflows/ci.yml)

## Description

- Admin templates are a set of web pages, built with HTML, CSS, and Javascript or any javascript libraries used to create the user interface of the backend of a web application. These pre-built pages are integrated with the web application for doing backend tasks like maintaining the website, user and content management, installation and configuration of website software, and tracking data like network traffic and user visits to the website, to improve the performance of the website.

## Exciting Features

### Quick start

Create components, containers, routes and redux-toolkit and their tests - right from the CLI!

### Integrated eslint, prettier and husky

Integrated ESLint, Prettier and Husky helps to take care of your code style, code formatting respectively and is a tool that allows us to easily wrangle Git hooks and run the scripts we want at those stages respectively.

- [Learn more about Eslint](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/modules/eslint.md)
- [Learn more about Prettier](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/modules/prettier.md)
- [Learn more about Husky](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/modules/husky.md)

### Instant feedback

Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!

### Integrated Redux Toolkit

Makes easier to write good redux applications and speeds up development.

- [Learn more about redux-toolkit](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/modules/redux-toolkit.md)
  v

  ### Based on TypeScript

  Use template strings, object destructuring, arrow functions, Interfaces, JSX syntax and more.

- [Learn more about TypeScript](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/features/typescript.md)

  ### Next generation SaaS

  Variables, nested rules, inline imports, and more are all possible with Sass. It also aids organisation and allows us to develop style sheets more quickly. All versions of CSS are supported by Sass.

- [Learn more about Sass](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/features/sass.md)

  ### Offline-first

  The next frontier in performant web apps: availability without a network connection from the instant your users load the app.

  ### Static code analysis

  Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.

  ### Production Ready Skeleton

  The ease of usability, reliability and availability of software to the users

## Motivation

- With this template, we can easily start a Admin template using Node.js, JavaScript and Reactjs.
- Rather than spending time on the project setup, get on with the important stuff right away.

Take it for a test drive. We'd love to hear any feedback you have or if you've thought of a new feature.

## Start the application

- Clone the Application git clone `https://github.com/NeoSOFT-Technologies/console.git`
- Install the dependencies `npm install`
- Start the application `npm run start` or simply `npm start`

### Running the build

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
## Training

- [Concepts](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/setup/concepts.md)
- [Getting started /Installation](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/howto/getting_started.md)
- [How to create components]()
- [Redux Toolkit Flow of implementation]()
- [Unit Test cases]()
- [How to implement]()
- [API Factory]()
- [Auth Guard Strategy]()

## Video Tutorials

- [Concepts](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/setup/concepts.md)
- [Getting started /Installation](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/howto/getting_started.md)
- [How to create components]()
- [Redux Toolkit Flow of implementation]()
- [Unit Test cases]()
- [How to implement]()
- [API Factory]()
- [Auth Guard Strategy](https://github.com/NeoSOFT-Technologies/frontend-reactjs/blob/main/wiki/howto/authguard.md)

## Stay in touch

- Website - [https://www.neosofttech.com/](https://www.neosofttech.com/)
- Twitter - [@neosofttech](https://twitter.com/neosofttech)
- Meetup - [https://www.meetup.com/neosoft-technologies/](https://www.meetup.com/neosoft-technologies/)
- Medium - [https://medium.com/@neosofttech-technologies-blog](https://medium.com/@neosofttech-technologies-blog)
- GitHub - [https://github.com/NeoSOFT-Technologies](https://github.com/NeoSOFT-Technologies)
- Discord - [https://discord.gg/9xW5gQhQa4](https://discord.gg/9xW5gQhQa4)
