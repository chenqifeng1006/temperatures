package com.cc.admin.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.cc.admin.dto.Airs;
import com.cc.admin.dto.Humiditys;
import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.User;
import com.cc.admin.service.AirService;
import com.cc.admin.service.HumidityService;
import com.cc.base.BaseController;
import com.utils.common.PageDTO;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("air")
public class AirController extends BaseController {
	

	@Autowired
	private AirService airService;
	

	@RequestMapping(value = "/queryPage", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryPage(
			@RequestParam(value = "startNum", defaultValue = "0") int startNum,
			@RequestParam(value = "pageCount", defaultValue = "10") int pageCount) {
	
			List<Airs> list = this.airService.queryPage(startNum,pageCount);		
			int count = this.airService.count();
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
	public JsonObject queryChart(Date startTime,Date endTime) {
		Map<String,Date> map=new HashMap<String,Date>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String start=sdf.format(startTime);
		String end=sdf.format(endTime);
		try {
			startTime=sdf.parse(start);
			endTime=sdf.parse(end);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		map.put("starttime", startTime);
		map.put("endtime", endTime);
		try{
		List<Airs> list = this.airService.queryList(map);
		return new JsonData(list);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( Airs airs) throws Exception {
		
		this.airService.delete(airs.getId());
		
		return new JsonSuccess("删除成功");
	}
	
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( Airs airs) throws Exception {

		
		this.airService.update(airs);
		
		return new JsonSuccess("修改成功");
	}
}