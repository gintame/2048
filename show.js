// 对随机生成的数值进行设置
function showNumber(i, j, randNumber) {
	var numbercell = document.querySelector("#number-cell-"+i+"-"+j)
	numbercell.style.backgroundColor = getNumberBackGroudColor(randNumber)
	numbercell.style.color = getNumberColor(randNumber)
	numbercell.style.width = "100px"
	numbercell.style.height = "100px"
	numbercell.style.top = getPosTop(i,j)
	numbercell.style.left = getPosLeft(i,j)
	numbercell.textContent = randNumber
}

// 进行动画设置
// 未完成
function showMove(formx, formy, tox, toy) {
	var numbercell = document.querySelector("#number-cell-"+formx+"-"+formy)
}