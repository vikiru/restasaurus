'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [57],
    {
        8560: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => d,
                    contentTitle: () => o,
                    default: () => l,
                    frontMatter: () => r,
                    metadata: () => a,
                    toc: () => c,
                });
            var i = s(5893),
                t = s(1151);
            const r = { title: 'Dinosaurs by ID' },
                o = void 0,
                a = {
                    id: 'endpoints/dinosaursByID',
                    title: 'Dinosaurs by ID',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/dinosaursByID.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/dinosaursByID',
                    permalink: '/restasaurus/endpoints/dinosaursByID',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Dinosaurs by ID' },
                    sidebar: 'docs',
                    previous: { title: 'All Dinosaurs', permalink: '/restasaurus/endpoints/allDinosaurs' },
                    next: { title: 'Dinosaurs by Name', permalink: '/restasaurus/endpoints/dinosaursByName' },
                },
                d = {},
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
                            children: (0, i.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/dinosaurs/{id}' }),
                        }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children: 'Returns a dinosaur matching a specific id, returns an error if not found.',
                        }),
                        '\n',
                        (0, i.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, i.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, i.jsxs)(n.li, {
                                    children: [
                                        (0, i.jsx)(n.code, { children: 'id' }),
                                        ': The id corresponding to the dinosaur you wish to retrieve. Must be an integer between ',
                                        (0, i.jsx)(n.code, { children: '1' }),
                                        ' and ',
                                        (0, i.jsx)(n.code, { children: '1153' }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, i.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, i.jsx)(n.p, {
                            children: (0, i.jsx)(n.img, {
                                alt: 'Demo',
                                src: s(6871).Z + '',
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
        6871: (e, n, s) => {
            s.d(n, { Z: () => i });
            const i = s.p + 'assets/images/dinosaursByID-66415a8252add49a1d193494d6fb0655.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => a, a: () => o });
            var i = s(7294);
            const t = {},
                r = i.createContext(t);
            function o(e) {
                const n = i.useContext(r);
                return i.useMemo(
                    function () {
                        return 'function' == typeof e ? e(n) : { ...n, ...e };
                    },
                    [n, e],
                );
            }
            function a(e) {
                let n;
                return (
                    (n = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(t)
                            : e.components || t
                        : o(e.components)),
                    i.createElement(r.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
