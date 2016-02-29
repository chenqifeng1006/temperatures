package com.cc.admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.Temperatures;
import com.cc.admin.service.RemindValueService;
import com.cc.admin.service.TemperatureService;
import com.cc.base.BaseController;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("temperature")
public class TemperatureController extends BaseController {
	

	@Autowired
	private TemperatureService temperatureService;
	

	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( Temperatures temperature) throws Exception {
		
		this.temperatureService.delete(temperature.getId());
		
		return new JsonSuccess("É¾³ý³É¹¦");
	}
}