// Variáveis globais;
    //IDs
    let id_protocol;
    let id_sample;

    // Variáveis de contagem;
    let sampleCount = 0;
    let stepCount = 0;

    // Variáveis de elementos criados dinâmicamente;
    let inputNameSample;
    let inputDescriptionSample;

    // Arrays para organizar vetores;
    let arraySamples;

    // Arrays para guardar os IDs de cada vetor;
    let arrayIDSamples = [];
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
        getNamesAndDescsSamples()
    });
};

function getNamesAndDescsSamples() {
    arraySamples = [];
    const sampleContainers = document.querySelectorAll(".sample-container");

    sampleContainers.forEach((container) => {
        const sample = {
            name_sample: "",
            description_sample: "",
        };

        const inputName = container.querySelector("input[type='text'][id^='nameToFunc']");
        if (inputName) {
            sample.name_sample = inputName.value;
        };

        const inputDescription = container.querySelector("input[type='text'][id^='descToFunc']");
        if (inputDescription) {
            sample.description_sample = inputDescription.value;
        };

        arraySamples.push(sample);
    });

    console.log(arraySamples);

    arraySamples.forEach((sample) => {
        sendDataSample(id_protocol, sample);
    });
};

function sendDataSample(id, sample, callback) {
    let data = {
        id_protocol: id,
        name_sample: sample.name_sample,
        description_sample: sample.description_sample
    };

    $.post('/create-samples', data, (res) => {
        id_sample = res.id_sample;
        console.log("Aqui está o res da criação de sample: " + id_sample);
    }, "json").done(() => {
        getIdSample(id_sample);
    }, "json");
};

function getIdSample(id_sample) {
    arrayIDSamples.push(id_sample)
    console.log("Lista de IDs das samples criadas: ", arrayIDSamples);
};

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
        inputNameSample.id = "nameToFunc" + sampleCount;
        inputNameSample.type = "text";
        inputNameSample.placeholder = "Enter sample name";

        inputDescriptionSample = document.createElement("input");
        inputDescriptionSample.id = "descToFunc" + sampleCount;
        inputDescriptionSample.type = "text";
        inputDescriptionSample.placeholder = "Enter sample description"

        const createNewSampleButton = document.createElement("button");
        createNewSampleButton.type = "button";
        createNewSampleButton.onclick = createNewStep;
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

function createNewStep() {
    stepCount++;

    const stepsContainer = this.closest(".sample-container").querySelector(".steps-container");

    const divStepContainer = document.createElement("div");
    divStepContainer.classList.add("step-container");

    const stepFieldSet = document.createElement("fieldset");
    stepFieldSet.setAttribute('id', 'stepFieldset');
    stepFieldSet.style.border = '1px solid black';

    //Creating stepFieldSet elements
        const stepLegend = document.createElement('legend');
        stepLegend.textContent = `Step ${stepCount}`;

        const inputNameStep = document.createElement('input');
        inputNameStep.type = "text";
        inputNameStep.placeholder = "Enter step name";

        const inputDescriptionStep = document.createElement("input");
        inputDescriptionStep.type = "text";
        inputDescriptionStep.placeholder = "Enter step description"

        const createNewFieldButton = document.createElement("button");
        createNewFieldButton.type = "button";
        // createNewFieldButton.onclick = createNewField;
        createNewFieldButton.textContent = "Add field";
    //

    stepFieldSet.appendChild(stepLegend);
    stepFieldSet.appendChild(inputNameStep);
    stepFieldSet.appendChild(inputDescriptionStep);
    stepFieldSet.appendChild(createNewFieldButton);

    divStepContainer.appendChild(stepFieldSet);

    // FIELD - Just to separete the things
        const divFieldContainer = document.createElement("div");
        divFieldContainer.className = "fields-container";
        divStepContainer.appendChild(divFieldContainer);
    //

    // running
    stepsContainer.appendChild(divStepContainer); // ...
};
