import type { TechArticle } from 'schema-dts';
import type { OpenAPISpec } from '@/types/OpenAPISpec';
import { documentationConfig } from '../../docs.config.ts';
import { personId } from '../../schemas';

const {
  site: { documentationUrl },
  project: { name: projectName, keywords, endDate },
} = documentationConfig;

export function constructTechArticles(spec: OpenAPISpec): Map<string, TechArticle> {
  const paths = spec.paths;
  const techArticles = new Map<string, TechArticle>();
  for (const [_, operations] of Object.entries(paths)) {
    const operation = operations.get;
    const { tags, summary, description, operationId } = operation;
    const tag = tags[0];
    const articleId = `${documentationUrl}/api/operations/${operationId}/#article`;
    const apiRefId = `${documentationUrl}/api/operations/tags/${tag}/#reference`;
    const article: TechArticle = {
      '@type': 'TechArticle',
      '@id': articleId,
      headline: `${summary} – ${projectName} API`,
      description: description || summary || '',
      url: articleId,
      dateModified: new Date(endDate).toISOString(),
      isPartOf: { '@id': apiRefId },
      mainEntity: { '@id': apiRefId },
      about: { '@id': apiRefId },
      inLanguage: 'en',
      author: { '@id': personId },
      publisher: { '@id': personId },
      keywords,
    };

    techArticles.set(operationId, article);
  }
  return techArticles;
}
