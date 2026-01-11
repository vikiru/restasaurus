---
title: Dinosaurs by ID
description: Search for dinosaurs by their unique ID using the RESTasaurus API.
---

## API Endpoints and Description

`GET {baseUrl}/api/v1/dinosaurs/{id}`

Returns a dinosaur matching a specific id, returns an error if not found.

## Parameters

-   `id`: The id corresponding to the dinosaur you wish to retrieve. Must be a string between `1` and `1188`.

## Response Structure

```json
{
  "id": 1118,
  "name": "Zephyrosaurus",
  "temporalRange": "Early Cretaceous, ~113 Ma",
  "diet": "herbivore",
  "locomotionType": "biped",
  "description": "Zephyrosaurus (meaning \"westward wind lizard\")...",
  "classificationInfo": {...},
  "image": {...},
  "source": {...}
}
```

## Demo

![Demo](../../../../public/endpoints/dinosaursByID.gif)

## Related

- [OpenAPI Specification for Route](/api/restasaurus#tag/dinosaur-information/get-/dinosaurs/{id})
