'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [539],
    {
        7946: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => d,
                    contentTitle: () => r,
                    default: () => u,
                    frontMatter: () => a,
                    metadata: () => o,
                    toc: () => c,
                });
            var t = s(5893),
                i = s(1151);
            const a = { title: 'Random Images' },
                r = void 0,
                o = {
                    id: 'endpoints/randomImages',
                    title: 'Random Images',
                    description: 'API Endpoint and Description',
                    source: '@site/docs/endpoints/randomImages.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/randomImages',
                    permalink: '/restasaurus/endpoints/randomImages',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Random Images' },
                    sidebar: 'docs',
                    previous: { title: 'Image by ID', permalink: '/restasaurus/endpoints/imagesByID' },
                    next: { title: '\ud83d\udee0\ufe0f Tech Stack', permalink: '/restasaurus/stack' },
                },
                d = {},
                c = [
                    { value: 'API Endpoint and Description', id: 'api-endpoint-and-description', level: 2 },
                    { value: 'Parameters', id: 'parameters', level: 2 },
                    { value: 'Demo', id: 'demo', level: 2 },
                ];
            function m(e) {
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
                            children: (0, t.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/images/random/{count}' }),
                        }),
                        '\n',
                        (0, t.jsx)(n.p, {
                            children: 'Returns a random number of dinosaur images. Minimum of 1 and maximum of 10.',
                        }),
                        '\n',
                        (0, t.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, t.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        (0, t.jsx)(n.code, { children: 'count' }),
                                        ': The number of random dinosaur images you wish to retrieve. Must be a valid integer between ',
                                        (0, t.jsx)(n.code, { children: '1' }),
                                        ' and including ',
                                        (0, t.jsx)(n.code, { children: '10' }),
                                        '.',
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
                                src: s(9227).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function u(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(m, { ...e }) }) : m(e);
            }
        },
        9227: (e, n, s) => {
            s.d(n, { Z: () => t });
            const t = s.p + 'assets/images/randomImages-6b489897114beb6a78dc346057cd35d0.gif';
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => o, a: () => r });
            var t = s(7294);
            const i = {},
                a = t.createContext(i);
            function r(e) {
                const n = t.useContext(a);
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
                        : r(e.components)),
                    t.createElement(a.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
