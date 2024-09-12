# Assignment - Basic HTML + CSS

**Due: Wed Sep 18, 11:59pm PT**

## Submission

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-html-css' (`git checkout -b basic-html-css`)
* Create/Modify the files needed to fulfill the requirements below.  Be sure to create the files in this directory (the one with this README.md)
* Add, commit, and push the branch to github
    - You pick the commit message, but it should summarize your work in this commit
    - Remember that your commit message is not just part of this assignment, it is part of the entire repo, so any messages specific to this assignment should be clearly about this assignment
    - Do NOT use "Adds MYNAME", that was the commit message for assignment 1 only
    - See [/readings/git/commit-messages.md](/readings/git/commit-messages.md) for more info on commit message
    - The push should be to this feature branch name (`git push origin basic-html-css`) 
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  

## Goal

You will create a website consisting of two page and demonstrate an understanding of the basics of HTML and CSS following the practices taught in class.

## Requirements

You will create a website consisting of two web pages:
- the `index.html` file (Home page)
- a `privacy.html` file (Privacy policy)

You will modify the `index.html` file and create a `privacy.html` file along with any necessary files to fulfill the requirements below.

This website is visible by running `npx serve` in this directory, and visiting `http://localhost:3000/` in the browser.

These instructions will likely result is some **truly ugly** websites. That's okay, the goal at this stage is to understand how the parts interconnect. Just make sure the text is visible.

You may do more than is listed here, so long as you meet all the requirements listed in the way that is listed as required and use the skills shown in class.

### The home page (the index.html file)

Modify this file to:
- Load a separate `styles.css` file that you will have to create
- Load a `home.css` file that you will have to create
- Replace the contents of the `<main>` element to include an HTML unordered list of of your favorite animals. Each entry should contain a link to some web page on the internet related to that animal. These can be a category of animal (such as "owl") or to a specific individual animal (such as "Jorts the Cat")
- Replace the contents of the `<footer>` element to be a link to privacy.html, which you will have to create

### The Privacy Policy (the privacy.html file)

Create this file:
- This page should have the same header/footer as the home page
  - Yes, this means the privacy page will have a link to the privacy page (itself) in the footer.  This may seem odd, but is "normal".  See the Northeastern, Amazon, or Google privacy pages as an example: they all link to the very same privacy page in the footer.
- The contents of the page should be some fake text.  Do NOT copy text from some actual site.  Definitely do NOT copy HTML from some actual site.  The text does not have to be very believable, but should be words forming sentences.  Lorem Ipsum text is fine. 
- Somewhere in this text you should have a link back to the home page.  The link text should not say "click here" in any way but should be visible text that user understands is a link to the Home Page.
- The text should involve at least 2 paragraphs
- The page should load the same `styles.css` file as the `index.html` file (you will have to create the `styles.css` file)
- The page should load a `privacy.css` file that you will have to create

### styles.css

The CSS in this file should:
- Set the header/footer to have a different background color from the main page
- Set the main page background color (the background color of the html or body element) to something other than the browser default
- Set the page heading (the `<h1>` contents) to be shown NEXT to the logo cat pic, not above/below it, using flexbox
- Change any foreground colors needed to make the text visible for header/main/footer

### home.css

The CSS in this file should:
- Put a colored border and add padding (on all sides) around the entire list of animals
- Set the `list-style-type` CSS property for the list to "\1F431" (cat face)
- This file should use only classes as selectors, no element tags or ids

#### privacy.css

[Use the information about the first-letter pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) to fulfill the below requirements.

The CSS in this file should:
- Set the first letter of each paragraph in the main content of this page to be `font-size: 150%;` 
- Set the `line-height` of the paragraph contents to `line-height: 1.6;`
    - This can be done directly or through inheritance, as long as the effective line-height for the paragraphs is the correct value

## Restrictions
* You MUST follow the required/best practices outlined in class
* Do NOT use external CSS libraries, only CSS you are writing yourself and included in this PR
* Do NOT use meta-tag redirects
* Do NOT use floats to do more than manage flowing text with images
* Do NOT use HTML tables or CSS table layouts to layout elements on the page
* Do NOT use client-side/browser-side Javascript
* Do NOT use CSS preprocessors, minifiers, or other tools to modify your CSS
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
- Overall Requirements
    - Does the project meet the goal?
    - Were all restrictions obeyed?
    - Were all requirements met in ways that showed understanding of the class material?
    - Are the particular requirements for each HTML file and CSS file followed?
- Overall HTML Quality
    - Are required elements present, and all elements used correctly?
    - Are elements used with correct and appropriate semantics when available?
    - Are attributes and values used as taught and with required syntax?
    - Are elements indented when appropriate and consistently?
- Overall CSS Quality
    - Is all CSS loaded from separate CSS files?
    - Are CSS class names semantic?
    - Are CSS class names kebab-case or BEM style?
    - Are CSS classes preferred for selectors? (situational)
    - Are CSS properties consistently indented in their blocks, with space after the :?
    - Is the CSS applied wisely per class guidelines? (Not creating a page that only works for certain fixed screen sizes, etc)?


