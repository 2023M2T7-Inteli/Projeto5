let sampleCount = 0;

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
                name_sample: inputNameSample.value,
                description_sample: inputDescriptionSample.value,
            };

            $.ajax({
                url: '/read_id-protocols',
                method: 'GET',
                dataType: 'json'
            }).done((res) => {
                const id_protocol = res.id_protocol;
                console.log(id_protocol);

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