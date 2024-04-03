'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [684],
    {
        623: (n, e, s) => {
            s.r(e),
                s.d(e, {
                    assets: () => d,
                    contentTitle: () => o,
                    default: () => l,
                    frontMatter: () => i,
                    metadata: () => a,
                    toc: () => u,
                });
            var r = s(5893),
                t = s(1151);
            const i = { title: 'Random Dinosaurs' },
                o = void 0,
                a = {
                    id: 'endpoints/randomDinosaurs',
                    title: 'Random Dinosaurs',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/randomDinosaurs.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/randomDinosaurs',
                    permalink: '/restasaurus/endpoints/randomDinosaurs',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Random Dinosaurs' },
                    sidebar: 'docs',
                    previous: { title: 'Dinosaurs by Query', permalink: '/restasaurus/endpoints/dinosaursByQuery' },
                    next: { title: 'All Images', permalink: '/restasaurus/endpoints/allImages' },
                },
                d = {},
                u = [
                    { value: 'API Endpoints and Description', id: 'api-endpoints-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function c(n) {
                const e = {
                    code: 'code',
                    h2: 'h2',
                    img: 'img',
                    li: 'li',
                    p: 'p',
                    ul: 'ul',
                    ...(0, t.a)(),
                    ...n.components,
                };
                return (0, r.jsxs)(r.Fragment, {
                    children: [
                        (0, r.jsx)(e.h2, {
                            id: 'api-endpoints-and-description',
                            children: 'API Endpoints and Description',
                        }),
                        '\n',
                        (0, r.jsx)(e.p, {
                            children: (0, r.jsx)(e.code, { children: 'GET {baseUrl}/api/v1/dinosaurs/random/{count}' }),
                        }),
                        '\n',
                        (0, r.jsx)(e.p, {
                            children: 'Returns a random number of dinosaurs. Minimum of 1 and maximum of 10.',
                        }),
                        '\n',
                        (0, r.jsx)(e.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, r.jsxs)(e.ul, {
                            children: [
                                '\n',
                                (0, r.jsxs)(e.li, {
                                    children: [
                                        (0, r.jsx)(e.code, { children: 'count' }),
                                        ': The number of random dinosaurs you wish to retrieve. Must be a valid\r\ninteger between ',
                                        (0, r.jsx)(e.code, { children: '1' }),
                                        ' and including ',
                                        (0, r.jsx)(e.code, { children: '10' }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, r.jsx)(e.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, r.jsx)(e.p, {
                            children: (0, r.jsx)(e.img, {
                                alt: 'Demo',
                                src: s(5039).Z + '',
                                width: '1815',
                                height: '935',
                            }),
                        }),
                    ],
                });
            }
            function l(n = {}) {
                const { wrapper: e } = { ...(0, t.a)(), ...n.components };
                return e ? (0, r.jsx)(e, { ...n, children: (0, r.jsx)(c, { ...n }) }) : c(n);
            }
        },
        5039: (n, e, s) => {
            s.d(e, { Z: () => r });
            const r = s.p + 'assets/images/randomDinosaurs-51bb7944612b436c109ab28565ab48b8.gif';
        },
        1151: (n, e, s) => {
            s.d(e, { Z: () => a, a: () => o });
            var r = s(7294);
            const t = {},
                i = r.createContext(t);
            function o(n) {
                const e = r.useContext(i);
                return r.useMemo(
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
                            ? n.components(t)
                            : n.components || t
                        : o(n.components)),
                    r.createElement(i.Provider, { value: e }, n.children)
                );
            }
        },
    },
]);
