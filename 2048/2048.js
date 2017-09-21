var RN=4,CN=4;//定义总行数总列数

var data;//定义一个空的二维数组
var score=0;//定义一个全局变量保存分数

/**
*启动游戏
*/
function start(){
	//创建一个空数组
	data=[];
	for(var r=0;r<RN;r++){
		data.push([]);
		for(var c=0;c<CN;c++){
			data[r][c]=0;
		}
	}
	//随机生成两个数，并添加到网页中
	for(var i=0;i<2;i++){
		randomNum();
		updateView();
	}
	//打印分数
	addScore(score);
	console.log(data.join("\n"));
	//为当前页面添加键盘按下事件处理函数
	document.onkeydown=function(e){
		e.preventDefault();
		switch(e.keyCode){
			case 37://左移
				moveLeft();
				break;
			case 38://上移
				moveUp();
				break;
			case 39://右移
				moveRight();
				break;
			case 40://下移
				moveDown();
				break;
		}
	}
}
/**
*计分
*/
function addScore(s){
	score+=s;
	var sc=document.getElementById("score");
	sc.innerHTML="Score:"+score;
}

/**
*在data中堆积找一个位置生成2或4
*/
function randomNum(){
	while(1){
		var r=parseInt(Math.random()*RN);
		var c=parseInt(Math.random()*CN);

		if(data[r][c]==0){
			data[r][c]=(Math.random()<0.8)?2:4;
			break;
		}
	}
}

/**
*将生成的数添加到界面中
*/
function updateView(){
	for(var r=0;r<RN;r++){
		for(var c=0;c<CN;c++){
			var id="c"+r+c;
			var div=document.getElementById(id);
			//如果data中r行c列不为0,向其添加;如果等于0，则清空0，因为界面上不会出现0这个数字
			if(data[r][c]!=0){
				div.className="n"+data[r][c];//设置r行c列数字的对应class
				div.innerHTML=data[r][c];
			}else{
				div.innerHTML="";
				div.className="";
			}
			
		}
	}
}

/**
*左移所有行
*/
function moveLeft(){
	//将data转换为字符串保存在before中
	var before=String(data);
	//r从0到<RN
	for(var r=0;r<RN;r++){
		//左移第r行
		moveLeftInRow(r);	
	}		
	//将data转换为字符串保存在after中
	var after=String(data);
	//如果本次发生了移动
	if(before!=after){
		//在一个随机位置生成一个新的2或4
		randomNum();
		//更新页面
		updateView();
	}
}

/**
*左移第r行
*/
function moveLeftInRow(r){
	//c从0开始，到CN-1结束
	for(var c=0;c<CN-1;c++){
		//找c右侧下一个不为0的位置
		var nextc=getNextcInRow(r,c)	
		//如果没找到，则退出循环	
		if(nextc==-1){
			break;
		}else{
		//否则			
		//如果c位置的值为0
			//将nextc位置的值赋值给c位置
			//将nextc位置的值置为0
			//将c-1
			if(data[r][c]==0){
				data[r][c]=data[r][nextc];
				data[r][nextc]=0;
				c--;
			}else if(data[r][c]==data[r][nextc]){
				//否则如果c位置的值等于nextc位置的值
					//将c位置的值*2
					//将nextc位置的值置为0
				data[r][c]*=2;
				data[r][nextc]=0;
				//因为每次只需要合并一次，所以这里并不用将c--
				addScore(data[r][c]);
			}
		}
	}
}

/**
*找r行c列右侧下一个不为0的位置
*/
function getNextcInRow(r,c){
	//nextc从c+1开始，到<CN结束
		//如果data中r行nextc位置不等于0
			//就返回nextc
	//返回-1
	for(var nextc=c+1;nextc<CN;nextc++){
		if(data[r][nextc]!=0){
			return nextc;
		}
	}
	return -1;
}

/**
*右移所有行
*/
function moveRight(){
	var before=String(data);
	for(var r=0;r<RN;r++){
		moveRightInRow(r);
	}
	var after=String(data);
	if(before!=after){
		randomNum();
		updateView();
	}
}

/**
*右移第r行
*/
function moveRightInRow(r){
	for(var c=CN-1;c>0;c--){
		var lastc=getLastcInRow(r,c);
		if(lastc==-1){
			break;
		}else{
			if(data[r][c]==0){
				data[r][c]=data[r][lastc];
				data[r][lastc]=0;
				c++;
			}else if(data[r][c]==data[r][lastc]){
				data[r][c]*=2;
				data[r][lastc]=0;
				addScore(data[r][c]);
			}
		}
	}
}

/**
*找r行c列左侧下一个不为0的位置
*/
function getLastcInRow(r,c){
	for(var lastc=c-1;lastc>=0;lastc--){
		if(data[r][lastc]!=0){
			return lastc;
		}
	}
	return -1;
}

/**
*上移所有列
*/
function moveUp(){
	var before=String(data);
	for(var c=0;c<CN;c++){
		moveUpInCol(c);
	}
	var after=String(data);
	if(before!=after){
		randomNum();
		updateView();
	}
}

/**
*上移第c列
*/
function moveUpInCol(c){
	for(var r=0;r<RN;r++){
		var nextr=getNextrInCol(r,c);
		if(nextr==-1){
			break;
		}else{
			if(data[r][c]==0){
				data[r][c]=data[nextr][c];
				data[nextr][c]=0;
				r--;
			}else if(data[r][c]==data[nextr][c]){
				data[r][c]*=2;
				data[nextr][c]=0;
				addScore(data[r][c]);
			}
		}
	}
}

/**
*找c列r行下方第一个不为零的数
*/
function getNextrInCol(r,c){
	for(var nextr=r+1;nextr<RN;nextr++){
		if(data[nextr][c]!=0){
			return nextr;
		}
	}
	return -1;
}

/**
*下移所有列
*/
function moveDown(){
	var before=String(data);
	for(var c=0;c<CN;c++){
		moveDownInCol(c);
	}
	var after=String(data);
	if(before!=after){
		randomNum();
		updateView();
	}
}

/**
*下移第c列
*/
function moveDownInCol(c){
	for(var r=RN-1;r>0;r--){
		var lastr=getLastrInCol(r,c);
		if(lastr==-1){
			break;
		}else{
			if(data[r][c]==0){
				data[r][c]=data[lastr][c];
				data[lastr][c]=0;
				r++;
			}else if(data[r][c]==data[lastr][c]){
				data[r][c]*=2;
				data[lastr][c]=0;
				addScore(data[r][c]);
			}
		}
	}
}

/**
*找r行c列上方第一个不为零的数
*/
function getLastrInCol(r,c){
	for(var lastr=r-1;lastr>=0;lastr--){
		if(data[lastr][c]!=0){
			return lastr;
		}
	}
	return -1;
}

start();