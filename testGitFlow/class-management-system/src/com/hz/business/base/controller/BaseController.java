package com.hz.business.base.controller;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.google.gson.Gson;


public class BaseController {
	protected String webPath;
	protected HttpServletResponse response;

	
	
	/**
	 * 所有的子类方法执行之前都要先执行此方法，子类方法不需要在model此方法中的参数
	 */
	@ModelAttribute
	public void init(ModelMap model,HttpServletRequest request,HttpServletResponse response) {
		this.response = response;
		model.addAttribute("webPath", getWebPath(request));
		
		System.out.println(request.getCharacterEncoding());
		
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		System.out.println(time.format(new Date()) + "======="+ request.getRequestURL().toString());
		System.out.println(request.getMethod());
		
	}
	
	public String getWebPath(HttpServletRequest request){
		String path = request.getContextPath(); 
		String basePath = request.getScheme() + "://" 
		+ request.getServerName() + ":" + request.getServerPort() 
		+ path + "/"; 
		return basePath;
	}
	
 
	

	public String getWebPath() {
		return webPath;
	}

	public void setWebPath(String webPath) {
		this.webPath = webPath;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

 
	
	public boolean responseObj(Object obj){
		response.setContentType("text/json;charset=UTF-8");  
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(new Gson().toJson(obj));
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	
	
	
	
}
