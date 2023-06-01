// Variáveis globais;
    //IDs
    let id_protocol;

    // Variáveis de contagem;
    let sampleCount = 0;

    // Variáveis de elementos criados dinâmicamente;
    let inputNameSample;
    let inputDescriptionSample;
//

function sendDataProtocol() {
    const nameProtocolInput = document.getElementById('name_protocol');
    const objectiveProtocolInput = document.getElementById('objective_protocol');

    const nameProtocolValue = nameProtocolInput.value;
    const objectiveProtocolValue = objectiveProtocolInput.value;

    data = {
        name_protocol: nameProtocolValue,
        objective_protocol: objectiveProtocolValue
    };

    $.post('/create-protocols', data, getIdProtocol, "text");
};

function getIdProtocol() {
    $.get('/read_id-protocols', (res) => {
        id_protocol = res.id_protocol;
        console.log("ID do último protocolo criado: ", id_protocol);
    }).done(() => {
        sendDataSample(id_protocol)
    });
};

function sendDataSample(id) {
    let data = {
        id_protocol: id,
        name_sample: inputNameSample.value,
        description_sample: inputDescriptionSample.value
    };

    $.post('/create-samples', data, () => {
        console.log("Aqui está o res da criação de sample: " + res);
    }, "text");
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        sendDataProtocol();
    });
});

// --> dynamicHTMLcreation <-- //

function createSamples() {
    sampleCount++;

    const samplesContainer = document.querySelector(".samples-container");

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

        inputDescriptionSample = document.createElement("input");
        inputDescriptionSample.type = "text";
        inputDescriptionSample.placeholder = "Enter sample description"

        const createNewSampleButton = document.createElement("button");
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
    samplesContainer.appendChild(divSampleContainer);
};