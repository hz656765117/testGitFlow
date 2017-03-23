/*
 *  @隐无为
 *
 *  ## 初始化UE插件
 *  ```
	var ue = UE.getEditor('content', {
	    initialFrameWidth : 719,//设置编辑器宽度
	    initialFrameHeight: 180,//设置编辑器高度
	    scaleEnabled      : true,
	    toolbars:ue_toolbars()//工具栏（带视频）
	});
	```
    ## 初始化图片+视频	功能
     > box_init_ueUpload("${webPath}",ue,9);

    ## 注意  如果只想用百度编辑器自带的视频方法 用下面的方法
     > box_init_ueUpload("${webPath}",ue,9,flase);

    ## 记录原理
    > 可能我们不需要编辑器要实现独立按钮上传(图片,视频,文件)
    1.实例化编辑器,再隐藏编辑器
    2.调用dialogs对象,弹出功能窗口(不用找了,最核心在27655行 iframeUrlMap对象)
            找到要弹出功能的dialog =>  editor.getDialog("insertvideo").open();(弹出视频窗口功能)
    3.当你选择文件上传后点击确定按钮会插入编辑器里,要想插入自己定义的区域
            就要重写插入命令17708行 =>  UE.commands['insertvideo']
    4.这样就可以实现独立上传,最主要的是实现思路.编辑器为什么点击个按钮就能
             弹出功能窗口?上传后点击确定就能插入编辑器文本区域?我要是找到弹出的方法
            和插入的方法不就行了,就是这样带这样的疑问细心品味源码

    ## 写到最后
              以后 我要仿照百度编辑器的思想,写组件
              我要把我的自行车换成百度的兰博基尼,
              我一定会达到BAT的高度


    ## 2016/06/12  上次是华润 这次是一汽 再一次深入理解UE(自定义组件 1.word 导入  2.视频截图)
    1. ueditor.config.js  toolbars 增加一个组件名 如boxword    labelMap  标题
    2. ueditor.all.js 27692行   btnCmds  增加一个组件名 如boxword (这个才是创建所有的组件的代码)
    3. ueditor.all.js 27665行  iframeUrlMap 增加一个弹窗 'boxword': '~/dialogs/boxword/boxword.html'
    4. ueditor.all.js 27815行   dialogBtns  增加确定按钮（这个要在组件内重写点击确定按钮的方法）
    5. ueditor.css 渲染样式 .edui-default  .edui-for-boxword  .edui-icon .edui-default .edui-for-boxword .edui-dialog-content
    6. 组件功能化(这个最好看导入word的例子,不好讲,基本都重写了,因为业务不同,但上传才是重头之重)
 *
 *
 * */
//百度编辑器(重写插入视频的方法)
function box_init_ueUpload(webPath,ue,business_type,isover){
	var isTrue=true;
	if(isover)isTrue=isover;//默认 true 覆盖
	if(isTrue){
		over_insertVideo_img(ue);
	}
	ue.ready(function() {
    	box_Upload(webPath,UE,business_type);//初始化图片+视频
    });
}
//上传地址配置
function box_Upload(webPath,UE,business_type){
	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function (action) {
    	//图片
    	if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
            //return webPath+'common/uploadPic?business_type='+business_type;
    		return webPath+'fileUpload/editorUploadPic?module='+business_type;
        }
        //视频
    	if (action == 'uploadvideo') {
    		return webPath+'common/ueditor/uploadViedo?business_type='+business_type;

        }
    	//导入(word)
    	if (action == 'boxword') {
    		return webPath+'web/fileUpload/inportWord?business_type='+business_type;
        }
    	//音乐上传
    	if(action == 'uploadmusic'){
    		return webPath + 'web/fileUpload/uploadMusic?business_type='+business_type;
    	}
        return '';//this._bkGetActionUrl.call(this, action)
    }
    
}

//重写 video 插件带有视频封面
function over_insertVideo_img(me){
UE.plugins['video'] = function (){
    var me =this;
    var utils=UE.utils;
    var domUtils=UE.dom.domUtils;

    /**
     * 创建插入视频字符窜
     * @param url 视频地址
     * @param width 视频宽度
     * @param height 视频高度
     * @param align 视频对齐
     * @param toEmbed 是否以flash代替显示
     * @param addParagraph  是否需要添加P 标签
     */
    function creatInsertStr(url,width,height,id,align,classname,type,imgUrl){
        var scriptStr='window.onload = function() {' +
        'var t = 0;' +
        'var x5_ = false;' +
        'var android_ = false;' +
        'var apple_ = false;' +
        'var ua = navigator.userAgent.toLowerCase();' +
        'if (/iphone|ipad|ipod/.test(ua)) {' +
          'apple_ = true;' +
        '};' +
        'if (/android/.test(ua)) {' +
          'android_ = true;' +
          'if (/qqbrowser/.test(ua)) {' +
            'x5_ = true;' +
          '};' +
        '};' +
        'if (x5_ || apple_) {' +
          '$("video").each(function() {' +
            'var $playIcon = $("<img>");' +
            'var url = window.location.href;' +
            'url = decodeURIComponent(url);' +
            'url = url.substring(url.indexOf("/") + 2, url.length);' +
            'url = url.substring(0, url.indexOf("/") + 1);' +
            'var iconSrc = "http://" + url + "images/yiqi/videoPlay.png";' +
            'var iconStyle = "position:absolute;z-index:3;top:50%;left:50%;margin:-93px 0 0 -91px;display:block";' +
            'var videow = parseInt($(this).width()) + "px";' +
            'var videoh = parseInt($(this).height());' +
            '$(this).attr("width", "1px");' +
            '$(this).attr("height", "1px");' +
            'videow = "100%";' +
            'videoh = $(window).width() * 9 / 16;' +
            'iconStyle = "position:absolute;z-index:3;top:50%;left:50%;width:70px!important;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);display:block";' +
            '$playIcon.attr("style", iconStyle);' +
            '$playIcon.attr("src", iconSrc);' +
            'if (!$(this).attr("id")) {' +
              '$(this).attr("id", "video" + t);' +
              't++;' +
            '};' +
            'var i = document.getElementById($(this).attr("id"));' +
            'var e = $("#" + this.id);' +
            'var s = e.attr("poster");' +
            'var a = $("<img>");' +
            'a.attr("src", s);' +
            'a.attr("style", "position: absolute;z-index: 2;height: 100%;width: 100%;top: 0;left: 0;z-index: 2");' +
            'a.click(function() {' +
              'i.play();' +
            '});' +
            '$playIcon.on("click", function() {' +
              'i.play();' +
            '});' +
            'e.css({' +
              'position: "relative",' +
              '"z-index": 1' +
            '});' +
            'var d = $("<div></div>");' +
            'd.attr("style", "position:relative;width:" + videow + ";height:" + videoh + "px");' +
            'e.wrap(d);' +
            'e.after(a);' +
            'e.after($playIcon);' +
          '});' +
        '}else if(android_ && x5_ == false){' +
        '$("video").each(function() {' +
          '$(this).attr("width","100%");' +
          '$(this).attr("height",$(window).width()*9/16);' +
    	'})' +
        '}' +
      '}';
        var str;
        //var wkd=width>320?"100%":width;
        $(function () {
            var videoCount = 0;
            $('video').each(function () {
              if (!$(this).attr('id')) {
                $(this).attr('id','video' + videoCount);
                videoCount++;
              };
              var video = document.getElementById($(this).attr('id'));
              var $this = $('#' + this.id);
              var imgSrc = $this.attr('poster');
              var $image = $('<img src="'+ imgSrc +'" style="position: absolute;z-index: 2;height: 100%;width: 100%;top: 0;left: 0;z-index: 2">');
              $image.click(function () {
                $image.css('z-index',1);
                $this.css('z-index',2);
                video.play();
              });
              $this.css({'position': 'relative','z-index': 1});
              $this.wrap('<div style="position: relative;width:'+ $this.width() +'px;height:'+ $this.height() +'px"></div>');
              $this.after($image);
              video.addEventListener('pause', function(){
                $image.css('z-index',2);
                $this.css('z-index',1);
              });
            });
          });
        switch (type){
            case 'image':
                str = '<img ' + (id ? 'id="' + id+'"' : '') + ' width="'+ width +'" height="' + height + '" _url="'+url+'" class="' + classname.replace(/\bvideo-js\b/, '') + '"'  +
                    ' poster="'+imgUrl+'" src="' + me.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+me.options.UEDITOR_HOME_URL+'themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;'+(align ? 'float:' + align + ';': '')+'" />'
                    break;
            case 'embed':
                str = '<embed type="application/x-shockwave-flash" class="' + classname + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
                    ' src="' +  utils.html(url) + '" width="' + width  + '" height="' + height  + '"'  + (align ? ' style="float:' + align + '"': '') +
                    ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                break;
            case 'video':
                var ext = url.substr(url.lastIndexOf('.') + 1);
                if(ext == 'ogv') ext = 'ogg';
                str =' <video' + (id ? ' id="' + id + '"' : '') +
                    ' poster="'+imgUrl+'"'+
                    ' class="' + classname + ' video-js" ' + (align ? ' style="float:' + align + '"': '') +
                    ' controls preload="none" width="' + width + '" height="' + height + '" src="' + url + '" data-setup="{}">' +
                    '<source src="' + url + '" type="video/' + ext + '" /></video>';
                   /* +'<script>'+scriptStr+'</script>';*/
                break;
        }
        return str;
    }

    function switchImgAndVideo(root,img2video){
        utils.each(root.getNodesByTagName(img2video ? 'img' : 'embed video'),function(node){
            var className = node.getAttr('class');
            if(className && className.indexOf('edui-faked-video') != -1){
                var html = creatInsertStr( img2video ? node.getAttr('_url') : node.getAttr('src'),node.getAttr('width'),node.getAttr('height'),null,node.getStyle('float') || '',className,img2video ? 'embed':'image');
                node.parentNode.replaceChild(UE.uNode.createElement(html),node);
            }
            if(className && className.indexOf('edui-upload-video') != -1){
                var html = creatInsertStr( img2video ? node.getAttr('_url') : node.getAttr('src'),node.getAttr('width'),node.getAttr('height'),null,node.getStyle('float') || '',className,img2video ? 'video':'image',node.getAttr('poster'));
                var div='<div>'+html+'</div>';
                node.parentNode.replaceChild(UE.uNode.createElement(div),node);
               /* obj.insertAfter(overCreateElement(html),obj);*/
            }
        })
    }

    //创建uNode的静态方法
    //支持标签和html
     function  overCreateElement (html) {
        if (/[<>]/.test(html)) {
            return UE.htmlparser(html).children[1]
        } else {
            return new uNode({
                type:'element',
                children:[],
                tagName:html
            })
        }
    };
    me.addOutputRule(function(root){
        switchImgAndVideo(root,true)
    });
    me.addInputRule(function(root){
        switchImgAndVideo(root)
    });


    me.commands["insertvideo"] = {
        execCommand: function (cmd, videoObjs, type){
            videoObjs = utils.isArray(videoObjs)?videoObjs:[videoObjs];
            var html = [],id = 'tmpVedio', cl;
            for(var i=0,vi,len = videoObjs.length;i<len;i++){
                vi = videoObjs[i];
                cl = (type == 'upload' ? 'edui-upload-video video-js vjs-default-skin':'edui-faked-video');
                html.push(creatInsertStr( vi.url, vi.width || 420,  vi.height || 280, id + i, null, cl, 'image',vi.imgUrl));
            }
            me.execCommand("inserthtml",html.join(""),true);
            var rng = this.selection.getRange();
            for(var i= 0,len=videoObjs.length;i<len;i++){
                var img = this.document.getElementById('tmpVedio'+i);
                domUtils.removeAttributes(img,'id');
                rng.selectNode(img).select();
                me.execCommand('imagefloat',videoObjs[i].align)
            }
        },
        queryCommandState : function(){
            var img = me.selection.getRange().getClosedNode(),
                flag = img && (img.className == "edui-faked-video" || img.className.indexOf("edui-upload-video")!=-1);
            return flag ? 1 : 0;
        }
    };

};
//初始化插件
UE.plugins['video'].call(me);
}


//==================================================================================================
//重写insertVideo 命令
function over_insertVideo(me){
	me.commands["insertvideo"] = {
	        execCommand: function (cmd, videoObjs, type){
	            videoObjs = UE.utils.isArray(videoObjs)?videoObjs:[videoObjs];
	            var html = [],id = 'tmpVedio', cl;
	            if(videoObjs.length>0)  $("#box_insertVideo").show();
	            for(var i=0,vi,len = videoObjs.length;i<len;i++){
	                vi = videoObjs[i];
	                cl = (type == 'upload' ? 'edui-upload-video video-js vjs-default-skin':'edui-faked-video');
	                html.push(creatInsertStr( vi.url, vi.width || 420,  vi.height || 280, id + i, null, cl, 'image',me));
	                var str=vi.url.substring(vi.url.lastIndexOf('/')+1,vi.url.length);
	                if(type){
		                $("#box_insertVideo .dc").append('<div  vw="'+(vi.width || 420)+'" vh="'+(vi.height || 280)+'" ><a vurl="'+vi.url+'" onclick="showVideo(this,0)" href="javascript:void(0)">'+str+'</a></div>');
	                }else{
		                $("#box_insertVideo .dc").append('<div  vw="'+(vi.width || 420)+'" vh="'+(vi.height || 280)+'" ><a vurl="'+vi.url+'" onclick="showVideo(this,1)" href="javascript:void(0)">'+str+'</a></div>');
	                }
	            }
	            me.execCommand("inserthtml",html.join(""),true);
	        }

	    }
}
 /**
     * 创建插入视频字符窜
     * @param url 视频地址
     * @param width 视频宽度
     * @param height 视频高度
     * @param align 视频对齐
     * @param toEmbed 是否以flash代替显示
     * @param addParagraph  是否需要添加P 标签
     */
    function creatInsertStr(url,width,height,id,align,classname,type,me,imgUrl){
        var str;
        switch (type){
            case 'image':
                str = '<img ' + (id ? 'id="' + id+'"' : '') + ' width="'+ width +'" height="' + height + '" _url="'+url+'" class="' + classname.replace(/\bvideo-js\b/, '') + '"'  +
                    ' src="' + me.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+me.options.UEDITOR_HOME_URL+'themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;'+(align ? 'float:' + align + ';': '')+'" />'
                break;
            case 'embed':
                str = '<embed type="application/x-shockwave-flash" class="' + classname + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
                    ' src="' +  me.utils.html(url) + '" width="' + width  + '" height="' + height  + '"'  + (align ? ' style="float:' + align + '"': '') +
                    ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                break;
            case 'video':
                var ext = url.substr(url.lastIndexOf('.') + 1);
                if(ext == 'ogv') ext = 'ogg';
                str = '<video' + (id ? ' id="' + id + '"' : '') + ' class="' + classname + ' video-js" ' + (align ? ' style="float:' + align + '"': '') +
                    ' controls preload="none" width="' + width + '" height="' + height + '" src="' + url + '" data-setup="{}">' +
                    '<source poster="'+imgUrl || "" +'" src="' + url + '" type="video/' + ext + '" /></video>';
                break;
        }
        return str;
    }

//弹出视频 播放视频
function showVideo(_this,type){
	var url=$(_this).attr("vurl");
	var $html="";
	if(type==0){
		 $html='<video width="620" height="340" controls>' +
		  '<source src="'+url+'"  type="video/mp4"' +
		  '</video>';

		 layer.open({
			  type: 1,
			  title: false,
			  area: ['630px', '360px'],
			  shade: 0.8,
			  closeBtn: 1,
			  shadeClose: true,
			  content: $html
			});
	}else{
		$html=url;
		 layer.open({
			  type:2,
			  title: false,
			  area: ['630px', '360px'],
			  shade: 1,
			  closeBtn: 1,
			  shadeClose: true,
			  content: $html
			});
	}


}
//转义
function html2Escape(sHtml) {
	 return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
	}
//工具tool(1)
function ue_toolbars(){
return	toolbars=[
               [  //第一行 基本
                  'fullscreen', //全屏
                  "source",
                  "|",
                  'bold', //加粗
                  'italic', //斜体
                  'underline', //下划线
                  "|",
                  'forecolor', //字体颜色
                  'backcolor', //背景色
                  "|",
                  'paragraph', //段落格式
                  'fontfamily', //字体
                  'fontsize', //字号
                  "|",
                  'removeformat', //清除格式
                  'formatmatch', //格式刷
                  'indent', //首行缩进
                  "|",
                  'link', //超链接
                  'unlink', //取消链接
//                  ],
//                  [  //格式
                  'justifyleft', //居左对齐
                  'justifyright', //居右对齐
                  'justifycenter', //居中对齐
                  "|",
                  'insertorderedlist', //有序列表
                  'insertunorderedlist', //无序列表
                  "|",
                  'lineheight', //行间距
                  "|",
                  'insertimage', //多图上传
                  'insertvideo', //视频
                  'emotion',
                  "|",
                  'boxWord',//附件(word.excel)
                  "|",
                  'undo', //撤销
                  'redo', //重做
                  "|",
                  'cleardoc'    //清空文档
              ]]
}



