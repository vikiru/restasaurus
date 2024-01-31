---
slug: /
id: intro
title: 📖 Introduction
---

<div align="center" id="logo">
    <img src="logo.png"/>
</div>

<div align="center" id="badges">
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
 <a href="https://github.com/vikiru/restasaurus/issues?q=is%3Aissue+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-closed/vikiru/restasaurus" alt="Closed Issues"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/pulls?q=is%3Apr+is%3Aclosed">
  <img src="https://img.shields.io/github/issues-pr-closed/vikiru/restasaurus?label=closed%20prs" alt="Closed PRs"/>
 </a>
  <a href="https://github.com/vikiru/restasaurus/releases">
  <img src="https://img.shields.io/github/v/release/vikiru/restasaurus" alt="Release"/>
 </a>
 <a href="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml">
  <img src="https://github.com/vikiru/restasaurus/actions/workflows/lint.yml/badge.svg" alt="GitHub Lint Action Workflow Status"/>
 </a>
</div>

---

## Overview

**RESTasaurus** is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on almost 1200 dinosaurs!

:::info

The data within the API is taken directly from **Wikipedia** via its API, as is. Please note that the information may have been modified since the last retrieval. All images and text belong to their respective authors, and attribution is provided accordingly for both. After retrieval, the data undergoes processing to be transformed into a custom JSON object, referred to as [MongooseData](https://github.com/vikiru/restasaurus/blob/main/app/models/MongooseData.js).

:::

For a better understanding of the information provided by the API, please check out the [models](https://github.com/vikiru/restasaurus/tree/main/app/models) directory. The schemas used within the MongoDB database include:

-   [**Dinosaur**](https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js): This model represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description.
-   [**ClassificationInfo**](./app/models/ClassificationInfo.js): This model contains the classification information of a dinosaur, including details like its family, order, and genus.
-   [**DinosaurImage**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js): This model is used to store the image data related to a dinosaur, including the image source and attribution details.
-   [**DinosaurSource**](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js): This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more.

Additionally, if you would like to see an example of a response from the API, please see the [Model Overview](/models) page to see the model structure present within the API.

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](https://github.com/vikiru/restasaurus/blob/main/LICENSE) © 2024-present Visakan Kirubakaran.
