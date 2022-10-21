// interface control
let yourVoteFor = document.querySelector('.screen-top--left .left-1 span');
let role = document.querySelector('.screen-top--left .left-2 span');
let description = document.querySelector('.screen-top--left .left-4');
let warning = document.querySelector('.screen .screen-bottom p');
let aside = document.querySelector('.screen-top .screen-top--right');
let numbers = document.querySelector('.screen-top--left .left-3');


let currentStep = 0;
let numberToVote = '';
let whiteVote = false;
let votes = [];

function firstStep() {
    let step = steps[currentStep];

    let numberHtml = '';
    numberToVote = '';
    whiteVote = false;

    for(let i = 0;i < step.numbers; i++) {
        if(i === 0) {
            numberHtml += '<div class="number flashes"></div>';
        } else {
            numberHtml += '<div class="number"></div>';
        }
    }

    yourVoteFor.style.display = 'none';
    role.innerHTML = step.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    aside.innerHTML = '';
    numbers.innerHTML = numberHtml;
}
function refreshScreen() {
    let step = steps[currentStep];
    let candidate = step.candidates.filter((item) => {
        if(item.number === numberToVote) {
            return true;
        } else {
            return false;
        }
    });
    if(candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        role.innerHTML = step.title;
        description.innerHTML = `Nome: ${candidate.name}<br>Partido: ${candidate.team}`;
        warning.style.display = 'block';

        let photosHtml = '';
        for(i in candidate.photos) {
            if(candidate.photos[i].small) {
                photosHtml += `<div class="right-1-image small"><img src="assets/images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
            } else {
                photosHtml += `<div class="right-1-image"><img src="assets/images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
            }
        }

        aside.innerHTML = photosHtml;
    } else {
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="big-warming flashes">VOTO NULO</div>';
    }
}

function clicked(n) {
    let elNumber = document.querySelector('.number.flashes');
    if(elNumber !== null) {
        elNumber.innerHTML = n;
        numberToVote = `${numberToVote}${n}`;

        elNumber.classList.remove('flashes');
        if(elNumber.nextElementSibling != null) {
            elNumber.nextElementSibling.classList.add('flashes');
        } else {
            refreshScreen();
        }
    }
}
function white() {
    whiteVote = true;
    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="big-warming flashes">VOTO EM BRANCO</div>';
    aside.style.display = 'none';
}
function undo() {
    firstStep();
    
}
function confirm() {
    let step = steps[currentStep];

    let voteConfirmed = false;

    if(whiteVote === true) {
        voteConfirmed = true;
        votes.push({
            title: steps[currentStep].title,
            vote: 'branco'
        });
    } else if(numberToVote.length === step.numbers) {
        voteConfirmed = true;
        votes.push({
            title: steps[currentStep].title,
            vote: numberToVote
        });    }

    if(voteConfirmed) {
        currentStep ++;
        if(steps[currentStep] !== undefined) {
            firstStep();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="extra-big-warming flashes">FIM</div>';
            console.log(votes);
        }
    }
}



firstStep();