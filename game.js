let Result = require('./structureResult.js');

var board= generateBoard(3,3);
console.log(board);
var myResult=evaluateBoard(board);
console.log(myResult);

//Generate the Tic Tac Toe game board according to n and m values.
function generateBoard(n,m){
    try{
        [...arguments].forEach(element => {
            checkIfIsValidInput(element)
        });
        var board= [...new Array(n)].map(elem => new Array(m));
        randomFillBoard(board);
        return board;
    }
    catch(err){
        console.log(err);
    }
}

//Check if the input is not a number, or is negative or is a decimal number. 
function checkIfIsValidInput(x){
    if(isNaN(x) || x<=0 || !Number.isInteger(x))
        throw `The input ${x} is not a valid, please insert an integer number greater than zero.`
}

//Randomlly fill the board with x's and o's
function randomFillBoard(board){
    var n=board.length;
    var m=board[0].length;
    var Length=n*m;
    var placeOptions= new Array();
    goTroughBoard(board,createArrayBoardOptionsFunc,placeOptions);

    for(var i=1;i<Length +1; i++){
        var input= (i%2==0) ? "o" : "x";
        var randomPlace=Math.floor(Math.random() * placeOptions.length)
        var randomValue = placeOptions[randomPlace];
        placeOptions.splice(randomPlace,1);
        var row=parseInt(randomValue.split("_")[0]);
        var column=parseInt(randomValue.split("_")[1]);
        board[row][column]=input;
    }
}

function createArrayBoardOptionsFunc(i,j,board,arrayOptions){
    arrayOptions.push(`${i}_${j}`);
}

function goTroughBoard(board, functionToDo, toModify){
    var n=board.length;
    var m=board[0].length;

    for(var i=0;i<n;i++){
        for(var j=0;j<m;j++){
            functionToDo(i,j,board,toModify)
        }
    }
}

function copyBoardFunc(i,j,board,newBoard){
    newBoard[i][j]=board[i][j];
}

function evaluateBoard(board){
    var n=board.length;
    var m=board[0].length;

    var result=new Result();
    result.runsForX=0
    result.runsForO=0
    var newBoard= [...new Array(n)].map(elem => new Array(m));
    result.resultBoard=newBoard;
    //Copy original board to result board
    goTroughBoard(board,copyBoardFunc,newBoard);

    //Check vertical runs for 'x' and for 'o':
    for(var j=0;j<m;j++){
        if(CheckColumn(j,board,result.resultBoard,"x")==true){
            result.runsForX++;
        }
        else{
            if(CheckColumn(j,board,result.resultBoard,"o")==true){
                result.runsForO++;
            };
        }
    }
    //Check horizontal runs for 'x' and for 'o':
    for(var i=0;i<n;i++){
        if(CheckRow(i,board,result.resultBoard,"x")==true){
            result.runsForX++;
        }
        else{
            if(CheckRow(i,board,result.resultBoard,"o")==true){
                result.runsForO++;
            };
        }
    }

    //if is a square tic tac toe count also the diagonals
    if(n==m){
        //For the principal diagonal
        if(checkPrincipalDiagonal(board,result.resultBoard,"x")==true){
            result.runsForX++;
        }
        else{
            if(checkPrincipalDiagonal(board,result.resultBoard,"o")==true){
                result.runsForO++;
            }
        }

        //For the second diagonal
        if(checkSecondDiagonal(board,result.resultBoard,"x")==true){
            result.runsForX++;
        }
        else{
            if(checkSecondDiagonal(board,result.resultBoard,"o")==true){
                result.runsForO++;
            }
        }
    }

    return result;
}
function CheckColumn(columnIndex, board, boardToModify, xorO) {
    var n=board.length;
    flag=true;
    for(var i=0;i<n;i++){
        if(board[i][columnIndex]!=xorO){
            flag=false;
            i=n;
        }
    }
    if(flag==true){
        for(var i=0;i<n;i++){
            boardToModify[i][columnIndex]=xorO.toUpperCase();
        }
    }
    return flag;
}

function CheckRow(rowIndex, board, boardToModify, xorO) 
{
    var m=board[0].length;
    flag=true;
    for(var j=0;j<m;j++){
        if(board[rowIndex][j]!=xorO){
            flag=false;
            j=m;
        }
    }
    if(flag==true){
        for(var j=0;j<m;j++){
            boardToModify[rowIndex][j]=xorO.toUpperCase();
        }
    }
    return flag;
}

function checkPrincipalDiagonal(board,boardToModify, xorO){
    var n=board.length;
    flag=true;
    for(var i=0;i<n;i++){
        if(board[i][i]!=xorO){
            flag=false;
            i=n;
        }
    }
    if(flag==true){
        for(var i=0;i<n;i++){
            boardToModify[i][i]=xorO.toUpperCase();
        }
    }
    return flag;
}

function checkSecondDiagonal(board,boardToModify, xorO){
    var n=board.length;
    flag=true;
    for(var i=0,j=n-1;i<n;i++,j--){
        if(board[i][j]!=xorO){
            flag=false;
            i=n;
        }
    }
    if(flag==true){
        for(var i=0,j=n-1;i<n;i++,j--){
            boardToModify[i][j]=xorO.toUpperCase();
        }
    }
    return flag;
}
