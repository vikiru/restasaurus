---
title: All Dinosaurs
slug: all-dinosaurs
description: Retrieve all dinosaurs from the API with pagination support, returning 50 dinosaurs per page.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/dinosaurs?page={page}`
```

Returns all dinosaurs within the API, 50 dinosaurs per page.

## Parameters

| Parameter | Type | Required | Default | Description | Example |
|-----------|------|----------|---------|-------------|---------|
| `page` | integer | No | 1 | Page number to retrieve (50 items per page) | `2` |

## Response Structure

```json
{
  "prevPage": "/api/v1/dinosaurs?page=1",
  "currentPage": 2,
  "nextPage": "/api/v1/dinosaurs?page=3",
  "count": 50,
  "data": [...]
}
```

## Demo

![Demo](/restasaurus/endpoints/allDinosaurs.gif)


## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-all-dinosaurs)
