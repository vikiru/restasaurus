---
slug: /
id: intro
title: 📖 Introduction
---

<p align="center" id="logo">
    <img src="logo.png"/>
</p>

<p align="center" id="badges">
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
</p>

---

## Overview

**RESTasaurus** is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on over 400 dinosaurs!

:::info

The information within the API is taken directly from Wikipedia via its API, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both. Furthermore, after the data is retrieved, it undergoes processing to be transformed into a custom JSON object, referred to as [MongooseData](./app/models/MongooseData).

> Please consider checking out the [models](./app/models/) directory to get an idea of the information being provided by the API. The schemas used within the MongoDB database can be seen below:
>
> -   [Dinosaur](./app/models/Dinosaur.js)
> -   [ClassificationInfo](./app/models/ClassificationInfo.js)
> -   [DinosaurImage](./app/models/DinosaurImage.js)
> -   [DinosaurSource](./app/models/DinosaurSource.js)

:::

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](./LICENSE) © 2024-present Visakan Kirubakaran.
