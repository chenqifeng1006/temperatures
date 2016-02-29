package com.cc.admin.dao;

import java.util.List;
import java.util.Map;

import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.Temperatures;
import com.utils.common.JPage;

public interface TemperatureMapper {
	
	public List<Temperatures> queryPage(JPage page);

	
	public List<Temperatures> queryList(Map<String, String> map);
	
	public int getCount();
	
	public Temperatures queryById(int id);
	
	public void update(Temperatures temperatures);
	
	
	public void delete(int id);

}