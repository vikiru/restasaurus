<h1 align="center"> 🦖 RESTasaurus </h1>

<p align="center">
 <a href="https://github.com/vikiru/restasaurus/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-aqua" alt="MIT License Badge"/>
 </a>
 <a href="https://github.com/prettier/prettier">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Code Style - Prettier"/>
 </a>
 <a href="https://wakatime.com/@vikiru/projects/oducsokuft">
  <img src="https://wakatime.com/badge/github/vikiru/restasaurus.svg"
  alt="Wakatime Coding Stats for RESTasaurus"/>
 </a>
 <br>
 <a href="https://github.com/vikiru/restasaurus/releases">
  <img src="https://img.shields.io/github/v/release/vikiru/restasaurus" alt="Release"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/issues?q=is%3Aissue+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-closed/vikiru/restasaurus" alt="Closed Issues"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/pulls?q=is%3Apr+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-pr-closed/vikiru/restasaurus?label=closed%20prs" alt="Closed PRs">
 </a>
 <br>
 <a href="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml">
  <img src="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml/badge.svg" alt="GitHub Lint Action Workflow Status"/>
 </a>
</p>

---

**RESTasaurus** is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on over 400 dinosaurs!

> [!IMPORTANT]
> The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both.
>
> Please consider checking out the [models](./app/models/) directory to get an idea of the information being provided by the API. The models to take note of are:
>
> -   [Dinosaur](./app/models/Dinosaur.js)
> -   [ClassificationInfo](./app/models/ClassificationInfo.js)
> -   [DinosaurImage](./app/models/DinosaurImage.js)
> -   [DinosaurSource](./app/models/DinosaurSource.js)

## 📖 Table of Contents

-   [📖 Table of Contents](#-table-of-contents)
-   [📍 API Endpoints](#-api-endpoints)
-   [🛠️ Tech Stack](#️-tech-stack)
-   [📝 Prerequisites](#-prerequisites)
-   [⚡ Setup Instructions](#-setup-instructions)
-   [🚀 Run](#-run)
-   [🔍 Testing](#-testing)
-   [📜 Available Scripts](#-available-scripts)
-   [✨ Acknowledgements](#-acknowledgements)
-   [©️ License](#️-license)

## 📍 API Endpoints

| API Endpoint         | URL                           | Parameters                    |
| -------------------- | ----------------------------- | ----------------------------- |
| home                 | /api/v1                       | `none`                        |
| getAllNames          | /api/v1/names                 | `none`                        |
| getAllDinos          | /api/v1/dinosaurs             | `none`                        |
| getDinoById          | /api/v1/dinosaurs/            | `id`                          |
| getDinoByName        | /api/v1/dinosaurs/name/       | `name`                        |
| getDinosByDiet       | /api/v1/dinosaurs/diet/       | `diet`                        |
| getDinosByLocomotion | /api/v1/dinosaurs/locomotion/ | `locomotion`                  |
| getRandomDinos       | /api/v1/dinosaurs/random/     | `count`                       |
| getDinosaurByQuery   | /api/v1/search                | `clade`, `diet`, `locomotion` |
| getAllImages         | /api/v1/images                | `none`                        |
| getImageById         | /api/v1/images/               | `id`                          |
| getRandomImages      | /api/v1/images/random/        | `count`                       |

## 🛠️ Tech Stack

Backend:

-   [Node.js](https://nodejs.org/en)
-   [Express](https://expressjs.com/)
    -   various middlewares as seen [here](./app/middlewares/index.js)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)

CI:

-   [GitHub Actions](https://github.com/features/actions)

Dev Tools:

-   Linting: [ESLint](https://eslint.org/)
-   Formatting: [Prettier](https://prettier.io/)
-   Code Time Tracking: [WakaTime](https://wakatime.com/)
-   [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
-   [Postman](https://www.postman.com/)

Testing:

-   [Mocha](https://mochajs.org/)
-   [Chai](https://www.chaijs.com/)
-   [Sinon](https://sinonjs.org/)

## 📝 Prerequisites

Ensure that the following dependencies are installed onto your machine by following the [Setup Instructions](#-setup-instructions).

-   [Node.js](https://nodejs.org/en/download)
-   [Express](https://expressjs.com/en/starter/installing.html)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)

## ⚡ Setup Instructions

1. Clone this repository to your local machine.

```bash
git clone https://github.com/vikiru/restasaurus.git
cd restasaurus
```

2. Download and install all required dependencies.

```bash
npm install
```

3. Setup your `.env` file with the required information.

```text
PORT=YOUR-PORT-HERE
MONGODB_URI='YOUR-MONGODB-URI-HERE'
REDIS_URL='YOUR-REDIS-URL-HERE'
NODE_ENV='development'
```

4. Run the `retrieveData` script to retrieve all dinosaur information.

```bash
npm run retrieveData
```

This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by [MongooseData](./app/models/MongooseData.js).

Please check your `app/logs` directory in the event of any errors.

Additionally, confirm that `app/scripts/` contains the following JSON files:

-   `allDinoNames.json`: contains all dinosaur names
-   `filteredNames.json`: contains the names of the dinosaurs that passed the filtering process
-   `dinosaurData.json`: contains the processed data of all dinosaurs

5. Run the `postData` script to save all dinosaurs to your MongoDB database, once retrieveData was successful.

```bash
npm run postData
```

Please check your MongoDB database collections and ensure that the dinosaurs were saved successfully.

There should be 5 collections:

1. classificationinfos
2. counters
3. dinosaurimages
4. dinosaurs
5. dinosaursources

After completing these steps, the API should be ready for launch, with all endpoints fully operational. 🎉

## 🚀 Run

The API can be started via one of the following commands:

1. Start the API in development env, with nodemon.

```bash
npm run dev
```

2. Start the API in `production` env, without nodemon.

```bash
npm start
```

## 🔍 Testing

The comprehensive suite of tests for this project is housed within the test directory. These tests are primarily designed to verify the functionality and reliability of the API and additionally, the scripts used to retrieve the information.

The tests can be run with the following command:

```bash
npm test
```

## 📜 Available Scripts

1. Start the API in `production` env, without nodemon.

```bash
npm start
```

2. Start the API in `development` env, with nodemon.

```bash
npm run dev
```

3. Run all tests.

```bash
npm test
```

4. Lint all files and check if there are any issues, with [ESLint](https://eslint.org/).

```bash
npm run lint
```

5. Fix all ESLint issues then format the files according to Prettier config, with [Prettier](https://prettier.io/).

```bash
npm run prettier
```

6. Retrieve all information needed for the API via Wikipedia directly from its API.

```bash
npm run retrieveData
```

7. Save all dinosaur information to your MongoDB database.

```bash
npm run postData
```

## ✨ Acknowledgements

-   [Chai Documentation](https://www.chaijs.com/)
-   [Express Documentation](https://expressjs.com/en/4x/api.html)
-   [Mocha Documentation](https://mochajs.org/)
-   [MongoDB Documentation](https://www.mongodb.com/docs/)
-   [Mongoose Documentation](https://mongoosejs.com/docs/)
-   [Sinon Documentation](https://sinonjs.org/releases/latest/)
-   [Shields Badges](https://github.com/badges/shields)
-   [regex101](https://regex101.com/)

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](./LICENSE) © 2024-present Visakan Kirubakaran.
