$(document).ready(function(e) {
			$.ajax({
				url : webPath_xdn_+"visit/visit",
				type : "post",
				cache : false,
				data : {
					js_url : window.location.pathname,
					js_param:window.location.search,
					js_hash:window.location.hash,
					js_os:navigator.platform,
					js_cookieEnabled:navigator.cookieEnabled,
					js_appVersion:navigator.appVersion,
					js_screen:window.screen.width+"x"+window.screen.height
				}
			})
		})