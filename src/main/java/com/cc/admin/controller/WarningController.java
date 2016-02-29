package com.cc.admin.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.Temperatures;
import com.cc.admin.service.HumidityService;
import com.cc.admin.service.RemindValueService;
import com.cc.admin.service.TemperatureService;
import com.cc.base.BaseController;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;



@Controller
@RequestMapping("warning")
public class WarningController extends BaseController {
	
	@Autowired
	private RemindValueService remindValueService;
	@Autowired
	private HumidityService humidityService;
	@Autowired
	private TemperatureService temperatureService;

	@RequestMapping(value = "/everyTime")
	@ResponseBody
	public JsonObject login(HttpServletRequest request,HttpServletResponse response) throws Exception {
		double current1;
		double current2;
		HashMap<String, Object> map = new HashMap<String, Object>();
		ServletContext context = request.getSession().getServletContext();
		List<RemindValue> list = (List<RemindValue>) context.getAttribute("remindList");
		Humiditys hum = this.humidityService.getLast();
		Temperatures tem = this.temperatureService.getLast();
		if(list == null){
			list = this.remindValueService.queryList(0,10);
		}
		if(tem == null){
			current1 = 0;
		}else{
			current1 = tem.getTemperture();
		}
		if(hum == null){
			current2 = 0;
		}else{
			current2 = hum.getHumidity();
		}
		
		map.put("list", list);
		map.put("current1", current1);
		map.put("current2", current2);
		
		return new JsonData(map);
	}
	
	
}