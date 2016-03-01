package com.cc.admin.controller;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.Temperatures;
import com.cc.admin.service.TemperatureService;
import com.cc.base.BaseController;
import com.utils.common.PageDTO;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("temperature")
public class TemperatureController extends BaseController {
	

	@Autowired
	private TemperatureService temperatureService;
	
	@RequestMapping(value = "/queryPage", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryList(
			@RequestParam(value = "startNum", defaultValue = "0") int startNum,
			@RequestParam(value = "pageCount", defaultValue = "10") int pageCount) {
		
		List<Temperatures> list = this.temperatureService.queryPage(startNum,pageCount);
		int count = this.temperatureService.count();
		int currentPage = startNum/pageCount + 1;
		PageDTO dto = new PageDTO();		
		dto.setList(list);
		dto.setCount(count);
		dto.setStartNum(startNum);
		dto.setCurrentPage(currentPage);
		dto.setPageCount(pageCount);
		
		return new JsonData(dto);
	}
	
	@RequestMapping(value = "/queryChart", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryChart(String startTime,String endTime) {
		Map<String,Date> map=new HashMap<String,Date>();
		
		List<Temperatures> list = this.temperatureService.queryList(map);

		return new JsonData(list);
	}
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( Temperatures temperature) throws Exception {
		
		this.temperatureService.delete(temperature.getId());
		
		return new JsonSuccess("删除成功");
	}
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( Temperatures temperature) throws Exception {

		
		this.temperatureService.update(temperature);
		
		return new JsonSuccess("修改成功");
	}
}