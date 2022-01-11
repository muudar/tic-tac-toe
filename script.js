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
        playerTurn.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
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

    const isFull = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(cells[i][j] != "X" && cells[i][j] != "O")
                    return false;
            }
        }
        return true;
    }
    return{
        cells,
        display,
        isFull
    };
})();

const gameState = (() => {
    let over = false;
    const playRound = (player, row, cell) => {
        if(over == false){
            if(!(gameBoard.cells[row][cell] == "X" || gameBoard.cells[row][cell] == "O"))
            {
                gameBoard.cells[row][cell] = player.symbol;
                switchPlayer();
                gameBoard.display();
                checkWinState();
            }
        }

    }
    const switchPlayer = () => {
        const playerTurn = document.querySelector(".playerTurn");
        if(currentPlayer == playerOne)
        {
            currentPlayer = playerTwo;
            playerTurn.textContent = `${playerTwo.name}'s turn (${playerTwo.symbol})`;
        }
        else
        {
            currentPlayer = playerOne;
            playerTurn.textContent = `${playerOne.name}'s turn (${playerOne.symbol})`;
        }
    }
    const restart = () =>{
        over = false;
        for(let i = 0; i < gameBoard.cells.length; i++){
            for(let j = 0; j < gameBoard.cells[i].length; j++){
                gameBoard.cells[i][j] = "";
            }
        }
        const playerTurn = document.querySelector(".playerTurn");
        playerTurn.style.color = "black";
        currentPlayer = playerOne;
        gameBoard.display();
    }

    const checkWinState = () => {
        const playerTurn = document.querySelector(".playerTurn");
        if(hasWon(playerOne)){
            playerTurn.textContent = `${playerOne.name} has won the game!`;
            playerTurn.style.color = "green";
            over = true;
        }
        else if(hasWon(playerTwo)){
            playerTurn.textContent = `${playerTwo.name} has won the game!`;
            playerTurn.style.color = "green";
            over = true;
        }
        else if(gameBoard.isFull()){
            playerTurn.textContent = "Game has ended in a DRAW!";
            playerTurn.style.color = "red";
            over = true;
        }
    }

    const hasWon = (player) =>{
        /// Check horizontally
        for(let i = 0; i < 3; i++){
            if(gameBoard.cells[i][0] == gameBoard.cells[i][1] && gameBoard.cells[i][1] == gameBoard.cells[i][2] && gameBoard.cells[i][0] == player.symbol)
                return true;
        }

        // Check veritcally 
        for(let i = 0; i < 3; i++){
            if(gameBoard.cells[0][i] == gameBoard.cells[1][i] && gameBoard.cells[1][i] == gameBoard.cells[2][i] && gameBoard.cells[0][i] == player.symbol){
                return true;
            }
        }
        
        // Check diagonally
        if(gameBoard.cells[0][0] == gameBoard.cells[1][1] &&  gameBoard.cells[1][1] == gameBoard.cells[2][2] && gameBoard.cells[1][1] == player.symbol)
            return true;
        if(gameBoard.cells[0][2] == gameBoard.cells[1][1] && gameBoard.cells[1][1] == gameBoard.cells[2][0] && gameBoard.cells[1][1] == player.symbol)
            return true;
        return false;
    }
    return {playRound, restart};
})();



playerOne = Player("Player 1", "X");
playerTwo = Player("Player 2", "O");
currentPlayer = playerOne;
gameBoard.display();