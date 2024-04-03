'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [581],
    {
        388: (e, s, n) => {
            n.r(s),
                n.d(s, {
                    assets: () => l,
                    contentTitle: () => o,
                    default: () => h,
                    frontMatter: () => a,
                    metadata: () => r,
                    toc: () => c,
                });
            var i = n(5893),
                t = n(1151);
            const a = { id: 'setup', title: '\u26a1 Setup' },
                o = void 0,
                r = {
                    id: 'setup',
                    title: '\u26a1 Setup',
                    description: '\u26a1 Setup Instructions',
                    source: '@site/docs/setup.md',
                    sourceDirName: '.',
                    slug: '/setup',
                    permalink: '/restasaurus/setup',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { id: 'setup', title: '\u26a1 Setup' },
                    sidebar: 'docs',
                    previous: { title: '\ud83d\udcdd Prerequisites', permalink: '/restasaurus/prerequisites' },
                    next: { title: '\ud83e\udde9 Model Overview', permalink: '/restasaurus/models' },
                },
                l = {},
                c = [
                    { value: '\u26a1 Setup Instructions', id: '-setup-instructions', level: 2 },
                    { value: 'Environment Setup', id: 'environment-setup', level: 3 },
                    {
                        value: 'Retrieving data from Wikipedia via its API',
                        id: 'retrieving-data-from-wikipedia-via-its-api',
                        level: 3,
                    },
                    {
                        value: 'Saving the processed data to the MongoDB database',
                        id: 'saving-the-processed-data-to-the-mongodb-database',
                        level: 3,
                    },
                ];
            function d(e) {
                const s = {
                    a: 'a',
                    code: 'code',
                    h2: 'h2',
                    h3: 'h3',
                    li: 'li',
                    ol: 'ol',
                    p: 'p',
                    pre: 'pre',
                    ul: 'ul',
                    ...(0, t.a)(),
                    ...e.components,
                };
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)(s.h2, { id: '-setup-instructions', children: '\u26a1 Setup Instructions' }),
                        '\n',
                        (0, i.jsx)(s.h3, { id: 'environment-setup', children: 'Environment Setup' }),
                        '\n',
                        (0, i.jsxs)(s.ol, {
                            children: [
                                '\n',
                                (0, i.jsx)(s.li, { children: 'Clone this repository to your local machine.' }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.pre, {
                            children: (0, i.jsx)(s.code, {
                                className: 'language-bash',
                                children: 'git clone https://github.com/vikiru/restasaurus.git\r\ncd restasaurus\n',
                            }),
                        }),
                        '\n',
                        (0, i.jsxs)(s.ol, {
                            start: '2',
                            children: [
                                '\n',
                                (0, i.jsx)(s.li, { children: 'Download and install all required dependencies.' }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.pre, {
                            children: (0, i.jsx)(s.code, { className: 'language-bash', children: 'npm install\n' }),
                        }),
                        '\n',
                        (0, i.jsxs)(s.ol, {
                            start: '3',
                            children: [
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        'Setup your ',
                                        (0, i.jsx)(s.code, { children: '.env' }),
                                        ' file with the required information.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.pre, {
                            children: (0, i.jsx)(s.code, {
                                className: 'language-text',
                                children:
                                    "PORT=YOUR-PORT-HERE\r\nMONGODB_URI='YOUR-MONGODB-URI-HERE'\r\nNODE_ENV='development'\n",
                            }),
                        }),
                        '\n',
                        (0, i.jsx)(s.h3, {
                            id: 'retrieving-data-from-wikipedia-via-its-api',
                            children: 'Retrieving data from Wikipedia via its API',
                        }),
                        '\n',
                        (0, i.jsxs)(s.p, {
                            children: [
                                'Run the ',
                                (0, i.jsx)(s.code, { children: 'retrieveData' }),
                                ' script to retrieve all dinosaur information.',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.pre, {
                            children: (0, i.jsx)(s.code, {
                                className: 'language-bash',
                                children: 'npm run retrieveData\n',
                            }),
                        }),
                        '\n',
                        (0, i.jsxs)(s.p, {
                            children: [
                                'This script will retrieve information about dinosaurs from Wikipedia via its API and then process that data to construct a JSON object represented by ',
                                (0, i.jsx)(s.a, {
                                    href: 'https://github.com/vikiru/restasaurus/blob/main/app/models/MongooseData.js',
                                    children: 'MongooseData',
                                }),
                                '.',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(s.p, {
                            children: [
                                'Please check the ',
                                (0, i.jsx)(s.code, { children: 'app/logs' }),
                                ' directory in the event of any errors. Specifically,\r\nyou can check the ',
                                (0, i.jsx)(s.code, { children: 'errors.log' }),
                                ' or ',
                                (0, i.jsx)(s.code, { children: 'all.log' }),
                                ' to view the errors or all levels of\r\nlogging, respectively.',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(s.p, {
                            children: [
                                'Additionally, confirm that ',
                                (0, i.jsx)(s.code, { children: 'app/scripts' }),
                                ' contains the following JSON files:',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'allDinoNames.json' }),
                                        ': contains all dinosaur names (should be around 1427 names).',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'filteredNames.json' }),
                                        ': contains the names of the dinosaurs that passed the filtering process (should be around 1153 names).',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'htmlData.json' }),
                                        ': contains the raw HTML for each Wikipedia article as a String.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'imageData.json' }),
                                        ': contains the image data for each Dinosaur.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'pageData.json' }),
                                        ': contains the page data for each Wikipedia article.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'dinosaurData.json' }),
                                        ': contains the processed data of all dinosaurs.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.h3, {
                            id: 'saving-the-processed-data-to-the-mongodb-database',
                            children: 'Saving the processed data to the MongoDB database',
                        }),
                        '\n',
                        (0, i.jsxs)(s.p, {
                            children: [
                                'Run the ',
                                (0, i.jsx)(s.code, { children: 'postData' }),
                                ' script to save all dinosaurs to your MongoDB database, once retrieveData was successful.',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.pre, {
                            children: (0, i.jsx)(s.code, {
                                className: 'language-bash',
                                children: 'npm run postData\n',
                            }),
                        }),
                        '\n',
                        (0, i.jsx)(s.p, {
                            children:
                                'Please check your MongoDB database collections and ensure that the dinosaurs were saved successfully.',
                        }),
                        '\n',
                        (0, i.jsx)(s.p, { children: 'There should be 5 collections:' }),
                        '\n',
                        (0, i.jsxs)(s.ol, {
                            children: [
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'classificationinfos' }),
                                        ': This collection contains all of the ClassificationInfo documents.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'counters' }),
                                        ': This collection is auto-created and allows for auto-indexing of documents.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'dinosaurimages' }),
                                        ': This collection contains all of the DinosaurImage documents.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'dinosaurs' }),
                                        ': This is the main collection which contains all of the Dinosaur documents.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(s.li, {
                                    children: [
                                        (0, i.jsx)(s.code, { children: 'dinosaursources' }),
                                        ': This collection contains all of the DinosaurSource documents.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(s.p, {
                            children:
                                'After completing these steps, the API should be ready for launch, with all endpoints fully operational. \ud83c\udf89',
                        }),
                    ],
                });
            }
            function h(e = {}) {
                const { wrapper: s } = { ...(0, t.a)(), ...e.components };
                return s ? (0, i.jsx)(s, { ...e, children: (0, i.jsx)(d, { ...e }) }) : d(e);
            }
        },
        1151: (e, s, n) => {
            n.d(s, { Z: () => r, a: () => o });
            var i = n(7294);
            const t = {},
                a = i.createContext(t);
            function o(e) {
                const s = i.useContext(a);
                return i.useMemo(
                    function () {
                        return 'function' == typeof e ? e(s) : { ...s, ...e };
                    },
                    [s, e],
                );
            }
            function r(e) {
                let s;
                return (
                    (s = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(t)
                            : e.components || t
                        : o(e.components)),
                    i.createElement(a.Provider, { value: s }, e.children)
                );
            }
        },
    },
]);
