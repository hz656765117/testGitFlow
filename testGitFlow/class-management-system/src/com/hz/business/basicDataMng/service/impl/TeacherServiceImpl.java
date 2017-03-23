package com.hz.business.basicDataMng.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.base.utils.common.BoxConvertUtils;
import com.hz.business.basicDataMng.base.dao.TeacherPOMapper;
import com.hz.business.basicDataMng.base.pojo.TeacherPO;
import com.hz.business.basicDataMng.base.pojo.TeacherPOExample;
import com.hz.business.basicDataMng.service.TeacherService;

 
@Service
@Transactional
public class TeacherServiceImpl implements TeacherService{
    @Autowired
    private TeacherPOMapper teacherPOMapper;

	@Override
	public TeacherPO insertTeacher(TeacherPO po) {
		teacherPOMapper.insertSelective(po);
		return po;
	}

	@Override
	public List<TeacherPO> teacherListByUserId(String teacherKey) {
		TeacherPOExample example = new TeacherPOExample();
		//创建方法，添加搜索条件
		example.createCriteria().andTeacherKeyLikeTo(teacherKey).andTeacherNameLikeTo(teacherKey);
		List<TeacherPO>  activitys = teacherPOMapper.selectByExample(example);
		return activitys;
	}

	@Override
	public boolean delClassTeacher(String ids) {
		if ( StringUtils.isBlank(ids) ) {
			return false ;
		}
		List<String> list = BoxConvertUtils.convert(ids, ",", String.class);
		for (String key : list) {
			teacherPOMapper.deleteByPrimaryKey(key);
		}
		return true;
	}

	@Override
	public boolean updateClassTeacher(TeacherPO po) {
		teacherPOMapper.updateByPrimaryKeySelective(po);
		return true;
	}

	@Override
	public TeacherPO getTeacherById(String id) {
		return teacherPOMapper.selectByPrimaryKey(id);
	}
}
