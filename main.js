// 初始化二维数组(格子坐标)
var board = new Array()
// 游戏初始化
newGame()

// 开始新游戏
function newGame() {
	// 初始化游戏
	init()
	// 随机生成两个格子数字
	getOneNumber()
	getOneNumber()
}
// 游戏初始化
function init() {
	// 将每一个格子位置摆放整齐
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var gridcell = document.querySelector("#grid-cell-"+i+"-"+j)
			gridcell.style.top = getPosTop(i,j)
			gridcell.style.left = getPosLeft(i,j)
		}
	}
	// 创建二维数组，对应每个格子的坐标
	for(var i = 0; i < 4; i++){
		board[i] = new Array()
		for(var j = 0; j < 4; j++){
			board[i][j] = 0
		}
	}
	// 更新格子视图
	updateBoardView()
}

function updateBoardView() {
	// 清除所有的格子内容
	var allNumberCell = document.querySelectorAll(".number-cell")
	var hasNumberCell = document.querySelector(".number-cell")
	if(hasNumberCell){
		for(var i = 0; i < 16; i++){
			hasNumberCell.parentNode.removeChild(hasNumberCell)
			hasNumberCell = document.querySelector(".number-cell")
		}
	}
	
	// 将格子内容添加到格子中
	var graidContainer = document.querySelector("#grid-contain")
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var numbercell = document.createElement("div")
			numbercell.className = "number-cell"
			numbercell.id = "number-cell-"+i+"-"+j
			// graidContainer.appendChild('<div class="number-cell" id="numbercell-"+i+"-"+j></div>')
			graidContainer.appendChild(numbercell)
			if(board[i][j] == 0){
				numbercell.style.width = "0px"
				numbercell.style.height = "0px"
				numbercell.style.top = getPosTop(i,j)
				numbercell.style.left = getPosLeft(i,j)
			}else {
				numbercell.style.width = "100px"
				numbercell.style.height = "100px"
				numbercell.style.top = getPosTop(i,j)
				numbercell.style.left = getPosLeft(i,j)
				numbercell.style.backgroundColor = getNumberBackGroudColor(board[i][j])
				numbercell.style.color = getNumberColor(board[i][j])
				numbercell.textContent = board[i][j]
			}
		}
	}
}

// 获得一个新的值为2或4的格子
function getOneNumber() {
	setTimeout(function () {
		var randx = parseInt(Math.floor(Math.random() * 4))
		var randy = parseInt(Math.floor(Math.random() * 4))
		// 避免取到已有有效值的格子
		while(true) {
			// 当格子值为0时，认为这次随机获取的格子有效
			if(board[randx][randy] == 0){
				break;
			}
			// 当没满足前面条件时，重新获取随机值，并重新判断
			randx = parseInt(Math.floor(Math.random() * 4))
			randy = parseInt(Math.floor(Math.random() * 4))
		}

		// 初始化值为2或4
		var randNumber = Math.random() < 0.5 ? 2 : 4
		board[randx][randy] = randNumber


		showNumber(randx,randy,randNumber)
		return true
	})
	// 随机获取一个格子的坐标
}

// 添加事件，键盘落下事件
document.addEventListener("keydown", keyDown)
function keyDown(event) {
	// 对键位进行设置，键盘的上下左右分别对应着不同的事件
	switch(event.keyCode){
		case 37:
		if(moveLeft()){
			getOneNumber()
		}
		break;
		case 38:
		if(moveTop()){
			getOneNumber()
		}
		break;
		case 39:
		if(moveRight()){
			getOneNumber()
		}
		break;
		case 40:
		if(moveBottom()){
			getOneNumber()
		}
		break;
	}
}

// 向左移动
function moveLeft() {
	if(!canMoveLeft(board)){
		console.log('false')
		return false
	}
	
	// moveLeft
	// 判断向左移的情况
	for(var i = 0; i < 4; i++){
		// 最左边的值不需要考虑
		for(var j = 1; j < 4; j++){
			// 在一行内，对前一个值与后一个值作比较
			for(var k = 0; k < j; k++){
				// 当前一个值为0时且在前面没有其他格子挡住时，移动格子
				if(board[i][k] == 0 && noBlockLeft(i,j,k,board)){
					// 添加动画效果，未完成
					showMove(i,j,i,k)
					// 移动格子其实就是变化格子的值
					board[i][k] = board[i][j]
					board[i][j] = 0
					continue;
				}
				// 当遇到相邻格子值相等时且中间没有其他格子，计算两者的和
				else if(board[i][k] == board[i][j] && noBlockLeft(i,j,k,board)){
					// move
					// add
					// 添加动画效果，未完成
					showMove(i,j,i,k)
					board[i][k] += board[i][j]
					board[i][j] = 0
					continue;
				}
			}
		}
	}
	// 更新视图
	updateBoardView()
	return true
}

// 向右移动
function moveRight() {
	if(!canMoveRight(board)){
		console.log('false')
		return false
	}
	// moveRight
	for(var i = 0; i < 4 ; i++){
		for(var j = 2; j >= 0; j--){
			
			for(var k = 3; k > j ; k--){
				if(board[i][k] == 0 && noBlockRight(i,j,k,board)){
					// move
					showMove(i,j,i,k)
					board[i][k] = board[i][j]
					board[i][j] = 0
					
					continue;
				}
				else if(board[i][k] == board[i][j] && noBlockRight(i,j,k,board)){
					// move
					// add
					showMove(i,j,i,k)
					board[i][k] += board[i][j]
					board[i][j] = 0
					continue;
				}
			}
		}
	}
	updateBoardView()
	return true
}







// 向上移动
function moveTop() {
	if(!canMoveTop(board)){
		console.log('false')
		return false
	}
	// moveTop
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			
			for(var k = 0; k < i; k++){
				if(board[k][j] == 0 && noBlockTop(i,j,k,board)){
					// move
					console.log(i,j,k)
					showMove(i,j,k,j)
					board[k][j] = board[i][j]
					board[i][j] = 0
					
					continue;
				}
				else if(board[k][j] == board[i][j] && noBlockTop(i,j,k,board)){
					// move
					// add
					showMove(i,j,k,j)
					board[k][j] += board[i][j]
					board[i][j] = 0
					continue;
				}
			}
		}
	}
	updateBoardView()
	return true
}

// 向上移动
function moveBottom() {
	if(!canMoveBottom(board)){
		console.log('false')
		return false
	}
	
	// moveBottom
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			for(var k = 3; k > i; k--){
				if(board[k][j] == 0 && noBlockBottom(i,j,k,board)){
					// move
					console.log(i,j,k)
					showMove(i,j,k,j)
					board[k][j] = board[i][j]
					board[i][j] = 0
					continue;
				}
				else if(board[k][j] == board[i][j] && noBlockBottom(i,j,k,board)){
					// move
					// add
					showMove(i,j,k,j)
					board[k][j] += board[i][j]
					board[i][j] = 0
					
					continue;
				}
			}
		}
	}
	updateBoardView()
	return true
}


