'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [458],
    {
        3750: (e, n, t) => {
            t.r(n),
                t.d(n, {
                    assets: () => d,
                    contentTitle: () => r,
                    default: () => l,
                    frontMatter: () => o,
                    metadata: () => a,
                    toc: () => c,
                });
            var s = t(5893),
                i = t(1151);
            const o = { title: 'Names' },
                r = void 0,
                a = {
                    id: 'endpoints/names',
                    title: 'Names',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/names.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/names',
                    permalink: '/restasaurus/endpoints/names',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Names' },
                    sidebar: 'docs',
                    previous: { title: 'Locomotions', permalink: '/restasaurus/endpoints/locomotions' },
                    next: { title: 'All Dinosaurs', permalink: '/restasaurus/endpoints/allDinosaurs' },
                },
                d = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function p(e) {
                const n = { code: 'code', h2: 'h2', img: 'img', p: 'p', ...(0, i.a)(), ...e.components };
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(n.h2, {
                            id: 'api-endpoint-and-description',
                            children: 'API Endpoint and Description',
                        }),
                        '\n',
                        (0, s.jsx)(n.p, { children: (0, s.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/names' }) }),
                        '\n',
                        (0, s.jsx)(n.p, { children: 'Returns all dinosaur names that exist within the API.' }),
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
                                src: t(1415).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(p, { ...e }) }) : p(e);
            }
        },
        1415: (e, n, t) => {
            t.d(n, { Z: () => s });
            const s = t.p + 'assets/images/names-7617830ef8d42bcc8a56ab6c18038a92.gif';
        },
        1151: (e, n, t) => {
            t.d(n, { Z: () => a, a: () => r });
            var s = t(7294);
            const i = {},
                o = s.createContext(i);
            function r(e) {
                const n = s.useContext(o);
                return s.useMemo(
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
                        : r(e.components)),
                    s.createElement(o.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
