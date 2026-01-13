import type { DocumentationConfig } from '@/types/Config';

export const documentationConfig: DocumentationConfig = {
  site: {
    title: 'RESTasaurus Documentation',
    description:
      'Documentation for RESTasaurus - A dinosaur REST API built using Express, MongoDB and Mongoose with comprehensive data for almost 1200 dinosaurs.',
    projectDescription:
      'A dinosaur REST API built using Express, MongoDB and Mongoose with comprehensive data for almost 1200 dinosaurs.',
    siteUrl: 'https://vikiru.github.io',
    base: '/restasaurus',
    documentationUrl: 'https://vikiru.github.io/restasaurus',
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
    name: 'RESTasaurus',
    githubRepo: 'https://github.com/vikiru/restasaurus',
    liveDemoUrl: 'https://restasaurus.onrender.com/api/v1',
    version: '1.0.1',
    startDate: '2024-01-07',
    endDate: '2024-02-01',
    programmingLanguage: 'JavaScript',
    keywords: ['restasaurus', 'rest', 'api', 'mongodb', 'mongoose', 'express', 'dinosaurs'],
    license: 'https://opensource.org/licenses/MIT',
  },
  assets: {
    themeColor: '#000',
    logoFileName: 'logo.png',
    faviconFileName: 'favicon.ico',
  },
};
