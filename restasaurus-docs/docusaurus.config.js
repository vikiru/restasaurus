// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const path = require('path');
const { themes } = require('prism-react-renderer');

const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'RESTasaurus',
    url: 'https://vikiru.github.io/',
    baseUrl: '/restasaurus',

    tagline: 'A REST API about dinosaurs, built using Express, MongoDB and Mongoose.',
    favicon: 'public/favicon.ico',
    staticDirectories: ['public', 'static'],
    trailingSlash: true,

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'vikiru',
    projectName: 'restasaurus',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    plugins: [require.resolve('docusaurus-lunr-search')],

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
                    trackingID: 'G-4N09E9KTQ0',
                    anonymizeIP: true,
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    priority: 0.5,
                    ignorePatterns: [],
                    filename: 'sitemap.xml',
                },
            }),
        ],
        [
            'redocusaurus',
            {
                config: path.resolve(__dirname, 'redocly.yaml'),
                // Plugin Options for loading OpenAPI files
                specs: [
                    {
                        spec: 'openapi.yaml',
                        route: '/api/',
                    },
                ],
                // Theme Options for modifying how redoc renders them
                theme: {
                    // Change with your site colors
                    primaryColor: '#1890ff',
                },
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [
                { name: 'author', content: 'Visakan Kirubakaran' },
                { name: 'keywords', content: 'RESTasaurus, REST, API, Express, MongoDB, Mongoose, Dinosaurs' },
                {
                    name: 'description',
                    content:
                        'RESTasaurus is a dinosaur REST API built using Express, MongoDB, and Mongoose with data on almost 1200 dinosaurs.',
                },
            ],
            navbar: {
                hideOnScroll: true,
                title: 'RESTasaurus',
                items: [
                    {
                        position: 'left',
                        label: 'Setup',
                        href: '/setup',
                    },
                    {
                        position: 'left',
                        label: 'Endpoints',
                        href: '/overview',
                    },
                    {
                        position: 'left',
                        label: 'Development',
                        href: '/stack',
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
                            { label: 'Model Overview', to: '/models' },
                        ],
                    },
                    {
                        title: 'API Endpoints',
                        items: [
                            {
                                label: 'Endpoint Overview',
                                to: '/overview',
                            },
                            {
                                label: 'General Endpoints',
                                to: '/endpoints/home',
                            },
                            {
                                label: 'Dinosaur Endpoints',
                                to: '/endpoints/allDinosaurs',
                            },
                            {
                                label: 'Image Endpoints',
                                to: '/endpoints/allImages',
                            },
                            {
                                label: 'OpenAPI Specification',
                                to: '/api',
                            },
                        ],
                    },
                    {
                        title: 'Development',
                        items: [
                            {
                                label: 'Tech Stack',
                                to: '/stack',
                            },
                            {
                                label: 'Running the API',
                                to: '/run',
                            },
                            {
                                label: 'Testing the API',
                                to: '/test',
                            },
                            {
                                label: 'Available Scripts',
                                to: '/scripts',
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
                copyright: `Copyright © ${new Date().getFullYear()} RESTasaurus, Visakan Kirubakaran. Built with Docusaurus.`,
            },
            prism: {
                theme: lightTheme,
                darkTheme,
            },
        }),
};

export default config;
