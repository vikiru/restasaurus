'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [278],
    {
        6104: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => d,
                    contentTitle: () => r,
                    default: () => p,
                    frontMatter: () => i,
                    metadata: () => o,
                    toc: () => l,
                });
            var t = s(5893),
                a = s(1151);
            const i = { title: 'All Images' },
                r = void 0,
                o = {
                    id: 'endpoints/allImages',
                    title: 'All Images',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/allImages.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/allImages',
                    permalink: '/restasaurus/endpoints/allImages',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'All Images' },
                    sidebar: 'docs',
                    previous: { title: 'Random Dinosaurs', permalink: '/restasaurus/endpoints/randomDinosaurs' },
                    next: { title: 'Image by ID', permalink: '/restasaurus/endpoints/imagesByID' },
                },
                d = {},
                l = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function c(e) {
                const n = {
                    code: 'code',
                    h2: 'h2',
                    img: 'img',
                    li: 'li',
                    p: 'p',
                    ul: 'ul',
                    ...(0, a.a)(),
                    ...e.components,
                };
                return (0, t.jsxs)(t.Fragment, {
                    children: [
                        (0, t.jsx)(n.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: (0, t.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/images?page={page}' }),
                        }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: 'Returns all dinosaur images within the API, 50 dinosaurs per page.',
                        }),
                        '\n',
                        (0, t.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, t.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        (0, t.jsx)(n.code, { children: 'page' }),
                                        ': The page number to retrieve, 50 dinosaur images are displayed per page.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: (0, t.jsx)(n.img, {
                                alt: 'Demo',
                                src: s(7868).Z + '',
                                width: '1815',
                                height: '935',
                            }),
                        }),
                    ],
                });
            }
            function p(e = {}) {
                const { wrapper: n } = { ...(0, a.a)(), ...e.components };
                return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(c, { ...e }) }) : c(e);
            }
        },
        7868: (e, n, s) => {
            s.d(n, { Z: () => t });
            const t = s.p + 'assets/images/allImages-daf8db26545adbb473df747e3e2e9765.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => o, a: () => r });
            var t = s(7294);
            const a = {},
                i = t.createContext(a);
            function r(e) {
                const n = t.useContext(i);
                return t.useMemo(
                    function () {
                        return 'function' == typeof e ? e(n) : { ...n, ...e };
                    },
                    [n, e],
                );
            }
            function o(e) {
                let n;
                return (
                    (n = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(a)
                            : e.components || a
                        : r(e.components)),
                    t.createElement(i.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
