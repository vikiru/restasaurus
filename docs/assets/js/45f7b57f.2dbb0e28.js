'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [181],
    {
        8592: (e, t, n) => {
            n.r(t),
                n.d(t, {
                    assets: () => a,
                    contentTitle: () => r,
                    default: () => l,
                    frontMatter: () => o,
                    metadata: () => d,
                    toc: () => c,
                });
            var s = n(5893),
                i = n(1151);
            const o = { title: 'Diets' },
                r = void 0,
                d = {
                    id: 'endpoints/diets',
                    title: 'Diets',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/diets.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/diets',
                    permalink: '/restasaurus/endpoints/diets',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Diets' },
                    sidebar: 'docs',
                    previous: { title: 'Clades', permalink: '/restasaurus/endpoints/clades' },
                    next: { title: 'Locomotions', permalink: '/restasaurus/endpoints/locomotions' },
                },
                a = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function p(e) {
                const t = { code: 'code', h2: 'h2', img: 'img', p: 'p', ...(0, i.a)(), ...e.components };
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(t.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, s.jsx)(t.p, { children: (0, s.jsx)(t.code, { children: 'GET {baseUrl}/api/v1/diets' }) }),
                        '\n',
                        (0, s.jsx)(t.p, { children: 'Returns all dinosaur diets that exist within the API.' }),
                        '\n',
                        (0, s.jsx)(t.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, s.jsx)(t.p, { children: 'No parameters are required for this endpoint.' }),
                        '\n',
                        (0, s.jsx)(t.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, s.jsx)(t.p, {
                            children: (0, s.jsx)(t.img, {
                                alt: 'Demo',
                                src: n(7396).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: t } = { ...(0, i.a)(), ...e.components };
                return t ? (0, s.jsx)(t, { ...e, children: (0, s.jsx)(p, { ...e }) }) : p(e);
            }
        },
        7396: (e, t, n) => {
            n.d(t, { Z: () => s });
            const s = n.p + 'assets/images/diets-dc66a6affa8b92e5c9bba331402ded3d.gif';
        },
        1151: (e, t, n) => {
            n.d(t, { Z: () => d, a: () => r });
            var s = n(7294);
            const i = {},
                o = s.createContext(i);
            function r(e) {
                const t = s.useContext(o);
                return s.useMemo(
                    function () {
                        return 'function' == typeof e ? e(t) : { ...t, ...e };
                    },
                    [t, e],
                );
            }
            function d(e) {
                let t;
                return (
                    (t = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(i)
                            : e.components || i
                        : r(e.components)),
                    s.createElement(o.Provider, { value: t }, e.children)
                );
            }
        },
    },
]);
