# Assignment - JS Service Calls

* Due by **Wed Oct 30, 11:59pm PT**

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-service-calls' (`git checkout -b js-service-calls`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  

## Goals and Requirements

You will create a single page application that allows users to
- Login
- Logout
- While logged in:
  - See their personal stored word
  - Change their personal stored word

This is similar to the "express-login" assignment
- Except static HTML files instead of server-generated HTML
- Using client-side JS 
- Using service calls
- NO REDIRECTS

Key lessons include:
- Making service calls
  - Instead of navigating to new server-based pages
- Sending JSON data in the body
  - Hint: including data
- Performing login/logout with service calls
- Using service status codes
- Parsing and using service data from body

You will be writing:
- **static** html (just one page!)
  - The HTML will be changed by the front end JS, but the server-side is static HTML
- **static** css
- client-side JS
  - Using webpack and babel, as with the js-cart assignment

You will not modify any js files loaded directly or indirectly by server.js, including server.js itself
- But you do need to create a package.json, install the necessary packages, and create the necessary config files to let the provided server run as required

You will use webpack and babel (both!) to
- build (transpile and bundle) the client-side JS bundle

Your code will be runnable (and will run the expected commands) using
- `npm install`
- `npm run build`
- `npm start` or `npm run start` (they are the same)
- Visiting `http://localhost:3000/`

## Different Content Views and Moments

All of these "views" are changed HTML content of the initial HTML page loaded from the server, with the HTML being changed by client-side JS reacting to data from web service calls.  There is only a single, static HTML file and no server-generated HTML.

### Page Load

When the page loads, JS code will check for an existing session (the GET /api/session call in Resources)
- If there is a session, JS code will get the existing stored word (the GET /api/word call in Resources) and show the Word View
- If there is not an existing session, JS code will show the Login Page
  - "page" here meaning content, there is only one HTML page, and it is static
  - A user that is not logged in will get a 401 error from the service call
    - You should not show a special error message for this situation
    - Showing the login form IS how the user needs to deal with the problem
- This means that reloading the page 
  - Will NOT forget the stored word
  - Will NOT forget if you are logged in
  - WILL perform this initial page load logic again

### Login

Show a form requesting a username
- When submitted, this form will login (calling, NOT navigating to, the POST /api/session in Resources)
  - If successful, JS Code will show the Word View
  - If unsuccessful, JS Code will show an appropriate error message to the user ("dog" causes a different error than username of invalid characters)
    - "dog" simulates the user getting a password wrong
    - Show the user a "nice" error message that is NOT the error message the service returns 
      - But is BASED on the error message the service returns
      - Because the error message is the result of the render loop, you should have the error message in your state to show it
      - Remember to remove this error message after they successfully login!

### Word View

- Show the username
- Show an option to logout 
  - If the user logs out
    - Call the logout service (DELETE /api/session in Resources) (call, do not navigate to)
    - Once service call returns, show the user the Login view
- Show a form showing the stored word for this user and offering the option to update it
  - If the user updates the word
    - Call the replace word service (PUT /api/word in Resources) (call, do not navigate to)

### Visuals

The visual requirements are the same as `express-login` - You are welcome to use the same HTML/CSS from that assignment, but:
- Make sure you apply any corrections
  - From that assignment as reviewed by TA
  - Any discussed in class
  - Any covered by the requirements that may not have been called out on the previous assignment
- Translate the format as needed
  - This assignment is using a base static HTML file + front-end generated HTML, not backend-generated HTML

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required

## Resources

This `server.js` offers these urls to use for service calls with the listed HTTP Methods.  You will need to figure out which endpoints you call, and when to call them.

### GET `/api/session`

Checks to see if the user is logged in 
- If yes, returns JSON of object with `username` property
- If no, returns 401 status 
  - This is not an error to report to user, but is used by the code to decide if a user is or is not already logged in

### POST `/api/session`

- Expects body to be JSON of object with a username property

Checks submitted username
- if is "dog", returns 403 status and JSON of object with error property "auth-insufficient"
- if invalid (not alphanumeric or is empty), returns 400 status and JSON of object with error property "required-username"
- if valid, sets the `sid` cookie and returns a JSON of object with username property

### DELETE `/api/session`

Performs a logout, removing the `sid` cookie and deleting any matching session on server

Always returns JSON of object with `wasLoggedIn` boolean property
- This return value isn't very useful, but you have to do it anyway because your instructor is mean

### GET `/api/word`

Returns JSON of object with username and storedWord properties
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-missing"

### PUT `/api/word`

- Expects body to be JSON of object with a "word" property
Returns JSON of object with username and storedWord properties
- For this assignment, an empty string (`""`) IS a valid word to store
  - This means you will NOT have any error to display about an invalid word
- If not logged in, instead returns status 401 and JSON of object with error property of "auth-missing"

## Hints
- Start by writing a basic render method. This will tell you what variables you need in your state.  Then add event listeners and service calls to update the state and handle events from elements you have rendered.  
- Write a little bit of functionality at a time and make sure it works before adding more functionality.
- Don't forget to add a check for existing session when the page loads, but that should be written only after you have the basic functionality of rendering based on state working.
- You will want to make use of event delegation to attach event listeners to ancestor elements that are not replaced, and check the event.target to see if the target was a specific element.  This will let you add event listeners for elements that may not be on the page yet or that are commonly replaced by your render method.
- Don't forget to show error messages to the user in the text of the page. `console.log`/`console.warn` are NOT error handling!
- Not all service errors are errors you need to display to the user.  For example, when you check for an existing session, you will get back a rejected promise if there is no session, but that is an expected result and not a problem, so no error is shown to the user.

## Restrictions
- Do not use `async` or `await` while learning promises
* You should use the node/npm modules used in class ONLY
    - Still no `uuid`, still no `express-session`
* Do not use any outside JS or CSS files or assets
  - Exception: You may use SVG/PNG icons from https://fonts.google.com/icons ONLY if you keep a `licenses.txt` file in your repo (same folder as this README) that lists each image filename you have and for each filename you say "from https://fonts.google.com/icons using the Apache 2.0 License"
* Use Semantic HTML and semantic CSS class names
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any outside files in your PR (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* Do not use localStorage or other client-side storage 
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
* Follow the best practices as described in this course to date

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
- Does PR follow submission expectations?  (contains only change from assignment, correct branch name, good commit message(s), reviewers assigned)
- Did you create a correct and usable package.json file?
- Did you create a correct and usable configuration based on the material from class?
- Did you install ONLY permitted and appropriate modules?
- Did you create the expected scripts in package.json?
- Do the scripts correctly create the necessary files when the steps listed at the of Goals are followed?
- Did you follow the restriction against modifying server JS content?
- Did you follow the requirement to avoid `async` and `await`?

### Overall Requirements
- Does the app work overall and meet all requirements not covered by other criteria?
- Were all restrictions not covered by other criteria followed?
- Does the code demonstrated the requested skills and lessons?
- Are you using static assets per the requirements?
    - static HTML/CSS/Front end JS files on server-side
    - front end JS built using babel/webpage to change HTML
- Would a user understand what to do on each page?
- Did you follow the requirement to avoid `async` and `await`?
- If a user logs in and reloads the page, does it end up showing the same content?

### JS Organization Quality
- Do you have Separation of Concerns (SOC) in your JS?
- Are stored values and logic about the stored values (models) separated from HTML generation (views) and events (controller)?
- Are functions and files named so their meaning and purpose within the MVC/SOC concepts are understandable?
- Is it easy for a dev new to the code to understand how it works enough to make a change?
- Is it easy for a dev to find the section of code that controls a specific part of the app?
- Is it easy for a dev to understand what any given section of the code is about without reading every line?
- Do event handlers/service calls change state instead of directly changing HTML?
- Is any derived state kept out of state itself and recalculated as needed?
- Does the front end code store data only about the currently logged in user?
- Are you changing the apparent "Page" for the user based on JS state?

### Service Call Quality
- Are the correct service calls made when needed by requirements?
- Are error message for the user made visible to the user in the HTML?
- Are responses checked for when they report an error from the service?
- Do service calls notice and report to the user any network issues correctly?
- Are you sending and receiving JSON data?
- Are you using correct headers when sending the data?
- Did you follow the requirement to avoid `async` and `await`?
- Do you change state based on data from service calls?

### JS Code Quality 
- Is the JS following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are any comments helpful?  Not just repeating what the code says, and providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?
- Do you understand what the code you are submitting does well enough to explain to your team?

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

