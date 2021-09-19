"use strict";

var _index = require("../lib/GithubBlogSdk/index");

var sdk = (0, _index.GithubBlogSdk)({
    repo: "github-blog-sdk",
    onwer: "dezhiShen",
    tree: "master"
});
sdk.loadSummary().then(function (data) {
    console.log(data);
});
