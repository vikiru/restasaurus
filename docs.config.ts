import type { DocumentationConfig } from './src/types/Config';

export const documentationConfig: DocumentationConfig = {
  site: {
    title: 'Parseum Documentation',
    description:
      'Documentation for Parseum - A markdown to HTML parser and editor built using Peggy.js, React, TailwindCSS and DaisyUI.',
    projectDescription: 'A markdown to HTML parser and editor built using Peggy.js, React, TailwindCSS and DaisyUI.',
    siteUrl: 'https://vikiru.github.io',
    base: '/parseum',
    documentationUrl: 'https://vikiru.github.io/parseum',
    websiteLastModified: new Date(),
  },
  author: {
    name: 'Visakan Kirubakaran',
    alternateName: 'Vis Kirubakaran',
    firstName: 'Visakan',
    lastName: 'Kirubakaran',
    jobTitle: 'Software Developer',
    portfolioWebsite: 'https://vikiru.vercel.app',
    githubProfile: 'https://github.com/vikiru',
    linkedinProfile: 'https://linkedin.com/in/viskirubakaran',
    universityName: 'Carleton University',
    universityLogo: 'https://carleton.ca/favicon.ico',
    universityUrl: 'https://carleton.ca/',
  },
  project: {
    name: 'Parseum',
    githubRepo: 'https://github.com/vikiru/parseum',
    liveDemoUrl: 'https://parseum.surge.sh',
    version: '1.0.0',
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    programmingLanguage: 'JavaScript',
    keywords: ['markdown', 'html', 'parser', 'editor', 'peggy.js', 'react', 'tailwindcss', 'daisyui'],
    license: 'https://opensource.org/licenses/MIT',
  },
  assets: {
    themeColor: '#000',
    logoFileName: 'logo.png',
  },
};
