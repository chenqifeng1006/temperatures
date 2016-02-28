package com.cc.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.RemindValueMapper;
import com.cc.admin.dto.RemindValue;
import com.utils.common.JPage;

@Service
@Transactional
public class RemindValueService {
	

	
	@Autowired
	private RemindValueMapper remindValueMapper;

	public List<RemindValue> queryList(int startNum,int pageCount){
		
		JPage page = new JPage();
		page.setStartNum(startNum);
		page.setPageCount(pageCount);
		return this.remindValueMapper.queryList(page);
	}
	
	public void save(RemindValue remindValue){
		
		this.remindValueMapper.save(remindValue);
		
	}
    public void update(RemindValue remindValue){
		
		this.remindValueMapper.update( remindValue);
		
	}
	
	public int count(){
		
		return this.remindValueMapper.getCount();
		
	}
	
	
	public void delete(int id){
		
		this.remindValueMapper.delete(id);
	}
	
	
}