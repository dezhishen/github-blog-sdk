# github-blog-sdk
使用`nodejs`,`marked`,`github-nodejs-sdk`快速构建blog

## 引入
cdn
```
<script src="https://cdn.jsdelivr.net/gh/dezhiShen/github-blog-sdk@master/dist/index.js"></script>
```

## 使用
```
let sdk = new GithubBlogSdk({
    renderContent: (url, html, title) => {
        this.renderContent(url, html, title)
    },
    renderSummary: (url, html) => {
        this.renderSummary(url, html)
    }

})
sdk.initSdk()

```
## 示例
### [examples](./examples/index.html)
预览: [https://dezhishen.github.io/github-blog-sdk/examples/index.html](https://dezhishen.github.io/github-blog-sdk/examples/index.html)