getDinamicFormsData()

// Criando a função para gerar os protocolos com base no banco de dados:
async function getDinamicFormsData() {
    document.addEventListener("DOMContentLoaded", function (event) {
        let idElement = document.getElementById('id-protocolo');
        let id = idElement.textContent;
        console.log("Aqui o id ó: ", id);
        $.post('/read_samples', { id_protocol: id }, (response) => { // Vai me retornar os dados da amostra
            console.log(response);
            let forms = $('#dynamic-form');
            for (k = 0; k < response.length; k++) {
                let fieldsetAmostra = $('<fieldset>');
                fieldsetAmostra.attr('id', 'sampleFieldset');
                forms.append(fieldsetAmostra);
                let legendAmostra = $('<legend>').attr('id', 'sample_name');
                let idAmostra = $('<p>');
                let descricaoAmostra = $('<p>').attr('id', 'sample_desc');
                fieldsetAmostra.append(legendAmostra, idAmostra, descricaoAmostra);
                idAmostra.hide();
                legendAmostra.text(response[k].name_sample);
                descricaoAmostra.text(response[k].description_sample);
                idAmostra.text(response[k].id_sample);
                $.post('/read_steps', { id_sample: response[k].id_sample }, (response) => { // Vai retornar os dados de etapas
                    console.log(response);
                    for (j = 0; j < response.length; j++) {
                        let fieldsetStep = $('<fieldset>');
                        fieldsetStep.attr('id', 'stepFieldset');
                        fieldsetAmostra.append(fieldsetStep);
                        let legendStep = $('<legend>').attr('id', 'step_name');
                        let idStep = $('<p>');
                        let descricaoStep = $('<p>').attr('id', 'step_desc');
                        fieldsetStep.append(legendStep, idStep, descricaoStep);
                        idStep.hide();
                        // legendStep.attr('id', response[j].name_step + response[j].id_step);
                        legendStep.text(response[j].name_step);
                        descricaoStep.text(response[j].description_step);
                        idStep.text(response[j].id_step);
                        // $('#nome-etapa').text(response[j].name_step);
                        // $('#descricao-etapa').text(response[j].description_step);
                        // $('#id-etapa').text(response[j].id_step);
                        $.post('/read_field', { id_step: response[j].id_step }, (res) => {
                            let divCampos = $('<div>');
                            fieldsetStep.append(divCampos);
                            for (i = 0; i < res.length; i++) {
                                var div = $('<div>');
                                divCampos.append(div);
                                var label = $('<label>').attr('class', 'field_name');
                                var span = $('<span>'); // Substituição do elemento input por span
                                let br = $('<br>'); 
                                div.append(label);
                                div.append(br);
                                div.append(br);
                                div.append(br);
                                label.attr('id', "name_field")
                                
                                if (res[i].description_field === 'image') {
                                    label.text(res[i].name_field);
                                    div.append(img); // Substituição do elemento input por img
                                    img.addClass('input-el');
                                    img.src(res[i].answer_field); // Deixe o span vazio para exibir a informação do número
                                } else if (res[i].description_field === 'number') {
                                    label.text(res[i].name_field);
                                    div.append(span); // Substituição do elemento input por span
                                    span.addClass('input-el');
                                    span.text(res[i].answer_field); // Deixe o span vazio para exibir a informação do número
                                } else if (res[i].description_field === 'radio') {
                                    const radioObj = JSON.parse(res[i].name_field);
                                    const question = radioObj.question;
                                    const arrayOptions = radioObj.listAlternatives;
                                    console.log(arrayOptions);
                                    // mapear a array de opções e criar os inputs
                                    arrayOptions.map((option) => {
                                        console.log(option);
                                        span.addClass('input-el');
                                        span.text(option);
                                        div.append(span);
                                    });
                                    label.text(question);
                                } else if(res[i].description_field === 'checkbox') {
                                    const checkboxObj = JSON.parse(res[i].name_field);
                                    const question = checkboxObj.question;
                                    const arrayOptions = checkboxObj.listAlternatives;
                                    console.log(arrayOptions);
                                    // mapear a array de opções e criar os inputs
                                    arrayOptions.map((option) => {
                                        console.log(option);
                                        const checkbox = $('<ul>');
                                        checkbox.text(option);
                                        div.append(checkbox);
                                    });
                                    label.text(question);
                                } else {
                                    div.append(span); // Substituição do elemento input por span
                                    span.addClass('input-el');
                                    span.text(res[i].answer_field);
                                    label.text(res[i].name_field); // Deixe o span vazio para exibir a informação do texto
                                }
                                span.attr('id', "answer");
                            }
                        }, 'json');
                    };
                }, 'json');
            };
        }, 'json');
    });
    setTimeout(getDataToCreatePDF, 5000);
};

function typeImage(input) {
    input.attr('type', 'file');
};

function getDataToCreatePDF() {
    const id_protocol = document.getElementById('id-protocolo');
    const id_protocolContent = id_protocol.textContent;

    const name_protocol = document.getElementById('nome-do-protocolo');
    const name_protocolContent = name_protocol.textContent;

    const objective_protocol = document.getElementById('objetivo-protocolo');
    const objective_protocolContent = objective_protocol.textContent;

    // Samples
    const name_sample = document.getElementById('sample_name');
    const name_sampleContent = name_sample.textContent;

    const desc_sample = document.getElementById('sample_desc');
    const desc_sampleContent = desc_sample.textContent;

    // Steps
    const name_step = document.getElementById('step_name');
    const name_stepContent = name_step.textContent;

    const desc_step = document.getElementById('step_desc');
    const desc_stepContent = desc_step.textContent;

    // Fields
    const name_field = document.getElementById('name_field');
    const name_fieldContent = name_field.textContent;

    const answer_field = document.getElementById('answer');
    const answer_fieldContent = answer_field.textContent;

    const buttonDownloadPdf = document.getElementById('download-pdf');

    buttonDownloadPdf.addEventListener('click', () => {
        createPdf();

        async function createPdf() {
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage([195, 400]);

            const imageBytes = await fetch('/LogoPotich.png').then(response => response.arrayBuffer());

            const image = await pdfDoc.embedPng(imageBytes);

            page.drawImage(image, {
                x: 50,
                y: 300,
                width: 90,
                height: 90,
            });

            page.moveTo(15, 275);
            page.drawText(`N° do protocolo: ${id_protocolContent}`, {
                size: 12,
            });
            page.moveTo(15, 250);
            page.drawText(`${name_protocolContent}`, {
                size: 12,
            });
            page.moveTo(15, 235);
            page.drawText(`${objective_protocolContent}`, {
                size: 12,
            });
            page.moveTo(15, 210);
            page.drawText(`Sample 1: ${name_sampleContent}`, {
                size: 12,
            });
            page.moveTo(15, 195);
            page.drawText(`${desc_sampleContent}`, {
                size: 12,
            });
            page.moveTo(15, 170);
            page.drawText(`Step 1: ${name_stepContent}`, {
                size: 12,
            });
            page.moveTo(15, 155);
            page.drawText(`${desc_stepContent}`, {
                size: 12,
            });
            page.moveTo(15, 130);
            page.drawText(`Field 1: ${name_fieldContent}`, {
                size: 12,
            });
            page.moveTo(15, 115);
            page.drawText(`${answer_fieldContent}`, {
                size: 12,
            });

            const pdfBytes = await pdfDoc.save();

            // Criar um objeto Blob com os bytes do PDF
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Criar um URL para o objeto Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Criar um link de download e simular o clique nele
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'documento.pdf';
            link.click();

            // Liberar o URL do objeto Blob
            URL.revokeObjectURL(pdfUrl);
        }
    });
};
