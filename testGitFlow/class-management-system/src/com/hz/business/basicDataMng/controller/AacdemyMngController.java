package com.hz.business.basicDataMng.controller;

import java.io.Console;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.box.base.page.Page;
import com.box.base.page.PageHelper;
import com.hz.business.base.controller.BaseController;
import com.hz.business.base.model.JsonResult;
import com.hz.business.base.model.SearchParam;
import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.service.ClassAcademyService;


@Controller
@RequestMapping("/basicDataMng/academyMng")
public class AacdemyMngController extends BaseController{
	
	@Autowired
	public ClassAcademyService classAcademyService;
	
	@RequestMapping("/index")
	public String toindex(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/academyMng/jsp/index" ;
	}
	
    @RequestMapping("listAcademyMng")
    @ResponseBody
    public Map<String,Object> listAccounts(@ModelAttribute("search") SearchParam search, HttpServletRequest request) {
    	Map<String,Object> json = new HashMap<>();
        json.put("success", false);
   
        PageHelper.startPage(search.getPageNo(), search.getPageSize());
        Page<AcademyPO> activitys = (Page<AcademyPO>) classAcademyService.academyListByUserId(search.getContent());
        if(activitys.isEmpty()) {
            return json;
        }

        
        json.put("success", true);
        json.put("obj", activitys);
        json.put("curPage", search.getPageNo());
        json.put("totalPage",  activitys.isEmpty() ? 1 : activitys.getPages());
        return json;
    }
    
    /**
     * 获取创建面板
     * @param request
     * @param response
     * @param model
     * @return
     * @throws IOException
     */
    @RequestMapping("/toCreateAcademy")
	public String toCreateActivity(HttpServletRequest request ,HttpServletResponse response,Model model) throws IOException{
		return  "basicDataMng/academyMng/jsp/createAcademy" ;
	}
    
    /**
     * 插入信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("/insertAcademy")
    @ResponseBody
    public JsonResult insertActivity(AcademyPO academy, HttpServletRequest request) {
        classAcademyService.insertAcademy(academy);
        return JsonResult.success("学院新增成功", academy);
    }
    
    /**
     * 获取修改面板
     * @param request
     * @param id
     * @param response
     * @param model
     * @return
     * @throws IOException
     */
    @RequestMapping("/toUpdateAcademy")
	public String toupdateActivity(HttpServletRequest request,String academyKey ,HttpServletResponse response,Model model) throws IOException{
    	AcademyPO academy = classAcademyService.getAcademyById(academyKey);
    	model.addAttribute("academy", academy);
    	return  "basicDataMng/academyMng/jsp/createAcademy" ;
	}
    
    /**
     * 保存修改信息
     * @param activity
     * @param request
     * @return
     */
    @RequestMapping("updateAcademy")
    @ResponseBody
    public JsonResult updateActivity(AcademyPO academy, HttpServletRequest request) {
        classAcademyService.updateClassAcademy(academy);
        return JsonResult.success("学院修改成功", academy);
    }
	
    /**
     * 删除信息
     * @param keyArr
     * @param request
     * @return
     */
    @RequestMapping("deleteAcademy")
    @ResponseBody
    public JsonResult deleteActivity(Integer[] keyArr, HttpServletRequest request) {
    	String ids = StringUtils.join(keyArr, ",");
    	classAcademyService.delClassAcademy(ids);
        return JsonResult.success("学院信息删除成功");
    }
	
     
}
