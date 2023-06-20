getDinamicFormsData()

// Criando a função para gerar os protocolos com base no banco de dados:
function getDinamicFormsData() {
    document.addEventListener("DOMContentLoaded", function (event) {
        let idElement = document.getElementById('id-protocolo');
        let id = idElement.textContent;
        console.log("Aqui o id ó: ", id);
        $.post('/read_samples', { id_protocol: id }, (response) => { // Vai me retornar os dados da amostra
            console.log(response);
            let forms = $('#dynamic-form');
            for (k = 0; k < response.length; k++) {
                let fieldsetAmostra = $('<fieldset>');
                forms.append(fieldsetAmostra);
                let legendAmostra = $('<legend>');
                let idAmostra = $('<p>');
                let descricaoAmostra = $('<p>');
                fieldsetAmostra.append(legendAmostra, idAmostra, descricaoAmostra);
                idAmostra.hide();
                legendAmostra.text(response[k].name_sample);
                descricaoAmostra.text(response[k].description_sample);
                idAmostra.text(response[k].id_sample);
                $.post('/read_steps', { id_sample: response[k].id_sample }, (response) => { // Vai retornar os dados de etapas
                    console.log(response);
                    for (j = 0; j < response.length; j++) {
                        let fieldsetStep = $('<fieldset>');
                        fieldsetAmostra.append(fieldsetStep);
                        let legendStep = $('<legend>');
                        let idStep = $('<p>');
                        let descricaoStep = $('<p>')
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
                                var label = $('<label>');
                                var span = $('<span>'); // Substituição do elemento input por span
                                let br = $('<br>'); 
                                div.append(label);
                                div.append(br);
                                div.append(br);
                                label.attr('id', res[i].name_field + res[i].id_field)
                                label.text(res[i].name_field);
                                if (res[i].description_field === 'image') {
                                    div.append(img); // Substituição do elemento input por img
                                    img.addClass('input-el');
                                    img.src(res[i].answer_field); // Deixe o span vazio para exibir a informação do número
                                } else if (res[i].description_field === 'number') {
                                    div.append(span); // Substituição do elemento input por span
                                    span.addClass('input-el');
                                    span.text(res[i].answer_field); // Deixe o span vazio para exibir a informação do número
                                } else {
                                    div.append(span); // Substituição do elemento input por span
                                    span.addClass('input-el');
                                    span.text(res[i].answer_field); // Deixe o span vazio para exibir a informação do texto
                                }
                                span.attr('id', res[i].id_field);
                            }
                        }, 'json');
                    };
                }, 'json');
            };
        }, 'json');
    });
};
function typeImage(input) {
    input.attr('type', 'file');
};
