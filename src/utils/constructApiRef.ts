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
