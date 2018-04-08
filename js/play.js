var clock=null;//定时器操作
var state=0;//0初始化 1暂停 2失败
var speed=10;

/*
初始化
*/
function init(){
    for(var i=0;i<4;i++){
        crow();//预留最后一行没有黑块，不然刚开始就over了
    }
    $('main').onclick=function(ev){
        judge(ev);
    }
}
/*
judge
*/
function judge(ev){
    if(state == 2){
        alert('你已经输啦');//输了之后不能再点
        return;
    }
    if(ev.target.className.indexOf('black') == -1){
        fail();
    }else{
            ev.target.className='cell';
            ev.target.parentNode.pass=1;
            score();
    }
}
/*
start()启动
*/
function start(){
    clock=window.setInterval('move()',30);
}
/*
动画效果
*/
function move(){
    var con = $('container');
    var top=parseInt(window.getComputedStyle(con,null)['top']);//在IE下要用obj.currentStyle
    
    if(speed + top >0){ //如果一步会走过头，就top=0；-13，-8，-3 ，5
        top=0
    }else{
        top +=speed;   //调节每次下降像素
    }
    
    con.style.top=top + 'px';
    if(top == 0){
        crow();
        con.style.top='-480px';
        drow();//创建新行之后，删掉旧行
    }else if(top == (-480+speed)){
        var rows=con.childNodes;
        if((rows.length == 5) && (rows[rows.length-1].pass !== 1)){
            fail();
        }
    }
}
/*
加速
*/
function speedup(){
    speed +=5;
    
}
/*
输，结束
*/
function fail(){
    clearInterval(clock);
    state=2;
    
    var p = document.querySelector("#p1");
    p.style["display"] = "block";
    $('restart').onclick=function(){
    history.go(0);
};

}







/*
计分
*/
function score(){
    var newscore=parseInt($('score').innerHTML)+1;
    $('score').innerHTML=newscore;
    if(newscore % 10 == 0){
        speedup();
    }
}
/*
创建div.row,div class=row
*/
function crow(){
    var con = $('container');
    var row=cdiv('row');
    var classes=createSz();
    for(var i=0;i<4;i++){
        row.appendChild(cdiv(classes[i]));//把数组随机的单元值传进来
    }
    if(con.firstChild == null){
        con.appendChild(row);//把row塞到container里面
    }else{
        con.insertBefore(row,con.firstChild);//如果container已经有第一个子元素，则塞到第一个孩子前面
    }
}
/*
删除最后一行
*/
function drow(){
    var con = $('container');
    if(con.childNodes.length == 6){
    con.removeChild(con.lastChild);
    }
}
/*
创建div，className是其类名
*/
function cdiv(className){
    var div=document.createElement('div');
    div.className=className;
    return div;
}
/*
返回一个数组，随机其中一个单元，类名为'cell black'，其它均为'cell '
*/
function createSz(){
    var arr=['cell','cell','cell','cell'];
    var i=Math.floor(Math.random()*4);//对浮点数向下取整
    arr[i]='cell black';
    return arr;
}
/*
按id获取对象
*/
function $(id){
    return document.getElementById(id);
}
init();
start();






  