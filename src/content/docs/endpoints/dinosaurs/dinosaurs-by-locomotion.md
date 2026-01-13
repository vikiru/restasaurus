---
title: Dinosaurs by Locomotion
description: Search for dinosaurs by their locomotion type using the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/dinosaurs/locomotion/{locomotion}`
```

Returns all dinosaurs matching a specific locomotion type.

## Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `locomotion` | string | Yes | The locomotion type of dinosaurs to retrieve | `"biped"` |

**Valid Values**: `biped`, `facultative biped`, `gliding`, `quadruped`, `swimming`

## Response Structure

```json
{
  "count": 450,
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

![Demo](/restasaurus/endpoints/dinosaursByLocomotion.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-dinosaurs-by-locomotion)
