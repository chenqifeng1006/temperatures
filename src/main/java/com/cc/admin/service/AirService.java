package com.cc.admin.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.AirMapper;
import com.cc.admin.dao.HumidityMapper;
import com.cc.admin.dao.RemindValueMapper;
import com.cc.admin.dao.TemperatureMapper;
import com.cc.admin.dto.Airs;
import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.Temperatures;
import com.utils.common.JPage;

@Service
@Transactional
public class AirService {
	

	
	@Autowired
	private AirMapper airMapper;

	public List<Airs> queryPage(int startNum,int pageCount){
		
		JPage page = new JPage();
		page.setStartNum(startNum);
		page.setPageCount(pageCount);
		return this.airMapper.queryPage(page);
	}
	
	public List<Airs> queryList(Map<String, Date> map){
		
		return this.airMapper.queryList(map);
	}
	
	public Airs queryById(int id){
		
		return this.airMapper.queryById(id);
		
	}
	
	public int count(){
		
		return this.airMapper.getCount();
		
	}
	 public void update(Airs humiditys){
		 this.airMapper.update(humiditys);
	 }
	
	
	public void delete(int id){
	   this.airMapper.delete(id);
	}
	
	public Airs getLast(){
	   return this.airMapper.getLast();
	}

	
	
}