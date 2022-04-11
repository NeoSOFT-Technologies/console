# Custom Multi Dropdown list 
Multi select dropdown list is used when a user wants to store multiple values for the same record, whereas dropdown list is used to store a single value for a record. You can create custom categories of either dropdown list or multi select dropdown list and define items in each category

```
`location` : console/src/components/mutli-select-dropdown/MultiSelectDropdown.tsx 
```

# usage 
Step 1. import the component
```
import MultiSelectDropdown from "relative path";
```
Step 2. Calling the component  and passing the props, the component requires these 4 fields mandatory.   

```
  1. rolesList
  2. formData
  3. handleCheck
  4. removeRole
```

### roleList

it reqiure the string array of roles which is coming from the backend which need to assign to the user while creating.

### formData

it is the string array that contains the selected role from the list coming from the backend, that needs to be sent to the backend to assign to the user that has been created.

### handleCheck

it requires a function without any parameter,which add/delete the value of the checkbox in the `formData` which is trigger on an onChange event associated with the checkbox. 

### removeRole 

it requires a function which can remove the role from the list of `formData` 

# Internal Working

Console is using [react bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) components to create this Multi Dropdown list

Components and props that are used are as follows :

  ## 1. Dropdowns
  
  Dropdowns are toggleable, contextual overlays for displaying lists of links and more. Like overlays, Dropdowns are built using a third-party library [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection
  
  ```
  list of props 
    1. autoClose
    2. className
    3. variant
    4. as
    5. htmlFor
  ```
  
  reference : https://react-bootstrap.github.io/components/dropdowns/
  
  ## 2. From.Check(checkbox)
  
 The checkbox is shown as a square box that is ticked (checked) when activated. Checkboxes are used to let a user select one or more options of a limited number of choices.
 
 ```
  list of props 
    1. type
    2. id
    3. value
    4. label
    5. checked
  ```
 
  reference : https://react-bootstrap.github.io/forms/checks-radios/