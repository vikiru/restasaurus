'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [671],
    {
        7876: (s, e, i) => {
            i.r(e),
                i.d(e, {
                    assets: () => l,
                    contentTitle: () => n,
                    default: () => d,
                    frontMatter: () => a,
                    metadata: () => o,
                    toc: () => u,
                });
            var t = i(5893),
                r = i(1151);
            const a = { slug: '/', id: 'intro', title: '\ud83d\udcd6 Introduction' },
                n = void 0,
                o = {
                    id: 'intro',
                    title: '\ud83d\udcd6 Introduction',
                    description: '<img src="https://wakatime.com/badge/github/vikiru/restasaurus.svg"',
                    source: '@site/docs/intro.md',
                    sourceDirName: '.',
                    slug: '/',
                    permalink: '/restasaurus/',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { slug: '/', id: 'intro', title: '\ud83d\udcd6 Introduction' },
                    sidebar: 'docs',
                    next: { title: '\ud83d\udcdd Prerequisites', permalink: '/restasaurus/prerequisites' },
                },
                l = {},
                u = [
                    { value: 'Overview', id: 'overview', level: 2 },
                    { value: '\xa9\ufe0f License', id: '\ufe0f-license', level: 2 },
                ];
            function h(s) {
                const e = {
                    a: 'a',
                    admonition: 'admonition',
                    h2: 'h2',
                    hr: 'hr',
                    li: 'li',
                    p: 'p',
                    strong: 'strong',
                    ul: 'ul',
                    ...(0, r.a)(),
                    ...s.components,
                };
                return (0, t.jsxs)(t.Fragment, {
                    children: [
                        (0, t.jsx)('div', {
                            align: 'center',
                            id: 'logo',
                            children: (0, t.jsx)('img', { src: 'logo.png' }),
                        }),
                        '\n',
                        (0, t.jsxs)('div', {
                            align: 'center',
                            id: 'badges',
                            children: [
                                (0, t.jsx)('a', {
                                    href: 'https://vikiru.github.io/restasaurus/',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/badge/documentation-docs-orange',
                                        alt: 'Documentation',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://restasaurus.onrender.com/api/v1',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/badge/API-live%20site-blue',
                                        alt: 'RESTasaurus API hosted via Render',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://wakatime.com/@vikiru/projects/oducsokuft',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://wakatime.com/badge/github/vikiru/restasaurus.svg',
                                        alt: 'Wakatime Coding Stats for RESTasaurus',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/blob/main/LICENSE',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/badge/license-MIT-aqua',
                                        alt: 'MIT License Badge',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/prettier/prettier',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square',
                                        alt: 'Code Style - Prettier',
                                    }),
                                }),
                                (0, t.jsx)('br', {}),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/releases',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/github/v/release/vikiru/restasaurus',
                                        alt: 'Release',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/issues?q=is%3Aissue+is%3Aclosed',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/github/issues-closed/vikiru/restasaurus',
                                        alt: 'Closed Issues',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/pulls?q=is%3Apr+is%3Aclosed',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://img.shields.io/github/issues-pr-closed/vikiru/restasaurus?label=closed%20prs',
                                        alt: 'Closed PRs',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/actions/workflows/lint.yml',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://github.com/vikiru/restasaurus/actions/workflows/lint.yml/badge.svg',
                                        alt: 'GitHub Lint Action Workflow Status',
                                    }),
                                }),
                                (0, t.jsx)('a', {
                                    href: 'https://github.com/vikiru/restasaurus/actions/workflows/test.yml',
                                    children: (0, t.jsx)('img', {
                                        src: 'https://github.com/vikiru/restasaurus/actions/workflows/test.yml/badge.svg',
                                    }),
                                }),
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(e.hr, {}),
                        '\n',
                        (0, t.jsx)(e.h2, { id: 'overview', children: 'Overview' }),
                        '\n',
                        (0, t.jsxs)(e.p, {
                            children: [
                                (0, t.jsx)(e.strong, { children: 'RESTasaurus' }),
                                ' is a RESTful API, leveraging Express, MongoDB, and Mongoose to deliver comprehensive data on almost 1200 dinosaurs!',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(e.admonition, {
                            type: 'info',
                            children: (0, t.jsxs)(e.p, {
                                children: [
                                    'The data within the API is taken directly from ',
                                    (0, t.jsx)(e.strong, { children: 'Wikipedia' }),
                                    ' via its API, as is. Please note that the information may have been modified since the last retrieval. All images and text belong to their respective authors, and attribution is provided accordingly for both. After retrieval, the data undergoes processing to be transformed into a custom JSON object, referred to as ',
                                    (0, t.jsx)(e.a, {
                                        href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/MongooseData.js',
                                        children: 'MongooseData',
                                    }),
                                    '.',
                                ],
                            }),
                        }),
                        '\n',
                        (0, t.jsxs)(e.p, {
                            children: [
                                'For a better understanding of the information provided by the API, please check out the ',
                                (0, t.jsx)(e.a, {
                                    href: 'https://github.com/vikiru/restasaurus/tree/main/app/models',
                                    children: 'models',
                                }),
                                ' directory. The schemas used within the MongoDB database include:',
                            ],
                        }),
                        '\n',
                        (0, t.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(e.li, {
                                    children: [
                                        (0, t.jsx)(e.a, {
                                            href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js',
                                            children: (0, t.jsx)(e.strong, { children: 'Dinosaur' }),
                                        }),
                                        ': This is the main model which represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description. Additionally, it also contains references to the sub-models below, which are populated with their relevant values when handling API requests.',
                                    ],
                                }),
                                '\n',
                                (0, t.jsxs)(e.li, {
                                    children: [
                                        (0, t.jsx)(e.a, {
                                            href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/ClassificationInfo.js',
                                            children: (0, t.jsx)(e.strong, { children: 'ClassificationInfo' }),
                                        }),
                                        ': This model contains the classification information of a dinosaur, including details like its family, order, and genus.',
                                    ],
                                }),
                                '\n',
                                (0, t.jsxs)(e.li, {
                                    children: [
                                        (0, t.jsx)(e.a, {
                                            href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js',
                                            children: (0, t.jsx)(e.strong, { children: 'DinosaurImage' }),
                                        }),
                                        ': This model is used to store the image data related to a dinosaur, including the image source and attribution details.',
                                    ],
                                }),
                                '\n',
                                (0, t.jsxs)(e.li, {
                                    children: [
                                        (0, t.jsx)(e.a, {
                                            href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js',
                                            children: (0, t.jsx)(e.strong, { children: 'DinosaurSource' }),
                                        }),
                                        ': This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsxs)(e.p, {
                            children: [
                                'Additionally, if you would like to see an example of a response from the API, please see the ',
                                (0, t.jsx)(e.a, { href: '/models', children: 'Model Overview' }),
                                ' page to see the model structure present within the API.',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(e.h2, { id: '\ufe0f-license', children: '\xa9\ufe0f License' }),
                        '\n',
                        (0, t.jsxs)(e.p, {
                            children: [
                                'The contents of this repository are licensed under the terms and conditions of the ',
                                (0, t.jsx)(e.a, { href: 'https://choosealicense.com/licenses/mit/', children: 'MIT' }),
                                ' license.',
                            ],
                        }),
                        '\n',
                        (0, t.jsxs)(e.p, {
                            children: [
                                (0, t.jsx)(e.a, {
                                    href: 'https://github.com/vikiru/restasaurus/blob/main/LICENSE',
                                    children: 'MIT',
                                }),
                                ' \xa9 2024-present Visakan Kirubakaran.',
                            ],
                        }),
                    ],
                });
            }
            function d(s = {}) {
                const { wrapper: e } = { ...(0, r.a)(), ...s.components };
                return e ? (0, t.jsx)(e, { ...s, children: (0, t.jsx)(h, { ...s }) }) : h(s);
            }
        },
        1151: (s, e, i) => {
            i.d(e, { Z: () => o, a: () => n });
            var t = i(7294);
            const r = {},
                a = t.createContext(r);
            function n(s) {
                const e = t.useContext(a);
                return t.useMemo(
                    function () {
                        return 'function' == typeof s ? s(e) : { ...e, ...s };
                    },
                    [e, s],
                );
            }
            function o(s) {
                let e;
                return (
                    (e = s.disableParentContext
                        ? 'function' == typeof s.components
                            ? s.components(r)
                            : s.components || r
                        : n(s.components)),
                    t.createElement(a.Provider, { value: e }, s.children)
                );
            }
        },
    },
]);
