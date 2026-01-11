import type { Person, SoftwareSourceCode, WebApplication, WebSite } from "schema-dts";
import { documentationConfig } from "./docs.config";

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
    universityLogo 
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
    liveDemoUrl 
  },
  assets: { logoFileName }
} = documentationConfig;

const personId = `${portfolioWebsite}/#person`;
const softwareId = `${githubRepo}/#software`;
const homepageId = `${siteUrl}${base}/#homepage`;
const webAppId = `${liveDemoUrl}/#web-app`;

const personLd: Person = {
  "@type": "Person",
  "@id": personId,
  name,
  alternateName,
  givenName: firstName,
  familyName: lastName,
  jobTitle,
  url: portfolioWebsite,
  sameAs: [githubProfile, linkedinProfile],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: universityName,
    url: universityUrl,
    logo: universityLogo,
  },
};

const softwareLd: SoftwareSourceCode = {
  "@type": "SoftwareSourceCode",
  "@id": softwareId,
  name: projectName,
  description: projectDescription,
  url: githubRepo,
  author: { "@id": personId },
  maintainer: { "@id": personId },
  keywords: keywords,
  version: version,
  programmingLanguage: programmingLanguage,
  license: license,
  dateCreated: new Date(startDate).toISOString(),
  dateModified: new Date(endDate).toISOString(),
  codeRepository: githubRepo,
  runtimePlatform: ["Node.js", "Web", "Browser"],
  targetProduct: { "@id": webAppId },
};

const homepageLd: WebSite = {
  "@type": "WebSite",
  "@id": homepageId,
  name: title,
  alternateName: projectName,
  description: description,
  url: `${siteUrl}${base}/`,
  creator: { "@id": personId },
  license: license,
  inLanguage: "en",
  dateModified: websiteLastModified.toISOString(),
  image: `${siteUrl}${base}/${logoFileName}`,
  about: { "@id": softwareId },
  sameAs: [githubRepo, liveDemoUrl],
  mainEntity: { "@id": softwareId },
  mainEntityOfPage: `${documentationUrl}/`,
};

const webAppLd: WebApplication = {
  "@type": "WebApplication",
  "@id": webAppId,
  name: projectName,
  description: projectDescription,
  url: liveDemoUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript and a modern web browser",
  softwareVersion: version,
  copyrightHolder: { "@id": personId },
  copyrightNotice: "Copyright 2024 Visakan Kirubakaran. All rights reserved.",
  copyrightYear: 2024,
  mainEntity: { "@id": softwareId },
  mainEntityOfPage: liveDemoUrl,
};

export { personId, softwareId, homepageId, webAppId, personLd, softwareLd, homepageLd, webAppLd };