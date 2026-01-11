import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
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
            { label: 'Home', link: '/' },
            { label: 'Prerequisites', link: '/prerequisites' },
            { label: 'Setup', link: '/setup' },
            { label: 'Model Overview', link: '/models' },
          ],
        },
        {
          label: 'API Endpoints',
          autogenerate: { directory: 'endpoints' },
        },
        {
          label: 'Development',
          items: [
            { label: 'Tech Stack', link: '/stack' },
            { label: 'Running the API', link: '/run' },
            { label: 'Testing the API', link: '/test' },
            { label: 'Available Scripts', link: '/scripts' },
          ],
        },
        {
          label: 'Conclusion',
          items: [{ label: 'Acknowledgments', link: '/acknowledgments' }],
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
