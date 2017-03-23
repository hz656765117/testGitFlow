		//1.加载时执行的方法
		document.onready = onreadyFunc;
		function onreadyFunc(func)
		{
			if(typeof(func)!="undefined" ){
				if(func.type!="ready"){
					func();		
				}
				
			}
			
		}

	 

		
			/**AJAX.post
			 *
			 * @param url 请求地址
			 * @param data 参数{key:value,..}
			 * @param func:回掉方法
			 */
			doPost=function(url,data,func)
			{
				$.post
				(
					url,
					data,
					function(result)
					{
						func(result);
					},'json'
				);
			};
			
			
			/**js.post  请求地址,参数.避免参数暴露
			 * @param url: 请求地址
			 * @param map: post需要的参数放入map
			 */
			formPost=function(url,map){ 
				var form = document.createElement("form"); 
			        form.setAttribute("method",'post');  
			        form.setAttribute("action",url);  
			        form.innerHTML = "";  
			        
			        for (var key in map){  
//			        	console.log(key+"  "+map[key]);
			        	var input = document.createElement("input");  
			            input.setAttribute("type","hidden");  
			            input.setAttribute("name",key);  
			            input.setAttribute("value",map[key]);  
			            form.appendChild(input);
			        } 
			        document.body.appendChild(form) ; 
			        form.submit();
			        document.body.removeChild(form) ;
			};
			
			
			/**AJAX异步请求上传文件  不用刷新
			 * @param fileId  <input id=fileId type="file"/>
			 * @param url: 文件上传的请求方法
			 * @param func: 回掉方法
			 */
			upLoadFile=function(fileId,url,func){
				 var control = document.getElementById(fileId);
				 var form = new FormData();
				 form.append("file", control.files[0]);
				 try {
				        //firefox, chrome, safari etc
					 xhr = new XMLHttpRequest();
				    }

				    catch (e) {
				        // Internet Explorer Browsers
				    	xhr = new ActiveXObject("Microsoft.XMLHTTP");
				    }
				 // send via XHR - look ma, no headers being set!
//				 xhr = new XMLHttpRequest();
				 xhr.open("post", url, true);
				 xhr.send(form);
				 xhr.onload = function(){
					 var json = eval("(" + xhr.responseText + ")");
					 func(json);
				 };
			 };
			
			 
			 /**js图片预览
			 * @param parentId 容器id
			 * @param fileId   <input id=fileId type="file"/>
			 * @param width
			 * @param height
			 */
			 previewIMG=function(parentId,fileId,width,height){
					
					var control = document.getElementById(fileId);
					var file=control.files[0];
					var reader = new FileReader();
					reader.onload = function(event){
					     var dataUri = event.target.result;
					     var img=document.createElement("img");
					     img.width=width;
					     img.id="imgId";
					     img.height=height;
					     img.src = dataUri;
					     
					     var parent=document.getElementById(parentId);
					     var childs = parent.childNodes;    
					     for(var i = childs.length - 1; i >= 0; i--){
					         parent.removeChild(childs[i]);      
					     } 
					     parent.appendChild(img);
					};
					  
					 reader.onerror = function(event) {
//					     console.error("File could not be read! Code " + event.target.error.code);
					 };
					 reader.readAsDataURL(file);

			 };
			 
			 
			 
			 
			 
			bindClick=function(id,func){
				id="#"+id;
				$(id).bind("click",func);
			};
				
			oneClick=function(id,func){
				id="#"+id;
				$(id).one("click",func);
			};
			
			unClick=function(id){
				id="#"+id;
				$(id).unbind("click");
			};
			
			
			
			
		
//		<!--浮框开始-->
//		<div class="main-size" id="but">
//		 <div class="daxiao font-size fontcolor-bai font-center" id="tan">弹框提示</div>
//		</div>
//		<div class="corlor-bg"></div>
