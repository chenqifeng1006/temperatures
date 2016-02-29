package com.cc.admin.dao;

import java.util.List;
import java.util.Map;

import com.cc.admin.dto.Humiditys;
import com.utils.common.JPage;

public interface HumidityMapper {
	
	public List<Humiditys> queryPage(JPage page);

	
	public List<Humiditys> queryList(Map<String, String> map);
	
	public int getCount();
	
	public Humiditys queryById(int id);
	
	
	void delete(int id);

}