'use strict';
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [518],
    {
        8564: (s, n, e) => {
            e.r(n), e.d(n, { default: () => l });
            e(7294);
            var r = e(1944),
                o = e(3320),
                t = e(4477),
                c = e(8790),
                u = e(197),
                a = e(5893);
            function i(s) {
                const { version: n } = s;
                return (0, a.jsxs)(a.Fragment, {
                    children: [
                        (0, a.jsx)(u.Z, { version: n.version, tag: (0, o.os)(n.pluginId, n.version) }),
                        (0, a.jsx)(r.d, {
                            children: n.noIndex && (0, a.jsx)('meta', { name: 'robots', content: 'noindex, nofollow' }),
                        }),
                    ],
                });
            }
            function d(s) {
                const { version: n, route: e } = s;
                return (0, a.jsx)(r.FG, {
                    className: n.className,
                    children: (0, a.jsx)(t.q, { version: n, children: (0, c.H)(e.routes) }),
                });
            }
            function l(s) {
                return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)(i, { ...s }), (0, a.jsx)(d, { ...s })] });
            }
        },
    },
]);
