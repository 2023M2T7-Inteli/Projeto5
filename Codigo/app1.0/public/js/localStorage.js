document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    const submitButton = document.getElementById('send-button');
    submitButton.addEventListener('click', () => {
        getFieldsAnswers();
    });
});

function getFieldsAnswers() {
    const fieldsInputs = document.querySelectorAll('input');
    const protocolInfo = {
        input: []
    };
    
    fieldsInputs.forEach((input) => {
        if (input.type === 'file') {
            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    const inputObj = {
                        type: 'file',
                        value: base64Image
                    };
                    protocolInfo.input.push(inputObj);
                }
                reader.readAsDataURL(input.files[0]);
            }
        } else if(input.type === 'radio') {
            // take the checked radio button
            if (input.checked) {
                const inputObj = {
                    type: input.type,
                    value: input.value,
                    id: input.id
                };
                protocolInfo.input.push(inputObj); 
            }
        } else {
            const inputObj = {
                type: input.type,
                value: input.value,
                id: input.id
            };
            protocolInfo.input.push(inputObj); 
        }
    });
    
    console.log(protocolInfo);
    localStorage.setItem('protocolInfo', JSON.stringify(protocolInfo));

    sendAnswers()
};

function sendAnswers() {
    // take inputs
    let protocolInfo = JSON.parse(localStorage.getItem("protocolInfo"));
    // console.log(inputs);
    let id_protocolElement = document.getElementById('id-protocolo');
    let id_protocol = id_protocolElement.textContent;

    for (let i = 0; i < protocolInfo.input.length; i++) {
        let id_field = protocolInfo.input[i].id;
        let answer = protocolInfo.input[i].value;

        let isConnected = fetch('/isConnected');
        isConnected.then((response) => {
        if (response.ok) {
            $.post('/updateFields', {answer:answer,id_field:id_field}, (res) => {
                console.log("Status" + res);
            }, 'json');
            $.post('/updateStatus', {id_protocol: id_protocol}, (res) => {
                console.log("Status" + res);
            }, 'json');
        } else {
            console.log("Sem conexão, irmão");
        }
        }).catch((error) => {
            console.log("Error checking connection: " + error);
        });
    }
    alert('Form response sent successfully!');
    window.location.href = '/researcherProtocolsFinished';
};
