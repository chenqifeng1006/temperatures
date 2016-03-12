package com.cc.admin.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.cc.admin.dto.Airs;
import com.cc.admin.dto.Humiditys;
import com.utils.common.JPage;

public interface AirMapper {
	
	public List<Airs> queryPage(JPage page);

	
	public List<Airs> queryList(Map<String, Date> map);
	
	public int getCount();
	
	public Airs queryById(int id);
	
	public void update(Airs airs);
	
	void delete(int id);
	
	public Airs getLast();

}