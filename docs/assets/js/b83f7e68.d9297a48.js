'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [899],
    {
        1049: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => a,
                    contentTitle: () => r,
                    default: () => l,
                    frontMatter: () => o,
                    metadata: () => d,
                    toc: () => c,
                });
            var i = s(5893),
                t = s(1151);
            const o = { title: 'Dinosaurs by Diet' },
                r = void 0,
                d = {
                    id: 'endpoints/dinosaursByDiet',
                    title: 'Dinosaurs by Diet',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/dinosaursByDiet.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/dinosaursByDiet',
                    permalink: '/restasaurus/endpoints/dinosaursByDiet',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Dinosaurs by Diet' },
                    sidebar: 'docs',
                    previous: { title: 'Dinosaurs by Name', permalink: '/restasaurus/endpoints/dinosaursByName' },
                    next: {
                        title: 'Dinosaurs by Locomotion',
                        permalink: '/restasaurus/endpoints/dinosaursByLocomotion',
                    },
                },
                a = {},
                c = [
                    { value: 'API Endpoints and Description', id: 'api-endpoints-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function u(e) {
                const n = {
                    code: 'code',
                    h2: 'h2',
                    img: 'img',
                    li: 'li',
                    p: 'p',
                    ul: 'ul',
                    ...(0, t.a)(),
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
                            children: (0, i.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/dinosaurs/{diet}' }),
                        }),
                        '\n',
                        (0, i.jsx)(n.p, { children: 'Returns all dinosaurs matching a specific diet.' }),
                        '\n',
                        (0, i.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, i.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(n.li, {
                                    children: [
                                        (0, i.jsx)(n.code, { children: 'diet' }),
                                        ': The diet of the dinosaurs you wish to retrieve.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsxs)(n.p, {
                            children: [
                                'Examples include: ',
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
                        (0, i.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children: (0, i.jsx)(n.img, {
                                alt: 'Demo',
                                src: s(8956).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: n } = { ...(0, t.a)(), ...e.components };
                return n ? (0, i.jsx)(n, { ...e, children: (0, i.jsx)(u, { ...e }) }) : u(e);
            }
        },
        8956: (e, n, s) => {
            s.d(n, { Z: () => i });
            const i = s.p + 'assets/images/dinosaursByDiet-d8d334c91f083481cac041f55c2c0da8.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => d, a: () => r });
            var i = s(7294);
            const t = {},
                o = i.createContext(t);
            function r(e) {
                const n = i.useContext(o);
                return i.useMemo(
                    function () {
                        return 'function' == typeof e ? e(n) : { ...n, ...e };
                    },
                    [n, e],
                );
            }
            function d(e) {
                let n;
                return (
                    (n = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(t)
                            : e.components || t
                        : r(e.components)),
                    i.createElement(o.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
