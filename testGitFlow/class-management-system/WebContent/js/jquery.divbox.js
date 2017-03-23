jQuery.fn.extend(
{	OpenDiv : function() {
		var sWidth, sHeight;
		sWidth = window.screen.availWidth;
		if (window.screen.availHeight > document.body.scrollHeight) {
			sHeight = window.screen.availHeight;
		} else {
			sHeight = document.body.scrollHeight + 20;
		}
		var maskObj = document.createElement("div");
		maskObj.setAttribute('id', 'BigDiv');
		maskObj.style.position = "fixed";
		maskObj.style.top = "0";
		maskObj.style.left = "0";
		maskObj.style.background = "#111";
		maskObj.style.filter = "Alpha(opacity=70);";
		maskObj.style.opacity = "0.7";
		maskObj.style.width = sWidth + "px";
		maskObj.style.height = sHeight + "px";
		maskObj.style.zIndex = "10000";
		$("body").attr("scroll", "no");
		document.body.appendChild(maskObj);
		$("#BigDiv").data("divbox_selectlist", $("select:visible"));
		$("select:visible").hide();
		$("#BigDiv").attr("divbox_scrolltop", $.ScrollPosition().Top);
		$("#BigDiv").attr("divbox_scrollleft", $.ScrollPosition().Left);
		$("#BigDiv").attr("htmloverflow", $("html").css("overflow"));
		$("html").css("overflow-x", "hidden");
		window.scrollTo($("#BigDiv").attr("divbox_scrollleft"), $("#BigDiv")
				.attr("divbox_scrolltop"));
		var MyDiv_w = this.width();
		var MyDiv_h = this.height();
		MyDiv_w = parseInt(MyDiv_w);
		MyDiv_h = parseInt(MyDiv_h);
		var width = $.PageSize().Width;
		var height = $.PageSize().Height;
		var left = $.ScrollPosition().Left;
		var top = $.ScrollPosition().Top;
		var sr_top=$(document).scrollTop();
		//console.log(sr_top);
		var hh=(window.screen.height - MyDiv_h<=0)?30:(window.screen.height - MyDiv_h);
		//console.log(window.screen.height-MyDiv_h);
		var Div_topposition = hh /8;
		var Div_leftposition = left + (width / 2) - (MyDiv_w / 2);
		this.css("position", "absolute");
		this.css("z-index", "10001");
		this.css("left", Div_leftposition + "px");
		this.css("top", sr_top+Div_topposition + "px");
		if ($.browser.mozilla) {
			this.show();
			return;
		}
		this.fadeIn("fast");
	},
	CloseDiv : function() {
		if ($.browser.mozilla) {
			this.hide();
		} else {
			this.fadeOut("fast");
		}
		$("html").css("overflow", $("#BigDiv").attr("htmloverflow"));
		window.scrollTo($("#BigDiv").attr("divbox_scrollleft"), $("#BigDiv")
				.attr("divbox_scrolltop"));
		//$("#BigDiv").data("divbox_selectlist").show();
		$("select").show();
		$("#BigDiv").remove();

	}
});
$
		.extend(
{
			PageSize : function() {
				var width = 0;
				var height = 0;
				width = window.innerWidth != null ? window.innerWidth
						: document.documentElement
								&& document.documentElement.clientWidth ? document.documentElement.clientWidth
								: document.body != null ? document.body.clientWidth
										: null;
				height = window.innerHeight != null ? window.innerHeight
						: document.documentElement
								&& document.documentElement.clientHeight ? document.documentElement.clientHeight
								: document.body != null ? document.body.clientHeight
										: null;
				return {
					Width : width,
					Height : height
				};
			},
			ScrollPosition : function() {
				var top = 0, left = 0;
				if ($.browser.mozilla) {
					top = window.pageYOffset;
					left = window.pageXOffset;
				} else if ($.browser.msie) {
					top = document.documentElement.scrollTop;
					left = document.documentElement.scrollLeft;
				} else if (document.body) {
					top = document.body.scrollTop;
					left = document.body.scrollLeft;
				}
				return {
					Top : top,
					Left : left
				};
			}
		});