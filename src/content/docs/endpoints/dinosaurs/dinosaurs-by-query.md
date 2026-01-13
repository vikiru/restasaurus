---
title: Dinosaurs by Query
slug: dinos-by-query
description: Search for dinosaurs using flexible query parameters with the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/search?clade={clade}&diet={diet}&locomotion={locomotion}`
```

Returns all dinosaurs matching a specific query.

## Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `clade` | array | No | The clades dinosaurs belong to (comma-separated or array) | `"Dinosauria,Ornithischia"` |
| `diet` | string | No | The diet type of dinosaurs to retrieve | `"herbivore"` |
| `locomotion` | string | No | The locomotion type of dinosaurs to retrieve | `"biped"` |

**Valid Values**:
- `diet`: `carnivore`, `herbivore`, `omnivore`, `piscivore`
- `locomotion`: `biped`, `facultative biped`, `gliding`, `quadruped`, `swimming`

## Response Structure

```json
{
  "count": 25,
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

![Demo](/restasaurus/endpoints/dinosaurByQuery.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/search-dinosaurs)
