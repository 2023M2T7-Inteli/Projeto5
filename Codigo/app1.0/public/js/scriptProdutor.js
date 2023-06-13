alert("Here you can see the protocol you created! (You can answer it, but nothing will happen. We are still working on data integration!)");
getDinamicFormsData()

// window.addEventListener('online', function(e) {
//   location.reload();
// });

// Criando a função para gerar os protocolos com base no banco de dados:
function getDinamicFormsData() {
  document.addEventListener("DOMContentLoaded", function(event)  {
    $.ajax({ // Vai me retornar os dados do protocolo
      url: '/read_protocol-data',
      method: 'GET',
      dataType: 'json',
    }).done((res) => {
      $('#nome-do-protocolo').text(res.name);
      $('#objetivo-protocolo').text(res.objective);
      $('#id-protocolo').text(res.id);
      $.post('/read_samples',{id_protocol: res.id},(response) => { // Vai me retornar os dados da amostra
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

          $.post('/read_steps', {id_sample: response[k].id_sample}, (response) => { // Vai retornar os dados de etapas
            console.log(response);
            for (j = 0; j < response.length ;j++) {
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
  
              $.post('/read_field', {id_step: response[j].id_step}, (res) => {
                // console.log(res);
                let divCampos = $('<div>');
                fieldsetStep.append(divCampos);
                for (i = 0; i < res.length ; i++){
                  // console.log(res[i].name_field + res[i].id_field);
                  var div = $('<div>');
                  divCampos.append(div);
                  var label = $('<label>');
                  var input = $('<input>');
                  div.append(label);
                  div.append(input);
                  label.attr('id', res[i].name_field + res[i].id_field)
                  label.text(res[i].name_field);
                  if (res[i].description_field === 'image') {
                    input.attr('type', 'file');
                    input.attr('accept', '".jpg, .jpeg, .png"');
                    input.attr('capture', "camera");
                  } else if (res[i].description_field === 'number') {
                    input.attr('type', 'number');
                  } else {
                    input.attr('type', 'text');
                  }
                  input.addClass('input-el');
                  input.attr('id', res[i].id_field);
                }
              }, 'json')
            }
            
          }, 'json')

        }
        
      }, 'json')
    });
    
  });
};

function typeImage(input) {
  input.attr('type', 'file');
}

// When send button clicked
$('#send-button').click(sendAnswers);

function sendAnswers() {
  // take inputs
  let protocolInfo = JSON.parse(localStorage.getItem("protocolInfo"));
  // console.log(inputs);
  for (let i = 0; i < protocolInfo.input.length; i++) {
    let id_field = protocolInfo.input[i].id;
    let answer = protocolInfo.input[i].value;

    let isConnected = fetch('/isConnected');
    isConnected.then((response) => {
      if (response.ok) {
        $.post('/updateFields', {answer:answer,id_field:id_field}, (res) => {
          console.log("Status" + res);
          // localStorage.clear(); -> Isso aqui faz os dados serem apagados, tenho que ver porque essas funções de callback não estão sendo chamadas;
        }, 'json');
      } else {
        console.log("Sem conexão, irmão");
      }
    }).catch((error) => {
      console.log("Error checking connection: " + error);
    });
  }
};

function funcDeTesteParaPegarOLocalStorage() {
  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   let value = localStorage.getItem(key);
  //   console.log("Aqui está o negócio: ")
  //   console.log(`${key}: ${value}`);
  //   console.log(`${key}`);
  //   console.log(`${value}`);
  // };

  let protocolInfo = JSON.parse(localStorage.getItem("protocolInfo"));

  for (let i = 0; i < protocolInfo.input.length; i++) {
    let value = protocolInfo.input[i].value;
    let id = protocolInfo.input[i].id;
    console.log("Aqui ó:");
    console.log({value, id});
  };
};