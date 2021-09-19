import fetch from 'axios'
import marked from 'marked'

/**
 * blog的sdk
 */
class GithubBlogSdk {
    blogOptions = {
        index: "./README.md",
        repo: "",
        owner: "",
        tree: ""

    }

    markedOptions = {
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

    loadSummary = () => {
        return fetch(
            `https://api.github.com/repos/${this.blogOptions.owner}`
            + `/${this.blogOptions.repo}/git/trees/${this.blogOptions.tree}?recursive=1`)
            .then(res => {
                return res.data
            })
    }

    loadConntent = (url) => {
        return marked2Html(url, this.markedOptions)
    }

    loadIndex = (url = this.blogOptions.index) => {
        return marked2Html(url, this.markedOptions)
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
