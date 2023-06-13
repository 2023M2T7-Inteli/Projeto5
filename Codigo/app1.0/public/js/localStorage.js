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
        } else {
            const inputObj = {
                type: input.type,
                value: input.value
            };
            protocolInfo.input.push(inputObj); 
        }
    });
    
    console.log(protocolInfo);
    localStorage.setItem('protocolInfo', JSON.stringify(protocolInfo));
};
