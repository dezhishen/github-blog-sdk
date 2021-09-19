import fetch from 'axios'
import marked from 'marked'
import cheerio from 'cheerio'



this.render.link = (href, title, text) => {
    if (href.startsWith("http")) {
        return `<a href="${href}" target="_blank">${text}</a>`
    } else {
        return `<a href="#${href}" onclick="renderGithubBlogContent('${href}')">${text}</a>`
    }
}
/**
 * blog的sdk
 */
class GithubBlogSdk {
    blogOptions = {
        contentEl: "#github-blog-content",
        summaryEl: "#github-blog-summary",
        index: "./README.md",
        repo: "",
        owner: "",
        tree: "",
        summary: "./SUMMARY.md"
    }

    markedOptions = {
        render: this.render,
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
        return fetch(
            `${url}`
        ).then(res => {
            return res.data
        })
    }
    loadConntent = (url) => {
        marked2Html(url, this.markedOptions)
    }

    loadIndex = (url = this.blogOptions.index) => {
        return marked2Html(url, this.markedOptions)
    }

    renderSummary = function () {
        this.loadSummary().then(res => {
            let $ = cheerio.load(window.document)
            $(blogOptions.summaryEl).innerHTML = res
        })
    }
    renderConntent = function (url) {
        this.loadConntent(url).then(res => {
            let $ = cheerio.load(window.document)
            $(blogOptions.contentEl).innerHTML = res
        })
    }

    init = function () {
        window.renderGithubBlogContent = (url) => {
            this.loadConntent(url)
        }
    }

    render = function () {
        this.loadSummary()
        if (window.href.split("#")[1]) {
            this.renderConntent(window.href.split("#")[1])
        } else {
            this.renderConntent(this.blogOptions.index)
        }
    }
}


const marked2Html = function (url, options) {
    if (url) {
        fetch(url).then(res => {
            return marked(res.data, options)
        })
    }
}

export default GithubBlogSdk
