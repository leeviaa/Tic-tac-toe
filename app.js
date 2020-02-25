

// UI controller
let UICtrl = (function(){
  // UI selectors
  let UISelectors = {
    gameBoard: '#game-board',
    formContainer: '#form-container',
    nameInput: '.name-input'
  }

 const  displayForm = function() {
    document.querySelector(UISelectors.formContainer).style.display = 'block';
  }

  const hideForm = function() {
    document.querySelector(UISelectors.formContainer).style.display = 'none';
  }

  const hidePlayerDisplay = function() {
    document.getElementById('player-display').style.display = 'none'
  }

  const showPlayerDisplay = function() {
    document.getElementById('player-display').style.display = 'flex'
  }

  const outputPlayerNames = function() {
       //grab player display divs
       let player1Display = document.getElementById('player1-display');
        let player2Display = document.getElementById('player2-display');
        //get players
        const playerNames = GameplayCtrl.getPlayers();
        //add player 1 info to div
        player1Display.innerHTML = `<div class="player-name"> ${playerNames.p1Name}</div>
        <div class="player-score">${players.player1.score}</div>`
        
        player2Display.innerHTML =  `<div class="player-name"> ${playerNames.p2Name}</div>
        <div class="player-score">${players.player2.score}</div>`
  
        UICtrl.hideForm();
        UICtrl.displayBoard();
        UICtrl.showPlayerDisplay();
        
        UICtrl.clearFields();
  }


  const displayBoard = function() {
    GameboardCtrl.generateBoard();
  }

  const insertMove = function (e) {
    let marker;
  
    if(players.currentPlayer === 'player1') {
      marker = 'X'
    } else {
      marker ='O'
    }
    if(e.target.classList.contains('board-square') && e.target.textContent === '' ){
       e.target.textContent = marker; 
       
    }
    GameplayCtrl.checkForWin();
    GameplayCtrl.switchTurns();
  }

  const clearMessage = function() {
    const currentMessage = document.querySelector('.message');
    if(currentMessage) {
      currentMessage.remove();
    }
  }

  const showMessage = function(msg, className) {
    //clear alert thats already there
    clearMessage();
    //create a container
    const messageContainer = document.createElement('div');
    //give dynamic classname  
    messageContainer.className = className;
    //create text node
    messageContainer.appendChild(document.createTextNode(msg));
    //grab reference elemtn
    const dummyDiv = document.querySelector('.dummy-div');
    //grab parent element
    const gameContainer = document.querySelector('.game-board-container');
   // console.log(gameContainer);

    //insert message
    gameContainer.insertBefore(messageContainer, dummyDiv);

  }



  const clearFields = function() {
    document.querySelector('#p1-name-input').value = '';
    document.querySelector('#p2-name-input').value = '';
  }
  // make public
  return { displayForm, hideForm, hidePlayerDisplay, showPlayerDisplay, outputPlayerNames, displayBoard, insertMove, clearFields, showMessage }

})()

const GameboardCtrl = (function(){
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const generateBoard = function () {
          let id = 0;
          for(let i = 0; i < board.length; i++) {
            //generating id
            id += 1;
            let gameBoard = document.querySelector('#game-board');
            //create board squares
            let square = document.createElement('div');
            square.className = 'board-square';
            square.id = `${id}`;
            //append to gameboard div
            gameBoard.appendChild(square);
          }
  }

  const resetBoard = function() {

  }
  //make public
  return {generateBoard, resetBoard, board }
})()


// GlOBAL CODE
 //Create Player factory functon
 const Player = function(name, marker, score) {
  this.name = name;
  this.marker = marker;

  return {name, marker, score}

}

const players = {
  player1: Player('Player 1', 'X', 0),
  player2: Player('Player 2', 'O', 0),
  currentPlayer: 'player1'
}


//end GLOBAL CODE

//gameplay controller
const GameplayCtrl = (function() {

  const winPossibilities = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

 
  const checkForWin= function (){
    //grab squares 
    let xData = [];
    let yData = [];
    const squares = document.querySelectorAll('.board-square')
    //loop through squares and check for text content
    squares.forEach((square) => {
      //figure out whats inside
     
      let content = square.textContent;
      if(content === 'X') {
        let xID = square.id;
        xData.push(xID);
      } else {
        if(content === 'O') {
          let yID = square.id;
          yData.push(yID)      
        }
      }
    });

    //loop through win possibilites
    winPossibilities.forEach(combination => {
      if(xData.indexOf(combination))
      yData.indexOf(combination);
    })
   
  }


  const getPlayers = function() {
    const p1Name = document.getElementById('p1-name-input').value;
    const p2Name = document.getElementById('p2-name-input').value;
    //console.log(p1Name, p2Name);
    return {p1Name, p2Name}
    
  }


  const switchTurns = function() {
    if(players.currentPlayer === 'player1') {
      players.currentPlayer = 'player2';
      
    } else {
      players.currentPlayer = 'player1'
    }
    //show message
    let playerNames = getPlayers();
    UICtrl.showMessage(`${players.currentPlayer} 's Turn!`, 'message')
  }   

  return {  getPlayers, switchTurns, checkForWin}
})();

//app controller

const App = (function(){

  //load event listeners
  const loadEventListeners = function() {
    //submit form
    document.getElementById('submit-btn').addEventListener('click', GameplayCtrl.getPlayers);
    //output players
    document.getElementById('submit-btn').addEventListener('click', UICtrl.outputPlayerNames);

    document.getElementById('submit-btn').addEventListener('click', UICtrl.outputMessage)

    document.getElementById('game-board').addEventListener('click', UICtrl.insertMove)

  }

  return {
    init: function(){

      //hide player display
      UICtrl.hidePlayerDisplay();

      //DISPLAY FORM
      UICtrl.displayForm();


      //load event listeners
      loadEventListeners();
    }
  }

})()


App.init();