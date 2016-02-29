package com.cc.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.HumidityMapper;
import com.cc.admin.dao.RemindValueMapper;
import com.cc.admin.dao.TemperatureMapper;
import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.Temperatures;
import com.utils.common.JPage;

@Service
@Transactional
public class HumidityService {
	

	
	@Autowired
	private HumidityMapper humidityMapper;

	public List<Humiditys> queryPage(int startNum,int pageCount){
		
		JPage page = new JPage();
		page.setStartNum(startNum);
		page.setPageCount(pageCount);
		return this.humidityMapper.queryPage(page);
	}
	
	public List<Humiditys> queryList(Map<String, String> map){
		
		return this.humidityMapper.queryList(map);
	}
	
	public Humiditys queryById(int id){
		
		return this.humidityMapper.queryById(id);
		
	}
	
	public int count(){
		
		return this.humidityMapper.getCount();
		
	}
	 public void update(Humiditys humiditys){
		 this.humidityMapper.update(humiditys);
	 }
	
	
	public void delete(int id){
	   this.humidityMapper.delete(id);
	}

	
	
}