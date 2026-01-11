---
title: Terms of Use
description: Terms of use and attribution requirements for the RESTasaurus API.
---

> [!IMPORTANT]
>
> The data within the API is taken directly from **Wikipedia** via its API, as is. Please note that the information may have been modified since the last retrieval. All images and text belong to their respective authors, and attribution is provided accordingly for both within the API responses.
> 
> All dinosaur text information sourced from Wikipedia articles are licensed under [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/), unless otherwise noted.
> 
> All dinosaur images are sourced from Wikimedia Commons and are licensed under various licenses - each with their own specific license terms and are attributed accordingly.
>
> By using this API, you agree to properly attribute the sources and comply with their respective licenses.
>
> Examples can be seen below in [Attribution Examples](#-attribution-examples).

## Attribution Examples

When using data from the RESTasaurus API, please ensure that the following four elements are included in your attribution (where possible):

1. **Title**: Include the title of the Wikipedia article or image
2. **Author**: Include the author information for the Wikipedia article or image. For Wikipedia articles, this would be "Wikipedia contributors" and for images, include the author name(s) and author URL, if available.
3. **Source**: Include the source URL where the data was retrieved from (e.g., the Wikipedia page URL or image source URL)
4. **License**: Include a link to the license under which the data is distributed (e.g., Creative Commons)

The above attribution elements should be included in a clear and prominent manner when using data from the RESTasaurus API. 

The API provides all the information needed for proper attribution in its responses. Please see [DinosaurSource](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js) and [DinosaurImage](https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js) to understand the structure of the attribution data.

### Example Wikipedia Article Attribution

Given the following dinosaur source object from the API response, you should include all four required elements (title, author, source, license) when using data from the RESTasaurus API. The API response will contain all this information in the `source` object within each dinosaur, making it easy to construct proper attribution.

```json
"source": {
    "pageTitle": "Zephyrosaurus",
    "author": "Wikipedia contributors",
    "wikipediaURL": "https://en.wikipedia.org/wiki/Zephyrosaurus",
    "license": "Creative Commons Attribution-Share Alike 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    "permalink": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&oldid=1187326953",
    "revisionHistoryURL": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&action=history",
    "lastRevision": "2023-11-28T15:28:47Z",
    "dateAccessed": "2024-01-30T14:27:20.682Z",
    "source": "Wikipedia, The Free Encyclopedia",
    "publisher": "Wikimedia Foundation",
    "citation": "Wikipedia contributors. \"Zephyrosaurus.\" Wikipedia, The Free Encyclopedia. Wikimedia Foundation, 28 Nov 2023. Web. 30 Jan 2024."
}
```

For example, you should display the following information:

- **Title**: Zephyrosaurus
- **Author**: Wikipedia contributors
- **Source**: https://en.wikipedia.org/wiki/Zephyrosaurus
- **License**: Creative Commons Attribution-Share Alike 4.0 (https://creativecommons.org/licenses/by-sa/4.0/deed.en)

### Example Image Attribution

Given the following image attribution structure from the API response, you should include all relevant elements (title, author, source, license) when using images from the RESTasaurus API. The API response will contain all this information in the `image` object, making it easy to construct proper attribution.

```json
"image": {
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

For example, you should display the following information:

- **Title**: Zephyrosaurus in Copenhagen
- **Author**: FunkMonk (https://commons.wikimedia.org/wiki/User:FunkMonk)
- **Source**: https://commons.wikimedia.org/wiki/File:Zephyrosaurus_in_Copenhagen.jpg
- **License**: Creative Commons Attribution-Share Alike 3.0 (https://creativecommons.org/licenses/by-sa/3.0)

For more information regarding attribution best practices and compliance, please refer to the following resources:
- [Reusing Wikipedia Content Guidelines](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content)
- [Recommended Practices for Attribution on Wikipedia](https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution)
