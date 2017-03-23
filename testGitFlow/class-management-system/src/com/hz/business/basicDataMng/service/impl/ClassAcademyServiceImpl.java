package com.hz.business.basicDataMng.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.base.utils.common.BoxConvertUtils;
import com.hz.business.basicDataMng.base.dao.AcademyPOMapper;
import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.base.pojo.AcademyPOExample;
import com.hz.business.basicDataMng.service.ClassAcademyService;

 
@Service
@Transactional
public class ClassAcademyServiceImpl implements ClassAcademyService{
    @Autowired
    private AcademyPOMapper academyPOMapper;

	 

	@Override
	public AcademyPO insertAcademy(AcademyPO activity) {
		activity.setCreateDate(new Date());
		academyPOMapper.insertSelective(activity);
		return activity;
	}

	@Override
	public List<AcademyPO> academyListByUserId(String academyName) {
		AcademyPOExample example = new AcademyPOExample();
		//创建方法，添加搜索条件
		example.createCriteria().andListLikeTo(academyName);
		List<AcademyPO>  activitys = academyPOMapper.selectByExample(example);
		return activitys;
	}

	@Override
	public boolean delClassAcademy(String ids) {
		if ( StringUtils.isBlank(ids) ) {
			return false ;
		}
		List<String> list = BoxConvertUtils.convert(ids, ",", String.class);
		for (String key : list) {
			academyPOMapper.deleteByPrimaryKey(key);
		}
		return true;
	}

	@Override
	public boolean updateClassAcademy(AcademyPO classActivity) {
		classActivity.setCreateDate(new Date());
		academyPOMapper.updateByPrimaryKeySelective(classActivity);
		return true;
	}

	@Override
	public AcademyPO getAcademyById(String id) {
		return academyPOMapper.selectByPrimaryKey(id);
	}
	
	

    
}
