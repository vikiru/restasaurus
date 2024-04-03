---
title: 🧩 Model Overview
slug: /models
---

## 📖 Table of Contents

-   [📖 Table of Contents](#-table-of-contents)
-   [🦖 Dinosaur Model](#-dinosaur-model)
-   [🔍 ClassificationInfo Model](#-classificationinfo-model)
-   [📸 DinosaurImage Model](#-dinosaurimage-model)
-   [📚 DinosaurSource Model](#-dinosaursource-model)

## 🦖 Dinosaur Model

[**Dinosaur**](https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js): This is the main model which represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description. Additionally, it also contains references to the sub-models below, which are populated with their relevant values when handling API requests.

An example of a Dinosaur model stored within the MongoDB database is shown below, with all of its relevant properties. It should
be noted that although `classificationInfo`, `image`, `source` show their value as being an `ObjectId`, when the API processes
requests, these fields are populated with the relevant sub-documents which can be seen further down below.

```json
{
    "id": 1118,
    "name": "Zephyrosaurus",
    "temporalRange": "Early Cretaceous, ~113 Ma",
    "diet": "herbivore",
    "locomotionType": "biped",
    "description": "Zephyrosaurus (meaning \"westward wind lizard\") is a genus of orodromine ornithischian dinosaur. It is based on a partial skull and postcranial fragments discovered in the Aptian-Albian-age Lower Cretaceous Cloverly Formation of Carbon County, Montana, USA.  New remains are under description, and tracks from Maryland and Virginia, also in the US, have been attributed to animals similar to Zephyrosaurus. It lived approximately 113 mya.",
    "classificationInfo": ObjectId("some-id-here"),
    "image": ObjectId("some-id-here"),
    "source": ObjectId("some-id-here"),
}
```

## 🔍 ClassificationInfo Model

[ClassificationInfo](https://github.com/vikiru/restasaurus/blob/main/app/models/ClassificationInfo.js/): This model contains the classification information of a dinosaur, including details like its family, order, and genus.

An example of a ClassificationInfo model is shown below.

```json
"classificationInfo": {
    "domain": "Eukaryota",
    "kingdom": "Animalia",
    "phylum": "Chordata",
    "clade": [
        "Dinosauria",
        "Ornithischia"
    ],
    "classInfo": [],
    "orderInfo": [],
    "familyInfo": [
    {
        "familyType": "Family",
        "value": "Thescelosauridae"
    },
    {
        "familyType": "Subfamily",
        "value": "Orodrominae"
    }
    ],
    "tribeInfo": [],
    "genusInfo": [
    {
        "genusType": "Genus",
        "value": "Zephyrosaurus"
    }
    ],
    "speciesInfo": []
}
```

## 📸 DinosaurImage Model

[**DinosaurImage**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js): This model is used to store the image data related to a dinosaur, including the image source and attribution details.

An example of a DinosaurImage model is shown below.

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
},
```

## 📚 DinosaurSource Model

[**DinosaurSource**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js): This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more.

An example of a DinosaurSource model is shown below.

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
