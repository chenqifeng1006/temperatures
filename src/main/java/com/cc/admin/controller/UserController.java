package com.cc.admin.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.User;
import com.cc.admin.service.UserService;
import com.cc.base.BaseController;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("user")
public class UserController extends BaseController {
	

	@Autowired
	private UserService userService;
	

	/**
	 * 登录
	 * @param user
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login")
	@ResponseBody
	public JsonObject login( User user,HttpServletRequest request,HttpServletResponse response) throws Exception {

		String loginId = user.getLoginId();
		String password = user.getPassword();
		
		User loginUser = userService.getByLoginId(loginId);
		if(loginUser==null){
			throw new Exception("用户名或密码错误");
		}else{
			if(!password.equals(loginUser.getPassword())){
				throw new Exception("用户名或密码错误");

			}
			
		}		
		return new JsonData(loginUser);

	}
	
	/**
	 * 注册 
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/regist")
	@ResponseBody
	public JsonObject regist( User user) throws Exception {

		User existUser=this.userService.getByLoginId(user.getLoginId());
		user.setUserName(user.getLoginId());
		if(existUser!=null){
			throw new Exception("邮箱已注册，请重新输入");
		}
		try{
		 
            this.userService.insert(user);
		 
		  
		}catch(Exception ex){
			ex.printStackTrace();
			throw new Exception("注册失败，请联系系统管理员");
		}
		return new JsonData(user);
	}
	
	
	/**
	 * 忘记密码
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/forgetPassword")
	@ResponseBody
	public JsonSuccess forgetPassword( User user) throws Exception {

		User existUser=this.userService.getByLoginId(user.getLoginId());
		if(existUser==null){
			throw new Exception("用户不存在");
		}
        else{
			this.userService.fogetPassword(existUser);
		}
		
		return new JsonSuccess("已将新密码发至您的邮箱，请登录邮箱查收");
	}
	
	
	/**
	 * 修改用户信息 和  修改密码
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( User user) throws Exception {

		
			this.userService.update(user);
		
		return new JsonSuccess("修改成功");
	}
	
	/**
	 * 通过loginId获得user
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getById")
	@ResponseBody
	public JsonObject getById( User user) throws Exception {
		String loginId = user.getLoginId();
		User u = this.userService.getByLoginId(loginId);
		
		
		return new JsonData(u);
	}
}