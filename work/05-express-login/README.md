# Assignment - Express Login

**Due by Wed Oct 9, 11:59pm PT**

## Goal 

You will build a web application using the techniques from class that allows multiple users to login, read and update data specific to the user, and logout.  This application will NOT use passwords.  You will have to create the entire package and needed files.

## Submission Instructions

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'express-login' (`git checkout -b express-login`)
* Create a package.json and necessary files to complete the work described below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s).  

## Requirements

The application will be a site that performs login, keeps information for each user, and allows a logout
- Special Note: We will not have a "register user" step.  When a user tries to login with a username, we will consider that a valid account (except for user "dog", which we will treat like a bad password, since we will not have password)

- The home page of the application will show either a login form, or the "data page"
  - Both of these pages are dynamically generated
- The home page offers the option to logout IF the user is already logged in
- The data page will show current "stored word" for the current logged in user
- The data page will include a form to replace the stored word with a new one
- Multiple users can use the system without problems
  - Each with their own separate stored word
  - A user will always see the most recent version of their stored word, even if that user had previously logged out or updated the secret word from a different browser
- You should demonstrate the skills taught in this course where applicable
- You will not be using HTTPS 
- You will not be using any password entry or handling
- See "Example Testing Flow" later to confirm your understanding.

### Visuals

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
    - Any form field must have a properly associated `<label>` element with a useful text label of the field
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required

### Logic

#### Login

- A user that is not logged in will be prompted to enter their username
    - Hint: the `/` route can simply return DIFFERENT response content.  A logged in user will see the data, a not-logged in user will see a login form
    - Hint: Showing different HTML content should just be your controller deciding to call and return a different view function
- The form that collects the username should POST to a different route (path is up to you)
- The server will create a UUID-based session id and store it in a cookie.  The server will also associate that sid with the username.  (hint: have the sid be a key for an object that is defined OUTSIDE the request handler in the server.  Set the value to an object, with `username` as one of the properties in that object)
- login will fail for an empty username or the username "dog" or any username that is not made up of letters or numbers only
  - Hint: If you want to look into regular expressions, see the [/readings/js/regex.md](/readings/js/regex.md) file for some base info, then checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
- If login fails due to an invalid username, you should respond with a 400 status code and a web page that informs them and offers a link to see the login form again (this can be simply a link to the home page)
    - Later we will talk about putting errors on the page instead of being a separate page with a link to try again
    - If login fails because the username is dog, you should respond with a 403 status code, but otherwise offer the same option to return to the login form above
    - Hint: use `res.status();` to set the status code you want to return.  You will still need to `.send(...);` the HTML content
- If login succeeds the server should respond with a redirect to the home page.

#### Data Page

- A user that is validly logged in will see the data page on `/`
- The data page will offer a button to logout (use POST to logout for this assignment)
- The data page will display a "stored word" specific to that user
  - The stored word for each user defaults to the empty string
    - Hint: If the is no stored word for the user (undefined), you can treat it as ""
  - The stored word is stored on the server
    - NOT sent as a cookie
  - Putting the stored word as the value of the form field counts as displaying the stored word, but you can show it outside the field in addition if you wish
- The data page has a form to change the stored word
  - Show an input of type text with a value of the current stored word value
  - The path of the route to change the stored word is up to you
- If a change is submitted, the server will record that change and associate it to the username and redirect to `/`
  - There is currently no required validation for the stored word
  - If you do choose to validate the stored word, and empty string is allowed
  - Hint: Use a second object to hold the stored words.  Use keys of the username.  That way the data is associated with the user, not the session id. Every change attempt will make sure the session id is a valid user
  - Hint: To test that you have proper separation of the data for different users, try storing a word, logging out and logging in as a different user.  You should not see the stored word of the first user.  Then logout and log back in as the first user.  You should see their stored word.
  - Hint: To test that you are checking the session each time, try reloading the page.  You can also delete or change your session id cookie in the DevTools before submitting the change form to ensure that you are checking the session id on submit and not just on the / route.
- A user that sets a stored word, logs out, and later logs back in will still see their stored word
  - Hint: To test that you have proper separation of session data and user data, try storing a word, logging out, and logging back in as the same user.  You should see their stored word.
- Stored words can be different for different users
  - Hint: Use an incognito/private browser to login in as a second user at the same time your main browser window is logged in as a first user

#### Logout

- The logout route will:
  - Remove the session id from the object it is using to store the session info
    - Hint `delete obj.key` or `delete obj['key']` removes property `key` from object `obj`
  - Remove the cookie from the browser
  - Redirect the user to `/`
- The logout route will NOT:
  - Remove the stored word from being associated with that username
  - Hint: This means the session object doesn't hold the stored word.  Try using a second object that connects the username to the stored word, just like the session object connected the sid to the username.

#### Internals

* The application must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
* You should try to follow an MVC structure: 
  - There should be code that manages stored values and changes to that data 
  - The code that generates HTML should be separate from the data logic
  - The code that generates HTML should be separate from the express route handlers
* Every response from the server should either be a redirect or include all required HTML structure
  - Example: Don't have `res.send('invalid username')` - that doesn't have the html/body/etc 

## Example Testing Flow

This may not be the only option available based on the instructions, but this will fulfill the instructions

1. Jorts, who is not yet logged in, loads the / page of the web app
    - Jorts sees a login form on the returned web page
2. Jorts fills in the username of "#$%@" and submits
    - Jorts sees a web page with:
        - an error message about an invalid username
        - a link to /
        - The status code for this response is 400
3. Jorts returns to / to see the login form and tries to login as "dog"
    - Jorts sees a web page with:
        - an error message about user not allowed
        - a link to /
        - The status code for this response is 403
4. Jorts returns to / to see the login form and tries to login with no username ("")
    - Jorts sees a web page with:
        - an error message about an invalid username
        - a link to /
        - The status code for this response is 400
5. Jorts returns to / to see the login form and tries to login as "Jorts"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts (defaults to "")
        - A form to change the value of the stored word
        - An option to logout
6. Jorts uses the from to store the word "closet"
    - Jorts gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The stored word of "closet"
        - A form to change the value of the stored word
        - An option to logout
7. Jean (using an different browser or browser profile on the same computer, NOT just a different tab) loads /
    - Jean sees a login form on the returned web page
8. Jean logs in as "Jean"
    - jean gets a redirect to /
    - the browser automatically follows the redirect and shows / in the url
    - jean sees a web page with:
        - the current stored word for jean (defaults to "", is not "closet")
        - a form to change the value of the stored word
        - an option to logout
9. Jean uses the form to store the word "nap"
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a web page with:
        - The current stored word for Jean ("nap")
        - A form to change the value of the stored word
        - An option to logout
10. Jorts (still looking at a page that says "closet") reloads the page in the browser
    - Jorts does NOT get any warning from the browser about reloading a POST
    - Jorts sees a web page with:
        - The stored word of "closet" (not "nap")
        - A form to change the value of the stored word
        - An option to logout
11. Jorts logs out
    - Jorts gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a login form on the returned web page
12. Jean leaves the other browser window open an uses the browser window Jorts was using, and logs in as "Jean"
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a web page with:
        - The current stored word for Jean ("nap")
        - A form to change the value of the stored word
        - An option to logout
    - Both browser windows are now logged in as Jean and showing the same word
13. Jean logs out of both browser windows.  For both windows:
    - Jean gets a redirect response to / 
    - The browser automatically follows the redirect and shows / in the url
    - Jean sees a login form on the returned web page
14. Jorts returns to one of the browsers and logins in as "Jorts"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts ("closet")
        - A form to change the value of the stored word
        - An option to logout
15. Jorts changes the stored word to "trashbin"
    - Jorts gets a redirect response to /
    - The browser automatically follows the redirect and shows / in the url
    - Jorts sees a web page with:
        - The current stored word for Jorts ("trashbin")
        - A form to change the value of the stored word
        - An option to logout

## Allowances
* You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and follow other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class and the Restrictions below
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You should use `express`, `cookie-parser` ONLY
  - `express-session` is NOT allowed!
  - `uuid` module is NOT allowed!  (Use the built in `crypto.randomUUID()`)
  - `jest` or `vitest` are allowed if you add unit tests for your content, but (sadly) no test code will be graded
    - Remember that a unit test should not test the server itself.
* You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
* You must use the correct HTTP methods (GET for loading pages, POST for adding content)
* Reloading a page should not trigger a POST (use a redirect)
  - Except for errors that don't change the server state
* Do not use external JS other than base express and cookie-parser
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables for layout or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* Do not have any outside files in your PR (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use Map() or Set() for this assignment
  * In order to ensure you know how to use objects and arrays for the purposes
  - .map() on arrays is different than the Map data structure created with Map().  You are allowed and encouraged to use .map() on arrays for assignments
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`, `prompt`, or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* Do not use client-side(browser) JS
* Do not use localStorage or other client-side storage other than a cookie to hold your session id
* Do not use meta tag refreshes
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

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
- Did you ONLY install permitted modules?
### Overall Requirements
- Does the app work overall and meet all requirements not covered by other criteria?
- Were all restrictions not covered by other criteria followed?
- Does the code demonstrated the requested skills and lessons?
- Are you using static and dynamic assets per the requirements? (static CSS, dynamic HTML)
- Would a user understand what to do on each page?
- Are the requests to login/logout/change stored word all POST requests?
- Are all POST requests that succeed returning a redirect?
- Are all non-redirect requests sending full HTML pages?
### Login / Logout
- Are users logged in using a session id?
- Is the username validated using an allowlist of valid characters?
- Are only logged in users shown the option to logout?
- Does logout remove the sid from both the server side session AND the browser?
### Model View Controller (MVC)/Separation of Concerns (SOC)
- Are stored values and logic about the stored values (models) separated from HTML generation (views) and server routes (controller)?
- Are functions and files named so their meaning and purpose within the MVC/SOC concepts are understandable?
### Multi-user
- Is the Session id checked on any request to change the stored word?
- Are stored words stored outside of the session?
- Are stored words tracked by username?
- Can multiple users log in at the same time and not overwrite each others' data?
- Can a user change their stored word?
- Can a user logout and log back in to still see their stored word?
### JS Quality 
- Is the JS following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are comments helpful?  Not just repeating what the code says, and providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?
### HTML & CSS Quality
- Is the HTML complete and valid?
- Are all form fields properly associated with a text label?
    - Quick test: click on the text of the label, the field should be selected
- Are the HTML and CSS formatted and indented per the standards given in the course?
- Does the content work at various reasonable "desktop" sizes of a browser window?
- Are HTML elements used in semanatically appropriate ways?
- Are Semantic HTML elements used when available and appropriate?
- Are all class names semantic and kebab-case (or BEM) style?
- Does the page work when there are enough messages to require scrolling?

