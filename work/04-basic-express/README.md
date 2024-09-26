# Assignment - Basic Express

Due by **Wed Oct 2, 11:59pm PT**

## Submission Instructions

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-express' (`git checkout -b basic-express`)
* Modify the files in this directory to have the required features
* Add any files required 
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s)  

## Goal and Requirements

You will write a chat website using NodeJS and Express
- You are provided a partial implementation, you need to complete it by filling in the missing pieces

The Chat application will work to show all messages, and add messages from a **single** user
- We will learn about multiple users later

* `http://localhost:3000/` will DYNAMICALLY return the html for the page
* The CSS will be loaded as a STATIC asset (hint: you'll have to provide the static file AND make sure it is loaded by the HTML)
* The CSS should be attractive and useful.  The visuals should make the web page easy to use
  - First focal point: You demonstrate you know how to use static CSS from a dynamic page
  - Second focal point: You understand how to use CSS to provide basic layout, set visually distinct areas, and whitespace
  - Third focal point: You follow the CSS best practices from class
* The HTML will display all of the messages that have been sent, including new ones
* The HTML will contain a form to submit as POST(method) to `/chat` (action)
  * The form will contain a **hidden** field (input with type="hidden") with the username
    - Hardcode this to username of your choice
      - All new messages will be coming from this user in this assignment 
      - This is temporary until we learn about sessions, this is not a secure way to do this
  * The form will contain a field with the message the user wants to send
* The server-side JS will handle this request ( fill in the `app.post()` from the included code)
  * It will add the new message to the array of messages
  * It will redirect to `/` (See included code, watch what happens in your network tab in the browser)
* It should follow the best practices outlined in class
* I should be able to run your code with `npm install` and then `node server.js`

### Special Requirements
* Create a package.json file that lists `express` as a dependency.  
  - Hint: remember how we created one and added a dependency in class
* Remove any comments from the code that don't apply after your changes
  - Comments should always reflect the current state of the code
  - Otherwise comments are misleading and harmful

## Allowances
* You may (and are encouraged to) modify the generated HTML as you see fit
    * But it must be fundamentally semantically valid and other best practices from class
* You may modify the CSS as you see fit
    * But you must follow the best practices given in class
    * Using/extending your CSS from assignments/classes is allowed and encouraged
* I have provided an example base HTML and CSS file in `sample/`
  - Use these files as an example, do not use the `sample/` directory in your code
  - Please modify this content for use, it is provided as an example
    - A _minimal_ example.  You are encouraged to do more.
    - I highly encourage you to study how the code works and write your own
        - Do not just copy the files and change them
* The `name` form fields attributes MUST be:
    * `username` for the username
    * `text` for the new message text
    - These are NOT the most convenient names for the required server code
        - This difficulty is on purpose, to make sure you can solve the puzzle, proving you understand the different options
* You must use the correct HTTP methods (GET for loading pages, POST for adding content) as listed
* You must use the route paths as given/described
    * /
    * /chat
* You may add additional JS files (server-side ONLY) that you write
    * But they must maintain/extend the existing separation of concerns
* Formatting dates and times is a nightmare in any language, so we have skipped timestamps
  - But learning/formatting timestamps is a good thing to look into for your future

## Restrictions
* DO NOT HAVE ANY "PASSWORD" BEHAVIOR
    * Poor security is BAD security - we will not even pretend to have security yet
* Do NOT add extra routes beyond those described above
* Do NOT change how the routes get/pass data except as described here
* Do NOT load any HTML using static routes
* Do NOT use external JS other than express itself
    * This means no client-side (browser) JS.  Only server-side.
    - There is no need to install more libraries than express for this assignment
* Do NOT use external CSS libraries
* Do NOT use meta-tag redirects
* Do NOT use Map() or Set()
  - As before, nothing wrong with Map() or Set(), but I want you to practice using plain JS objects first
    - If you feel the need to have map/set-like behavior
  - Note: .map() on arrays is a different thing than the Map data structure you get from Map().  You are both allowed and encouraged to use .map() on arrays for assignments.
* You may NOT use floats to do more than manage flowing text with images
* You may NOT use HTML tables for layout or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* You may NOT use CSS preprocessors, minifiers, or other tools to modify your CSS
  * Reviewers must be able to read your work easily

## Grading Rubric

Note: The assignment is to show your understanding of the material from class.  If you don't do that, you can lose points, even it "it works".  Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).

This assignment is graded on a number of categories, each graded on the below scale:
- Missing (0)
- Needs Improvement (1)
- Good (2)
- Excellent (3)

This means a single mistake might cost you 0 points or more than 1 point, depending on how much that mistake changes your demonstration of the skills from class.

The categories for this assignment are:
- Submission
    - Does PR follow submission expectations?  (contains only change from assignment, correct branch name, good commit message(s), reviewers assigned)
    - Did you create a correct package.json file?
    - Did you ONLY install express? 
- Overall Requirements
    - Does the project work and meet the goal?
    - Were all restrictions obeyed?
    - Were all requirements met in ways that showed understanding of the class material?
    - Are you maintaining the Separation Of Concerns from the given files?
    - Are you following the outline provided in the files?
- JS Quality
    - Are variables named well to describe the value they hold?
    - Is whitespace used to make the code more readable?
    - Are for...of loops used when they make sense instead of C-style for loops?
    - Are you use using explicit blocks for any if{}/for{}?
    - Are you following JS best practices discussed in class (but not listed in these instructions)?
- HTML & CSS Quality
    - Are you using HTML elements semantically?
    - Are you using valid HTML and CSS?
    - Are you following the best practices for HTML and CSS covered in this course?
    - Does your content handle basic resizing of the browser window?
    - Does your page handle enough messages to require scrolling?

