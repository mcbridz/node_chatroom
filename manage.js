const http = require('http')
const port = 5000
const addMessageTo = require("./utils/jsonManagement")
http.createServer((req, res) => {
    let path = new URL(`http://localhost:${port}${req.url}`)
    console.log(path)
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
        // console.log(body)
    })
    req.on('end', () => {
        console.log(body)
        if (req.method === 'POST') {
            console.log('POST')
            if (req.pathname === '/messages') {
                console.log('/messages')
                // console.log(body)
                let date = new Date()
                let filename = date.getMonth + date.getDay + date.getFullYear
            }
        }
    })
}).listen(port, () => {
    console.log(`Listening on port: ${port}`)
})