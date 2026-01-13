import type { Graph } from 'schema-dts';
import { constructApiRefs } from '@/utils/constructApiRef';
import { constructTechArticles } from '@/utils/constructTechArticle';
import { loadOpenApiSpec } from '@/utils/loadOpenAPISpec';
import { documentationConfig } from '../../docs.config';
import { homepageLd, personLd, rootApiRefLd, softwareLd, webApiLd } from '../../schemas';

const {
  site: { base },
  project: { name: projectName },
} = documentationConfig;

const spec = loadOpenApiSpec();
const techArticles = constructTechArticles(spec);
const apiRefs = constructApiRefs(spec);
const metaMap = new Map();
const graphMap = new Map<string, Graph>();

export function constructRootApiRefGraph(graphMap: Map<string, Graph>) {
  const data = [personLd, homepageLd, softwareLd, webApiLd, rootApiRefLd];
  const slug = `${base}/api`;
  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': data,
  };

  graphMap.set(slug, graph);
  metaMap.set(slug, {
    title: 'OpenAPI Specification',
    description: `Browse the complete API reference for ${projectName}.`,
  });
}

export function constructApiRefGraph(graphMap: Map<string, Graph>) {
  const data = [personLd, homepageLd, softwareLd, webApiLd];
  for (const [slug, apiRef] of apiRefs.entries()) {
    const graph: Graph = {
      '@context': 'https://schema.org',
      '@graph': [...data, apiRef],
    };
    const title = apiRef.name || 'API Reference';
    const description = apiRef.description || `Browse the ${title} for ${projectName}.`;
    metaMap.set(`${base}/api/operations/tags/${slug}`, { title, description });
    graphMap.set(`${base}/api/operations/tags/${slug}`, graph);
  }
}

export function constructEndpointGraph(graphMap: Map<string, Graph>) {
  const data = [personLd, homepageLd, softwareLd, webApiLd];
  for (const [slug, techArticle] of techArticles.entries()) {
    const graph: Graph = {
      '@context': 'https://schema.org',
      '@graph': [...data, techArticle],
    };
    const title = techArticle.headline || 'API Endpoint';
    const description = techArticle.description || `Browse the ${title} for ${projectName}.`;
    metaMap.set(`${base}/api/operations/${slug}`, { title, description });
    graphMap.set(`${base}/api/operations/${slug}`, graph);
  }
}

// Intialize graph and meta map
constructRootApiRefGraph(graphMap);
constructApiRefGraph(graphMap);
constructEndpointGraph(graphMap);

export { graphMap, metaMap };
