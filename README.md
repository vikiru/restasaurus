<p align="center">
    <img src="./logo.png"/>
</p>

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

| API Endpoint         | URL                           | Parameters                    | Description                                                                |
| -------------------- | ----------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| home                 | /api/v1                       | `none`                        | Returns the home endpoint of the API                                       |
| getAllNames          | /api/v1/names                 | `none`                        | Returns all dinosaur names that exist within the API                       |
| getAllDinos          | /api/v1/dinosaurs             | `page`                        | Returns all dinosaurs within the API, 20 dinosaurs per page.               |
| getDinoById          | /api/v1/dinosaurs/            | `id`                          | Returns a dinosaur matching a specific id, returns an error if not found.  |
| getDinoByName        | /api/v1/dinosaurs/name/       | `name`                        | Returns a dinosaur matching a specific name, returns an error if not found |
| getDinosByDiet       | /api/v1/dinosaurs/diet/       | `diet`                        | Returns all dinosaurs matching a specific diet                             |
| getDinosByLocomotion | /api/v1/dinosaurs/locomotion/ | `locomotion`                  | Returns all dinosaurs matching a specific locomotion type                  |
| getRandomDinos       | /api/v1/dinosaurs/random/     | `count`                       | Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.      |
| getDinosaurByQuery   | /api/v1/search                | `clade`, `diet`, `locomotion` | Returns all dinosaurs matching a specific query                            |
| getAllImages         | /api/v1/images                | `page`                        | Returns all dinosaur images within the API, 20 images per page.            |
| getImageById         | /api/v1/images/               | `id`                          | Returns an image matching a specific id, returns an error if not found     |
| getRandomImages      | /api/v1/images/random/        | `count`                       | Returns a random number of images. Minmum of 1 and a maximum of 10         |

> [!NOTE]
> The API is currently configured to support only GET requests.

## 🛠️ Tech Stack

Backend:

-   [Node.js](https://nodejs.org/en)
-   [Express](https://expressjs.com/)
    -   various middlewares as seen [here](./app/middlewares/index.js)
-   [Winston](https://github.com/winstonjs/winston)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)

CI:

-   [GitHub Actions](https://github.com/features/actions)

Dev Tools:

-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [WakaTime](https://wakatime.com/)
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
NODE_ENV='development'
```

4. Run the `retrieveData` script to retrieve all dinosaur information.

```bash
npm run retrieveData
```

This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by [MongooseData](./app/models/MongooseData.js).

Please check your `app/logs` directory in the event of any errors.

Additionally, confirm that `app/scripts/` contains the following JSON files:

-   `allDinoNames.json`: contains all dinosaur names (should be around 1427 names).
-   `filteredNames.json`: contains the names of the dinosaurs that passed the filtering process (should be around 1153 names).
-   `htmlData.json`: contains the raw HTML for each Wikipedia article as a String.
-   `imageData.json`: contains the image data for each Dinosaur.
-   `pageData.json`: contains the page data for each Wikipedia article.
-   `dinosaurData.json`: contains the processed data of all dinosaurs.

5. Run the `postData` script to save all dinosaurs to your MongoDB database, once retrieveData was successful.

```bash
npm run postData
```

Please check your MongoDB database collections and ensure that the dinosaurs were saved successfully.

There should be 5 collections:

1. `classificationinfos`: This collection contains all of the ClassificationInfo documents.
2. `counters`: This collection is auto-created and allows for auto-indexing of documents.
3. `dinosaurimages`: This collection contains all of the DinosaurImage documents.
4. `dinosaurs`: This is the main collection which contains all of the Dinosaur documents.
5. `dinosaursources`: This collection contains all of the DinosaurSource documents.

After completing these steps, the API should be ready for launch, with all endpoints fully operational. 🎉

## 🚀 Run

The API can be started via one of the following commands:

1. Start the API in `development` env, with nodemon.

```bash
npm run dev
```

2. Start the API in `production` env, without nodemon.

```bash
npm start
```

## 🔍 Testing

| Statements                                                                                 | Branches                                                                               | Functions                                                                              | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

The comprehensive suite of tests for this project is housed within the [test](./test/) directory. These tests are primarily designed to verify the functionality and reliability of the API and additionally, the scripts used to retrieve the information.

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

1. Fix all ESLint issues then format the files with [Prettier](https://prettier.io/).

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
-   [Favicon Generator](https://favicon.io/favicon-generator/)

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](./LICENSE) © 2024-present Visakan Kirubakaran.
