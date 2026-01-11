---
title: Random Dinosaurs
description: Retrieve random dinosaurs from the RESTasaurus API.
---

## API Endpoints and Description

`GET {baseUrl}/api/v1/dinosaurs/random/{count}`

Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.

## Parameters

-   `count`: The number of random dinosaurs you wish to retrieve. Must be a valid integer between `1` and including `10`.

## Response Structure

```json
{
  "count": 5,
  "data": [
    {
      "id": 1118,
      "name": "Zephyrosaurus",
      "temporalRange": "Early Cretaceous, ~113 Ma",
      "diet": "herbivore",
      "locomotionType": "biped",
      "description": "...",
      "classificationInfo": {...},
      "image": {...},
      "source": {...}
    }
  ]
}
```

## Demo

![Demo](../../../../public/endpoints/randomDinosaurs.gif)

## Related

- [OpenAPI Specification for Route](/api/restasaurus#tag/dinosaur-information/get-/dinosaurs/random/{count})
