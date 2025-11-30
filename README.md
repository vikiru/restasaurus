<div align="center" id="logo">
    <img src="logo.png"/>
</div>

<div align="center" id="badges">
<a href="https://vikiru.github.io/restasaurus/">
	<img src="https://img.shields.io/badge/documentation-docs-orange" alt="Documentation"/>
</a>
<a href="https://restasaurus.onrender.com/api/v1">
    <img src="https://img.shields.io/badge/API-live%20site-blue" alt="RESTasaurus API hosted via Render"/>
</a>
 <a href="https://github.com/vikiru/restasaurus/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-aqua" alt="MIT License Badge"/>
 </a>
  <a href="https://biomejs.dev">
    <img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome">
  </a>
<br/>
  <a href="https://github.com/vikiru/restasaurus/releases">
  <img src="https://img.shields.io/github/v/release/vikiru/restasaurus" alt="Release"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/issues?q=is%3Aissue+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-closed/vikiru/restasaurus" alt="Closed Issues"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/pulls?q=is%3Apr+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-pr-closed/vikiru/restasaurus?label=closed%20prs" alt="Closed PRs"/>
 </a>
<br/>
 <a href="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml">
  <img src="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml/badge.svg" alt="GitHub Lint Action Workflow Status"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/actions/workflows/test.yml">
    <img src="https://github.com/vikiru/restasaurus/actions/workflows/test.yml/badge.svg"/>
 </a>
</div>

---

**RESTasaurus** is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on almost 1200 dinosaurs!

[RESTasaurus Demo](https://github.com/vikiru/restasaurus/assets/72267229/0a3679f8-90e9-4106-b030-a4d0751390f0)

> [!IMPORTANT]
>
> The data within the API is taken directly from **Wikipedia** via its API, as is. Please note that the information may have been modified since the last retrieval. All images and text belong to their respective authors, and attribution is provided accordingly for both.
> 
> All dinosaur text information sourced from Wikipedia articles are licensed under [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/), unless otherwise noted.
> 
> All dinosaur images are sourced from Wikimedia Commons and are licensed under various Creative Commons licenses, with attribution provided accordingly for each image.
>
> By using this API, you agree to properly attribute the sources and comply with their respective licenses.
>
> Examples can be seen below in []

For a better understanding of the information provided by the API, please check out the [models](./app/models) directory. The schemas used within the MongoDB database include:

> - [**Dinosaur**](https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js): This is the main model which represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description. Additionally, it also contains references to the sub-models below, which are populated with their relevant values when handling API requests.
> - [**ClassificationInfo**](./app/models/ClassificationInfo.js): This model contains the classification information of a dinosaur, including details like its family, order, and genus.
> - [**DinosaurImage**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js): This model is used to store the image data related to a dinosaur, including the image source and attribution details.
> - [**DinosaurSource**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js): This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more.

Additionally, if you would like to see an example of a response from the API, please see the [Model Overview](https://vikiru.github.io/restasaurus/models/) page to see the model structure present within the API.

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📋 Attribution Examples](#-attribution-examples)
    - [Example Wikipedia Article Attribution](#example-wikipedia-article-attribution)
    - [Example Image Attribution](#example-image-attribution)
- [📍 API Endpoints](#-api-endpoints)
    - [📄 General Endpoints](#-general-endpoints)
    - [🦖 Dinosaur Endpoints](#-dinosaur-endpoints)
    - [📷 Image Endpoints](#-image-endpoints)
    - [OpenAPI Specification](#openapi-specification)
- [🛠️ Tech Stack](#️-tech-stack)
- [📝 Prerequisites](#-prerequisites)
- [⚡ Setup Instructions](#-setup-instructions)
    - [Environment Setup](#environment-setup)
    - [Retrieving data from Wikipedia via its API](#retrieving-data-from-wikipedia-via-its-api)
    - [Saving the processed data to the MongoDB database](#saving-the-processed-data-to-the-mongodb-database)
- [🚀 Run](#-run)
- [🔍 Testing](#-testing)
- [📜 Available Scripts](#-available-scripts)
- [✨ Acknowledgments](#-acknowledgments)
- [©️ License](#️-license)

## 📋 Attribution Examples

When using data from the RESTasaurus API, please ensure that the following four elements are included in your attribution (where possible):

1. **Title**: Include the title of the Wikipedia article or image
2. **Author**: Include the author information for the Wikipedia article or image. For Wikipedia articles, this would be "Wikipedia contributors" and for images, include the author name(s) and author URL, if available.
3. **Source**: Include the source URL where the data was retrieved from (e.g., the Wikipedia page URL or image source URL)
4. **License**: Include a link to the license under which the data is distributed (e.g., Creative Commons, GNU Free Documentation License, etc.)

The above attribution elements should be included in a clear and prominent manner when using data from the RESTasaurus API. 

The API provides all the information needed for proper attribution in its responses. Please see [DinosaurSource](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js) and [DinosaurImage](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js) to understand the structure of the attribution data.

### Example Wikipedia Article Attribution

Given the following dinosaur source object from the API response, you should include all four required elements (title, author, source, license) when using data from the RESTasaurus API. The API response will contain all this information in the `source` object within each dinosaur, making it easy to construct proper attribution.

```json
"source": {
    "pageTitle": "Zephyrosaurus",
    "author": "Wikipedia contributors",
    "wikipediaURL": "https://en.wikipedia.org/wiki/Zephyrosaurus",
    "license": "Creative Commons Attribution-Share Alike 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    "permalink": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&oldid=1187326953",
    "revisionHistoryURL": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&action=history",
    "lastRevision": "2023-11-28T15:28:47Z",
    "dateAccessed": "2024-01-30T14:27:20.682Z",
    "source": "Wikipedia, The Free Encyclopedia",
    "publisher": "Wikimedia Foundation",
    "citation": "Wikipedia contributors. \"Zephyrosaurus.\" Wikipedia, The Free Encyclopedia. Wikimedia Foundation, 28 Nov 2023. Web. 30 Jan 2024."
}
```

For example, you should display the following information:

- **Title**: Zephyrosaurus
- **Author**: Wikipedia contributors
- **Source**: https://en.wikipedia.org/wiki/Zephyrosaurus
- **License**: Creative Commons Attribution-Share Alike 4.0 (https://creativecommons.org/licenses/by-sa/4.0/deed.en)

### Example Image Attribution

Given the following image attribution structure from the API response, you should include all relevant elements (title, author, source, license) when using images from the RESTasaurus API. The API response will contain all this information in the `image` object, making it easy to construct proper attribution.

```json
"image": {
    "title": "Zephyrosaurus in Copenhagen",
    "description": "Zephyrosaurus skeleton, Natural History Museum of Denmark, Copenhagen.",
    "author": "FunkMonk",
    "authorURL": "https://commons.wikimedia.org/wiki/User:FunkMonk",
    "imageURL": "https://commons.wikimedia.org/wiki/File:Zephyrosaurus_in_Copenhagen.jpg",
    "license": "Creative Commons Attribution-Share Alike 3.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0",
    "dateCreated": "2021-10-01T07:58:48.000Z",
    "dateAccessed": "2024-01-30T14:27:20.683Z"
}
```

For example, you should display the following information:

- **Title**: Zephyrosaurus in Copenhagen
- **Author**: FunkMonk (https://commons.wikimedia.org/wiki/User:FunkMonk)
- **Source**: https://commons.wikimedia.org/wiki/File:Zephyrosaurus_in_Copenhagen.jpg
- **License**: Creative Commons Attribution-Share Alike 3.0 (https://creativecommons.org/licenses/by-sa/3.0)

For more information regarding attribution best practices and compliance, please refer to the following resources:
- [Reusing Wikipedia Content Guidelines](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content)
- [Recommended Practices for Attribution on Wikipedia](https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution)

## 📍 API Endpoints

> [!NOTE]
> The API is currently configured to only support GET requests and responses from the API are only in `json` format.
> The current rate limit is set to `20 requests per hour`.

A comprehensive overview detailing all available endpoints can be located within the documentation under the [Endpoint Overview](https://vikiru.github.io/restasaurus/overview/) section. Each endpoint has a dedicated page detailing its url along with a general description, parameters (if any) and finally, a demonstration of the endpoint via Postman is also provided for clarity.

### 📄 General Endpoints

- [**Get main API endpoint**](https://vikiru.github.io/restasaurus/endpoints/home/): Returns the home endpoint of the API.
- [**Get all dinosaur clades**](https://vikiru.github.io/restasaurus/endpoints/clades/): Returns all dinosaur clades that exist within the API.
- [**Get all dinosaur diets**](https://vikiru.github.io/restasaurus/endpoints/diets/): Returns all dinosaur diets that exist within the API.
- [**Get all dinosaur locomotions**](https://vikiru.github.io/restasaurus/endpoints/locomotions/): Returns all dinosaur locomotions that exist within the API.
- [**Get all dinosaur names**](https://vikiru.github.io/restasaurus/endpoints/names/): Returns all dinosaur names that exist within the API.

### 🦖 Dinosaur Endpoints

- [**Get all dinosaurs**](https://vikiru.github.io/restasaurus/endpoints/allDinosaurs/): Returns all dinosaurs within the API, 50 dinosaurs per page.
- [**Get a dinosaur by ID**](https://vikiru.github.io/restasaurus/endpoints/dinosaursByID/): Returns a dinosaur matching a specific id, returns an error if not found.
- [**Get a dinosaur by name**](https://vikiru.github.io/restasaurus/endpoints/dinosaursByName/): Returns a dinosaur matching a specific name, returns an error if not found.
- [**Get dinosaurs by diet**](https://vikiru.github.io/restasaurus/endpoints/dinosaursByDiet/): Returns all dinosaurs matching a specific diet.
- [**Get dinosaurs by locomotion**](https://vikiru.github.io/restasaurus/endpoints/dinosaursByLocomotion/): Returns all dinosaurs matching a specific locomotion type.
- [**Get random dinosaurs**](https://vikiru.github.io/restasaurus/endpoints/randomDinosaurs/): Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.
- [**Get dinosaurs by query**](https://vikiru.github.io/restasaurus/endpoints/dinosaursByQuery/): Returns all dinosaurs matching a specific query.

### 📷 Image Endpoints

- [**Get all dinosaur images**](https://vikiru.github.io/restasaurus/endpoints/allImages/): Returns all dinosaur images within the API, 50 dinosaurs per page.
- [**Get a image by ID**](https://vikiru.github.io/restasaurus/endpoints/imagesByID/): Returns a dinosaur image matching a specific id, returns an error if not found.
- [**Get random number of dinosaur images**](https://vikiru.github.io/restasaurus/endpoints/randomImages/): Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.

### OpenAPI Specification

To view more details about all endpoints such as the expected responses and status codes, please take a look at the
[OpenAPI Specification](https://vikiru.github.io/restasaurus/api/).

## 🛠️ Tech Stack

Backend:

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
    - Logging via [Winston](https://github.com/winstonjs/winston), along with various other middlewares as seen [here](./app/middlewares/index.js)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

Testing:

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Proxyquire](https://github.com/thlorenz/proxyquire)
- [Istanbul (nyc)](https://github.com/istanbuljs/nyc)
- [istanbul-badges-readme](https://github.com/the-bugging/istanbul-badges-readme)

Documentation:

- Docs are built using [Docusaurus](https://docusaurus.io/)
    - OpenAPI Specification converted to `.md` using: [Redocusaurus](https://github.com/rohit-gohri/redocusaurus)
    - Search functionality provided by: [docusaurus-lunr-search](https://github.com/praveenn77/docusaurus-lunr-search)
    - Analytics using [Google Analytics](https://marketingplatform.google.com/about/analytics/)
- Documentation site hosted via [GitHub Pages](https://pages.github.com/)

REST API

- [Render](https://render.com/) - the API can be accessed via the endpoint [here](https://restasaurus.onrender.com/api/v1)

Please note that the API is hosted on Render, using the [Free Tier](https://docs.render.com/free) and as such, is limited to the constraints of that free tier, such as spinning down on idle (no requests after 15 minutes) and 750 instance hours per month.

CI:

- [GitHub Actions](https://github.com/features/actions)

Dev Tools:

- [Biome](https://biomejs.dev/)
- [WakaTime](https://wakatime.com/)
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
- [Postman](https://www.postman.com/)

## 📝 Prerequisites

Ensure that the following dependencies are installed onto your machine by following the [Setup Instructions](#-setup-instructions).

- [Node.js](https://nodejs.org/en/download)
- [Express](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## ⚡ Setup Instructions

### Environment Setup

1. Clone this repository to your local machine.

```bash
git clone https://github.com/vikiru/restasaurus.git
cd restasaurus
```

2. Download and install all required dependencies.

```bash
pnpm install
```

3. Setup your `.env` file with the required information.

```text
PORT=YOUR-PORT-HERE
MONGODB_URI='YOUR-MONGODB-URI-HERE'
NODE_ENV='development'
```

### Retrieving data from Wikipedia via its API

Run the `retrieveData` script to retrieve all dinosaur information.

```bash
pnpm retrieveData
```

This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by [MongooseData](./app/models/MongooseData.js).

Please check the `app/logs` directory in the event of any errors. Specifically,
you can check the `errors.log` or `all.log` to view the errors or all levels of
logging, respectively.

Additionally, confirm that `app/scripts` contains the following JSON files:

- `allDinoNames.json`: contains all dinosaur names.
- `filteredNames.json`: contains the names of the dinosaurs that passed the filtering process.
- `htmlData.json`: contains the raw HTML for each Wikipedia article as a String.
- `imageData.json`: contains the image data for each Dinosaur.
- `pageData.json`: contains the page data for each Wikipedia article.
- `dinosaurData.json`: contains the processed data of all dinosaurs.

### Saving the processed data to the MongoDB database

Run the `postData` script to save all dinosaurs to your MongoDB database, once retrieveData was successful.

```bash
pnpm postData
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
pnpm dev
```

2. Start the API in `production` env, without nodemon.

```bash
pnpm start
```

## 🔍 Testing

| Statements                                                                               | Branches                                                                             | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

The comprehensive suite of tests for this project is housed within the [test](./test/) directory. These tests are primarily designed to verify the functionality and reliability of the API and additionally, the scripts used to retrieve the information.

The tests can be run with the following command:

```bash
pnpm test
```

## 📜 Available Scripts

1. Start the API in `production` env, without nodemon.

```bash
pnpm start
```

2. Start the API in `development` env, with nodemon.

```bash
pnpm dev
```

3. Run all tests.

```bash
pnpm test
```

4. Lint all files and check if there are any issues, with [Biome](https://biomejs.dev/).

```bash
pnpm lint
```

5. Format all files with [Biome](https://biomejs.dev/).

```bash
pnpm format
```

6. Retrieve all information needed for the API via Wikipedia directly from its API.

```bash
pnpm retrieveData
```

7. Save all dinosaur information to your MongoDB database.

```
pnpm postData
```

8. Create test coverage shields badges for README using [istanbul-badges-readme](https://github.com/the-bugging/istanbul-badges-readme).

```bash
pnpm make-badges
```

## ✨ Acknowledgments

- [Docusaurus](https://docusaurus.io/)
- [Redocusaurus](https://github.com/rohit-gohri/redocusaurus)
- [GitHub Pages](https://pages.github.com/)
- [Swagger Editor](https://swagger.io/tools/swagger-editor/)
- [Swagger Documentation](https://swagger.io/specification/)
- [Chai Documentation](https://www.chaijs.com/)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [Mocha Documentation](https://mochajs.org/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Sinon Documentation](https://sinonjs.org/releases/latest/)
- [Shields Badges](https://github.com/badges/shields)
- [regex101](https://regex101.com/)
- [Favicon Generator](https://favicon.io/favicon-generator/)
- [node-html-parser](https://github.com/taoqf/node-html-parser)

Additionally, this API would not be possible without the dinosaur information and image information retrieved from all of the [Wikipedia](https://en.wikipedia.org/wiki/Main_Page) articles accessed through the [Wikipedia API](https://www.mediawiki.org/wiki/Special:MyLanguage/API:Main_page). All images and text provided by this API belong to their respective authors.

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](./LICENSE) © 2024-present Visakan Kirubakaran.
