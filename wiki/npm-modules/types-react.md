# @types/react
You’ll need to have Node >= 14 on your local development machine (but it’s not required on the server). You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.
### installation
`$npx create-react-app my-app`
### Selecting a template
You can now optionally start a new app from a template by appending --template [template-name] to the creation command.
If you don't select a template, we'll create your project with our base template.
Templates are always named in the format cra-template-[template-name], however you only need to provide the [template-name] to the creation command.
`$npx create-react-app my-app --template [template-name]`

### Output
Running any of these commands will create a directory called my-app inside the current folder. Inside that directory, it will generate the initial project structure and install the transitive dependencies:
my-app
```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
   ├── App.css
   ├── App.js
   ├── App.test.js
   ├── index.css
   ├── index.js
   ├── logo.svg
   ├── serviceWorker.js
   └── setupTests.js
```
   `$npm install --save-dev @types/nodex`

### Testing
Before you share your improvement with the world, use the types yourself by creating a typename.d.ts file in your project and filling out its exports:
```javascript
declare module "libname" {
  // Types inside here
  export function helloWorldMessage(): string
}

```

For example, this change to a function in a .d.ts file adding a new param to a function:

index.d.ts:

- export function twoslash(body: string): string
+ export function twoslash(body: string, config?: { version: string }): string
<my-package>-tests.ts:

import {twoslash} from "./"

// $ExpectType string
const result = twoslash("//")

+ // Handle options param
+ const resultWithOptions = twoslash("//", { version: "3.7" })
+ // When the param is incorrect
+ // $ExpectError
+ const resultWithOptions = twoslash("//", {  })