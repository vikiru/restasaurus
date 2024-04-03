'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [224],
    {
        2722: (e, n, t) => {
            t.r(n),
                t.d(n, {
                    assets: () => d,
                    contentTitle: () => r,
                    default: () => p,
                    frontMatter: () => i,
                    metadata: () => a,
                    toc: () => c,
                });
            var o = t(5893),
                s = t(1151);
            const i = { title: 'Locomotions' },
                r = void 0,
                a = {
                    id: 'endpoints/locomotions',
                    title: 'Locomotions',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/locomotions.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/locomotions',
                    permalink: '/restasaurus/endpoints/locomotions',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Locomotions' },
                    sidebar: 'docs',
                    previous: { title: 'Diets', permalink: '/restasaurus/endpoints/diets' },
                    next: { title: 'Names', permalink: '/restasaurus/endpoints/names' },
                },
                d = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function l(e) {
                const n = { code: 'code', h2: 'h2', img: 'img', p: 'p', ...(0, s.a)(), ...e.components };
                return (0, o.jsxs)(o.Fragment, {
                    children: [
                        (0, o.jsx)(n.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, o.jsx)(n.p, {
                            children: (0, o.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/locomotions' }),
                        }),
                        '\n',
                        (0, o.jsx)(n.p, { children: 'Returns all dinosaur locomotions that exist within the API.' }),
                        '\n',
                        (0, o.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, o.jsx)(n.p, { children: 'No parameters are required for this endpoint.' }),
                        '\n',
                        (0, o.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, o.jsx)(n.p, {
                            children: (0, o.jsx)(n.img, {
                                alt: 'Demo',
                                src: t(6658).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function p(e = {}) {
                const { wrapper: n } = { ...(0, s.a)(), ...e.components };
                return n ? (0, o.jsx)(n, { ...e, children: (0, o.jsx)(l, { ...e }) }) : l(e);
            }
        },
        6658: (e, n, t) => {
            t.d(n, { Z: () => o });
            const o = t.p + 'assets/images/locomotions-b2397b49929f67306b77d5b4b1bd0e39.gif';
        },
        1151: (e, n, t) => {
            t.d(n, { Z: () => a, a: () => r });
            var o = t(7294);
            const s = {},
                i = o.createContext(s);
            function r(e) {
                const n = o.useContext(i);
                return o.useMemo(
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
                            ? e.components(s)
                            : e.components || s
                        : r(e.components)),
                    o.createElement(i.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
