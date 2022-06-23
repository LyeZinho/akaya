//Endpoint https://api.qrserver.com/v1/create-qr-code/?data=<data>&size=<size>


//Just create a url and return it
function createQrCode(data, size = "150x150") {
    let url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + data + '&size=' + size
    return url;
}


module.exports = {
    createQrCode
}