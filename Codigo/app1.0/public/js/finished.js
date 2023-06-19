let getProtocolTitle;
let getProtocolDesc;

function getAllProtocols() {
    $.get('/read_protocols-finished', (res) => {
        res.forEach(protocol => {
            const getProtocolId = protocol.id;
            const getProtocolTitle = protocol.name;
            const getProtocolDesc = protocol.objective;
            createCard(getProtocolId, getProtocolTitle, getProtocolDesc);
        });
    });
};

function createCard(id, title, description) {
    const main = document.getElementById("main")

    const divCard = document.createElement("div");
    divCard.className = "card";
    divCard.setAttribute('data-id', id);

    const imageCapaProtocol = document.createElement("img");
    imageCapaProtocol.className = "protocolo_opcao";
    imageCapaProtocol.style = "width: 100%;";
    imageCapaProtocol.src = "banana.jpg";
    imageCapaProtocol.alt = "imagem_protocolo_em_progresso";

    divCard.appendChild(imageCapaProtocol);

    const divContainer = document.createElement("div");
    divContainer.className = "container";

    const protocolTitle = document.createElement("h3");
    protocolTitle.textContent = title.toString();

    const imageProtocol = document.createElement("img");
    imageProtocol.src = "protocolo_pesquisador.png";
    imageProtocol.alt = "Protocolos em andamento";

    protocolTitle.appendChild(imageProtocol);

    const protocolDesc = document.createElement("p");
    protocolDesc.textContent = description.toString();

    divContainer.appendChild(protocolTitle);
    divContainer.appendChild(protocolDesc);

    divCard.appendChild(divContainer);

    main.appendChild(divCard);

    clickCard();
};

function clickCard() {
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const protocolId = cards[i].getAttribute('data-id');
            window.location.href = `/protocols/${protocolId}`;
        });
    };
};

getAllProtocols();
