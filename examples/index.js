import GithubBlogSdk from "../lib/GithubBlogSdk/index"

let sdk = GithubBlogSdk({ repo: "github-blog-sdk", onwer: "dezhiShen", tree: "master" })

sdk.loadSummary().then(data => {
    console.log(data)
})