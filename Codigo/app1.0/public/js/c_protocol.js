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
    const startDateProtocolInput = document.getElementById('startDate_protocol');
    const endDateProtocolInput = document.getElementById('endDate_protocol');
    const coverImageProtocolInput = document.getElementById('coverImage_protocol');

    const nameProtocolValue = nameProtocolInput.value;
    const objectiveProtocolValue = objectiveProtocolInput.value;
    const startDateProtocolValue = startDateProtocolInput.value;
    const endDateProtocolValue = endDateProtocolInput.value;

    // Converting image to base64
    const file = coverImageProtocolInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64Image = reader.result;

        const data = {
            name_protocol: nameProtocolValue,
            objective_protocol: objectiveProtocolValue,
            startDate_protocol: startDateProtocolValue,
            endDate_protocol: endDateProtocolValue,
            coverImage_protocol: base64Image
        };

        $.post('/create-protocols', data, getIdProtocol, "text");
    };

    if (file) {
        reader.readAsDataURL(file);
    }
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
                const inputTypeField = fieldContainer.querySelector("[id^='fieldTypeID']");
                const inputNameField = fieldContainer.querySelector("input[type='text'][id^='fieldNameID']");
                let valueInput;
                if (inputTypeField.value == "radio") {
                    // take the inputs of the radio
                    const nodeList = fieldContainer.querySelectorAll(".inputs-radio");
                    // create a array to store the alternatives
                    const listAlternatives = [];
                    // for each input of the radio, push the value in the array
                    nodeList.forEach((node) => {
                        listAlternatives.push(node.value);
                    });
                    // create a variable to store the question and the alternatives in a object
                    valueInput = { question: inputNameField.value, listAlternatives };
                    valueInput = JSON.stringify(valueInput);
                    console.log(valueInput);

                } else {
                    valueInput = inputNameField.value;
                }

                console.log(valueInput);
                console.log(inputTypeField);

                const field = {
                    id_field: null,
                    name_field: valueInput,
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

<<<<<<< Updated upstream
        const fieldInputType = document.createElement("select");
=======
        const fieldInputType = document.createElement("select"); // Qualquer coisa muda pra select
>>>>>>> Stashed changes
        fieldInputType.id = "fieldTypeID" + fieldCount;
        fieldInputType.className = "inputs_creation";
        // adding event listener to the select
        fieldInputType.addEventListener("change", function() {
            checkSelect(this);
        });

<<<<<<< Updated upstream
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

=======
        // // Trying something new
        //     const divCustomSelect = document.createElement('div');
        //     divCustomSelect.className = 'custom-select';

        //     const divSelectSelected = document.createElement('div');
        //     divSelectSelected.className = 'select-selected';

        //     const ulSelectOptions = document.createElement('ul');
        //     ulSelectOptions.className = 'select-options';

        //     const liTextOption = document.createElement('li');
        //     liTextOption.setAttribute("data-value", "text");
        //     liTextOption.textContent = "Text";
        //     const liTextImg = document.createElement('img');
        //     liTextImg.src = "images_icon.png";
        //     liTextImg.alt = "Text";
        //     liTextOption.appendChild(liTextImg);

        //     const liImageOption = document.createElement('li');
        //     liImageOption.setAttribute("data-value", "img");
        //     liImageOption.textContent = "Image";
        //     const liImageImg = document.createElement('img');
        //     liImageImg.src = "images_icon.png";
        //     liImageImg.alt = "Image";
        //     liImageOption.appendChild(liImageImg);

        //     const liNumberOption = document.createElement('li');
        //     liNumberOption.setAttribute("data-value", "number");
        //     liNumberOption.textContent = "Number";
        //     const liNumberImg = document.createElement('img');
        //     liNumberImg.src = "images_icon.png";
        //     liNumberImg.alt = "Number";
        //     liNumberOption.appendChild(liNumberImg);

        //     ulSelectOptions.appendChild(liTextOption);
        //     ulSelectOptions.appendChild(liImageOption);
        //     ulSelectOptions.appendChild(liNumberOption);

        //     divSelectSelected.appendChild(ulSelectOptions);

        //     divCustomSelect.appendChild(divSelectSelected);
        // //

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

>>>>>>> Stashed changes
            const option4 = document.createElement("option");
            option4.value = "radio";
            option4.text = "Alternatives";
        //
    //

    fieldInputType.appendChild(option1);
    fieldInputType.appendChild(option2);
    fieldInputType.appendChild(option3);
    fieldInputType.appendChild(option4);
<<<<<<< Updated upstream
=======

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.ariaHidden = "true";
    deleteButton.onclick = deleteElement;

    const imgButtonDelete = document.createElement('img');
    imgButtonDelete.className = "trash-natura-icon";
    imgButtonDelete.src = "/icons/trash-natura-icon.png";
    imgButtonDelete.height = "40px";

    deleteButton.appendChild(imgButtonDelete);

    divFieldContainer.appendChild(fieldInputType);
>>>>>>> Stashed changes

    fieldFieldSet.appendChild(fieldLegend);
    fieldFieldSet.appendChild(fieldInputData);
    fieldFieldSet.appendChild(fieldInputType);

    divFieldContainer.appendChild(fieldFieldSet);
    
    // running
    fieldsContainer.appendChild(divFieldContainer);
};

// check if the select is radio and if it is, create a button to add more alternatives
function checkSelect(select) {
    if (select.value === 'radio') {
        console.log("radio");
        // create a button to add more alternatives
        const buttonAddAlternative = document.createElement("button");
        // add text to the button
        buttonAddAlternative.textContent = "Add alternative";
        // add class to the button
        buttonAddAlternative.className = "button_radio radio";
        // take the fieldset outside the select
        const fieldset = select.closest("fieldset");
        // create a br element
        const br = document.createElement("br");
        // add the class radio to the br
        br.className = "radio";
        // add the button to the fieldset
        fieldset.appendChild(buttonAddAlternative);
        fieldset.appendChild(br);
        // add event listener to the button
        buttonAddAlternative.addEventListener("click", function() {
            createNewAlternative(fieldset);
        });
    } else {
        console.log("not radio");
        try {
            // take all the elements with the class "radio"
            const radios = document.querySelectorAll(".radio");
            // for each element, remove it
            radios.forEach(radio => {
                radio.remove();
            });
        } catch (error) {
            console.log(error);
        }
    }
}

function createNewAlternative(fieldset) {
    // create a new input of type text
    const inputAlternative = document.createElement("input");
    // add a type to the input
    inputAlternative.type = "text";
    // add a class to the input
    inputAlternative.className = "inputs-radio radio";
    // append the input to the fieldset
    fieldset.appendChild(inputAlternative);
    // create a button to remove the input
    const buttonRemoveAlternative = document.createElement("button");
    // add text to the button
    buttonRemoveAlternative.textContent = "remover";
    // add class to the button
    buttonRemoveAlternative.className = "button_radio radio";
    // add event listener to the button
    buttonRemoveAlternative.addEventListener("click", function() {
        // remove the input
        inputAlternative.remove();
        // remove the button
        buttonRemoveAlternative.remove();
    });
    // append the button to the fieldset
    fieldset.appendChild(buttonRemoveAlternative);
}


