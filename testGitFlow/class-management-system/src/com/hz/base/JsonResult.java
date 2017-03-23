package com.hz.base;

import java.util.Map;

/**
 * $.ajax后需要接受的JSON
 *
 * @author
 */
public class JsonResult {

	private boolean success = true; // 是否成功
	private String msg = "操作成功"; // 提示信息
	private Integer code = 0;
	private Object obj = null; // 其他信息
	private Map<String, Object> attributes; // 其他参数
	private boolean needLogin;

	public boolean isNeedLogin() {
		return needLogin;
	}

	public void setNeedLogin(boolean needLogin) {
		this.needLogin = needLogin;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public JsonResult() {
	}

	public JsonResult(boolean success, String msg, Object obj, boolean needLogin) {
		this.success = success;
		this.msg = msg;
		this.obj = obj;
		this.needLogin = needLogin;
	}

	public static JsonResult failure(String message) {
		return new JsonResult(false, message, null, false);
	}

	public static JsonResult success() {
		return new JsonResult(true, null, null, false);
	}

	public static JsonResult success(Object obj) {
		return new JsonResult(true, null, obj, false);
	}

	public static JsonResult success(String message, Object obj) {
		return new JsonResult(true, message, obj, false);
	}

}
