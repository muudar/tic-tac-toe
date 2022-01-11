const Player = (name, symbol) => {
    return {name, symbol};
}

const gameBoard = (() => {
    let cells = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    // function to display the game board
    const display = () =>{
        const playerTurn = document.querySelector(".playerTurn");
        if(playerTurn.textContent == "")
            playerTurn.textContent = `${playerOne.name}'s turn (O)`;
        const board = document.querySelector(".board");
        board.innerHTML = "";
        for(let i = 0; i < 3; i++){
            const row = document.createElement("div");
            row.classList.add("row");
            if(i == 1)
                row.classList.add("midRow");
            const left = document.createElement("div");
            left.dataset.rowNum = i;
            left.dataset.cellNum = 0;
            left.classList.add("left", "playField");
            left.textContent = cells[i][0];
            const middle = document.createElement("div");
            middle.dataset.rowNum = i;
            middle.dataset.cellNum = 1;
            middle.textContent = cells[i][1];
            middle.classList.add("middle", "playField");
            const right = document.createElement("div");
            right.dataset.rowNum = i;
            right.dataset.cellNum = 2;
            right.textContent = cells[i][2];
            right.classList.add("right", "playField");
            right.onclick = function(event){
                rowNumber = event.target.dataset.rowNum;
                cell = event.target.dataset.cellNum;
                gameState.playRound(currentPlayer, rowNumber, cell);
            }
            middle.onclick = function(event){
                rowNumber = event.target.dataset.rowNum;
                cell = event.target.dataset.cellNum;
                gameState.playRound(currentPlayer, rowNumber, cell);
            }
            left.onclick = function(event){
                rowNumber = event.target.dataset.rowNum;
                cell = event.target.dataset.cellNum;
                gameState.playRound(currentPlayer, rowNumber , cell);
            }
            row.appendChild(left);
            row.appendChild(middle);
            row.appendChild(right);
            board.appendChild(row);
        }
    }

    return{
        cells,
        display,
    };
})();

const gameState = (() => {
    let over = false;
    const playRound = (player, row, cell) => {
        if(over == true)
            alert("game is over");
        else if(gameBoard.cells[row][cell] == "X" || gameBoard.cells[row][cell] == "O")
        alert("ALREADY PLAYED IN"); // ERROR MSG
        else{
            gameBoard.cells[row][cell] = player.symbol;
            gameBoard.display();
            switchPlayer();
        }
    }
    const switchPlayer = () => {
        const playerTurn = document.querySelector(".playerTurn");
        if(currentPlayer == playerOne)
        {
            currentPlayer = playerTwo;
            playerTurn.textContent = `${playerTwo.name}'s turn (O)`;
        }
        else
        {
            currentPlayer = playerOne;
            playerTurn.textContent = `${playerOne.name}'s turn (X)`;
        }
    }
    const restart = () =>{
        for(let i = 0; i < gameBoard.cells.length; i++){
            for(let j = 0; j < gameBoard.cells[i].length; j++){
                gameBoard.cells[i][j] = "";
            }
        }
        const playerTurn = document.querySelector(".playerTurn");
        playerTurn.textContent = `${playerOne.name}'s turn (X)`;
        gameBoard.display();
    }
    return {playRound, restart};
})();



playerOne = Player("Ahmed", "X");
playerTwo = Player("Player 2", "O");
currentPlayer = playerOne;
gameBoard.display();