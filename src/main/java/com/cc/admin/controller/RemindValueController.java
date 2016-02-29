package com.cc.admin.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.User;
import com.cc.admin.service.RemindValueService;
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
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess save( RemindValue remindValue) throws Exception {

		RemindValue existValue=this.remindValueService.queryByType(remindValue.getType());
		if(existValue!=null){
			if(existValue.getType().equals("temperture")){
				throw new Exception("温度的阀值已经存在，不能重复新建");
			}else{
				throw new Exception("湿度的阀值已经存在，不能重复新建");

			}
			
		}
		
		this.remindValueService.save(remindValue);
		
		return new JsonSuccess("创建成功");
	}
	
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( RemindValue remindValue) throws Exception {
		
		this.remindValueService.delete(remindValue.getId());
		
		return new JsonSuccess("删除成功");
	}
}