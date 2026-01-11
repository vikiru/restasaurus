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
  integrations: [
    starlight({
      title,
      tagline: projectDescription,
      favicon: faviconFileName,
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
            { label: 'Prerequisites', slug: 'prerequisites' },
            { label: 'Setup', slug: 'setup' },
            { label: 'Model Overview', slug: 'models/overview' },
            { label: 'Terms of Use', slug: 'terms' },
          ],
        },
        {
          label: 'API Endpoints',
          autogenerate: { directory: 'endpoints' },
        },
        {
          label: 'Development',
          items: [
            { label: 'Tech Stack', slug: 'development/stack' },
            { label: 'Running the API', slug: 'development/run' },
            { label: 'Testing the API', slug: 'development/test' },
            { label: 'Available Scripts', slug: 'development/scripts' },
          ],
        },
        {
          label: 'Conclusion',
          items: [{ label: 'Acknowledgments', slug: 'acknowledgments' }],
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
        }),
        starlightThemeRapidePlugin(),
        starlightOpenAPI([
          {
            base: 'api/restasaurus',
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
    (await import('@playform/compress')).default(),
  ],
});
