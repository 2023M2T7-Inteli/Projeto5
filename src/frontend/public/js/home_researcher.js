function creatProtocol() {
    window.location.href = "/createProtocol"
};

let card_finished = document.getElementById('card_finished');
card_finished.addEventListener('click', () => {
    window.location.href = '/researcherProtocolsFinished';
});

let card_inProgress = document.getElementById('card_inProgress');
card_inProgress.addEventListener('click', () => {
    window.location.href = '/researcherProtocolsProgress';
});