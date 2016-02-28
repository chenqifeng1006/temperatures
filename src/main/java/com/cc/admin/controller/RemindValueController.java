package com.cc.admin.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.User;
import com.cc.admin.service.UserService;
import com.cc.base.BaseController;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("remindValue")
public class RemindValueController extends BaseController {
	

	@Autowired
	private RemindValueService remindValueService;
	



	
	/**
	 * 修改用户信息 和  修改密码
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( RemindValue remindValue) throws Exception {

		
			this.remindValueService.update(remindValue);
		
		return new JsonSuccess("修改成功");
	}
}