// That codes will run in the file `createProtocol.html`

let stepCount = 0;
let fieldCount = 1;

function getProtocolData(name_protocol, objective_protocol, name_step, description_step, name_field, type_field) {
    let protocol = {
        name_protocol: name_protocol,
        objective_protocol: objective_protocol,
        steps: [
            {
                step_id: stepCount, // Mudar aqui para os estágios também serem adicionados dinamicamente
                name_step: name_step,
                description_step: description_step,
                fields: [ // Adicionar aqui uma forma de adicionar os fields dinamicamente
                    {
                        name_field: name_field,
                        type_field: type_field
                    }
                ]
            }
        ]
    };
};

function sendProtocolDataToDB() {
    console.log("Still have to work on this")
}

function createNewStep() {
    stepCount++;

    const stepsContainer = document.querySelector(".steps-container"); // Is refering the <div id="stepsContainer"></div>

    const divStepContainer = document.createElement("div"); // Create a div to organize the step container
    divStepContainer.classList.add("step-container");

    const stepFieldSet = document.createElement("fieldset");
    stepFieldSet.setAttribute('id', 'stepFieldset');
    stepFieldSet.style.border = '1px solid black';

    //Creating stepFieldSet elements
        const stepLegend = document.createElement('legend');
        stepLegend.textContent = `Step ${stepCount}`;

        const inputNameStep = document.createElement("input"); // ...
        inputNameStep.type = "text";
        inputNameStep.placeholder = "Enter step name"

        const inputDescriptionStep = document.createElement("input"); // ...
        inputDescriptionStep.type = "text";
        inputDescriptionStep.placeholder = "Enter step description"

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
