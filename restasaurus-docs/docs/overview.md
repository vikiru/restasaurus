---
title: Endpoint Overview
---

## 📖 Table of Contents

:::note
The API is currently configured to support only GET requests and responses from the API are only in `json` format.

The current rate limit is set to `20 requests per hour`.
:::

-   [📖 Table of Contents](#-table-of-contents)
    -   [📄 General Endpoints](#-general-endpoints)
    -   [🦖 Dinosaur Endpoints](#-dinosaur-endpoints)
    -   [📷 Image Endpoints](#-image-endpoints)
    -   [OpenAPI Specification](#openapi-specification)

### 📄 General Endpoints

-   [**Get main API endpoint**](/endpoints/home): Returns the home endpoint of the API.
-   [**Get all dinosaur clades**](/endpoints/clades): Returns all dinosaur clades that exist within the API.
-   [**Get all dinosaur diets**](/endpoints/diets): Returns all dinosaur diets that exist within the API.
-   [**Get all dinosaur locomotions**](/endpoints/locomotions): Returns all dinosaur locomotions that exist within the API.
-   [**Get all dinosaur names**](/endpoints/names): Returns all dinosaur names that exist within the API.

### 🦖 Dinosaur Endpoints

-   [**Get all dinosaurs**](/endpoints/allDinosaurs): Returns all dinosaurs within the API, 50 dinosaurs per page.
-   [**Get a dinosaur by ID**](/endpoints/dinosaursByID): Returns a dinosaur matching a specific id, returns an error if not found.
-   [**Get a dinosaur by name**](/endpoints/dinosaursByName): Returns a dinosaur matching a specific name, returns an error if not found.
-   [**Get dinosaurs by diet**](/endpoints/dinosaursByDiet): Returns all dinosaurs matching a specific diet.
-   [**Get dinosaurs by locomotion**](/endpoints/dinosaursByLocomotion): Returns all dinosaurs matching a specific locomotion type.
-   [**Get random dinosaurs**](/endpoints/randomDinosaurs): Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.
-   [**Get dinosaurs by query**](/endpoints/dinosaursByQuery): Returns all dinosaurs matching a specific query.

### 📷 Image Endpoints

-   [**Get all dinosaur images**](/endpoints/allImages): Returns all dinosaur images within the API, 50 dinosaurs per page.
-   [**Get a image by ID**](/endpoints/imagesByID): Returns a dinosaur image matching a specific id, returns an error if not found.
-   [**Get random number of dinosaur images**](/endpoints/randomImages): Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.

### OpenAPI Specification

To view more details about all endpoints such as the expected responses and status codes, please take a look at the
[OpenAPI Spec](/api).
