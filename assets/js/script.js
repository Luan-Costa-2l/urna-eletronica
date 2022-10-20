// interface control
let yourVoteFor = document.querySelector('.screen-top--left .left-1 span');
let role = document.querySelector('.screen-top--left .left-2 span');
let description = document.querySelector('.screen-top--left .left-4');
let warning = document.querySelector('.screen .screen-bottom p');
let aside = document.querySelector('.screen-top .screen-top--right');
let numbers = document.querySelector('.screen-top--left .left-3');


let currentStep = 0;
let numberToVote = 0;

function firstStep() {
    let step = steps[currentStep];

    let numberHtml = '';

    for(let i = 0;i < step.numbers; i++) {
        numberHtml += '<div class="number"></div>';
    }

    yourVoteFor.style.display = 'none';
    role.innerHTML = step.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    aside.innerHTML = '';
    numbers.innerHTML = numberHtml;
}
function refreshScreen() {

}

function clicked(n) {
    console.log(`CLICOU NO ${n}`);
}
function white() {
    console.log(`clicou em branco`);
}
function undo() {
    console.log('clicou em corrige');
}
function confirm() {
    console.log('confirmou');
}



firstStep();