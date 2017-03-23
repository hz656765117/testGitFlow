package com.hz.business.classAppraisal.service.impl;

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
import com.hz.business.classAppraisal.base.pojo.PrizeApply;
import com.hz.business.classAppraisal.service.PrizeApplyService;

 
@Service
@Transactional
public class PrizeApplyServiceImpl implements PrizeApplyService{
    @Autowired
    private ClassActivityMapper classActivityMapper;

	@Override
	public PrizeApply insertPrizeApply(PrizeApply prizeApply) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PrizeApply> prizeApplyListByAuditId(String auditId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delPrizeApply(String ids) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updatePrizeApply(PrizeApply prizeApply) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public PrizeApply getPrizeApplyById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	 

	
	

    
}
