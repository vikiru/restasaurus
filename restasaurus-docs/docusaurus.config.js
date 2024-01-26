// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'RESTasaurus | API Documentation',
    tagline: 'A REST API about dinosaurs, built using Express, MongoDB and Mongoose.',
    favicon: 'public/favicon.ico',
    staticDirectories: ['public', 'static'],
    trailingSlash: true,

    url: 'https://vikiru.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/restasaurus',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'vikiru',
    projectName: 'restasaurus',

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    plugins: [
        [
            require.resolve('@cmfcmf/docusaurus-search-local'),
            {
                indexDocs: true,
                indexDocSidebarParentCategories: 0,
                indexBlog: false,
                indexPages: false,
                language: 'en',
                style: undefined,
                maxSearchResults: 8,
                lunr: {
                    tokenizerSeparator: /[\s\-]+/,
                    b: 0.75,
                    k1: 1.2,
                    titleBoost: 5,
                    contentBoost: 1,
                    tagsBoost: 3,
                    parentCategoriesBoost: 2,
                },
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    breadcrumbs: true,
                },
                gtag: {
                    trackingID: '', // TODO: replace this.
                    anonymizeIP: true,
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                hideOnScroll: true,
                title: 'restasaurus',
                items: [
                    {
                        type: 'doc',
                        docId: 'setup',
                        position: 'left',
                        label: 'Setup',
                    },
                    {
                        type: 'doc',
                        docId: 'commands/category-overview',
                        position: 'left',
                        label: 'Commands',
                    },
                    {
                        type: 'doc',
                        docId: 'commands/api-references',
                        position: 'left',
                        label: 'API References',
                    },
                ],
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Getting Started',
                        items: [
                            {
                                label: 'Home',
                                to: '/',
                            },
                            {
                                label: 'Prerequisites',
                                to: '/prerequisites',
                            },
                            {
                                label: 'Setup',
                                to: '/setup',
                            },
                        ],
                    },
                    {
                        title: 'Commands',
                        items: [
                            {
                                label: 'Category Overview',
                                to: '/commands/category-overview',
                            },
                            {
                                label: 'API References',
                                to: '/commands/api-references',
                            },
                        ],
                    },
                    {
                        title: 'Conclusion',
                        items: [
                            {
                                label: 'Acknowledgments',
                                to: '/acknowledgments',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/vikiru/restasaurus',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} restasaurus, Visakan Kirubakaran. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = {
    config,
};
