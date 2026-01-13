import fs from 'node:fs';
import yaml from 'js-yaml';
import type { OpenAPISpec } from '@/types/OpenAPISpec';

export function loadOpenApiSpec(): OpenAPISpec {
  const rawYaml = fs.readFileSync('openapi.yaml', 'utf8');
  const doc = yaml.load(rawYaml) as OpenAPISpec;
  return doc;
}
