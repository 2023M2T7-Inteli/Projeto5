// That codes will run in the file `createProtocol.html`

// Creation of protocols stages
let stageCount = 0;
function createNewStage() {
    stageCount++;

    const stagesContainer = document.getElementById("stagesContainer");

    const label = document.createElement("label");
    label.textContent = `Stage ${stageCount}: `;

    const inputNameStage = document.createElement("input");
    inputNameStage.type = "text";
    inputNameStage.placeholder = "Enter stage name"

    const inputDescriptionStage = document.createElement("input");
    inputDescriptionStage.type = "text";
    inputDescriptionStage.placeholder = "Enter stage description"

    const createNewFieldButton = document.createElement("button");
    createNewFieldButton.type = "button";
    createNewFieldButton.onclick = createNewField;
    createNewFieldButton.textContent = "Add field";

    stagesContainer.appendChild(label);
    stagesContainer.appendChild(document.createElement("br"));
    stagesContainer.appendChild(inputNameStage);
    stagesContainer.appendChild(document.createElement("br"));
    stagesContainer.appendChild(inputDescriptionStage);
    stagesContainer.appendChild(document.createElement("br"));
    stagesContainer.appendChild(document.createElement("br"));
    stagesContainer.appendChild(createNewFieldButton);
};


// Creation of stages fields
let fieldCount = 0;
function createNewField() {
    fieldCount++;

    const fieldsContainer = document.getElementById("fieldsContainer");

    const label = document.createElement("label");
    label.textContent = `Field ${fieldCount}: `;

    const inputData = document.createElement("input");
    inputData.type = "text";
    inputData.name = `field${fieldCount}_data`;
    inputData.placeholder = "Enter the desired data";

    const inputType = document.createElement("select");
    inputType.name = `field${fieldCount}_tipo`;

    const option1 = document.createElement("option");
    option1.value = "image";
    option1.text = "Image";

    const option2 = document.createElement("option");
    option2.value = "text";
    option2.text = "Text";

    const option3 = document.createElement("option");
    option3.value = "number";
    option3.text = "Number";

    inputType.appendChild(option1);
    inputType.appendChild(option2);
    inputType.appendChild(option3);

    fieldsContainer.appendChild(label);
    fieldsContainer.appendChild(inputData);
    fieldsContainer.appendChild(inputType);
    fieldsContainer.appendChild(document.createElement("br"));
}