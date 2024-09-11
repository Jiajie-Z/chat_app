# Course Syllabus: INFO 6250 - Silicon Valley
# Fall Semester 2024 - Thu
Instructor: Brett Ritter `<b.ritter@neu.edu>`

This course covers Web Development, focusing on both the fundamentals and from them modern development practices for the web.  The class will use Javascript on both the front- and back-ends of web application development, but the lessons learned will be applicable to many languages.  
 - Basic git use as a version control system for shared applications and development
 - How information flows in a web application between various machines
 - Modern JS development for the frontend (both "vanilla" JS and React-based)
 - NodeJS development of a backend end, both server generated content using the express framework (minimal) and service development
 - Basic Debugging Techniques
 - Web security fundamental practices, both front- and back-end.
 - The basics of how many development teams breakdown application needs and complete work

### What is NOT covered
 - How to program in general
 - HTML and CSS details (My INFO6150 course is a great source of info here)
 - Languages other than Javascript (focus is on concepts)
 - Mobile specific development
 - Accessibility (a11y), Internationalization (i18n), or Localization (l10n)
 - SQL/NoSQL usage or database architectures/maintenance
 - Specific Libraries: Focus is on concepts and not the diverse but temporary library options
 
## Grading: I reserve the right to adjust based on your final demonstration of applied knowledge.  
```
15% Assignments (lowest score ignored)
10% Quizzes (lowest score ignored)
25% Server-side Project
25% Vanilla JS Project 
25% Final React Project
```
### Grading Scale

The letter grade for course is decided by the percentage of their total score compared to the possible score.  This is the grading scale recommended by the department:

- 95-100% A
- 90-94.9% A-
- 87-89.9% B+
- 84-86.9% B (yes, the threshold for an A is different)
- 80-83.9% B-
- 77-79.9% C+
- 74-76.9% C
- 70-73.9% C-
- 69.9% or below F


## Basic Requirements and Expectations:
- Basic familiarity with CSS and HTML is assumed ( see https://developer.mozilla.org/en-US/docs/Learn )  
- Basic exposure to programming concepts (variables, functions, looping) is assumed
- You will have to use git and github.com following the instructions given
- There is no textbook for the class, but a number of online articles will be shared
- Many topics will be introduced in class but require you to perform additional research/experimentation
- Additional software (without cost) is required.  Installation and configuration is your responsibility (Mac, Windows, or \*nix)
- Students should ask questions where anything is unclear
- A great deal of work will be done online, in and out of class

## Expected Class Schedule (subject to change):

### Section 1: Web Fundamentals

#### Schedule
- Thu Sep 5 
- Thu Sep 12 
- Thu Sep 19 
- Thu Sep 26 
- Thu Oct 3 

#### Topics

##### Class 1: Start of Web Fundamentals (Section 1)
- About the Course
    - Why WebDev is Awesome
    - Core Course Concepts
    - Github Repos
    - Slack Workspace
    - Do Not Copy Work Policy
- Introduction to the Web
    - Clients + Servers
    - The roles of HTML/CSS/JS
    - Static vs Dynamic content
    - HTTP Request/Response
- Introduction to Git

##### Class 2: HTML/CSS
- HTML Syntax and Role
    - Semantic HTML
- CSS Syntax and Role
    - Semantic CSS
- Using HTML
- Using CSS
- Using a Static Server

##### Class 3: Intro to JS
- Static vs Dynamic Typing
- Strong vs Weak Typing
- JS Syntax

##### Class 4: Writing an Express webserver
- Using Node
- Using NPM
    - JSON (JavaScript Object Notation)
    - package.json
    - semver
    - Dependencies
- Using Express
- Writing a Server Generated Chat App
    - HTML Forms

##### Class 5: Sessions and Logins
- Sessions
- Debugging
- Server Security
    - Authentication and Authorization
    - Injection Attacks (XSS, SQL)
    - Password Hashing/Salting

At the end of Section 1 you should be able to write a simple multiple page web application (dynamic website) using NodeJS that serves semantic HTML and styles with CSS.  You will receive from github repository updates and submit your work via Pull Requests (PRs) in the same fashion that many employers conduct their work.

#### Server Side Project (project1) Due

Wed Oct 9, 11:59pm PT

### Section 2: Web Frontend 

#### Schedule
- Thu Oct 10
- Thu Oct 17
- Thu Oct 24
- Thu Oct 31

#### Topics

##### Class 6: Client Side JS and RESTful Services
- The DOM
- Front End Validation with JS
- Front End State
    - Explicit State vs State in DOM
- Front End Tools
    - Linters
    - Prettier
    - Minification
    - Transpilers
    - Bundlers

##### Class 7: Client Side Dynamic Rendering 
- "Building"
    - Babel
    - Webpack
- Client Rendering from State

##### Class 8: Calling Web Services
- Single Page Applications
- Async JS
    - Promises
- Fetch
    - Calling Services
    - Parsing Results
    - Using Results

##### Class 9: RESTful Services
- Service Basics
    - Endpoints
    - Sending/Receiving Data
    - REST 
    - GraphQL
- Core REST Concepts
    - URL as a Resource
    - HTTP Method as Interaction
    - Status as Result of Interaction
- Writing RESTful Services in Express
- Calling RESTful Services from Client JS

At the end of Section 2 you should be able to write a simple single page web application (SPA) using "vanilla" JS.  Your SPA can call RESTful external services that you can also write using NodeJS to provide those service endpoints.

#### Vanilla JS Project (project2) Due

Wed Nov 6, 11:59pm PT

### Section 3: The Recent Web (React)

#### Schedule 

- Thu Nov 7
- Thu Nov 14
- Thu Nov 21
- Thu Dec 5

#### Topics

##### Class 10: Start of React (Section 3)
- Using Vite for React
- React Components
- React State
- React MVC
- React State and Pages

##### Class 11: Making Service Calls with React
- Proxies
- React Service Calls
- React Hook: useEffect
- useEffect and Service Calls?

##### Class 12: React State Management
- React Hook: useReducer
- React Hook: useContext
- React Deeplinking

##### Class 13: After INFO 6250
- Now What?
- Getting Hired
- Your Future Team
- Projects
- Agile SDLC

At the end of Section 3 you should be able to write a simple single page web application (SPA) using React JS. 

### Final Projects Due 
- NO EXTENSIONS FOR FINAL PROJECT!

Final Due: Mon Dec 9, 11:59pm PT

No class Thu Dec 12 (just Project due Mon Dec 9, 11:59pm PT)
## Attendance Policy

Students are expected to attend the weekly class sessions (in-person in the classroom) and ask questions whenever the lectures are unclear to them.  Barring emergencies, any absences must be requested and approved in advance.  Students registered in MGEN courses (INFO, CSYE, and DAMG) are allowed a maximum of 2 absences per course, with 3 or more absences resulting in an automatic 'F' for that course. Students are expected to inform their instructors of any absences in advance of the class; if a student is sick long-term or experiences a medical issue that prevents class attendance, it is strongly encouraged that they speak with their Academic Advisor (coe-mgen-gradadvising@northeastern.edu) to learn more about the Medical Leave of Absence. Should a student anticipate being unable to attend 3 or more classes, they should discuss their situation with their Academic Advisor to explore other types of leave in accordance with the University's academic and global entry expectations. International students should review the Office of Global Services webpage to understand their visa compliance requirements.

Teaching Assistants (TAs) or Instructional Assistants (IAs) will be present at each class to collect student attendance.

## Late Work Policy

- Students are expected to complete the weekly assignments between classes and submit to their class Github repositories by the deadline (normally before the day of the next class)
- Students are expected to complete the weekly Canvas-based quizzes between classes and submit online before the deadline (normally before the day of the next class)
- Students are expected to complete the course projects between classes and submit to their class Github repositories by the deadline (normally before the day of the next class)

Students must communicate with the faculty prior to the deadline if they anticipate work will be submitted late. Work submitted late without prior communication with faculty will not be graded. Late work submitted WITH prior communication is either granted an extension (no grade penalty) OR will be graded with a penalty and only graded after on-time assignments are graded, time-permitting.  Any submission that was not granted an extension has no guarantee that it will be graded.  

## End-of-Course Evaluation Surveys 
Your feedback regarding your educational experience in this class is particularly important to the College of Professional Studies. Your comments will make a difference in the future planning and presentation of our curriculum.

I, as the instructor, value all feedback and use it to shape further improvements in the course.

At the end of this course, please take the time to complete the evaluation survey at https://neu.evaluationkit.com. Your survey responses are completely anonymous and confidential. For courses 6 weeks in length or shorter, surveys will be open one week prior to the end of the courses; for courses greater than 6 weeks in length, surveys will be open for two weeks. An email will be sent to your Husky Mail account notifying you when surveys are available.

## Academic Integrity 
A commitment to the principles of academic integrity is essential to the mission of Northeastern University. The promotion of independent and original scholarship ensures that students derive the most from their educational experience and their pursuit of knowledge. Academic dishonesty violates the most fundamental values of an intellectual community and undermines the achievements of the entire University.

As members of the academic community, students must become familiar with their rights and responsibilities. In each course, they are responsible for knowing the requirements and restrictions regarding research and writing, examinations of whatever kind, collaborative work, the use of study aids, the appropriateness of assistance, and other issues. Students are responsible for learning the conventions of documentation and acknowledgment of sources in their fields. Northeastern University expects students to complete all examinations, tests, papers, creative projects, and assignments of any kind according to the highest ethical standards, as set forth either explicitly or implicitly in this Code or by the direction of instructors.

Go to http://www.northeastern.edu/osccr/academic-integrity-policy/ to access the full academic integrity policy.

## MGEN Student Feedback
Students who would like to provide the MGEN unit with anonymous feedback on this particular course, Teaching Assistants, Instructional Assistants, professors, or to provide general feedback regarding their program, may do so using this survey: https://neu.co1.qualtrics.com/jfe/form/SV_cTIAbH7ZRaaw0Ki

## University Health and Counseling Services

As a student enrolled in this course, you are fully responsible for assignments, work, and course materials as outlined in this syllabus and in the classroom. Over the course of the semester if you experience any health issues, please contact UHCS. 

For more information, visit https://www.northeastern.edu/uhcs. 

## Student Accommodations

Northeastern University and the Disability Resource Center (DRC) are committed to providing disability services that enable students who qualify under Section 504 of the Rehabilitation Act and the Americans with Disabilities Act Amendments Act (ADAAA) to participate fully in the activities of the university. To receive accommodations through the DRC, students must provide appropriate documentation that demonstrates a current substantially limiting disability. 

For more information, visit https://drc.sites.northeastern.edu.

## Library Services 

The Northeastern University Library is at the hub of campus intellectual life. Resources include over 900,000 print volumes, 206,500 e-books, and 70,225 electronic journals.

For more information and for education specific resources, visit https://library.northeastern.edu. 

## 24/7 Canvas Technical Help 

For immediate technical support for Canvas, call 617-373-4357 or email help@northeastern.edu

Canvas Student Resources:  https://canvas.northeastern.edu/student-resources/ 

For assistance with my Northeastern e-mail, and basic technical support: 

Visit ITS at https://its.northeastern.edu 

Email: help@northeastern.edu 

ITS Customer Service Desk: 617-373-4357

## Diversity and Inclusion 

Northeastern University is committed to equal opportunity, affirmative action, diversity, and social justice while building a climate of inclusion on and beyond campus.  In the classroom, members of the University community work to cultivate an inclusive environment that denounces discrimination through innovation, collaboration, and an awareness of global perspectives on social justice.

Please visit http://www.northeastern.edu/oidi/ for complete information on Diversity and Inclusion

## Title IX 

Title IX of the Education Amendments of 1972 protects individuals from sex or gender-based discrimination, including discrimination based on gender-identity, in educational programs and activities that receive federal financial assistance.

Northeastern’s Title IX Policy prohibits Prohibited Offenses, which are defined as sexual harassment, sexual assault, relationship or domestic violence, and stalking. The Title IX Policy applies to the entire community, including male, female, transgender students, faculty, and staff.

In case of an emergency, please call 911.

Please visit https://www.northeastern.edu/ouec for a complete list of reporting options and resources both on- and off-campus.




