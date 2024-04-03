'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [829],
    {
        7816: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => d,
                    contentTitle: () => a,
                    default: () => u,
                    frontMatter: () => r,
                    metadata: () => o,
                    toc: () => l,
                });
            var t = s(5893),
                i = s(1151);
            const r = { title: 'All Dinosaurs' },
                a = void 0,
                o = {
                    id: 'endpoints/allDinosaurs',
                    title: 'All Dinosaurs',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/allDinosaurs.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/allDinosaurs',
                    permalink: '/restasaurus/endpoints/allDinosaurs',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'All Dinosaurs' },
                    sidebar: 'docs',
                    previous: { title: 'Names', permalink: '/restasaurus/endpoints/names' },
                    next: { title: 'Dinosaurs by ID', permalink: '/restasaurus/endpoints/dinosaursByID' },
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
                    ...(0, i.a)(),
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
                            children: (0, t.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/dinosaurs?page={page}' }),
                        }),
                        '\n',
                        (0, t.jsx)(n.p, { children: 'Returns all dinosaurs within the API, 50 dinosaurs per page.' }),
                        '\n',
                        (0, t.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, t.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        (0, t.jsx)(n.code, { children: 'page' }),
                                        ': The page number to retrieve, 50 dinosaurs are displayed per page.',
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
                                src: s(9290).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function u(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(c, { ...e }) }) : c(e);
            }
        },
        9290: (e, n, s) => {
            s.d(n, { Z: () => t });
            const t = s.p + 'assets/images/allDinosaurs-3d6b9f991aa2d1992525294f2857792c.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => o, a: () => a });
            var t = s(7294);
            const i = {},
                r = t.createContext(i);
            function a(e) {
                const n = t.useContext(r);
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
                            ? e.components(i)
                            : e.components || i
                        : a(e.components)),
                    t.createElement(r.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
