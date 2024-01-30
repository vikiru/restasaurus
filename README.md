<p align="center">
    <img src="./logo.png" alt="RESTasaurus Logo"/>
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

**RESTasaurus** is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on almost 1200 dinosaurs!

<p align="center">
    <img src="https://github.com/vikiru/restasaurus/blob/docs/restasaurus-docs/public/endpoints/demo.mp4" alt="RESTasaurus Demo"/>
</p>

> [!IMPORTANT]
>
> The data within the API is taken directly from **Wikipedia** via its API, as is. Please note that the information may have been modified since the last retrieval. All images and text belong to their respective authors, and attribution is provided accordingly for both. After retrieval, the data undergoes processing to be transformed into a custom JSON object, referred to as [MongooseData](https://github.com/vikiru/restasaurus/blob/main/app/models/MongooseData.js).

Please consider checking out the [models](https://github.com/vikiru/restasaurus/tree/main/app/models) directory to get an idea of the information being provided by the API. The schemas used within the MongoDB database can be seen below:

> -   [**Dinosaur**](https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js): This model represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description.
> -   [**ClassificationInfo**](./app/models/ClassificationInfo.js): This model contains the classification information of a dinosaur, including details like its family, order, and genus.
> -   [**DinosaurImage**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js): This model is used to store the image data related to a dinosaur, including the image source and attribution details.
> -   [**DinosaurSource**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js): This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more.

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

> [!NOTE]
> The API is currently configured to support only GET requests and responses from the API are only in `json` format.

<details>
<summary><h3>Get main API endpoint</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1`

Returns the home endpoint of the API.

**Parameters**

No parameters are required for this endpoint.

</details>

<details>
<summary><h3>Get all dinosaur names</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/names`

Returns all dinosaur names that exist within the API.

**Parameters**

No parameters are required for this endpoint.

</details>

<details>
<summary><h3>Get all dinosaur clades</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/clades`

Returns all dinosaur clades that exist within the API.

**Parameters**

No parameters are required for this endpoint.

</details>

<details>
<summary><h3>Get all dinosaur diets</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/diets`

Returns all dinosaur diets that exist within the API.

**Parameters**

No parameters are required for this endpoint.

</details>

<details>
<summary><h3>Get all dinosaur locomotions</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/locomotions`

Returns all dinosaur locomotions that exist within the API.

**Parameters**

No parameters are required for this endpoint.

</details>

<details>
<summary><h3>Get all dinosaurs</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs?page={page}`

Returns all dinosaurs within the API, 50 dinosaurs per page.

**Parameters**

-   `page`: The page number to retrieve, 50 dinosaurs are displayed per page.

</details>

<details>
<summary><h3>Get a dinosaur by id</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs/{id}`

Returns a dinosaur matching a specific id, returns an error if not found.

**Parameters**

-   `id`: The id corresponding to the dinosaur you wish to retrieve. Must be an integer between `1` and `1153`.

</details>

<details>
<summary><h3>Get a dinosaur by name</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs/{name}`

Returns a dinosaur matching a specific name, returns an error if not found.

**Parameters**

-   `name`: The name corresponding to the dinosaur you wish to retrieve.

</details>

<details>
<summary><h3>Get dinosaurs by diet</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs/{diet}`

Returns all dinosaurs matching a specific diet.

**Parameters**

-   `diet`: The diet of the dinosaurs you wish to retrieve.

Examples include: `herbivore`, `carnivore`, `omnivore`, `piscivore`, etc.

</details>

<details>
<summary><h3>Get dinosaurs by locomotion</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs/{locomotion}`

Returns all dinosaurs matching a specific locomotion type.

**Parameters**

-   `locomotion`: The locomotion of the dinosaurs you wish to retrieve.

Examples include: `biped`, `quadruped`, `facultative biped`, `gliding`, `swimming`, etc.

</details>

<details>
<summary><h3>Get random number of dinosaurs</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/dinosaurs/random/{count}`

Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.

**Parameters**

-   `count`: The number of random dinosaurs you wish to retrieve. Must be a valid
    integer between `1` and including `10`.

</details>

<details>
<summary><h3>Get dinosaurs by query</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/search?clade={clade}&diet={diet}&locomotion={locomotion}`

Returns all dinosaurs matching a specific query.

**Parameters**

-   `clade`: The group that the dinosaur belongs to within its classification. This can be passed in various ways:

    1. `GET {baseUrl}/api/v1/search?clade=clade1,clade2`
    2. `GET {baseUrl}/api/v1/search?clade=clade1&clade=clade2`

-   `diet`: The diet of the dinosaurs you wish to retrieve.

-   `locomotion`: The locomotion of the dinosaurs you wish to retrieve.

Example `clade` include: `Therapoda`, `Sauropodamorpha`, `Ornithischia`, `Thyreophora`, etc.

Example `diet` include: `herbivore`, `carnivore`, `omnivore`, `piscivore`, etc.

Example `locomotion` include: `biped`, `quadruped`, `facultative biped`, `gliding`, `swimming`, etc.

</details>

<details>
<summary><h3>Get all dinosaur images</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/images?page={page}`

Returns all dinosaur images within the API, 50 dinosaurs per page.

**Parameters**

-   `page`: The page number to retrieve, 50 dinosaur images are displayed per page.

</details>

<details>
<summary><h3>Get a dinosaur image by id</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/images/{id}`

Returns a dinosaur image matching a specific id, returns an error if not found.

**Parameters**

-   `id`: The id corresponding to the dinosaur image you wish to retrieve. Must be an integer between `1` and `1153`.

</details>

<details>
<summary><h3>Get random number of dinosaur images</h3></summary>

**API Endpoint and Description**

`GET {baseUrl}/api/v1/images/random/{count}`

Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.

**Parameters**

-   `count`: The number of random dinosaur images you wish to retrieve. Must be a valid integer between `1` and including `10`.

</details>

## 🛠️ Tech Stack

Backend:

-   [Node.js](https://nodejs.org/en)
-   [Express](https://expressjs.com/)
    -   various middlewares as seen [here](./app/middlewares/index.js)
-   [Winston](https://github.com/winstonjs/winston)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)

Testing:

-   [Mocha](https://mochajs.org/)
-   [Chai](https://www.chaijs.com/)
-   [Sinon](https://sinonjs.org/)
-   [Proxyquire](https://github.com/thlorenz/proxyquire)
-   [Istanbul (nyc)](https://github.com/istanbuljs/nyc)
-   [istanbul-badges-readme](https://github.com/the-bugging/istanbul-badges-readme)

Hosting:

1. Documentation:

    - [GitHub Pages](https://pages.github.com/)

2. REST API
    - [Adaptable](https://adaptable.io/)

CI:

-   [GitHub Actions](https://github.com/features/actions)

Dev Tools:

-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [WakaTime](https://wakatime.com/)
-   [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
-   [Postman](https://www.postman.com/)

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
PORT='YOUR-PORT-HERE'
MONGODB_URI='YOUR-MONGODB-URI-HERE'
NODE_ENV='development'
```

4. Run the `retrieveData` script to retrieve all dinosaur information.

```bash
npm run retrieveData
```

This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by [MongooseData](./app/models/MongooseData.js).

Please check the `app/logs` directory in the event of any errors. Specifically,
you can check the `errors.log` or `all.log` to view the errors or all levels of
logging, respectively.

Additionally, confirm that the `app/scripts` contains the following JSON files:

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

| Statements                                                                               | Branches                                                                             | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
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

5. Fix all ESLint issues then format the files with [Prettier](https://prettier.io/).

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

8. Create test coverage shields badges for README using [istanbul-badges-readme](https://github.com/the-bugging/istanbul-badges-readme)

```bash
npm run make-badges
```

## ✨ Acknowledgements

-   [Docusaurus](https://docusaurus.io/)
-   [Redocusaurus](https://github.com/rohit-gohri/redocusaurus)
-   [GitHub Pages](https://pages.github.com/)
-   [Wikipedia](https://en.wikipedia.org/wiki/Main_Page)
-   [Swagger Editor](https://swagger.io/tools/swagger-editor/)
-   [Swagger Documentation](https://swagger.io/specification/)
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
