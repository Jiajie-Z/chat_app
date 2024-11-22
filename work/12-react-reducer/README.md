# React Reducer

(not really) **Due by Wed Dec 4, 11:59pm PT**

## Submission Instructions

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-reducer' (`git checkout -b react-reducer`)
* Create a react application in this directory using create-react-app
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  

## Goals
- Create a React-based chat application talking to RESTful services
- Create a React-based chat application talking to RESTful services
  - You are welcome and encouraged to reuse any server code and/or CSS from earlier assignments
    - Update and correct based on any feedback from earlier assignments
  - The expected behavior and visual requirements match previous iterations of the chat application
- Demonstrate an understanding of `useReducer` hook and reducers
  - Our chat app is likely too shallow to have much "prop drilling" that would necessitate useContext, so there is no need to use useContext, but you can if you wish
  - Deeplinking is not required for this project (What would you deeplink to?  The app is always the current single state, except for login)

## Requirements
- Create a new react application in this directory
- Create or copy (from your work) any server code for RESTful chat services
  - Hint: make sure to `npm install` any needed packages so they are listed as dependencies in package.json
  - Hint: if you have any issues when running after installing all the packages, try removing the `node_modules/` directory and rerunning `npm install`
- Modify/Replace/Add files as necessary to achieve the below:
- Make sure the top-level state in App.jsx is using `useReducer`
  - Define the reducer function and initial state in a separate JS file and import them
  - Only top-level (application-wide) state in your app needs to use `useReducer`
  - State that is only used within a lower component (example: Login-specific temporary state) does not need to be in `useReducer` and should not be part of the application-wide state
- Create a series of action functions (wrappers around dispatch) that passed to the necessary Components
- Your application can be tested by running `npm install` and
  - Running `npm start` to start the services server 
    - Note: this shows you should change the `scripts` section of package.json
  - Running (in a separate terminal) `npm run dev` to start the dev server 
    - So there are two terminals each running a different server
  - Visiting http://localhost:5173 in the browser
- Your application can ALSO work by:
  - Running `npm run build` to create the static files in `dist/`
  - Running `npm start` to start the server (as the only running server)
  - Visiting http://localhost:3000 in the browser

## Defining the reducer and context
- The state object must be treated as immutable
- The reducer function should accept a state and an action object
- The reducer function should return a new state object
- The reducer function should use `action.type` to decide what changes to make in the new state
- The reducer actions should use other properties in `action` as needed, depending on the needs of the state changes for that action type

## Restrictions
- All components must be .jsx files named in MixedCase
- Components should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names

## Additional Requirements
- Follow the practices described in class.  Failure to do so will mean your submission will not be considered a demonstration of your skill  
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT use external JS other than that demonstrated in class (express and cookie-parser)
- Do not use `document.querySelector()` or any `getElementXXX`
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
- Do not use external CSS libraries
  - Exception: You may use Google fonts and icons from https://fonts.google.com/icons
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much 
* Do not have console.log messages from debugging
* Do not have commented out code
- Do not use floats to do more than manage flowing text with images
- Do not not use HTML tables or CSS table layouts
- Do not use `style` attributes, properties, or props
- Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - This includes not using CSS Modules, styled-components, or any CSS-in-JS
  - I and the TA(s) must be able to read it easily

## Grading Rubric

This assignment is not graded.  It can be submitted to get review and comments, but will not receive a score
