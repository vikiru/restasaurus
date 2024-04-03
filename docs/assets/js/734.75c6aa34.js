(self.webpackChunkrestasaurus_docs = self.webpackChunkrestasaurus_docs || []).push([
    [734],
    {
        1639: (t, e, n) => {
            'use strict';
            t.exports = n(9281);
        },
        7114: (t, e, n) => {
            'use strict';
            var i = n(5670),
                s = {
                    wrapper: { position: 'relative', display: 'inline-block' },
                    hint: {
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        borderColor: 'transparent',
                        boxShadow: 'none',
                        opacity: '1',
                    },
                    input: { position: 'relative', verticalAlign: 'top', backgroundColor: 'transparent' },
                    inputWithNoHint: { position: 'relative', verticalAlign: 'top' },
                    dropdown: { position: 'absolute', top: '100%', left: '0', zIndex: '100', display: 'none' },
                    suggestions: { display: 'block' },
                    suggestion: { whiteSpace: 'nowrap', cursor: 'pointer' },
                    suggestionChild: { whiteSpace: 'normal' },
                    ltr: { left: '0', right: 'auto' },
                    rtl: { left: 'auto', right: '0' },
                    defaultClasses: {
                        root: 'algolia-autocomplete',
                        prefix: 'aa',
                        noPrefix: !1,
                        dropdownMenu: 'dropdown-menu',
                        input: 'input',
                        hint: 'hint',
                        suggestions: 'suggestions',
                        suggestion: 'suggestion',
                        cursor: 'cursor',
                        dataset: 'dataset',
                        empty: 'empty',
                    },
                    appendTo: {
                        wrapper: { position: 'absolute', zIndex: '100', display: 'none' },
                        input: {},
                        inputWithNoHint: {},
                        dropdown: { display: 'block' },
                    },
                };
            i.isMsie() &&
                i.mixin(s.input, {
                    backgroundImage:
                        'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                }),
                i.isMsie() && i.isMsie() <= 7 && i.mixin(s.input, { marginTop: '-1px' }),
                (t.exports = s);
        },
        3312: (t, e, n) => {
            'use strict';
            var i = 'aaDataset',
                s = 'aaValue',
                r = 'aaDatum',
                a = n(5670),
                o = n(3855),
                u = n(6619),
                c = n(7114),
                l = n(6823);
            function h(t) {
                var e;
                ((t = t || {}).templates = t.templates || {}),
                    t.source || a.error('missing source'),
                    t.name && ((e = t.name), !/^[_a-zA-Z0-9-]+$/.test(e)) && a.error('invalid dataset name: ' + t.name),
                    (this.query = null),
                    (this._isEmpty = !0),
                    (this.highlight = !!t.highlight),
                    (this.name = void 0 === t.name || null === t.name ? a.getUniqueId() : t.name),
                    (this.source = t.source),
                    (this.displayFn = (function (t) {
                        return (t = t || 'value'), a.isFunction(t) ? t : e;
                        function e(e) {
                            return e[t];
                        }
                    })(t.display || t.displayKey)),
                    (this.debounce = t.debounce),
                    (this.cache = !1 !== t.cache),
                    (this.templates = (function (t, e) {
                        return {
                            empty: t.empty && a.templatify(t.empty),
                            header: t.header && a.templatify(t.header),
                            footer: t.footer && a.templatify(t.footer),
                            suggestion: t.suggestion || n,
                        };
                        function n(t) {
                            return '<p>' + e(t) + '</p>';
                        }
                    })(t.templates, this.displayFn)),
                    (this.css = a.mixin({}, c, t.appendTo ? c.appendTo : {})),
                    (this.cssClasses = t.cssClasses = a.mixin({}, c.defaultClasses, t.cssClasses || {})),
                    (this.cssClasses.prefix =
                        t.cssClasses.formattedPrefix ||
                        a.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix));
                var n = a.className(this.cssClasses.prefix, this.cssClasses.dataset);
                (this.$el =
                    t.$menu && t.$menu.find(n + '-' + this.name).length > 0
                        ? o.element(t.$menu.find(n + '-' + this.name)[0])
                        : o.element(
                              u.dataset
                                  .replace('%CLASS%', this.name)
                                  .replace('%PREFIX%', this.cssClasses.prefix)
                                  .replace('%DATASET%', this.cssClasses.dataset),
                          )),
                    (this.$menu = t.$menu),
                    this.clearCachedSuggestions();
            }
            (h.extractDatasetName = function (t) {
                return o.element(t).data(i);
            }),
                (h.extractValue = function (t) {
                    return o.element(t).data(s);
                }),
                (h.extractDatum = function (t) {
                    var e = o.element(t).data(r);
                    return 'string' == typeof e && (e = JSON.parse(e)), e;
                }),
                a.mixin(h.prototype, l, {
                    _render: function (t, e) {
                        if (this.$el) {
                            var n,
                                c = this,
                                l = [].slice.call(arguments, 2);
                            if (
                                (this.$el.empty(),
                                (n = e && e.length),
                                (this._isEmpty = !n),
                                !n && this.templates.empty)
                            )
                                this.$el
                                    .html(
                                        function () {
                                            var e = [].slice.call(arguments, 0);
                                            return (
                                                (e = [{ query: t, isEmpty: !0 }].concat(e)),
                                                c.templates.empty.apply(this, e)
                                            );
                                        }.apply(this, l),
                                    )
                                    .prepend(c.templates.header ? h.apply(this, l) : null)
                                    .append(c.templates.footer ? p.apply(this, l) : null);
                            else if (n)
                                this.$el
                                    .html(
                                        function () {
                                            var t,
                                                n,
                                                l = [].slice.call(arguments, 0),
                                                h = this,
                                                p = u.suggestions
                                                    .replace('%PREFIX%', this.cssClasses.prefix)
                                                    .replace('%SUGGESTIONS%', this.cssClasses.suggestions);
                                            return (
                                                (t = o.element(p).css(this.css.suggestions)),
                                                (n = a.map(e, d)),
                                                t.append.apply(t, n),
                                                t
                                            );
                                            function d(t) {
                                                var e,
                                                    n = u.suggestion
                                                        .replace('%PREFIX%', h.cssClasses.prefix)
                                                        .replace('%SUGGESTION%', h.cssClasses.suggestion);
                                                return (
                                                    (e = o
                                                        .element(n)
                                                        .attr({
                                                            role: 'option',
                                                            id: ['option', Math.floor(1e8 * Math.random())].join('-'),
                                                        })
                                                        .append(
                                                            c.templates.suggestion.apply(this, [t].concat(l)),
                                                        )).data(i, c.name),
                                                    e.data(s, c.displayFn(t) || void 0),
                                                    e.data(r, JSON.stringify(t)),
                                                    e.children().each(function () {
                                                        o.element(this).css(h.css.suggestionChild);
                                                    }),
                                                    e
                                                );
                                            }
                                        }.apply(this, l),
                                    )
                                    .prepend(c.templates.header ? h.apply(this, l) : null)
                                    .append(c.templates.footer ? p.apply(this, l) : null);
                            else if (e && !Array.isArray(e)) throw new TypeError('suggestions must be an array');
                            this.$menu &&
                                this.$menu
                                    .addClass(this.cssClasses.prefix + (n ? 'with' : 'without') + '-' + this.name)
                                    .removeClass(this.cssClasses.prefix + (n ? 'without' : 'with') + '-' + this.name),
                                this.trigger('rendered', t);
                        }
                        function h() {
                            var e = [].slice.call(arguments, 0);
                            return (e = [{ query: t, isEmpty: !n }].concat(e)), c.templates.header.apply(this, e);
                        }
                        function p() {
                            var e = [].slice.call(arguments, 0);
                            return (e = [{ query: t, isEmpty: !n }].concat(e)), c.templates.footer.apply(this, e);
                        }
                    },
                    getRoot: function () {
                        return this.$el;
                    },
                    update: function (t) {
                        function e(e) {
                            if (!this.canceled && t === this.query) {
                                var n = [].slice.call(arguments, 1);
                                this.cacheSuggestions(t, e, n), this._render.apply(this, [t, e].concat(n));
                            }
                        }
                        if (((this.query = t), (this.canceled = !1), this.shouldFetchFromCache(t)))
                            e.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
                        else {
                            var n = this,
                                i = function () {
                                    n.canceled || n.source(t, e.bind(n));
                                };
                            if (this.debounce) {
                                clearTimeout(this.debounceTimeout),
                                    (this.debounceTimeout = setTimeout(function () {
                                        (n.debounceTimeout = null), i();
                                    }, this.debounce));
                            } else i();
                        }
                    },
                    cacheSuggestions: function (t, e, n) {
                        (this.cachedQuery = t), (this.cachedSuggestions = e), (this.cachedRenderExtraArgs = n);
                    },
                    shouldFetchFromCache: function (t) {
                        return (
                            this.cache &&
                            this.cachedQuery === t &&
                            this.cachedSuggestions &&
                            this.cachedSuggestions.length
                        );
                    },
                    clearCachedSuggestions: function () {
                        delete this.cachedQuery, delete this.cachedSuggestions, delete this.cachedRenderExtraArgs;
                    },
                    cancel: function () {
                        this.canceled = !0;
                    },
                    clear: function () {
                        this.$el && (this.cancel(), this.$el.empty(), this.trigger('rendered', ''));
                    },
                    isEmpty: function () {
                        return this._isEmpty;
                    },
                    destroy: function () {
                        this.clearCachedSuggestions(), (this.$el = null);
                    },
                }),
                (t.exports = h);
        },
        5445: (t, e, n) => {
            'use strict';
            var i = n(5670),
                s = n(3855),
                r = n(6823),
                a = n(3312),
                o = n(7114);
            function u(t) {
                var e,
                    n,
                    r,
                    a = this;
                (t = t || {}).menu || i.error('menu is required'),
                    i.isArray(t.datasets) || i.isObject(t.datasets) || i.error('1 or more datasets required'),
                    t.datasets || i.error('datasets is required'),
                    (this.isOpen = !1),
                    (this.isEmpty = !0),
                    (this.minLength = t.minLength || 0),
                    (this.templates = {}),
                    (this.appendTo = t.appendTo || !1),
                    (this.css = i.mixin({}, o, t.appendTo ? o.appendTo : {})),
                    (this.cssClasses = t.cssClasses = i.mixin({}, o.defaultClasses, t.cssClasses || {})),
                    (this.cssClasses.prefix =
                        t.cssClasses.formattedPrefix ||
                        i.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix)),
                    (e = i.bind(this._onSuggestionClick, this)),
                    (n = i.bind(this._onSuggestionMouseEnter, this)),
                    (r = i.bind(this._onSuggestionMouseLeave, this));
                var c = i.className(this.cssClasses.prefix, this.cssClasses.suggestion);
                (this.$menu = s
                    .element(t.menu)
                    .on('mouseenter.aa', c, n)
                    .on('mouseleave.aa', c, r)
                    .on('click.aa', c, e)),
                    (this.$container = t.appendTo ? t.wrapper : this.$menu),
                    t.templates &&
                        t.templates.header &&
                        ((this.templates.header = i.templatify(t.templates.header)),
                        this.$menu.prepend(this.templates.header())),
                    t.templates &&
                        t.templates.empty &&
                        ((this.templates.empty = i.templatify(t.templates.empty)),
                        (this.$empty = s.element(
                            '<div class="' +
                                i.className(this.cssClasses.prefix, this.cssClasses.empty, !0) +
                                '"></div>',
                        )),
                        this.$menu.append(this.$empty),
                        this.$empty.hide()),
                    (this.datasets = i.map(t.datasets, function (e) {
                        return (function (t, e, n) {
                            return new u.Dataset(i.mixin({ $menu: t, cssClasses: n }, e));
                        })(a.$menu, e, t.cssClasses);
                    })),
                    i.each(this.datasets, function (t) {
                        var e = t.getRoot();
                        e && 0 === e.parent().length && a.$menu.append(e), t.onSync('rendered', a._onRendered, a);
                    }),
                    t.templates &&
                        t.templates.footer &&
                        ((this.templates.footer = i.templatify(t.templates.footer)),
                        this.$menu.append(this.templates.footer()));
                var l = this;
                s.element(window).resize(function () {
                    l._redraw();
                });
            }
            i.mixin(u.prototype, r, {
                _onSuggestionClick: function (t) {
                    this.trigger('suggestionClicked', s.element(t.currentTarget));
                },
                _onSuggestionMouseEnter: function (t) {
                    var e = s.element(t.currentTarget);
                    if (!e.hasClass(i.className(this.cssClasses.prefix, this.cssClasses.cursor, !0))) {
                        this._removeCursor();
                        var n = this;
                        setTimeout(function () {
                            n._setCursor(e, !1);
                        }, 0);
                    }
                },
                _onSuggestionMouseLeave: function (t) {
                    if (
                        t.relatedTarget &&
                        s
                            .element(t.relatedTarget)
                            .closest('.' + i.className(this.cssClasses.prefix, this.cssClasses.cursor, !0)).length > 0
                    )
                        return;
                    this._removeCursor(), this.trigger('cursorRemoved');
                },
                _onRendered: function (t, e) {
                    if (
                        ((this.isEmpty = i.every(this.datasets, function (t) {
                            return t.isEmpty();
                        })),
                        this.isEmpty)
                    )
                        if ((e.length >= this.minLength && this.trigger('empty'), this.$empty))
                            if (e.length < this.minLength) this._hide();
                            else {
                                var n = this.templates.empty({ query: this.datasets[0] && this.datasets[0].query });
                                this.$empty.html(n), this.$empty.show(), this._show();
                            }
                        else
                            i.any(this.datasets, function (t) {
                                return t.templates && t.templates.empty;
                            })
                                ? e.length < this.minLength
                                    ? this._hide()
                                    : this._show()
                                : this._hide();
                    else
                        this.isOpen &&
                            (this.$empty && (this.$empty.empty(), this.$empty.hide()),
                            e.length >= this.minLength ? this._show() : this._hide());
                    this.trigger('datasetRendered');
                },
                _hide: function () {
                    this.$container.hide();
                },
                _show: function () {
                    this.$container.css('display', 'block'), this._redraw(), this.trigger('shown');
                },
                _redraw: function () {
                    this.isOpen && this.appendTo && this.trigger('redrawn');
                },
                _getSuggestions: function () {
                    return this.$menu.find(i.className(this.cssClasses.prefix, this.cssClasses.suggestion));
                },
                _getCursor: function () {
                    return this.$menu.find(i.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
                },
                _setCursor: function (t, e) {
                    t
                        .first()
                        .addClass(i.className(this.cssClasses.prefix, this.cssClasses.cursor, !0))
                        .attr('aria-selected', 'true'),
                        this.trigger('cursorMoved', e);
                },
                _removeCursor: function () {
                    this._getCursor()
                        .removeClass(i.className(this.cssClasses.prefix, this.cssClasses.cursor, !0))
                        .removeAttr('aria-selected');
                },
                _moveCursor: function (t) {
                    var e, n, i, s;
                    this.isOpen &&
                        ((n = this._getCursor()),
                        (e = this._getSuggestions()),
                        this._removeCursor(),
                        -1 !== (i = (((i = e.index(n) + t) + 1) % (e.length + 1)) - 1)
                            ? (i < -1 && (i = e.length - 1), this._setCursor((s = e.eq(i)), !0), this._ensureVisible(s))
                            : this.trigger('cursorRemoved'));
                },
                _ensureVisible: function (t) {
                    var e, n, i, s;
                    (n =
                        (e = t.position().top) +
                        t.height() +
                        parseInt(t.css('margin-top'), 10) +
                        parseInt(t.css('margin-bottom'), 10)),
                        (i = this.$menu.scrollTop()),
                        (s =
                            this.$menu.height() +
                            parseInt(this.$menu.css('padding-top'), 10) +
                            parseInt(this.$menu.css('padding-bottom'), 10)),
                        e < 0 ? this.$menu.scrollTop(i + e) : s < n && this.$menu.scrollTop(i + (n - s));
                },
                close: function () {
                    this.isOpen && ((this.isOpen = !1), this._removeCursor(), this._hide(), this.trigger('closed'));
                },
                open: function () {
                    this.isOpen || ((this.isOpen = !0), this.isEmpty || this._show(), this.trigger('opened'));
                },
                setLanguageDirection: function (t) {
                    this.$menu.css('ltr' === t ? this.css.ltr : this.css.rtl);
                },
                moveCursorUp: function () {
                    this._moveCursor(-1);
                },
                moveCursorDown: function () {
                    this._moveCursor(1);
                },
                getDatumForSuggestion: function (t) {
                    var e = null;
                    return (
                        t.length &&
                            (e = {
                                raw: a.extractDatum(t),
                                value: a.extractValue(t),
                                datasetName: a.extractDatasetName(t),
                            }),
                        e
                    );
                },
                getCurrentCursor: function () {
                    return this._getCursor().first();
                },
                getDatumForCursor: function () {
                    return this.getDatumForSuggestion(this._getCursor().first());
                },
                getDatumForTopSuggestion: function () {
                    return this.getDatumForSuggestion(this._getSuggestions().first());
                },
                cursorTopSuggestion: function () {
                    this._setCursor(this._getSuggestions().first(), !1);
                },
                update: function (t) {
                    i.each(this.datasets, function (e) {
                        e.update(t);
                    });
                },
                empty: function () {
                    i.each(this.datasets, function (t) {
                        t.clear();
                    }),
                        (this.isEmpty = !0);
                },
                isVisible: function () {
                    return this.isOpen && !this.isEmpty;
                },
                destroy: function () {
                    this.$menu.off('.aa'),
                        (this.$menu = null),
                        i.each(this.datasets, function (t) {
                            t.destroy();
                        });
                },
            }),
                (u.Dataset = a),
                (t.exports = u);
        },
        7368: (t, e, n) => {
            'use strict';
            var i = n(5670),
                s = n(3855);
            function r(t) {
                (t && t.el) || i.error('EventBus initialized without el'), (this.$el = s.element(t.el));
            }
            i.mixin(r.prototype, {
                trigger: function (t, e, n, s) {
                    var r = i.Event('autocomplete:' + t);
                    return this.$el.trigger(r, [e, n, s]), r;
                },
            }),
                (t.exports = r);
        },
        6823: (t, e, n) => {
            'use strict';
            var i = n(624),
                s = /\s+/;
            function r(t, e, n, i) {
                var r;
                if (!n) return this;
                for (
                    e = e.split(s),
                        n = i
                            ? (function (t, e) {
                                  return t.bind
                                      ? t.bind(e)
                                      : function () {
                                            t.apply(e, [].slice.call(arguments, 0));
                                        };
                              })(n, i)
                            : n,
                        this._callbacks = this._callbacks || {};
                    (r = e.shift());

                )
                    (this._callbacks[r] = this._callbacks[r] || { sync: [], async: [] }), this._callbacks[r][t].push(n);
                return this;
            }
            function a(t, e, n) {
                return function () {
                    for (var i, s = 0, r = t.length; !i && s < r; s += 1) i = !1 === t[s].apply(e, n);
                    return !i;
                };
            }
            t.exports = {
                onSync: function (t, e, n) {
                    return r.call(this, 'sync', t, e, n);
                },
                onAsync: function (t, e, n) {
                    return r.call(this, 'async', t, e, n);
                },
                off: function (t) {
                    var e;
                    if (!this._callbacks) return this;
                    t = t.split(s);
                    for (; (e = t.shift()); ) delete this._callbacks[e];
                    return this;
                },
                trigger: function (t) {
                    var e, n, r, o, u;
                    if (!this._callbacks) return this;
                    (t = t.split(s)), (r = [].slice.call(arguments, 1));
                    for (; (e = t.shift()) && (n = this._callbacks[e]); )
                        (o = a(n.sync, this, [e].concat(r))), (u = a(n.async, this, [e].concat(r))), o() && i(u);
                    return this;
                },
            };
        },
        6619: (t) => {
            'use strict';
            t.exports = {
                wrapper: '<span class="%ROOT%"></span>',
                dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
                dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
                suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
                suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>',
            };
        },
        1286: (t, e, n) => {
            'use strict';
            var i;
            i = { 9: 'tab', 27: 'esc', 37: 'left', 39: 'right', 13: 'enter', 38: 'up', 40: 'down' };
            var s = n(5670),
                r = n(3855),
                a = n(6823);
            function o(t) {
                var e,
                    n,
                    a,
                    o,
                    u,
                    c = this;
                (t = t || {}).input || s.error('input is missing'),
                    (e = s.bind(this._onBlur, this)),
                    (n = s.bind(this._onFocus, this)),
                    (a = s.bind(this._onKeydown, this)),
                    (o = s.bind(this._onInput, this)),
                    (this.$hint = r.element(t.hint)),
                    (this.$input = r.element(t.input).on('blur.aa', e).on('focus.aa', n).on('keydown.aa', a)),
                    0 === this.$hint.length &&
                        (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = s.noop),
                    s.isMsie()
                        ? this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function (t) {
                              i[t.which || t.keyCode] || s.defer(s.bind(c._onInput, c, t));
                          })
                        : this.$input.on('input.aa', o),
                    (this.query = this.$input.val()),
                    (this.$overflowHelper =
                        ((u = this.$input),
                        r
                            .element('<pre aria-hidden="true"></pre>')
                            .css({
                                position: 'absolute',
                                visibility: 'hidden',
                                whiteSpace: 'pre',
                                fontFamily: u.css('font-family'),
                                fontSize: u.css('font-size'),
                                fontStyle: u.css('font-style'),
                                fontVariant: u.css('font-variant'),
                                fontWeight: u.css('font-weight'),
                                wordSpacing: u.css('word-spacing'),
                                letterSpacing: u.css('letter-spacing'),
                                textIndent: u.css('text-indent'),
                                textRendering: u.css('text-rendering'),
                                textTransform: u.css('text-transform'),
                            })
                            .insertAfter(u)));
            }
            function u(t) {
                return t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
            }
            (o.normalizeQuery = function (t) {
                return (t || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
            }),
                s.mixin(o.prototype, a, {
                    _onBlur: function () {
                        this.resetInputValue(),
                            this.$input.removeAttr('aria-activedescendant'),
                            this.trigger('blurred');
                    },
                    _onFocus: function () {
                        this.trigger('focused');
                    },
                    _onKeydown: function (t) {
                        var e = i[t.which || t.keyCode];
                        this._managePreventDefault(e, t),
                            e && this._shouldTrigger(e, t) && this.trigger(e + 'Keyed', t);
                    },
                    _onInput: function () {
                        this._checkInputValue();
                    },
                    _managePreventDefault: function (t, e) {
                        var n, i, s;
                        switch (t) {
                            case 'tab':
                                (i = this.getHint()), (s = this.getInputValue()), (n = i && i !== s && !u(e));
                                break;
                            case 'up':
                            case 'down':
                                n = !u(e);
                                break;
                            default:
                                n = !1;
                        }
                        n && e.preventDefault();
                    },
                    _shouldTrigger: function (t, e) {
                        var n;
                        if ('tab' === t) n = !u(e);
                        else n = !0;
                        return n;
                    },
                    _checkInputValue: function () {
                        var t, e, n, i, s;
                        (t = this.getInputValue()),
                            (i = t),
                            (s = this.query),
                            (n =
                                !(!(e = o.normalizeQuery(i) === o.normalizeQuery(s)) || !this.query) &&
                                this.query.length !== t.length),
                            (this.query = t),
                            e
                                ? n && this.trigger('whitespaceChanged', this.query)
                                : this.trigger('queryChanged', this.query);
                    },
                    focus: function () {
                        this.$input.focus();
                    },
                    blur: function () {
                        this.$input.blur();
                    },
                    getQuery: function () {
                        return this.query;
                    },
                    setQuery: function (t) {
                        this.query = t;
                    },
                    getInputValue: function () {
                        return this.$input.val();
                    },
                    setInputValue: function (t, e) {
                        void 0 === t && (t = this.query),
                            this.$input.val(t),
                            e ? this.clearHint() : this._checkInputValue();
                    },
                    expand: function () {
                        this.$input.attr('aria-expanded', 'true');
                    },
                    collapse: function () {
                        this.$input.attr('aria-expanded', 'false');
                    },
                    setActiveDescendant: function (t) {
                        this.$input.attr('aria-activedescendant', t);
                    },
                    removeActiveDescendant: function () {
                        this.$input.removeAttr('aria-activedescendant');
                    },
                    resetInputValue: function () {
                        this.setInputValue(this.query, !0);
                    },
                    getHint: function () {
                        return this.$hint.val();
                    },
                    setHint: function (t) {
                        this.$hint.val(t);
                    },
                    clearHint: function () {
                        this.setHint('');
                    },
                    clearHintIfInvalid: function () {
                        var t, e, n;
                        (n = (t = this.getInputValue()) !== (e = this.getHint()) && 0 === e.indexOf(t)),
                            ('' !== t && n && !this.hasOverflow()) || this.clearHint();
                    },
                    getLanguageDirection: function () {
                        return (this.$input.css('direction') || 'ltr').toLowerCase();
                    },
                    hasOverflow: function () {
                        var t = this.$input.width() - 2;
                        return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= t;
                    },
                    isCursorAtEnd: function () {
                        var t, e, n;
                        return (
                            (t = this.$input.val().length),
                            (e = this.$input[0].selectionStart),
                            s.isNumber(e)
                                ? e === t
                                : !document.selection ||
                                  ((n = document.selection.createRange()).moveStart('character', -t),
                                  t === n.text.length)
                        );
                    },
                    destroy: function () {
                        this.$hint.off('.aa'),
                            this.$input.off('.aa'),
                            (this.$hint = this.$input = this.$overflowHelper = null);
                    },
                }),
                (t.exports = o);
        },
        4520: (t, e, n) => {
            'use strict';
            var i = 'aaAttrs',
                s = n(5670),
                r = n(3855),
                a = n(7368),
                o = n(1286),
                u = n(5445),
                c = n(6619),
                l = n(7114);
            function h(t) {
                var e, n;
                if (
                    ((t = t || {}).input || s.error('missing input'),
                    (this.isActivated = !1),
                    (this.debug = !!t.debug),
                    (this.autoselect = !!t.autoselect),
                    (this.autoselectOnBlur = !!t.autoselectOnBlur),
                    (this.openOnFocus = !!t.openOnFocus),
                    (this.minLength = s.isNumber(t.minLength) ? t.minLength : 1),
                    (this.autoWidth = void 0 === t.autoWidth || !!t.autoWidth),
                    (this.clearOnSelected = !!t.clearOnSelected),
                    (this.tabAutocomplete = void 0 === t.tabAutocomplete || !!t.tabAutocomplete),
                    (t.hint = !!t.hint),
                    t.hint && t.appendTo)
                )
                    throw new Error("[autocomplete.js] hint and appendTo options can't be used at the same time");
                (this.css = t.css = s.mixin({}, l, t.appendTo ? l.appendTo : {})),
                    (this.cssClasses = t.cssClasses = s.mixin({}, l.defaultClasses, t.cssClasses || {})),
                    (this.cssClasses.prefix = t.cssClasses.formattedPrefix =
                        s.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix)),
                    (this.listboxId = t.listboxId = [this.cssClasses.root, 'listbox', s.getUniqueId()].join('-'));
                var o = (function (t) {
                    var e, n, a, o;
                    (e = r.element(t.input)),
                        (n = r.element(c.wrapper.replace('%ROOT%', t.cssClasses.root)).css(t.css.wrapper)),
                        t.appendTo ||
                            'block' !== e.css('display') ||
                            'table' !== e.parent().css('display') ||
                            n.css('display', 'table-cell');
                    var u = c.dropdown
                        .replace('%PREFIX%', t.cssClasses.prefix)
                        .replace('%DROPDOWN_MENU%', t.cssClasses.dropdownMenu);
                    (a = r.element(u).css(t.css.dropdown).attr({ role: 'listbox', id: t.listboxId })),
                        t.templates && t.templates.dropdownMenu && a.html(s.templatify(t.templates.dropdownMenu)());
                    (o = e
                        .clone()
                        .css(t.css.hint)
                        .css(
                            (function (t) {
                                return {
                                    backgroundAttachment: t.css('background-attachment'),
                                    backgroundClip: t.css('background-clip'),
                                    backgroundColor: t.css('background-color'),
                                    backgroundImage: t.css('background-image'),
                                    backgroundOrigin: t.css('background-origin'),
                                    backgroundPosition: t.css('background-position'),
                                    backgroundRepeat: t.css('background-repeat'),
                                    backgroundSize: t.css('background-size'),
                                };
                            })(e),
                        )),
                        o
                            .val('')
                            .addClass(s.className(t.cssClasses.prefix, t.cssClasses.hint, !0))
                            .removeAttr('id name placeholder required')
                            .prop('readonly', !0)
                            .attr({ 'aria-hidden': 'true', autocomplete: 'off', spellcheck: 'false', tabindex: -1 }),
                        o.removeData && o.removeData();
                    e.data(i, {
                        'aria-autocomplete': e.attr('aria-autocomplete'),
                        'aria-expanded': e.attr('aria-expanded'),
                        'aria-owns': e.attr('aria-owns'),
                        autocomplete: e.attr('autocomplete'),
                        dir: e.attr('dir'),
                        role: e.attr('role'),
                        spellcheck: e.attr('spellcheck'),
                        style: e.attr('style'),
                        type: e.attr('type'),
                    }),
                        e
                            .addClass(s.className(t.cssClasses.prefix, t.cssClasses.input, !0))
                            .attr({
                                autocomplete: 'off',
                                spellcheck: !1,
                                role: 'combobox',
                                'aria-autocomplete':
                                    t.datasets && t.datasets[0] && t.datasets[0].displayKey ? 'both' : 'list',
                                'aria-expanded': 'false',
                                'aria-label': t.ariaLabel,
                                'aria-owns': t.listboxId,
                            })
                            .css(t.hint ? t.css.input : t.css.inputWithNoHint);
                    try {
                        e.attr('dir') || e.attr('dir', 'auto');
                    } catch (l) {}
                    return (
                        (n = t.appendTo ? n.appendTo(r.element(t.appendTo).eq(0)).eq(0) : e.wrap(n).parent()),
                        n.prepend(t.hint ? o : null).append(a),
                        { wrapper: n, input: e, hint: o, menu: a }
                    );
                })(t);
                this.$node = o.wrapper;
                var u = (this.$input = o.input);
                (e = o.menu),
                    (n = o.hint),
                    t.dropdownMenuContainer &&
                        r.element(t.dropdownMenuContainer).css('position', 'relative').append(e.css('top', '0')),
                    u.on('blur.aa', function (t) {
                        var n = document.activeElement;
                        s.isMsie() &&
                            (e[0] === n || e[0].contains(n)) &&
                            (t.preventDefault(),
                            t.stopImmediatePropagation(),
                            s.defer(function () {
                                u.focus();
                            }));
                    }),
                    e.on('mousedown.aa', function (t) {
                        t.preventDefault();
                    }),
                    (this.eventBus = t.eventBus || new a({ el: u })),
                    (this.dropdown = new h.Dropdown({
                        appendTo: t.appendTo,
                        wrapper: this.$node,
                        menu: e,
                        datasets: t.datasets,
                        templates: t.templates,
                        cssClasses: t.cssClasses,
                        minLength: this.minLength,
                    })
                        .onSync('suggestionClicked', this._onSuggestionClicked, this)
                        .onSync('cursorMoved', this._onCursorMoved, this)
                        .onSync('cursorRemoved', this._onCursorRemoved, this)
                        .onSync('opened', this._onOpened, this)
                        .onSync('closed', this._onClosed, this)
                        .onSync('shown', this._onShown, this)
                        .onSync('empty', this._onEmpty, this)
                        .onSync('redrawn', this._onRedrawn, this)
                        .onAsync('datasetRendered', this._onDatasetRendered, this)),
                    (this.input = new h.Input({ input: u, hint: n })
                        .onSync('focused', this._onFocused, this)
                        .onSync('blurred', this._onBlurred, this)
                        .onSync('enterKeyed', this._onEnterKeyed, this)
                        .onSync('tabKeyed', this._onTabKeyed, this)
                        .onSync('escKeyed', this._onEscKeyed, this)
                        .onSync('upKeyed', this._onUpKeyed, this)
                        .onSync('downKeyed', this._onDownKeyed, this)
                        .onSync('leftKeyed', this._onLeftKeyed, this)
                        .onSync('rightKeyed', this._onRightKeyed, this)
                        .onSync('queryChanged', this._onQueryChanged, this)
                        .onSync('whitespaceChanged', this._onWhitespaceChanged, this)),
                    this._bindKeyboardShortcuts(t),
                    this._setLanguageDirection();
            }
            s.mixin(h.prototype, {
                _bindKeyboardShortcuts: function (t) {
                    if (t.keyboardShortcuts) {
                        var e = this.$input,
                            n = [];
                        s.each(t.keyboardShortcuts, function (t) {
                            'string' == typeof t && (t = t.toUpperCase().charCodeAt(0)), n.push(t);
                        }),
                            r.element(document).keydown(function (t) {
                                var i = t.target || t.srcElement,
                                    s = i.tagName;
                                if (!i.isContentEditable && 'INPUT' !== s && 'SELECT' !== s && 'TEXTAREA' !== s) {
                                    var r = t.which || t.keyCode;
                                    -1 !== n.indexOf(r) && (e.focus(), t.stopPropagation(), t.preventDefault());
                                }
                            });
                    }
                },
                _onSuggestionClicked: function (t, e) {
                    var n;
                    (n = this.dropdown.getDatumForSuggestion(e)) && this._select(n, { selectionMethod: 'click' });
                },
                _onCursorMoved: function (t, e) {
                    var n = this.dropdown.getDatumForCursor(),
                        i = this.dropdown.getCurrentCursor().attr('id');
                    this.input.setActiveDescendant(i),
                        n &&
                            (e && this.input.setInputValue(n.value, !0),
                            this.eventBus.trigger('cursorchanged', n.raw, n.datasetName));
                },
                _onCursorRemoved: function () {
                    this.input.resetInputValue(), this._updateHint(), this.eventBus.trigger('cursorremoved');
                },
                _onDatasetRendered: function () {
                    this._updateHint(), this.eventBus.trigger('updated');
                },
                _onOpened: function () {
                    this._updateHint(), this.input.expand(), this.eventBus.trigger('opened');
                },
                _onEmpty: function () {
                    this.eventBus.trigger('empty');
                },
                _onRedrawn: function () {
                    this.$node.css('top', '0px'), this.$node.css('left', '0px');
                    var t = this.$input[0].getBoundingClientRect();
                    this.autoWidth && this.$node.css('width', t.width + 'px');
                    var e = this.$node[0].getBoundingClientRect(),
                        n = t.bottom - e.top;
                    this.$node.css('top', n + 'px');
                    var i = t.left - e.left;
                    this.$node.css('left', i + 'px'), this.eventBus.trigger('redrawn');
                },
                _onShown: function () {
                    this.eventBus.trigger('shown'), this.autoselect && this.dropdown.cursorTopSuggestion();
                },
                _onClosed: function () {
                    this.input.clearHint(),
                        this.input.removeActiveDescendant(),
                        this.input.collapse(),
                        this.eventBus.trigger('closed');
                },
                _onFocused: function () {
                    if (((this.isActivated = !0), this.openOnFocus)) {
                        var t = this.input.getQuery();
                        t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.empty(),
                            this.dropdown.open();
                    }
                },
                _onBlurred: function () {
                    var t, e;
                    (t = this.dropdown.getDatumForCursor()), (e = this.dropdown.getDatumForTopSuggestion());
                    var n = { selectionMethod: 'blur' };
                    this.debug ||
                        (this.autoselectOnBlur && t
                            ? this._select(t, n)
                            : this.autoselectOnBlur && e
                              ? this._select(e, n)
                              : ((this.isActivated = !1), this.dropdown.empty(), this.dropdown.close()));
                },
                _onEnterKeyed: function (t, e) {
                    var n, i;
                    (n = this.dropdown.getDatumForCursor()), (i = this.dropdown.getDatumForTopSuggestion());
                    var s = { selectionMethod: 'enterKey' };
                    n
                        ? (this._select(n, s), e.preventDefault())
                        : this.autoselect && i && (this._select(i, s), e.preventDefault());
                },
                _onTabKeyed: function (t, e) {
                    if (this.tabAutocomplete) {
                        var n;
                        (n = this.dropdown.getDatumForCursor())
                            ? (this._select(n, { selectionMethod: 'tabKey' }), e.preventDefault())
                            : this._autocomplete(!0);
                    } else this.dropdown.close();
                },
                _onEscKeyed: function () {
                    this.dropdown.close(), this.input.resetInputValue();
                },
                _onUpKeyed: function () {
                    var t = this.input.getQuery();
                    this.dropdown.isEmpty && t.length >= this.minLength
                        ? this.dropdown.update(t)
                        : this.dropdown.moveCursorUp(),
                        this.dropdown.open();
                },
                _onDownKeyed: function () {
                    var t = this.input.getQuery();
                    this.dropdown.isEmpty && t.length >= this.minLength
                        ? this.dropdown.update(t)
                        : this.dropdown.moveCursorDown(),
                        this.dropdown.open();
                },
                _onLeftKeyed: function () {
                    'rtl' === this.dir && this._autocomplete();
                },
                _onRightKeyed: function () {
                    'ltr' === this.dir && this._autocomplete();
                },
                _onQueryChanged: function (t, e) {
                    this.input.clearHintIfInvalid(),
                        e.length >= this.minLength ? this.dropdown.update(e) : this.dropdown.empty(),
                        this.dropdown.open(),
                        this._setLanguageDirection();
                },
                _onWhitespaceChanged: function () {
                    this._updateHint(), this.dropdown.open();
                },
                _setLanguageDirection: function () {
                    var t = this.input.getLanguageDirection();
                    this.dir !== t &&
                        ((this.dir = t), this.$node.css('direction', t), this.dropdown.setLanguageDirection(t));
                },
                _updateHint: function () {
                    var t, e, n, i, r;
                    (t = this.dropdown.getDatumForTopSuggestion()) &&
                    this.dropdown.isVisible() &&
                    !this.input.hasOverflow()
                        ? ((e = this.input.getInputValue()),
                          (n = o.normalizeQuery(e)),
                          (i = s.escapeRegExChars(n)),
                          (r = new RegExp('^(?:' + i + ')(.+$)', 'i').exec(t.value))
                              ? this.input.setHint(e + r[1])
                              : this.input.clearHint())
                        : this.input.clearHint();
                },
                _autocomplete: function (t) {
                    var e, n, i, s;
                    (e = this.input.getHint()),
                        (n = this.input.getQuery()),
                        (i = t || this.input.isCursorAtEnd()),
                        e &&
                            n !== e &&
                            i &&
                            ((s = this.dropdown.getDatumForTopSuggestion()) && this.input.setInputValue(s.value),
                            this.eventBus.trigger('autocompleted', s.raw, s.datasetName));
                },
                _select: function (t, e) {
                    void 0 !== t.value && this.input.setQuery(t.value),
                        this.clearOnSelected ? this.setVal('') : this.input.setInputValue(t.value, !0),
                        this._setLanguageDirection(),
                        !1 === this.eventBus.trigger('selected', t.raw, t.datasetName, e).isDefaultPrevented() &&
                            (this.dropdown.close(), s.defer(s.bind(this.dropdown.empty, this.dropdown)));
                },
                open: function () {
                    if (!this.isActivated) {
                        var t = this.input.getInputValue();
                        t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.empty();
                    }
                    this.dropdown.open();
                },
                close: function () {
                    this.dropdown.close();
                },
                setVal: function (t) {
                    (t = s.toStr(t)),
                        this.isActivated
                            ? this.input.setInputValue(t)
                            : (this.input.setQuery(t), this.input.setInputValue(t, !0)),
                        this._setLanguageDirection();
                },
                getVal: function () {
                    return this.input.getQuery();
                },
                destroy: function () {
                    this.input.destroy(),
                        this.dropdown.destroy(),
                        (function (t, e) {
                            var n = t.find(s.className(e.prefix, e.input));
                            s.each(n.data(i), function (t, e) {
                                void 0 === t ? n.removeAttr(e) : n.attr(e, t);
                            }),
                                n
                                    .detach()
                                    .removeClass(s.className(e.prefix, e.input, !0))
                                    .insertAfter(t),
                                n.removeData && n.removeData(i);
                            t.remove();
                        })(this.$node, this.cssClasses),
                        (this.$node = null);
                },
                getWrapper: function () {
                    return this.dropdown.$container[0];
                },
            }),
                (h.Dropdown = u),
                (h.Input = o),
                (h.sources = n(6331)),
                (t.exports = h);
        },
        3855: (t) => {
            'use strict';
            t.exports = { element: null };
        },
        2926: (t) => {
            'use strict';
            t.exports = function (t) {
                var e =
                    t.match(/Algolia for JavaScript \((\d+\.)(\d+\.)(\d+)\)/) ||
                    t.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);
                if (e) return [e[1], e[2], e[3]];
            };
        },
        5670: (t, e, n) => {
            'use strict';
            var i,
                s = n(3855);
            function r(t) {
                return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            }
            t.exports = {
                isArray: null,
                isFunction: null,
                isObject: null,
                bind: null,
                each: null,
                map: null,
                mixin: null,
                isMsie: function (t) {
                    if ((void 0 === t && (t = navigator.userAgent), /(msie|trident)/i.test(t))) {
                        var e = t.match(/(msie |rv:)(\d+(.\d+)?)/i);
                        if (e) return e[2];
                    }
                    return !1;
                },
                escapeRegExChars: function (t) {
                    return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                },
                isNumber: function (t) {
                    return 'number' == typeof t;
                },
                toStr: function (t) {
                    return null == t ? '' : t + '';
                },
                cloneDeep: function (t) {
                    var e = this.mixin({}, t),
                        n = this;
                    return (
                        this.each(e, function (t, i) {
                            t && (n.isArray(t) ? (e[i] = [].concat(t)) : n.isObject(t) && (e[i] = n.cloneDeep(t)));
                        }),
                        e
                    );
                },
                error: function (t) {
                    throw new Error(t);
                },
                every: function (t, e) {
                    var n = !0;
                    return t
                        ? (this.each(t, function (i, s) {
                              n && (n = e.call(null, i, s, t) && n);
                          }),
                          !!n)
                        : n;
                },
                any: function (t, e) {
                    var n = !1;
                    return t
                        ? (this.each(t, function (i, s) {
                              if (e.call(null, i, s, t)) return (n = !0), !1;
                          }),
                          n)
                        : n;
                },
                getUniqueId:
                    ((i = 0),
                    function () {
                        return i++;
                    }),
                templatify: function (t) {
                    if (this.isFunction(t)) return t;
                    var e = s.element(t);
                    return 'SCRIPT' === e.prop('tagName')
                        ? function () {
                              return e.text();
                          }
                        : function () {
                              return String(t);
                          };
                },
                defer: function (t) {
                    setTimeout(t, 0);
                },
                noop: function () {},
                formatPrefix: function (t, e) {
                    return e ? '' : t + '-';
                },
                className: function (t, e, n) {
                    return (n ? '' : '.') + t + e;
                },
                escapeHighlightedString: function (t, e, n) {
                    e = e || '<em>';
                    var i = document.createElement('div');
                    i.appendChild(document.createTextNode(e)), (n = n || '</em>');
                    var s = document.createElement('div');
                    s.appendChild(document.createTextNode(n));
                    var a = document.createElement('div');
                    return (
                        a.appendChild(document.createTextNode(t)),
                        a.innerHTML.replace(RegExp(r(i.innerHTML), 'g'), e).replace(RegExp(r(s.innerHTML), 'g'), n)
                    );
                },
            };
        },
        2683: (t, e, n) => {
            'use strict';
            var i = n(5670),
                s = n(3489),
                r = n(2926);
            t.exports = function (t, e) {
                var n = r(t.as._ua);
                return (
                    n && n[0] >= 3 && n[1] > 20 && ((e = e || {}).additionalUA = 'autocomplete.js ' + s),
                    function (n, s) {
                        t.search(n, e, function (t, e) {
                            t ? i.error(t.message) : s(e.hits, e);
                        });
                    }
                );
            };
        },
        6331: (t, e, n) => {
            'use strict';
            t.exports = { hits: n(2683), popularIn: n(2226) };
        },
        2226: (t, e, n) => {
            'use strict';
            var i = n(5670),
                s = n(3489),
                r = n(2926);
            t.exports = function (t, e, n, a) {
                var o = r(t.as._ua);
                if ((o && o[0] >= 3 && o[1] > 20 && ((e = e || {}).additionalUA = 'autocomplete.js ' + s), !n.source))
                    return i.error("Missing 'source' key");
                var u = i.isFunction(n.source)
                    ? n.source
                    : function (t) {
                          return t[n.source];
                      };
                if (!n.index) return i.error("Missing 'index' key");
                var c = n.index;
                return (
                    (a = a || {}),
                    function (o, l) {
                        t.search(o, e, function (t, o) {
                            if (t) i.error(t.message);
                            else {
                                if (o.hits.length > 0) {
                                    var h = o.hits[0],
                                        p = i.mixin({ hitsPerPage: 0 }, n);
                                    delete p.source, delete p.index;
                                    var d = r(c.as._ua);
                                    return (
                                        d && d[0] >= 3 && d[1] > 20 && (e.additionalUA = 'autocomplete.js ' + s),
                                        void c.search(u(h), p, function (t, e) {
                                            if (t) i.error(t.message);
                                            else {
                                                var n = [];
                                                if (a.includeAll) {
                                                    var s = a.allTitle || 'All departments';
                                                    n.push(
                                                        i.mixin(
                                                            { facet: { value: s, count: e.nbHits } },
                                                            i.cloneDeep(h),
                                                        ),
                                                    );
                                                }
                                                i.each(e.facets, function (t, e) {
                                                    i.each(t, function (t, s) {
                                                        n.push(
                                                            i.mixin(
                                                                { facet: { facet: e, value: s, count: t } },
                                                                i.cloneDeep(h),
                                                            ),
                                                        );
                                                    });
                                                });
                                                for (var r = 1; r < o.hits.length; ++r) n.push(o.hits[r]);
                                                l(n, o);
                                            }
                                        })
                                    );
                                }
                                l([]);
                            }
                        });
                    }
                );
            };
        },
        9281: (t, e, n) => {
            'use strict';
            var i = n(7939);
            n(3855).element = i;
            var s = n(5670);
            (s.isArray = i.isArray),
                (s.isFunction = i.isFunction),
                (s.isObject = i.isPlainObject),
                (s.bind = i.proxy),
                (s.each = function (t, e) {
                    i.each(t, function (t, n) {
                        return e(n, t);
                    });
                }),
                (s.map = i.map),
                (s.mixin = i.extend),
                (s.Event = i.Event);
            var r = 'aaAutocomplete',
                a = n(4520),
                o = n(7368);
            function u(t, e, n, u) {
                n = s.isArray(n) ? n : [].slice.call(arguments, 2);
                var c = i(t).each(function (t, s) {
                    var c = i(s),
                        l = new o({ el: c }),
                        h =
                            u ||
                            new a({
                                input: c,
                                eventBus: l,
                                dropdownMenuContainer: e.dropdownMenuContainer,
                                hint: void 0 === e.hint || !!e.hint,
                                minLength: e.minLength,
                                autoselect: e.autoselect,
                                autoselectOnBlur: e.autoselectOnBlur,
                                tabAutocomplete: e.tabAutocomplete,
                                openOnFocus: e.openOnFocus,
                                templates: e.templates,
                                debug: e.debug,
                                clearOnSelected: e.clearOnSelected,
                                cssClasses: e.cssClasses,
                                datasets: n,
                                keyboardShortcuts: e.keyboardShortcuts,
                                appendTo: e.appendTo,
                                autoWidth: e.autoWidth,
                                ariaLabel: e.ariaLabel || s.getAttribute('aria-label'),
                            });
                    c.data(r, h);
                });
                return (
                    (c.autocomplete = {}),
                    s.each(['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'], function (t) {
                        c.autocomplete[t] = function () {
                            var e,
                                n = arguments;
                            return (
                                c.each(function (s, a) {
                                    var o = i(a).data(r);
                                    e = o[t].apply(o, n);
                                }),
                                e
                            );
                        };
                    }),
                    c
                );
            }
            (u.sources = a.sources), (u.escapeHighlightedString = s.escapeHighlightedString);
            var c = 'autocomplete' in window,
                l = window.autocomplete;
            (u.noConflict = function () {
                return c ? (window.autocomplete = l) : delete window.autocomplete, u;
            }),
                (t.exports = u);
        },
        3489: (t) => {
            t.exports = '0.37.1';
        },
        7939: (t) => {
            var e;
            (e = window),
                (t.exports = (function (t) {
                    var e,
                        n,
                        i = (function () {
                            var e,
                                n,
                                i,
                                s,
                                r,
                                a,
                                o = [],
                                u = o.concat,
                                c = o.filter,
                                l = o.slice,
                                h = t.document,
                                p = {},
                                d = {},
                                f = {
                                    'column-count': 1,
                                    columns: 1,
                                    'font-weight': 1,
                                    'line-height': 1,
                                    opacity: 1,
                                    'z-index': 1,
                                    zoom: 1,
                                },
                                g = /^\s*<(\w+|!)[^>]*>/,
                                m = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                                v = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                                y = /^(?:body|html)$/i,
                                b = /([A-Z])/g,
                                w = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
                                x = ['after', 'prepend', 'before', 'append'],
                                C = h.createElement('table'),
                                _ = h.createElement('tr'),
                                S = {
                                    tr: h.createElement('tbody'),
                                    tbody: C,
                                    thead: C,
                                    tfoot: C,
                                    td: _,
                                    th: _,
                                    '*': h.createElement('div'),
                                },
                                $ = /complete|loaded|interactive/,
                                E = /^[\w-]*$/,
                                A = {},
                                k = A.toString,
                                T = {},
                                O = h.createElement('div'),
                                D = {
                                    tabindex: 'tabIndex',
                                    readonly: 'readOnly',
                                    for: 'htmlFor',
                                    class: 'className',
                                    maxlength: 'maxLength',
                                    cellspacing: 'cellSpacing',
                                    cellpadding: 'cellPadding',
                                    rowspan: 'rowSpan',
                                    colspan: 'colSpan',
                                    usemap: 'useMap',
                                    frameborder: 'frameBorder',
                                    contenteditable: 'contentEditable',
                                },
                                N =
                                    Array.isArray ||
                                    function (t) {
                                        return t instanceof Array;
                                    };
                            function L(t) {
                                return null == t ? String(t) : A[k.call(t)] || 'object';
                            }
                            function H(t) {
                                return 'function' == L(t);
                            }
                            function I(t) {
                                return null != t && t == t.window;
                            }
                            function R(t) {
                                return null != t && t.nodeType == t.DOCUMENT_NODE;
                            }
                            function P(t) {
                                return 'object' == L(t);
                            }
                            function F(t) {
                                return P(t) && !I(t) && Object.getPrototypeOf(t) == Object.prototype;
                            }
                            function M(t) {
                                var e = !!t && 'length' in t && t.length,
                                    n = i.type(t);
                                return (
                                    'function' != n &&
                                    !I(t) &&
                                    ('array' == n || 0 === e || ('number' == typeof e && e > 0 && e - 1 in t))
                                );
                            }
                            function V(t) {
                                return c.call(t, function (t) {
                                    return null != t;
                                });
                            }
                            function q(t) {
                                return t.length > 0 ? i.fn.concat.apply([], t) : t;
                            }
                            function B(t) {
                                return t
                                    .replace(/::/g, '/')
                                    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                                    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                                    .replace(/_/g, '-')
                                    .toLowerCase();
                            }
                            function K(t) {
                                return t in d ? d[t] : (d[t] = new RegExp('(^|\\s)' + t + '(\\s|$)'));
                            }
                            function j(t, e) {
                                return 'number' != typeof e || f[B(t)] ? e : e + 'px';
                            }
                            function z(t) {
                                var e, n;
                                return (
                                    p[t] ||
                                        ((e = h.createElement(t)),
                                        h.body.appendChild(e),
                                        (n = getComputedStyle(e, '').getPropertyValue('display')),
                                        e.parentNode.removeChild(e),
                                        'none' == n && (n = 'block'),
                                        (p[t] = n)),
                                    p[t]
                                );
                            }
                            function U(t) {
                                return 'children' in t
                                    ? l.call(t.children)
                                    : i.map(t.childNodes, function (t) {
                                          if (1 == t.nodeType) return t;
                                      });
                            }
                            function W(t, e) {
                                var n,
                                    i = t ? t.length : 0;
                                for (n = 0; n < i; n++) this[n] = t[n];
                                (this.length = i), (this.selector = e || '');
                            }
                            function Q(t, i, s) {
                                for (n in i)
                                    s && (F(i[n]) || N(i[n]))
                                        ? (F(i[n]) && !F(t[n]) && (t[n] = {}),
                                          N(i[n]) && !N(t[n]) && (t[n] = []),
                                          Q(t[n], i[n], s))
                                        : i[n] !== e && (t[n] = i[n]);
                            }
                            function Z(t, e) {
                                return null == e ? i(t) : i(t).filter(e);
                            }
                            function G(t, e, n, i) {
                                return H(e) ? e.call(t, n, i) : e;
                            }
                            function X(t, e, n) {
                                null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
                            }
                            function J(t, n) {
                                var i = t.className || '',
                                    s = i && i.baseVal !== e;
                                if (n === e) return s ? i.baseVal : i;
                                s ? (i.baseVal = n) : (t.className = n);
                            }
                            function Y(t) {
                                try {
                                    return t
                                        ? 'true' == t ||
                                              ('false' != t &&
                                                  ('null' == t
                                                      ? null
                                                      : +t + '' == t
                                                        ? +t
                                                        : /^[\[\{]/.test(t)
                                                          ? i.parseJSON(t)
                                                          : t))
                                        : t;
                                } catch (e) {
                                    return t;
                                }
                            }
                            function tt(t, e) {
                                e(t);
                                for (var n = 0, i = t.childNodes.length; n < i; n++) tt(t.childNodes[n], e);
                            }
                            return (
                                (T.matches = function (t, e) {
                                    if (!e || !t || 1 !== t.nodeType) return !1;
                                    var n =
                                        t.matches ||
                                        t.webkitMatchesSelector ||
                                        t.mozMatchesSelector ||
                                        t.oMatchesSelector ||
                                        t.matchesSelector;
                                    if (n) return n.call(t, e);
                                    var i,
                                        s = t.parentNode,
                                        r = !s;
                                    return (
                                        r && (s = O).appendChild(t),
                                        (i = ~T.qsa(s, e).indexOf(t)),
                                        r && O.removeChild(t),
                                        i
                                    );
                                }),
                                (r = function (t) {
                                    return t.replace(/-+(.)?/g, function (t, e) {
                                        return e ? e.toUpperCase() : '';
                                    });
                                }),
                                (a = function (t) {
                                    return c.call(t, function (e, n) {
                                        return t.indexOf(e) == n;
                                    });
                                }),
                                (T.fragment = function (t, n, s) {
                                    var r, a, o;
                                    return (
                                        m.test(t) && (r = i(h.createElement(RegExp.$1))),
                                        r ||
                                            (t.replace && (t = t.replace(v, '<$1></$2>')),
                                            n === e && (n = g.test(t) && RegExp.$1),
                                            n in S || (n = '*'),
                                            ((o = S[n]).innerHTML = '' + t),
                                            (r = i.each(l.call(o.childNodes), function () {
                                                o.removeChild(this);
                                            }))),
                                        F(s) &&
                                            ((a = i(r)),
                                            i.each(s, function (t, e) {
                                                w.indexOf(t) > -1 ? a[t](e) : a.attr(t, e);
                                            })),
                                        r
                                    );
                                }),
                                (T.Z = function (t, e) {
                                    return new W(t, e);
                                }),
                                (T.isZ = function (t) {
                                    return t instanceof T.Z;
                                }),
                                (T.init = function (t, n) {
                                    var s;
                                    if (!t) return T.Z();
                                    if ('string' == typeof t)
                                        if ('<' == (t = t.trim())[0] && g.test(t))
                                            (s = T.fragment(t, RegExp.$1, n)), (t = null);
                                        else {
                                            if (n !== e) return i(n).find(t);
                                            s = T.qsa(h, t);
                                        }
                                    else {
                                        if (H(t)) return i(h).ready(t);
                                        if (T.isZ(t)) return t;
                                        if (N(t)) s = V(t);
                                        else if (P(t)) (s = [t]), (t = null);
                                        else if (g.test(t)) (s = T.fragment(t.trim(), RegExp.$1, n)), (t = null);
                                        else {
                                            if (n !== e) return i(n).find(t);
                                            s = T.qsa(h, t);
                                        }
                                    }
                                    return T.Z(s, t);
                                }),
                                ((i = function (t, e) {
                                    return T.init(t, e);
                                }).extend = function (t) {
                                    var e,
                                        n = l.call(arguments, 1);
                                    return (
                                        'boolean' == typeof t && ((e = t), (t = n.shift())),
                                        n.forEach(function (n) {
                                            Q(t, n, e);
                                        }),
                                        t
                                    );
                                }),
                                (T.qsa = function (t, e) {
                                    var n,
                                        i = '#' == e[0],
                                        s = !i && '.' == e[0],
                                        r = i || s ? e.slice(1) : e,
                                        a = E.test(r);
                                    return t.getElementById && a && i
                                        ? (n = t.getElementById(r))
                                            ? [n]
                                            : []
                                        : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType
                                          ? []
                                          : l.call(
                                                a && !i && t.getElementsByClassName
                                                    ? s
                                                        ? t.getElementsByClassName(r)
                                                        : t.getElementsByTagName(e)
                                                    : t.querySelectorAll(e),
                                            );
                                }),
                                (i.contains = h.documentElement.contains
                                    ? function (t, e) {
                                          return t !== e && t.contains(e);
                                      }
                                    : function (t, e) {
                                          for (; e && (e = e.parentNode); ) if (e === t) return !0;
                                          return !1;
                                      }),
                                (i.type = L),
                                (i.isFunction = H),
                                (i.isWindow = I),
                                (i.isArray = N),
                                (i.isPlainObject = F),
                                (i.isEmptyObject = function (t) {
                                    var e;
                                    for (e in t) return !1;
                                    return !0;
                                }),
                                (i.isNumeric = function (t) {
                                    var e = Number(t),
                                        n = typeof t;
                                    return (
                                        (null != t &&
                                            'boolean' != n &&
                                            ('string' != n || t.length) &&
                                            !isNaN(e) &&
                                            isFinite(e)) ||
                                        !1
                                    );
                                }),
                                (i.inArray = function (t, e, n) {
                                    return o.indexOf.call(e, t, n);
                                }),
                                (i.camelCase = r),
                                (i.trim = function (t) {
                                    return null == t ? '' : String.prototype.trim.call(t);
                                }),
                                (i.uuid = 0),
                                (i.support = {}),
                                (i.expr = {}),
                                (i.noop = function () {}),
                                (i.map = function (t, e) {
                                    var n,
                                        i,
                                        s,
                                        r = [];
                                    if (M(t)) for (i = 0; i < t.length; i++) null != (n = e(t[i], i)) && r.push(n);
                                    else for (s in t) null != (n = e(t[s], s)) && r.push(n);
                                    return q(r);
                                }),
                                (i.each = function (t, e) {
                                    var n, i;
                                    if (M(t)) {
                                        for (n = 0; n < t.length; n++) if (!1 === e.call(t[n], n, t[n])) return t;
                                    } else for (i in t) if (!1 === e.call(t[i], i, t[i])) return t;
                                    return t;
                                }),
                                (i.grep = function (t, e) {
                                    return c.call(t, e);
                                }),
                                t.JSON && (i.parseJSON = JSON.parse),
                                i.each(
                                    'Boolean Number String Function Array Date RegExp Object Error'.split(' '),
                                    function (t, e) {
                                        A['[object ' + e + ']'] = e.toLowerCase();
                                    },
                                ),
                                (i.fn = {
                                    constructor: T.Z,
                                    length: 0,
                                    forEach: o.forEach,
                                    reduce: o.reduce,
                                    push: o.push,
                                    sort: o.sort,
                                    splice: o.splice,
                                    indexOf: o.indexOf,
                                    concat: function () {
                                        var t,
                                            e,
                                            n = [];
                                        for (t = 0; t < arguments.length; t++)
                                            (e = arguments[t]), (n[t] = T.isZ(e) ? e.toArray() : e);
                                        return u.apply(T.isZ(this) ? this.toArray() : this, n);
                                    },
                                    map: function (t) {
                                        return i(
                                            i.map(this, function (e, n) {
                                                return t.call(e, n, e);
                                            }),
                                        );
                                    },
                                    slice: function () {
                                        return i(l.apply(this, arguments));
                                    },
                                    ready: function (t) {
                                        return (
                                            $.test(h.readyState) && h.body
                                                ? t(i)
                                                : h.addEventListener(
                                                      'DOMContentLoaded',
                                                      function () {
                                                          t(i);
                                                      },
                                                      !1,
                                                  ),
                                            this
                                        );
                                    },
                                    get: function (t) {
                                        return t === e ? l.call(this) : this[t >= 0 ? t : t + this.length];
                                    },
                                    toArray: function () {
                                        return this.get();
                                    },
                                    size: function () {
                                        return this.length;
                                    },
                                    remove: function () {
                                        return this.each(function () {
                                            null != this.parentNode && this.parentNode.removeChild(this);
                                        });
                                    },
                                    each: function (t) {
                                        return (
                                            o.every.call(this, function (e, n) {
                                                return !1 !== t.call(e, n, e);
                                            }),
                                            this
                                        );
                                    },
                                    filter: function (t) {
                                        return H(t)
                                            ? this.not(this.not(t))
                                            : i(
                                                  c.call(this, function (e) {
                                                      return T.matches(e, t);
                                                  }),
                                              );
                                    },
                                    add: function (t, e) {
                                        return i(a(this.concat(i(t, e))));
                                    },
                                    is: function (t) {
                                        return this.length > 0 && T.matches(this[0], t);
                                    },
                                    not: function (t) {
                                        var n = [];
                                        if (H(t) && t.call !== e)
                                            this.each(function (e) {
                                                t.call(this, e) || n.push(this);
                                            });
                                        else {
                                            var s =
                                                'string' == typeof t
                                                    ? this.filter(t)
                                                    : M(t) && H(t.item)
                                                      ? l.call(t)
                                                      : i(t);
                                            this.forEach(function (t) {
                                                s.indexOf(t) < 0 && n.push(t);
                                            });
                                        }
                                        return i(n);
                                    },
                                    has: function (t) {
                                        return this.filter(function () {
                                            return P(t) ? i.contains(this, t) : i(this).find(t).size();
                                        });
                                    },
                                    eq: function (t) {
                                        return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
                                    },
                                    first: function () {
                                        var t = this[0];
                                        return t && !P(t) ? t : i(t);
                                    },
                                    last: function () {
                                        var t = this[this.length - 1];
                                        return t && !P(t) ? t : i(t);
                                    },
                                    find: function (t) {
                                        var e = this;
                                        return t
                                            ? 'object' == typeof t
                                                ? i(t).filter(function () {
                                                      var t = this;
                                                      return o.some.call(e, function (e) {
                                                          return i.contains(e, t);
                                                      });
                                                  })
                                                : 1 == this.length
                                                  ? i(T.qsa(this[0], t))
                                                  : this.map(function () {
                                                        return T.qsa(this, t);
                                                    })
                                            : i();
                                    },
                                    closest: function (t, e) {
                                        var n = [],
                                            s = 'object' == typeof t && i(t);
                                        return (
                                            this.each(function (i, r) {
                                                for (; r && !(s ? s.indexOf(r) >= 0 : T.matches(r, t)); )
                                                    r = r !== e && !R(r) && r.parentNode;
                                                r && n.indexOf(r) < 0 && n.push(r);
                                            }),
                                            i(n)
                                        );
                                    },
                                    parents: function (t) {
                                        for (var e = [], n = this; n.length > 0; )
                                            n = i.map(n, function (t) {
                                                if ((t = t.parentNode) && !R(t) && e.indexOf(t) < 0)
                                                    return e.push(t), t;
                                            });
                                        return Z(e, t);
                                    },
                                    parent: function (t) {
                                        return Z(a(this.pluck('parentNode')), t);
                                    },
                                    children: function (t) {
                                        return Z(
                                            this.map(function () {
                                                return U(this);
                                            }),
                                            t,
                                        );
                                    },
                                    contents: function () {
                                        return this.map(function () {
                                            return this.contentDocument || l.call(this.childNodes);
                                        });
                                    },
                                    siblings: function (t) {
                                        return Z(
                                            this.map(function (t, e) {
                                                return c.call(U(e.parentNode), function (t) {
                                                    return t !== e;
                                                });
                                            }),
                                            t,
                                        );
                                    },
                                    empty: function () {
                                        return this.each(function () {
                                            this.innerHTML = '';
                                        });
                                    },
                                    pluck: function (t) {
                                        return i.map(this, function (e) {
                                            return e[t];
                                        });
                                    },
                                    show: function () {
                                        return this.each(function () {
                                            'none' == this.style.display && (this.style.display = ''),
                                                'none' == getComputedStyle(this, '').getPropertyValue('display') &&
                                                    (this.style.display = z(this.nodeName));
                                        });
                                    },
                                    replaceWith: function (t) {
                                        return this.before(t).remove();
                                    },
                                    wrap: function (t) {
                                        var e = H(t);
                                        if (this[0] && !e)
                                            var n = i(t).get(0),
                                                s = n.parentNode || this.length > 1;
                                        return this.each(function (r) {
                                            i(this).wrapAll(e ? t.call(this, r) : s ? n.cloneNode(!0) : n);
                                        });
                                    },
                                    wrapAll: function (t) {
                                        if (this[0]) {
                                            var e;
                                            for (i(this[0]).before((t = i(t))); (e = t.children()).length; )
                                                t = e.first();
                                            i(t).append(this);
                                        }
                                        return this;
                                    },
                                    wrapInner: function (t) {
                                        var e = H(t);
                                        return this.each(function (n) {
                                            var s = i(this),
                                                r = s.contents(),
                                                a = e ? t.call(this, n) : t;
                                            r.length ? r.wrapAll(a) : s.append(a);
                                        });
                                    },
                                    unwrap: function () {
                                        return (
                                            this.parent().each(function () {
                                                i(this).replaceWith(i(this).children());
                                            }),
                                            this
                                        );
                                    },
                                    clone: function () {
                                        return this.map(function () {
                                            return this.cloneNode(!0);
                                        });
                                    },
                                    hide: function () {
                                        return this.css('display', 'none');
                                    },
                                    toggle: function (t) {
                                        return this.each(function () {
                                            var n = i(this);
                                            (t === e ? 'none' == n.css('display') : t) ? n.show() : n.hide();
                                        });
                                    },
                                    prev: function (t) {
                                        return i(this.pluck('previousElementSibling')).filter(t || '*');
                                    },
                                    next: function (t) {
                                        return i(this.pluck('nextElementSibling')).filter(t || '*');
                                    },
                                    html: function (t) {
                                        return 0 in arguments
                                            ? this.each(function (e) {
                                                  var n = this.innerHTML;
                                                  i(this)
                                                      .empty()
                                                      .append(G(this, t, e, n));
                                              })
                                            : 0 in this
                                              ? this[0].innerHTML
                                              : null;
                                    },
                                    text: function (t) {
                                        return 0 in arguments
                                            ? this.each(function (e) {
                                                  var n = G(this, t, e, this.textContent);
                                                  this.textContent = null == n ? '' : '' + n;
                                              })
                                            : 0 in this
                                              ? this.pluck('textContent').join('')
                                              : null;
                                    },
                                    attr: function (t, i) {
                                        var s;
                                        return 'string' != typeof t || 1 in arguments
                                            ? this.each(function (e) {
                                                  if (1 === this.nodeType)
                                                      if (P(t)) for (n in t) X(this, n, t[n]);
                                                      else X(this, t, G(this, i, e, this.getAttribute(t)));
                                              })
                                            : 0 in this &&
                                                1 == this[0].nodeType &&
                                                null != (s = this[0].getAttribute(t))
                                              ? s
                                              : e;
                                    },
                                    removeAttr: function (t) {
                                        return this.each(function () {
                                            1 === this.nodeType &&
                                                t.split(' ').forEach(function (t) {
                                                    X(this, t);
                                                }, this);
                                        });
                                    },
                                    prop: function (t, e) {
                                        return (
                                            (t = D[t] || t),
                                            1 in arguments
                                                ? this.each(function (n) {
                                                      this[t] = G(this, e, n, this[t]);
                                                  })
                                                : this[0] && this[0][t]
                                        );
                                    },
                                    removeProp: function (t) {
                                        return (
                                            (t = D[t] || t),
                                            this.each(function () {
                                                delete this[t];
                                            })
                                        );
                                    },
                                    data: function (t, n) {
                                        var i = 'data-' + t.replace(b, '-$1').toLowerCase(),
                                            s = 1 in arguments ? this.attr(i, n) : this.attr(i);
                                        return null !== s ? Y(s) : e;
                                    },
                                    val: function (t) {
                                        return 0 in arguments
                                            ? (null == t && (t = ''),
                                              this.each(function (e) {
                                                  this.value = G(this, t, e, this.value);
                                              }))
                                            : this[0] &&
                                                  (this[0].multiple
                                                      ? i(this[0])
                                                            .find('option')
                                                            .filter(function () {
                                                                return this.selected;
                                                            })
                                                            .pluck('value')
                                                      : this[0].value);
                                    },
                                    offset: function (e) {
                                        if (e)
                                            return this.each(function (t) {
                                                var n = i(this),
                                                    s = G(this, e, t, n.offset()),
                                                    r = n.offsetParent().offset(),
                                                    a = { top: s.top - r.top, left: s.left - r.left };
                                                'static' == n.css('position') && (a.position = 'relative'), n.css(a);
                                            });
                                        if (!this.length) return null;
                                        if (h.documentElement !== this[0] && !i.contains(h.documentElement, this[0]))
                                            return { top: 0, left: 0 };
                                        var n = this[0].getBoundingClientRect();
                                        return {
                                            left: n.left + t.pageXOffset,
                                            top: n.top + t.pageYOffset,
                                            width: Math.round(n.width),
                                            height: Math.round(n.height),
                                        };
                                    },
                                    css: function (t, e) {
                                        if (arguments.length < 2) {
                                            var s = this[0];
                                            if ('string' == typeof t) {
                                                if (!s) return;
                                                return s.style[r(t)] || getComputedStyle(s, '').getPropertyValue(t);
                                            }
                                            if (N(t)) {
                                                if (!s) return;
                                                var a = {},
                                                    o = getComputedStyle(s, '');
                                                return (
                                                    i.each(t, function (t, e) {
                                                        a[e] = s.style[r(e)] || o.getPropertyValue(e);
                                                    }),
                                                    a
                                                );
                                            }
                                        }
                                        var u = '';
                                        if ('string' == L(t))
                                            e || 0 === e
                                                ? (u = B(t) + ':' + j(t, e))
                                                : this.each(function () {
                                                      this.style.removeProperty(B(t));
                                                  });
                                        else
                                            for (n in t)
                                                t[n] || 0 === t[n]
                                                    ? (u += B(n) + ':' + j(n, t[n]) + ';')
                                                    : this.each(function () {
                                                          this.style.removeProperty(B(n));
                                                      });
                                        return this.each(function () {
                                            this.style.cssText += ';' + u;
                                        });
                                    },
                                    index: function (t) {
                                        return t ? this.indexOf(i(t)[0]) : this.parent().children().indexOf(this[0]);
                                    },
                                    hasClass: function (t) {
                                        return (
                                            !!t &&
                                            o.some.call(
                                                this,
                                                function (t) {
                                                    return this.test(J(t));
                                                },
                                                K(t),
                                            )
                                        );
                                    },
                                    addClass: function (t) {
                                        return t
                                            ? this.each(function (e) {
                                                  if ('className' in this) {
                                                      s = [];
                                                      var n = J(this);
                                                      G(this, t, e, n)
                                                          .split(/\s+/g)
                                                          .forEach(function (t) {
                                                              i(this).hasClass(t) || s.push(t);
                                                          }, this),
                                                          s.length && J(this, n + (n ? ' ' : '') + s.join(' '));
                                                  }
                                              })
                                            : this;
                                    },
                                    removeClass: function (t) {
                                        return this.each(function (n) {
                                            if ('className' in this) {
                                                if (t === e) return J(this, '');
                                                (s = J(this)),
                                                    G(this, t, n, s)
                                                        .split(/\s+/g)
                                                        .forEach(function (t) {
                                                            s = s.replace(K(t), ' ');
                                                        }),
                                                    J(this, s.trim());
                                            }
                                        });
                                    },
                                    toggleClass: function (t, n) {
                                        return t
                                            ? this.each(function (s) {
                                                  var r = i(this);
                                                  G(this, t, s, J(this))
                                                      .split(/\s+/g)
                                                      .forEach(function (t) {
                                                          (n === e ? !r.hasClass(t) : n)
                                                              ? r.addClass(t)
                                                              : r.removeClass(t);
                                                      });
                                              })
                                            : this;
                                    },
                                    scrollTop: function (t) {
                                        if (this.length) {
                                            var n = 'scrollTop' in this[0];
                                            return t === e
                                                ? n
                                                    ? this[0].scrollTop
                                                    : this[0].pageYOffset
                                                : this.each(
                                                      n
                                                          ? function () {
                                                                this.scrollTop = t;
                                                            }
                                                          : function () {
                                                                this.scrollTo(this.scrollX, t);
                                                            },
                                                  );
                                        }
                                    },
                                    scrollLeft: function (t) {
                                        if (this.length) {
                                            var n = 'scrollLeft' in this[0];
                                            return t === e
                                                ? n
                                                    ? this[0].scrollLeft
                                                    : this[0].pageXOffset
                                                : this.each(
                                                      n
                                                          ? function () {
                                                                this.scrollLeft = t;
                                                            }
                                                          : function () {
                                                                this.scrollTo(t, this.scrollY);
                                                            },
                                                  );
                                        }
                                    },
                                    position: function () {
                                        if (this.length) {
                                            var t = this[0],
                                                e = this.offsetParent(),
                                                n = this.offset(),
                                                s = y.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();
                                            return (
                                                (n.top -= parseFloat(i(t).css('margin-top')) || 0),
                                                (n.left -= parseFloat(i(t).css('margin-left')) || 0),
                                                (s.top += parseFloat(i(e[0]).css('border-top-width')) || 0),
                                                (s.left += parseFloat(i(e[0]).css('border-left-width')) || 0),
                                                { top: n.top - s.top, left: n.left - s.left }
                                            );
                                        }
                                    },
                                    offsetParent: function () {
                                        return this.map(function () {
                                            for (
                                                var t = this.offsetParent || h.body;
                                                t && !y.test(t.nodeName) && 'static' == i(t).css('position');

                                            )
                                                t = t.offsetParent;
                                            return t;
                                        });
                                    },
                                }),
                                (i.fn.detach = i.fn.remove),
                                ['width', 'height'].forEach(function (t) {
                                    var n = t.replace(/./, function (t) {
                                        return t[0].toUpperCase();
                                    });
                                    i.fn[t] = function (s) {
                                        var r,
                                            a = this[0];
                                        return s === e
                                            ? I(a)
                                                ? a['inner' + n]
                                                : R(a)
                                                  ? a.documentElement['scroll' + n]
                                                  : (r = this.offset()) && r[t]
                                            : this.each(function (e) {
                                                  (a = i(this)).css(t, G(this, s, e, a[t]()));
                                              });
                                    };
                                }),
                                x.forEach(function (n, s) {
                                    var r = s % 2;
                                    (i.fn[n] = function () {
                                        var n,
                                            a,
                                            o = i.map(arguments, function (t) {
                                                var s = [];
                                                return 'array' == (n = L(t))
                                                    ? (t.forEach(function (t) {
                                                          return t.nodeType !== e
                                                              ? s.push(t)
                                                              : i.zepto.isZ(t)
                                                                ? (s = s.concat(t.get()))
                                                                : void (s = s.concat(T.fragment(t)));
                                                      }),
                                                      s)
                                                    : 'object' == n || null == t
                                                      ? t
                                                      : T.fragment(t);
                                            }),
                                            u = this.length > 1;
                                        return o.length < 1
                                            ? this
                                            : this.each(function (e, n) {
                                                  (a = r ? n : n.parentNode),
                                                      (n =
                                                          0 == s
                                                              ? n.nextSibling
                                                              : 1 == s
                                                                ? n.firstChild
                                                                : 2 == s
                                                                  ? n
                                                                  : null);
                                                  var c = i.contains(h.documentElement, a);
                                                  o.forEach(function (e) {
                                                      if (u) e = e.cloneNode(!0);
                                                      else if (!a) return i(e).remove();
                                                      a.insertBefore(e, n),
                                                          c &&
                                                              tt(e, function (e) {
                                                                  if (
                                                                      !(
                                                                          null == e.nodeName ||
                                                                          'SCRIPT' !== e.nodeName.toUpperCase() ||
                                                                          (e.type && 'text/javascript' !== e.type) ||
                                                                          e.src
                                                                      )
                                                                  ) {
                                                                      var n = e.ownerDocument
                                                                          ? e.ownerDocument.defaultView
                                                                          : t;
                                                                      n.eval.call(n, e.innerHTML);
                                                                  }
                                                              });
                                                  });
                                              });
                                    }),
                                        (i.fn[r ? n + 'To' : 'insert' + (s ? 'Before' : 'After')] = function (t) {
                                            return i(t)[n](this), this;
                                        });
                                }),
                                (T.Z.prototype = W.prototype = i.fn),
                                (T.uniq = a),
                                (T.deserializeValue = Y),
                                (i.zepto = T),
                                i
                            );
                        })();
                    return (
                        (function (e) {
                            var n,
                                i = 1,
                                s = Array.prototype.slice,
                                r = e.isFunction,
                                a = function (t) {
                                    return 'string' == typeof t;
                                },
                                o = {},
                                u = {},
                                c = 'onfocusin' in t,
                                l = { focus: 'focusin', blur: 'focusout' },
                                h = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
                            function p(t) {
                                return t._zid || (t._zid = i++);
                            }
                            function d(t, e, n, i) {
                                if ((e = f(e)).ns) var s = g(e.ns);
                                return (o[p(t)] || []).filter(function (t) {
                                    return (
                                        t &&
                                        (!e.e || t.e == e.e) &&
                                        (!e.ns || s.test(t.ns)) &&
                                        (!n || p(t.fn) === p(n)) &&
                                        (!i || t.sel == i)
                                    );
                                });
                            }
                            function f(t) {
                                var e = ('' + t).split('.');
                                return { e: e[0], ns: e.slice(1).sort().join(' ') };
                            }
                            function g(t) {
                                return new RegExp('(?:^| )' + t.replace(' ', ' .* ?') + '(?: |$)');
                            }
                            function m(t, e) {
                                return (t.del && !c && t.e in l) || !!e;
                            }
                            function v(t) {
                                return h[t] || (c && l[t]) || t;
                            }
                            function y(t, i, s, r, a, u, c) {
                                var l = p(t),
                                    d = o[l] || (o[l] = []);
                                i.split(/\s/).forEach(function (i) {
                                    if ('ready' == i) return e(document).ready(s);
                                    var o = f(i);
                                    (o.fn = s),
                                        (o.sel = a),
                                        o.e in h &&
                                            (s = function (t) {
                                                var n = t.relatedTarget;
                                                if (!n || (n !== this && !e.contains(this, n)))
                                                    return o.fn.apply(this, arguments);
                                            }),
                                        (o.del = u);
                                    var l = u || s;
                                    (o.proxy = function (e) {
                                        if (!(e = S(e)).isImmediatePropagationStopped()) {
                                            try {
                                                var i = Object.getOwnPropertyDescriptor(e, 'data');
                                                (i && !i.writable) || (e.data = r);
                                            } catch (e) {}
                                            var s = l.apply(t, e._args == n ? [e] : [e].concat(e._args));
                                            return !1 === s && (e.preventDefault(), e.stopPropagation()), s;
                                        }
                                    }),
                                        (o.i = d.length),
                                        d.push(o),
                                        'addEventListener' in t && t.addEventListener(v(o.e), o.proxy, m(o, c));
                                });
                            }
                            function b(t, e, n, i, s) {
                                var r = p(t);
                                (e || '').split(/\s/).forEach(function (e) {
                                    d(t, e, n, i).forEach(function (e) {
                                        delete o[r][e.i],
                                            'removeEventListener' in t &&
                                                t.removeEventListener(v(e.e), e.proxy, m(e, s));
                                    });
                                });
                            }
                            (u.click = u.mousedown = u.mouseup = u.mousemove = 'MouseEvents'),
                                (e.event = { add: y, remove: b }),
                                (e.proxy = function (t, n) {
                                    var i = 2 in arguments && s.call(arguments, 2);
                                    if (r(t)) {
                                        var o = function () {
                                            return t.apply(n, i ? i.concat(s.call(arguments)) : arguments);
                                        };
                                        return (o._zid = p(t)), o;
                                    }
                                    if (a(n))
                                        return i ? (i.unshift(t[n], t), e.proxy.apply(null, i)) : e.proxy(t[n], t);
                                    throw new TypeError('expected function');
                                }),
                                (e.fn.bind = function (t, e, n) {
                                    return this.on(t, e, n);
                                }),
                                (e.fn.unbind = function (t, e) {
                                    return this.off(t, e);
                                }),
                                (e.fn.one = function (t, e, n, i) {
                                    return this.on(t, e, n, i, 1);
                                });
                            var w = function () {
                                    return !0;
                                },
                                x = function () {
                                    return !1;
                                },
                                C = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
                                _ = {
                                    preventDefault: 'isDefaultPrevented',
                                    stopImmediatePropagation: 'isImmediatePropagationStopped',
                                    stopPropagation: 'isPropagationStopped',
                                };
                            function S(t, i) {
                                if (i || !t.isDefaultPrevented) {
                                    i || (i = t),
                                        e.each(_, function (e, n) {
                                            var s = i[e];
                                            (t[e] = function () {
                                                return (this[n] = w), s && s.apply(i, arguments);
                                            }),
                                                (t[n] = x);
                                        });
                                    try {
                                        t.timeStamp || (t.timeStamp = Date.now());
                                    } catch (s) {}
                                    (i.defaultPrevented !== n
                                        ? i.defaultPrevented
                                        : 'returnValue' in i
                                          ? !1 === i.returnValue
                                          : i.getPreventDefault && i.getPreventDefault()) && (t.isDefaultPrevented = w);
                                }
                                return t;
                            }
                            function $(t) {
                                var e,
                                    i = { originalEvent: t };
                                for (e in t) C.test(e) || t[e] === n || (i[e] = t[e]);
                                return S(i, t);
                            }
                            (e.fn.delegate = function (t, e, n) {
                                return this.on(e, t, n);
                            }),
                                (e.fn.undelegate = function (t, e, n) {
                                    return this.off(e, t, n);
                                }),
                                (e.fn.live = function (t, n) {
                                    return e(document.body).delegate(this.selector, t, n), this;
                                }),
                                (e.fn.die = function (t, n) {
                                    return e(document.body).undelegate(this.selector, t, n), this;
                                }),
                                (e.fn.on = function (t, i, o, u, c) {
                                    var l,
                                        h,
                                        p = this;
                                    return t && !a(t)
                                        ? (e.each(t, function (t, e) {
                                              p.on(t, i, o, e, c);
                                          }),
                                          p)
                                        : (a(i) || r(u) || !1 === u || ((u = o), (o = i), (i = n)),
                                          (u !== n && !1 !== o) || ((u = o), (o = n)),
                                          !1 === u && (u = x),
                                          p.each(function (n, r) {
                                              c &&
                                                  (l = function (t) {
                                                      return b(r, t.type, u), u.apply(this, arguments);
                                                  }),
                                                  i &&
                                                      (h = function (t) {
                                                          var n,
                                                              a = e(t.target).closest(i, r).get(0);
                                                          if (a && a !== r)
                                                              return (
                                                                  (n = e.extend($(t), {
                                                                      currentTarget: a,
                                                                      liveFired: r,
                                                                  })),
                                                                  (l || u).apply(a, [n].concat(s.call(arguments, 1)))
                                                              );
                                                      }),
                                                  y(r, t, u, o, i, h || l);
                                          }));
                                }),
                                (e.fn.off = function (t, i, s) {
                                    var o = this;
                                    return t && !a(t)
                                        ? (e.each(t, function (t, e) {
                                              o.off(t, i, e);
                                          }),
                                          o)
                                        : (a(i) || r(s) || !1 === s || ((s = i), (i = n)),
                                          !1 === s && (s = x),
                                          o.each(function () {
                                              b(this, t, s, i);
                                          }));
                                }),
                                (e.fn.trigger = function (t, n) {
                                    return (
                                        ((t = a(t) || e.isPlainObject(t) ? e.Event(t) : S(t))._args = n),
                                        this.each(function () {
                                            t.type in l && 'function' == typeof this[t.type]
                                                ? this[t.type]()
                                                : 'dispatchEvent' in this
                                                  ? this.dispatchEvent(t)
                                                  : e(this).triggerHandler(t, n);
                                        })
                                    );
                                }),
                                (e.fn.triggerHandler = function (t, n) {
                                    var i, s;
                                    return (
                                        this.each(function (r, o) {
                                            ((i = $(a(t) ? e.Event(t) : t))._args = n),
                                                (i.target = o),
                                                e.each(d(o, t.type || t), function (t, e) {
                                                    if (((s = e.proxy(i)), i.isImmediatePropagationStopped()))
                                                        return !1;
                                                });
                                        }),
                                        s
                                    );
                                }),
                                'focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error'
                                    .split(' ')
                                    .forEach(function (t) {
                                        e.fn[t] = function (e) {
                                            return 0 in arguments ? this.bind(t, e) : this.trigger(t);
                                        };
                                    }),
                                (e.Event = function (t, e) {
                                    a(t) || (t = (e = t).type);
                                    var n = document.createEvent(u[t] || 'Events'),
                                        i = !0;
                                    if (e) for (var s in e) 'bubbles' == s ? (i = !!e[s]) : (n[s] = e[s]);
                                    return n.initEvent(t, i, !0), S(n);
                                });
                        })(i),
                        (n = []),
                        (i.fn.remove = function () {
                            return this.each(function () {
                                this.parentNode &&
                                    ('IMG' === this.tagName &&
                                        (n.push(this),
                                        (this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='),
                                        e && clearTimeout(e),
                                        (e = setTimeout(function () {
                                            n = [];
                                        }, 6e4))),
                                    this.parentNode.removeChild(this));
                            });
                        }),
                        (function (t) {
                            var e = {},
                                n = t.fn.data,
                                i = t.camelCase,
                                s = (t.expando = 'Zepto' + +new Date()),
                                r = [];
                            function a(r, a) {
                                var u = r[s],
                                    c = u && e[u];
                                if (void 0 === a) return c || o(r);
                                if (c) {
                                    if (a in c) return c[a];
                                    var l = i(a);
                                    if (l in c) return c[l];
                                }
                                return n.call(t(r), a);
                            }
                            function o(n, r, a) {
                                var o = n[s] || (n[s] = ++t.uuid),
                                    c = e[o] || (e[o] = u(n));
                                return void 0 !== r && (c[i(r)] = a), c;
                            }
                            function u(e) {
                                var n = {};
                                return (
                                    t.each(e.attributes || r, function (e, s) {
                                        0 == s.name.indexOf('data-') &&
                                            (n[i(s.name.replace('data-', ''))] = t.zepto.deserializeValue(s.value));
                                    }),
                                    n
                                );
                            }
                            (t.fn.data = function (e, n) {
                                return void 0 === n
                                    ? t.isPlainObject(e)
                                        ? this.each(function (n, i) {
                                              t.each(e, function (t, e) {
                                                  o(i, t, e);
                                              });
                                          })
                                        : 0 in this
                                          ? a(this[0], e)
                                          : void 0
                                    : this.each(function () {
                                          o(this, e, n);
                                      });
                            }),
                                (t.data = function (e, n, i) {
                                    return t(e).data(n, i);
                                }),
                                (t.hasData = function (n) {
                                    var i = n[s],
                                        r = i && e[i];
                                    return !!r && !t.isEmptyObject(r);
                                }),
                                (t.fn.removeData = function (n) {
                                    return (
                                        'string' == typeof n && (n = n.split(/\s+/)),
                                        this.each(function () {
                                            var r = this[s],
                                                a = r && e[r];
                                            a &&
                                                t.each(n || a, function (t) {
                                                    delete a[n ? i(this) : t];
                                                });
                                        })
                                    );
                                }),
                                ['remove', 'empty'].forEach(function (e) {
                                    var n = t.fn[e];
                                    t.fn[e] = function () {
                                        var t = this.find('*');
                                        return 'remove' === e && (t = t.add(this)), t.removeData(), n.call(this);
                                    };
                                });
                        })(i),
                        i
                    );
                })(e));
        },
        4734: (t, e, n) => {
            'use strict';
            n.r(e), n.d(e, { default: () => m });
            var i = n(5485),
                s = n.n(i),
                r = n(9039);
            r.Z.tokenizer.separator = /[\s\-/]+/;
            const a = class {
                constructor(t, e, n, i) {
                    void 0 === n && (n = '/'),
                        (this.searchDocs = t),
                        (this.lunrIndex = r.Z.Index.load(e)),
                        (this.baseUrl = n),
                        (this.maxHits = i);
                }
                getLunrResult(t) {
                    return this.lunrIndex.query(function (e) {
                        const n = r.Z.tokenizer(t);
                        e.term(n, { boost: 10 }), e.term(n, { wildcard: r.Z.Query.wildcard.TRAILING });
                    });
                }
                getHit(t, e, n) {
                    return {
                        hierarchy: { lvl0: t.pageTitle || t.title, lvl1: 0 === t.type ? null : t.title },
                        url: t.url,
                        version: t.version,
                        _snippetResult: n ? { content: { value: n, matchLevel: 'full' } } : null,
                        _highlightResult: {
                            hierarchy: {
                                lvl0: { value: 0 === t.type ? e || t.title : t.pageTitle },
                                lvl1: 0 === t.type ? null : { value: e || t.title },
                            },
                        },
                    };
                }
                getTitleHit(t, e, n) {
                    const i = e[0],
                        s = e[0] + n;
                    let r =
                        t.title.substring(0, i) +
                        '<span class="algolia-docsearch-suggestion--highlight">' +
                        t.title.substring(i, s) +
                        '</span>' +
                        t.title.substring(s, t.title.length);
                    return this.getHit(t, r);
                }
                getKeywordHit(t, e, n) {
                    const i = e[0],
                        s = e[0] + n;
                    let r =
                        t.title +
                        '<br /><i>Keywords: ' +
                        t.keywords.substring(0, i) +
                        '<span class="algolia-docsearch-suggestion--highlight">' +
                        t.keywords.substring(i, s) +
                        '</span>' +
                        t.keywords.substring(s, t.keywords.length) +
                        '</i>';
                    return this.getHit(t, r);
                }
                getContentHit(t, e) {
                    const n = e[0],
                        i = e[0] + e[1];
                    let s = n,
                        r = i,
                        a = !0,
                        o = !0;
                    for (let c = 0; c < 3; c++) {
                        const e = t.content.lastIndexOf(' ', s - 2),
                            n = t.content.lastIndexOf('.', s - 2);
                        if (n > 0 && n > e) {
                            (s = n + 1), (a = !1);
                            break;
                        }
                        if (e < 0) {
                            (s = 0), (a = !1);
                            break;
                        }
                        s = e + 1;
                    }
                    for (let c = 0; c < 10; c++) {
                        const e = t.content.indexOf(' ', r + 1),
                            n = t.content.indexOf('.', r + 1);
                        if (n > 0 && n < e) {
                            (r = n), (o = !1);
                            break;
                        }
                        if (e < 0) {
                            (r = t.content.length), (o = !1);
                            break;
                        }
                        r = e;
                    }
                    let u = t.content.substring(s, n);
                    return (
                        a && (u = '... ' + u),
                        (u +=
                            '<span class="algolia-docsearch-suggestion--highlight">' +
                            t.content.substring(n, i) +
                            '</span>'),
                        (u += t.content.substring(i, r)),
                        o && (u += ' ...'),
                        this.getHit(t, null, u)
                    );
                }
                search(t) {
                    return new Promise((e, n) => {
                        const i = this.getLunrResult(t),
                            s = [];
                        i.length > this.maxHits && (i.length = this.maxHits),
                            (this.titleHitsRes = []),
                            (this.contentHitsRes = []),
                            i.forEach((e) => {
                                const n = this.searchDocs[e.ref],
                                    { metadata: i } = e.matchData;
                                for (let r in i)
                                    if (i[r].title) {
                                        if (!this.titleHitsRes.includes(e.ref)) {
                                            const a = i[r].title.position[0];
                                            s.push(this.getTitleHit(n, a, t.length)), this.titleHitsRes.push(e.ref);
                                        }
                                    } else if (i[r].content) {
                                        const t = i[r].content.position[0];
                                        s.push(this.getContentHit(n, t));
                                    } else if (i[r].keywords) {
                                        const a = i[r].keywords.position[0];
                                        s.push(this.getKeywordHit(n, a, t.length)), this.titleHitsRes.push(e.ref);
                                    }
                            }),
                            s.length > this.maxHits && (s.length = this.maxHits),
                            e(s);
                    });
                }
            };
            var o = n(1639),
                u = n.n(o);
            const c = 'algolia-docsearch',
                l = `${c}-suggestion`,
                h = {
                    suggestion: `\n  <a class="${l}\n    {{#isCategoryHeader}}${l}__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}${l}__secondary{{/isSubCategoryHeader}}\n    "\n    aria-label="Link to the result"\n    href="{{{url}}}"\n    >\n    <div class="${l}--category-header">\n        <span class="${l}--category-header-lvl0">{{{category}}}</span>\n    </div>\n    <div class="${l}--wrapper">\n      <div class="${l}--subcategory-column">\n        <span class="${l}--subcategory-column-text">{{{subcategory}}}</span>\n      </div>\n      {{#isTextOrSubcategoryNonEmpty}}\n      <div class="${l}--content">\n        <div class="${l}--subcategory-inline">{{{subcategory}}}</div>\n        <div class="${l}--title">{{{title}}}</div>\n        {{#text}}<div class="${l}--text">{{{text}}}</div>{{/text}}\n        {{#version}}<div class="${l}--version">{{version}}</div>{{/version}}\n      </div>\n      {{/isTextOrSubcategoryNonEmpty}}\n    </div>\n  </a>\n  `,
                    suggestionSimple: `\n  <div class="${l}\n    {{#isCategoryHeader}}${l}__main{{/isCategoryHeader}}\n    {{#isSubCategoryHeader}}${l}__secondary{{/isSubCategoryHeader}}\n    suggestion-layout-simple\n  ">\n    <div class="${l}--category-header">\n        {{^isLvl0}}\n        <span class="${l}--category-header-lvl0 ${l}--category-header-item">{{{category}}}</span>\n          {{^isLvl1}}\n          {{^isLvl1EmptyOrDuplicate}}\n          <span class="${l}--category-header-lvl1 ${l}--category-header-item">\n              {{{subcategory}}}\n          </span>\n          {{/isLvl1EmptyOrDuplicate}}\n          {{/isLvl1}}\n        {{/isLvl0}}\n        <div class="${l}--title ${l}--category-header-item">\n            {{#isLvl2}}\n                {{{title}}}\n            {{/isLvl2}}\n            {{#isLvl1}}\n                {{{subcategory}}}\n            {{/isLvl1}}\n            {{#isLvl0}}\n                {{{category}}}\n            {{/isLvl0}}\n        </div>\n    </div>\n    <div class="${l}--wrapper">\n      {{#text}}\n      <div class="${l}--content">\n        <div class="${l}--text">{{{text}}}</div>\n      </div>\n      {{/text}}\n    </div>\n  </div>\n  `,
                    footer: `\n    <div class="${`${c}-footer`}">\n    </div>\n  `,
                    empty: `\n  <div class="${l}">\n    <div class="${l}--wrapper">\n        <div class="${l}--content ${l}--no-results">\n            <div class="${l}--title">\n                <div class="${l}--text">\n                    No results found for query <b>"{{query}}"</b>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n  `,
                    searchBox:
                        '\n  <form novalidate="novalidate" onsubmit="return false;" class="searchbox">\n    <div role="search" class="searchbox__wrapper">\n      <input id="docsearch" type="search" name="search" placeholder="Search the docs" autocomplete="off" required="required" class="searchbox__input"/>\n      <button type="submit" title="Submit your search query." class="searchbox__submit" >\n        <svg width=12 height=12 role="img" aria-label="Search">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-search-13"></use>\n        </svg>\n      </button>\n      <button type="reset" title="Clear the search query." class="searchbox__reset hide">\n        <svg width=12 height=12 role="img" aria-label="Reset">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-3"></use>\n        </svg>\n      </button>\n    </div>\n</form>\n\n<div class="svg-icons" style="height: 0; width: 0; position: absolute; visibility: hidden">\n  <svg xmlns="http://www.w3.org/2000/svg">\n    <symbol id="sbx-icon-clear-3" viewBox="0 0 40 40"><path d="M16.228 20L1.886 5.657 0 3.772 3.772 0l1.885 1.886L20 16.228 34.343 1.886 36.228 0 40 3.772l-1.886 1.885L23.772 20l14.342 14.343L40 36.228 36.228 40l-1.885-1.886L20 23.772 5.657 38.114 3.772 40 0 36.228l1.886-1.885L16.228 20z" fill-rule="evenodd"></symbol>\n    <symbol id="sbx-icon-search-13" viewBox="0 0 40 40"><path d="M26.806 29.012a16.312 16.312 0 0 1-10.427 3.746C7.332 32.758 0 25.425 0 16.378 0 7.334 7.333 0 16.38 0c9.045 0 16.378 7.333 16.378 16.38 0 3.96-1.406 7.593-3.746 10.426L39.547 37.34c.607.608.61 1.59-.004 2.203a1.56 1.56 0 0 1-2.202.004L26.807 29.012zm-10.427.627c7.322 0 13.26-5.938 13.26-13.26 0-7.324-5.938-13.26-13.26-13.26-7.324 0-13.26 5.936-13.26 13.26 0 7.322 5.936 13.26 13.26 13.26z" fill-rule="evenodd"></symbol>\n  </svg>\n</div>\n  ',
                };
            var p = n(7939),
                d = n.n(p);
            const f = {
                mergeKeyWithParent(t, e) {
                    if (void 0 === t[e]) return t;
                    if ('object' != typeof t[e]) return t;
                    const n = d().extend({}, t, t[e]);
                    return delete n[e], n;
                },
                groupBy(t, e) {
                    const n = {};
                    return (
                        d().each(t, (t, i) => {
                            if (void 0 === i[e]) throw new Error(`[groupBy]: Object has no key ${e}`);
                            let s = i[e];
                            'string' == typeof s && (s = s.toLowerCase()),
                                Object.prototype.hasOwnProperty.call(n, s) || (n[s] = []),
                                n[s].push(i);
                        }),
                        n
                    );
                },
                values: (t) => Object.keys(t).map((e) => t[e]),
                flatten(t) {
                    const e = [];
                    return (
                        t.forEach((t) => {
                            Array.isArray(t)
                                ? t.forEach((t) => {
                                      e.push(t);
                                  })
                                : e.push(t);
                        }),
                        e
                    );
                },
                flattenAndFlagFirst(t, e) {
                    const n = this.values(t).map((t) => t.map((t, n) => ((t[e] = 0 === n), t)));
                    return this.flatten(n);
                },
                compact(t) {
                    const e = [];
                    return (
                        t.forEach((t) => {
                            t && e.push(t);
                        }),
                        e
                    );
                },
                getHighlightedValue: (t, e) =>
                    t._highlightResult &&
                    t._highlightResult.hierarchy_camel &&
                    t._highlightResult.hierarchy_camel[e] &&
                    t._highlightResult.hierarchy_camel[e].matchLevel &&
                    'none' !== t._highlightResult.hierarchy_camel[e].matchLevel &&
                    t._highlightResult.hierarchy_camel[e].value
                        ? t._highlightResult.hierarchy_camel[e].value
                        : t._highlightResult &&
                            t._highlightResult &&
                            t._highlightResult[e] &&
                            t._highlightResult[e].value
                          ? t._highlightResult[e].value
                          : t[e],
                getSnippetedValue(t, e) {
                    if (!t._snippetResult || !t._snippetResult[e] || !t._snippetResult[e].value) return t[e];
                    let n = t._snippetResult[e].value;
                    return (
                        n[0] !== n[0].toUpperCase() && (n = `\u2026${n}`),
                        -1 === ['.', '!', '?'].indexOf(n[n.length - 1]) && (n = `${n}\u2026`),
                        n
                    );
                },
                deepClone: (t) => JSON.parse(JSON.stringify(t)),
            };
            class g {
                constructor(t) {
                    let {
                        searchDocs: e,
                        searchIndex: n,
                        inputSelector: i,
                        debug: s = !1,
                        baseUrl: r = '/',
                        queryDataCallback: o = null,
                        autocompleteOptions: c = { debug: !1, hint: !1, autoselect: !0 },
                        transformData: l = !1,
                        queryHook: p = !1,
                        handleSelected: f = !1,
                        enhancedSearchInput: m = !1,
                        layout: v = 'column',
                        maxHits: y = 5,
                    } = t;
                    (this.input = g.getInputFromSelector(i)), (this.queryDataCallback = o || null);
                    const b = !(!c || !c.debug) && c.debug;
                    (c.debug = s || b),
                        (this.autocompleteOptions = c),
                        (this.autocompleteOptions.cssClasses = this.autocompleteOptions.cssClasses || {}),
                        (this.autocompleteOptions.cssClasses.prefix =
                            this.autocompleteOptions.cssClasses.prefix || 'ds');
                    const w = this.input && 'function' == typeof this.input.attr && this.input.attr('aria-label');
                    (this.autocompleteOptions.ariaLabel = this.autocompleteOptions.ariaLabel || w || 'search input'),
                        (this.isSimpleLayout = 'simple' === v),
                        (this.client = new a(e, n, r, y)),
                        m && (this.input = g.injectSearchBox(this.input)),
                        (this.autocomplete = u()(this.input, c, [
                            {
                                source: this.getAutocompleteSource(l, p),
                                templates: {
                                    suggestion: g.getSuggestionTemplate(this.isSimpleLayout),
                                    footer: h.footer,
                                    empty: g.getEmptyTemplate(),
                                },
                            },
                        ]));
                    const x = f;
                    (this.handleSelected = x || this.handleSelected),
                        x &&
                            d()('.algolia-autocomplete').on('click', '.ds-suggestions a', (t) => {
                                t.preventDefault();
                            }),
                        this.autocomplete.on(
                            'autocomplete:selected',
                            this.handleSelected.bind(null, this.autocomplete.autocomplete),
                        ),
                        this.autocomplete.on('autocomplete:shown', this.handleShown.bind(null, this.input)),
                        m && g.bindSearchBoxEvent(),
                        document.addEventListener('keydown', (t) => {
                            (t.ctrlKey || t.metaKey) && 'k' == t.key && (this.input.focus(), t.preventDefault());
                        });
                }
                static injectSearchBox(t) {
                    t.before(h.searchBox);
                    const e = t.prev().prev().find('input');
                    return t.remove(), e;
                }
                static bindSearchBoxEvent() {
                    d()('.searchbox [type="reset"]').on('click', function () {
                        d()('input#docsearch').focus(), d()(this).addClass('hide'), u().autocomplete.setVal('');
                    }),
                        d()('input#docsearch').on('keyup', () => {
                            const t = document.querySelector('input#docsearch'),
                                e = document.querySelector('.searchbox [type="reset"]');
                            (e.className = 'searchbox__reset'), 0 === t.value.length && (e.className += ' hide');
                        });
                }
                static getInputFromSelector(t) {
                    const e = d()(t).filter('input');
                    return e.length ? d()(e[0]) : null;
                }
                getAutocompleteSource(t, e) {
                    return (n, i) => {
                        e && (n = e(n) || n),
                            this.client.search(n).then((e) => {
                                this.queryDataCallback &&
                                    'function' == typeof this.queryDataCallback &&
                                    this.queryDataCallback(e),
                                    t && (e = t(e) || e),
                                    i(g.formatHits(e));
                            });
                    };
                }
                static formatHits(t) {
                    const e = f
                        .deepClone(t)
                        .map(
                            (t) => (
                                t._highlightResult &&
                                    (t._highlightResult = f.mergeKeyWithParent(t._highlightResult, 'hierarchy')),
                                f.mergeKeyWithParent(t, 'hierarchy')
                            ),
                        );
                    let n = f.groupBy(e, 'lvl0');
                    return (
                        d().each(n, (t, e) => {
                            const i = f.groupBy(e, 'lvl1'),
                                s = f.flattenAndFlagFirst(i, 'isSubCategoryHeader');
                            n[t] = s;
                        }),
                        (n = f.flattenAndFlagFirst(n, 'isCategoryHeader')),
                        n.map((t) => {
                            const e = g.formatURL(t),
                                n = f.getHighlightedValue(t, 'lvl0'),
                                i = f.getHighlightedValue(t, 'lvl1') || n,
                                s = f
                                    .compact([
                                        f.getHighlightedValue(t, 'lvl2') || i,
                                        f.getHighlightedValue(t, 'lvl3'),
                                        f.getHighlightedValue(t, 'lvl4'),
                                        f.getHighlightedValue(t, 'lvl5'),
                                        f.getHighlightedValue(t, 'lvl6'),
                                    ])
                                    .join(
                                        '<span class="aa-suggestion-title-separator" aria-hidden="true"> \u203a </span>',
                                    ),
                                r = f.getSnippetedValue(t, 'content'),
                                a = (i && '' !== i) || (s && '' !== s),
                                o = !i || '' === i || i === n,
                                u = s && '' !== s && s !== i,
                                c = !u && i && '' !== i && i !== n,
                                l = !c && !u,
                                h = t.version;
                            return {
                                isLvl0: l,
                                isLvl1: c,
                                isLvl2: u,
                                isLvl1EmptyOrDuplicate: o,
                                isCategoryHeader: t.isCategoryHeader,
                                isSubCategoryHeader: t.isSubCategoryHeader,
                                isTextOrSubcategoryNonEmpty: a,
                                category: n,
                                subcategory: i,
                                title: s,
                                text: r,
                                url: e,
                                version: h,
                            };
                        })
                    );
                }
                static formatURL(t) {
                    const { url: e, anchor: n } = t;
                    if (e) {
                        return -1 !== e.indexOf('#') ? e : n ? `${t.url}#${t.anchor}` : e;
                    }
                    return n ? `#${t.anchor}` : (console.warn('no anchor nor url for : ', JSON.stringify(t)), null);
                }
                static getEmptyTemplate() {
                    return (t) => s().compile(h.empty).render(t);
                }
                static getSuggestionTemplate(t) {
                    const e = t ? h.suggestionSimple : h.suggestion,
                        n = s().compile(e);
                    return (t) => n.render(t);
                }
                handleSelected(t, e, n, i, s) {
                    void 0 === s && (s = {}),
                        'click' !== s.selectionMethod && (t.setVal(''), window.location.assign(n.url));
                }
                handleShown(t) {
                    const e = t.offset().left + t.width() / 2;
                    let n = d()(document).width() / 2;
                    isNaN(n) && (n = 900);
                    const i = e - n >= 0 ? 'algolia-autocomplete-right' : 'algolia-autocomplete-left',
                        s = e - n < 0 ? 'algolia-autocomplete-right' : 'algolia-autocomplete-left',
                        r = d()('.algolia-autocomplete');
                    r.hasClass(i) || r.addClass(i), r.hasClass(s) && r.removeClass(s);
                }
            }
            const m = g;
        },
        9397: (t, e) => {
            !(function (t) {
                var e = /\S/,
                    n = /\"/g,
                    i = /\n/g,
                    s = /\r/g,
                    r = /\\/g,
                    a = /\u2028/,
                    o = /\u2029/;
                function u(t) {
                    '}' === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1));
                }
                function c(t) {
                    return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, '');
                }
                function l(t, e, n) {
                    if (e.charAt(n) != t.charAt(0)) return !1;
                    for (var i = 1, s = t.length; i < s; i++) if (e.charAt(n + i) != t.charAt(i)) return !1;
                    return !0;
                }
                (t.tags = {
                    '#': 1,
                    '^': 2,
                    '<': 3,
                    $: 4,
                    '/': 5,
                    '!': 6,
                    '>': 7,
                    '=': 8,
                    _v: 9,
                    '{': 10,
                    '&': 11,
                    _t: 12,
                }),
                    (t.scan = function (n, i) {
                        var s = n.length,
                            r = 0,
                            a = null,
                            o = null,
                            h = '',
                            p = [],
                            d = !1,
                            f = 0,
                            g = 0,
                            m = '{{',
                            v = '}}';
                        function y() {
                            h.length > 0 && (p.push({ tag: '_t', text: new String(h) }), (h = ''));
                        }
                        function b(n, i) {
                            if (
                                (y(),
                                n &&
                                    (function () {
                                        for (var n = !0, i = g; i < p.length; i++)
                                            if (
                                                !(n =
                                                    t.tags[p[i].tag] < t.tags._v ||
                                                    ('_t' == p[i].tag && null === p[i].text.match(e)))
                                            )
                                                return !1;
                                        return n;
                                    })())
                            )
                                for (var s, r = g; r < p.length; r++)
                                    p[r].text &&
                                        ((s = p[r + 1]) && '>' == s.tag && (s.indent = p[r].text.toString()),
                                        p.splice(r, 1));
                            else i || p.push({ tag: '\n' });
                            (d = !1), (g = p.length);
                        }
                        function w(t, e) {
                            var n = '=' + v,
                                i = t.indexOf(n, e),
                                s = c(t.substring(t.indexOf('=', e) + 1, i)).split(' ');
                            return (m = s[0]), (v = s[s.length - 1]), i + n.length - 1;
                        }
                        for (i && ((i = i.split(' ')), (m = i[0]), (v = i[1])), f = 0; f < s; f++)
                            0 == r
                                ? l(m, n, f)
                                    ? (--f, y(), (r = 1))
                                    : '\n' == n.charAt(f)
                                      ? b(d)
                                      : (h += n.charAt(f))
                                : 1 == r
                                  ? ((f += m.length - 1),
                                    '=' == (a = (o = t.tags[n.charAt(f + 1)]) ? n.charAt(f + 1) : '_v')
                                        ? ((f = w(n, f)), (r = 0))
                                        : (o && f++, (r = 2)),
                                    (d = f))
                                  : l(v, n, f)
                                    ? (p.push({
                                          tag: a,
                                          n: c(h),
                                          otag: m,
                                          ctag: v,
                                          i: '/' == a ? d - m.length : f + v.length,
                                      }),
                                      (h = ''),
                                      (f += v.length - 1),
                                      (r = 0),
                                      '{' == a && ('}}' == v ? f++ : u(p[p.length - 1])))
                                    : (h += n.charAt(f));
                        return b(d, !0), p;
                    });
                var h = { _t: !0, '\n': !0, $: !0, '/': !0 };
                function p(e, n, i, s) {
                    var r,
                        a = [],
                        o = null,
                        u = null;
                    for (r = i[i.length - 1]; e.length > 0; ) {
                        if (((u = e.shift()), r && '<' == r.tag && !(u.tag in h)))
                            throw new Error('Illegal content in < super tag.');
                        if (t.tags[u.tag] <= t.tags.$ || d(u, s)) i.push(u), (u.nodes = p(e, u.tag, i, s));
                        else {
                            if ('/' == u.tag) {
                                if (0 === i.length) throw new Error('Closing tag without opener: /' + u.n);
                                if (((o = i.pop()), u.n != o.n && !f(u.n, o.n, s)))
                                    throw new Error('Nesting error: ' + o.n + ' vs. ' + u.n);
                                return (o.end = u.i), a;
                            }
                            '\n' == u.tag && (u.last = 0 == e.length || '\n' == e[0].tag);
                        }
                        a.push(u);
                    }
                    if (i.length > 0) throw new Error('missing closing tag: ' + i.pop().n);
                    return a;
                }
                function d(t, e) {
                    for (var n = 0, i = e.length; n < i; n++) if (e[n].o == t.n) return (t.tag = '#'), !0;
                }
                function f(t, e, n) {
                    for (var i = 0, s = n.length; i < s; i++) if (n[i].c == t && n[i].o == e) return !0;
                }
                function g(t) {
                    var e = [];
                    for (var n in t.partials)
                        e.push('"' + v(n) + '":{name:"' + v(t.partials[n].name) + '", ' + g(t.partials[n]) + '}');
                    return (
                        'partials: {' +
                        e.join(',') +
                        '}, subs: ' +
                        (function (t) {
                            var e = [];
                            for (var n in t) e.push('"' + v(n) + '": function(c,p,t,i) {' + t[n] + '}');
                            return '{ ' + e.join(',') + ' }';
                        })(t.subs)
                    );
                }
                t.stringify = function (e, n, i) {
                    return '{code: function (c,p,i) { ' + t.wrapMain(e.code) + ' },' + g(e) + '}';
                };
                var m = 0;
                function v(t) {
                    return t
                        .replace(r, '\\\\')
                        .replace(n, '\\"')
                        .replace(i, '\\n')
                        .replace(s, '\\r')
                        .replace(a, '\\u2028')
                        .replace(o, '\\u2029');
                }
                function y(t) {
                    return ~t.indexOf('.') ? 'd' : 'f';
                }
                function b(t, e) {
                    var n = '<' + (e.prefix || '') + t.n + m++;
                    return (
                        (e.partials[n] = { name: t.n, partials: {} }),
                        (e.code += 't.b(t.rp("' + v(n) + '",c,p,"' + (t.indent || '') + '"));'),
                        n
                    );
                }
                function w(t, e) {
                    e.code += 't.b(t.t(t.' + y(t.n) + '("' + v(t.n) + '",c,p,0)));';
                }
                function x(t) {
                    return 't.b(' + t + ');';
                }
                (t.generate = function (e, n, i) {
                    m = 0;
                    var s = { code: '', subs: {}, partials: {} };
                    return t.walk(e, s), i.asString ? this.stringify(s, n, i) : this.makeTemplate(s, n, i);
                }),
                    (t.wrapMain = function (t) {
                        return 'var t=this;t.b(i=i||"");' + t + 'return t.fl();';
                    }),
                    (t.template = t.Template),
                    (t.makeTemplate = function (t, e, n) {
                        var i = this.makePartials(t);
                        return (
                            (i.code = new Function('c', 'p', 'i', this.wrapMain(t.code))),
                            new this.template(i, e, this, n)
                        );
                    }),
                    (t.makePartials = function (t) {
                        var e,
                            n = { subs: {}, partials: t.partials, name: t.name };
                        for (e in n.partials) n.partials[e] = this.makePartials(n.partials[e]);
                        for (e in t.subs) n.subs[e] = new Function('c', 'p', 't', 'i', t.subs[e]);
                        return n;
                    }),
                    (t.codegen = {
                        '#': function (e, n) {
                            (n.code +=
                                'if(t.s(t.' +
                                y(e.n) +
                                '("' +
                                v(e.n) +
                                '",c,p,1),c,p,0,' +
                                e.i +
                                ',' +
                                e.end +
                                ',"' +
                                e.otag +
                                ' ' +
                                e.ctag +
                                '")){t.rs(c,p,function(c,p,t){'),
                                t.walk(e.nodes, n),
                                (n.code += '});c.pop();}');
                        },
                        '^': function (e, n) {
                            (n.code += 'if(!t.s(t.' + y(e.n) + '("' + v(e.n) + '",c,p,1),c,p,1,0,0,"")){'),
                                t.walk(e.nodes, n),
                                (n.code += '};');
                        },
                        '>': b,
                        '<': function (e, n) {
                            var i = { partials: {}, code: '', subs: {}, inPartial: !0 };
                            t.walk(e.nodes, i);
                            var s = n.partials[b(e, n)];
                            (s.subs = i.subs), (s.partials = i.partials);
                        },
                        $: function (e, n) {
                            var i = { subs: {}, code: '', partials: n.partials, prefix: e.n };
                            t.walk(e.nodes, i),
                                (n.subs[e.n] = i.code),
                                n.inPartial || (n.code += 't.sub("' + v(e.n) + '",c,p,i);');
                        },
                        '\n': function (t, e) {
                            e.code += x('"\\n"' + (t.last ? '' : ' + i'));
                        },
                        _v: function (t, e) {
                            e.code += 't.b(t.v(t.' + y(t.n) + '("' + v(t.n) + '",c,p,0)));';
                        },
                        _t: function (t, e) {
                            e.code += x('"' + v(t.text) + '"');
                        },
                        '{': w,
                        '&': w,
                    }),
                    (t.walk = function (e, n) {
                        for (var i, s = 0, r = e.length; s < r; s++) (i = t.codegen[e[s].tag]) && i(e[s], n);
                        return n;
                    }),
                    (t.parse = function (t, e, n) {
                        return p(t, 0, [], (n = n || {}).sectionTags || []);
                    }),
                    (t.cache = {}),
                    (t.cacheKey = function (t, e) {
                        return [t, !!e.asString, !!e.disableLambda, e.delimiters, !!e.modelGet].join('||');
                    }),
                    (t.compile = function (e, n) {
                        n = n || {};
                        var i = t.cacheKey(e, n),
                            s = this.cache[i];
                        if (s) {
                            var r = s.partials;
                            for (var a in r) delete r[a].instance;
                            return s;
                        }
                        return (
                            (s = this.generate(this.parse(this.scan(e, n.delimiters), e, n), e, n)), (this.cache[i] = s)
                        );
                    });
            })(e);
        },
        5485: (t, e, n) => {
            var i = n(9397);
            (i.Template = n(2882).Template), (i.template = i.Template), (t.exports = i);
        },
        2882: (t, e) => {
            !(function (t) {
                function e(t, e, n) {
                    var i;
                    return (
                        e &&
                            'object' == typeof e &&
                            (void 0 !== e[t] ? (i = e[t]) : n && e.get && 'function' == typeof e.get && (i = e.get(t))),
                        i
                    );
                }
                (t.Template = function (t, e, n, i) {
                    (t = t || {}),
                        (this.r = t.code || this.r),
                        (this.c = n),
                        (this.options = i || {}),
                        (this.text = e || ''),
                        (this.partials = t.partials || {}),
                        (this.subs = t.subs || {}),
                        (this.buf = '');
                }),
                    (t.Template.prototype = {
                        r: function (t, e, n) {
                            return '';
                        },
                        v: function (t) {
                            return (
                                (t = u(t)),
                                o.test(t)
                                    ? t
                                          .replace(n, '&amp;')
                                          .replace(i, '&lt;')
                                          .replace(s, '&gt;')
                                          .replace(r, '&#39;')
                                          .replace(a, '&quot;')
                                    : t
                            );
                        },
                        t: u,
                        render: function (t, e, n) {
                            return this.ri([t], e || {}, n);
                        },
                        ri: function (t, e, n) {
                            return this.r(t, e, n);
                        },
                        ep: function (t, e) {
                            var n = this.partials[t],
                                i = e[n.name];
                            if (n.instance && n.base == i) return n.instance;
                            if ('string' == typeof i) {
                                if (!this.c) throw new Error('No compiler available.');
                                i = this.c.compile(i, this.options);
                            }
                            if (!i) return null;
                            if (((this.partials[t].base = i), n.subs)) {
                                for (key in (e.stackText || (e.stackText = {}), n.subs))
                                    e.stackText[key] ||
                                        (e.stackText[key] =
                                            void 0 !== this.activeSub && e.stackText[this.activeSub]
                                                ? e.stackText[this.activeSub]
                                                : this.text);
                                i = (function (t, e, n, i, s, r) {
                                    function a() {}
                                    function o() {}
                                    var u;
                                    (a.prototype = t), (o.prototype = t.subs);
                                    var c = new a();
                                    for (u in ((c.subs = new o()),
                                    (c.subsText = {}),
                                    (c.buf = ''),
                                    (i = i || {}),
                                    (c.stackSubs = i),
                                    (c.subsText = r),
                                    e))
                                        i[u] || (i[u] = e[u]);
                                    for (u in i) c.subs[u] = i[u];
                                    for (u in ((s = s || {}), (c.stackPartials = s), n)) s[u] || (s[u] = n[u]);
                                    for (u in s) c.partials[u] = s[u];
                                    return c;
                                })(i, n.subs, n.partials, this.stackSubs, this.stackPartials, e.stackText);
                            }
                            return (this.partials[t].instance = i), i;
                        },
                        rp: function (t, e, n, i) {
                            var s = this.ep(t, n);
                            return s ? s.ri(e, n, i) : '';
                        },
                        rs: function (t, e, n) {
                            var i = t[t.length - 1];
                            if (c(i)) for (var s = 0; s < i.length; s++) t.push(i[s]), n(t, e, this), t.pop();
                            else n(t, e, this);
                        },
                        s: function (t, e, n, i, s, r, a) {
                            var o;
                            return (
                                (!c(t) || 0 !== t.length) &&
                                ('function' == typeof t && (t = this.ms(t, e, n, i, s, r, a)),
                                (o = !!t),
                                !i && o && e && e.push('object' == typeof t ? t : e[e.length - 1]),
                                o)
                            );
                        },
                        d: function (t, n, i, s) {
                            var r,
                                a = t.split('.'),
                                o = this.f(a[0], n, i, s),
                                u = this.options.modelGet,
                                l = null;
                            if ('.' === t && c(n[n.length - 2])) o = n[n.length - 1];
                            else
                                for (var h = 1; h < a.length; h++)
                                    void 0 !== (r = e(a[h], o, u)) ? ((l = o), (o = r)) : (o = '');
                            return (
                                !(s && !o) &&
                                (s || 'function' != typeof o || (n.push(l), (o = this.mv(o, n, i)), n.pop()), o)
                            );
                        },
                        f: function (t, n, i, s) {
                            for (var r = !1, a = !1, o = this.options.modelGet, u = n.length - 1; u >= 0; u--)
                                if (void 0 !== (r = e(t, n[u], o))) {
                                    a = !0;
                                    break;
                                }
                            return a ? (s || 'function' != typeof r || (r = this.mv(r, n, i)), r) : !s && '';
                        },
                        ls: function (t, e, n, i, s) {
                            var r = this.options.delimiters;
                            return (
                                (this.options.delimiters = s),
                                this.b(this.ct(u(t.call(e, i)), e, n)),
                                (this.options.delimiters = r),
                                !1
                            );
                        },
                        ct: function (t, e, n) {
                            if (this.options.disableLambda) throw new Error('Lambda features disabled.');
                            return this.c.compile(t, this.options).render(e, n);
                        },
                        b: function (t) {
                            this.buf += t;
                        },
                        fl: function () {
                            var t = this.buf;
                            return (this.buf = ''), t;
                        },
                        ms: function (t, e, n, i, s, r, a) {
                            var o,
                                u = e[e.length - 1],
                                c = t.call(u);
                            return 'function' == typeof c
                                ? !!i ||
                                      ((o =
                                          this.activeSub && this.subsText && this.subsText[this.activeSub]
                                              ? this.subsText[this.activeSub]
                                              : this.text),
                                      this.ls(c, u, n, o.substring(s, r), a))
                                : c;
                        },
                        mv: function (t, e, n) {
                            var i = e[e.length - 1],
                                s = t.call(i);
                            return 'function' == typeof s ? this.ct(u(s.call(i)), i, n) : s;
                        },
                        sub: function (t, e, n, i) {
                            var s = this.subs[t];
                            s && ((this.activeSub = t), s(e, n, this, i), (this.activeSub = !1));
                        },
                    });
                var n = /&/g,
                    i = /</g,
                    s = />/g,
                    r = /\'/g,
                    a = /\"/g,
                    o = /[&<>\"\']/;
                function u(t) {
                    return String(null == t ? '' : t);
                }
                var c =
                    Array.isArray ||
                    function (t) {
                        return '[object Array]' === Object.prototype.toString.call(t);
                    };
            })(e);
        },
        624: (t, e, n) => {
            'use strict';
            var i,
                s,
                r,
                a = [n(5525), n(9201), n(8291), n(2709), n(2506), n(9176)],
                o = -1,
                u = [],
                c = !1;
            function l() {
                i && s && ((i = !1), s.length ? (u = s.concat(u)) : (o = -1), u.length && h());
            }
            function h() {
                if (!i) {
                    (c = !1), (i = !0);
                    for (var t = u.length, e = setTimeout(l); t; ) {
                        for (s = u, u = []; s && ++o < t; ) s[o].run();
                        (o = -1), (t = u.length);
                    }
                    (s = null), (o = -1), (i = !1), clearTimeout(e);
                }
            }
            for (var p = -1, d = a.length; ++p < d; )
                if (a[p] && a[p].test && a[p].test()) {
                    r = a[p].install(h);
                    break;
                }
            function f(t, e) {
                (this.fun = t), (this.array = e);
            }
            (f.prototype.run = function () {
                var t = this.fun,
                    e = this.array;
                switch (e.length) {
                    case 0:
                        return t();
                    case 1:
                        return t(e[0]);
                    case 2:
                        return t(e[0], e[1]);
                    case 3:
                        return t(e[0], e[1], e[2]);
                    default:
                        return t.apply(null, e);
                }
            }),
                (t.exports = function (t) {
                    var e = new Array(arguments.length - 1);
                    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    u.push(new f(t, e)), c || i || ((c = !0), r());
                });
        },
        2709: (t, e, n) => {
            'use strict';
            (e.test = function () {
                return !n.g.setImmediate && void 0 !== n.g.MessageChannel;
            }),
                (e.install = function (t) {
                    var e = new n.g.MessageChannel();
                    return (
                        (e.port1.onmessage = t),
                        function () {
                            e.port2.postMessage(0);
                        }
                    );
                });
        },
        8291: (t, e, n) => {
            'use strict';
            var i = n.g.MutationObserver || n.g.WebKitMutationObserver;
            (e.test = function () {
                return i;
            }),
                (e.install = function (t) {
                    var e = 0,
                        s = new i(t),
                        r = n.g.document.createTextNode('');
                    return (
                        s.observe(r, { characterData: !0 }),
                        function () {
                            r.data = e = ++e % 2;
                        }
                    );
                });
        },
        9201: (t, e, n) => {
            'use strict';
            (e.test = function () {
                return 'function' == typeof n.g.queueMicrotask;
            }),
                (e.install = function (t) {
                    return function () {
                        n.g.queueMicrotask(t);
                    };
                });
        },
        2506: (t, e, n) => {
            'use strict';
            (e.test = function () {
                return 'document' in n.g && 'onreadystatechange' in n.g.document.createElement('script');
            }),
                (e.install = function (t) {
                    return function () {
                        var e = n.g.document.createElement('script');
                        return (
                            (e.onreadystatechange = function () {
                                t(), (e.onreadystatechange = null), e.parentNode.removeChild(e), (e = null);
                            }),
                            n.g.document.documentElement.appendChild(e),
                            t
                        );
                    };
                });
        },
        9176: (t, e) => {
            'use strict';
            (e.test = function () {
                return !0;
            }),
                (e.install = function (t) {
                    return function () {
                        setTimeout(t, 0);
                    };
                });
        },
    },
]);
