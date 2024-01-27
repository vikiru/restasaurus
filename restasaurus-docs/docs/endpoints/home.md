---
slug: /endpoints/home
title: Home
---

## Overview

Returns the home endpoint of the API.

## Parameters

There are no parameters required for this endpoint.

## Sample Response

```json
{
    "apiVersion": "v1",
    "apiEndpoints": {
        "home": "/api/v1",
        "getAllNames": "/api/v1/names",
        "getAllDinos": "/api/v1/dinosaurs",
        "getDinoById": "/api/v1/dinosaurs/:id",
        "getDinoByName": "/api/v1/dinosaurs/name/:name",
        "getDinosByDiet": "/api/v1/dinosaurs/diet/:diet",
        "getDinosByLocomotion": "/api/v1/dinosaurs/locomotion/:locomotion",
        "getRandomDinos": "/api/v1/dinosaurs/random/:count",
        "getAllImages": "/api/v1/images",
        "getImageById": "/api/v1/images/:id",
        "getRandomImages": "/api/v1/images/random/:count",
        "getDinosaurByQuery": "/api/v1/search"
    },
    "rateLimit": "20 requests per hour",
    "disclaimer": "The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both."
}
```
