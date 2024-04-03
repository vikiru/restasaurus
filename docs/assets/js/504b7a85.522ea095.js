'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [451],
    {
        4884: (e, n, o) => {
            o.r(n),
                o.d(n, {
                    assets: () => a,
                    contentTitle: () => r,
                    default: () => l,
                    frontMatter: () => t,
                    metadata: () => d,
                    toc: () => c,
                });
            var s = o(5893),
                i = o(1151);
            const t = { title: 'Dinosaurs by Locomotion' },
                r = void 0,
                d = {
                    id: 'endpoints/dinosaursByLocomotion',
                    title: 'Dinosaurs by Locomotion',
                    description: 'API Endpoints and Description',
                    source: '@site/docs/endpoints/dinosaursByLocomotion.md',
                    sourceDirName: 'endpoints',
                    slug: '/endpoints/dinosaursByLocomotion',
                    permalink: '/restasaurus/endpoints/dinosaursByLocomotion',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: 'Dinosaurs by Locomotion' },
                    sidebar: 'docs',
                    previous: { title: 'Dinosaurs by Diet', permalink: '/restasaurus/endpoints/dinosaursByDiet' },
                    next: { title: 'Dinosaurs by Query', permalink: '/restasaurus/endpoints/dinosaursByQuery' },
                },
                a = {},
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
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(n.h2, {
                            id: 'api-endpoints-and-description',
                            children: 'API Endpoints and Description',
                        }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: (0, s.jsx)(n.code, { children: 'GET {baseUrl}/api/v1/dinosaurs/{locomotion}' }),
                        }),
                        '\n',
                        (0, s.jsx)(n.p, { children: 'Returns all dinosaurs matching a specific locomotion type.' }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'parameters', children: 'Parameters' }),
                        '\n',
                        (0, s.jsxs)(n.ul, {
                            children: [
                                '\n',
                                (0, s.jsxs)(n.li, {
                                    children: [
                                        (0, s.jsx)(n.code, { children: 'locomotion' }),
                                        ': The locomotion of the dinosaurs you wish to retrieve.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, s.jsxs)(n.p, {
                            children: [
                                'Examples include: ',
                                (0, s.jsx)(n.code, { children: 'biped' }),
                                ', ',
                                (0, s.jsx)(n.code, { children: 'quadruped' }),
                                ', ',
                                (0, s.jsx)(n.code, { children: 'facultative biped' }),
                                ', ',
                                (0, s.jsx)(n.code, { children: 'gliding' }),
                                ', ',
                                (0, s.jsx)(n.code, { children: 'swimming' }),
                                ', etc.',
                            ],
                        }),
                        '\n',
                        (0, s.jsx)(n.h2, { id: 'demo', children: 'Demo' }),
                        '\n',
                        (0, s.jsx)(n.p, {
                            children: (0, s.jsx)(n.img, {
                                alt: 'Demo',
                                src: o(6844).Z + '',
                                width: '1815',
                                height: '950',
                            }),
                        }),
                    ],
                });
            }
            function l(e = {}) {
                const { wrapper: n } = { ...(0, i.a)(), ...e.components };
                return n ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(u, { ...e }) }) : u(e);
            }
        },
        6844: (e, n, o) => {
            o.d(n, { Z: () => s });
            const s = o.p + 'assets/images/dinosaursByLocomotion-a76ab1a80eed1dd0f174d82ca43e4d65.gif';
        },
        1151: (e, n, o) => {
            o.d(n, { Z: () => d, a: () => r });
            var s = o(7294);
            const i = {},
                t = s.createContext(i);
            function r(e) {
                const n = s.useContext(t);
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
                            ? e.components(i)
                            : e.components || i
                        : r(e.components)),
                    s.createElement(t.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
