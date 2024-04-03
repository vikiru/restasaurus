'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [575],
    {
        6168: (t, e, s) => {
            s.r(e),
                s.d(e, {
                    assets: () => l,
                    contentTitle: () => a,
                    default: () => h,
                    frontMatter: () => r,
                    metadata: () => c,
                    toc: () => o,
                });
            var n = s(5893),
                i = s(1151);
            const r = { title: '\ud83d\udd0d Testing' },
                a = void 0,
                c = {
                    id: 'test',
                    title: '\ud83d\udd0d Testing',
                    description: '\ud83d\udd0d Testing',
                    source: '@site/docs/test.md',
                    sourceDirName: '.',
                    slug: '/test',
                    permalink: '/restasaurus/test',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: '\ud83d\udd0d Testing' },
                    sidebar: 'docs',
                    previous: { title: '\ud83d\ude80 Run', permalink: '/restasaurus/run' },
                    next: { title: '\ud83d\udcdc Available Scripts', permalink: '/restasaurus/scripts' },
                },
                l = {},
                o = [{ value: '\ud83d\udd0d Testing', id: '-testing', level: 2 }];
            function d(t) {
                const e = {
                    a: 'a',
                    code: 'code',
                    h2: 'h2',
                    img: 'img',
                    p: 'p',
                    pre: 'pre',
                    table: 'table',
                    tbody: 'tbody',
                    td: 'td',
                    th: 'th',
                    thead: 'thead',
                    tr: 'tr',
                    ...(0, i.a)(),
                    ...t.components,
                };
                return (0, n.jsxs)(n.Fragment, {
                    children: [
                        (0, n.jsx)(e.h2, { id: '-testing', children: '\ud83d\udd0d Testing' }),
                        '\n',
                        (0, n.jsxs)(e.table, {
                            children: [
                                (0, n.jsx)(e.thead, {
                                    children: (0, n.jsxs)(e.tr, {
                                        children: [
                                            (0, n.jsx)(e.th, { children: 'Statements' }),
                                            (0, n.jsx)(e.th, { children: 'Branches' }),
                                            (0, n.jsx)(e.th, { children: 'Functions' }),
                                            (0, n.jsx)(e.th, { children: 'Lines' }),
                                        ],
                                    }),
                                }),
                                (0, n.jsx)(e.tbody, {
                                    children: (0, n.jsxs)(e.tr, {
                                        children: [
                                            (0, n.jsx)(e.td, {
                                                children: (0, n.jsx)(e.img, {
                                                    src: 'https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat',
                                                    alt: 'Statements',
                                                }),
                                            }),
                                            (0, n.jsx)(e.td, {
                                                children: (0, n.jsx)(e.img, {
                                                    src: 'https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat',
                                                    alt: 'Branches',
                                                }),
                                            }),
                                            (0, n.jsx)(e.td, {
                                                children: (0, n.jsx)(e.img, {
                                                    src: 'https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat',
                                                    alt: 'Functions',
                                                }),
                                            }),
                                            (0, n.jsx)(e.td, {
                                                children: (0, n.jsx)(e.img, {
                                                    src: 'https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat',
                                                    alt: 'Lines',
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                        '\n',
                        (0, n.jsxs)(e.p, {
                            children: [
                                'The comprehensive suite of tests for this project is housed within the ',
                                (0, n.jsx)(e.a, {
                                    href: 'https://github.com/vikiru/restasaurus/tree/main/test',
                                    children: 'test',
                                }),
                                ' directory. These tests are primarily designed to verify the functionality and reliability of the API and additionally, the scripts used to retrieve the information.',
                            ],
                        }),
                        '\n',
                        (0, n.jsx)(e.p, { children: 'The tests can be run with the following command:' }),
                        '\n',
                        (0, n.jsx)(e.pre, {
                            children: (0, n.jsx)(e.code, { className: 'language-bash', children: 'npm test\n' }),
                        }),
                    ],
                });
            }
            function h(t = {}) {
                const { wrapper: e } = { ...(0, i.a)(), ...t.components };
                return e ? (0, n.jsx)(e, { ...t, children: (0, n.jsx)(d, { ...t }) }) : d(t);
            }
        },
        1151: (t, e, s) => {
            s.d(e, { Z: () => c, a: () => a });
            var n = s(7294);
            const i = {},
                r = n.createContext(i);
            function a(t) {
                const e = n.useContext(r);
                return n.useMemo(
                    function () {
                        return 'function' == typeof t ? t(e) : { ...e, ...t };
                    },
                    [e, t],
                );
            }
            function c(t) {
                let e;
                return (
                    (e = t.disableParentContext
                        ? 'function' == typeof t.components
                            ? t.components(i)
                            : t.components || i
                        : a(t.components)),
                    n.createElement(r.Provider, { value: e }, t.children)
                );
            }
        },
    },
]);
