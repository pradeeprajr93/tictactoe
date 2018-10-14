/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    if (grid[colIdx][rowIdx] !== 2 && checkWinner() == 0) {
        grid[colIdx][rowIdx] = newValue;
    } else {
        return;
    }
    renderMainGrid();
    addClickHandlers();
    if (checkWinner() === 0) {
        window.setTimeout(
            function () {
                generateComputerClick()
            },
            300
        );
    } else if (checkWinner() === 1) {
        showUserWinnerVisuals();
    } else if (checkWinner() === 2) {
        showComputerWinnerVisuals();
    }
}

function showUserWinnerVisuals(){
    window.setTimeout(
        function(){
            document.getElementById("tictac-container").className = "parentTop hidden";
            document.getElementById("winner-user").className = "";
        },
        500
    );
}

function showComputerWinnerVisuals(){
    window.setTimeout(
        function(){
            document.getElementById("tictac-container").className = "parentTop hidden";
            document.getElementById("winner-computer").className = "";
        },
        500
    );
}

function showTieVisuals(){
    window.setTimeout(
        function(){
            document.getElementById("tictac-container").className = "parentTop hidden";
            document.getElementById("tie").className = "";
        },
        500
    );
}

function generateComputerClick() {
    let rowIdx = Math.round(Math.random() * 1000) % 3;
    let colIdx = Math.round(Math.random() * 1000) % 3;
    while (grid[colIdx][rowIdx] === 1 || grid[colIdx][rowIdx] === 2) {
        if (isGridFull()) {
            showTieVisuals();
            return;
        }
        rowIdx = Math.round(Math.random() * 1000) % 3;
        colIdx = Math.round(Math.random() * 1000) % 3;
    }
    grid[colIdx][rowIdx] = 2;
    renderMainGrid();
    addClickHandlers();
    if (checkWinner() === 2) {
        showComputerWinnerVisuals();
    }
}

function checkWinner() {
    if (grid[0][0] == grid[0][1] && grid[0][0] == grid[0][2]) {
        return grid[0][0];
    } else if (grid[1][0] == grid[1][1] && grid[1][0] == grid[1][2]) {
        return grid[1][0];
    } else if (grid[2][0] == grid[2][1] && grid[2][0] == grid[2][2]) {
        return grid[2][0];
    } else if (grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2]) {
        return grid[0][0];
    } else if (grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0]) {
        return grid[0][0];
    }else if (grid[0][0] == grid[1][0] && grid[0][0] == grid[2][0]) {
        return grid[0][0];
    } else if (grid[0][1] == grid[1][1] && grid[0][1] == grid[2][1]) {
        return grid[0][1];
    } else if (grid[0][2] == grid[1][2] && grid[0][2] == grid[2][2]) {
        return grid[0][2];
    } else {
        return 0;
    }
}

function isGridFull() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            if (grid[colIdx][rowidx] === 0) {
                return false;
            }
        }
    }
    showTieVisuals();
    return true;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
