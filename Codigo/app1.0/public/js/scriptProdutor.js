alert("Here you can see the protocol you created! (You can answer it, but nothing will happen. We are still working on data integration!)");
getDinamicFormsData()

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
                  label.attr('id', res[i].name_field + res[i].id_field)
                  if (res[i].description_field === 'image') {
                    let divImage = $('<div>');
                    divImage.attr('class', 'drop-zone');
                    div.append(divImage);
                    let buttonImage = $('<button>');
                    buttonImage.attr('class', 'btn');
                    let spanImage = $('<span>');
                    spanImage.attr('class', 'drop-zone__prompt');
                    spanImage.text("Clique aqui");
                    divImage.append(buttonImage, spanImage, input);
                    input.attr('type', 'file');
                    input.attr('accept', 'image/*');
                    input.attr('class', 'drop-zone__input');
                    input.attr('name', 'myFile');
                    AddDropImage()
                    label.text(res[i].name_field);
                  } else if (res[i].description_field === 'number') {
                    div.append(input);
                    input.attr('type', 'number');
                    input.addClass('input-el');
                    label.text(res[i].name_field);
                  } else if (res[i].description_field === 'radio') {
                    // turn the string into a json
                    let jsonResponse = JSON.parse(res[i].name_field);
                    console.log(jsonResponse);
                    // store the question in a variable
                    let question = jsonResponse.question;
                    label.text(question);
                    
                    let listAlternatives = jsonResponse.listAlternatives;
                    console.log(listAlternatives);
                    // map each alternative in the list, create and add the elements to the html
                    listAlternatives.map((alternative) => {
                      console.log(alternative);
                      // create a br element
                      let br = $('<br>');
                      // add the br to the html
                      div.append(br);
                      // select the div to add the elements
                      const inputRadio = $('<input>');
                      inputRadio.attr('type', 'radio');
                      // put the text of the alternative
                      const labelRadio = $('<label>');
                      labelRadio.text(alternative);
                      // set the value of the radio equals to the alternative
                      inputRadio.attr('value', alternative);
                      // add the name of the radio equals to the question
                      inputRadio.attr('name', question + res[i].id_field);
                      // add the elements to the html
                      div.append(inputRadio, labelRadio);
                    });
                    
                  } else {
                    div.append(input);
                    input.attr('type', 'text');
                    input.addClass('input-el');
                    label.text(res[i].name_field);
                  }
                  input.attr('id', res[i].id_field);
                };
              }, 'json');
            };
          }, 'json');
        };
      }, 'json');
    });
  });
};
function typeImage(input) {
  input.attr('type', 'file');
};

// function that add the listeners to the dropbox
function AddDropImage(){
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
}

// Update the drop image to the image that was chosen
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }
  thumbnailElement.dataset.label = file.name;
  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
};
