const config = require('config.json')
const db = require('../_helpers/db')
const path = require('path')
const Job = db.Job;



module.exports = {
    saveName,
    getAll,
    update,
    deleteJob,
    updateImgUrl,
    findJob
}

async function saveName(job) {
    // console.log(typeof (project))
    return new Promise((resolve, reject) => {
        Job.create({ name: job['jobName'] }, async (error, result) => {
            if (result) {
                resolve(result['_id'])
            }

        }), error => {
            reject(error)
        }
    })

}

async function getAll(page, value, user_id) {
    var final, arr;
    // console.log('value,page', value, page)
    let result = await Job.find({ user_id: user_id })
    let start = (page - 1) * 6
    let end = start + 6
    if (value != 'null') {
        result = await result.filter(element => {
            return element['name'].toLowerCase().search(value.toLowerCase()) > -1
        })
        arr = result.slice(start, end)
    } else {
        // console.log("in else")
        arr = result.slice(start, end)
    }
    let obj = { len: result.length, arr }
    return JSON.stringify(obj)

}

async function update(id, body) {
    let result = await Job.findOneAndUpdate({ _id: id }, body, (error, data) => {
        if (error) throw error
        // console.log("data", data)
    })
    // console.log("body", result)
    return JSON.stringify(result)
}

async function deleteJob(id) {
    let result = await Job.findOneAndDelete({ _id: id }, (error, result) => {
        if (error) throw error
        // console.log("ResultIn", result)

    })

    // console.log("Result", result)
    return JSON.stringify(result)
}


async function findJob(id) {
    let result = await Job.findOne({ _id: id })
    // console.log("one_result", result)
    let obj = { id: result }
    return JSON.stringify(result)
}

async function updateImgUrl(id, urls) {
    let result = await Job.findById(id)
    result['images'] = urls;
    let finalResult = await Job.findOneAndUpdate({ _id: id }, result, (error, data) => {
        if (error) throw error
        console.log("final data", data)
    })
    console.log("final result",finalResult)
    return finalResult;
}