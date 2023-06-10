var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

const  width=300;
const height=300;
var yrange,xrange,ycenter,xcenter,xlow,ylow,xhigh,yhigh;
var gird=new Array(width);//存储状态二维数
var range0;
range0=10;

function main1()
{
    yrange=0;xrange=0;ycenter=0;xcenter=0;xlow=0;ylow=0;xhigh=0;yhigh=0;
    range0=10;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var pos={x:0,y:0};
    var timeleft=10;
 
   DLA_init();
   function draw()
        {
            var i;
            setrange(range0,range0);
            for(i=0;i<(range0*range0/40);i++)
            {
                DLA_gen(pos);
            }
            range0=range0+20;

        }


    timerID=setInterval(draw,200);
    var countdownID = setInterval(function() {
        timeleft=timeleft-1;
        if(timeleft==0)
        {
            clearInterval(countdownID);
            clearInterval(timerID);
        }
    },200);

 /*
    setrange(400, 400);
    for(i = 0; i < 1000; i++)
    {
        DLA_gen(pos);
    }

    setrange(600, 600);
    for(i = 0; i < 5000; i++)
    {
        DLA_gen(pos);
    }
 
    setrange(700, 700);
    for(i = 0; i < 5000; i++)
    {
        DLA_gen(pos);
    }
    setrange(900, 900);
    for(i = 0; i < 5000; i++)
    {
        DLA_gen(pos);
    }
   

    for(var i=0;i<height;i++)
    {
        for(var j=0;j<width;j++)
        {
            if(gird[i][j]==1)
            {
                drawpoint(i,j);
            }
        }
    }
    */
    return 0;

}

function DLA_init()
{
    var x,y;
    xcenter=width/2;
    ycenter=height/2;
    for(x=0;x<width;x++)
    {
        gird[x]=new Array(height);
        for(y=0;y<height;y++)
        {
            gird[x][y]=0;
        }
    }
    gird[xcenter][ycenter]=1;
    drawpoint(xcenter,ycenter);
}
function walk(pos)
{
    var w=Math.floor(Math.random()*8);//点随机八个方向移动
    switch(w)
    {
        case 0:
            pos.x++;
            break;
        case 1:
            pos.x--;
            break;
        case 2:
            pos.y--;
            break;
        case 3:
            pos.y++;
            break;
        case 4:
            pos.x++;pos.y++;
            break;
        case 5:
            pos.x--;pos.y++;
            break;
        case 6:
            pos.x--;pos.y--;
            break;
        case 7:
            pos.x++;pos.y--;
            break;
        default:
            break;
    }
    //点出边界后移到范围内
    if(pos.x>xhigh) pos.x=xlow;
    if(pos.y>yhigh) pos.y=ylow;
    if(pos.x<xlow) pos.x=xhigh;
    if(pos.y<ylow) pos.y=yhigh;
    return;
}
function isadjacent(x,y)
{
    var xx,yy;
    xx=x+1;
    if(xx>xhigh) xx=xlow;
    if(gird[xx][y]==1) return true;

    yy=y+1;
    if(yy>yhigh) yy=ylow;
    if(gird[xx][yy]==1) return true;
    
    if(gird[x][yy]==1) return true;

    yy=y-1;
    if(yy<ylow) yy=yhigh;
    if(gird[xx][yy]==1) return true;

    if(gird[x][yy]==1) return true;

    xx=x-1;
    if(xx<xlow) xx=xhigh;
    if(gird[xx][yy]==1) return true;

    if(gird[xx][y]==1) return true;

    yy=y+1;
    if(yy>yhigh) yy=ylow;
    if(gird[xx][yy]==1) return true;

    return false;
}
function DLA_gen(pos)
{
    do
    {
        pos.x=Math.floor(Math.random()*xrange)+xlow;
        pos.y=Math.floor(Math.random()*yrange)+ylow;
    }
    while(gird[pos.x][pos.y]==1)

    while(isadjacent(pos.x,pos.y)==false)
    {
        walk(pos);
    }
    gird[pos.x][pos.y]=1;
    drawpoint(pos.x,pos.y);
    return;
}
function setrange(rangex,rangey)
{
    xrange=rangex;
    yrange=rangey;

    xlow=xcenter-xrange/2;
    ylow=ycenter-yrange/2;
    xhigh=xcenter+xrange/2-1;
    yhigh=ycenter+yrange/2-1;

}
function drawpoint(x,y)
{
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.fillStysle="blue";
    ctx.fill();
}
function calculate() {
    // 获取用户输入的参数
    var param1 = Number(document.getElementById("param1").value);
    var param2 = Number(document.getElementById("param2").value);

    // 进行仿真计算
    // ...

    // 绘制仿真图形
   main1();
    //var canvas = document.getElementById("canvas");
    //var ctx = canvas.getContext("2d");
    // 调用canvas API进行绘制
    // ...

    // 展示计算结果
    var table = document.getElementById("results");
    var tbody = table.getElementsByTagName("tbody")[0];
    // 清空表格
    tbody.innerHTML = "";
    // 在表格中添加计算结果
    addRow(tbody, "参数1", param1);
    addRow(tbody, "参数2", param2);
    // ...
}

function addRow(tbody, name, value) {
    var row = tbody.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    cell1.textContent = name;
    cell2.textContent = value;
}
