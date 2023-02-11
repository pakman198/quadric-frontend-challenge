Quadric Web Challenge
=====================

Quadric is a platform that uses hardware and software to provide value to customers. There are many components to the platform. We will create a simple user facing front end to display some of the information the platform contains.

# Goal
We will focus on workflows in the Graph editor from [Dev Studio](https://www.quadric.io/studio). When a AI application pipeline in the graph editor is compiled and executed, it processes the results in the background. Conceptually this is similar to a CI/CD pipeline for software development.

Our goal is to create a page with a list of executed workflows and their results that can see at a glance.

## Backend
- **The data is provided by a mock API**
- You need nodejs 16+ installed to run the mock API
- Run `npm install` then `npm run mock-api`
- The API endpoints will be available at `http://localhost:3001/`
- Enpoint details in the [Endpoints document](/ENDPOINTS.md)

## Frontend ⬇️
- Navigate to `frontend` folder
- Run `npm install` then `npm run start`
- We will show a list of workflows retrieved from the server
- The list items should be presented with a few pieces of information about the workflow
  - workflow id & status
  - duration of the workflow
  - date workflow was execute
  - any failed jobs

## Guidelines
- You have 24 hours to submit a solution after receiving the challenge
- Frontend code should be in JavaScript ES6+ or TypeScript
- You can use JS/CSS libraries for logic and layout/styling
- You can use libraries to provide basic UI components (you should still write few components yourself for us to review)
- Include instructions on how to compile/run and/or view your site
- Document any caveats about the code
- Use the [endpoints defined for API calls](/ENDPOINTS.md) (**Note:** using the `/db` endpoint as a shortcut is ***NOT ALLOWED*** in your solution)
- Put in equal effort in the code and UI styling (show off all your skill equally, not one more than the others)

## Inspiration
If you are looking for inspiration or an example for your page layout, you can try and emulate the
Quadric Workflows page. You can always make your own design/choose different colors as long as it solves the goals in the [Guidelines](#guidelines) and [Frontend](#frontend).

![Screenshot](/screenshots/quadric_workflows.png?raw=true "Inspiration Screenshot")
# Extra points
If you solved the problem and want to show off your knowledge on specific topics, consider doing the following:

- Use a frontend framework (especially ones we use at Quadric: React)
- Use LocalStorage or IndexedDB in to cache data as you see fit.
- Use a build system to compile/transform code and styles (webpack, css modules, etc.)
- Responsive/mobile layout
- Write out a list of changes you would like to make but didn't have time for (code and/or styling)
- Handle missing/invalid API data in UI (ie. unknown workflow status, null job duration, etc)
- Useful comments in code
- Scalable project folder layout (ie. assume this was a large code project, organize the code/files for that)
- Add a details page/dialog with the job trace (use the `/traces` endpoint)

***Note: Focus on showing your coding & UI styling abilities before going for extra points.
We will review on basic guidelines before considering extra points.***

# Submission
Create your own Github/Bitbucket/Gitlab/etc. solution repo and send us the link (preferred)
or archive your solution in a .zip and email it back to us (alternative).

Good Luck!
Don't hesitate to contact us if you have any questions.