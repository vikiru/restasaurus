// TODO: Extract hardcoded URLs (vikiru.github.io/restasaurus) to use config
// TODO: Generate TechArticle LD for docs pages
// TODO: Generate WebPage LD for 404 pages
// TODO: Refactor to use unified GraphLD builder

import type { APIReference } from 'schema-dts';
import type { OpenAPISpec } from '@/types/OpenAPISpec';
import { documentationConfig } from '../../docs.config.ts';
import { apiId, rootApiRefId } from '../../schemas.ts';

const {
  site: { documentationUrl },
  project: { name: projectName },
} = documentationConfig;

export function constructApiRefs(spec: OpenAPISpec): Map<string, APIReference> {
  try {
    const tags = spec.tags;

    const apiRefs = new Map<string, APIReference>();
    for (const tag of tags) {
      const name = `${tag.name.charAt(0).toUpperCase()}${tag.name.slice(1)} Endpoints – ${projectName} API`;
      const url = `${documentationUrl}/api/operations/tags/${tag.name}`;
      const apiRefId = `${url}/#reference`;
      const apiRef: APIReference = {
        '@type': 'APIReference',
        '@id': apiRefId,
        name,
        description: tag.description,
        isPartOf: { '@id': rootApiRefId },
        about: { '@id': apiId },
        mainEntity: { '@id': apiId },
        programmingModel: 'REST',
        url,
        proficiencyLevel: 'Beginner',
      };

      apiRefs.set(tag.name, apiRef);
    }
    return apiRefs;
  } catch (e) {
    console.error(`Failed to load openapi.yaml: ${e}`);
    return new Map<string, APIReference>();
  }
}

// TODO: 1. Extract hardcoded URLs (e.g., vikiru.github.io/restasaurus, /api/operations) to use `documentationConfig`
//         - Makes schema generation environment-agnostic
//         - Replace all `${documentationUrl}/api/operations/...` with a helper function

// TODO: 2. Generate TechArticle LD for all docs pages dynamically
//         - Currently `constructTechArticles` only handles `GET` operations
//         - Should handle other HTTP methods if needed (POST, PUT, DELETE)
//         - Link each article to its correct APIReference tag

// TODO: 3. Generate WebPage LD for non-API pages (404, landing, etc.)
//         - Include `@type: WebPage`
//         - Link to homepage, author, mainEntity, and optionally root APIReference

// TODO: 4. Refactor to use a unified GraphLD builder
//         - Accept an array of schema objects (TechArticle, APIReference, WebPage, etc.)
//         - Outputs a single `@graph` array for JSON-LD injection
//         - Reduces repetition and ensures consistent references (author, publisher, dateModified)

// TODO: 5. Handle missing or optional OpenAPI fields gracefully
//         - Tags, description, summary may be undefined
//         - Provide fallbacks to avoid broken JSON-LD

// TODO: 6. Consider caching Map results or generating JSON files per tag/path
//         - Allows pre-rendering of LD for static site generation
//         - Improves build performance

// TODO: 7. (Optional) Add `parameters` and `responses` to TechArticle LD if needed
//         - Currently omitted for simplicity
//         - Could improve SEO for operation details
