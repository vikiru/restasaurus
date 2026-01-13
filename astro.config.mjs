import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import starlightThemeRapidePlugin from 'starlight-theme-rapide';
import { documentationConfig } from './docs.config';

const {
  site: { title, base, siteUrl, projectDescription, documentationUrl, websiteLastModified },
  assets: { faviconFileName },
  project: { githubRepo, liveDemoUrl },
} = documentationConfig;

export default defineConfig({
  base: `${base}/`,
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  vite: {
    assetsInclude: ['openapi.yaml'],
  },
  integrations: [
    starlight({
      title,
      tagline: projectDescription,
      favicon: documentationConfig.assets.faviconFileName,
      logo: {
        src: './public/logo.png',
        replacesTitle: true,
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: githubRepo,
        },
        {
          icon: 'external',
          label: 'Live API',
          href: liveDemoUrl,
        },
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Home', slug: '/' },
            { label: 'Model Overview', slug: 'getting-started/models/overview' },
            { label: 'Taxonomy Guide', slug: 'getting-started/taxonomy' },
            { label: 'Terms of Use', slug: 'getting-started/terms' },
            { label: 'Fetching from the API', slug: 'getting-started/fetching-from-api' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Prerequisites', slug: 'development/prerequisites' },
            { label: 'Setup', slug: 'development/setup' },
            { label: 'Tech Stack', slug: 'development/stack' },
            { label: 'Running the API', slug: 'development/run' },
            { label: 'Testing the API', slug: 'development/test' },
            { label: 'Available Scripts', slug: 'development/scripts' },
          ],
        },
        {
          label: 'Endpoint Overview',
          items: [
            { label: 'Overview', slug: 'endpoints/overview' },
            {
              label: 'General Endpoints',
              autogenerate: { directory: 'endpoints/general' },
            },
            {
              label: 'Dinosaur Endpoints',
              autogenerate: { directory: 'endpoints/dinosaurs' },
            },
            {
              label: 'Image Endpoints',
              autogenerate: { directory: 'endpoints/images' },
            },
          ],
        },
        {
          label: 'Conclusion',
          items: [{ label: 'Acknowledgments', slug: 'conclusion/acknowledgments' }],
        },
        ...openAPISidebarGroups,
      ],
      components: {
        Head: './src/components/Head.astro',
      },
      credits: true,
      lastUpdated: false,
      plugins: [
        starlightLinksValidatorPlugin({
          errorOnRelativeLinks: false,
          exclude: ['/restasaurus/api/**/*', '/restasaurus/api'],
        }),
        starlightThemeRapidePlugin(),
        starlightOpenAPI([
          {
            base: 'api',
            schema: 'openapi.yaml',
            sidebar: { label: 'OpenAPI Specification' },
          },
        ]),
      ],
    }),
    sitemap({
      serialize(item) {
        item.lastmod = websiteLastModified.toISOString();
        item.changefreq = 'monthly';
        item.priority = item.url === documentationUrl ? 1 : 0.7;
        return item;
      },
    }),
    (await import('@playform/compress')).default({
      Image: false,
    }),
  ],
});
