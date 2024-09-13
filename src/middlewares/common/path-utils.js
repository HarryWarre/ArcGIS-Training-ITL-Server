"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (e, i, l, s) {
      return new (l = l || Promise)(function (n, t) {
        function a(e) {
          try {
            o(s.next(e));
          } catch (e) {
            t(e);
          }
        }
        function r(e) {
          try {
            o(s.throw(e));
          } catch (e) {
            t(e);
          }
        }
        function o(e) {
          var t;
          e.done
            ? n(e.value)
            : ((t = e.value) instanceof l
                ? t
                : new l(function (e) {
                    e(t);
                  })
              ).then(a, r);
        }
        o((s = s.apply(e, i || [])).next());
      });
    },
  __generator =
    (this && this.__generator) ||
    function (a, r) {
      var o,
        i,
        l,
        s = {
          label: 0,
          sent: function () {
            if (1 & l[0]) throw l[1];
            return l[1];
          },
          trys: [],
          ops: [],
        },
        c = { next: e(0), throw: e(1), return: e(2) };
      return (
        "function" == typeof Symbol &&
          (c[Symbol.iterator] = function () {
            return this;
          }),
        c
      );
      function e(n) {
        return function (e) {
          var t = [n, e];
          if (o) throw new TypeError("Generator is already executing.");
          for (; (s = c && t[(c = 0)] ? 0 : s); )
            try {
              if (
                ((o = 1),
                i &&
                  (l =
                    2 & t[0]
                      ? i.return
                      : t[0]
                      ? i.throw || ((l = i.return) && l.call(i), 0)
                      : i.next) &&
                  !(l = l.call(i, t[1])).done)
              )
                return l;
              switch (((i = 0), (t = l ? [2 & t[0], l.value] : t)[0])) {
                case 0:
                case 1:
                  l = t;
                  break;
                case 4:
                  return s.label++, { value: t[1], done: !1 };
                case 5:
                  s.label++, (i = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !(l = 0 < (l = s.trys).length && l[l.length - 1]) &&
                    (6 === t[0] || 2 === t[0])
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === t[0] && (!l || (t[1] > l[0] && t[1] < l[3])))
                    s.label = t[1];
                  else if (6 === t[0] && s.label < l[1])
                    (s.label = l[1]), (l = t);
                  else {
                    if (!(l && s.label < l[2])) {
                      l[2] && s.ops.pop(), s.trys.pop();
                      continue;
                    }
                    (s.label = l[2]), s.ops.push(t);
                  }
              }
              t = r.call(a, s);
            } catch (e) {
              (t = [6, e]), (i = 0);
            } finally {
              o = l = 0;
            }
          if (5 & t[0]) throw t[1];
          return { value: t[0] ? t[1] : void 0, done: !0 };
        };
      }
    },
  utils =
    (Object.defineProperty(exports, "__esModule", { value: !0 }),
    (exports.readAndreplaceContent =
      exports.fixPath =
      exports.isIndexPath =
        void 0),
    require("util")),
  fs = require("fs"),
  readFile = utils.promisify(fs.readFile);
function isIndexPath(e, t) {
  e = fixPath(e).substr(t.length);
  return (
    "" === e ||
    /(^index\.html)|((^[^\/]+\/)?page\/([^\/]+\/)?index\.html)|(^[^\/]+\/index\.html)|(\/$)/.test(
      e
    )
  );
}
function fixPath(e) {
  return /\/$/.test(e) ||
    /\.(js|jsx|ts|tsx|css|scss|json|html|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|map|ico)$/.test(
      e
    )
    ? e
    : e + "/";
}
(exports.isIndexPath = isIndexPath), (exports.fixPath = fixPath);
var contents = {};
function readAndreplaceContent(n) {
  return __awaiter(this, void 0, void 0, function () {
    var t;
    return __generator(this, function (e) {
      switch (e.label) {
        case 0:
          return !global.isDevEdition && contents[n]
            ? [2, contents[n]]
            : [4, readFile(n, "utf-8")];
        case 1:
          return (
            (t = e.sent()),
            global.hostEnv &&
              (t = t.replace(
                '"hostEnv": "prod"',
                '"hostEnv": "'.concat(global.hostEnv, '"')
              )),
            global.isDevEdition &&
              (t = t.replace('"isDevEdition": false', '"isDevEdition": true')),
            "/" !== global.mountPath &&
              (t = (t = (t = (t = (t = t.replace(
                '<base href="/builder/"/>',
                '<base href="'.concat(global.mountPath, 'builder/"/>')
              )).replace(
                '<base href="/experience/"/>',
                '<base href="'.concat(global.mountPath, 'experience/"/>')
              )).replace(
                '<base href="/template/"/>',
                '<base href="'.concat(global.mountPath, 'template/"/>')
              )).replace(
                '<base href="/"/>',
                '<base href="'.concat(global.mountPath, '/"/>')
              )).replace(
                '"mountPath": "/"',
                '"mountPath": "'.concat(global.mountPath, '"')
              )),
            [2, (contents[n] = t)]
          );
      }
    });
  });
}
exports.readAndreplaceContent = readAndreplaceContent;
