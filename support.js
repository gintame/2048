// 
function getPosTop(i,j) {
	return 20 + i * 120 + "px"	
}
// 
function getPosLeft(i,j) {
	return 20 + j * 120 + "px"
}
// 对不同数字的格子进行颜色变化
function getNumberBackGroudColor(number) {
	switch(number) {
		case 2 : return "#eee4da"; break;
		case 4 : return "#ede0c8"; break;
		case 8 : return "#f2b179"; break;
		case 16 : return "#f59563"; break;
		case 32 : return "#f67c5f"; break;
		case 64 : return "#f65e3b"; break;
		case 128 : return "#edcf72"; break;
		case 256 : return "#edcc61"; break;
		case 512 : return "#9c0"; break;
		case 1024 : return "#33b5e5"; break;
		case 2048 : return "#09c"; break;
		case 4096 : return "#a6c"; break;
		case 8192 : return "#93c"; break;
	}
	return "black"
}

function getNumberColor(number) {
	if(number <= 4){
		return "#776e65"
	}
	return "white"
}

// 玩家操作
// 判断是否能向左移
function canMoveLeft(board) {
	// 对向左移的值进行判断，当向左方的部分有空位或有相邻的值相等时，才能进行移动
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j-1] == 0 && board[i][j] != 0 ){
				console.log('有空位'+'----------------')
				return true
			}
			if(board[i][j-1] != 0 && board[i][j-1] == board[i][j]){
				// console.log('有相邻值相等')
				return true
			}
		}
	}
	console.log('ceshi')
	return false
}

// 判断是否能往右移
function canMoveRight(board) {
	for(var i = 0; i < 4; i++){
		for(var j = 2; j >= 0; j--){
			if(board[i][j+1] == 0 && board[i][j] != 0 ){
				// console.log('有空位'+'----------------')
				return true
			}
			if(board[i][j+1] != 0 && board[i][j+1] == board[i][j]){
				// console.log('有相邻值相等')
				return true
			}
		}
	}
	return false
}


// 判断是否能向上移动
function canMoveTop(board) {
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i-1][j] == 0 && board[i][j] != 0 ){
				// console.log('有空位'+'----------------')
				return true
			}
			if(board[i-1][j] != 0 && board[i-1][j] == board[i][j]){
				// console.log('有相邻值相等')
				return true
			}
		}
	}
	return false
}

// 判断是否能向下移动
function canMoveBottom(board) {
	for(var i = 2; i >=0; i--){
		for(var j = 0; j < 4; j++){
			// if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
			// return true
			if(board[i+1][j] == 0 && board[i][j] != 0 ){
				// console.log('有空位'+'----------------')
				return true
			}
			if(board[i+1][j] != 0 && board[i+1][j] == board[i][j]){
				// console.log('有相邻值相等')
				return true
			}
		}
	}
	return false
}

// 判断左侧没有格子阻拦
function noBlockLeft(row,col1,col2,board) {
	 for(var i = col2 + 1; i < col1; i++){
		 if(board[row][i] != 0){
			 return false
		 }
	 }
	 return true
}

// 判断右侧没有格子阻拦
function noBlockRight(row,col1,col2,board) {
	for(var i = col2 - 1; i > col2; i--){
		if(board[row][i] != 0){
			return false
		}
	}
	return true
}


// 判断上侧没有格子阻拦
function noBlockTop(row1,col,row2,board){
	for(var i = row2 + 1; i < row1; i++){
		if(board[i][col] != 0){
			return false
		}
	}
	return true
}

// 判断下侧没有格子阻拦
function noBlockBottom(row1,col,row2,board){
	for(var i = row2 + 1; i < row1; i--){
		if(board[i][col] != 0){
			return false
		}
	}
	return true
}