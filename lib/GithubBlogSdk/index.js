"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GithubBlogSdk = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _marked = _interopRequireDefault(require("marked"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * blog的sdk
 */
var GithubBlogSdk = function GithubBlogSdk(blogOptions, markedOptions) {
  var _this = this;

  _classCallCheck(this, GithubBlogSdk);

  this.blogOptions = {
    index: "./README.md",
    repo: "",
    owner: "",
    tree: ""
  };
  this.markedOptions = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };

  this.loadSummary = function () {
    return (0, _nodeFetch["default"])("https://api.github.com/repos/".concat(_this.blogOptions.owner) + "/".concat(_this.blogOptions.repo, "/git/trees/").concat(_this.blogOptions.tree)).then(function (res) {
      return res.json();
    });
  };

  this.loadConntent = function (url) {
    return marked2Html(url, _this.markedOptions);
  };

  this.loadIndex = function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.blogOptions.index;
    return marked2Html(url, _this.markedOptions);
  };

  if (blogOptions) {
    for (var key in blogOptions) {
      this.blogOptions[key] = blogOptions[key];
    }
  }

  if (markedOptions) {
    for (var _key in markedOptions) {
      this.markedOptions[_key] = markedOptions[_key];
    }
  }
};

exports.GithubBlogSdk = GithubBlogSdk;

var marked2Html = function marked2Html(url, options) {
  if (url) {
    return new Promise();
  }

  (0, _nodeFetch["default"])(url).then(function (res) {
    return (0, _marked["default"])(res.text(), options);
  });
};