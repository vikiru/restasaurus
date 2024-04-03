'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [372],
    {
        9674: (n, e, s) => {
            s.r(e),
                s.d(e, {
                    assets: () => d,
                    contentTitle: () => o,
                    default: () => h,
                    frontMatter: () => t,
                    metadata: () => a,
                    toc: () => l,
                });
            var i = s(5893),
                r = s(1151);
            const t = { title: 'Endpoint Overview' },
                o = void 0,
                a = {
                    id: 'overview',
                    title: 'Endpoint Overview',
                    description: '\ud83d\udcd6 Table of Contents',
                    source: '@site/docs/overview.md',
                    sourceDirName: '.',
                    slug: '/overview',
                    permalink: '/restasaurus/overview',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Endpoint Overview' },
                    sidebar: 'docs',
                    previous: { title: '\ud83e\udde9 Model Overview', permalink: '/restasaurus/models' },
                    next: { title: 'Home', permalink: '/restasaurus/endpoints/home' },
                },
                d = {},
                l = [
                    { value: '\ud83d\udcd6 Table of Contents', id: '-table-of-contents', level: 2 },
                    { value: '\ud83d\udcc4 General Endpoints', id: '-general-endpoints', level: 3 },
                    { value: '\ud83e\udd96 Dinosaur Endpoints', id: '-dinosaur-endpoints', level: 3 },
                    { value: '\ud83d\udcf7 Image Endpoints', id: '-image-endpoints', level: 3 },
                    { value: 'OpenAPI Specification', id: 'openapi-specification', level: 3 },
                ];
            function c(n) {
                const e = {
                    a: 'a',
                    admonition: 'admonition',
                    code: 'code',
                    h2: 'h2',
                    h3: 'h3',
                    li: 'li',
                    p: 'p',
                    strong: 'strong',
                    ul: 'ul',
                    ...(0, r.a)(),
                    ...n.components,
                };
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)(e.h2, { id: '-table-of-contents', children: '\ud83d\udcd6 Table of Contents' }),
                        '\n',
                        (0, i.jsxs)(e.admonition, {
                            type: 'note',
                            children: [
                                (0, i.jsxs)(e.p, {
                                    children: [
                                        'The API is currently configured to support only GET requests and responses from the API are only in ',
                                        (0, i.jsx)(e.code, { children: 'json' }),
                                        ' format.',
                                    ],
                                }),
                                (0, i.jsxs)(e.p, {
                                    children: [
                                        'The current rate limit is set to ',
                                        (0, i.jsx)(e.code, { children: '20 requests per hour' }),
                                        '.',
                                    ],
                                }),
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '#-table-of-contents',
                                            children: '\ud83d\udcd6 Table of Contents',
                                        }),
                                        '\n',
                                        (0, i.jsxs)(e.ul, {
                                            children: [
                                                '\n',
                                                (0, i.jsx)(e.li, {
                                                    children: (0, i.jsx)(e.a, {
                                                        href: '#-general-endpoints',
                                                        children: '\ud83d\udcc4 General Endpoints',
                                                    }),
                                                }),
                                                '\n',
                                                (0, i.jsx)(e.li, {
                                                    children: (0, i.jsx)(e.a, {
                                                        href: '#-dinosaur-endpoints',
                                                        children: '\ud83e\udd96 Dinosaur Endpoints',
                                                    }),
                                                }),
                                                '\n',
                                                (0, i.jsx)(e.li, {
                                                    children: (0, i.jsx)(e.a, {
                                                        href: '#-image-endpoints',
                                                        children: '\ud83d\udcf7 Image Endpoints',
                                                    }),
                                                }),
                                                '\n',
                                                (0, i.jsx)(e.li, {
                                                    children: (0, i.jsx)(e.a, {
                                                        href: '#openapi-specification',
                                                        children: 'OpenAPI Specification',
                                                    }),
                                                }),
                                                '\n',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(e.h3, { id: '-general-endpoints', children: '\ud83d\udcc4 General Endpoints' }),
                        '\n',
                        (0, i.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/home',
                                            children: (0, i.jsx)(e.strong, { children: 'Get main API endpoint' }),
                                        }),
                                        ': Returns the home endpoint of the API.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/clades',
                                            children: (0, i.jsx)(e.strong, { children: 'Get all dinosaur clades' }),
                                        }),
                                        ': Returns all dinosaur clades that exist within the API.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/diets',
                                            children: (0, i.jsx)(e.strong, { children: 'Get all dinosaur diets' }),
                                        }),
                                        ': Returns all dinosaur diets that exist within the API.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/locomotions',
                                            children: (0, i.jsx)(e.strong, {
                                                children: 'Get all dinosaur locomotions',
                                            }),
                                        }),
                                        ': Returns all dinosaur locomotions that exist within the API.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/names',
                                            children: (0, i.jsx)(e.strong, { children: 'Get all dinosaur names' }),
                                        }),
                                        ': Returns all dinosaur names that exist within the API.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(e.h3, { id: '-dinosaur-endpoints', children: '\ud83e\udd96 Dinosaur Endpoints' }),
                        '\n',
                        (0, i.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/allDinosaurs',
                                            children: (0, i.jsx)(e.strong, { children: 'Get all dinosaurs' }),
                                        }),
                                        ': Returns all dinosaurs within the API, 50 dinosaurs per page.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/dinosaursByID',
                                            children: (0, i.jsx)(e.strong, { children: 'Get a dinosaur by ID' }),
                                        }),
                                        ': Returns a dinosaur matching a specific id, returns an error if not found.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/dinosaursByName',
                                            children: (0, i.jsx)(e.strong, { children: 'Get a dinosaur by name' }),
                                        }),
                                        ': Returns a dinosaur matching a specific name, returns an error if not found.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/dinosaursByDiet',
                                            children: (0, i.jsx)(e.strong, { children: 'Get dinosaurs by diet' }),
                                        }),
                                        ': Returns all dinosaurs matching a specific diet.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/dinosaursByLocomotion',
                                            children: (0, i.jsx)(e.strong, { children: 'Get dinosaurs by locomotion' }),
                                        }),
                                        ': Returns all dinosaurs matching a specific locomotion type.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/randomDinosaurs',
                                            children: (0, i.jsx)(e.strong, { children: 'Get random dinosaurs' }),
                                        }),
                                        ': Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/dinosaursByQuery',
                                            children: (0, i.jsx)(e.strong, { children: 'Get dinosaurs by query' }),
                                        }),
                                        ': Returns all dinosaurs matching a specific query.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(e.h3, { id: '-image-endpoints', children: '\ud83d\udcf7 Image Endpoints' }),
                        '\n',
                        (0, i.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/allImages',
                                            children: (0, i.jsx)(e.strong, { children: 'Get all dinosaur images' }),
                                        }),
                                        ': Returns all dinosaur images within the API, 50 dinosaurs per page.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/imagesByID',
                                            children: (0, i.jsx)(e.strong, { children: 'Get a image by ID' }),
                                        }),
                                        ': Returns a dinosaur image matching a specific id, returns an error if not found.',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(e.li, {
                                    children: [
                                        (0, i.jsx)(e.a, {
                                            href: '/endpoints/randomImages',
                                            children: (0, i.jsx)(e.strong, {
                                                children: 'Get random number of dinosaur images',
                                            }),
                                        }),
                                        ': Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(e.h3, { id: 'openapi-specification', children: 'OpenAPI Specification' }),
                        '\n',
                        (0, i.jsxs)(e.p, {
                            children: [
                                'To view more details about all endpoints such as the expected responses and status codes, please take a look at the\r\n',
                                (0, i.jsx)(e.a, { href: '/api', children: 'OpenAPI Spec' }),
                                '.',
                            ],
                        }),
                    ],
                });
            }
            function h(n = {}) {
                const { wrapper: e } = { ...(0, r.a)(), ...n.components };
                return e ? (0, i.jsx)(e, { ...n, children: (0, i.jsx)(c, { ...n }) }) : c(n);
            }
        },
        1151: (n, e, s) => {
            s.d(e, { Z: () => a, a: () => o });
            var i = s(7294);
            const r = {},
                t = i.createContext(r);
            function o(n) {
                const e = i.useContext(t);
                return i.useMemo(
                    function () {
                        return 'function' == typeof n ? n(e) : { ...e, ...n };
                    },
                    [e, n],
                );
            }
            function a(n) {
                let e;
                return (
                    (e = n.disableParentContext
                        ? 'function' == typeof n.components
                            ? n.components(r)
                            : n.components || r
                        : o(n.components)),
                    i.createElement(t.Provider, { value: e }, n.children)
                );
            }
        },
    },
]);
