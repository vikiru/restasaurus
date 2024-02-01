---
id: stack
title: 🛠️ Tech Stack
---

## 🛠️ Tech Stack

Backend:

-   [Node.js](https://nodejs.org/en)
-   [Express](https://expressjs.com/)

    -   [Winston](https://github.com/winstonjs/winston)
    -   various middlewares as seen [here](./app/middlewares/index.js)

-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)

Testing:

-   [Mocha](https://mochajs.org/)
-   [Chai](https://www.chaijs.com/)
-   [Sinon](https://sinonjs.org/)
-   [Proxyquire](https://github.com/thlorenz/proxyquire)
-   [Istanbul (nyc)](https://github.com/istanbuljs/nyc)
-   [istanbul-badges-readme](https://github.com/the-bugging/istanbul-badges-readme)

Documentation:

-   Docs are built using [Docusaurus](https://docusaurus.io/)
    -   OpenAPI Specification converted to `.md` using: [Redocusaurus](https://github.com/rohit-gohri/redocusaurus)
    -   Search functionality provided by: [docusaurus-lunr-search](https://github.com/praveenn77/docusaurus-lunr-search)
    -   Analytics using [Google Analytics](https://marketingplatform.google.com/about/analytics/)
-   Documentation site hosted via [GitHub Pages](https://pages.github.com/)

REST API

-   [Render](https://render.com/) - the API can be accessed via the endpoint [here](https://restasaurus.onrender.com/api/v1)

Please note that the API is hosted on Render, using the [Free Tier](https://docs.render.com/free) and as such, is limited to the constraints of that free tier, such as spinning down on idle (no requests after 15 minutes) and 750 instance hours per month.

CI:

-   [GitHub Actions](https://github.com/features/actions)

Dev Tools:

-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [WakaTime](https://wakatime.com/)
-   [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
-   [Postman](https://www.postman.com/)
