const fs = require('fs')
function addMessageTo(filename, msgObj) {
    let pathandFile = __dirname + `/../messages/${filename}.json`
    if (!fs.existsSync(pathandFile)) {
        let firstMessage = { msgObj }
        let date = new Date()
        let newfilename = date.getMonth().toString() + date.getDay().toString() + date.getFullYear().toString()
        fs.writeFile(__dirname + '/../messages/' + newfilename + '.json', JSON.stringify([firstMessage]), (err) => {
            if (err) {
                console.log(err)
                throw err
            }
            console.log(`File created at ${newfilename}.json`)
        })
    } else {
        fs.readFile(pathandFile, (err, data) => {
            let messages = JSON.parse(data)
            messages.push(msgObj)
            fs.writeFile(pathandFile, JSON.stringify(messages), (err) => {
                if (err) throw err
            })
        })
    }
}//C:\Users\mcbri\Documents\code\node_chatroom\messages
function getMessagesJSON(filename) {
    let pathandFile = __dirname + `/../messages/${filename}.json`
    if (!fs.existsSync(pathandFile)) {
        throw `Error 404: File ${filename} does not exist`
    } else {
        fs.readFile(pathandFile, 'utf-8', (err, data) => {
            if (err) throw err
            console.log(`read file type: ${typeof (data)}`)
            return data
        })
    }
}
module.exports = { addMessageTo, getMessagesJSON }