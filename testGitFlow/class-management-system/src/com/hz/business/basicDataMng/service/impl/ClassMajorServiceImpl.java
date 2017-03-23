package com.hz.business.basicDataMng.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hz.base.utils.common.BoxConvertUtils;
import com.hz.business.basicDataMng.base.dao.AcademyPOMapper;
import com.hz.business.basicDataMng.base.dao.MajorPOMapper;
import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.base.pojo.AcademyPOExample;
import com.hz.business.basicDataMng.base.pojo.MajorPO;
import com.hz.business.basicDataMng.base.pojo.MajorPOExample;
import com.hz.business.basicDataMng.service.ClassAcademyService;
import com.hz.business.basicDataMng.service.ClassMajorService;

 
@Service
@Transactional
public class ClassMajorServiceImpl implements ClassMajorService{
    @Autowired
    private MajorPOMapper majorPOMapper;

	 

	@Override
	public MajorPO insertMajor(MajorPO majorPO) {
		majorPO.setCreateDate(new Date());
		majorPOMapper.insertSelective(majorPO);
		return majorPO;
	}

	@Override
	public List<MajorPO> majorListByUserId(String majorName) {
		MajorPOExample example = new MajorPOExample();
		//创建方法，添加搜索条件
		example.createCriteria().andListLikeTo(majorName);
		List<MajorPO>  activitys = majorPOMapper.selectByExample(example);
		return activitys;
	}

	@Override
	public boolean delClassMajor(String ids) {
		if ( StringUtils.isBlank(ids) ) {
			return false ;
		}
		List<String> list = BoxConvertUtils.convert(ids, ",", String.class);
		for (String key : list) {
			majorPOMapper.deleteByPrimaryKey(key);
		}
		return true;
	}

	@Override
	public boolean updateClassMajor(MajorPO classActivity) {
		classActivity.setCreateDate(new Date());
		majorPOMapper.updateByPrimaryKeySelective(classActivity);
		return true;
	}

	@Override
	public MajorPO getMajorById(String id) {
		return majorPOMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<MajorPO> majorListByAcademyKey(String academyKey) {
		MajorPOExample example = new MajorPOExample();
		//创建方法，添加搜索条件
		example.createCriteria().andAListByAcadeyKeyLikeTo(academyKey);
		List<MajorPO>  activitys = majorPOMapper.selectByExample(example);
		return activitys;
	}
	
	

    
}
