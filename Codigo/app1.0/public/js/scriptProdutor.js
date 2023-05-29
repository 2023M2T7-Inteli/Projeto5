function generateDynamicForm(elements) {
    var form = document.getElementById("dynamic-form");
    // Interaction with each element using for
    for (var i = 0; i < elements.length; i++) {
      // Creating a  div
      var div = document.createElement("div");
      div.setAttribute("class", "div-forms")

      // Creating a label
      var title = document.createElement("h3");
      title.setAttribute("name", elements[i].name);
      title.innerHTML = elements[i].name;
      form.appendChild(title);

      // Creating a input for the label
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", elements[i].name);
      input.setAttribute("class", "input-el")
      input.setAttribute("placeholder", elements[i].placeholder);

      div.appendChild(title);
      div.appendChild(input);
      form.appendChild(div);
    }
  }

var infoElements = [
  { name: "NOME DO PROTOCOLO" }
]

  var elementsInput = [
    { name: "NOME COMPLETO", placeholder: "Enter your nome" },
    { name: "OBJETIVO", placeholder: "Enter your email" },
    { name: "COLETOR RESPONSÁVEL", placeholder: "Enter your phone number" },
    { name: "TESTE", placeholder: "Enter anything you want"}
  ];
  generateDynamicForm(elementsInput);

// Criando a função para gerar os protocolos com base no banco de dados:
function getDinamicFormsData() {
  // Criando aqui para substituir o elementsInput (depois mudo o nome)

  
};

