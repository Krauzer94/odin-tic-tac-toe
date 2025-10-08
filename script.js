
// Initial Gameboard module
const Gameboard = (() => {
    // Initialize board fields
    let board = [ "", "", "", "", "", "", "", "", "" ];

    // Get current board state
    const getBoardState = () => board;

    // Set X/O into the specified position
    const setPlayerMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
        };
    };

    // Board reset routine
    const resetBoardState = () => {
        board = [ "", "", "", "", "", "", "", "", "" ];
    };

    // Module output values
    return {
        getBoardState,
        setPlayerMark,
        resetBoardState
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
    let mainPlayer = players[0];

    // Initial game status
    let gameOver = false;

    // Check for endgame conditions
    const checkGameStatus = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6]             // Diagonal
        ];
    }

    // Validates win conditions
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return `${mainPlayer.name} wins!`;
        }
    }

    // Checks for tie condition
    if (board.every(cell => cell !== "")) {
        return "It's a tie!";
    }

    // WIP: Switch player turns
})();
