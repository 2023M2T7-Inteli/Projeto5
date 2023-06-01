// That codes will run in the file `createProtocol.html`...

let sampleCount = 0;
let stepCount = 0;
let fieldCount = 1;

function callbackCreateProtocol() {
    createNewSample()
}

function createProtocol() {
    const submitButton = document.getElementById("submitButton"); 
    const protocolForm = document.getElementById('protocolForm');
    submitButton.addEventListener("click", () => {
        // event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

        var name_protocol = document.querySelector('input[name="name_protocol"]').value;
        var objective_protocol = document.querySelector('input[name="objective_protocol"]').value;

        $.ajax({
            url: '/create-protocols',
            method: 'POST',
            data: {
                name_protocol: name_protocol,
                objective_protocol: objective_protocol
            },
            dataType: 'json'
        }).done((res) => {
            console.log(res);
        })

        callbackCreateProtocol();
    });
}

function createNewSample() {
    sampleCount++;

    const submitButton = document.getElementById("submitButton"); // Button to send the data to the db;

    const samplesContainer = document.querySelector(".samples-container"); // Is refering the <div class="samples-container"></div>

    const divSampleContainer = document.createElement("div");
    divSampleContainer.classList.add("sample-container");

    const sampleFieldSet = document.createElement("fieldset");
    sampleFieldSet.setAttribute('id', 'sampleFieldset');
    sampleFieldSet.style.border = '1px solid black';

    // Creating sampleFieldSet elements
        const sampleLegend = document.createElement('legend');
        sampleLegend.textContent = `Sample ${sampleCount}`;

        const inputNameSample = document.createElement('input');
        inputNameSample.type = "text";
        inputNameSample.placeholder = "Enter sample name";

        const inputDescriptionSample = document.createElement("input"); // ...
        inputDescriptionSample.type = "text";
        inputDescriptionSample.placeholder = "Enter sample description"

        submitButton.addEventListener("click", () => {
            let dados = {
                id_protocol: "",
                name_sample: inputNameSample.value,
                description_sample: inputDescriptionSample.value,
            };

            $.ajax({
                url: '/read_id-protocols',
                method: 'GET',
                dataType: 'json'
            }).done((res) => {
                const id_protocol = res.id_protocol;
                console.log("ID protocolo depois que volta do ajax: " + id_protocol);

                dados.id_protocol = id_protocol;

                $.ajax({
                    url: '/create-samples',
                    method: 'POST',
                    data: dados,
                    dataType: 'json'
                }).done((res) => {
                    console.log(res);
                });
            });
        });

        const createNewSampleButton = document.createElement("button"); // ...
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
    samplesContainer.appendChild(divSampleContainer); // ...
};

function createNewStep() {
    stepCount++;

    // Function to send the data;
        function sendDataStep(name_step, description_step, route) {
            fetch(route, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name_step, description_step })
            })
            .then(response => {
                console.log('Dados enviados com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
        };
    //

    const submitButton = document.getElementById("submitButton"); // Button to send the data to the db;

    const stepsContainer = this.closest(".sample-container").querySelector(".steps-container"); // Is refering the <div id="stepsContainer"></div>

    const divStepContainer = document.createElement("div"); // Create a div to organize the step container
    divStepContainer.classList.add("step-container");

    const stepFieldSet = document.createElement("fieldset");
    stepFieldSet.setAttribute('id', 'stepFieldset');
    stepFieldSet.style.border = '1px solid black';

    //Creating stepFieldSet elements
        const stepLegend = document.createElement('legend');
        stepLegend.textContent = `Step ${stepCount}`;

        const inputNameStep = document.createElement('input'); // ...
        inputNameStep.type = "text";
        inputNameStep.placeholder = "Enter step name";

        const inputDescriptionStep = document.createElement("input"); // ...
        inputDescriptionStep.type = "text";
        inputDescriptionStep.placeholder = "Enter step description"

        // Sending data
            submitButton.addEventListener("click", () => {
                const nameValue = inputNameStep.value;
                const descValue = inputDescriptionStep.value;
                sendDataStep(nameValue, descValue, '/create-steps');
            });
        //

        const createNewFieldButton = document.createElement("button"); // ...
        createNewFieldButton.type = "button";
        createNewFieldButton.onclick = createNewField;
        createNewFieldButton.textContent = "Add field";
        createNewFieldButton.addEventListener("click", () => {
            fieldCount++;
        });
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

function createNewField() {

    // Function to send the data;
        function sendDataField(name_field, description_field, route) {
            fetch(route, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name_field, description_field })
            })
            .then(response => {
                console.log('Dados enviados com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
            });
        };
    //

    const submitButton = document.getElementById("submitButton"); // Button to send the data to the db;

    // Is refering the <div id="fieldsContainer"></div>
    // This one was created in the function `createNewStep()` with the `const divFieldContainer`
    const fieldsContainer = this.closest(".step-container").querySelector(".fields-container"); // Select father elements...

    const divFieldContainer = document.createElement("div"); // Create a div to organize the field container
    divFieldContainer.setAttribute("data-name", `step${stepCount}_field${fieldCount}`);
    divFieldContainer.classList.add("field-container");

    const fieldFieldSet = document.createElement("fieldset");
    fieldFieldSet.setAttribute('id', 'stepFieldset');
    fieldFieldSet.style.border = '1px solid black';

    //Creating stepFieldSet elements
        const fieldLegend = document.createElement('legend');
        fieldLegend.textContent = `Field ${fieldCount}: `;

        const fieldInputData = document.createElement("input");
        fieldInputData.type = "text";
        fieldInputData.placeholder = "Enter the desired data";
        divFieldContainer.appendChild(fieldInputData);

        const fieldInputType = document.createElement("select");

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

        // Sending data
            submitButton.addEventListener("click", () => {
                const dataValue = fieldInputData.value;
                const typeValue = fieldInputType.value;
                sendDataField(dataValue, typeValue, '/create-fields');
            });
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
