"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.APIResult = exports.COMMON_ERRORS = void 0),
  (exports.COMMON_ERRORS = {
    invalidCookie: { errCode: 1e3, errMessage: "Invalid cookie" },
    invalidParam: { errCode: 1001, errMessage: "Invalid Param" },
    invalidUrl: { errCode: 1002, errMessage: "Invalid Url" },
    fetchUrlError: { errCode: 1002, errMessage: "Fetch url error" },
  });
var APIResult = (function () {
  function e(e, r, t) {
    (this.success = !0), (this.data = r), (this.success = e), (this.error = t);
  }
  return (
    (e.prototype.setData = function (e) {
      this.data = e;
    }),
    (e.prototype.setError = function (e) {
      this.error = e;
    }),
    e
  );
})();
exports.APIResult = APIResult;