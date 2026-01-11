import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
import starlightThemeRapidePlugin from 'starlight-theme-rapide';
import { documentationConfig } from './docs.config';

const {
  site: { title, base, siteUrl, projectDescription, documentationUrl, websiteLastModified },
  assets: { faviconFileName, logoFileName },
  project: { githubRepo, liveDemoUrl },
} = documentationConfig;

/** @type {import('astro/config').Config} */
export default defineConfig({
  base: `${base}/`,
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  integrations: [
    starlight({
      title,
      tagline: projectDescription,
      favicon: faviconFileName,
      logo: {
        src: `./public/${logoFileName}`,
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
          label: 'Live Demo',
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
            { label: 'Prerequisites', slug: 'getting-started/prerequisites' },
            { label: 'Setup', slug: 'getting-started/setup' },
            { label: 'Test', slug: 'getting-started/test' },
            { label: 'Features', slug: 'getting-started/features' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Stack', slug: 'development/stack' },
            { label: 'Scripts', slug: 'development/scripts' },
          ],
        },
        {
          label: 'Syntax',
          items: [
            { label: 'Syntax Overview', slug: 'syntax' },
            {
              label: 'Basic Syntax',
              autogenerate: { directory: 'syntax/basic' },
            },
            {
              label: 'Formatting Syntax',
              autogenerate: { directory: 'syntax/formatting' },
            },
            {
              label: 'Extended Syntax',
              autogenerate: { directory: 'syntax/extended' },
            },
            {
              label: 'Excluded Syntax',
              autogenerate: { directory: 'syntax/excluded' },
            },
          ],
        },
        {
          label: 'Conclusion',
          items: [{ label: 'Acknowledgments', slug: 'conclusion/acknowledgments' }],
        },
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
