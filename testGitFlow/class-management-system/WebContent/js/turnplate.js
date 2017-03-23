var turnplate = {
	turnplateBox : $('#turnplate'), 
	turnplateBtn : $('#platebtn'), // 点击抽奖按钮
	lightDom : $('#turnplatewrapper'),
	msgBox : $('#msg'),
	height : '496', //转盘高宽
	minResistance : 5, //基本阻力
	Cx : 0.01, //阻力系数 阻力公式：  totalResistance = minResistance + curSpeed * Cx;	
	accSpeed : 15, //加速度
	accFrameLen : 40, //加速度持续帧数
	maxSpeed : 250, //最大速度 
	minSpeed : 20, //最小速度 
	frameLen : 6, //帧总数
	totalFrame : 0, //累计帧数,每切换一帧次数加1
	curFrame : 0, //当前帧
	curSpeed : 20, //上帧的速度
	lotteryTime : 0, //抽奖次数
	lotteryIndex : 6, //奖品index
	errorIndex : 3, //异常时的奖品指针
	initBoxEle : $('#turnplate #init'),
	progressEle : $('#turnplate #init span'),
	initProgressContent : '~~~^_^~~~', //初始化进度条的内容
	initFreshInterval : 500, //进度条刷新间隔
	virtualDistance : 10000, //虚拟路程,固定值，速度越快，切换到下帧的时间越快: 切换到下帧的时间 = virtualDistance/curSpeed
	isStop : false, //抽奖锁,为true时，才允许下一轮抽奖
	timer2 : undefined, //计时器
	initTime : undefined,
	showMsgTime : 2000, //消息显示时间
	lotteryChannel: '',
	apiURL :"parameters",

	lotteryType : {
	},

	lotteryList : [
		'<p>获得<span>50元话费！</span>请保持手机畅通以便工作人员给您充值话费</p>',
		'<p>获得<span>30元话费！</span>请保持手机畅通以便工作人员给您充值话费</p>',
		'<p>获得<span>500元代金券！</span><br/>可在购买微加套餐时抵用</p>',
		'<p>获得<span>20元话费！</span>请保持手机畅通以便工作人员给您充值话费</p>',
		'<p>获得<span>iwatch!</span><br/>请保持手机畅通以便工作人员给您充值话费</p>',
		'<p>获得<span>1000元代金券！</span><br/>可在购买微加套餐时抵用</p>',
	],

	lotteryDes : [
	],

	//初始化
	init : function(apiURL) {
		this.apiURL = apiURL;
		this.initAnimate();
		this.freshLottery();
		this.turnplateBtn.click($.proxy(function(){
			this.click();	
		},this));
	},

	//初始化动画
	initAnimate : function() {
		this.initBoxEle.show();
		clearTimeout(this.initTimer);
		var curLength = this.progressEle.text().length,
			totalLength = this.initProgressContent.length;
		if (curLength < totalLength) {
			this.progressEle.text(this.initProgressContent.slice(0, curLength + 1));
		}else{
			this.progressEle.text('');
		}
		this.initTimer = setTimeout($.proxy(this.initAnimate, this), this.initFreshInterval);
		return this.lotteryIndex;
	},

	//停止初始化动画
	stopInitAnimate : function() {
		clearTimeout(this.initTimer);
		this.initBoxEle.hide();
	},

	freshLotteryTime : function() {
		$('.lottery-times').html(this.lotteryTime);
	},

	//更新抽奖次数
	freshLottery : function() {
		this.stopInitAnimate();
		this.setBtnHover();
		this.isStop = true;
		this.lotteryTime = 1;
		this.freshLotteryTime();
	},

	//设置按钮三态
	setBtnHover : function() {
		//按钮三态
		$('#platebtn').hover(function(){
			$(this).addClass('hover');
		},function() {
			$(this).removeClass('hover click');
		}).mousedown(function(){
			$(this).addClass('click');
		}).mouseup(function(){
			$(this).removeClass('click');
		});	
	},

	//获取奖品
	lottery : function() {
		this.lotteryIndex = undefined;
		this.lotteryTime--;
		this.freshLotteryTime();
		this.totalFrame = 0;
		this.curSpeed = this.minSpeed;
		this.turnAround();
		/*$.ajax({
			url:this.apiURL,
			cache: false,
			async: false,
			success: function(data) {*/
		 if(this.apiURL!=null&&this.apiURL!=''){
			 var id = eval(this.apiURL);
				//turnplate.lotteryIndex = id?id : turnplate.errorIndex;
				turnplate.lotteryIndex = id;
		 }else{
			 
		
				
		//	},
			//error: function(XMLHttpRequest, textStatus, errorThrown) {
				turnplate.lotteryIndex = turnplate.errorIndex;
		 }
			//}
	//	});
	},
	
	//点击抽奖
	click : function() {
		//加锁时
		if(this.isStop == false) {
			this.showMsg('');
			return;
		} 
		this.lottery();
	},

	//更新当前速度
	freshSpeed : function() {
		var totalResistance = this.minResistance + this.curSpeed * this.Cx;
		var accSpeed = this.accSpeed;
		var curSpeed = this.curSpeed;
		if(this.totalFrame >= this.accFrameLen) {
			accSpeed = 0;
		}
		curSpeed = curSpeed - totalResistance + accSpeed;

		if(curSpeed < this.minSpeed){
			curSpeed = this.minSpeed;
		}else if(curSpeed > this.maxSpeed){
			curSpeed = this.maxSpeed;
		}

		this.curSpeed  = curSpeed;
	},

	//旋转,trunAround,changeNext循环调用
	turnAround : function() {
		//加锁
		this.isStop = false;
		var intervalTime = parseInt(this.virtualDistance/this.curSpeed);		
		this.timer = window.setTimeout('turnplate.changeNext()', intervalTime);		
	},

	//弹出奖品
	showAwards : function(){
		$(".mask").show();
		var lotteryMsg = $("#lotteryMsg");
		lotteryMsg.find(".msg").html(turnplate.lotteryList[turnplate.lotteryIndex]);
		lotteryMsg.fadeIn(300);
	},

	//显示提示信息
	showMsg : function(msg, isFresh) {
		isFresh = typeof isFresh == 'undefined' ? false : true;
		if(typeof msg != 'string'){
			msg = '今天已经抽过奖了，明天再来吧';
		}
		var msgBox = this.msgBox;
		var display = msgBox.css('display');

		msgBox.html(msg);	

		window.clearTimeout(this.timer2);
		msgBox.stop(true,true).show();
		var fadeOut = $.proxy(function() {
			this.msgBox.fadeOut('slow');
		}, this);
		this.timer2 = window.setTimeout(fadeOut, this.showMsgTime);
	},

	//切换到下帧
	changeNext : function() {
		//判断是否应该停止
		if(this.lotteryIndex !== undefined && this.curFrame == this.lotteryIndex && this.curSpeed <= this.minSpeed+10 && this.totalFrame > this.accFrameLen) {
			this.isStop = true;
			this.showAwards();
			return; 		
		}

		var nextFrame =  this.curFrame+1 < this.frameLen ? this.curFrame+1 : 0;
		var bgTop = - nextFrame * this.height;		
		this.turnplateBox.css('backgroundPosition','0 ' + bgTop.toString() + 'px');	
		this.curFrame = nextFrame;
		this.totalFrame ++;
		this.freshSpeed();
		this.turnAround();
	}
}