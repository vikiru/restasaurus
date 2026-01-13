---
title: Image by ID
slug: image-by-id
description: Retrieve a specific dinosaur image by its unique ID using the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/images/{id}`
```

Returns a dinosaur image matching a specific id, returns an error if not found.

## Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `id` | string | Yes | The ID of the dinosaur image to retrieve (1-1188) | `"1118"` |

## Response Structure

```json
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
```

## Demo

![Demo](/restasaurus/endpoints/imagesByID.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-image-by-id)
