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
		//生成随机数 发到邮箱
		int random=(int)((Math.random()*9+1)*100000);
		
		SimpleMailMessage mail = new SimpleMailMessage();
		try {
			mail.setTo(user.getLoginId());// 接受者
			mail.setFrom("系统管理员");// 发送者
			mail.setSubject("您好，请查收您的新密码");// 主题
			mail.setText("您好，您的新密码为："+random);// 邮件内容
			mailSender.send(mail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//修改数据库
		user.setPassword(String.valueOf(random));
		this.userMapper.update(user);
		
	}
	
}