---
title: All Images
slug: all-images
description: Retrieve all dinosaur images from the API with pagination support.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/images?page={page}`
```

Returns all dinosaur images within the API, 50 dinosaur images per page.

## Parameters

| Parameter | Type | Required | Default | Description | Example |
|-----------|------|----------|---------|-------------|---------|
| `page` | integer | No | 1 | Page number to retrieve (50 items per page) | `2` |

## Response Structure

```json
{
  "prevPage": "/api/v1/images?page=1",
  "currentPage": 2,
  "nextPage": "/api/v1/images?page=3",
  "count": 50,
  "data": [...]
}
```

## Demo

![Demo](/restasaurus/endpoints/allImages.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-all-images)
