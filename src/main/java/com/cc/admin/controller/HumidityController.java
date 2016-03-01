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
import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.User;
import com.cc.admin.service.HumidityService;
import com.cc.base.BaseController;
import com.utils.common.PageDTO;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("humidity")
public class HumidityController extends BaseController {
	

	@Autowired
	private HumidityService humidityService;
	

	@RequestMapping(value = "/queryPage", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryPage(
			@RequestParam(value = "startNum", defaultValue = "0") int startNum,
			@RequestParam(value = "pageCount", defaultValue = "10") int pageCount) {
	
			List<Humiditys> list = this.humidityService.queryPage(startNum,pageCount);		
			int count = this.humidityService.count();
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
	public JsonObject queryChart(Date startTime,Date endTime) {
		Map<String,Date> map=new HashMap<String,Date>();
		
		List<Humiditys> list = this.humidityService.queryList(map);

		return new JsonData(list);
	}
	
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( Humiditys humitidy) throws Exception {
		
		this.humidityService.delete(humitidy.getId());
		
		return new JsonSuccess("删除成功");
	}
	
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( Humiditys humiditys) throws Exception {

		
		this.humidityService.update(humiditys);
		
		return new JsonSuccess("修改成功");
	}
}