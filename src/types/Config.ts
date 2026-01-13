export type SiteConfig = {
  title: string;
  description: string;
  projectDescription: string;
  siteUrl: string;
  base: string;
  documentationUrl: string;
  websiteLastModified: Date;
};

export type AuthorConfig = {
  name: string;
  alternateName: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  portfolioWebsite: string;
  githubProfile: string;
  linkedinProfile: string;
  universityName: string;
  universityLogo: string;
  universityUrl: string;
};

export type ProjectConfig = {
  name: string;
  githubRepo: string;
  liveDemoUrl: string;
  version: string;
  startDate: string;
  endDate: string;
  programmingLanguage: string;
  keywords: string[];
  license: string;
};

export type AssetsConfig = {
  themeColor: string;
  logoFileName: string;
  faviconFileName: string;
};

export type DocumentationConfig = {
  site: SiteConfig;
  author: AuthorConfig;
  project: ProjectConfig;
  assets: AssetsConfig;
};
