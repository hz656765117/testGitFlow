package com.hz.business.base.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 常用的搜索 搜索和分页分不开，页面也页面数量都放在这里
 * 搜索常用的功能：时间段(startTime,endTime,不应该属于任何POJO属性值)，标题和内容搜索(比较常用)
 * 
 * @author bwl
 *
 */
public class SearchParam implements Serializable {
	private static final long serialVersionUID = 4165027379976046208L;
	public int pageNo;// 当前页码
	public int pageSize;// 每页大小
	public Date startTime;// 搜索条件起始时间
	public Date endTime;// 搜索条件结束时间
	public String title;// 标题 service一般也是like查询
	public String content;// 内容service like查询
	public String module;// 模块名称
	public Integer status;// 状态

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}
}
