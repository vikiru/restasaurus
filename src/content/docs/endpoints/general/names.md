---
title: Names
description: Retrieve all dinosaur names from the RESTasaurus API.
---

## API Endpoint and Description

```
GET {baseUrl}/api/v1/names`
```

Returns all dinosaur names that exist within the API.

## Parameters

No parameters are required for this endpoint.

## Response Structure

```json
{
  "count": 1188,
  "data": [
    "Zephyrosaurus",
    "Tyrannosaurus", 
    "Velociraptor",
    "Stegosaurus"
  ]
}
```

## Demo

![Demo](/restasaurus/endpoints/names.gif)

## Related

- [OpenAPI Specification for Route](/restasaurus/api/operations/get-all-names)
