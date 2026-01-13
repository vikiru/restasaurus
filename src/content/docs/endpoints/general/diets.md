---
title: Diets
slug: diets
description: Retrieve all dinosaur diet types from the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/diets`
```

Returns all dinosaur diets that exist within the API.

## Parameters

No parameters are required for this endpoint.

## Response Structure

```json
[
  {
    "diet": "carnivore",
    "count": 320
  },
  {
    "diet": "herbivore",
    "count": 650
  },
  {
    "diet": "omnivore", 
    "count": 150
  },
  {
    "diet": "piscivore",
    "count": 68
  }
]
```

## Demo

![Demo](/restasaurus/endpoints/diets.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-all-diets)
