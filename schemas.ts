import type { APIReference, Person, SoftwareSourceCode, WebAPI, WebSite } from 'schema-dts';
import { documentationConfig } from './docs.config';

const {
  site: { title, description, projectDescription, siteUrl, base, websiteLastModified, documentationUrl },
  author: {
    name,
    alternateName,
    firstName,
    lastName,
    jobTitle,
    portfolioWebsite,
    githubProfile,
    linkedinProfile,
    universityName,
    universityUrl,
    universityLogo,
  },
  project: {
    name: projectName,
    githubRepo,
    version,
    programmingLanguage,
    keywords,
    license,
    startDate,
    endDate,
    liveDemoUrl,
  },
  assets: { logoFileName },
} = documentationConfig;

const personId = `${portfolioWebsite}/#person`;
const softwareId = `${githubRepo}/#software`;
const homepageId = `${siteUrl}${base}/#homepage`;
const apiId = `${liveDemoUrl}/#api`;
const rootApiRefId = `${documentationUrl}/api/#reference`;

const personLd: Person = {
  '@type': 'Person',
  '@id': personId,
  name,
  alternateName,
  givenName: firstName,
  familyName: lastName,
  jobTitle,
  url: portfolioWebsite,
  sameAs: [githubProfile, linkedinProfile],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: universityName,
    url: universityUrl,
    logo: universityLogo,
  },
};

const softwareLd: SoftwareSourceCode = {
  '@type': 'SoftwareSourceCode',
  '@id': softwareId,
  name: projectName,
  description: projectDescription,
  url: githubRepo,
  author: { '@id': personId },
  maintainer: { '@id': personId },
  keywords: keywords,
  version: version,
  programmingLanguage: programmingLanguage,
  license: license,
  dateCreated: new Date(startDate).toISOString(),
  dateModified: new Date(endDate).toISOString(),
  codeRepository: githubRepo,
  runtimePlatform: 'Node.js',
};

const homepageLd: WebSite = {
  '@type': 'WebSite',
  '@id': homepageId,
  name: title,
  alternateName: projectName,
  description: description,
  url: `${siteUrl}${base}/`,
  creator: { '@id': personId },
  license: license,
  inLanguage: 'en',
  dateModified: websiteLastModified.toISOString(),
  image: `${siteUrl}${base}/${logoFileName}`,
  about: { '@id': softwareId },
  sameAs: [githubRepo, liveDemoUrl],
  mainEntity: { '@id': softwareId },
  mainEntityOfPage: `${documentationUrl}/`,
};

const webApiLd: WebAPI = {
  '@type': 'WebAPI',
  '@id': apiId,
  name: `${projectName} API`,
  description: projectDescription,
  url: liveDemoUrl,
  documentation: documentationUrl,
  provider: { '@id': personId },
  termsOfService: `${documentationUrl}/terms`,
};

const rootApiRefLd: APIReference = {
  '@type': 'APIReference',
  '@id': rootApiRefId,
  name: `${projectName} API Reference`,
  description: `Reference documentation generated from the OpenAPI specification for the ${projectName} API.`,
  about: { '@id': apiId },
  mainEntity: { '@id': apiId },
  url: `${documentationUrl}/api`,
  isPartOf: { '@id': homepageId },
  programmingModel: 'REST',
  targetPlatform: 'Node.js',
  proficiencyLevel: 'Beginner',
  isBasedOn: `${documentationUrl}/openapi.yaml`,
  author: { '@id': personId },
  publisher: { '@id': personId },
  inLanguage: 'en',
};

export {
  personId,
  softwareId,
  homepageId,
  apiId,
  rootApiRefId,
  personLd,
  softwareLd,
  homepageLd,
  webApiLd,
  rootApiRefLd,
};
