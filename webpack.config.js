let path = require('path')
let webpack = require('webpack')
module.exports = {
    mode: 'production',
    entry: {
        bundle: __dirname + '/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    }
}