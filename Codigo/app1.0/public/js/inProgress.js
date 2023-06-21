let getProtocolTitle;
let getProtocolDesc;

function getAllProtocols() {
    $.get('/read_protocols-progress', (res) => {
        const main = document.getElementById("main")
        const columnWrapper = document.createElement('div');
        columnWrapper.className = 'column-wrapper';

        res.forEach(protocol => {
            const getProtocolId = protocol.id;
            const getProtocolTitle = protocol.name;
            const getProtocolDesc = protocol.objective;
            createCard(columnWrapper, getProtocolId, getProtocolTitle, getProtocolDesc);
        });

        main.appendChild(columnWrapper);
        addPagination();
    });
};

function createCard(columnWrapper, id, title, description) {
    const column = document.createElement("div");
    column.className = 'column';

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
    column.appendChild(divCard);
    columnWrapper.appendChild(divCard);
    
    clickCard(columnWrapper.querySelectorAll('.card'));
};

function clickCard(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const protocolId = cards[i].getAttribute('data-id');
            window.location.href = `/protocols/${protocolId}`;
        });
    };
};

function addPagination() {
    const cards = document.getElementsByClassName('card');
    const cardsPerPage = 6;
    const numPages = Math.ceil(cards.length / cardsPerPage);

    const pagination = document.createElement("div");
    pagination.className = "pagination";

    for (let i = 1; i <= numPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = ` ${i} `;
        pageLink.addEventListener('click', () => {
            showPage(i);
        });
        pagination.appendChild(pageLink);
    }

    main.appendChild(pagination);

    showPage(1);
};

function showPage(pageNum) {
    const cards = document.getElementsByClassName('card');
    const cardsPerPage = 6;

    const startIndex = (pageNum - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    for (let i = 0; i < cards.length; i++) {
        if (i >= startIndex && i < endIndex) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    };
};

getAllProtocols();

// Filter part

// add a event listener to the button search
const searchButton = document.getElementById('button_search');
searchButton.addEventListener('click', () => {
    // get the value of the input
    const searchInput = document.getElementById('espaco_busca').value;

    // get all the cards names
    const cards = document.getElementsByClassName('card');
    console.log(cards);

    // loop through all the cards and reset their display style
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'block';
    }

    // filter the cards based on the search input
    Array.from(cards).map(card => {
        // get the card title
        const cardTitle = card.getElementsByTagName('h3')[0].textContent;
        console.log(cardTitle);
        // if the card title includes the search input, show the card
        if (cardTitle.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});