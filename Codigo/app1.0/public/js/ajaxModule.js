function getProtocolData(inputName, inputDesc) {
    let protocolData = {
        name_sample: inputName,
        description_sample: inputDesc
    }
    return protocolData
};

function readIdProtocols() {
    $.ajax({
        url: '/read_id-protocols',
        method: 'GET',
        dataType: 'json'
    }).done((res) => {
        const id_protocol = res.id_protocol;
        protocolData.id_protocol = id_protocol;
        createSamples()
    });
};

function createSamples() {
    $.ajax({
        url: '/create-samples',
        method: 'POST',
        data: protocolData, 
        dataType: 'json'
    })
}

// Exporting modularized functions;
module.exports = {
    read_id_protocols
};