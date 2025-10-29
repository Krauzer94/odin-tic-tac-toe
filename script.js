
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
        }
        return false;
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

    // Expose module methods
    return {
        getBoardState,
        setPlayerMark,
        resetBoardState,
        renderBoard,
    };
})();

// Isolate modal behavior
const playerNameModal = (() => {
    // Main elements query
    const namePlayerDialog = document.getElementById("namePlayerDialog");
    const confirmBtn = document.getElementById("confirmBtn");

    // Player name fields
    const firstPlayerInput = document.getElementById("firstPlayerName");
    const secondPlayerInput = document.getElementById("secondPlayerName");

    // Store player names
    const playerNames = {
        firstPlayerName: "",
        secondPlayerName: "",
    };

    // Auto open dialog
    namePlayerDialog.showModal();

    // Handle info submission
    confirmBtn.addEventListener("click", (event) => {
        // Prevent premature page reloading
        event.preventDefault();

        // Process input values
        const firstName = firstPlayerInput.value.trim();
        const secondName = secondPlayerInput.value.trim();

        // Basic validation
        if (!firstName || !secondName) {
            alert("Please enter names for both players.");
            return;
        }

        // Save player names
        playerNames.firstPlayerName = firstName;
        playerNames.secondPlayerName = secondName;

        // Close the modal
        namePlayerDialog.close();

        // Show who starts
        const statusDisplay = document.querySelector(".status");
        if (statusDisplay) {
            statusDisplay.textContent = `${playerNames.first} ✖️ vs ${playerNames.second} ⭕`;
        }
    });

    // Expose player names
    return {
        getNames: () => playerNames
    };
})();

// Module to control game flow
const GameController = (() => {
    // Name players before starting
    const { firstPlayerName, secondPlayerName } = playerNameModal.getNames();

    // Distinct player elements
    const players = [
        { name: firstPlayerName, mark: "✖️" },
        { name: secondPlayerName, mark: "⭕" }
    ];

    // Distinguish player turn
    let mainPlayerIndex = 0;

    // Initial game status
    let gameOver = false;

    // Player round validation
    const getCurrentPlayer = () => players[mainPlayerIndex];
    const switchPlayer = () => { mainPlayerIndex = 1 - mainPlayerIndex };

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
        // Ignore clicks if game ended
        if (gameOver === true) return;

        // Identify clicked cell
        const cellIndex = parseInt(event.target.getAttribute("data-index"));
        const player = getCurrentPlayer();

        // Attempt to set player mark
        const validInput = Gameboard.setPlayerMark(cellIndex, player.mark);

        // Ignore if already filled
        if (!validInput) return;

        // Evaluate game status
        const status = checkGameStatus(Gameboard.getBoardState());
        if (status) {
            gameOver = true;
            displayEndStatus(status);
        } else {
            switchPlayer();
            displayTurnMessage();
        }
    };

    // Show player switch message
    const displayTurnMessage = () => {
        const statusDisplay = document.querySelector(".status");
        const player = getCurrentPlayer();
        statusDisplay.textContent = `${player.name} turn`;
    };

    // Show endgame status
    const displayEndStatus = (result) => {
        const statusDisplay = document.querySelector(".status");
        if (result === "tie") {
            statusDisplay.textContent = "It's a tie!";
        } else {
            const winner = players.find(player => player.mark === result);
            statusDisplay.textContent = `${winner.name} wins!`;
        }
    };

    // Game restart handling
    const restartGame = () => {
        Gameboard.resetBoardState();
        gameOver = false;
        mainPlayerIndex = 0;
        displayTurnMessage();
    };

    // Player round processing
    const playGame = () => {
        // Handle cell click events
        const cells = document.querySelectorAll(".board-cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", handleClick);
        });

        // Handle game restart event
        const restartButton = document.querySelector(".restart-btn");
        restartButton.addEventListener("click", restartGame);

        // Reset game if applicable
        Gameboard.renderBoard();
        displayTurnMessage();
    };

    // Expose module methods
    return { playGame };
})();

// Initialize game on load
GameController.playGame();
