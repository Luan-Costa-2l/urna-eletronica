// interface control
let yourVoteFor = document.querySelector('.screen-top--left .left-1 span');
let role = document.querySelector('.screen-top--left .left-2');
let numbers = document.querySelector('.screen-top--left .left-3');
let description = document.querySelector('.screen-top--left .left-4');
let warming = document.querySelector('.screen .screen-bottom p');
let aside = document.querySelector('.screen-top .screen-top--right');

let currentStep = 0;
let numberToVote = '';
let whiteVote = false;
let votes = [];

function firstStep() {
    let step = steps[currentStep];

    let numberHtml = '';
    numberToVote = '';

    for (let i = 0; i < step.numbers; i++) {
        if (i === 0) {
            numberHtml += `<div class="number flashes"></div>`; 
        } else {
            numberHtml += `<div class="number"></div>`;
        }
    }

    yourVoteFor.style.display = 'none';
    role.innerHTML = step.title;
    description.innerHTML = '';
    warming.style.display = 'none';
    aside.innerHTML = '';
    numbers.innerHTML = numberHtml;
}

firstStep();