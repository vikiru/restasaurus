'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [362],
    {
        77: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => d,
                    contentTitle: () => o,
                    default: () => l,
                    frontMatter: () => r,
                    metadata: () => a,
                    toc: () => c,
                });
            var t = s(5893),
                i = s(1151);
            const r = { title: 'Dinosaurs by Name' },
                o = void 0,
                a = {
                    id: 'endpoints/dinosaursByName',
                    title: 'Dinosaurs by Name',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/dinosaursByName.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/dinosaursByName',
                    permalink: '/restasaurus/endpoints/dinosaursByName',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Dinosaurs by Name' },
                    sidebar: 'docs',
                    previous: { title: 'Dinosaurs by ID', permalink: '/restasaurus/endpoints/dinosaursByID' },
                    next: { title: 'Dinosaurs by Diet', permalink: '/restasaurus/endpoints/dinosaursByDiet' },
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
                    ...(0, i.a)(),
                    ...e.components,
                };
                return (0, t.jsxs)(t.Fragment, {
                    children: [
                        (0, t.jsx)(n.h2, {
                            id: 'api-endpoints-and-description',
                            children: 'API Endpoints and Description',
                        }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: (0, t.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/dinosaurs/{name}' }),
                        }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: 'Returns a dinosaur matching a specific name, returns an error if not found.',
                        }),
                        '\n',
                        (0, t.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, t.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        (0, t.jsx)(n.code, { children: 'name' }),
                                        ': The name corresponding to the dinosaur you wish to retrieve.',
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
                                src: s(1635).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(u, { ...e }) }) : u(e);
            }
        },
        1635: (e, n, s) => {
            s.d(n, { Z: () => t });
            const t = s.p + 'assets/images/dinosaursByName-e0af9fb8635ea2f3dc777446d47d8012.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => a, a: () => o });
            var t = s(7294);
            const i = {},
                r = t.createContext(i);
            function o(e) {
                const n = t.useContext(r);
                return t.useMemo(
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
                            ? e.components(i)
                            : e.components || i
                        : o(e.components)),
                    t.createElement(r.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
