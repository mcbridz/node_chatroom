const http = require('http')
const port = 5000
const jsonManagement = require("./utils/jsonManagement")
http.createServer((req, res) => {
    let path = new URL(`http://localhost:${port}${req.url}`)
    console.log(path)
    let body = []
    req.on('data', chunk => {
        // console.log('ADDING CHUNK')
        body.push(chunk)
        // console.log(body)
        // console.log(`Currently ${body.length} chunks accumulated.`)
    })
    // console.log(body)
    req.on('end', () => {
        console.log('END TRIGGERED')
        // body = Buffer.concat(body).toString()
        console.log(body)
        if (req.method === 'POST') {
            // console.log('POST')
            console.log(path.pathname)
            if (path.pathname === '/messages') {
                // console.log('/messages')
                msgObj = JSON.parse(body)
                console.log(msgObj)
                let date = new Date()
                let filename = date.getMonth().toString() + date.getDay().toString() + date.getFullYear().toString()
                console.log(filename)
                jsonManagement.addMessageTo(filename, msgObj)
                res.end(`Added message object to ${filename}.json`)
            }
        }
        else res.end('No processing of request occurred.')
    })
}).listen(port, () => {
    console.log(`Listening on port: ${port}`)
})