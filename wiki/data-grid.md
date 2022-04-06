# About Data Grid Module
the data grid module that is developed is internally using grid js. The limit of the
data displayed is set to `10` by default, It supports server side pagination and searching just with the help of query parameters. <br/>
reference : https://gridjs.io/docs/index<br/>
## Installation
`npm install --save gridjs-react`

Also, make sure you have Grid.js installed already as it's a peer dependency of gridjs-react:

`npm install --save gridjs`

## Usage

`import { Grid } from 'gridjs-react';`

 After importing the grid, it requires the following props
 
      a. data 
      b. columns 
      c. server 
      d. pagination 
      e. search 
      f. classNames
      
---

### Data
data is prop that has table data in the form of the arrary[array] or can be an array of object also.
	
	Note: if server props is passed then no need to pass data props
 
reference : https://gridjs.io/docs/config/data<br/>

---

### Columns
columns is the prop that has the table heading in the form of array or can be an array of object what will have following properties :-
		
  name(mandatory): Title of the columns
		data(optional): to map the data field with this column if the data is in object form.
		formatter(optional): to format the cell before rendering
		
	    Note: if data field is not defined then data will be rendered orderwise if data is in array format otherwise
		  data will be mapped with matching column name
reference :https://gridjs.io/docs/config/columns

---

### server
server have three parameters <br/><br/>
    `url` : url contain the url for the api call to fetch data <br/><br/>
    `data` :  an asynchronous callback function use to make the api call and returns an object containing data in the form of array under the key data and the total number of data available at the back-end under the key `total`. The asynchronous function takes an argument with variable args and the url for pagination and searching come under `args.url`  <br/><br/>
    
    Note: if data field is specified then no need to have url property in server configuration
    
reference : https://gridjs.io/docs/examples/server

---

### pagination
pagination is a prop that take three parameters<br/><br/>
`enable` : default value of the props is false by setting it to true we can enable search field<br/><br/>
`limit` : deafualt value of the limit is `10`, it determine the the number of row should be displayed at once <br/><br/>
`server` : it has a url callback with three parameters out of which we can use to create a url with the query which is passed on to the data asynchronous function present in the server configration. <br/><br/>

    1.`prev` which has the api base url
    2.`page` determine the current page number
    3.`limit`determine the limit of row to fetch from the backend
    
reference : https://gridjs.io/docs/examples/server-side-pagination

---

### search
search prop contain two parameters<br/><br/>
    `enable` : true/false value determine enable/disable respectivly<br/><br/>
    `server` : callback return the search result on the base of keyword parameter passed in the callback out of which we can use to create a url with the query which is passed on to the data asynchronous function present in the server configration. <br/><br/>
reference : https://gridjs.io/docs/examples/server-side-search

---

### classNames
To add CSS classname to a Grid.js instance<br/><br/>
reference : https://gridjs.io/docs/config/className#<br/>

---

# Implementation in console template as a reusable component
 `location` : "console/src/components/list/RenderList.tsx"
 ## usage 
 `import RenderList from 'relative path';`
 
  After importing the RenderList, it requires the following props 
 
      a. heading 
      b. url 
      c. action 
      d. searchBy
      
---

### heading 

Heading takes an array of objects which contain `data` & `name` 
`name` respresents the table header and `data` represents key to access data in the from of object coming from the backend.

### url 

url takes a string value input of the api call for the backend.

### action 

action is an object with two parameter of `className` for the customization of the button and the second parameter `func` take the callback of the actual function that we need to perform on the click of the button .

### searchBy

searchBy takes a string value on which the search qurey is applied. [i.e tenantName, userName]
