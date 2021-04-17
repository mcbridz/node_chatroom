/////////////////////////////////////////////////
//            Testing Command Examples         //
// curl http://localhost:5000/messages         //
//          - gets today's messages            //
// curl -H "Content-Type: application/json"    //
// http://localhost:5000/messages -X POST -d   //
//  "{\"user\": \"testaccount\",\"message\":   //
//  \"test-test-one-two-three...\"}"           //
//          - adds new message by JSON-array   //
/////////////////////////////////////////////////

const http = require('http')
const port = 5000
const jsonManagement = require("./utils/jsonManagement")
http.createServer((req, res) => {
    let path = new URL(`http://localhost:${port}${req.url}`)
    // console.log(path)
    let body = []
    req.on('data', chunk => {
        // console.log('ADDING CHUNK')
        body.push(chunk)
        // console.log(body)
        // console.log(`Currently ${body.length} chunks accumulated.`)
    })
    // console.log(body)
    req.on('end', () => {
        let date = new Date()
        let filename = date.getMonth().toString() + date.getDay().toString() + date.getFullYear().toString()
        // console.log('END TRIGGERED')
        // body = Buffer.concat(body).toString()
        // console.log(body)
        if (req.method === 'POST') {
            // console.log('POST')
            // console.log(path.pathname)
            if (path.pathname === '/messages') {
                // console.log('/messages')
                msgObj = JSON.parse(body)
                // console.log(msgObj)
                // console.log(filename)
                jsonManagement.addMessageTo(filename, msgObj)
                res.end(`Added message object to ${filename}.json`)
            }
        }
        else if (req.method === 'GET') {
            if (path.pathname === '/messages') {
                jsonManagement.getMessagesJSON(filename, (data) => {
                    // console.log('Sending the following, ' + typeof (data) + ' with the contents:')
                    // console.log(data)
                    res.end(data)
                })
            }
        }
        else res.end('No processing of request occurred.')
    })
}).listen(port, () => {
    console.log(`Listening on port: ${port}`)
})