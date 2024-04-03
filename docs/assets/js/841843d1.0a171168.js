'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [492],
    {
        6115: (e, n, t) => {
            t.r(n),
                t.d(n, {
                    assets: () => d,
                    contentTitle: () => a,
                    default: () => u,
                    frontMatter: () => r,
                    metadata: () => o,
                    toc: () => c,
                });
            var s = t(5893),
                i = t(1151);
            const r = { title: 'Image by ID' },
                a = void 0,
                o = {
                    id: 'endpoints/imagesByID',
                    title: 'Image by ID',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/imagesByID.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/imagesByID',
                    permalink: '/restasaurus/endpoints/imagesByID',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Image by ID' },
                    sidebar: 'docs',
                    previous: { title: 'All Images', permalink: '/restasaurus/endpoints/allImages' },
                    next: { title: 'Random Images', permalink: '/restasaurus/endpoints/randomImages' },
                },
                d = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function l(e) {
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
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(n.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: (0, s.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/images/{id}' }),
                        }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: 'Returns a dinosaur image matching a specific id, returns an error if not found.',
                        }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, s.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, s.jsxs)(n.li, {
                                    children: [
                                        (0, s.jsx)(n.code, { children: 'id' }),
                                        ': The id corresponding to the dinosaur image you wish to retrieve. Must be an integer between ',
                                        (0, s.jsx)(n.code, { children: '1' }),
                                        ' and ',
                                        (0, s.jsx)(n.code, { children: '1153' }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: (0, s.jsx)(n.img, {
                                alt: 'Demo',
                                src: t(6885).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function u(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(l, { ...e }) }) : l(e);
            }
        },
        6885: (e, n, t) => {
            t.d(n, { Z: () => s });
            const s = t.p + 'assets/images/imagesByID-a15b06342b35063b2c2cf45d37533ef3.gif';
        },
        1151: (e, n, t) => {
            t.d(n, { Z: () => o, a: () => a });
            var s = t(7294);
            const i = {},
                r = s.createContext(i);
            function a(e) {
                const n = s.useContext(r);
                return s.useMemo(
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
                    s.createElement(r.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
