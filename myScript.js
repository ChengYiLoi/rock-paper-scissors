const startGame = (event) =>{
    event.target.classList.add('active');
    let startButton = document.querySelectorAll('#startButton');
    let game = document.querySelectorAll('.game');
    let len = game.length;
    let intro = document.querySelector('.intro');
    let retu = 0;

    intro.classList.add('fadeOut');
    setTimeout(function(){
        for(let i = 0; i < len; i++){
            game[i].classList.add('fadeIn');
        };
    },500)
    intro.style.userSelect = 'none';
    for(let i = 0; i < 2; i++){
        startButton[i].style.cursor = 'default';
    }
    
};

const check = (event) =>{
    let input = event.target.innerHTML;
    let pHand = document.getElementById('pHand');
    let cHand = document.getElementById('cHand');
    input = input.toLowerCase();
    let cChoice = generateChoice();
    let pScore = document.getElementById('pScore').innerHTML;
    let cScore = document.getElementById('cScore').innerHTML;
    pHand.classList.add('animation');
    cHand.classList.add('animation');
    // pHand.classList.add('fadeOut');
    // cHand.classList.add('fadeOut');
    setTimeout(function(){
        // cHand.classList.remove('fadeOut');
        // pHand.classList.remove('fadeOut');
        pHand.src = 'images/'+input+'.svg';
        cHand.src = 'images/'+cChoice+'.svg';
        if(input == 'scissors'){
            pHand.style.transform = 'rotateZ(120deg)';
        }
        else{
            pHand.style.transform = 'rotateZ(150deg)';
        }
        if(cChoice == 'scissors'){
            cHand.style.transform = 'rotateY(180deg) rotateZ(120deg)';
        }
        else{
            cHand.style.transform = 'rotateY(180deg) rotateZ(150deg)';
        }
        let result = getWinner(input,cChoice)
        updateResult(result,pScore,cScore); // 1 = p wins, 0 means c wins
        pHand.classList.remove('animation');
        cHand.classList.remove('animation');
    },1600); 
}
const generateChoice = () =>{
    
    let option = ['rock', 'paper', 'scissors'];
    let num = Math.floor((Math.random() * 3)); //generates a random number from 0 to 2
    let cChoice = option[num];
    return cChoice;
}

const getWinner = (input,cChoice) =>{
    let winner = 0;
    if(input == cChoice){
        winner = 2;
        return winner;
    }
    else if(input == 'rock'){
        if(cChoice == 'scissors'){
            winner = 1;
        }
    }
    else if(input == 'paper'){
        if(cChoice == 'rock'){
            winner = 1;
        }
    }
    else{
        if(cChoice == 'paper'){
            winner = 1;
        }
    }
    return winner;
}
const updateResult = (result,pScore,cScore) =>{
    setTimeout(function () {  
        if(result == 1){
            pScore = parseInt(pScore);
            pScore += 1;
            document.getElementById('pScore').innerHTML = pScore;
        }
        else if(result == 0){
            cScore = parseInt(cScore);
            cScore += 1;
            document.getElementById('cScore').innerHTML = cScore;
        }
        checkFinalWinner();
    },400);

}
const checkFinalWinner = () =>{
    let text = document.querySelector('.active').innerHTML;
    let finalScore = 3;
    let pScore = document.getElementById('pScore').innerHTML;
    let cScore = document.getElementById('cScore').innerHTML;
    pScore = parseInt(pScore);
    cScore = parseInt(cScore);
    if(text == 'Best of 5'){
        finalScore = 5;
    }
    if(pScore == finalScore || cScore == finalScore){
        displayWinner(finalScore);
    }
}

const displayWinner = (score) =>{
    setTimeout(function(){
        let game = document.querySelectorAll('.game');
        let result = document.querySelector('.result');
        let cScore = document.getElementById('cScore').innerHTML;
        let winText = document.getElementById('winner');
        let len = game.length;
        let msg = 'Player Wins!';
        for(let i = 0; i < len; i++){
            game[i].classList.remove('fadeIn');
            game[i].classList.add('fadeOut');
        };
        cScore = parseInt(cScore);
        if(cScore == score){
            msg = 'Computer Wins!';
        }
        winText.innerHTML = msg;
        result.classList.add('fadeIn');
    },250);
    
}