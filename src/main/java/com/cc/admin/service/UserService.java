package com.cc.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cc.admin.dao.UserMapper;
import com.cc.admin.dto.User;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserMapper userMapper;

	public User getByLoginId(String loginId){
		
	   return userMapper.getByLoginId(loginId);
		
	}
	
	public void insert(User user){
		
		this.userMapper.save(user);
		
	}
	
	
	public void update(User user){
		
		this.userMapper.update(user);
		
	}
	
	
	public void fogetPassword(User user){
		user=this.userMapper.getByLoginId(user.getLoginId());
		//生成随机数 发邮件到邮箱
		int random=(int)((Math.random()*9+1)*100000);
		
		SimpleMailMessage mail = new SimpleMailMessage();
		try {
			mail.setTo(user.getLoginId());
			mail.setFrom("chenqifeng@51tiangou.com");
			mail.setSubject("请查收最新密码");
			mail.setText("您的新密码为"+random);
			mailSender.send(mail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		user.setPassword(String.valueOf(random));
		this.userMapper.update(user);
		
	}
	
}