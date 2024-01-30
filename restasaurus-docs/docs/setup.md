---
id: setup
title: ⚡ Setup
---

## ⚡ Setup Instructions

### Environment Setup

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

### Data Retrieval and Database Setup

1. Run the `retrieveData` script to retrieve all dinosaur information.

```bash
npm run retrieveData
```

This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by [MongooseData](./app/models/MongooseData.js).

Please check the `app/logs` directory in the event of any errors. Specifically,
you can check the `errors.log` or `all.log` to view the errors or all levels of
logging, respectively.

Additionally, confirm that `app/scripts/` contains the following JSON files:

-   `allDinoNames.json`: contains all dinosaur names (should be around 1427 names).
-   `filteredNames.json`: contains the names of the dinosaurs that passed the filtering process (should be around 1153 names).
-   `htmlData.json`: contains the raw HTML for each Wikipedia article as a String.
-   `imageData.json`: contains the image data for each Dinosaur.
-   `pageData.json`: contains the page data for each Wikipedia article.
-   `dinosaurData.json`: contains the processed data of all dinosaurs.

2. Run the `postData` script to save all dinosaurs to your MongoDB database, once retrieveData was successful.

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
