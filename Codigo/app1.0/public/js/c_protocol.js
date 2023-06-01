// Variáveis globais;
    //IDs
    let id_protocol;

    // Variáveis de contagem;
    let sampleCount = 0;

    // Variáveis de elementos criados dinâmicamente;
    let inputNameSample;
    let inputDescriptionSample;
//

function sendDataProtocol(callback) {
    const form = document.getElementById("formProtocol");

    const nameProtocolInput = document.getElementById('name_protocol');
    const objectiveProtocolInput = document.getElementById('objective_protocol');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameProtocolValue = nameProtocolInput.value;
        const objectiveProtocolValue = objectiveProtocolInput.value;

        $.ajax({
            url: '/create-protocols',
            method: 'POST',
            data: {
                name_protocol: nameProtocolValue,
                objective_protocol: objectiveProtocolValue
            },
            success: (res) => {
                console.log("Formulário enviado com sucesso!");

                // Aqui vai o `getIdProtocol()`;
                callback()
            },
            error: () => {
                console.log("Pra variar, deu algo errado...", error)
            }
        });
    });
};

function getIdProtocol() {
    $.ajax({
        url: '/read_id-protocols',
        method: 'GET',
        dataType: 'json'
    }).done((res) => {
        id_protocol = res.id_protocol;

        console.log("ID do último protocolo criado: ", id_protocol);

        // Aqui vai o sendDataSample() como callback
        sendDataSample(id_protocol);
    })
};

function sendDataSample(id) {
    let dados = {
        id_protocol: id,
        name_sample: inputNameSample.value,
        description_sample: inputDescriptionSample.value
    };

    $.ajax({
        url: '/create-samples',
        method: 'POST',
        data: dados,
        dataType: 'json'
    }).done((res) => {
        console.log(res);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    sendDataProtocol(getIdProtocol);
});

// --> dynamicHTMLcreation <-- //

function createSamples() {
    sampleCount++;

    const samplesContainer = document.querySelector(".samples-container"); // Is refering the <div class="samples-container"></div>

    const divSampleContainer = document.createElement("div");
    divSampleContainer.classList.add("sample-container");

    const sampleFieldSet = document.createElement("fieldset");
    sampleFieldSet.setAttribute('id', 'sampleFieldset');
    sampleFieldSet.style.border = '1px solid black';

    // Creating sampleFieldSet elements
        const sampleLegend = document.createElement('legend');
        sampleLegend.textContent = `Sample ${sampleCount}`;

        inputNameSample = document.createElement('input');
        inputNameSample.type = "text";
        inputNameSample.placeholder = "Enter sample name";

        inputDescriptionSample = document.createElement("input"); // ...
        inputDescriptionSample.type = "text";
        inputDescriptionSample.placeholder = "Enter sample description"

        const createNewSampleButton = document.createElement("button"); // ...
        createNewSampleButton.type = "button";
        // createNewSampleButton.onclick = createNewStep;
        createNewSampleButton.textContent = "Add step";
    //

    sampleFieldSet.appendChild(sampleLegend);
    sampleFieldSet.appendChild(inputNameSample);
    sampleFieldSet.appendChild(inputDescriptionSample);
    sampleFieldSet.appendChild(createNewSampleButton);

    divSampleContainer.appendChild(sampleFieldSet);

    // FIELD - Just to separete the things
        const divStepContainer = document.createElement("div");
        divStepContainer.className = "steps-container";
        divSampleContainer.appendChild(divStepContainer);
    //

    // running
    samplesContainer.appendChild(divSampleContainer); // ...
};