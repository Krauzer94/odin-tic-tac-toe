
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
