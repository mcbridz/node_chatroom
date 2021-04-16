const fs = require('fs')
function addMessageTo(filename, msgObj) {
    let pathandFile = `/messages/${filename}`
    if (!fs.existsSync(pathandFile)) {
        let firstMessage = { msgObj }
        let date = new Date()
        let newfilename = date.getMonth + date.getDay + date.getFullYear
        fs.appendFile('/message/' + newfilename.toString() + '.json', JSON.stringify(firstMessage), (err) => {
            if (err) throw err
            console.log(`File created at ${newfilename}`)
        })
    } else {
        fs.readFile(pathandFile, (err, data) => {
            let messages = JSON.parse(data)
            messages.push(msgObj)
            fs.writeFile(pathandFile, JSON.stringify(messages))
        })
    }
}
module.exports = { addMessageTo }