const azureStorage = require('azure-storage')
const connectionString = require('../globalConfig/globalConfig')['AZURE_IMAGE']
const blobService = azureStorage.createBlobService(connectionString)
const path=require('path')
const queue=require('../queue/queue')


module.exports = {
    uploadImg,
    createContainer
}


async function uploadImg(id, imgArr) {
    let urlArr = []
    
    for (const file of imgArr) {

        // console.log(file)
        let filePath = path.resolve(file['path'])
        // console.log("Filepath", filePath)
        let filename = path.basename(filePath)
        // console.log("filename", filename)
        await blobService.createBlockBlobFromLocalFile(id, filename, filePath, err => {

            if (err) {
                // console.log("error", err)
                return err;
            }

        });
        urlArr.push(blobService.getUrl(id, filename))
        // console.log("urlA", urlArr)
        if (imgArr.length === urlArr.length) {
            // console.log("urlArr", urlArr, urlArr.length)
            return urlArr
        }
    }
}

async function createContainer(containerName) {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if (err) {
                reject(err);
            } else {
                queue.addToQueue(containerName)
                resolve({ message: `Container '${containerName}' created` });
            }
        });
    });
};



