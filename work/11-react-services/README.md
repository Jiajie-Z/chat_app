# React Services

* **Due by Wed Nov 20, 11:59pm PT**

## Submission Instructions
* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-services' (`git checkout -b react-services`)
* Create a react application in this directory using vite
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  

## Goals

- Create a React application using Vite that makes use of REST-based services that you write using express
- Have a service server that can serve the static files built by `npm run build`
- Configure the Vite dev server to proxy service requests to your express server.js
- Demonstrate an understanding of calling services using React
- Demonstrate an understanding of the `useEffect` hook as described in class
- Demonstrate an understanding of displaying loading states
- Demonstrate an understanding of the two different servers involved during development
  - And the single server involved during production

## Assignment Goals and Requirements
- The application meets common user expectations (such as where a logout button is located)
- The application will have service-based login/logout
  - As normal username "dog" will be treated as a denied user (not an invalid username, but a disallowed user)
- The application will show a logged in user their "stored word"
  - This includes checking for an existing stored word on login
- The application will allow a logged in to change their "stored word"
- The "stored word" is stored per user on the server
- The page will check for an existing session on page load
  - a user that is already logged in will not have to log in again
  - While the app is waiting on the service call(s) for this check a loading indicator is displayed to the user
  - This indicator can be image, css, and/or HTML-based, but must exist, however briefly
    - There is no need to artificially delay services calls to show the loading indicator
- Your application can be tested by running `npm install` and
  - running `npm start` to start the services server on port 3000
    - Note: this requires change the `scripts` section of package.json
  - running (in a separate terminal) `npm run dev` to start the Vite dev server on port 5173
  - visiting http://localhost:5173 in the browser
- Your application can ALSO work by:
  - running `npm run build` to create the static files in `dist/`
  - running `npm start` to start the express server (and NOT running the Vite dev server)
  - visiting http://localhost:3000 in the browser

## Creating the two servers under 1 package.json
- Note: Remember this is OUR configuration.  On the job you may do this, you may have two package.jsons in different folders of the same repo, or they may be two separate repos
    - However, while this is configuration is an option overall, it IS the REQUIREMENT of this assignment
- Run `npm install express cookie-parser` in the created vite react project directory (where the package.json file is)
- Configuring the vite.config.js for the proxy as shown in class
- Modifying the package.json scripts to include the start script and any other scripts you wish to include
- Writing the express server.js to serve the dist/ folder as the static files document root

## Service Requirements
- All services will follow my 3 Rules of REST
- Your server-side code will have appropriate separation of concerns
- Services to login/check for a session should not return the stored word
- Are user inputs allowlisted before used?
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)

## Security And Error Reporting Requirements
- Both username AND the stored word should be allow-listed against criteria of your choice
  - This MUST be enforced on the service-side
  - This MAY be enforced on the client-side
  - Any received errors from a service because of user input should result in a meaningful message to the user
    - The message shown to the user should be based on the returned error of the service call, NOT just the HTTP status code 
  - If a service is unreachable a message should be displayed to the user

## Visual Requirements
- Provide at least basic visual styling to provide distinct areas for different parts of the application and sufficient visual spacing

## Restrictions
- All components must be .jsx files named in MixedCase
- Components and server-side files should have good separation of concerns
  - Not too large
  - Not doing too much
  - Same logic as splitting up functions
- Components should have good, accurate, meaningful names
- State values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names
- CSS should be semantic class names, either kebab-base or BEM style
- Service code should match the quality requirements from previous assignments

## Additional Requirements
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT use external JS other than those demonstrated in class
- Do NOT interact with the browser url, including hash fragment
- You may not use `.querySelector()`, `.getElementXXX`  or otherwise modify the DOM directly
- You may not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Note: vite installs many files.  For now, those are fine to include in your PR, but please remove any example content
- Do not use external CSS libraries
  - Exception: You may use icons from https://fonts.google.com/icons/ for icons and/or spinners
    - If you do so, you must download them as .svg or .png files and must list the filename, origin, and license that permits you to do so
  - Exception: You may use Google fonts loaded from the google site
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
- You may not use floats to do more than manage flowing text with images
- You may not use HTML tables for layout or CSS table layouts
- You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily

## Grading Rubric

Note: The assignment is to show your understanding of the material from class.  If you don't do that, you can lose points, even it "it works".  Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).

This assignment is graded on a number of categories, each graded on the below scale:
- Missing (0)
- Needs Improvement (1)
- Good (2)
- Excellent (3)

This means a single mistake might cost you 0 points or more than 1 point, depending on how much that mistake changes your demonstration of the skills from class.

The categories for this assignment are:

### Submission
- Does PR follow submission expectations?  
    - Necessary files installed by Vite
    - Only contains only changes/files from this assignment
    - Correct branch name
    - Good commit message(s)
    - Reviewers assigned
- Did you create a correct and usable configuration based on the material from class?
- Did you install ONLY permitted and appropriate modules?

### Overall Requirements
- Does the app work overall and meet all requirements not covered by other criteria?
- Were all restrictions not covered by other criteria followed?
- Does the code demonstrated the requested skills and lessons?
- Are lessons learned from previous PR feedback and class reviews of previous assignments?

### Proxy Creation
- Is the proxy configure and used appropriately?
- Does the app work with separate dev server and services server?
- Does the app work with a single server using built front end files?

### Service Quality
- Are services following the 3 Rules of REST?
- Are services receiving and sending any body data as JSON?
- Are services only returning data for their resource?
  - No stored word in the session data
- Are services written with separation of concerns between the route and any model data?
  - This will be very simple for this assignment

### JS/JSX Organization Quality
- Does the breakdown of files make it easy to find particular content?
- Are separate files largely decoupled except for parameters and return values?
- Is it easy for a dev new to the code to understand how it works enough to make a change?
- Is it easy for a dev to find the section of code that controls a specific part of the app?
- Is it easy for a dev to understand what any given section of the code is about without reading every line?
- Is any derived state kept out of state itself and recalculated as needed?

### JS/JSX Code Quality 
- Is the JS/JSX following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are any comments helpful?  Not just repeating what the code says, but providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?
- Do you understand what the code you are submitting does well enough to explain to your team?
- Is useEffect used correctly per demonstration in class?
  - Dependency array, manipulation of state, cleanup if needed, not on mount of removable components

### HTML & CSS Quality
- Is the HTML complete and valid?
- Are any form fields properly associated with a text label?
    - Quick test: click on the text of the label, the field should be selected
- Are the HTML and CSS formatted and indented per the standards given in the course?
- Does the content work at various reasonable "desktop" sizes of a browser window?
- Are HTML elements used in semantically appropriate ways?
- Are Semantic HTML elements used when available and appropriate?
    - And elements are not used for their default appearances when not semantically appropriate
    - Example: Don't use `<br>` or `<p>` just for space, don't use `<h3>` just for bolding and size
- Are all class names semantic and kebab-case (or BEM) style?
- Are any section headings (h1-h6) subheadings of previous headings
    - With no levels skipped?
    - And representing actual headings/subheadings, not used only for their appearance

