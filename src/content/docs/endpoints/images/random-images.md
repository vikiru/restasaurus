---
title: Random Images
slug: random-images
description: Retrieve random dinosaur images from the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/images/random/{count}`
```

Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.

## Parameters

| Parameter | Type | Required | Min | Max | Description | Example |
|-----------|------|----------|-----|-----|-------------|---------|
| `count` | integer | Yes | 1 | 10 | Number of random images to retrieve | `5` |

## Response Structure

```json
{
  "count": 5,
  "data": [
    {
      "title": "Zephyrosaurus in Copenhagen",
      "description": "Zephyrosaurus skeleton, Natural History Museum of Denmark, Copenhagen.",
      "author": "FunkMonk",
      "authorURL": "https://commons.wikimedia.org/wiki/User:FunkMonk",
      "imageURL": "https://commons.wikimedia.org/wiki/File:Zephyrosaurus_in_Copenhagen.jpg",
      "license": "Creative Commons Attribution-Share Alike 3.0",
      "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0",
      "dateCreated": "2021-10-01T07:58:48.000Z",
      "dateAccessed": "2024-01-30T14:27:20.683Z"
    }
  ]
}
```

## Demo

![Demo](/restasaurus/endpoints/randomImages.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-random-images)
