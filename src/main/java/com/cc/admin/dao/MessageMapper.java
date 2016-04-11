package com.cc.admin.dao;

import java.util.List;

import com.cc.admin.dto.Message;

public interface MessageMapper {
	
	public List<Message> queryPage(int noticeId);
	
	public void add(Message message);

}