var Calendar = function(id){
	
	this.id ="calendar";
	this.date= new Date();   //时间默认是当前时间       Tue Sep 27 2016 16:26:26 GMT+0800 (中国标准时间)
	this.year=this.date.getFullYear();   //今年
	this.monthx=this.date.getMonth()+1;   //当月
	this.month =(this.monthx<10 ? "0"+this.monthx:this.monthx); //当月转变
	this.maxyear=3000;   //最大年
	this.maxmonth =12; //最大月
	this.startyear=this.date.getFullYear();;       //起始年
	this.startmonth=(this.monthx<10 ? "0"+this.monthx:this.monthx);      //起始月
	this.day = this.date.getDate();   //当日
	this.signdaylist=[];           //进行标记的时间列表 {"24":4,"25":1,"26":2,"27":3,"28":5,"20":6,"19":7}  //记录当月日期状态
	this._skeleton = $("#"+this.id+"");  //初始化元素
	window.addEventListener("resize", orientationChange, false);   //事件监听重新渲染宽度
	var host =this;
	function orientationChange(){   
		var num =window.orientation;                  //获取屏幕的横竖屏状态值
		host.renderWidth();
	}   
}
 /**
   * 获取上一个月
   *
   * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
   */
Calendar.prototype.getPreMonth=function (date){          //date格式化成字符串当前时间2016-09-27
            var arr = date.split('-');
            var year = parseInt(arr[0]); //获取当前日期的年份
            var month =parseInt(arr[1]); //获取当前日期的月份
            var day = parseInt(arr[2]); //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;            
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
           
            //var t2 = year2 + '-' + month2 + '-' + day2;
            return {year:year2,month:month2}
        }
        
        /**
         * 获取下一个月
         *
         * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
         */        
Calendar.prototype.getNextMonth=function (date){
            var arr = date.split('-');
           var year = parseInt(arr[0]); //获取当前日期的年份
            var month =parseInt(arr[1]); //获取当前日期的月份
            var day = parseInt(arr[2]); //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            
        
           // var t2 = year2 + '-' + month2 + '-' + day2;
            return  {year:year2,month:month2};
        }


Calendar.prototype.premonth=function(year,month){
	//alert(""+year+"年"+month+"月")
	//对日历重新渲染
	//this.render();
}
Calendar.prototype.nextmonth=function(year,month){
	//alert(""+year+"年"+month+"月")
	//对日历重新渲染
	//this.render();
}
Calendar.prototype.dayclick=function(li,showday,year,month,day){
	//alert(""+year+"年"+month+"月"+day+"日")
	//进行相关操作
}
Calendar.prototype.render=function(){                                    //样式渲染（渲染35天）
	if(this.month<10){
		this.month="0"+this.month*1;
	}
	this._skeleton.html("");
	this.date= new Date(""+this.year+"-"+this.month+"");                //当前年月
    // 渲染的时候默认是当前年月（日默认是1日，时间默认是8点）
	var date=this.date;                                         //当前年月
	var maxday =new Date(this.year,this.month,0).getDate();
	var formatdate=""+this.year+"-"+this.month+"-"+this.day+"";
	//console.log(formatdate);
	var premonth=this.getPreMonth(formatdate);                                                                         //获取上个月(包含年月对象)
	//console.log(premonth);
	var premonth_maxday = new Date(premonth.year,premonth.month,0).getDate();
    var nextmonth=this.getNextMonth(formatdate);                                                              //获取下个月（包含年月对象）
	var nextmonth_maxday = new Date(nextmonth.year,nextmonth.month,0).getDate();
	/*获取当月第一天是星期几*/
	var firstweekday_data = this.date;
	firstweekday_data.setDate(1);
	var firstweekday =firstweekday_data.getDay();
	/*获取当月最后一天是星期几*/
	var lastweekday_data = this.date;
	lastweekday_data.setDate(maxday);
	var lastweekday_data =lastweekday_data.getDay();
	var monthstr = this.month;
	if(this.month<10) {monthstr="0"+this.month}
	var btndiv  =  document.createElement("div");
	btndiv.className="btndiv";
	var xdwdd=monthstr+"";
	if(monthstr<10){
	     xdwdd="0"+monthstr*1;
	}
	btndiv.innerHTML="<a class='leftbtn'><</a>"+
	
					  "<span class='text'>"+this.year+"年"+xdwdd+"月</span>"+
					  "<a  class='rigtbtn'>></a>";
	this._skeleton.append(btndiv);                                                                        //渲染头部及头部的相关操作
	var instance = this;                                 //当前对象
	if(this.startyear==this.maxyear&this.startmonth>=this.maxmonth){//当最大年月==起始年月  左右按钮都禁止使用        //
		$(".rigtbtn",this._skeleton).addClass("gray");
		$(".leftbtn",this._skeleton).addClass("gray");
	}
	else if(this.year == this.maxyear&this.month==this.maxmonth){//当前选择的年月等于最大年月，>右边加月禁止使用
		$(".rigtbtn",this._skeleton).addClass("gray");
		$(".leftbtn",this._skeleton).click(function(){                                                    //回调函数传参
			instance.year=premonth.year;
			instance.month=premonth.month;
			instance.premonth(instance.year,instance.month);
		});
	}
	else if(this.startyear>0&this.year == this.startyear&this.startmonth>0&this.month==this.startmonth){//当起始年月等于当前年月，左边减月禁止使用
		$(".leftbtn",this._skeleton).addClass("gray");
		$(".rigtbtn",this._skeleton).click(function(){
			instance.year=nextmonth.year;
			instance.month=nextmonth.month;
			instance.nextmonth(instance.year,instance.month);
		});
	}
	else{
		$(".leftbtn",this._skeleton).click(function(){
			instance.year=premonth.year;
			instance.month=premonth.month;
			instance.premonth(instance.year,instance.month);
		});
		$(".rigtbtn",this._skeleton).click(function(){
			instance.year=nextmonth.year;
			instance.month=nextmonth.month;
			instance.nextmonth(instance.year,instance.month);
		});
	}
	var weekdiv =  document.createElement("div");
	weekdiv.className="weekdiv";
	weekdiv.innerHTML="<span>周日</span>"+
					  "<span>周一</span>"+
					  "<span>周二</span>"+
					  "<span>周三</span>"+
					  "<span>周四</span>"+
					  "<span>周五</span>"+
					  "<span>周六</span>";
	this._skeleton.append(weekdiv);                              //渲染周期
	var ul =document.createElement("ul");                        //渲染日期及下面的日期操作
	this._skeleton.append(ul);
	var pre_inday=premonth_maxday-firstweekday+1;
	for(var i=pre_inday;i<premonth_maxday+1;i++){                //遍历上个月的日期
		var li = document.createElement("li");
		var span = document.createElement("span");
		span.innerHTML=i;		
		$(li).addClass("gray");
		$(li).append(span);
		$(ul).append(li);
	}	
	var year=this.year;
	var month=this.month;
	for(var i=0;i<maxday;i++){                                               //对当月日期进行标记
		var li = document.createElement("li");
		var span = document.createElement("span");
		span.innerHTML=i+1;		
		li.id=i+1<10?'0'+(i+1):i+1;  //转换成日，月都是两位
		//(this.monthx<10 ? "0"+this.monthx:this.monthx);
		var date=""+year+month+li.id;       //20161121
		//console.log(date);                 //2016101   20161010
		var signlist =  this.signdaylist;  //{24:1}
		if(signlist && signlist.length>0){
			/*if(i==0){
				debugger;
			}*/
			console.log(123);
			for(var j=0;j<signlist.length;j++){
				if(signlist[j] && (signlist[j]['key']==date)){
					$(li).addClass("checked");
				}
			}
		}
		$(li).click(function(){		
			var showday=true;
			if($(this).hasClass("checked")){            //用于toggle
				/*$("#day_des").hide();
				$("#month_des").show();*/
				$(this).removeClass("checked");
				showday =false;
			}
			else{
				//$(this).parent().children().removeClass("checked");	   //用于单选，移除所有
				$(this).addClass("checked");
				/*$("#day_des").show();
				$("#month_des").hide();*/
				showday =true;
			}
			instance.dayclick(this,showday,instance.year,instance.month,this.id);       //触发的回调函数，（当前的li,当前的显示状态，当前年，当前月，当前的日）
		});                  //当前月的日期操作
		
		if(month==(new Date().getMonth()+1)&&(i+1)<new Date().getDate()){
			$(li).addClass("gray");
			$(li).off('click');
			$(li).append(span);
		}else{
			$(li).append(span);
		}

		//$(li).append(span);
		$(ul).append(li);
	}                            //遍历这个月的日期

	for(var i=1;i<(7-lastweekday_data);i++){            //遍历35天的最后几天（下个月）

		var li = document.createElement("li");
		var span = document.createElement("span");
		span.innerHTML=i;
		
		$(li).addClass("gray");
		$(li).append(span);
		$(ul).append(li);
	}	                                               // //遍历35天的最后几天（下个月）
	
	this.renderWidth();                       //进行宽度大小渲染
	
}

Calendar.prototype.renderWidth=function(){                    //宽度的渲染
	var ul_width = $("ul",this._skeleton).width();
	var li_width = ul_width/7;
	$("span",$(".weekdiv")).width(li_width);
	$(".leftbtn",$(".btndiv")).width(li_width);
	$(".rigtbtn",$(".btndiv")).width(li_width);
	$(".text",$(".btndiv")).width(ul_width-li_width*2);
	$("li",this._skeleton).width(li_width);
}