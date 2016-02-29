package com.cc.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.TemperatureMapper;
import com.cc.admin.dto.Temperatures;
import com.utils.common.JPage;

@Service
@Transactional
public class TemperatureService {
	

	
	@Autowired
	private TemperatureMapper temperatureMapper;

	public List<Temperatures> queryPage(int startNum,int pageCount){
		
		JPage page = new JPage();
		page.setStartNum(startNum);
		page.setPageCount(pageCount);
		return this.temperatureMapper.queryPage(page);
	}
	
	public List<Temperatures> queryList(Map<String, String> map){
		
		return this.temperatureMapper.queryList(map);
	}
	
	public Temperatures queryById(int id){
		
		return this.temperatureMapper.queryById(id);
		
	}
	
	

	public int count(){
		
		return this.temperatureMapper.getCount();
		
	}
	
	public void delete(int id){
	   this.temperatureMapper.delete(id);
	}

	
	
}