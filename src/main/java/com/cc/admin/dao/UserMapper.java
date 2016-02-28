package com.cc.admin.dao;

import com.cc.admin.dto.User;

public interface UserMapper {
	
	
	User getByLoginId(String loginId);
	
	
	void save(User user);

	
	void update(User user);

}