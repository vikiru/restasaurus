'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [115],
    {
        2486: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => t,
                    contentTitle: () => d,
                    default: () => h,
                    frontMatter: () => r,
                    metadata: () => c,
                    toc: () => a,
                });
            var i = s(5893),
                o = s(1151);
            const r = { title: 'Dinosaurs by Query' },
                d = void 0,
                c = {
                    id: 'endpoints/dinosaursByQuery',
                    title: 'Dinosaurs by Query',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/dinosaursByQuery.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/dinosaursByQuery',
                    permalink: '/restasaurus/endpoints/dinosaursByQuery',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Dinosaurs by Query' },
                    sidebar: 'docs',
                    previous: {
                        title: 'Dinosaurs by Locomotion',
                        permalink: '/restasaurus/endpoints/dinosaursByLocomotion',
                    },
                    next: { title: 'Random Dinosaurs', permalink: '/restasaurus/endpoints/randomDinosaurs' },
                },
                t = {},
                a = [
                    { value: 'API Endpoints and Description', id: 'api-endpoints-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function l(e) {
                const n = {
                    code: 'code',
                    h2: 'h2',
                    img: 'img',
                    li: 'li',
                    ol: 'ol',
                    p: 'p',
                    strong: 'strong',
                    ul: 'ul',
                    ...(0, o.a)(),
                    ...e.components,
                };
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)(n.h2, {
                            id: 'api-endpoints-and-description',
                            children: 'API Endpoints and Description',
                        }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children: (0, i.jsx)(n.code, {
                                children:
                                    'GET {baseUrl}/api/v1/search?clade={clade}&diet={diet}&locomotion={locomotion}',
                            }),
                        }),
                        '\n',
                        (0, i.jsx)(n.p, { children: 'Returns all dinosaurs matching a specific query.' }),
                        '\n',
                        (0, i.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children:
                                'All parameters are optional, however, if no parameters are passed to the API then an error message will be returned as a response.',
                        }),
                        '\n',
                        (0, i.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(n.li, {
                                    children: [
                                        '\n',
                                        (0, i.jsxs)(n.p, {
                                            children: [
                                                (0, i.jsx)(n.code, { children: 'clade' }),
                                                ': The group that the dinosaur belongs to within its classification. This can be passed in various ways:',
                                            ],
                                        }),
                                        '\n',
                                        (0, i.jsxs)(n.ol, {
                                            children: [
                                                '\n',
                                                (0, i.jsx)(n.li, {
                                                    children: (0, i.jsx)(n.code, {
                                                        children: 'GET {baseUrl}/api/v1/search?clade=clade1,clade2',
                                                    }),
                                                }),
                                                '\n',
                                                (0, i.jsx)(n.li, {
                                                    children: (0, i.jsx)(n.code, {
                                                        children:
                                                            'GET {baseUrl}/api/v1/search?clade=clade1&clade=clade2',
                                                    }),
                                                }),
                                                '\n',
                                            ],
                                        }),
                                        '\n',
                                        (0, i.jsxs)(n.p, {
                                            children: [
                                                (0, i.jsx)(n.strong, { children: 'NOTE' }),
                                                ': The result will contain dinosaurs that belong to ',
                                                (0, i.jsx)(n.strong, { children: 'any' }),
                                                ' of the clades passed via this endpoint. Some of these clades\r\nmay conflict with diet and locomotion if they are provided as well (i.e. passing ',
                                                (0, i.jsx)(n.code, { children: 'Theropoda' }),
                                                ' as a clade, with ',
                                                (0, i.jsx)(n.code, { children: 'herbivore' }),
                                                ' as a diet wont work as ',
                                                (0, i.jsx)(n.code, { children: 'Theropoda' }),
                                                ' consists of carnivores.)',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(n.li, {
                                    children: [
                                        '\n',
                                        (0, i.jsxs)(n.p, {
                                            children: [
                                                (0, i.jsx)(n.code, { children: 'diet' }),
                                                ': The diet of the dinosaurs you wish to retrieve.',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                                (0, i.jsxs)(n.li, {
                                    children: [
                                        '\n',
                                        (0, i.jsxs)(n.p, {
                                            children: [
                                                (0, i.jsx)(n.code, { children: 'locomotion' }),
                                                ': The locomotion of the dinosaurs you wish to retrieve.',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(n.p, {
                            children: [
                                'Example ',
                                (0, i.jsx)(n.code, { children: 'clade' }),
                                ' include: ',
                                (0, i.jsx)(n.code, { children: 'Therapoda' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'Sauropodamorpha' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'Ornithischia' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'Thyreophora' }),
                                ', etc.',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(n.p, {
                            children: [
                                'Example ',
                                (0, i.jsx)(n.code, { children: 'diet' }),
                                ' include: ',
                                (0, i.jsx)(n.code, { children: 'herbivore' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'carnivore' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'omnivore' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'piscivore' }),
                                ', etc.',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(n.p, {
                            children: [
                                'Example ',
                                (0, i.jsx)(n.code, { children: 'locomotion' }),
                                ' include: ',
                                (0, i.jsx)(n.code, { children: 'biped' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'quadruped' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'facultative biped' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'gliding' }),
                                ', ',
                                (0, i.jsx)(n.code, { children: 'swimming' }),
                                ', etc.',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children: (0, i.jsx)(n.img, {
                                alt: 'Demo',
                                src: s(7076).Z + '',
                                width: '1815',
                                height: '935',
                            }),
                        }),
                    ],
                });
            }
            function h(e = {}) {
                const { wrapper: n } = { ...(0, o.a)(), ...e.components };
                return n ? (0, i.jsx)(n, { ...e, children: (0, i.jsx)(l, { ...e }) }) : l(e);
            }
        },
        7076: (e, n, s) => {
            s.d(n, { Z: () => i });
            const i = s.p + 'assets/images/dinosaurByQuery-fa5abd86b70beddb01712366d5da055c.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => c, a: () => d });
            var i = s(7294);
            const o = {},
                r = i.createContext(o);
            function d(e) {
                const n = i.useContext(r);
                return i.useMemo(
                    function () {
                        return 'function' == typeof e ? e(n) : { ...n, ...e };
                    },
                    [n, e],
                );
            }
            function c(e) {
                let n;
                return (
                    (n = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(o)
                            : e.components || o
                        : d(e.components)),
                    i.createElement(r.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
