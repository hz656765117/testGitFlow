package com.hz.business.classActivity.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.base.utils.common.BoxConvertUtils;
import com.hz.business.classActivity.base.dao.ClassActivityMapper;
import com.hz.business.classActivity.base.pojo.ClassActivity;
import com.hz.business.classActivity.base.pojo.ClassActivityExample;
import com.hz.business.classActivity.service.ClassActivityService;

 
@Service
@Transactional
public class ClassActivityServiceImpl implements ClassActivityService{
    @Autowired
    private ClassActivityMapper classActivityMapper;

	 

	@Override
	public ClassActivity insertActivity(ClassActivity activity) {
		activity.setDeleteFlag(0);
		classActivityMapper.insertSelective(activity);
		return activity;
	}

	@Override
	public List<ClassActivity> activityListByUserId(String userId) {
		ClassActivityExample example = new ClassActivityExample();
		example.createCriteria().andDeleteFlagEqualTo(0).andCreatorEqualTo(Integer.valueOf(userId) );
		List<ClassActivity>  activitys = classActivityMapper.selectByExample(example);
		return activitys;
	}

	@Override
	public boolean delClassActivity(String ids) {
		if ( StringUtils.isBlank(ids) ) {
			return false ;
		}
		List<Integer> list = BoxConvertUtils.convert(ids, ",", Integer.class);
		
		ClassActivityExample example = new ClassActivityExample();
		example.createCriteria().andDeleteFlagEqualTo(0).andActivityKeyIn(list);
		
		ClassActivity record = new ClassActivity();
		record.setDeleteFlag(1);
		
		classActivityMapper.updateByExampleSelective(record, example);
		return true;
	}

	@Override
	public boolean updateClassActivity(ClassActivity classActivity) {
		classActivity.setUpdateTime(new Date());
		classActivityMapper.updateByPrimaryKeySelective(classActivity);
		return true;
	}

	@Override
	public ClassActivity getActivityById(Integer id) {
		return classActivityMapper.selectByPrimaryKey(id);
	}
	
	

    
}
