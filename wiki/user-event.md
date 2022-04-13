### user-event
user-event is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in fireEvent method.
This page describes user-event@13.5.0. If you are starting or actively working on a project, we recommend to use user-event@14.0.0-beta instead, as it includes important bug fixes and new features.
### installation
`$npm install --save-dev @testing-library/user-event @testing-library/dom`
### Note:
All userEvent methods are synchronous with one exception: when delay option used with userEvent.type as described below. We also discourage using userEvent inside before/after blocks at all, for important reasons described in "Avoid Nesting When You're Testing".
click(element, eventInit, options)
Clicks element, depending on what element is clicked, calling click() can have different side effects.
```javascript
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('click', () => {
 render(
   <div>
     <label htmlFor="checkbox">Check</label>
     <input id="checkbox" type="checkbox" />
   </div>,
 )`

 userEvent.click(screen.getByText('Check'))
 expect(screen.getByLabelText('Check')).toBeChecked()
})
```

### Pointer events options
Trying to click an element with pointer-events being set to "none" (i.e. unclickable) will throw an error. If you want to disable this behavior you can set skipPointerEventsCheck to true:
The **skipPointerEventsCheck** option can be passed to any pointer related API including:
- dblClick
- hover
- unhover
- selectOptions
- deselectOptions
- dblClick(element, eventInit, options)
- Clicks element twice, depending on what element is it can have different side effects.

```javascript
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('double click', () => {
 const onChange = jest.fn()
 render(<input type="checkbox" onChange={onChange} />)
 const checkbox = screen.getByRole('checkbox')
 userEvent.dblClick(checkbox)
 expect(onChange).toHaveBeenCalledTimes(2)
 expect(checkbox).not.toBeChecked()
})
```
### modifierCapsLock
Fires both keydown and keyup when used (simulates a user clicking their "Caps Lock" button to enable caps lock).

A note about modifiers: Modifier keys ({shift}, {ctrl}, {alt}, {meta}) will activate their corresponding event modifiers for the duration of type command or until they are closed (via {/shift}, {/ctrl}, etc.). If they are not closed explicitly, then events will be fired to close them automatically (to disable this, set the skipAutoClose option to true).