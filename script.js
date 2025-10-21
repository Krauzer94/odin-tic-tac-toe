
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

            // Update board display
            renderBoard();
            return true;
        } else {
            alert("Cell already taken! Try again.");
            return false;
        }
    };

    // Board reset routine
    const resetBoardState = () => {
        board = [ "", "", "", "", "", "", "", "", "" ];
        renderBoard();
    };

    // Draw the board in the UI
    const renderBoard = () => {
        const cells = document.querySelectorAll(".board-cell");
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    // Module output values
    return {
        getBoardState,
        setPlayerMark,
        resetBoardState,
        renderBoard,
    };

})();

// Module to control game flow
const GameController = (() => {
    // Distinct player elements
    const players = [
        { name: "Player 1", mark: "✖️" },
        { name: "Player 2", mark: "⭕" }
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
                return board[a];
            }
        }

        // Checks for tie condition
        if (board.every((cell) => cell !== "")) return "tie";

        // Round continuation
        return null;
    };

    // Mouse interaction handling
    const handleClick = (event) => {
        if (gameOver = true) return;

        // Identify clicked cell
        const cellIndex = parseInt(event.target.getAttribute("data-index"));
        const player = getCurrentPlayer();

        // Attempt to set player mark
        const validInput = Gameboard.setPlayerMark(cellIndex, player.mark);

        // Ignore if already filled
        if (!validInput) return;

        // Evaluate game status
        if (status) {
            gameOver = true;
            displayEndStatus(status);
        } else {
            switchPlayer();
            displayTurnMessage();
        }
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
