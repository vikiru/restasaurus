---
title: Endpoint Overview
description: Complete overview of all available REST API endpoints in the RESTasaurus project.
---

## Table of Contents

:::note
The API is currently configured to support only GET requests and responses from the API are only in `json` format.

The current rate limit is set to `20 requests per hour`.
The API contains **1188 dinosaurs** with comprehensive metadata and images.
:::

-   [Table of Contents](#-table-of-contents)
    -   [General Endpoints](#-general-endpoints)
    -   [Dinosaur Endpoints](#-dinosaur-endpoints)
    -   [Image Endpoints](#-image-endpoints)
    -   [OpenAPI Specification](#openapi-specification)

### General Endpoints

-   [**Get main API endpoint**](/endpoints/home): Returns the home endpoint of the API with version info and available endpoints.
-   [**Get all dinosaur clades**](/endpoints/clades): Returns all dinosaur clades with counts (e.g., `{"clade": "Dinosauria", "count": 850}`).
-   [**Get all dinosaur diets**](/endpoints/diets): Returns all dinosaur diets with counts (e.g., `{"diet": "herbivore", "count": 650}`).
-   [**Get all dinosaur locomotions**](/endpoints/locomotions): Returns all dinosaur locomotions with counts (e.g., `{"locomotionType": "biped", "count": 450}`).
-   [**Get all dinosaur names**](/endpoints/names): Returns all 1188 dinosaur names alphabetically.

### Dinosaur Endpoints

-   [**Get all dinosaurs**](/endpoints/allDinosaurs): Returns all dinosaurs with pagination (50 per page), includes navigation URLs.
-   [**Get a dinosaur by ID**](/endpoints/dinosaursByID): Returns a dinosaur by ID (1-1188), returns error if not found.
-   [**Get a dinosaur by name**](/endpoints/dinosaursByName): Returns a dinosaur by name, returns error if not found.
-   [**Get dinosaurs by diet**](/endpoints/dinosaursByDiet): Returns dinosaurs filtered by diet (`carnivore`, `herbivore`, `omnivore`, `piscivore`).
-   [**Get dinosaurs by locomotion**](/endpoints/dinosaursByLocomotion): Returns dinosaurs filtered by locomotion (`biped`, `quadruped`, `facultative biped`, `gliding`, `swimming`).
-   [**Get random dinosaurs**](/endpoints/randomDinosaurs): Returns 1-10 random dinosaurs with count and data array.
-   [**Get dinosaurs by query**](/endpoints/dinosaursByQuery): Returns dinosaurs filtered by clade, diet, and/or locomotion parameters.

### Image Endpoints

-   [**Get all dinosaur images**](/endpoints/allImages): Returns all dinosaur images with pagination (50 per page), includes navigation URLs.
-   [**Get a image by ID**](/endpoints/imagesByID): Returns a dinosaur image by ID (1-1188), returns error if not found.
-   [**Get random number of dinosaur images**](/endpoints/randomImages): Returns 1-10 random dinosaur images with count and data array.

### OpenAPI Specification

To view more details about all endpoints such as the expected responses, status codes, parameter validation, and examples, please take a look at the
[OpenAPI Spec](/restasaurus/api/restasaurus).

Each endpoint documentation page also includes a direct link to its specific OpenAPI specification section.
