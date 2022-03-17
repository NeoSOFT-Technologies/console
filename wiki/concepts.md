# Concepts

## 1. Component
### 1. Class Component
   ```
      a.constructor
      b.state and props
      c.lifecyle methods(componentDidMount,componentDidUpdate,etc)
      d.render
      e.export class component
   ```
### 2. Functional Component
   ```
      a. props
      b. useState
      c. useEffect
      d. useRef
      e. return
      f. export function component
   ```
## 2. React Hooks 
   ```
      a. useState (react)
      b. useref (react)
      c. useEffect (react)
      d. useLocation (react-router-dom)
      e. useNavigate (react-router-dom)
      f. useParams (react-router-dom)
      g. useSelector (react-redux)
      h. useDispatch (react-redux)
   ```

## 3. Redux
```
   a. actions :- ( Actions have a type field that tells what kind of action to perform and all other fields contain 
                  information or data. in "src/app/redux/actions" folder contains files with redux actions)
                  
   b. reducer :- (a reducer is a pure function that takes an action and the previous state of the application and
                  returns the new state. in "src/app/redux/reducers" contains file with reducer functions)
                  
   c. store :-    ("src/app/redux/store" contains a file in which store is created.)
   
   d. createStore :-  (a method used to create a storage space where data would be stored and provided to application)
   
   e. combineReducers :- (method used to combine multiple reducers)
   
   f. Provider  :-  (a component which works as a wrapper for other components where redux storage needs 
                     to be accessed by any component not encapsulated inside this wrapper would not be able 
                     to access redux storage.)
                     
   g. useSelector,useDispatch :-  (hookes used in function components to access and manipulate redux storage)
   
   h. connect :-  (a method used with "mapStateToProps" method to use redux in class components)   
```
## 4. Redux Toolkit
## 5. React-Router-Dom
```
   a.BrowserRouter      (a component which works as a wrapper for other components which use routing in react)
   
   b.Routes       (a Routes component is similar to a "switch" statement in many programming languages ,    
                  it switches between components according to route path, hence it encapsulates all components 
                  which need to be switched between each other.)
                  
   c.Route         (it defines a particular path for a component to be displayed in react-dom)
   
   e.useLocation   (hook used to access location and data passed through previous component)
   
   f.useNavigate   (hook used to navigate )
   
   g.Navigate (a component used to navigate through react-dom)
   
   h.Link (a component used to navigate through react-dom)
```
## 6. React-Bootstrap
```
   a.React-Bootstrap Components     
   b.inline styling   
   c.bootstrap classes
```
## 7. Bootstrap 
```
   a.bootstrap components   
   b.bootstrap classes
```

## 8. Regular Expression
   ```
   a.create a regular expression   
   b.test data against regular
   ```

## 9. Axios
```
   a.GET,POST,PUT,DELETE requests  
   b.headers      
   c.params   
   d.query   
   e.request body
```
## 10.Sass
```
   a. preprocessing
   b. using variables
   c. nesting
   d. partials
   e. modules
   f. extend/inheritance
   g. operators
   h. mixins
```
## 11. Reuseable Components :- 
   (These components are like a template which can be used multiple times in our project and used with props to pass data into it.)

## 12. Environmental files :- 
   (these files are used to store sensitive data like certain tokens and PORT numbers, connection links ,etc.)


## NPM Modules

1. "axios": Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library 
            in a small package with a very extensible interface.<br/>
   package-link :- https://www.npmjs.com/package/axios<br/>
   docs :- https://axios-http.com/docs/intro

2. "bootstrap": Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular 
                front-end open source toolkit, featuring Sass variables and mixins, responsive grid system,
                extensive prebuilt components, and powerful JavaScript plugins.<br/>
   package-link :- https://www.npmjs.com/package/bootstrap<br/>
   docs :- https://getbootstrap.com/docs/5.1/getting-started/introduction/<br/>

3. "compass-mixins": This is a repository to pull SASS style sheets on Bower, and enjoy the compass mixins by using libsass for faster compilation.<br/>
   package-link :- https://www.npmjs.com/package/compass-mixins<br/>
   docs :-  https://github.com/Igosuki/compass-mixins#readme<br/>

4. "i18next": i18next is a very popular internationalization framework for browser or any other javascript environment.<br/>
   package-link :- https://www.npmjs.com/package/i18next<br/>
   docs :- https://www.i18next.com/overview/getting-started<br/>

5. "i18next-browser-languagedetector":  This is a i18next language detection plugin use to detect user language in the browser with support for:-
                                      cookie,sessionStorage,localStorage,navigator,querystring,htmlTag,path,subdomain .<br/>
   package-link :- https://www.npmjs.com/package/i18next-browser-languagedetector<br/>
   docs :- https://github.com/i18next/i18next-browser-languageDetector<br/>

6. "node-sass": Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass.
                It allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.<br/>
   package-link :- https://www.npmjs.com/package/node-sass<br/>
   docs :- https://github.com/sass/node-sass<br/>

7. "nouislider-react": This package allows us to create a custom slider and use it in our project.<br/>
   package-link :- https://www.npmjs.com/package/nouislider-react<br/>
   docs :- https://github.com/mmarkelov/react-nouislider , https://refreshless.com/nouislider/<br/>

8. "react": The react package contains only the functionality necessary to define React components. It is typically used together
            with a React renderer like react-dom for the web, or react-native for the native environments.<br/>
   package-link :- https://www.npmjs.com/package/react<br/>
   docs :- https://reactjs.org/<br/>

9. "react-bootstrap": React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component,
                   without unneeded dependencies like jQuery.<br/>
   package-link :- https://www.npmjs.com/package/react-bootstrap<br/>
   docs :- https://react-bootstrap.github.io/<br/>

10. "react-bootstrap-table-next": (Note:-Note that react-bootstrap-table2's npm module name is react-bootstrap-table-next due to the name being already taken.) <br/>
   package-link :- https://www.npmjs.com/package/react-bootstrap-table-next<br/>
   docs :- https://github.com/react-bootstrap-table/react-bootstrap-table2#readme,https://react-bootstrap-table.github.io/react-bootstrap-table2<br/>

11. "react-bootstrap-typeahead": This package improves inputbox for and adding custom behaviour.<br/>
   package-link :- https://www.npmjs.com/package/react-bootstrap-typeahead<br/>
   docs :- http://ericgio.github.io/react-bootstrap-typeahead/<br/>

12. "react-contextmenu": ContextMenu in React with accessibility support.<br/>
   package-link :- https://www.npmjs.com/package/react-contextmenu<br/>
   docs :- https://github.com/vkbansal/react-contextmenu<br/>

13. "react-datepicker": A simple and reusable Datepicker component for React <br/>
   package-link :- https://www.npmjs.com/package/react-datepicker<br/>
   docs :- https://github.com/Hacker0x01/react-datepicker<br/>

14. "react-dom": This package serves as the entry point to the DOM and server renderers for React. 
               It is intended to be paired with the generic React package, which is shipped as react to npm.<br/>
   package-link :- https://www.npmjs.com/package/react-dom<br/>
   docs :- https://reactjs.org/<br/>

15. "react-i18next": react-i18next is a powerful internationalization framework for React / React Native which is based on i18next.<br/>
   package-link :- https://www.npmjs.com/package/react-i18next<br/>
   docs :- https://react.i18next.com/<br/>

16. "react-images": A mobile-friendly, highly customizable, carousel component for displaying media in ReactJS.<br/>
   package-link :- https://www.npmjs.com/package/react-images<br/>
   docs :- https://jossmac.github.io/react-images/#/<br/>

17. "react-redux": React Redux is the official React UI bindings layer for Redux. 
                  It lets your React components read data from a Redux store, and dispatch actions to the store to update state.<br/>
   package-link :- https://www.npmjs.com/package/react-redux<br/>
   docs :- https://github.com/reduxjs/react-redux, https://react-redux.js.org/<br/>

18. "react-router-dom": React Router is a fully-featured client and server-side routing library for React, 
                     a JavaScript library for building user interfaces. React Router runs anywhere React runs                     
                     on the web, on the server with node.js, and on React Native.<br/>
   package-link :- https://www.npmjs.com/package/react-router-dom<br/>
   docs :- https://github.com/remix-run/react-router#readme , https://reactrouter.com/<br/>

19. "react-scripts": This package includes scripts and configuration used by Create React App.
                     Please refer to its documentation<br/>
   package-link :- https://www.npmjs.com/package/react-scripts<br/>
   docs :- https://create-react-app.dev/<br/>

20. "react-table": React Table is a collection of hooks for building powerful tables and datagrid experiences. 
                   These hooks are lightweight, composable, and ultra-extensible, but do not render any markup or styles for you.
                   This effectively means that React Table is a "headless" UI library.<br/>
   package-link :- https://www.npmjs.com/package/react-table<br/>
   docs :- https://react-table.tanstack.com/<br/>

21. "react-tag-autocomplete": React Tag Autocomplete is a simple tagging component ready to drop in your React projects.<br/>
   package-link :- https://www.npmjs.com/package/react-tag-autocomplete<br/>
   docs :- https://github.com/i-like-robots/react-tags#readme , http://i-like-robots.github.io/react-tags/<br/>

22. "react-toastify": React-Toastify allows you to add notifications to your app with ease.<br/>
   package-link :- https://www.npmjs.com/package/react-toastify<br/>
   docs :- https://github.com/fkhadra/react-toastify#readme, https://fkhadra.github.io/react-toastify/introduction/<br/>

23. "tar": A "tar file" or "tarball" is an archive of file system entries (directories, files, links, etc.)
         The API is designed to mimic the behavior of tar(1) on unix systems. <br/>
   package-link :- https://www.npmjs.com/package/tar<br/>
   docs :- https://github.com/npm/node-tar#readme<br/>
