package com.cc.admin.dao;

import java.util.List;

import com.cc.admin.dto.RemindValue;
import com.utils.common.JPage;

public interface RemindValueMapper {
	
	public List<RemindValue> queryList(JPage page);
	
	public int getCount();
	
	public RemindValue queryById(int id);
	
	void save(RemindValue user);

	
	void update(RemindValue user);
	
	void delete(int id);

}