package com.cc.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.MessageMapper;
import com.cc.admin.dto.Message;

@Service
@Transactional
public class MessageService {
	
	
	
	@Autowired
	private MessageMapper messageMapper;

	public List<Message> queryPage(int noticeId){
		return this.messageMapper.queryPage(noticeId);
	}
	
	public void add(Message message){
		this.messageMapper.add(message);
	}
	
}