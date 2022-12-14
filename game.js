let cells  = document.querySelectorAll('.cell');
cells = Array.from(cells);

console.log(cells);
currentLetter = 'X';
let isGameOver = false;


winPossibilities = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function isWon(){
	let winCondition = 0;
	winPossibilities.forEach(function(possiblity){
		//console.log('possiblity is ' + possiblity);


		possiblity.forEach(function(cellNo){
			//console.log('current cellno '+ cellNo+' '+cells[cellNo].innerText);
			if(cells[cellNo].innerText.trim()===currentLetter)
				{winCondition=winCondition+1; }	
		
		});

		if(winCondition===3){
				isGameOver=true;
				popWinner(possiblity);
				//removeListener();
			}
		winCondition=0;
	


	});
}


function popWinner(possiblity) {
	possiblity.forEach(function(num){
		cells[num].classList.add('pop'); 
	});
	let winner;
	currentLetter==='X'?winner='player1':winner='player2';
	winnerPlayerEle = document.getElementById(winner);
	winnerPlayerEle.classList.add(winner);
	winnerPlayerEle.innerText='Player '+currentLetter+ ' Won!';
}

function removeListener(){
	cells.forEach(function(cell){
		cell.removeEventListener('click');
	});
}

function clearBoard(){

	cells.forEach(function (cell){
	cell.innerText = '';
	if(cell.classList.contains('pop')){
		cell.classList.remove('pop');
	}
});

removePlayer('X');
removePlayer('O');
isGameOver=false;
currentLetter='X';
displayPlayer();
}


function removePlayer(player){
		let prevPlayer;
		if(player==='O'){
			prevPlayer = document.getElementById('player2');
			if(prevPlayer.classList.contains('player2')){
				prevPlayer.classList.remove('player2');
				prevPlayer.innerText='';
			}			
		}
		else{
			prevPlayer = document.getElementById('player1');
			if(prevPlayer.classList.contains('player1')){
				prevPlayer.classList.remove('player1');
				prevPlayer.innerText='';
			}	

		}
}

function displayPlayer()
{
	let currentPlayer;
	if(currentLetter==='X') 
		{
			removePlayer('O');
			currentPlayer = document.getElementById('player1');
			currentPlayer.classList.add('player1');
			currentPlayer.innerText='Player X Turn!';
		}
	else 
	{
		removePlayer('X');
			currentPlayer = document.getElementById('player2');
			currentPlayer.classList.add('player2');
			currentPlayer.innerText='Player O Turn!';
	}	
}

function changePlayer(){

	if(currentLetter==='X') 
		{
			currentLetter = 'O';
		}
	else 
	{
		currentLetter='X';
	}	
}

displayPlayer();
cells.forEach(function (cell){

cell.addEventListener('click', function(){
	
	if(cell.innerText.trim()=='' && !isGameOver){
	cell.innerText = currentLetter;
	isWon();
	changePlayer();
	if(!isGameOver)
	displayPlayer();
	}
});
});

let rstBtn = document.getElementById("reset");
rstBtn.onclick=clearBoard;
