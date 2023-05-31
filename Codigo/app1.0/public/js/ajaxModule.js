
function sendData(data, route) {
    return fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log('Data sent successfully!');
        return res.json();
    })
    .catch(err => {
        console.error('Error sending data:', err);
    });
}

// Exporting modularized functions;
module.exports = {
    sendData
};