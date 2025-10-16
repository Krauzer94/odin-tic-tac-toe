
// Initial Gameboard module
const Gameboard = (() => {
    // Initialize board fields
    let board = [ "", "", "", "", "", "", "", "", "" ];

    // Get current board state
    const getBoardState = () => board;

    // Set X/O into the specified position
    const setPlayerMark = (index, mark) => {
        // Validate cell availability
        if (board[index] === "") {
            board[index] = mark;
            return true;
        } else {
            alert("Cell already taken! Try again.");
            return false;
        }
    };

    // Board reset routine
    const resetBoardState = () => {
        board = [ "", "", "", "", "", "", "", "", "" ];
    };

    // Draw the board in console
    const drawGameBoard = () => {
        console.log(`
${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
---------
${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
---------
${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
        `);
    };

    // Module output values
    return {
        getBoardState,
        setPlayerMark,
        resetBoardState,
        drawGameBoard,
    };

})();

// Module to control game flow
const GameController = (() => {
    // Distinct player elements
    const players = [
        { name: "Player 1", mark: "X" },
        { name: "Player 2", mark: "O" }
    ];

    // Distinguish player turn
    let mainPlayerIndex = 0;

    // Initial game status
    let gameOver = false;

    // Player round validation
    const getCurrentPlayer = () => players[mainPlayerIndex];
    const switchPlayer = () => { mainPlayerIndex = 1 - mainPlayerIndex; };

    // Check for endgame conditions
    const checkGameStatus = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6]             // Diagonal
        ];

        // Validates win conditions
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                const winnerMark = board[a];
                const winnerPlayer = players.find(p => p.mark === winnerMark);
                gameOver = true;

                // Announces winner
                return `${winnerPlayer.name} wins!`;
            }
        }

        // Checks for tie condition
        if (board.every(cell => cell !== "")) {
            gameOver = true;
            return "It's a tie!";
        }

        // Round continuation
        return null;
    };

    // Player round processing
    const playGame = () => {
        // Refresh round status
        Gameboard.resetBoardState();
        gameOver = false;
        mainPlayerIndex = 0;
        hasDrawnBefore = false;

        // Draw initial board once
        console.clear();
        Gameboard.drawGameBoard();
        hasDrawnBefore = true;

        // Ensure game continuation
        while (!gameOver) {
            const player = getCurrentPlayer();
            let move = prompt(`\n${player.name} (${player.mark}): chose a cell (0~8)\n`);

            // Invalid input handling
            const index = parseInt(move);
            if (isNaN(index) || index < 0 || index > 8) {
                alert(`Invalid input! (0-8 only)`);
                continue;
            }

            // Valid input handling
            const validInput = Gameboard.setPlayerMark(index, player.mark);
            if (!validInput) continue;

            // Clear console and redraw board
            if (hasDrawnBefore) console.clear();
            Gameboard.drawGameBoard();

            // Evaluate game status
            const status = checkGameStatus(Gameboard.getBoardState());
            if (status) {
                console.log(`\nGame status: ${status}\n`);
                gameOver = true;
                break;
            }

            // Alternate players
            switchPlayer();
        }

        // Announce end of game
        alert(`Game over!`);
    };

    // Module output
    return { playGame };
})();

// // Start the game
// GameController.playGame();
