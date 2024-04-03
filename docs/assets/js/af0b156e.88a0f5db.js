'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [10],
    {
        4958: (e, s, t) => {
            t.r(s),
                t.d(s, {
                    assets: () => c,
                    contentTitle: () => o,
                    default: () => d,
                    frontMatter: () => i,
                    metadata: () => u,
                    toc: () => l,
                });
            var r = t(5893),
                n = t(1151);
            const i = { id: 'prerequisites', title: '\ud83d\udcdd Prerequisites' },
                o = void 0,
                u = {
                    id: 'prerequisites',
                    title: '\ud83d\udcdd Prerequisites',
                    description: '\ud83d\udcdd Prerequisites',
                    source: '@site/docs/prerequisites.md',
                    sourceDirName: '.',
                    slug: '/prerequisites',
                    permalink: '/restasaurus/prerequisites',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { id: 'prerequisites', title: '\ud83d\udcdd Prerequisites' },
                    sidebar: 'docs',
                    previous: { title: '\ud83d\udcd6 Introduction', permalink: '/restasaurus/' },
                    next: { title: '\u26a1 Setup', permalink: '/restasaurus/setup' },
                },
                c = {},
                l = [{ value: '\ud83d\udcdd Prerequisites', id: '-prerequisites', level: 2 }];
            function a(e) {
                const s = { a: 'a', h2: 'h2', li: 'li', p: 'p', ul: 'ul', ...(0, n.a)(), ...e.components };
                return (0, r.jsxs)(r.Fragment, {
                    children: [
                        (0, r.jsx)(s.h2, { id: '-prerequisites', children: '\ud83d\udcdd Prerequisites' }),
                        '\n',
                        (0, r.jsxs)(s.p, {
                            children: [
                                'Ensure that the following dependencies are installed onto your machine by following the ',
                                (0, r.jsx)(s.a, { href: '/setup', children: 'Setup Instructions' }),
                                '.',
                            ],
                        }),
                        '\n',
                        (0, r.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, r.jsx)(s.li, {
                                    children: (0, r.jsx)(s.a, {
                                        href: 'https://nodejs.org/en/download',
                                        children: 'Node.js',
                                    }),
                                }),
                                '\n',
                                (0, r.jsx)(s.li, {
                                    children: (0, r.jsx)(s.a, {
                                        href: 'https://expressjs.com/en/starter/installing.html',
                                        children: 'Express',
                                    }),
                                }),
                                '\n',
                                (0, r.jsx)(s.li, {
                                    children: (0, r.jsx)(s.a, {
                                        href: 'https://www.mongodb.com/',
                                        children: 'MongoDB',
                                    }),
                                }),
                                '\n',
                                (0, r.jsx)(s.li, {
                                    children: (0, r.jsx)(s.a, {
                                        href: 'https://mongoosejs.com/',
                                        children: 'Mongoose',
                                    }),
                                }),
                                '\n',
                            ],
                        }),
                    ],
                });
            }
            function d(e = {}) {
                const { wrapper: s } = { ...(0, n.a)(), ...e.components };
                return s ? (0, r.jsx)(s, { ...e, children: (0, r.jsx)(a, { ...e }) }) : a(e);
            }
        },
        1151: (e, s, t) => {
            t.d(s, { Z: () => u, a: () => o });
            var r = t(7294);
            const n = {},
                i = r.createContext(n);
            function o(e) {
                const s = r.useContext(i);
                return r.useMemo(
                    function () {
                        return 'function' == typeof e ? e(s) : { ...s, ...e };
                    },
                    [s, e],
                );
            }
            function u(e) {
                let s;
                return (
                    (s = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(n)
                            : e.components || n
                        : o(e.components)),
                    r.createElement(i.Provider, { value: s }, e.children)
                );
            }
        },
    },
]);
