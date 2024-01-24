!(function () {
  "use strict";
  "undefined" != typeof Element &&
    (Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector),
    Element.prototype.closest ||
      (Element.prototype.closest = function (e) {
        var t = this;
        do {
          if (t.matches(e)) return t;
          t = t.parentElement || t.parentNode;
        } while (null !== t && 1 === t.nodeType);
        return null;
      })),
    Array.prototype.forEach ||
      (Array.prototype.forEach = function (e, t) {
        t = t || window;
        for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this);
      }),
    "undefined" != typeof window &&
      window.NodeList &&
      !NodeList.prototype.forEach &&
      (NodeList.prototype.forEach = Array.prototype.forEach),
    (function (e) {
      if ("undefined" != typeof window) {
        var t,
          n = 0,
          o = !1,
          i = !1,
          a = "message".length,
          r = "[iFrameSizer]",
          l = r.length,
          d = null,
          s = window.requestAnimationFrame,
          u = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
          c = {},
          m = null,
          f = {
            autoResize: !0,
            bodyBackground: null,
            bodyMargin: null,
            bodyMarginV1: 8,
            bodyPadding: null,
            checkOrigin: !0,
            inPageLinks: !1,
            enablePublicMethods: !0,
            heightCalculationMethod: "bodyOffset",
            id: "iFrameResizer",
            interval: 32,
            log: !1,
            maxHeight: 1 / 0,
            maxWidth: 1 / 0,
            minHeight: 0,
            minWidth: 0,
            mouseEvents: !0,
            resizeFrom: "parent",
            scrolling: !1,
            sizeHeight: !0,
            sizeWidth: !1,
            warningTimeout: 5e3,
            tolerance: 0,
            widthCalculationMethod: "scroll",
            onClose: function () {
              return !0;
            },
            onClosed: function () {},
            onInit: function () {},
            onMessage: function () {
              x("onMessage function not defined");
            },
            onMouseEnter: function () {},
            onMouseLeave: function () {},
            onResized: function () {},
            onScroll: function () {
              return !0;
            },
          },
          p = {};
        window.jQuery &&
          ((t = window.jQuery).fn
            ? t.fn.iFrameResize ||
              (t.fn.iFrameResize = function (e) {
                return this.filter("iframe")
                  .each(function (t, n) {
                    P(n, e);
                  })
                  .end();
              })
            : w("", "Unable to bind to jQuery, it is not fully loaded.")),
          "function" == typeof define && define.amd
            ? define([], B)
            : "object" == typeof module &&
              "object" == typeof module.exports &&
              (module.exports = B()),
          (window.iFrameResize = window.iFrameResize || B());
      }
      function y() {
        return (
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        );
      }
      function h(e, t, n) {
        e.addEventListener(t, n, !1);
      }
      function g(e, t, n) {
        e.removeEventListener(t, n, !1);
      }
      function b(e) {
        return (
          r +
          "[" +
          (function (e) {
            var t = "Host page: " + e;
            return (
              window.top !== window.self &&
                (t =
                  window.parentIFrame && window.parentIFrame.getId
                    ? window.parentIFrame.getId() + ": " + e
                    : "Nested host page: " + e),
              t
            );
          })(e) +
          "]"
        );
      }
      function v(e) {
        return c[e] ? c[e].log : o;
      }
      function _(e, t) {
        O("log", e, t, v(e));
      }
      function w(e, t) {
        O("info", e, t, v(e));
      }
      function x(e, t) {
        O("warn", e, t, !0);
      }
      function O(e, t, n, o) {
        !0 === o && "object" == typeof window.console && console[e](b(t), n);
      }
      function E(e) {
        function t() {
          i("Height"),
            i("Width"),
            z(
              function () {
                j(H), T(B), v("onResized", H);
              },
              H,
              "init"
            );
        }
        function n(e) {
          return "border-box" !== e.boxSizing
            ? 0
            : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
                (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
        }
        function o(e) {
          return "border-box" !== e.boxSizing
            ? 0
            : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
                (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
        }
        function i(e) {
          var t = Number(c[B]["max" + e]),
            n = Number(c[B]["min" + e]),
            o = e.toLowerCase(),
            i = Number(H[o]);
          _(B, "Checking " + o + " is in range " + n + "-" + t),
            i < n && ((i = n), _(B, "Set " + o + " to min value")),
            i > t && ((i = t), _(B, "Set " + o + " to max value")),
            (H[o] = "" + i);
        }
        function s(e) {
          return A.substr(A.indexOf(":") + a + e);
        }
        function u(e, t) {
          var n, o, i;
          (n = function () {
            var n, o;
            R(
              "Send Page Info",
              "pageInfo:" +
                ((n = document.body.getBoundingClientRect()),
                (o = H.iframe.getBoundingClientRect()),
                JSON.stringify({
                  iframeHeight: o.height,
                  iframeWidth: o.width,
                  clientHeight: Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                  ),
                  clientWidth: Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth || 0
                  ),
                  offsetTop: parseInt(o.top - n.top, 10),
                  offsetLeft: parseInt(o.left - n.left, 10),
                  scrollTop: window.pageYOffset,
                  scrollLeft: window.pageXOffset,
                  documentHeight: document.documentElement.clientHeight,
                  documentWidth: document.documentElement.clientWidth,
                  windowHeight: window.innerHeight,
                  windowWidth: window.innerWidth,
                })),
              e,
              t
            );
          }),
            (o = 32),
            p[(i = t)] ||
              (p[i] = setTimeout(function () {
                (p[i] = null), n();
              }, o));
        }
        function m(e) {
          var t = e.getBoundingClientRect();
          return (
            C(B),
            {
              x: Math.floor(Number(t.left) + Number(d.x)),
              y: Math.floor(Number(t.top) + Number(d.y)),
            }
          );
        }
        function f(e) {
          var t = e ? m(H.iframe) : { x: 0, y: 0 },
            n = { x: Number(H.width) + t.x, y: Number(H.height) + t.y };
          _(
            B,
            "Reposition requested from iFrame (offset x:" +
              t.x +
              " y:" +
              t.y +
              ")"
          ),
            window.top !== window.self
              ? window.parentIFrame
                ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](
                    n.x,
                    n.y
                  )
                : x(
                    B,
                    "Unable to scroll to requested position, window.parentIFrame not found"
                  )
              : ((d = n), y(), _(B, "--"));
        }
        function y() {
          !1 !== v("onScroll", d) ? T(B) : F();
        }
        function b(e) {
          var t = {};
          if (0 === Number(H.width) && 0 === Number(H.height)) {
            var n = s(9).split(":");
            t = { x: n[1], y: n[0] };
          } else t = { x: H.width, y: H.height };
          v(e, {
            iframe: H.iframe,
            screenX: Number(t.x),
            screenY: Number(t.y),
            type: H.type,
          });
        }
        function v(e, t) {
          return k(B, e, t);
        }
        var O,
          E,
          I,
          P,
          L,
          W,
          A = e.data,
          H = {},
          B = null;
        "[iFrameResizerChild]Ready" === A
          ? (function () {
              for (var e in c) R("iFrame requested init", N(e), c[e].iframe, e);
            })()
          : r === ("" + A).substr(0, l) && A.substr(l).split(":")[0] in c
          ? ((I = A.substr(l).split(":")),
            (P = I[1] ? parseInt(I[1], 10) : 0),
            (L = c[I[0]] && c[I[0]].iframe),
            (W = getComputedStyle(L)),
            (H = {
              iframe: L,
              id: I[0],
              height: P + n(W) + o(W),
              width: I[2],
              type: I[3],
            }),
            (B = H.id),
            c[B] && (c[B].loaded = !0),
            (E = H.type in { true: 1, false: 1, undefined: 1 }) &&
              _(B, "Ignoring init message from meta parent page"),
            !E &&
              (function (e) {
                var t = !0;
                return (
                  c[e] ||
                    ((t = !1),
                    x(
                      H.type + " No settings for " + e + ". Message was: " + A
                    )),
                  t
                );
              })(B) &&
              (_(B, "Received: " + A),
              (O = !0),
              null === H.iframe &&
                (x(B, "IFrame (" + H.id + ") not found"), (O = !1)),
              O &&
                (function () {
                  var t,
                    n = e.origin,
                    o = c[B] && c[B].checkOrigin;
                  if (
                    o &&
                    "" + n != "null" &&
                    !(o.constructor === Array
                      ? (function () {
                          var e = 0,
                            t = !1;
                          for (
                            _(
                              B,
                              "Checking connection is from allowed list of origins: " +
                                o
                            );
                            e < o.length;
                            e++
                          )
                            if (o[e] === n) {
                              t = !0;
                              break;
                            }
                          return t;
                        })()
                      : ((t = c[B] && c[B].remoteHost),
                        _(B, "Checking connection is from: " + t),
                        n === t))
                  )
                    throw new Error(
                      "Unexpected message received from: " +
                        n +
                        " for " +
                        H.iframe.id +
                        ". Message was: " +
                        e.data +
                        ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
                    );
                  return !0;
                })() &&
                (function () {
                  switch (
                    (c[B] && c[B].firstRun && c[B] && (c[B].firstRun = !1),
                    H.type)
                  ) {
                    case "close":
                      S(H.iframe);
                      break;
                    case "message":
                      (a = s(6)),
                        _(
                          B,
                          "onMessage passed: {iframe: " +
                            H.iframe.id +
                            ", message: " +
                            a +
                            "}"
                        ),
                        v("onMessage", {
                          iframe: H.iframe,
                          message: JSON.parse(a),
                        }),
                        _(B, "--");
                      break;
                    case "mouseenter":
                      b("onMouseEnter");
                      break;
                    case "mouseleave":
                      b("onMouseLeave");
                      break;
                    case "autoResize":
                      c[B].autoResize = JSON.parse(s(9));
                      break;
                    case "scrollTo":
                      f(!1);
                      break;
                    case "scrollToOffset":
                      f(!0);
                      break;
                    case "pageInfo":
                      u(c[B] && c[B].iframe, B),
                        (function () {
                          function e(e, o) {
                            function i() {
                              c[n] ? u(c[n].iframe, n) : t();
                            }
                            ["scroll", "resize"].forEach(function (t) {
                              _(n, e + t + " listener for sendPageInfo"),
                                o(window, t, i);
                            });
                          }
                          function t() {
                            e("Remove ", g);
                          }
                          var n = B;
                          e("Add ", h), c[n] && (c[n].stopPageInfo = t);
                        })();
                      break;
                    case "pageInfoStop":
                      c[B] &&
                        c[B].stopPageInfo &&
                        (c[B].stopPageInfo(), delete c[B].stopPageInfo);
                      break;
                    case "inPageLink":
                      (n = s(9).split("#")[1] || ""),
                        (o = decodeURIComponent(n)),
                        (i =
                          document.getElementById(o) ||
                          document.getElementsByName(o)[0])
                          ? ((e = m(i)),
                            _(
                              B,
                              "Moving to in page link (#" +
                                n +
                                ") at x: " +
                                e.x +
                                " y: " +
                                e.y
                            ),
                            (d = { x: e.x, y: e.y }),
                            y(),
                            _(B, "--"))
                          : window.top !== window.self
                          ? window.parentIFrame
                            ? window.parentIFrame.moveToAnchor(n)
                            : _(
                                B,
                                "In page link #" +
                                  n +
                                  " not found and window.parentIFrame not found"
                              )
                          : _(B, "In page link #" + n + " not found");
                      break;
                    case "reset":
                      M(H);
                      break;
                    case "init":
                      t(), v("onInit", H.iframe);
                      break;
                    default:
                      0 === Number(H.width) && 0 === Number(H.height)
                        ? x(
                            "Unsupported message received (" +
                              H.type +
                              "), this is likely due to the iframe containing a later version of iframe-resizer than the parent page"
                          )
                        : t();
                  }
                  var e, n, o, i, a;
                })()))
          : w(B, "Ignored: " + A);
      }
      function k(e, t, n) {
        var o = null,
          i = null;
        if (c[e]) {
          if ("function" != typeof (o = c[e][t]))
            throw new TypeError(t + " on iFrame[" + e + "] is not a function");
          i = o(n);
        }
        return i;
      }
      function I(e) {
        var t = e.id;
        delete c[t];
      }
      function S(e) {
        var t = e.id;
        if (!1 !== k(t, "onClose", t)) {
          _(t, "Removing iFrame: " + t);
          try {
            e.parentNode && e.parentNode.removeChild(e);
          } catch (e) {
            x(e);
          }
          k(t, "onClosed", t), _(t, "--"), I(e);
        } else _(t, "Close iframe cancelled by onClose event");
      }
      function C(t) {
        null === d &&
          _(
            t,
            "Get page position: " +
              (d = {
                x:
                  window.pageXOffset !== e
                    ? window.pageXOffset
                    : document.documentElement.scrollLeft,
                y:
                  window.pageYOffset !== e
                    ? window.pageYOffset
                    : document.documentElement.scrollTop,
              }).x +
              "," +
              d.y
          );
      }
      function T(e) {
        null !== d &&
          (window.scrollTo(d.x, d.y),
          _(e, "Set page position: " + d.x + "," + d.y),
          F());
      }
      function F() {
        d = null;
      }
      function M(e) {
        _(
          e.id,
          "Size reset requested by " +
            ("init" === e.type ? "host page" : "iFrame")
        ),
          C(e.id),
          z(
            function () {
              j(e), R("reset", "reset", e.iframe, e.id);
            },
            e,
            "reset"
          );
      }
      function j(e) {
        function t(t) {
          i ||
            "0" !== e[t] ||
            ((i = !0),
            _(o, "Hidden iFrame detected, creating visibility listener"),
            (function () {
              function e() {
                function e(e) {
                  function t(t) {
                    return "0px" === (c[e] && c[e].iframe.style[t]);
                  }
                  function n(e) {
                    return null !== e.offsetParent;
                  }
                  c[e] &&
                    n(c[e].iframe) &&
                    (t("height") || t("width")) &&
                    R("Visibility change", "resize", c[e].iframe, e);
                }
                Object.keys(c).forEach(function (t) {
                  e(t);
                });
              }
              function t(t) {
                _(
                  "window",
                  "Mutation observed: " + t[0].target + " " + t[0].type
                ),
                  L(e, 16);
              }
              function n() {
                var e = document.querySelector("body"),
                  n = {
                    attributes: !0,
                    attributeOldValue: !1,
                    characterData: !0,
                    characterDataOldValue: !1,
                    childList: !0,
                    subtree: !0,
                  };
                new o(t).observe(e, n);
              }
              var o = y();
              o && n();
            })());
        }
        function n(n) {
          !(function (t) {
            e.id
              ? ((e.iframe.style[t] = e[t] + "px"),
                _(e.id, "IFrame (" + o + ") " + t + " set to " + e[t] + "px"))
              : _("undefined", "messageData id not set");
          })(n),
            t(n);
        }
        var o = e.iframe.id;
        c[o] && (c[o].sizeHeight && n("height"), c[o].sizeWidth && n("width"));
      }
      function z(e, t, n) {
        n !== t.type && s && !window.jasmine
          ? (_(t.id, "Requesting animation frame"), s(e))
          : e();
      }
      function R(e, t, n, o, i) {
        var a,
          l = !1;
        (o = o || n.id),
          c[o] &&
            (n && "contentWindow" in n && null !== n.contentWindow
              ? ((a = c[o] && c[o].targetOrigin),
                _(
                  o,
                  "[" +
                    e +
                    "] Sending msg to iframe[" +
                    o +
                    "] (" +
                    t +
                    ") targetOrigin: " +
                    a
                ),
                n.contentWindow.postMessage(r + t, a))
              : x(o, "[" + e + "] IFrame(" + o + ") not found"),
            i &&
              c[o] &&
              c[o].warningTimeout &&
              (c[o].msgTimeout = setTimeout(function () {
                !c[o] ||
                  c[o].loaded ||
                  l ||
                  ((l = !0),
                  x(
                    o,
                    "IFrame has not responded within " +
                      c[o].warningTimeout / 1e3 +
                      " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
                  ));
              }, c[o].warningTimeout)));
      }
      function N(e) {
        return (
          e +
          ":" +
          c[e].bodyMarginV1 +
          ":" +
          c[e].sizeWidth +
          ":" +
          c[e].log +
          ":" +
          c[e].interval +
          ":" +
          c[e].enablePublicMethods +
          ":" +
          c[e].autoResize +
          ":" +
          c[e].bodyMargin +
          ":" +
          c[e].heightCalculationMethod +
          ":" +
          c[e].bodyBackground +
          ":" +
          c[e].bodyPadding +
          ":" +
          c[e].tolerance +
          ":" +
          c[e].inPageLinks +
          ":" +
          c[e].resizeFrom +
          ":" +
          c[e].widthCalculationMethod +
          ":" +
          c[e].mouseEvents
        );
      }
      function P(t, i) {
        function a(e) {
          var t = e.split("Callback");
          if (2 === t.length) {
            var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
            (this[n] = this[e]),
              delete this[e],
              x(
                d,
                "Deprecated: '" +
                  e +
                  "' has been renamed '" +
                  n +
                  "'. The old method will be removed in the next major version."
              );
          }
        }
        var r,
          l,
          d = (function (e) {
            var a;
            return (
              "" === e &&
                ((t.id =
                  ((a = (i && i.id) || f.id + n++),
                  null !== document.getElementById(a) && (a += n++),
                  (e = a))),
                (o = (i || {}).log),
                _(e, "Added missing iframe ID: " + e + " (" + t.src + ")")),
              e
            );
          })(t.id);
        d in c && "iFrameResizer" in t
          ? x(d, "Ignored iFrame, already setup.")
          : (!(function (e) {
              var n;
              (e = e || {}),
                (c[d] = {
                  firstRun: !0,
                  iframe: t,
                  remoteHost: t.src && t.src.split("/").slice(0, 3).join("/"),
                }),
                (function (e) {
                  if ("object" != typeof e)
                    throw new TypeError("Options is not an object");
                })(e),
                Object.keys(e).forEach(a, e),
                (function (e) {
                  for (var t in f)
                    Object.prototype.hasOwnProperty.call(f, t) &&
                      (c[d][t] = Object.prototype.hasOwnProperty.call(e, t)
                        ? e[t]
                        : f[t]);
                })(e),
                c[d] &&
                  (c[d].targetOrigin =
                    !0 === c[d].checkOrigin
                      ? "" === (n = c[d].remoteHost) ||
                        null !== n.match(/^(about:blank|javascript:|file:\/\/)/)
                        ? "*"
                        : n
                      : "*");
            })(i),
            (function () {
              switch (
                (_(
                  d,
                  "IFrame scrolling " +
                    (c[d] && c[d].scrolling ? "enabled" : "disabled") +
                    " for " +
                    d
                ),
                (t.style.overflow =
                  !1 === (c[d] && c[d].scrolling) ? "hidden" : "auto"),
                c[d] && c[d].scrolling)
              ) {
                case "omit":
                  break;
                case !0:
                  t.scrolling = "yes";
                  break;
                case !1:
                  t.scrolling = "no";
                  break;
                default:
                  t.scrolling = c[d] ? c[d].scrolling : "no";
              }
            })(),
            (function () {
              function e(e) {
                var n = c[d][e];
                1 / 0 !== n &&
                  0 !== n &&
                  ((t.style[e] = "number" == typeof n ? n + "px" : n),
                  _(d, "Set " + e + " = " + t.style[e]));
              }
              function n(e) {
                if (c[d]["min" + e] > c[d]["max" + e])
                  throw new Error(
                    "Value for min" + e + " can not be greater than max" + e
                  );
              }
              n("Height"),
                n("Width"),
                e("maxHeight"),
                e("minHeight"),
                e("maxWidth"),
                e("minWidth");
            })(),
            ("number" != typeof (c[d] && c[d].bodyMargin) &&
              "0" !== (c[d] && c[d].bodyMargin)) ||
              ((c[d].bodyMarginV1 = c[d].bodyMargin),
              (c[d].bodyMargin = c[d].bodyMargin + "px")),
            (r = N(d)),
            (l = y()) &&
              (function (e) {
                t.parentNode &&
                  new e(function (e) {
                    e.forEach(function (e) {
                      Array.prototype.slice
                        .call(e.removedNodes)
                        .forEach(function (e) {
                          e === t && S(t);
                        });
                    });
                  }).observe(t.parentNode, { childList: !0 });
              })(l),
            h(t, "load", function () {
              var n, o;
              R("iFrame.onload", r, t, e, !0),
                (n = c[d] && c[d].firstRun),
                (o = c[d] && c[d].heightCalculationMethod in u),
                !n && o && M({ iframe: t, height: 0, width: 0, type: "init" });
            }),
            R("init", r, t, e, !0),
            c[d] &&
              (c[d].iframe.iFrameResizer = {
                close: S.bind(null, c[d].iframe),
                removeListeners: I.bind(null, c[d].iframe),
                resize: R.bind(null, "Window resize", "resize", c[d].iframe),
                moveToAnchor: function (e) {
                  R("Move to anchor", "moveToAnchor:" + e, c[d].iframe, d);
                },
                sendMessage: function (e) {
                  R(
                    "Send Message",
                    "message:" + (e = JSON.stringify(e)),
                    c[d].iframe,
                    d
                  );
                },
              }));
      }
      function L(e, t) {
        null === m &&
          (m = setTimeout(function () {
            (m = null), e();
          }, t));
      }
      function W() {
        "hidden" !== document.visibilityState &&
          (_("document", "Trigger event: Visiblity change"),
          L(function () {
            A("Tab Visable", "resize");
          }, 16));
      }
      function A(e, t) {
        Object.keys(c).forEach(function (n) {
          (function (e) {
            return (
              c[e] &&
              "parent" === c[e].resizeFrom &&
              c[e].autoResize &&
              !c[e].firstRun
            );
          })(n) && R(e, t, c[n].iframe, n);
        });
      }
      function H() {
        h(window, "message", E),
          h(window, "resize", function () {
            var e;
            _("window", "Trigger event: " + (e = "resize")),
              L(function () {
                A("Window " + e, "resize");
              }, 16);
          }),
          h(document, "visibilitychange", W),
          h(document, "-webkit-visibilitychange", W);
      }
      function B() {
        function t(e, t) {
          t &&
            (!(function () {
              if (!t.tagName)
                throw new TypeError("Object is not a valid DOM element");
              if ("IFRAME" !== t.tagName.toUpperCase())
                throw new TypeError(
                  "Expected <IFRAME> tag, found <" + t.tagName + ">"
                );
            })(),
            P(t, e),
            n.push(t));
        }
        var n;
        return (
          (function () {
            var e,
              t = ["moz", "webkit", "o", "ms"];
            for (e = 0; e < t.length && !s; e += 1)
              s = window[t[e] + "RequestAnimationFrame"];
            s
              ? (s = s.bind(window))
              : _("setup", "RequestAnimationFrame not supported");
          })(),
          H(),
          function (o, i) {
            switch (
              ((n = []),
              (function (e) {
                e &&
                  e.enablePublicMethods &&
                  x(
                    "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
                  );
              })(o),
              typeof i)
            ) {
              case "undefined":
              case "string":
                Array.prototype.forEach.call(
                  document.querySelectorAll(i || "iframe"),
                  t.bind(e, o)
                );
                break;
              case "object":
                t(o, i);
                break;
              default:
                throw new TypeError("Unexpected data type (" + typeof i + ")");
            }
            return n;
          }
        );
      }
    })();
  var e = function (e) {
      for (
        var t = e.source,
          n = document.getElementsByTagName("iframe"),
          o = null,
          i = 0;
        i < n.length;
        i++
      ) {
        var a = n[i];
        if (
          a.contentWindow == t ||
          a.contentWindow == (null == t ? void 0 : t.parent)
        ) {
          o = a;
          break;
        }
      }
      return o;
    },
    t = function (e) {
      try {
        return localStorage.getItem(e);
      } catch (e) {
        return null;
      }
    },
    n = function (e, t) {
      try {
        localStorage.setItem(e, t);
      } catch (e) {}
    };
  var o = {
    overlay: "index-module_overlay__8wtEj",
    layoutDefault: "index-module_layoutDefault__2IbL4",
    layoutModal: "index-module_layoutModal__DRP2G",
    popupContainer: "index-module_popupContainer__2msgQ",
    loadingIndicator: "index-module_loadingIndicator__kFdXs",
    loadingIndicatorNoOverlay: "index-module_loadingIndicatorNoOverlay__3ZuSn",
    spin: "index-module_spin__37ne-",
    emoji: "index-module_emoji__1XBIX",
    animate__wave: "index-module_animate__wave__1uYZ0",
    wave: "index-module_wave__28Vlw",
    "animate__heart-beat": "index-module_animate__heart-beat__2IJ5_",
    heartBeat: "index-module_heartBeat__2Hu6C",
    animate__flash: "index-module_animate__flash__1AGEr",
    flash: "index-module_flash__R4MoF",
    animate__bounce: "index-module_animate__bounce__2H-Ho",
    bounce: "index-module_bounce__3V938",
    "animate__rubber-band": "index-module_animate__rubber-band__1o6I-",
    rubberBand: "index-module_rubberBand__1JT4E",
    "animate__head-shake": "index-module_animate__head-shake__o7vZO",
    headShake: "index-module_headShake__5UxEd",
    animate__tada: "index-module_animate__tada__2Gs8a",
    tada: "index-module_tada__2IKJp",
    animate__spin: "index-module_animate__spin__3oc__",
  };
  function i(e) {
    return (
      (i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      i(e)
    );
  }
  function a(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      t &&
        (o = o.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, o);
    }
    return n;
  }
  function r(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? a(Object(n), !0).forEach(function (t) {
            l(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : a(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function l(e, t, n) {
    return (
      (t = (function (e) {
        var t = (function (e, t) {
          if ("object" !== i(e) || null === e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var o = n.call(e, t || "default");
            if ("object" !== i(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t ? String : Number)(e);
        })(e, "string");
        return "symbol" === i(t) ? t : String(t);
      })(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  !(function (e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if (e && "undefined" != typeof document) {
      var o = document.head || document.getElementsByTagName("head")[0],
        i = document.createElement("style");
      (i.type = "text/css"),
        "top" === n && o.firstChild
          ? o.insertBefore(i, o.firstChild)
          : o.appendChild(i),
        i.styleSheet
          ? (i.styleSheet.cssText = e)
          : i.appendChild(document.createTextNode(e));
    }
  })(
    "@keyframes index-module_spin__37ne-{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes index-module_wave__28Vlw{0%{transform:rotate(0deg)}50%{transform:rotate(20deg)}to{transform:rotate(0deg)}}@keyframes index-module_heartBeat__2Hu6C{0%{transform:scale(1)}50%{transform:scale(1.08)}to{transform:scale(1)}}@keyframes index-module_flash__R4MoF{0%,50%,to{opacity:1}25%,75%{opacity:.2}}@keyframes index-module_bounce__3V938{0%,20%,53%,to{transform:translateZ(0)}40%,43%{transform:translate3d(0,-30px,0) scaleY(1.1)}70%{transform:translate3d(0,-15px,0) scaleY(1.05)}80%{transform:translateZ(0) scaleY(.95)}90%{transform:translate3d(0,-4px,0) scaleY(1.02)}}@keyframes index-module_rubberBand__1JT4E{0%{transform:scaleX(1)}30%{transform:scale3d(1.25,.75,1)}40%{transform:scale3d(.75,1.25,1)}50%{transform:scale3d(1.15,.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}to{transform:scaleX(1)}}@keyframes index-module_headShake__5UxEd{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}@keyframes index-module_tada__2IKJp{0%{transform:scaleX(1)}10%,20%{transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{transform:scaleX(1)}}.index-module_overlay__8wtEj{-ms-flex-pack:center;-ms-flex-align:center;align-items:center;background-color:hsla(0,0%,6%,.6);bottom:0;display:-ms-flexbox;display:flex;justify-content:center;left:0;position:fixed;right:0;top:0;z-index:1000000006}.index-module_layoutDefault__2IbL4{bottom:20px;position:fixed;right:20px;width:auto}.index-module_layoutDefault__2IbL4,.index-module_layoutModal__DRP2G{background-color:transparent;border-radius:5px;box-shadow:0 0 0 1px hsla(0,0%,6%,.05),0 3px 6px hsla(0,0%,6%,.1),0 9px 24px hsla(0,0%,6%,.2);display:-ms-flexbox;display:flex;height:auto;max-width:95vw;opacity:0;z-index:2147483000}.index-module_layoutModal__DRP2G{position:relative;width:700px}.index-module_popupContainer__2msgQ{border-radius:5px;display:-ms-flexbox;display:flex;overflow-y:auto;width:100%}.index-module_popupContainer__2msgQ iframe{border-radius:5px;max-height:95vh}.index-module_loadingIndicator__kFdXs{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;background-color:#f5f5f5;border-radius:50%;color:#444;display:-ms-inline-flexbox;display:inline-flex;height:50px;justify-content:center;position:absolute;width:50px;z-index:2147483000}.index-module_loadingIndicatorNoOverlay__3ZuSn{bottom:10px;position:fixed;right:10px}.index-module_loadingIndicator__kFdXs svg{animation:index-module_spin__37ne- 1.618s linear infinite;height:20px;width:20px}.index-module_emoji__1XBIX{display:inline-block;font-size:42px;left:-21px;line-height:1;position:absolute;top:-21px}.index-module_animate__wave__1uYZ0{animation:index-module_wave__28Vlw 1s ease-in-out 20}.index-module_animate__heart-beat__2IJ5_{animation:index-module_heartBeat__2Hu6C 1.3s ease-in-out 20}.index-module_animate__flash__1AGEr{animation:index-module_flash__R4MoF 2.5s 20}.index-module_animate__bounce__2H-Ho{animation:index-module_bounce__3V938 1.5s 20;-ms-transform-origin:center bottom;transform-origin:center bottom}.index-module_animate__rubber-band__1o6I-{animation:index-module_rubberBand__1JT4E 1.5s 20}.index-module_animate__head-shake__o7vZO{animation:index-module_headShake__5UxEd 1.5s ease-in-out 20}.index-module_animate__tada__2Gs8a{animation:index-module_tada__2IKJp 1.5s 20}.index-module_animate__spin__3oc__{animation:index-module_spin__37ne- 1.618s linear 20}@media (max-height:1000px){.index-module_popupContainer__2msgQ iframe{max-height:85vh}}@media (max-width:576px){.index-module_popupContainer__2msgQ iframe{max-height:70vh}.index-module_layoutDefault__2IbL4,.index-module_layoutModal__DRP2G{max-width:calc(100% - 40px)}}"
  ),
    (function (i) {
      var a,
        d,
        s,
        u,
        c = i.document,
        m = {},
        f = !1,
        p = !1,
        y = function () {
          c
            .querySelectorAll("iframe[data-tally-src]:not([src])")
            .forEach(function (e) {
              if (!e.dataset.tallyEmbedWidgetInitialized)
                if (i.IntersectionObserver) {
                  var t = new IntersectionObserver(
                    function (n) {
                      n.forEach(function (n) {
                        n.intersectionRatio > 0 && (h(e), t.unobserve(e));
                      });
                    },
                    { root: null, rootMargin: "500px", threshold: [0.01] }
                  );
                  t.observe(e);
                } else h(e);
            }),
            c
              .querySelectorAll("iframe:not([data-tally-src])")
              .forEach(function (e) {
                var t;
                e.dataset.tallyEmbedWidgetInitialized ||
                  (-1 !==
                    (null === (t = e.src) || void 0 === t
                      ? void 0
                      : t.indexOf("dynamicHeight=1")) &&
                    (void 0 !== e.sandbox && e.removeAttribute("sandbox"),
                    (e.dataset.tallyEmbedWidgetInitialized = "1"),
                    iFrameResize(
                      {
                        checkOrigin: !1,
                        heightCalculationMethod: "taggedElement",
                        scrolling: !1,
                      },
                      e
                    )));
              });
        },
        h = function (e) {
          if (!e.dataset.tallyEmbedWidgetInitialized) {
            (e.dataset.tallyEmbedWidgetInitialized = "1"),
              e.setAttribute("loading", "lazy");
            var t = e.dataset.tallySrc;
            t &&
              (void 0 !== e.sandbox && e.removeAttribute("sandbox"),
              (t += t.indexOf("?") > -1 ? "&" : "?"),
              (t += "originPage=".concat(
                encodeURIComponent(i.location.pathname)
              )),
              i.location.search &&
                (t += "&".concat(i.location.search.substring(1))),
              (e.src = t),
              -1 !== t.indexOf("dynamicHeight=1") &&
                iFrameResize(
                  {
                    checkOrigin: !1,
                    heightCalculationMethod: "taggedElement",
                    scrolling: !1,
                  },
                  e
                ));
          }
        },
        g = function (e, t) {
          var n;
          return null !== (n = null == t ? void 0 : t.key) && void 0 !== n
            ? n
            : "Tally.showOnce_".concat(e);
        },
        b = function (e, t) {
          var n;
          return null !== (n = null == t ? void 0 : t.key) && void 0 !== n
            ? n
            : "Tally.doNotShowAfterSubmit_".concat(e);
        },
        v = function (e) {
          e.preventDefault();
        },
        _ = function () {
          f ||
            (i.addEventListener("message", function (t) {
              if ("string" == typeof t.data)
                try {
                  var o,
                    i = JSON.parse(t.data);
                  if (
                    null == i ||
                    null === (o = i.event) ||
                    void 0 === o ||
                    !o.startsWith("Tally.")
                  )
                    return;
                  switch (i.event) {
                    case "Tally.FormLoaded":
                      y();
                      var a = m[i.payload.formId];
                      null != a && a.showOnce && n(g(i.payload.formId, a), "1");
                      break;
                    case "Tally.FormPageView":
                      var r,
                        l = m[i.payload.formId];
                      if (
                        (null != l &&
                          l.onPageView &&
                          l.onPageView(i.payload.page),
                        null != l && l.emoji && i.payload.page > 1)
                      )
                        null === (r = c.querySelector(".emoji")) ||
                          void 0 === r ||
                          r.remove();
                      var d = e(t);
                      d &&
                        d.getBoundingClientRect().top < 0 &&
                        d.scrollIntoView();
                      break;
                    case "Tally.FormSubmitted":
                      var s,
                        u = m[i.payload.formId];

                      function constructPayload(fieldsData) {
                        // Your payload hashmap
                        let payloadMap = {
                          name: "name",
                          email: "email",
                          chat_id: "telegram", // Map 'chat_id' to 'telegram' based on your requirement
                          week_start: "some_title", // Map 'week_start' to the appropriate title in fieldsData
                          week_end: "another_title", // Map 'week_end' to the appropriate title in fieldsData
                        };

                        // Create an empty payload object
                        let payload = {};
                        let schedule = {};

                        // Iterate over the fields data and update payload
                        fieldsData.forEach((field) => {
                          if (field.title in payloadMap) {
                            payload[field.title] = field.answer.value;
                          }
                          if (field.type === "MULTI_SELECT") {
                            let answer = field.answer.value;
                            let zones = answer.split(",");
                            let day_time = field.title.split(" ");
                            let day = day_time[0];
                            let time = day_time[1];

                            zones.forEach((zone) => {
                              if (zone.toString().length !== 0) {
                                schedule[
                                  `${day}_${time}_${zone.toString().trim()}`
                                ] = 1;
                              }
                            });
                          }
                        });

                        payload["schedule"] = schedule;
                        // Return the updated payload
                        return payload;
                      }

                      const fields = constructPayload(i.payload.fields);

                      const sendPostRequest = async (fields) => {
                        try {
                          const backendUrl =
                            "https://jambottally-ormqcmgxfa-od.a.run.app/bot/schedule";

                          console.log("fields: ", JSON.stringify(fields));

                          const response = await this.fetch(backendUrl, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(fields),
                          });

                          if (response.ok) {
                            // Request was successful, handle the response
                            console.log("Successfully Sent Schedule");
                          } else {
                            // Handle errors
                            console.error(
                              "Failed to send POST request",
                              response
                            );
                          }
                        } catch (error) {
                          console.error("Error:", error);
                        }
                      };

                      // send a post request to your backend
                      sendPostRequest(fields);
                      if (
                        (null != u && u.onSubmit && u.onSubmit(i.payload),
                        void 0 !== (null == u ? void 0 : u.autoClose) &&
                          setTimeout(function () {
                            x(i.payload.formId);
                          }, u.autoClose),
                        null != u && u.emoji)
                      )
                        null === (s = c.querySelector(".emoji")) ||
                          void 0 === s ||
                          s.remove();
                      null != u &&
                        u.doNotShowAfterSubmit &&
                        n(b(i.payload.formId, u), "1");
                      break;
                    case "Tally.PopupClosed":
                      x(i.payload.formId);
                  }
                } catch (e) {}
            }),
            (f = !0));
        },
        w = function (e, t) {
          var n,
            a,
            l,
            d,
            s = (null == t ? void 0 : t.width) || 376,
            u =
              null != t && t.customFormUrl
                ? t.customFormUrl
                : "".concat("https://tally.so", "/popup/").concat(e),
            m = "".concat(u).concat(
              ((a = r(
                r(
                  r(
                    { originPage: encodeURIComponent(i.location.pathname) },
                    ((d = {}),
                    new URLSearchParams(i.location.search).forEach(function (
                      e,
                      t
                    ) {
                      d[t] = encodeURIComponent(e);
                    }),
                    d)
                  ),
                  (null == t ? void 0 : t.hiddenFields) || {}
                ),
                {},
                {
                  popup: null != t && t.customFormUrl ? "1" : void 0,
                  alignLeft:
                    (null != t && t.alignLeft) || s <= 500 ? "1" : void 0,
                  hideTitle: null != t && t.hideTitle ? "1" : void 0,
                  preview: null != t && t.preview ? "1" : void 0,
                }
              )),
              (l = Object.keys(a)
                .filter(function (e) {
                  return void 0 !== a[e] && null !== a[e];
                })
                .map(function (e) {
                  return "".concat(e, "=").concat(a[e]);
                })
                .join("&"))
                ? "?".concat(l)
                : "")
            );
          if (null === c.querySelector('iframe[src="'.concat(m, '"]'))) {
            var f = o.layoutDefault;
            "modal" === (null == t ? void 0 : t.layout) && (f = o.layoutModal);
            var y = c.createElement("div");
            (y.className = "tally-popup ".concat(f, " tally-form-").concat(e)),
              (y.innerHTML = '<div class="'
                .concat(o.popupContainer, '"><iframe src="')
                .concat(
                  m,
                  '" frameborder="0" marginheight="0" marginwidth="0" title="Tally Forms" style="width: 1px; min-width: 100%;"></iframe></div>'
                )),
              (y.style.width = "".concat(s, "px"));
            var h = y.querySelector("iframe");
            if (null != t && null !== (n = t.emoji) && void 0 !== n && n.text) {
              var g,
                b = c.createElement("div");
              (b.className = "emoji "
                .concat(o.emoji, " ")
                .concat(
                  null !== (g = o["animate__".concat(t.emoji.animation)]) &&
                    void 0 !== g
                    ? g
                    : ""
                )),
                (b.innerHTML = t.emoji.text),
                y.appendChild(b);
            }
            var _ = c.createElement("div");
            (_.className = "tally-overlay ".concat(o.overlay)),
              (_.onclick = function () {
                x(e);
              });
            var w = o.loadingIndicator;
            (null != t && t.overlay) ||
              "modal" === (null == t ? void 0 : t.layout) ||
              (w = ""
                .concat(o.loadingIndicator, " ")
                .concat(o.loadingIndicatorNoOverlay));
            var O = c.createElement("div");
            (O.className = "tally-loading-indicator ".concat(w)),
              (O.innerHTML =
                '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>'),
              (null != t && t.overlay) ||
              "modal" === (null == t ? void 0 : t.layout)
                ? (_.appendChild(O),
                  _.appendChild(y),
                  c.body.appendChild(_),
                  (p = "hidden" === c.body.style.overflow) ||
                    ((c.body.style.overflow = "hidden"),
                    c.body.addEventListener("touchmove", v, !1)))
                : (c.body.appendChild(O), c.body.appendChild(y)),
              h &&
                ((h.dataset.tallyEmbedWidgetInitialized = "1"),
                iFrameResize(
                  {
                    checkOrigin: !1,
                    heightCalculationMethod: "taggedElement",
                    scrolling: !0,
                    onInit: function () {
                      O.remove(),
                        (y.style.opacity = "1"),
                        null != t && t.onOpen && t.onOpen();
                    },
                  },
                  h
                ));
          }
        },
        x = function (e) {
          var t,
            n = c.querySelector(".tally-form-".concat(e));
          if (n) {
            var o = n.querySelector("iframe");
            if (o) {
              n.remove(),
                null === (t = o.iFrameResizer) || void 0 === t || t.close(),
                c.querySelectorAll(".tally-overlay").forEach(function (e) {
                  e.remove(),
                    p ||
                      ((c.body.style.overflow = "visible"),
                      c.body.removeEventListener("touchmove", v, !1));
                }),
                c
                  .querySelectorAll(".tally-loading-indicator")
                  .forEach(function (e) {
                    e.remove();
                  });
              var i = m[e];
              null != i && i.onClose && i.onClose();
            }
          }
        },
        O = function (e, n) {
          var o, a, r, l, d;
          if (
            ((m[e] = n),
            !(
              (null != n && n.showOnce && null !== t(g(e, n))) ||
              (null != n && n.doNotShowAfterSubmit && null !== t(b(e, n)))
            ))
          )
            if (
              "time" !==
                (null == n || null === (o = n.open) || void 0 === o
                  ? void 0
                  : o.trigger) ||
              "number" !=
                typeof (null == n || null === (a = n.open) || void 0 === a
                  ? void 0
                  : a.ms)
            )
              if (
                "exit" !==
                (null == n || null === (r = n.open) || void 0 === r
                  ? void 0
                  : r.trigger)
              )
                if (
                  "scroll" !==
                    (null == n || null === (l = n.open) || void 0 === l
                      ? void 0
                      : l.trigger) ||
                  "number" !=
                    typeof (null == n || null === (d = n.open) || void 0 === d
                      ? void 0
                      : d.scrollPercent)
                )
                  w(e, n);
                else {
                  c.addEventListener("scroll", function t() {
                    var o =
                      (i.document.body.scrollHeight - i.innerHeight) *
                      (n.open.scrollPercent / 100);
                    c.documentElement.scrollTop >= o &&
                      (w(e, n), c.removeEventListener("scroll", t));
                  });
                }
              else {
                c.addEventListener("mouseout", function t(o) {
                  o.toElement ||
                    o.relatedTarget ||
                    (w(e, n), c.removeEventListener("mouseout", t));
                });
              }
            else
              setTimeout(function () {
                return w(e, n);
              }, n.open.ms);
        };
      if (!i.Tally) {
        var E = {};
        (E.openPopup = O),
          (E.closePopup = x),
          (E.loadEmbeds = y),
          (i.Tally = E);
      }
      (d = null !== (a = i.TallyConfig) && void 0 !== a ? a : {}),
        (s = d.formId),
        (u = d.popup),
        s && O(s, u),
        y(),
        _(),
        c.addEventListener("click", function (e) {
          var t = e.target.closest("[data-tally-open]");
          if (t) {
            e.preventDefault();
            var n = t.dataset,
              o = {};
            for (var a in ((o.layout = n.tallyLayout),
            (o.width =
              void 0 !== n.tallyWidth ? parseInt(n.tallyWidth, 10) : void 0),
            (o.alignLeft = n.tallyAlignLeft
              ? "1" === n.tallyAlignLeft
              : void 0),
            (o.hideTitle = n.tallyHideTitle
              ? "1" === n.tallyHideTitle
              : void 0),
            (o.overlay = n.tallyOverlay ? "1" === n.tallyOverlay : void 0),
            n.tallyEmojiText &&
              n.tallyEmojiAnimation &&
              (o.emoji = {
                text: n.tallyEmojiText,
                animation: n.tallyEmojiAnimation,
              }),
            (o.autoClose =
              void 0 !== n.tallyAutoClose
                ? parseInt(n.tallyAutoClose, 10)
                : void 0),
            (o.customFormUrl = n.tallyCustomFormUrl),
            n.tallyOnOpen &&
              "function" == typeof i[n.tallyOnOpen] &&
              (o.onOpen = i[n.tallyOnOpen]),
            n.tallyOnClose &&
              "function" == typeof i[n.tallyOnClose] &&
              (o.onClose = i[n.tallyOnClose]),
            n.tallyOnPageView &&
              "function" == typeof i[n.tallyOnPageView] &&
              (o.onPageView = i[n.tallyOnPageView]),
            n.tallyOnSubmit &&
              "function" == typeof i[n.tallyOnSubmit] &&
              (o.onSubmit = i[n.tallyOnSubmit]),
            n))
              a.startsWith("tally") ||
                (o.hiddenFields = r(
                  r({}, o.hiddenFields || {}),
                  {},
                  l({}, a, n[a])
                ));
            O(n.tallyOpen, o);
          } else {
            var d = e.target.closest("a");
            if (
              d &&
              d.href &&
              d.href.indexOf("#") < d.href.indexOf("tally-open")
            ) {
              e.preventDefault();
              var s = d.href.substring(d.href.indexOf("#") + 1),
                u = new URLSearchParams(s),
                c = {};
              u.forEach(function (e, t) {
                switch (t.replace("tally-", "")) {
                  case "layout":
                    c.layout = e;
                    break;
                  case "width":
                    c.width = parseInt(e, 10);
                    break;
                  case "align-left":
                    c.alignLeft = "1" === e || void 0;
                    break;
                  case "hide-title":
                    c.hideTitle = "1" === e || void 0;
                    break;
                  case "overlay":
                    c.overlay = "1" === e || void 0;
                    break;
                  case "emoji-text":
                    c.emoji = r(
                      r({}, c.emoji || {}),
                      {},
                      { text: e, animation: u.get("tally-emoji-animation") }
                    );
                    break;
                  case "auto-close":
                    c.autoClose = parseInt(e, 10);
                    break;
                  case "custom-form-url":
                    c.customFormUrl = e;
                    break;
                  case "on-open":
                    c.onOpen = "function" == typeof i[e] ? e : void 0;
                    break;
                  case "on-close":
                    c.onClose = "function" == typeof i[e] ? e : void 0;
                    break;
                  case "on-page-view":
                    c.onPageView = "function" == typeof i[e] ? e : void 0;
                    break;
                  case "on-submit":
                    c.onSubmit = "function" == typeof i[e] ? e : void 0;
                }
              }),
                u.forEach(function (e, t) {
                  -1 === t.indexOf("tally-") &&
                    (c.hiddenFields = r(
                      r({}, c.hiddenFields || {}),
                      {},
                      l({}, t, e)
                    ));
                }),
                O(u.get("tally-open"), c);
            }
          }
        });
    })(window);
})();
