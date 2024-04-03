'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [868],
    {
        2004: (e, n, t) => {
            t.r(n),
                t.d(n, {
                    assets: () => i,
                    contentTitle: () => c,
                    default: () => d,
                    frontMatter: () => o,
                    metadata: () => a,
                    toc: () => u,
                });
            var s = t(5893),
                r = t(1151);
            const o = { title: '\ud83d\ude80 Run' },
                c = void 0,
                a = {
                    id: 'run',
                    title: '\ud83d\ude80 Run',
                    description: '\ud83d\ude80 Run',
                    source: '@site/docs/run.md',
                    sourceDirName: '.',
                    slug: '/run',
                    permalink: '/restasaurus/run',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: '\ud83d\ude80 Run' },
                    sidebar: 'docs',
                    previous: { title: '\ud83d\udee0\ufe0f Tech Stack', permalink: '/restasaurus/stack' },
                    next: { title: '\ud83d\udd0d Testing', permalink: '/restasaurus/test' },
                },
                i = {},
                u = [{ value: '\ud83d\ude80 Run', id: '-run', level: 2 }];
            function l(e) {
                const n = {
                    code: 'code',
                    h2: 'h2',
                    li: 'li',
                    ol: 'ol',
                    p: 'p',
                    pre: 'pre',
                    ...(0, r.a)(),
                    ...e.components,
                };
                return (0, s.jsxs)(s.Fragment, {
                    children: [
                        (0, s.jsx)(n.h2, { id: '-run', children: '\ud83d\ude80 Run' }),
                        '\n',
                        (0, s.jsx)(n.p, { children: 'The API can be started via one of the following commands:' }),
                        '\n',
                        (0, s.jsxs)(n.ol, {
                            children: [
                                '\n',
                                (0, s.jsxs)(n.li, {
                                    children: [
                                        'Start the API in ',
                                        (0, s.jsx)(n.code, { children: 'development' }),
                                        ' env, with nodemon.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, s.jsx)(n.pre, {
                            children: (0, s.jsx)(n.code, { className: 'language-bash', children: 'npm run dev\n' }),
                        }),
                        '\n',
                        (0, s.jsxs)(n.ol, {
                            start: '2',
                            children: [
                                '\n',
                                (0, s.jsxs)(n.li, {
                                    children: [
                                        'Start the API in ',
                                        (0, s.jsx)(n.code, { children: 'production' }),
                                        ' env, without nodemon.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, s.jsx)(n.pre, {
                            children: (0, s.jsx)(n.code, { className: 'language-bash', children: 'npm start\n' }),
                        }),
                    ],
                });
            }
            function d(e = {}) {
                const { wrapper: n } = { ...(0, r.a)(), ...e.components };
                return n ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(l, { ...e }) }) : l(e);
            }
        },
        1151: (e, n, t) => {
            t.d(n, { Z: () => a, a: () => c });
            var s = t(7294);
            const r = {},
                o = s.createContext(r);
            function c(e) {
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
                            ? e.components(r)
                            : e.components || r
                        : c(e.components)),
                    s.createElement(o.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
