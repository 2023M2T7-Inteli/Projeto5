// Variáveis globais;
    //IDs
    let id_protocol;
    let id_sample;

    // Variáveis de contagem;
    let sampleCount = 0;
    let stepCount = 0;
    let fieldCount = 0;

    // Variáveis de elementos criados dinâmicamente;
    let inputNameSample;
    let inputDescriptionSample;

    // Arrays para organizar vetores;
    let arraySamples;
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
    const sampleContainers = document.querySelectorAll(".sample-container");

    sampleContainers.forEach((container) => {
        const inputName = container.querySelector("input[type='text'][id^='nameToFunc']");
        const inputDescription = container.querySelector("input[type='text'][id^='descToFunc']");

        const sample = {
            id_sample: null,
            name_sample: inputName.value,
            description_sample: inputDescription.value,
            steps: []
        };

        const stepContainers = container.querySelectorAll(".step-container");

        stepContainers.forEach((stepContainer) => {
            const inputNameStep = stepContainer.querySelector("input[type='text'][id^='stepNameID']");
            const inputDescriptionStep = stepContainer.querySelector("input[type='text'][id^='stepDescriptionID']");

            console.log(inputNameStep);
            console.log(inputDescriptionStep);

            const step = {
                id_step: null,
                name_step: inputNameStep.value,
                description_step: inputDescriptionStep.value,
                fields: []
            };

            sample.steps.push(step);

            const fieldContainers = stepContainer.querySelectorAll(".field-container");

            fieldContainers.forEach((fieldContainer) => {
                const inputNameField = fieldContainer.querySelector("input[type='text'][id^='fieldNameID']");
                const inputTypeField = fieldContainer.querySelector("[id^='fieldTypeID']");

                console.log(inputNameField);
                console.log(inputTypeField);

                const field = {
                    id_field: null,
                    name_field: inputNameField.value,
                    description_field: inputTypeField.value
                }

                step.fields.push(field);
            });
        });
        sendDataSample(sample);
    });
};

function sendDataSample(sample) {
    let data = {
        id_protocol: id_protocol,
        name_sample: sample.name_sample,
        description_sample: sample.description_sample
    };

    $.post('/create-samples', data, (res) => {
        sample.id_sample = res.id_sample;
        console.log("Aqui está o res da criação de sample: " + sample.id_sample);

        sample.steps.forEach((step) => {
            sendDataStep(sample.id_sample, step);
        })
    }, "json");
};

function sendDataStep(id_sample, step) {
    let data = {
        id_sample: id_sample,
        name_step: step.name_step,
        description_step: step.description_step
    };

    $.post('/create-steps', data, (res) => {
        step.id_step = res.id_step;
        console.log("Aqui está o res da criação de step: " + step.id_step);

        step.fields.forEach((field) => {
            sendDataField(step.id_step, field)
        });
    }, "json");
};

function sendDataField(id_step, field) {
    let data = {
        id_step: id_step,
        name_field: field.name_field,
        description_field: field.description_field
    };

    $.post('/create-fields', data, (res) => {
        field.id_field = res.id_field;
        console.log("Aqui está o res da criação de field: " + field.id_field);
        alert('Creation of protocols done successfully!');
        window.location.href = '/collectorProtocol';
    }, "json");
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

    // Creating sampleFieldSet elements
        const sampleLegend = document.createElement('legend');
        sampleLegend.textContent = `Sample ${sampleCount}`;

        inputNameSample = document.createElement('input');
        inputNameSample.id = "nameToFunc" + sampleCount;
        inputNameSample.className = "inputs_creation";
        inputNameSample.type = "text";
        inputNameSample.placeholder = "Enter sample name";

        inputDescriptionSample = document.createElement("input");
        inputDescriptionSample.id = "descToFunc" + sampleCount;
        inputDescriptionSample.className = "inputs_creation";
        inputDescriptionSample.type = "text";
        inputDescriptionSample.placeholder = "Enter sample description"

        const createNewSampleButton = document.createElement("button");
        createNewSampleButton.type = "button";
        createNewSampleButton.className = "button_step";
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
        sampleFieldSet.appendChild(divStepContainer);
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

    //Creating stepFieldSet elements
        const stepLegend = document.createElement('legend');
        stepLegend.textContent = `Step ${stepCount}`;

        const inputNameStep = document.createElement('input');
        inputNameStep.id = "stepNameID" + stepCount;
        inputNameStep.className = "inputs_creation";
        inputNameStep.type = "text";
        inputNameStep.placeholder = "Enter step name";

        const inputDescriptionStep = document.createElement("input");
        inputDescriptionStep.id = "stepDescriptionID" + stepCount;
        inputDescriptionStep.className = "inputs_creation";
        inputDescriptionStep.type = "text";
        inputDescriptionStep.placeholder = "Enter step description"

        const createNewFieldButton = document.createElement("button");
        createNewFieldButton.type = "button";
        createNewFieldButton.className = "button_step";
        createNewFieldButton.onclick = createNewField;
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
        stepFieldSet.appendChild(divFieldContainer);
    //

    // running
    stepsContainer.appendChild(divStepContainer); // ...
};

function createNewField() {
    fieldCount++;

    const fieldsContainer = this.closest(".step-container").querySelector(".fields-container");

    const divFieldContainer = document.createElement("div");
    divFieldContainer.setAttribute("data-name", `step${stepCount}_field${fieldCount}`);
    divFieldContainer.classList.add("field-container");

    const fieldFieldSet = document.createElement("fieldset");
    fieldFieldSet.setAttribute('id', 'fieldFieldset');

    //Creating stepFieldSet elements
        const fieldLegend = document.createElement('legend');
        fieldLegend.textContent = `Field ${fieldCount}: `;

        const fieldInputData = document.createElement("input");
        fieldInputData.id = "fieldNameID" + fieldCount;
        fieldInputData.className = "inputs_creation";
        fieldInputData.type = "text";
        fieldInputData.placeholder = "Enter the desired data";
        divFieldContainer.appendChild(fieldInputData);

        const fieldInputType = document.createElement("select");
        fieldInputType.id = "fieldTypeID" + fieldCount;
        fieldInputType.className = "inputs_creation";

        //Creating fieldInputType options
            const option1 = document.createElement("option");
            option1.value = "image";
            option1.text = "Image";

            const option2 = document.createElement("option");
            option2.value = "text";
            option2.text = "Text";

            const option3 = document.createElement("option");
            option3.value = "number";
            option3.text = "Number";
        //
    //

    fieldInputType.appendChild(option1);
    fieldInputType.appendChild(option2);
    fieldInputType.appendChild(option3);

    fieldFieldSet.appendChild(fieldLegend);
    fieldFieldSet.appendChild(fieldInputData);
    fieldFieldSet.appendChild(fieldInputType);

    divFieldContainer.appendChild(fieldFieldSet);
    
    // running
    fieldsContainer.appendChild(divFieldContainer);
};
