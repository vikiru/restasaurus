'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [644],
    {
        2168: (e, s, n) => {
            n.r(s),
                n.d(s, {
                    assets: () => a,
                    contentTitle: () => c,
                    default: () => d,
                    frontMatter: () => i,
                    metadata: () => h,
                    toc: () => o,
                });
            var t = n(5893),
                r = n(1151);
            const i = { id: 'stack', title: '\ud83d\udee0\ufe0f Tech Stack' },
                c = void 0,
                h = {
                    id: 'stack',
                    title: '\ud83d\udee0\ufe0f Tech Stack',
                    description: '\ud83d\udee0\ufe0f Tech Stack',
                    source: '@site/docs/stack.md',
                    sourceDirName: '.',
                    slug: '/stack',
                    permalink: '/restasaurus/stack',
                    draft: !1,
                    unlisted: !1,
                    tags: [],
                    version: 'current',
                    frontMatter: { id: 'stack', title: '\ud83d\udee0\ufe0f Tech Stack' },
                    sidebar: 'docs',
                    previous: { title: 'Random Images', permalink: '/restasaurus/endpoints/randomImages' },
                    next: { title: '\ud83d\ude80 Run', permalink: '/restasaurus/run' },
                },
                a = {},
                o = [{ value: '\ud83d\udee0\ufe0f Tech Stack', id: '\ufe0f-tech-stack', level: 2 }];
            function l(e) {
                const s = {
                    a: 'a',
                    code: 'code',
                    h2: 'h2',
                    li: 'li',
                    p: 'p',
                    ul: 'ul',
                    ...(0, r.a)(),
                    ...e.components,
                };
                return (0, t.jsxs)(t.Fragment, {
                    children: [
                        (0, t.jsx)(s.h2, { id: '\ufe0f-tech-stack', children: '\ud83d\udee0\ufe0f Tech Stack' }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'Backend:' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://nodejs.org/en', children: 'Node.js' }),
                                }),
                                '\n',
                                (0, t.jsxs)(s.li, {
                                    children: [
                                        (0, t.jsx)(s.a, { href: 'https://expressjs.com/', children: 'Express' }),
                                        '\n',
                                        (0, t.jsxs)(s.ul, {
                                            children: [
                                                '\n',
                                                (0, t.jsxs)(s.li, {
                                                    children: [
                                                        'Logging via ',
                                                        (0, t.jsx)(s.a, {
                                                            href: 'https://github.com/winstonjs/winston',
                                                            children: 'Winston',
                                                        }),
                                                        ', along with various other middlewares as seen ',
                                                        (0, t.jsx)(s.a, {
                                                            href: 'https://github.com/vikiru/restasaurus/blob/main/app/middlewares/index.js',
                                                            children: 'here',
                                                        }),
                                                    ],
                                                }),
                                                '\n',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://www.mongodb.com/',
                                        children: 'MongoDB',
                                    }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://mongoosejs.com/',
                                        children: 'Mongoose',
                                    }),
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'Testing:' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://mochajs.org/', children: 'Mocha' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://www.chaijs.com/', children: 'Chai' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://sinonjs.org/', children: 'Sinon' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://github.com/thlorenz/proxyquire',
                                        children: 'Proxyquire',
                                    }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://github.com/istanbuljs/nyc',
                                        children: 'Istanbul (nyc)',
                                    }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://github.com/the-bugging/istanbul-badges-readme',
                                        children: 'istanbul-badges-readme',
                                    }),
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'Documentation:' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(s.li, {
                                    children: [
                                        'Docs are built using ',
                                        (0, t.jsx)(s.a, { href: 'https://docusaurus.io/', children: 'Docusaurus' }),
                                        '\n',
                                        (0, t.jsxs)(s.ul, {
                                            children: [
                                                '\n',
                                                (0, t.jsxs)(s.li, {
                                                    children: [
                                                        'OpenAPI Specification converted to ',
                                                        (0, t.jsx)(s.code, { children: '.md' }),
                                                        ' using: ',
                                                        (0, t.jsx)(s.a, {
                                                            href: 'https://github.com/rohit-gohri/redocusaurus',
                                                            children: 'Redocusaurus',
                                                        }),
                                                    ],
                                                }),
                                                '\n',
                                                (0, t.jsxs)(s.li, {
                                                    children: [
                                                        'Search functionality provided by: ',
                                                        (0, t.jsx)(s.a, {
                                                            href: 'https://github.com/praveenn77/docusaurus-lunr-search',
                                                            children: 'docusaurus-lunr-search',
                                                        }),
                                                    ],
                                                }),
                                                '\n',
                                                (0, t.jsxs)(s.li, {
                                                    children: [
                                                        'Analytics using ',
                                                        (0, t.jsx)(s.a, {
                                                            href: 'https://marketingplatform.google.com/about/analytics/',
                                                            children: 'Google Analytics',
                                                        }),
                                                    ],
                                                }),
                                                '\n',
                                            ],
                                        }),
                                        '\n',
                                    ],
                                }),
                                '\n',
                                (0, t.jsxs)(s.li, {
                                    children: [
                                        'Documentation site hosted via ',
                                        (0, t.jsx)(s.a, {
                                            href: 'https://pages.github.com/',
                                            children: 'GitHub Pages',
                                        }),
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'REST API' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsxs)(s.li, {
                                    children: [
                                        (0, t.jsx)(s.a, { href: 'https://render.com/', children: 'Render' }),
                                        ' - the API can be accessed via the endpoint ',
                                        (0, t.jsx)(s.a, {
                                            href: 'https://restasaurus.onrender.com/api/v1',
                                            children: 'here',
                                        }),
                                    ],
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsxs)(s.p, {
                            children: [
                                'Please note that the API is hosted on Render, using the ',
                                (0, t.jsx)(s.a, { href: 'https://docs.render.com/free', children: 'Free Tier' }),
                                ' and as such, is limited to the constraints of that free tier, such as spinning down on idle (no requests after 15 minutes) and 750 instance hours per month.',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'CI:' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://github.com/features/actions',
                                        children: 'GitHub Actions',
                                    }),
                                }),
                                '\n',
                            ],
                        }),
                        '\n',
                        (0, t.jsx)(s.p, { children: 'Dev Tools:' }),
                        '\n',
                        (0, t.jsxs)(s.ul, {
                            children: [
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://eslint.org/', children: 'ESLint' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://prettier.io/', children: 'Prettier' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, { href: 'https://wakatime.com/', children: 'WakaTime' }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://www.mongodb.com/products/tools/compass',
                                        children: 'MongoDB Compass',
                                    }),
                                }),
                                '\n',
                                (0, t.jsx)(s.li, {
                                    children: (0, t.jsx)(s.a, {
                                        href: 'https://www.postman.com/',
                                        children: 'Postman',
                                    }),
                                }),
                                '\n',
                            ],
                        }),
                    ],
                });
            }
            function d(e = {}) {
                const { wrapper: s } = { ...(0, r.a)(), ...e.components };
                return s ? (0, t.jsx)(s, { ...e, children: (0, t.jsx)(l, { ...e }) }) : l(e);
            }
        },
        1151: (e, s, n) => {
            n.d(s, { Z: () => h, a: () => c });
            var t = n(7294);
            const r = {},
                i = t.createContext(r);
            function c(e) {
                const s = t.useContext(i);
                return t.useMemo(
                    function () {
                        return 'function' == typeof e ? e(s) : { ...s, ...e };
                    },
                    [s, e],
                );
            }
            function h(e) {
                let s;
                return (
                    (s = e.disableParentContext
                        ? 'function' == typeof e.components
                            ? e.components(r)
                            : e.components || r
                        : c(e.components)),
                    t.createElement(i.Provider, { value: s }, e.children)
                );
            }
        },
    },
]);
