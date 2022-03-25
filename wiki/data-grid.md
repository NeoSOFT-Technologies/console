# About Data Grid Module
the data grid module that is developed is internally using grid js. The limit of the
data displayed is set to `10` by default, It supports server side pagination and searching just with the help of query parameters 
## Installation
`npm install --save gridjs-react`

Also, make sure you have Grid.js installed already as it's a peer dependency of gridjs-react:

`npm install --save gridjs`

## Usage

`import { Grid } from 'gridjs-react';`

 After importing the grid requires props 
      a. data
      b. columns
      c. server
      d. pagination
      e. search
      f. classNames

### data
data is prop that has table data in the form of the arrary[array]<br/><br/>
reference : https://gridjs.io/docs/config/data<br/>
### columns
columns is the prop that has the table heading in the form of array<br/><br/>
reference :https://gridjs.io/docs/config/columns
### server
server have three parameters <br/><br/>
    `url` : url contain the url for the api call to fetch data <br/><br/>
    `then` :  callback which return the response of the url and set the data<br/><br/>
    `total` : returns the count of total row avilable in backend <br/><br/>
reference : https://gridjs.io/docs/examples/server
### pagination
pagination is a prop that take three parameters<br/><br/>
`enable` : default value of the props is false by setting it to true we can enable search field<br/><br/>
`limit` : deafualt value of the limit is `10`, it determine the the number of row should be displayed at once <br/><br/>
`server` : it has a url callback with three parameters <br/><br/>
    1.`prev` which has the api base url<br/><br/>
    2.`page` determine the current page number<br/><br/>
    3.`limit`determine the limit of row to fetch from the backend<br/><br/>
reference : https://gridjs.io/docs/examples/server-side-pagination
### search
search prop contain two parameters<br/><br/>
    `enable` : true/false value determine enable/disable respectivly<br/><br/>
    `server` : callback return the search result on the base of keyword parameter passed in the callback<br/><br/>
reference : https://gridjs.io/docs/examples/server-side-search
### classNames
To add CSS classname to a Grid.js instance<br/><br/>
reference : https://gridjs.io/docs/config/className# About Data Grid Module
the data grid module that is developed is internally using grid js. The limit of the
data displayed is set to `10` by default, It supports server side pagination and searching just with the help of query parameters 
## Installation
`npm install --save gridjs-react`

Also, make sure you have Grid.js installed already as it's a peer dependency of gridjs-react:

`npm install --save gridjs`

## Usage

`import { Grid } from 'gridjs-react';`

 After importing the grid requires props 
      a. data
      b. columns
      c. server
      d. pagination
      e. search
      f. classNames

### data
data is prop that has table data in the form of the arrary[array]<br/><br/>
reference : https://gridjs.io/docs/config/data<br/>
### columns
columns is the prop that has the table heading in the form of array<br/><br/>
reference :https://gridjs.io/docs/config/columns
### server
server have three parameters <br/><br/>
    `url` : url contain the url for the api call to fetch data <br/><br/>
    `then` :  callback which return the response of the url and set the data<br/><br/>
    `total` : returns the count of total row avilable in backend <br/><br/>
reference : https://gridjs.io/docs/examples/server
### pagination
pagination is a prop that take three parameters<br/><br/>
`enable` : default value of the props is false by setting it to true we can enable search field<br/><br/>
`limit` : deafualt value of the limit is `10`, it determine the the number of row should be displayed at once <br/><br/>
`server` : it has a url callback with three parameters <br/><br/>
    1.`prev` which has the api base url<br/><br/>
    2.`page` determine the current page number<br/><br/>
    3.`limit`determine the limit of row to fetch from the backend<br/><br/>
reference : https://gridjs.io/docs/examples/server-side-pagination
### search
search prop contain two parameters<br/><br/>
    `enable` : true/false value determine enable/disable respectivly<br/><br/>
    `server` : callback return the search result on the base of keyword parameter passed in the callback<br/><br/>
reference : https://gridjs.io/docs/examples/server-side-search
### classNames
To add CSS classname to a Grid.js instance<br/><br/>
reference : https://gridjs.io/docs/config/className