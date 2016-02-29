package com.cc.admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.Humiditys;
import com.cc.admin.service.HumidityService;
import com.cc.base.BaseController;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("humidity")
public class HumidityController extends BaseController {
	

	@Autowired
	private HumidityService humidityService;
	

	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( Humiditys humitidy) throws Exception {
		
		this.humidityService.delete(humitidy.getId());
		
		return new JsonSuccess("É¾³ý³É¹¦");
	}
}