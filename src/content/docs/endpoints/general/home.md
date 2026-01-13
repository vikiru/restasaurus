---
title: Home
slug: api-home
description: API home endpoint that returns basic information about RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1`
```

Returns the home endpoint of the API.

## Parameters

No parameters are required for this endpoint.

## Response Structure

```json
{
  "apiVersion": "v1",
  "apiEndpoints": [
    "/dinosaurs",
    "/images", 
    "/clades",
    "/diets",
    "/locomotions",
    "/names"
  ],
  "rateLimit": {
    "requests": 20,
    "window": "1 hour"
  },
  "disclaimer": "This API is for educational purposes only."
}
```

## Demo

![Demo](/restasaurus/endpoints/home.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-api-info)
