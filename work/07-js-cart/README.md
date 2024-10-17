# JS Shopping Cart

Due by **Wed Oct 23, 11:59pm PT**

## Submission Instructions
* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-cart' (`git checkout -b js-cart`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  

## Goals

You will create a single page application that allows a user to:
- See a Product Page of 3 cats each with a name and price
- Click a "Add to Cart" button for each cat
- Click a "View Cart" button 

While viewing the cart they will see
- The Product Page content is STILL shown
  - The View Cart content is ALSO shown
  - The "View Cart" button is NOT shown
  - A "Hide Cart" button IS shown
- The cat, name, quantity, and total for any cats they added
- They can update the quantity for any cat in the cart
- A "Checkout" button 
  - Checking out will remove all the cats from the Cart
  - Checking out will Hide the Cart content

You will use webpack and babel (both!) to
- build (transpile and bundle) the client-side JS bundle

You will have an express server configured to 
- serve static pages only (no dynamic HTML, no login, no redirects)
- Your front end JS code WILL create dynamic HTML, but the server will not

Your code will be runnable using 
- `npm install`
- `npm run build`
- `npm start` or `npm run start` (they are the same)
- Visiting `http://localhost:3000/`

## Requirements

While achieving the Goals listed above:

### General Practice
- You should demonstrate the skills shown in class
  - "Working" code using techniques from outside of class does not demonstrate the skills from class
- You will use the concepts of separate state and rendering from class
- Do NOT add event listeners to dynamically generated elements
  - Hint: Like how in class we used Event Propagation so we added event listeners to elements that were in our index.html, not to elements that were created in render()
- Your client-side JS should involve at least 2 JS files in `src/` that are used wisely to improve the findability of your JS code (one JS file will `import` values from at least one other JS file)
    - Hint: Separate out "model" code with state and ways to change state from "view" code that updates HTML and from "controller" code such as setting up events and calling the model functions and render functions.
- We are using prices, but use Numbers and Strings, no need to worry about extreme precision with the simple math we are doing

### Server
- You will create a `server.js`
  - Running express
  - Configured to server static files from `public/`
- `npm start` or `npm run start` will run `node server.js`
  - Hint: NOT using `node --watch` or `webpack-dev-server`
- There is no persistence/storage for this project, so hitting "refresh"/"reload" in the browser will reset the page to the initial (no cart contents) page.  That's expected and fine for this assignment.

### Build
- You will use Webpack and babel configured as per class
  - Hint: Follow the slides that involve babel-loader and webpack.config.js but NOT babel.config.js
- Your development js will be in a `src/` directory
  - Outputting built js to `public/`
- You must define `start` and `build` scripts in your `package.json`
  - You can define other scripts to do things like run `webpack-dev-server`, `node --watch server.js` or `npx webpack --watch` for your own convenience, but these will not be considered for or against your grade

### Product Page
- The Product Page displays by default on `/`
- The Product page will list 3 cats (use the below image urls)
  - http://placehold.co/150/150?text=Jorts ($0.99 each)
  - http://placehold.co/150/150?text=Jean ($3.14 each)
  - http://placehold.co/150/150?text=Nyancat ($2.73 each)
- While this currently has 3 cats("products"), it should be set up to easily add/remove/change "products"
- Include the price in the "listing" for a given cat
- Give each cat pic a "name" as the product name
    - Match the text in the image
- Each cat listing will have an "Add to Cart" button
  - Clicking "Add to Cart" will add 1 to the quantity of that cat in the cart
    - Or set the quantity to 1 if the cat was not in the cart
- If the "View Cart" content is not displayed, there will be a "View Cart" button
  - The View Cart button will include a number of total items in the cart if that number is greater than 0
    - You can decide how to show this, but "View Cart (3)" text is adequate
  - Clicking the View Cart button will 
    - No longer show the View Cart button
    - Show the View Cart content
    - Continue showing the Product Page content
- You have discretion on how to handle the visuals, subject to the Visual requirements below
    - Hint: Because the Product Page content is **always shown**, think of the "Cart Content" as part of the Product Page content, not a separate page

### View Cart
- While all of the below currently uses the 3 cat "products", it should be able to easily handle added/removed/changed "products"
  - Hint: You should have separate "product data" and "cart data"
  - Hint: I recommend NOT putting all details of a product into the cart.  Cart data can hold an identifier for the product and a quantity for that product, while Product data has the image and price but not the quantity.
- The View Cart content will display the cats added
  - If there are no cats, show a message "Nothing in the cart"
  - Including the name and pic of the cat
  - Including a quantity per cat (as long as that quantity is greater than 0)
    - The quantity can be edited (You choose exactly how)
    - On edit related values and visuals will update
  - Cats at quantity 0 are not shown
  - Including the total price for that cat (price per cat * quantity)
    - This must be to two decimal places
      - Hint: google "MDN toFixed"
  - And a total price for the Cart (sum of total prices for all cats)
    - This must be to two decimal places
- The total cost of all cats in the cart is shown
- You can use different numbers in the paths to get images of different sizes (example: http://placehold.com/50/50?text=Jorts) in the View Cart content, if you wish
- When displayed, the View Cart content will have a "Hide Cart" button
  - Clicking the Hide Cart button will
    - No longer show the View Cart content
    - Will show the View Cart button
- When displayed, the View Cart content will have a "Checkout" button
  - Clicking the Checkout button will
    - No longer show the View Cart content (as if "Hide Cart" was pressed)
    - Remove any items from the cart
    - Update any related values displayed in the HTML (such as the count in the View Cart button)

## Visual Requirements
- Styling this content well would be an interesting exercise but beyond the purpose of this assignment
- Therefore the visual requirements are minimal
- Related areas of content must be clear
  - Example: It is obvious which name and price is related to which cat
- The View Cart content must be a visually distinct area from the Product Page content
  - Example: A different background color

## Restrictions
* You should use the node/npm modules used in class ONLY
* Do not use any outside JS or CSS files or other assets
  - Exception: You may use SVG/PNG icons from https://fonts.google.com/icons ONLY if you keep a `licenses.txt` file in your repo (same folder as this README) that lists each image filename you have and for each filename you say "from https://fonts.google.com/icons using the Apache 2.0 License"
* Use Semantic HTML and semantic CSS class names
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any outside files in your PR (no files from other assignment directories, for example)
* Use arrays and objects when they each make sense
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not set the style attribute/property on elements or on DOM nodes
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
- Did you install ONLY permitted modules?
- Did you create the expected scripts in package.json?
- Do the scripts correctly create the necessary files when the steps listed at the of Goals are followed?

### Overall Requirements
- Does the app work overall and meet all requirements not covered by other criteria?
- Were all restrictions not covered by other criteria followed?
- Does the code demonstrated the requested skills and lessons?
- Are you using static assets per the requirements?
    - static HTML/CSS/Front end JS files on server-side
    - front end JS built using babel/webpage to change HTML
- Would a user understand what to do on each page?

### JS Organization Quality
- Do you have Separation of Concerns (SOC) in your JS?
- Are stored values and logic about the stored values (models) separated from HTML generation (views) and events (controller)?
- Are functions and files named so their meaning and purpose within the MVC/SOC concepts are understandable?
- Is it easy for a dev new to the code to understand how it works enough to make a change?
- Do event handlers change state instead of directly changing HTML?
- Does the code/page easily work with new/changed products?
- Is Cart data separate from Product data, and do each cover their respective details?

### JS Code Quality 
- Is the JS following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are any comments helpful?  Not just repeating what the code says, and providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?

### HTML & CSS Quality
- Is the HTML complete and valid?
- Are any form fields properly associated with a text label?
    - Quick test: click on the text of the label, the field should be selected
- Are the HTML and CSS formatted and indented per the standards given in the course?
- Does the content work at various reasonable "desktop" sizes of a browser window?
- Are HTML elements used in semantically appropriate ways?
- Are Semantic HTML elements used when available and appropriate?
- Are all class names semantic and kebab-case (or BEM) style?

