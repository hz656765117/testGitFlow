package com.hz.business.classActivity.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.hz.base.JsonResult;
import com.hz.base.utils.JsonUtil;
import com.hz.business.base.controller.BaseController;
import com.hz.business.base.model.ManagerMenuExt;
import com.hz.business.classActivity.base.pojo.ClassActivity;
import com.hz.business.classActivity.base.pojo.ManagerMenu;
import com.hz.business.classActivity.service.IManagerMenuService;


@Controller
@RequestMapping("/test")
public class TestController extends BaseController{
	//url  http://localhost:8080/ssm/test/test1.do
	@RequestMapping("/index")
	public String toindex(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		System.out.println(time.format(new Date()) + "  index");
		System.out.println(request.getMethod());
		
		
//		JSONObject obj = new JSONObject();
//		response.setContentType("text/json;charset=UTF-8");  
//		response.setCharacterEncoding("UTF-8");
//		
//		
//		
//		 
//		response.getWriter().write(new Gson().toJson(obj));
		return  "index" ;
	}
	
	@RequestMapping("/index1")
	public void toindex1(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		System.out.println(time.format(new Date()) + "  index");
		System.out.println(request.getMethod());
		
		JSONObject obj = new JSONObject();
		response.setContentType("text/json;charset=UTF-8");  
		response.setCharacterEncoding("UTF-8");
		obj.put("test", "test");
		
		response.getWriter().write(new Gson().toJson(obj));
		return;
	}
	
    
    @RequestMapping("/index2")
    @ResponseBody
	public ClassActivity toindex2(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		System.out.println(time.format(new Date()) + "  index");
		System.out.println(request.getMethod());
		
		JSONObject obj = new JSONObject();
		response.setContentType("text/json;charset=UTF-8");  
		response.setCharacterEncoding("UTF-8");
		obj.put("test", "test");
		
//		response.getWriter().write(new Gson().toJson(obj));
		ClassActivity record = new ClassActivity();
		record.setActivityKey(1);
		return record;
	}
	
	
    @Resource
    private IManagerMenuService managerMenuService;

 

    private List<ManagerMenu> managerMenus;

    @PostConstruct
    private  void initMenu() {
        managerMenus = managerMenuService.listMenus();
    }

    /**
     * 获取左侧菜单
     *
     * @param request request
     * @param authentication authentication
     * @return jsonResult
     */
    @RequestMapping("get")
    @ResponseBody
    public JsonResult getLeftMenu(HttpServletRequest request) {
        System.out.println("lll");
//        List<ManagerMenuExt> menus =
//                getMenu(managerMenus, -1, isAdmin, roles, installApps, new ArrayList<Integer>());
        return JsonResult.success(managerMenus);
    }
}
