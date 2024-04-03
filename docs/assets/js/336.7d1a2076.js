/*! For license information please see 336.7d1a2076.js.LICENSE.txt */
(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [336],
    {
        1336: (e, t, r) => {
            var i, n;
            !(function () {
                var s,
                    o,
                    a,
                    u,
                    l,
                    c,
                    h,
                    d,
                    f,
                    p,
                    y,
                    m,
                    g,
                    x,
                    v,
                    w,
                    Q,
                    k,
                    S,
                    E,
                    L,
                    b,
                    P,
                    T,
                    O,
                    I,
                    R,
                    F,
                    C,
                    N,
                    _ = function (e) {
                        var t = new _.Builder();
                        return (
                            t.pipeline.add(_.trimmer, _.stopWordFilter, _.stemmer),
                            t.searchPipeline.add(_.stemmer),
                            e.call(t, t),
                            t.build()
                        );
                    };
                (_.version = '2.3.9'),
                    (_.utils = {}),
                    (_.utils.warn =
                        ((s = this),
                        function (e) {
                            s.console && console.warn && console.warn(e);
                        })),
                    (_.utils.asString = function (e) {
                        return null == e ? '' : e.toString();
                    }),
                    (_.utils.clone = function (e) {
                        if (null == e) return e;
                        for (var t = Object.create(null), r = Object.keys(e), i = 0; i < r.length; i++) {
                            var n = r[i],
                                s = e[n];
                            if (Array.isArray(s)) t[n] = s.slice();
                            else {
                                if ('string' != typeof s && 'number' != typeof s && 'boolean' != typeof s)
                                    throw new TypeError('clone is not deep and does not support nested objects');
                                t[n] = s;
                            }
                        }
                        return t;
                    }),
                    (_.FieldRef = function (e, t, r) {
                        (this.docRef = e), (this.fieldName = t), (this._stringValue = r);
                    }),
                    (_.FieldRef.joiner = '/'),
                    (_.FieldRef.fromString = function (e) {
                        var t = e.indexOf(_.FieldRef.joiner);
                        if (-1 === t) throw 'malformed field ref string';
                        var r = e.slice(0, t),
                            i = e.slice(t + 1);
                        return new _.FieldRef(i, r, e);
                    }),
                    (_.FieldRef.prototype.toString = function () {
                        return (
                            null == this._stringValue &&
                                (this._stringValue = this.fieldName + _.FieldRef.joiner + this.docRef),
                            this._stringValue
                        );
                    }),
                    (_.Set = function (e) {
                        if (((this.elements = Object.create(null)), e)) {
                            this.length = e.length;
                            for (var t = 0; t < this.length; t++) this.elements[e[t]] = !0;
                        } else this.length = 0;
                    }),
                    (_.Set.complete = {
                        intersect: function (e) {
                            return e;
                        },
                        union: function () {
                            return this;
                        },
                        contains: function () {
                            return !0;
                        },
                    }),
                    (_.Set.empty = {
                        intersect: function () {
                            return this;
                        },
                        union: function (e) {
                            return e;
                        },
                        contains: function () {
                            return !1;
                        },
                    }),
                    (_.Set.prototype.contains = function (e) {
                        return !!this.elements[e];
                    }),
                    (_.Set.prototype.intersect = function (e) {
                        var t,
                            r,
                            i,
                            n = [];
                        if (e === _.Set.complete) return this;
                        if (e === _.Set.empty) return e;
                        this.length < e.length ? ((t = this), (r = e)) : ((t = e), (r = this)),
                            (i = Object.keys(t.elements));
                        for (var s = 0; s < i.length; s++) {
                            var o = i[s];
                            o in r.elements && n.push(o);
                        }
                        return new _.Set(n);
                    }),
                    (_.Set.prototype.union = function (e) {
                        return e === _.Set.complete
                            ? _.Set.complete
                            : e === _.Set.empty
                              ? this
                              : new _.Set(Object.keys(this.elements).concat(Object.keys(e.elements)));
                    }),
                    (_.idf = function (e, t) {
                        var r = 0;
                        for (var i in e) '_index' != i && (r += Object.keys(e[i]).length);
                        var n = (t - r + 0.5) / (r + 0.5);
                        return Math.log(1 + Math.abs(n));
                    }),
                    (_.Token = function (e, t) {
                        (this.str = e || ''), (this.metadata = t || {});
                    }),
                    (_.Token.prototype.toString = function () {
                        return this.str;
                    }),
                    (_.Token.prototype.update = function (e) {
                        return (this.str = e(this.str, this.metadata)), this;
                    }),
                    (_.Token.prototype.clone = function (e) {
                        return (
                            (e =
                                e ||
                                function (e) {
                                    return e;
                                }),
                            new _.Token(e(this.str, this.metadata), this.metadata)
                        );
                    }),
                    (_.tokenizer = function (e, t) {
                        if (null == e || null == e) return [];
                        if (Array.isArray(e))
                            return e.map(function (e) {
                                return new _.Token(_.utils.asString(e).toLowerCase(), _.utils.clone(t));
                            });
                        for (var r = e.toString().toLowerCase(), i = r.length, n = [], s = 0, o = 0; s <= i; s++) {
                            var a = s - o;
                            if (r.charAt(s).match(_.tokenizer.separator) || s == i) {
                                if (a > 0) {
                                    var u = _.utils.clone(t) || {};
                                    (u.position = [o, a]), (u.index = n.length), n.push(new _.Token(r.slice(o, s), u));
                                }
                                o = s + 1;
                            }
                        }
                        return n;
                    }),
                    (_.tokenizer.separator = /[\s\-]+/),
                    (_.Pipeline = function () {
                        this._stack = [];
                    }),
                    (_.Pipeline.registeredFunctions = Object.create(null)),
                    (_.Pipeline.registerFunction = function (e, t) {
                        t in this.registeredFunctions && _.utils.warn('Overwriting existing registered function: ' + t),
                            (e.label = t),
                            (_.Pipeline.registeredFunctions[e.label] = e);
                    }),
                    (_.Pipeline.warnIfFunctionNotRegistered = function (e) {
                        (e.label && e.label in this.registeredFunctions) ||
                            _.utils.warn(
                                'Function is not registered with pipeline. This may cause problems when serialising the index.\n',
                                e,
                            );
                    }),
                    (_.Pipeline.load = function (e) {
                        var t = new _.Pipeline();
                        return (
                            e.forEach(function (e) {
                                var r = _.Pipeline.registeredFunctions[e];
                                if (!r) throw new Error('Cannot load unregistered function: ' + e);
                                t.add(r);
                            }),
                            t
                        );
                    }),
                    (_.Pipeline.prototype.add = function () {
                        Array.prototype.slice.call(arguments).forEach(function (e) {
                            _.Pipeline.warnIfFunctionNotRegistered(e), this._stack.push(e);
                        }, this);
                    }),
                    (_.Pipeline.prototype.after = function (e, t) {
                        _.Pipeline.warnIfFunctionNotRegistered(t);
                        var r = this._stack.indexOf(e);
                        if (-1 == r) throw new Error('Cannot find existingFn');
                        (r += 1), this._stack.splice(r, 0, t);
                    }),
                    (_.Pipeline.prototype.before = function (e, t) {
                        _.Pipeline.warnIfFunctionNotRegistered(t);
                        var r = this._stack.indexOf(e);
                        if (-1 == r) throw new Error('Cannot find existingFn');
                        this._stack.splice(r, 0, t);
                    }),
                    (_.Pipeline.prototype.remove = function (e) {
                        var t = this._stack.indexOf(e);
                        -1 != t && this._stack.splice(t, 1);
                    }),
                    (_.Pipeline.prototype.run = function (e) {
                        for (var t = this._stack.length, r = 0; r < t; r++) {
                            for (var i = this._stack[r], n = [], s = 0; s < e.length; s++) {
                                var o = i(e[s], s, e);
                                if (null != o && '' !== o)
                                    if (Array.isArray(o)) for (var a = 0; a < o.length; a++) n.push(o[a]);
                                    else n.push(o);
                            }
                            e = n;
                        }
                        return e;
                    }),
                    (_.Pipeline.prototype.runString = function (e, t) {
                        var r = new _.Token(e, t);
                        return this.run([r]).map(function (e) {
                            return e.toString();
                        });
                    }),
                    (_.Pipeline.prototype.reset = function () {
                        this._stack = [];
                    }),
                    (_.Pipeline.prototype.toJSON = function () {
                        return this._stack.map(function (e) {
                            return _.Pipeline.warnIfFunctionNotRegistered(e), e.label;
                        });
                    }),
                    (_.Vector = function (e) {
                        (this._magnitude = 0), (this.elements = e || []);
                    }),
                    (_.Vector.prototype.positionForIndex = function (e) {
                        if (0 == this.elements.length) return 0;
                        for (
                            var t = 0,
                                r = this.elements.length / 2,
                                i = r - t,
                                n = Math.floor(i / 2),
                                s = this.elements[2 * n];
                            i > 1 && (s < e && (t = n), s > e && (r = n), s != e);

                        )
                            (i = r - t), (n = t + Math.floor(i / 2)), (s = this.elements[2 * n]);
                        return s == e || s > e ? 2 * n : s < e ? 2 * (n + 1) : void 0;
                    }),
                    (_.Vector.prototype.insert = function (e, t) {
                        this.upsert(e, t, function () {
                            throw 'duplicate index';
                        });
                    }),
                    (_.Vector.prototype.upsert = function (e, t, r) {
                        this._magnitude = 0;
                        var i = this.positionForIndex(e);
                        this.elements[i] == e
                            ? (this.elements[i + 1] = r(this.elements[i + 1], t))
                            : this.elements.splice(i, 0, e, t);
                    }),
                    (_.Vector.prototype.magnitude = function () {
                        if (this._magnitude) return this._magnitude;
                        for (var e = 0, t = this.elements.length, r = 1; r < t; r += 2) {
                            var i = this.elements[r];
                            e += i * i;
                        }
                        return (this._magnitude = Math.sqrt(e));
                    }),
                    (_.Vector.prototype.dot = function (e) {
                        for (
                            var t = 0,
                                r = this.elements,
                                i = e.elements,
                                n = r.length,
                                s = i.length,
                                o = 0,
                                a = 0,
                                u = 0,
                                l = 0;
                            u < n && l < s;

                        )
                            (o = r[u]) < (a = i[l])
                                ? (u += 2)
                                : o > a
                                  ? (l += 2)
                                  : o == a && ((t += r[u + 1] * i[l + 1]), (u += 2), (l += 2));
                        return t;
                    }),
                    (_.Vector.prototype.similarity = function (e) {
                        return this.dot(e) / this.magnitude() || 0;
                    }),
                    (_.Vector.prototype.toArray = function () {
                        for (
                            var e = new Array(this.elements.length / 2), t = 1, r = 0;
                            t < this.elements.length;
                            t += 2, r++
                        )
                            e[r] = this.elements[t];
                        return e;
                    }),
                    (_.Vector.prototype.toJSON = function () {
                        return this.elements;
                    }),
                    (_.stemmer =
                        ((o = {
                            ational: 'ate',
                            tional: 'tion',
                            enci: 'ence',
                            anci: 'ance',
                            izer: 'ize',
                            bli: 'ble',
                            alli: 'al',
                            entli: 'ent',
                            eli: 'e',
                            ousli: 'ous',
                            ization: 'ize',
                            ation: 'ate',
                            ator: 'ate',
                            alism: 'al',
                            iveness: 'ive',
                            fulness: 'ful',
                            ousness: 'ous',
                            aliti: 'al',
                            iviti: 'ive',
                            biliti: 'ble',
                            logi: 'log',
                        }),
                        (a = { icate: 'ic', ative: '', alize: 'al', iciti: 'ic', ical: 'ic', ful: '', ness: '' }),
                        (h =
                            '^(' +
                            (l = '[^aeiou][^aeiouy]*') +
                            ')?' +
                            (c = (u = '[aeiouy]') + '[aeiou]*') +
                            l +
                            '(' +
                            c +
                            ')?$'),
                        (d = '^(' + l + ')?' + c + l + c + l),
                        (f = '^(' + l + ')?' + u),
                        (p = new RegExp('^(' + l + ')?' + c + l)),
                        (y = new RegExp(d)),
                        (m = new RegExp(h)),
                        (g = new RegExp(f)),
                        (x = /^(.+?)(ss|i)es$/),
                        (v = /^(.+?)([^s])s$/),
                        (w = /^(.+?)eed$/),
                        (Q = /^(.+?)(ed|ing)$/),
                        (k = /.$/),
                        (S = /(at|bl|iz)$/),
                        (E = new RegExp('([^aeiouylsz])\\1$')),
                        (L = new RegExp('^' + l + u + '[^aeiouwxy]$')),
                        (b = /^(.+?[^aeiou])y$/),
                        (P =
                            /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/),
                        (T = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/),
                        (O = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/),
                        (I = /^(.+?)(s|t)(ion)$/),
                        (R = /^(.+?)e$/),
                        (F = /ll$/),
                        (C = new RegExp('^' + l + u + '[^aeiouwxy]$')),
                        (N = function (e) {
                            var t, r, i, n, s, u, l;
                            if (e.length < 3) return e;
                            if (
                                ('y' == (i = e.substr(0, 1)) && (e = i.toUpperCase() + e.substr(1)),
                                (s = v),
                                (n = x).test(e) ? (e = e.replace(n, '$1$2')) : s.test(e) && (e = e.replace(s, '$1$2')),
                                (s = Q),
                                (n = w).test(e))
                            ) {
                                var c = n.exec(e);
                                (n = p).test(c[1]) && ((n = k), (e = e.replace(n, '')));
                            } else
                                s.test(e) &&
                                    ((t = (c = s.exec(e))[1]),
                                    (s = g).test(t) &&
                                        ((u = E),
                                        (l = L),
                                        (s = S).test((e = t))
                                            ? (e += 'e')
                                            : u.test(e)
                                              ? ((n = k), (e = e.replace(n, '')))
                                              : l.test(e) && (e += 'e')));
                            return (
                                (n = b).test(e) && (e = (t = (c = n.exec(e))[1]) + 'i'),
                                (n = P).test(e) &&
                                    ((t = (c = n.exec(e))[1]), (r = c[2]), (n = p).test(t) && (e = t + o[r])),
                                (n = T).test(e) &&
                                    ((t = (c = n.exec(e))[1]), (r = c[2]), (n = p).test(t) && (e = t + a[r])),
                                (s = I),
                                (n = O).test(e)
                                    ? ((t = (c = n.exec(e))[1]), (n = y).test(t) && (e = t))
                                    : s.test(e) && ((t = (c = s.exec(e))[1] + c[2]), (s = y).test(t) && (e = t)),
                                (n = R).test(e) &&
                                    ((t = (c = n.exec(e))[1]),
                                    (s = m),
                                    (u = C),
                                    ((n = y).test(t) || (s.test(t) && !u.test(t))) && (e = t)),
                                (s = y),
                                (n = F).test(e) && s.test(e) && ((n = k), (e = e.replace(n, ''))),
                                'y' == i && (e = i.toLowerCase() + e.substr(1)),
                                e
                            );
                        }),
                        function (e) {
                            return e.update(N);
                        })),
                    _.Pipeline.registerFunction(_.stemmer, 'stemmer'),
                    (_.generateStopWordFilter = function (e) {
                        var t = e.reduce(function (e, t) {
                            return (e[t] = t), e;
                        }, {});
                        return function (e) {
                            if (e && t[e.toString()] !== e.toString()) return e;
                        };
                    }),
                    (_.stopWordFilter = _.generateStopWordFilter([
                        'a',
                        'able',
                        'about',
                        'across',
                        'after',
                        'all',
                        'almost',
                        'also',
                        'am',
                        'among',
                        'an',
                        'and',
                        'any',
                        'are',
                        'as',
                        'at',
                        'be',
                        'because',
                        'been',
                        'but',
                        'by',
                        'can',
                        'cannot',
                        'could',
                        'dear',
                        'did',
                        'do',
                        'does',
                        'either',
                        'else',
                        'ever',
                        'every',
                        'for',
                        'from',
                        'get',
                        'got',
                        'had',
                        'has',
                        'have',
                        'he',
                        'her',
                        'hers',
                        'him',
                        'his',
                        'how',
                        'however',
                        'i',
                        'if',
                        'in',
                        'into',
                        'is',
                        'it',
                        'its',
                        'just',
                        'least',
                        'let',
                        'like',
                        'likely',
                        'may',
                        'me',
                        'might',
                        'most',
                        'must',
                        'my',
                        'neither',
                        'no',
                        'nor',
                        'not',
                        'of',
                        'off',
                        'often',
                        'on',
                        'only',
                        'or',
                        'other',
                        'our',
                        'own',
                        'rather',
                        'said',
                        'say',
                        'says',
                        'she',
                        'should',
                        'since',
                        'so',
                        'some',
                        'than',
                        'that',
                        'the',
                        'their',
                        'them',
                        'then',
                        'there',
                        'these',
                        'they',
                        'this',
                        'tis',
                        'to',
                        'too',
                        'twas',
                        'us',
                        'wants',
                        'was',
                        'we',
                        'were',
                        'what',
                        'when',
                        'where',
                        'which',
                        'while',
                        'who',
                        'whom',
                        'why',
                        'will',
                        'with',
                        'would',
                        'yet',
                        'you',
                        'your',
                    ])),
                    _.Pipeline.registerFunction(_.stopWordFilter, 'stopWordFilter'),
                    (_.trimmer = function (e) {
                        return e.update(function (e) {
                            return e.replace(/^\W+/, '').replace(/\W+$/, '');
                        });
                    }),
                    _.Pipeline.registerFunction(_.trimmer, 'trimmer'),
                    (_.TokenSet = function () {
                        (this.final = !1), (this.edges = {}), (this.id = _.TokenSet._nextId), (_.TokenSet._nextId += 1);
                    }),
                    (_.TokenSet._nextId = 1),
                    (_.TokenSet.fromArray = function (e) {
                        for (var t = new _.TokenSet.Builder(), r = 0, i = e.length; r < i; r++) t.insert(e[r]);
                        return t.finish(), t.root;
                    }),
                    (_.TokenSet.fromClause = function (e) {
                        return 'editDistance' in e
                            ? _.TokenSet.fromFuzzyString(e.term, e.editDistance)
                            : _.TokenSet.fromString(e.term);
                    }),
                    (_.TokenSet.fromFuzzyString = function (e, t) {
                        for (var r = new _.TokenSet(), i = [{ node: r, editsRemaining: t, str: e }]; i.length; ) {
                            var n = i.pop();
                            if (n.str.length > 0) {
                                var s,
                                    o = n.str.charAt(0);
                                o in n.node.edges
                                    ? (s = n.node.edges[o])
                                    : ((s = new _.TokenSet()), (n.node.edges[o] = s)),
                                    1 == n.str.length && (s.final = !0),
                                    i.push({ node: s, editsRemaining: n.editsRemaining, str: n.str.slice(1) });
                            }
                            if (0 != n.editsRemaining) {
                                if ('*' in n.node.edges) var a = n.node.edges['*'];
                                else {
                                    a = new _.TokenSet();
                                    n.node.edges['*'] = a;
                                }
                                if (
                                    (0 == n.str.length && (a.final = !0),
                                    i.push({ node: a, editsRemaining: n.editsRemaining - 1, str: n.str }),
                                    n.str.length > 1 &&
                                        i.push({
                                            node: n.node,
                                            editsRemaining: n.editsRemaining - 1,
                                            str: n.str.slice(1),
                                        }),
                                    1 == n.str.length && (n.node.final = !0),
                                    n.str.length >= 1)
                                ) {
                                    if ('*' in n.node.edges) var u = n.node.edges['*'];
                                    else {
                                        u = new _.TokenSet();
                                        n.node.edges['*'] = u;
                                    }
                                    1 == n.str.length && (u.final = !0),
                                        i.push({ node: u, editsRemaining: n.editsRemaining - 1, str: n.str.slice(1) });
                                }
                                if (n.str.length > 1) {
                                    var l,
                                        c = n.str.charAt(0),
                                        h = n.str.charAt(1);
                                    h in n.node.edges
                                        ? (l = n.node.edges[h])
                                        : ((l = new _.TokenSet()), (n.node.edges[h] = l)),
                                        1 == n.str.length && (l.final = !0),
                                        i.push({
                                            node: l,
                                            editsRemaining: n.editsRemaining - 1,
                                            str: c + n.str.slice(2),
                                        });
                                }
                            }
                        }
                        return r;
                    }),
                    (_.TokenSet.fromString = function (e) {
                        for (var t = new _.TokenSet(), r = t, i = 0, n = e.length; i < n; i++) {
                            var s = e[i],
                                o = i == n - 1;
                            if ('*' == s) (t.edges[s] = t), (t.final = o);
                            else {
                                var a = new _.TokenSet();
                                (a.final = o), (t.edges[s] = a), (t = a);
                            }
                        }
                        return r;
                    }),
                    (_.TokenSet.prototype.toArray = function () {
                        for (var e = [], t = [{ prefix: '', node: this }]; t.length; ) {
                            var r = t.pop(),
                                i = Object.keys(r.node.edges),
                                n = i.length;
                            r.node.final && (r.prefix.charAt(0), e.push(r.prefix));
                            for (var s = 0; s < n; s++) {
                                var o = i[s];
                                t.push({ prefix: r.prefix.concat(o), node: r.node.edges[o] });
                            }
                        }
                        return e;
                    }),
                    (_.TokenSet.prototype.toString = function () {
                        if (this._str) return this._str;
                        for (
                            var e = this.final ? '1' : '0', t = Object.keys(this.edges).sort(), r = t.length, i = 0;
                            i < r;
                            i++
                        ) {
                            var n = t[i];
                            e = e + n + this.edges[n].id;
                        }
                        return e;
                    }),
                    (_.TokenSet.prototype.intersect = function (e) {
                        for (
                            var t = new _.TokenSet(), r = void 0, i = [{ qNode: e, output: t, node: this }];
                            i.length;

                        ) {
                            r = i.pop();
                            for (
                                var n = Object.keys(r.qNode.edges),
                                    s = n.length,
                                    o = Object.keys(r.node.edges),
                                    a = o.length,
                                    u = 0;
                                u < s;
                                u++
                            )
                                for (var l = n[u], c = 0; c < a; c++) {
                                    var h = o[c];
                                    if (h == l || '*' == l) {
                                        var d = r.node.edges[h],
                                            f = r.qNode.edges[l],
                                            p = d.final && f.final,
                                            y = void 0;
                                        h in r.output.edges
                                            ? ((y = r.output.edges[h]).final = y.final || p)
                                            : (((y = new _.TokenSet()).final = p), (r.output.edges[h] = y)),
                                            i.push({ qNode: f, output: y, node: d });
                                    }
                                }
                        }
                        return t;
                    }),
                    (_.TokenSet.Builder = function () {
                        (this.previousWord = ''),
                            (this.root = new _.TokenSet()),
                            (this.uncheckedNodes = []),
                            (this.minimizedNodes = {});
                    }),
                    (_.TokenSet.Builder.prototype.insert = function (e) {
                        var t,
                            r = 0;
                        if (e < this.previousWord) throw new Error('Out of order word insertion');
                        for (
                            var i = 0;
                            i < e.length && i < this.previousWord.length && e[i] == this.previousWord[i];
                            i++
                        )
                            r++;
                        this.minimize(r),
                            (t =
                                0 == this.uncheckedNodes.length
                                    ? this.root
                                    : this.uncheckedNodes[this.uncheckedNodes.length - 1].child);
                        for (i = r; i < e.length; i++) {
                            var n = new _.TokenSet(),
                                s = e[i];
                            (t.edges[s] = n), this.uncheckedNodes.push({ parent: t, char: s, child: n }), (t = n);
                        }
                        (t.final = !0), (this.previousWord = e);
                    }),
                    (_.TokenSet.Builder.prototype.finish = function () {
                        this.minimize(0);
                    }),
                    (_.TokenSet.Builder.prototype.minimize = function (e) {
                        for (var t = this.uncheckedNodes.length - 1; t >= e; t--) {
                            var r = this.uncheckedNodes[t],
                                i = r.child.toString();
                            i in this.minimizedNodes
                                ? (r.parent.edges[r.char] = this.minimizedNodes[i])
                                : ((r.child._str = i), (this.minimizedNodes[i] = r.child)),
                                this.uncheckedNodes.pop();
                        }
                    }),
                    (_.Index = function (e) {
                        (this.invertedIndex = e.invertedIndex),
                            (this.fieldVectors = e.fieldVectors),
                            (this.tokenSet = e.tokenSet),
                            (this.fields = e.fields),
                            (this.pipeline = e.pipeline);
                    }),
                    (_.Index.prototype.search = function (e) {
                        return this.query(function (t) {
                            new _.QueryParser(e, t).parse();
                        });
                    }),
                    (_.Index.prototype.query = function (e) {
                        for (
                            var t = new _.Query(this.fields),
                                r = Object.create(null),
                                i = Object.create(null),
                                n = Object.create(null),
                                s = Object.create(null),
                                o = Object.create(null),
                                a = 0;
                            a < this.fields.length;
                            a++
                        )
                            i[this.fields[a]] = new _.Vector();
                        e.call(t, t);
                        for (a = 0; a < t.clauses.length; a++) {
                            var u = t.clauses[a],
                                l = null,
                                c = _.Set.empty;
                            l = u.usePipeline ? this.pipeline.runString(u.term, { fields: u.fields }) : [u.term];
                            for (var h = 0; h < l.length; h++) {
                                var d = l[h];
                                u.term = d;
                                var f = _.TokenSet.fromClause(u),
                                    p = this.tokenSet.intersect(f).toArray();
                                if (0 === p.length && u.presence === _.Query.presence.REQUIRED) {
                                    for (var y = 0; y < u.fields.length; y++) {
                                        s[(R = u.fields[y])] = _.Set.empty;
                                    }
                                    break;
                                }
                                for (var m = 0; m < p.length; m++) {
                                    var g = p[m],
                                        x = this.invertedIndex[g],
                                        v = x._index;
                                    for (y = 0; y < u.fields.length; y++) {
                                        var w = x[(R = u.fields[y])],
                                            Q = Object.keys(w),
                                            k = g + '/' + R,
                                            S = new _.Set(Q);
                                        if (
                                            (u.presence == _.Query.presence.REQUIRED &&
                                                ((c = c.union(S)), void 0 === s[R] && (s[R] = _.Set.complete)),
                                            u.presence != _.Query.presence.PROHIBITED)
                                        ) {
                                            if (
                                                (i[R].upsert(v, u.boost, function (e, t) {
                                                    return e + t;
                                                }),
                                                !n[k])
                                            ) {
                                                for (var E = 0; E < Q.length; E++) {
                                                    var L,
                                                        b = Q[E],
                                                        P = new _.FieldRef(b, R),
                                                        T = w[b];
                                                    void 0 === (L = r[P])
                                                        ? (r[P] = new _.MatchData(g, R, T))
                                                        : L.add(g, R, T);
                                                }
                                                n[k] = !0;
                                            }
                                        } else void 0 === o[R] && (o[R] = _.Set.empty), (o[R] = o[R].union(S));
                                    }
                                }
                            }
                            if (u.presence === _.Query.presence.REQUIRED)
                                for (y = 0; y < u.fields.length; y++) {
                                    s[(R = u.fields[y])] = s[R].intersect(c);
                                }
                        }
                        var O = _.Set.complete,
                            I = _.Set.empty;
                        for (a = 0; a < this.fields.length; a++) {
                            var R;
                            s[(R = this.fields[a])] && (O = O.intersect(s[R])), o[R] && (I = I.union(o[R]));
                        }
                        var F = Object.keys(r),
                            C = [],
                            N = Object.create(null);
                        if (t.isNegated()) {
                            F = Object.keys(this.fieldVectors);
                            for (a = 0; a < F.length; a++) {
                                P = F[a];
                                var j = _.FieldRef.fromString(P);
                                r[P] = new _.MatchData();
                            }
                        }
                        for (a = 0; a < F.length; a++) {
                            var D = (j = _.FieldRef.fromString(F[a])).docRef;
                            if (O.contains(D) && !I.contains(D)) {
                                var A,
                                    B = this.fieldVectors[j],
                                    V = i[j.fieldName].similarity(B);
                                if (void 0 !== (A = N[D])) (A.score += V), A.matchData.combine(r[j]);
                                else {
                                    var z = { ref: D, score: V, matchData: r[j] };
                                    (N[D] = z), C.push(z);
                                }
                            }
                        }
                        return C.sort(function (e, t) {
                            return t.score - e.score;
                        });
                    }),
                    (_.Index.prototype.toJSON = function () {
                        var e = Object.keys(this.invertedIndex)
                                .sort()
                                .map(function (e) {
                                    return [e, this.invertedIndex[e]];
                                }, this),
                            t = Object.keys(this.fieldVectors).map(function (e) {
                                return [e, this.fieldVectors[e].toJSON()];
                            }, this);
                        return {
                            version: _.version,
                            fields: this.fields,
                            fieldVectors: t,
                            invertedIndex: e,
                            pipeline: this.pipeline.toJSON(),
                        };
                    }),
                    (_.Index.load = function (e) {
                        var t = {},
                            r = {},
                            i = e.fieldVectors,
                            n = Object.create(null),
                            s = e.invertedIndex,
                            o = new _.TokenSet.Builder(),
                            a = _.Pipeline.load(e.pipeline);
                        e.version != _.version &&
                            _.utils.warn(
                                "Version mismatch when loading serialised index. Current version of lunr '" +
                                    _.version +
                                    "' does not match serialized index '" +
                                    e.version +
                                    "'",
                            );
                        for (var u = 0; u < i.length; u++) {
                            var l = (h = i[u])[0],
                                c = h[1];
                            r[l] = new _.Vector(c);
                        }
                        for (u = 0; u < s.length; u++) {
                            var h,
                                d = (h = s[u])[0],
                                f = h[1];
                            o.insert(d), (n[d] = f);
                        }
                        return (
                            o.finish(),
                            (t.fields = e.fields),
                            (t.fieldVectors = r),
                            (t.invertedIndex = n),
                            (t.tokenSet = o.root),
                            (t.pipeline = a),
                            new _.Index(t)
                        );
                    }),
                    (_.Builder = function () {
                        (this._ref = 'id'),
                            (this._fields = Object.create(null)),
                            (this._documents = Object.create(null)),
                            (this.invertedIndex = Object.create(null)),
                            (this.fieldTermFrequencies = {}),
                            (this.fieldLengths = {}),
                            (this.tokenizer = _.tokenizer),
                            (this.pipeline = new _.Pipeline()),
                            (this.searchPipeline = new _.Pipeline()),
                            (this.documentCount = 0),
                            (this._b = 0.75),
                            (this._k1 = 1.2),
                            (this.termIndex = 0),
                            (this.metadataWhitelist = []);
                    }),
                    (_.Builder.prototype.ref = function (e) {
                        this._ref = e;
                    }),
                    (_.Builder.prototype.field = function (e, t) {
                        if (/\//.test(e)) throw new RangeError("Field '" + e + "' contains illegal character '/'");
                        this._fields[e] = t || {};
                    }),
                    (_.Builder.prototype.b = function (e) {
                        this._b = e < 0 ? 0 : e > 1 ? 1 : e;
                    }),
                    (_.Builder.prototype.k1 = function (e) {
                        this._k1 = e;
                    }),
                    (_.Builder.prototype.add = function (e, t) {
                        var r = e[this._ref],
                            i = Object.keys(this._fields);
                        (this._documents[r] = t || {}), (this.documentCount += 1);
                        for (var n = 0; n < i.length; n++) {
                            var s = i[n],
                                o = this._fields[s].extractor,
                                a = o ? o(e) : e[s],
                                u = this.tokenizer(a, { fields: [s] }),
                                l = this.pipeline.run(u),
                                c = new _.FieldRef(r, s),
                                h = Object.create(null);
                            (this.fieldTermFrequencies[c] = h),
                                (this.fieldLengths[c] = 0),
                                (this.fieldLengths[c] += l.length);
                            for (var d = 0; d < l.length; d++) {
                                var f = l[d];
                                if ((null == h[f] && (h[f] = 0), (h[f] += 1), null == this.invertedIndex[f])) {
                                    var p = Object.create(null);
                                    (p._index = this.termIndex), (this.termIndex += 1);
                                    for (var y = 0; y < i.length; y++) p[i[y]] = Object.create(null);
                                    this.invertedIndex[f] = p;
                                }
                                null == this.invertedIndex[f][s][r] &&
                                    (this.invertedIndex[f][s][r] = Object.create(null));
                                for (var m = 0; m < this.metadataWhitelist.length; m++) {
                                    var g = this.metadataWhitelist[m],
                                        x = f.metadata[g];
                                    null == this.invertedIndex[f][s][r][g] && (this.invertedIndex[f][s][r][g] = []),
                                        this.invertedIndex[f][s][r][g].push(x);
                                }
                            }
                        }
                    }),
                    (_.Builder.prototype.calculateAverageFieldLengths = function () {
                        for (var e = Object.keys(this.fieldLengths), t = e.length, r = {}, i = {}, n = 0; n < t; n++) {
                            var s = _.FieldRef.fromString(e[n]),
                                o = s.fieldName;
                            i[o] || (i[o] = 0), (i[o] += 1), r[o] || (r[o] = 0), (r[o] += this.fieldLengths[s]);
                        }
                        var a = Object.keys(this._fields);
                        for (n = 0; n < a.length; n++) {
                            var u = a[n];
                            r[u] = r[u] / i[u];
                        }
                        this.averageFieldLength = r;
                    }),
                    (_.Builder.prototype.createFieldVectors = function () {
                        for (
                            var e = {},
                                t = Object.keys(this.fieldTermFrequencies),
                                r = t.length,
                                i = Object.create(null),
                                n = 0;
                            n < r;
                            n++
                        ) {
                            for (
                                var s = _.FieldRef.fromString(t[n]),
                                    o = s.fieldName,
                                    a = this.fieldLengths[s],
                                    u = new _.Vector(),
                                    l = this.fieldTermFrequencies[s],
                                    c = Object.keys(l),
                                    h = c.length,
                                    d = this._fields[o].boost || 1,
                                    f = this._documents[s.docRef].boost || 1,
                                    p = 0;
                                p < h;
                                p++
                            ) {
                                var y,
                                    m,
                                    g,
                                    x = c[p],
                                    v = l[x],
                                    w = this.invertedIndex[x]._index;
                                void 0 === i[x]
                                    ? ((y = _.idf(this.invertedIndex[x], this.documentCount)), (i[x] = y))
                                    : (y = i[x]),
                                    (m =
                                        (y * ((this._k1 + 1) * v)) /
                                        (this._k1 * (1 - this._b + this._b * (a / this.averageFieldLength[o])) + v)),
                                    (m *= d),
                                    (m *= f),
                                    (g = Math.round(1e3 * m) / 1e3),
                                    u.insert(w, g);
                            }
                            e[s] = u;
                        }
                        this.fieldVectors = e;
                    }),
                    (_.Builder.prototype.createTokenSet = function () {
                        this.tokenSet = _.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
                    }),
                    (_.Builder.prototype.build = function () {
                        return (
                            this.calculateAverageFieldLengths(),
                            this.createFieldVectors(),
                            this.createTokenSet(),
                            new _.Index({
                                invertedIndex: this.invertedIndex,
                                fieldVectors: this.fieldVectors,
                                tokenSet: this.tokenSet,
                                fields: Object.keys(this._fields),
                                pipeline: this.searchPipeline,
                            })
                        );
                    }),
                    (_.Builder.prototype.use = function (e) {
                        var t = Array.prototype.slice.call(arguments, 1);
                        t.unshift(this), e.apply(this, t);
                    }),
                    (_.MatchData = function (e, t, r) {
                        for (var i = Object.create(null), n = Object.keys(r || {}), s = 0; s < n.length; s++) {
                            var o = n[s];
                            i[o] = r[o].slice();
                        }
                        (this.metadata = Object.create(null)),
                            void 0 !== e && ((this.metadata[e] = Object.create(null)), (this.metadata[e][t] = i));
                    }),
                    (_.MatchData.prototype.combine = function (e) {
                        for (var t = Object.keys(e.metadata), r = 0; r < t.length; r++) {
                            var i = t[r],
                                n = Object.keys(e.metadata[i]);
                            null == this.metadata[i] && (this.metadata[i] = Object.create(null));
                            for (var s = 0; s < n.length; s++) {
                                var o = n[s],
                                    a = Object.keys(e.metadata[i][o]);
                                null == this.metadata[i][o] && (this.metadata[i][o] = Object.create(null));
                                for (var u = 0; u < a.length; u++) {
                                    var l = a[u];
                                    null == this.metadata[i][o][l]
                                        ? (this.metadata[i][o][l] = e.metadata[i][o][l])
                                        : (this.metadata[i][o][l] = this.metadata[i][o][l].concat(e.metadata[i][o][l]));
                                }
                            }
                        }
                    }),
                    (_.MatchData.prototype.add = function (e, t, r) {
                        if (!(e in this.metadata))
                            return (this.metadata[e] = Object.create(null)), void (this.metadata[e][t] = r);
                        if (t in this.metadata[e])
                            for (var i = Object.keys(r), n = 0; n < i.length; n++) {
                                var s = i[n];
                                s in this.metadata[e][t]
                                    ? (this.metadata[e][t][s] = this.metadata[e][t][s].concat(r[s]))
                                    : (this.metadata[e][t][s] = r[s]);
                            }
                        else this.metadata[e][t] = r;
                    }),
                    (_.Query = function (e) {
                        (this.clauses = []), (this.allFields = e);
                    }),
                    (_.Query.wildcard = new String('*')),
                    (_.Query.wildcard.NONE = 0),
                    (_.Query.wildcard.LEADING = 1),
                    (_.Query.wildcard.TRAILING = 2),
                    (_.Query.presence = { OPTIONAL: 1, REQUIRED: 2, PROHIBITED: 3 }),
                    (_.Query.prototype.clause = function (e) {
                        return (
                            'fields' in e || (e.fields = this.allFields),
                            'boost' in e || (e.boost = 1),
                            'usePipeline' in e || (e.usePipeline = !0),
                            'wildcard' in e || (e.wildcard = _.Query.wildcard.NONE),
                            e.wildcard & _.Query.wildcard.LEADING &&
                                e.term.charAt(0) != _.Query.wildcard &&
                                (e.term = '*' + e.term),
                            e.wildcard & _.Query.wildcard.TRAILING &&
                                e.term.slice(-1) != _.Query.wildcard &&
                                (e.term = e.term + '*'),
                            'presence' in e || (e.presence = _.Query.presence.OPTIONAL),
                            this.clauses.push(e),
                            this
                        );
                    }),
                    (_.Query.prototype.isNegated = function () {
                        for (var e = 0; e < this.clauses.length; e++)
                            if (this.clauses[e].presence != _.Query.presence.PROHIBITED) return !1;
                        return !0;
                    }),
                    (_.Query.prototype.term = function (e, t) {
                        if (Array.isArray(e))
                            return (
                                e.forEach(function (e) {
                                    this.term(e, _.utils.clone(t));
                                }, this),
                                this
                            );
                        var r = t || {};
                        return (r.term = e.toString()), this.clause(r), this;
                    }),
                    (_.QueryParseError = function (e, t, r) {
                        (this.name = 'QueryParseError'), (this.message = e), (this.start = t), (this.end = r);
                    }),
                    (_.QueryParseError.prototype = new Error()),
                    (_.QueryLexer = function (e) {
                        (this.lexemes = []),
                            (this.str = e),
                            (this.length = e.length),
                            (this.pos = 0),
                            (this.start = 0),
                            (this.escapeCharPositions = []);
                    }),
                    (_.QueryLexer.prototype.run = function () {
                        for (var e = _.QueryLexer.lexText; e; ) e = e(this);
                    }),
                    (_.QueryLexer.prototype.sliceString = function () {
                        for (var e = [], t = this.start, r = this.pos, i = 0; i < this.escapeCharPositions.length; i++)
                            (r = this.escapeCharPositions[i]), e.push(this.str.slice(t, r)), (t = r + 1);
                        return e.push(this.str.slice(t, this.pos)), (this.escapeCharPositions.length = 0), e.join('');
                    }),
                    (_.QueryLexer.prototype.emit = function (e) {
                        this.lexemes.push({ type: e, str: this.sliceString(), start: this.start, end: this.pos }),
                            (this.start = this.pos);
                    }),
                    (_.QueryLexer.prototype.escapeCharacter = function () {
                        this.escapeCharPositions.push(this.pos - 1), (this.pos += 1);
                    }),
                    (_.QueryLexer.prototype.next = function () {
                        if (this.pos >= this.length) return _.QueryLexer.EOS;
                        var e = this.str.charAt(this.pos);
                        return (this.pos += 1), e;
                    }),
                    (_.QueryLexer.prototype.width = function () {
                        return this.pos - this.start;
                    }),
                    (_.QueryLexer.prototype.ignore = function () {
                        this.start == this.pos && (this.pos += 1), (this.start = this.pos);
                    }),
                    (_.QueryLexer.prototype.backup = function () {
                        this.pos -= 1;
                    }),
                    (_.QueryLexer.prototype.acceptDigitRun = function () {
                        var e, t;
                        do {
                            t = (e = this.next()).charCodeAt(0);
                        } while (t > 47 && t < 58);
                        e != _.QueryLexer.EOS && this.backup();
                    }),
                    (_.QueryLexer.prototype.more = function () {
                        return this.pos < this.length;
                    }),
                    (_.QueryLexer.EOS = 'EOS'),
                    (_.QueryLexer.FIELD = 'FIELD'),
                    (_.QueryLexer.TERM = 'TERM'),
                    (_.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'),
                    (_.QueryLexer.BOOST = 'BOOST'),
                    (_.QueryLexer.PRESENCE = 'PRESENCE'),
                    (_.QueryLexer.lexField = function (e) {
                        return e.backup(), e.emit(_.QueryLexer.FIELD), e.ignore(), _.QueryLexer.lexText;
                    }),
                    (_.QueryLexer.lexTerm = function (e) {
                        if ((e.width() > 1 && (e.backup(), e.emit(_.QueryLexer.TERM)), e.ignore(), e.more()))
                            return _.QueryLexer.lexText;
                    }),
                    (_.QueryLexer.lexEditDistance = function (e) {
                        return e.ignore(), e.acceptDigitRun(), e.emit(_.QueryLexer.EDIT_DISTANCE), _.QueryLexer.lexText;
                    }),
                    (_.QueryLexer.lexBoost = function (e) {
                        return e.ignore(), e.acceptDigitRun(), e.emit(_.QueryLexer.BOOST), _.QueryLexer.lexText;
                    }),
                    (_.QueryLexer.lexEOS = function (e) {
                        e.width() > 0 && e.emit(_.QueryLexer.TERM);
                    }),
                    (_.QueryLexer.termSeparator = _.tokenizer.separator),
                    (_.QueryLexer.lexText = function (e) {
                        for (;;) {
                            var t = e.next();
                            if (t == _.QueryLexer.EOS) return _.QueryLexer.lexEOS;
                            if (92 != t.charCodeAt(0)) {
                                if (':' == t) return _.QueryLexer.lexField;
                                if ('~' == t)
                                    return (
                                        e.backup(),
                                        e.width() > 0 && e.emit(_.QueryLexer.TERM),
                                        _.QueryLexer.lexEditDistance
                                    );
                                if ('^' == t)
                                    return (
                                        e.backup(), e.width() > 0 && e.emit(_.QueryLexer.TERM), _.QueryLexer.lexBoost
                                    );
                                if ('+' == t && 1 === e.width())
                                    return e.emit(_.QueryLexer.PRESENCE), _.QueryLexer.lexText;
                                if ('-' == t && 1 === e.width())
                                    return e.emit(_.QueryLexer.PRESENCE), _.QueryLexer.lexText;
                                if (t.match(_.QueryLexer.termSeparator)) return _.QueryLexer.lexTerm;
                            } else e.escapeCharacter();
                        }
                    }),
                    (_.QueryParser = function (e, t) {
                        (this.lexer = new _.QueryLexer(e)),
                            (this.query = t),
                            (this.currentClause = {}),
                            (this.lexemeIdx = 0);
                    }),
                    (_.QueryParser.prototype.parse = function () {
                        this.lexer.run(), (this.lexemes = this.lexer.lexemes);
                        for (var e = _.QueryParser.parseClause; e; ) e = e(this);
                        return this.query;
                    }),
                    (_.QueryParser.prototype.peekLexeme = function () {
                        return this.lexemes[this.lexemeIdx];
                    }),
                    (_.QueryParser.prototype.consumeLexeme = function () {
                        var e = this.peekLexeme();
                        return (this.lexemeIdx += 1), e;
                    }),
                    (_.QueryParser.prototype.nextClause = function () {
                        var e = this.currentClause;
                        this.query.clause(e), (this.currentClause = {});
                    }),
                    (_.QueryParser.parseClause = function (e) {
                        var t = e.peekLexeme();
                        if (null != t)
                            switch (t.type) {
                                case _.QueryLexer.PRESENCE:
                                    return _.QueryParser.parsePresence;
                                case _.QueryLexer.FIELD:
                                    return _.QueryParser.parseField;
                                case _.QueryLexer.TERM:
                                    return _.QueryParser.parseTerm;
                                default:
                                    var r = 'expected either a field or a term, found ' + t.type;
                                    throw (
                                        (t.str.length >= 1 && (r += " with value '" + t.str + "'"),
                                        new _.QueryParseError(r, t.start, t.end))
                                    );
                            }
                    }),
                    (_.QueryParser.parsePresence = function (e) {
                        var t = e.consumeLexeme();
                        if (null != t) {
                            switch (t.str) {
                                case '-':
                                    e.currentClause.presence = _.Query.presence.PROHIBITED;
                                    break;
                                case '+':
                                    e.currentClause.presence = _.Query.presence.REQUIRED;
                                    break;
                                default:
                                    var r = "unrecognised presence operator'" + t.str + "'";
                                    throw new _.QueryParseError(r, t.start, t.end);
                            }
                            var i = e.peekLexeme();
                            if (null == i) {
                                r = 'expecting term or field, found nothing';
                                throw new _.QueryParseError(r, t.start, t.end);
                            }
                            switch (i.type) {
                                case _.QueryLexer.FIELD:
                                    return _.QueryParser.parseField;
                                case _.QueryLexer.TERM:
                                    return _.QueryParser.parseTerm;
                                default:
                                    r = "expecting term or field, found '" + i.type + "'";
                                    throw new _.QueryParseError(r, i.start, i.end);
                            }
                        }
                    }),
                    (_.QueryParser.parseField = function (e) {
                        var t = e.consumeLexeme();
                        if (null != t) {
                            if (-1 == e.query.allFields.indexOf(t.str)) {
                                var r = e.query.allFields
                                        .map(function (e) {
                                            return "'" + e + "'";
                                        })
                                        .join(', '),
                                    i = "unrecognised field '" + t.str + "', possible fields: " + r;
                                throw new _.QueryParseError(i, t.start, t.end);
                            }
                            e.currentClause.fields = [t.str];
                            var n = e.peekLexeme();
                            if (null == n) {
                                i = 'expecting term, found nothing';
                                throw new _.QueryParseError(i, t.start, t.end);
                            }
                            if (n.type === _.QueryLexer.TERM) return _.QueryParser.parseTerm;
                            i = "expecting term, found '" + n.type + "'";
                            throw new _.QueryParseError(i, n.start, n.end);
                        }
                    }),
                    (_.QueryParser.parseTerm = function (e) {
                        var t = e.consumeLexeme();
                        if (null != t) {
                            (e.currentClause.term = t.str.toLowerCase()),
                                -1 != t.str.indexOf('*') && (e.currentClause.usePipeline = !1);
                            var r = e.peekLexeme();
                            if (null != r)
                                switch (r.type) {
                                    case _.QueryLexer.TERM:
                                        return e.nextClause(), _.QueryParser.parseTerm;
                                    case _.QueryLexer.FIELD:
                                        return e.nextClause(), _.QueryParser.parseField;
                                    case _.QueryLexer.EDIT_DISTANCE:
                                        return _.QueryParser.parseEditDistance;
                                    case _.QueryLexer.BOOST:
                                        return _.QueryParser.parseBoost;
                                    case _.QueryLexer.PRESENCE:
                                        return e.nextClause(), _.QueryParser.parsePresence;
                                    default:
                                        var i = "Unexpected lexeme type '" + r.type + "'";
                                        throw new _.QueryParseError(i, r.start, r.end);
                                }
                            else e.nextClause();
                        }
                    }),
                    (_.QueryParser.parseEditDistance = function (e) {
                        var t = e.consumeLexeme();
                        if (null != t) {
                            var r = parseInt(t.str, 10);
                            if (isNaN(r)) {
                                var i = 'edit distance must be numeric';
                                throw new _.QueryParseError(i, t.start, t.end);
                            }
                            e.currentClause.editDistance = r;
                            var n = e.peekLexeme();
                            if (null != n)
                                switch (n.type) {
                                    case _.QueryLexer.TERM:
                                        return e.nextClause(), _.QueryParser.parseTerm;
                                    case _.QueryLexer.FIELD:
                                        return e.nextClause(), _.QueryParser.parseField;
                                    case _.QueryLexer.EDIT_DISTANCE:
                                        return _.QueryParser.parseEditDistance;
                                    case _.QueryLexer.BOOST:
                                        return _.QueryParser.parseBoost;
                                    case _.QueryLexer.PRESENCE:
                                        return e.nextClause(), _.QueryParser.parsePresence;
                                    default:
                                        i = "Unexpected lexeme type '" + n.type + "'";
                                        throw new _.QueryParseError(i, n.start, n.end);
                                }
                            else e.nextClause();
                        }
                    }),
                    (_.QueryParser.parseBoost = function (e) {
                        var t = e.consumeLexeme();
                        if (null != t) {
                            var r = parseInt(t.str, 10);
                            if (isNaN(r)) {
                                var i = 'boost must be numeric';
                                throw new _.QueryParseError(i, t.start, t.end);
                            }
                            e.currentClause.boost = r;
                            var n = e.peekLexeme();
                            if (null != n)
                                switch (n.type) {
                                    case _.QueryLexer.TERM:
                                        return e.nextClause(), _.QueryParser.parseTerm;
                                    case _.QueryLexer.FIELD:
                                        return e.nextClause(), _.QueryParser.parseField;
                                    case _.QueryLexer.EDIT_DISTANCE:
                                        return _.QueryParser.parseEditDistance;
                                    case _.QueryLexer.BOOST:
                                        return _.QueryParser.parseBoost;
                                    case _.QueryLexer.PRESENCE:
                                        return e.nextClause(), _.QueryParser.parsePresence;
                                    default:
                                        i = "Unexpected lexeme type '" + n.type + "'";
                                        throw new _.QueryParseError(i, n.start, n.end);
                                }
                            else e.nextClause();
                        }
                    }),
                    void 0 ===
                        (n =
                            'function' ==
                            typeof (i = function () {
                                return _;
                            })
                                ? i.call(t, r, t, e)
                                : i) || (e.exports = n);
            })();
        },
    },
]);
