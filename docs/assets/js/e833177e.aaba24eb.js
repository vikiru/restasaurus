'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [599],
    {
        8397: (e, n, s) => {
            s.r(n),
                s.d(n, {
                    assets: () => c,
                    contentTitle: () => i,
                    default: () => h,
                    frontMatter: () => a,
                    metadata: () => l,
                    toc: () => o,
                });
            var t = s(5893),
                r = s(1151);
            const a = { title: '\ud83d\udcdc Available Scripts' },
                i = void 0,
                l = {
                    id: 'scripts',
                    title: '\ud83d\udcdc Available Scripts',
                    description: '\ud83d\udcdc Available Scripts',
                    source: '@site/docs/scripts.md',
                    sourceDirName: '.',
                    slug: '/scripts',
                    permalink: '/restasaurus/scripts',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { title: '\ud83d\udcdc Available Scripts' },
                    sidebar: 'docs',
                    previous: { title: '\ud83d\udd0d Testing', permalink: '/restasaurus/test' },
                    next: { title: '\u2728 Acknowledgments', permalink: '/restasaurus/acknowledgments' },
                },
                c = {},
                o = [{ value: '\ud83d\udcdc Available Scripts', id: '-available-scripts', level: 2 }];
            function d(e) {
                const n = {
                    a: 'a',
                    code: 'code',
                    h2: 'h2',
                    li: 'li',
                    ol: 'ol',
                    pre: 'pre',
                    ...(0, r.a)(),
                    ...e.components,
                };
                return (0, t.jsxs)(t.Fragment, {
                    children: [
                        (0, t.jsx)(n.h2, { id: '-available-scripts', children: '\ud83d\udcdc Available Scripts' }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        'Start the API in ',
                                        (0, t.jsx)(n.code, { children: 'production' }),
                                        ' env, without nodemon.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, { className: 'language-bash', children: 'npm start\n' }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '2',
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        'Start the API in ',
                                        (0, t.jsx)(n.code, { children: 'development' }),
                                        ' env, with nodemon.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, { className: 'language-bash', children: 'npm run dev\n' }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '3',
                            children: ['\n', (0, t.jsx)(n.li, { children: 'Run all tests.' }), '\n'],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, { className: 'language-bash', children: 'npm test\n' }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '4',
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        'Lint all files and check if there are any issues, with ',
                                        (0, t.jsx)(n.a, { href: 'https://eslint.org/', children: 'ESLint' }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, { className: 'language-bash', children: 'npm run lint\n' }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '5',
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        'Fix all ESLint issues then format the files with ',
                                        (0, t.jsx)(n.a, { href: 'https://prettier.io/', children: 'Prettier' }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, {
                                className: 'language-bash',
                                children: 'npm run prettier\n',
                            }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '6',
                            children: [
                                '\n',
                                (0, t.jsx)(n.li, {
                                    children:
                                        'Retrieve all information needed for the API via Wikipedia directly from its API.',
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, {
                                className: 'language-bash',
                                children: 'npm run retrieveData\n',
                            }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '7',
                            children: [
                                '\n',
                                (0, t.jsx)(n.li, {
                                    children: 'Save all dinosaur information to your MongoDB database.',
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, {
                                className: 'language-bash',
                                children: 'npm run postData\n',
                            }),
                        }),
                        '\n',
                        (0, t.jsxs)(n.ol, {
                            start: '8',
                            children: [
                                '\n',
                                (0, t.jsxs)(n.li, {
                                    children: [
                                        'Create test coverage shields badges for README using ',
                                        (0, t.jsx)(n.a, {
                                            href: 'https://github.com/the-bugging/istanbul-badges-readme',
                                            children: 'istanbul-badges-readme',
                                        }),
                                        '.',
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(n.pre, {
                            children: (0, t.jsx)(n.code, {
                                className: 'language-bash',
                                children: 'npm run make-badges\n',
                            }),
                        }),
                    ],
                });
            }
            function h(e = {}) {
                const { wrapper: n } = { ...(0, r.a)(), ...e.components };
                return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(d, { ...e }) }) : d(e);
            }
        },
        1151: (e, n, s) => {
            s.d(n, { Z: () => l, a: () => i });
            var t = s(7294);
            const r = {},
                a = t.createContext(r);
            function i(e) {
                const n = t.useContext(a);
                return t.useMemo(
                    function () {
                        return 'function' == typeof e ? e(n) : { ...n, ...e };
                    },
                    [n, e],
                );
            }
            function l(e) {
                let n;
                return (
                    (n = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(r)
                            : e.components || r
                        : i(e.components)),
                    t.createElement(a.Provider, { value: n }, e.children)
                );
            }
        },
    },
]);
