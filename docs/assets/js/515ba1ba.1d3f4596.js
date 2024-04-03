'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [577],
    {
        5917: (e, n, t) => {
            t.r(n),
                t.d(n, {
                    assets: () => a,
                    contentTitle: () => r,
                    default: () => l,
                    frontMatter: () => i,
                    metadata: () => d,
                    toc: () => c,
                });
            var s = t(5893),
                o = t(1151);
            const i = { title: 'Home' },
                r = void 0,
                d = {
                    id: 'endpoints/home',
                    title: 'Home',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/home.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/home',
                    permalink: '/restasaurus/endpoints/home',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Home' },
                    sidebar: 'docs',
                    previous: { title: 'Endpoint Overview', permalink: '/restasaurus/overview' },
                    next: { title: 'Clades', permalink: '/restasaurus/endpoints/clades' },
                },
                a = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function p(e) {
                const n = { code: 'code', h2: 'h2', img: 'img', p: 'p', ...(0, o.a)(), ...e.components };
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(n.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, s.jsx)(n.p, { children: (0, s.jsx)(n.code, { children: 'GET {baseUrl}/api/v1' }) }),
                        '\n',
                        (0, s.jsx)(n.p, { children: 'Returns the home endpoint of the API.' }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, s.jsx)(n.p, { children: 'No parameters are required for this endpoint.' }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: (0, s.jsx)(n.img, {
                                alt: 'Demo',
                                src: t(1830).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: n } = { ...(0, o.a)(), ...e.components };
                return n ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(p, { ...e }) }) : p(e);
            }
        },
        1830: (e, n, t) => {
            t.d(n, { Z: () => s });
            const s = t.p + 'assets/images/home-fe79c4c8d23d10e7995da2873b279182.gif';
        },
        1151: (e, n, t) => {
            t.d(n, { Z: () => d, a: () => r });
            var s = t(7294);
            const o = {},
                i = s.createContext(o);
            function r(e) {
                const n = s.useContext(i);
                return s.useMemo(
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
                            ? e.components(o)
                            : e.components || o
                        : r(e.components)),
                    s.createElement(i.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
