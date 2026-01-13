import type { components, paths } from '@/types/api';

export type OpenAPISpec = {
  openapi: string; // 3.1.0
  info: {
    title: string;
    description: string;
    license: {
      name: string;
      url: string;
    };
    version: string;
  };
  externalDocs: {
    description: string;
    url: string;
  };
  servers: Array<{ url: string }>;
  tags: Array<{ name: string; description: string }>;
  components: components;
  paths: paths;
};
