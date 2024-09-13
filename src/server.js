"use strict";
var isDevEdition,
  mountPath,
  port,
  httpsPort,
  devRouter,
  getStaticServeMiddleWares,
  certFolder,
  httpsServer,
  __awaiter =
    (this && this.__awaiter) ||
    function (e, s, a, c) {
      return new (a = a || Promise)(function (r, t) {
        function o(e) {
          try {
            i(c.next(e));
          } catch (e) {
            t(e);
          }
        }
        function n(e) {
          try {
            i(c.throw(e));
          } catch (e) {
            t(e);
          }
        }
        function i(e) {
          var t;
          e.done
            ? r(e.value)
            : ((t = e.value) instanceof a
                ? t
                : new a(function (e) {
                    e(t);
                  })
              ).then(o, n);
        }
        i((c = c.apply(e, s || [])).next());
      });
    },
  __generator =
    (this && this.__generator) ||
    function (o, n) {
      var i,
        s,
        a,
        c = {
          label: 0,
          sent: function () {
            if (1 & a[0]) throw a[1];
            return a[1];
          },
          trys: [],
          ops: [],
        },
        p = { next: e(0), throw: e(1), return: e(2) };
      return (
        "function" == typeof Symbol &&
          (p[Symbol.iterator] = function () {
            return this;
          }),
        p
      );
      function e(r) {
        return function (e) {
          var t = [r, e];
          if (i) throw new TypeError("Generator is already executing.");
          for (; (c = p && t[(p = 0)] ? 0 : c); )
            try {
              if (
                ((i = 1),
                s &&
                  (a =
                    2 & t[0]
                      ? s.return
                      : t[0]
                      ? s.throw || ((a = s.return) && a.call(s), 0)
                      : s.next) &&
                  !(a = a.call(s, t[1])).done)
              )
                return a;
              switch (((s = 0), (t = a ? [2 & t[0], a.value] : t)[0])) {
                case 0:
                case 1:
                  a = t;
                  break;
                case 4:
                  return c.label++, { value: t[1], done: !1 };
                case 5:
                  c.label++, (s = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = c.ops.pop()), c.trys.pop();
                  continue;
                default:
                  if (
                    !(a = 0 < (a = c.trys).length && a[a.length - 1]) &&
                    (6 === t[0] || 2 === t[0])
                  ) {
                    c = 0;
                    continue;
                  }
                  if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3])))
                    c.label = t[1];
                  else if (6 === t[0] && c.label < a[1])
                    (c.label = a[1]), (a = t);
                  else {
                    if (!(a && c.label < a[2])) {
                      a[2] && c.ops.pop(), c.trys.pop();
                      continue;
                    }
                    (c.label = a[2]), c.ops.push(t);
                  }
              }
              t = n.call(o, c);
            } catch (e) {
              (t = [6, e]), (s = 0);
            } finally {
              i = a = 0;
            }
          if (5 & t[0]) throw t[1];
          return { value: t[0] ? t[1] : void 0, done: !0 };
        };
      }
    },
  Koa =
    (Object.defineProperty(exports, "__esModule", { value: !0 }),
    require("koa")),
  compress = require("koa-compress"),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  path = require("path"),
  commander_1 = require("commander"),
  common_1 = require("./middlewares/common"),
  app = ((process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"), new Koa()),
  program = new commander_1.Command(),
  commanderOption =
    (program
      .version("0.0.1")
      .option("--disable_gzip", "Disable gzip")
      .option("--enable_file_cache", "Enable file cache in server")
      .option("-p, --port <port>", "Http port")
      .option("--https_port <port>", "Https port")
      .option("--path <path>", "Mount path")
      .option("-h, --host_env <hostEnv>", "Host env")
      .option("-d, --dev_edition", "Is Dev Edition")
      .option("--http_only", "Disable https")
      .option(
        "-c, --cert_folder <folder>",
        "Folder that stores the certificate"
      )
      .option("--host_static_file", "Host static files")
      .parse(process.argv),
    program.opts()),
  httpServer =
    ((global.commanderOption = commanderOption),
    init(),
    app.use(handleProtocol).use(supportCORS),
    commanderOption.disable_gzip ||
      app.use(
        compress({
          filter: function (e) {
            return /(text)|(application\/javascript)|(application\/json)/i.test(
              e
            );
          },
          threshold: 2048,
          gzip: { flush: require("zlib").constants.Z_SYNC_FLUSH },
          deflate: { flush: require("zlib").constants.Z_SYNC_FLUSH },
          br: !1,
        })
      ),
    app
      .use(common_1.bodyParser)
      .use(common_1.commonRouter.routes())
      .use(common_1.commonRouter.allowedMethods()),
    isDevEdition
      ? ((devRouter = require("./middlewares/dev").devRouter),
        (getStaticServeMiddleWares =
          require("./middlewares/static-server").getStaticServeMiddleWares),
        app.use(devRouter.routes()).use(devRouter.allowedMethods()),
        getStaticServeMiddleWares().forEach(function (e) {
          app.use(e);
        }))
      : commanderOption.host_static_file &&
        (getStaticServeMiddleWares =
          require("./middlewares/static-server").getStaticServeMiddleWares)().forEach(
          function (e) {
            app.use(e);
          }
        ),
    app.on("error", function (e, t) {
      "ECONNRESET" !== e.code &&
        "ECONNABORTED" !== e.code &&
        console.log("server error", e.message);
    }),
    http.createServer(app.callback()).listen(port, function () {
      console.log("Http server running on port", port);
    }));
function init() {
  var e = commanderOption.host_env || process.env.EXB_HOST_ENV;
  (global.hostEnv = e || "prod"),
    (isDevEdition = commanderOption.dev_edition),
    commanderOption.dev_edition ||
      ((e = JSON.parse(fs.readFileSync(__dirname + "/setting.json", "utf8"))),
      (isDevEdition = e.isDevEdition)),
    (global.isDevEdition = isDevEdition),
    (mountPath = commanderOption.path || process.env.EXB_MOUNT_PATH)
      ? /\/$/.test(mountPath) || (mountPath += "/")
      : (mountPath = "/"),
    (global.mountPath = mountPath);
  (port = commanderOption.port || process.env.EXB_HTTP_PORT || 3e3),
    (httpsPort =
      commanderOption.https_port || process.env.EXB_HTTPS_PORT || 3001);
}
function handleConnectError(e) {
  e &&
    (e.setTimeout(12e4),
    e.on("connection", function (t) {
      t.on("error", function (e) {
        t.destroy();
      });
    }));
}
function handleProtocol(t, r) {
  var o;
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (e) {
      switch (e.label) {
        case 0:
          return commanderOption.http_only ? [4, r()] : [3, 2];
        case 1:
          return e.sent(), [2];
        case 2:
          return "http" !== t.protocol
            ? [3, 3]
            : ((t.URL.protocol = "https"),
              (t.URL.port = httpsPort + ""),
              null != (o = null == t ? void 0 : t.URL) &&
                o.toString() &&
                t.redirect(
                  null == (o = null == t ? void 0 : t.URL)
                    ? void 0
                    : o.toString()
                ),
              [3, 5]);
        case 3:
          return [4, r()];
        case 4:
          e.sent(), (e.label = 5);
        case 5:
          return [2];
      }
    });
  });
}
function supportCORS(t, r) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (e) {
      switch (e.label) {
        case 0:
          return (
            t.res.setHeader("Access-Control-Allow-Origin", "*"),
            t.res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            ),
            t.res.setHeader("Access-Control-Allow-Headers", "Content-Type"),
            t.res.setHeader("Referrer-Policy", "no-referrer-when-downgrade"),
            [4, r()]
          );
        case 1:
          return e.sent(), [2];
      }
    });
  });
}
handleConnectError(httpServer),
  commanderOption.http_only ||
    ((certFolder =
      commanderOption.cert_folder || path.join(__dirname, "../cert")),
    fs.existsSync(certFolder) ||
      (console.error("Certificate folder does not exist."), process.exit(0)),
    (fs.existsSync(path.join(certFolder, "server.key")) &&
      fs.existsSync(path.join(certFolder, "server.cert"))) ||
      (console.error("Does not find certificate."), process.exit(0)),
    handleConnectError(
      (httpsServer = https
        .createServer(
          {
            key: fs.readFileSync(path.join(certFolder, "server.key"), "utf8"),
            cert: fs.readFileSync(path.join(certFolder, "server.cert"), "utf8"),
          },
          app.callback()
        )
        .listen(httpsPort, function () {
          return console.log("Https server running on port", httpsPort);
        }))
    ));
