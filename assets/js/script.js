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
    whiteVote = false;
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

function refreshScreen() {
    let step = steps[currentStep];
    let candidate = step.candidates.filter((item) => (item.number === numberToVote) ? true : false);
    // let candidates = step.candidates.filter((item) => {
    //     if (item.number === numberToVote) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        role.innerHTML = step.title;
        description.innerHTML = `Nome: ${candidate.name}<br /> Partido: ${candidate.team}`;
        warming.style.display = 'block';

        let photosHtml = '';
        for (let i in candidate.photos) {
            if (candidate.photos[i].small) {
                photosHtml += `<div class="right-1-image small"><img src="assets/images/${candidate.photos[i].url}"/>${candidate.photos[i].legend}</div>`;
            } else {
                photosHtml += `<div class="right-1-image"><img src="assets/images/${candidate.photos[i].url}"/>${candidate.photos[i].legend}</div>`
            }
        }

        aside.innerHTML = photosHtml;
    } else {
        // role.innerHTML = step.title;
        yourVoteFor.style.display = 'block';
        warming.style.display = 'block';
        document.querySelectorAll('.left-3 .number').forEach(item => item.style.marginTop = '0');
        description.innerHTML = `<div class="big-warming flashes">VOTO NULO</div>`;
    }
}

function clicked(n) {
    let elNumber = document.querySelector('.number.flashes');
    if (elNumber !== null) {
        elNumber.innerHTML = n;
        numberToVote = `${numberToVote}${n}`;

        elNumber.classList.remove('flashes');
        elNumber.style.marginTop = '10px';
        if(elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('flashes');
        } else {
            refreshScreen();
        }
    }
}

function white() {
    whiteVote = true;
    yourVoteFor.style.display = 'block';
    warming.style.display = 'block';
    aside.style.display = 'none';
    numbers.innerHTML = '';
    description.innerHTML = `<div class="big-warming flashes">VOTO EM BRANCO</div>`;
}

function corrige() {
    firstStep();
}

function confirm() {
    let voteConfirmed = false;
    let step = steps[currentStep];
    if (whiteVote) {
        voteConfirmed = true;
        votes.push({
            title: steps[currentStep].title,
            vote: 'BRANCO'
        });
    } else if (numberToVote.length === step.numbers) {
        voteConfirmed = true;
        votes.push({
            title: steps[currentStep].title,
            vote: numberToVote
        });
    }

    if (voteConfirmed) {
        currentStep++;
        if (steps[currentStep] !== undefined) {
            firstStep();
        } else {
            document.querySelector('.screen').innerHTML = `<div class="extra-big-warming flashes">FIM</div>`;
            console.log(votes);
        }
    }
}

document.querySelectorAll('.button').forEach((item, index) => {
    item.addEventListener('click', (e) => {
        clicked(e.target.innerHTML);
    })
});

document.querySelector('.white-button').addEventListener('click', white);
document.querySelector('.corrige-button').addEventListener('click', corrige);
document.querySelector('.confirm-button').addEventListener('click', confirm);

firstStep();