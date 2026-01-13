---
title: Dinosaurs by Diet
description: Search for dinosaurs by their diet type using the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/dinosaurs/diet/{diet}`
```

Returns all dinosaurs matching a specific diet.

## Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `diet` | string | Yes | The diet type of dinosaurs to retrieve | `"herbivore"` |

**Valid Values**: `carnivore`, `herbivore`, `omnivore`, `piscivore`

## Response Structure

```json
{
  "count": 650,
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

![Demo](/restasaurus/endpoints/dinosaursByDiet.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-dinosaurs-by-diet)
