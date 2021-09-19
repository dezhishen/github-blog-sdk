import fetch from 'axios'
import marked from 'marked'
import cheerio from 'cheerio'




let renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
    if (href.startsWith("http")) {
        return `<a href="${href}" target="_blank">${text}</a>`
    } else {
        return `<a href="#${href}" onclick="renderGithubBlogContent('${href}','${text}')">${text}</a>`
    }
}
/**
 * blog的sdk
 */
class GithubBlogSdk {
    blogOptions = {
        index: "./README.md",
        summary: "./SUMMARY.md",
        renderContent: (url, html, title) => {
            console.warn("请提供自定义方法")
        },
        renderSummary: (url, html) => {
            console.warn("请提供自定义方法")
        }
    }

    markedOptions = {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    }

    constructor(blogOptions, markedOptions) {
        if (blogOptions) {
            for (let key in blogOptions) {
                this.blogOptions[key] = blogOptions[key]
            }
        }
        if (markedOptions) {
            for (let key in markedOptions) {
                this.markedOptions[key] = markedOptions[key]
            }
        }
    }

    loadSummary = (url = this.blogOptions.summary) => {
        return marked2Html(url, this.markedOptions)
    }

    renderSummary = (url = this.blogOptions.summary) => {
        return this.loadSummary(url, this.markedOptions).then(text => {
            this.blogOptions.renderSUmmary(url, text)
        })
    }

    loadConntent = (url) => {
        return marked2Html(url, this.markedOptions)
    }

    renderContent = (url) => {
        return this.loadConntent(url).then(
            html => { this.blogOptions.renderContent(url, html) }
        )
    }

    loadIndex = (url = this.blogOptions.index) => {
        return marked2Html(url, this.markedOptions)
    }

    /**
     * 绑定方法
     */
    initSdk = () => {
        window.renderGithubBlogContent = (url, title) => {
            marked2Html(url, this.markedOptions).then(
                html => {
                    this.blogOptions.renderContent(url, html, title)
                }
            )
        }
    }
}

const marked2Html = function (url, options) {
    if (url) {
        return fetch(url).then(res => {
            return marked(res.data, options)
        })
    }
}

export default GithubBlogSdk
