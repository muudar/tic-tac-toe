const Player = (name, symbol) => {
    return {name, symbol};
}

playerOne = Player("Player 1", "X");
playerTwo = Player("Player 2", "O");
currentPlayer = playerOne;



const gameBoard = (() => {
    let cells = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    // function to display the game board
    const display = () =>{
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
                playRound(currentPlayer, rowNumber, cell);
            }
            middle.onclick = function(event){
                rowNumber = event.target.dataset.rowNum;
                cell = event.target.dataset.cellNum;
                playRound(currentPlayer, rowNumber, cell);
            }
            left.onclick = function(event){
                rowNumber = event.target.dataset.rowNum;
                cell = event.target.dataset.cellNum;
                playRound(currentPlayer, rowNumber , cell);
            }
            row.appendChild(left);
            row.appendChild(middle);
            row.appendChild(right);
            board.appendChild(row);
        }
    }

    const playRound = (player, row, cell) => {
        console.log(cell);
        if(cells[row][cell] == "X" || cells[row][cell] == "O")
        alert("ALREADY PLAYED IN"); // ERROR MSG
        else{
            cells[row][cell] = player.symbol;
            display();
            switchPlayer();
        }
    }
    const switchPlayer = () => {
        if(currentPlayer == playerOne)
            currentPlayer = playerTwo;
        else
            currentPlayer = playerOne;
    }
    return{
        cells,
        display,
    };
})();



gameBoard.display();