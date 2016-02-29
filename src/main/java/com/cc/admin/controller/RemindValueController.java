package com.cc.admin.controller;


import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.RemindValue;
import com.cc.admin.dto.User;
import com.cc.admin.service.RemindValueService;
import com.cc.admin.service.UserService;
import com.cc.base.BaseController;
import com.utils.common.PageDTO;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;



@Controller
@RequestMapping("remindValue")
public class RemindValueController extends BaseController {
	

	@Autowired
	private RemindValueService remindValueService;
	

	@RequestMapping(value = "/queryPage", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryList(
			@RequestParam(value = "startNum", defaultValue = "0") int startNum,
			@RequestParam(value = "pageCount", defaultValue = "10") int pageCount,
			HttpServletRequest request,HttpServletResponse response) {
		
		ServletContext context = request.getSession().getServletContext();
		List<RemindValue> list = this.remindValueService.queryList(startNum,pageCount);
		context.setAttribute("remindList", list);
		int count = this.remindValueService.count();
		int currentPage = startNum/pageCount + 1;
		PageDTO dto = new PageDTO();		
		dto.setList(list);
		dto.setCount(count);
		dto.setStartNum(startNum);
		dto.setCurrentPage(currentPage);
		dto.setPageCount(pageCount);
		
		return new JsonData(dto);
	}
	
	@RequestMapping(value = "/queryById", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryList(int id) {
		
		RemindValue itme = this.remindValueService.queryById(id);
		
		
		return new JsonData(itme);
	}


	
	/**
	 * 修改用户信息 和  修改密码
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/update")
	@ResponseBody
	public JsonSuccess update( RemindValue remindValue,HttpServletRequest request,HttpServletResponse response) throws Exception {

		ServletContext context = request.getSession().getServletContext();
		this.remindValueService.update(remindValue);
		context.removeAttribute("remindList");
		return new JsonSuccess("修改成功");
	}
	
	@RequestMapping(value = "/save")
	@ResponseBody
	public JsonSuccess save( RemindValue remindValue,HttpServletRequest request,HttpServletResponse response) throws Exception {

		RemindValue existValue=this.remindValueService.queryByType(remindValue.getType());
		if(existValue!=null){
			if(existValue.getType().equals("1")){
				throw new Exception("温度的阀值已经存在，不能重复新建");
			}else{
				throw new Exception("湿度的阀值已经存在，不能重复新建");

			}
			
		}
		ServletContext context = request.getSession().getServletContext();
		this.remindValueService.save(remindValue);
		context.removeAttribute("remindList");
		return new JsonSuccess("创建成功");
	}
	
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public JsonSuccess delete( RemindValue remindValue,HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		this.remindValueService.delete(remindValue.getId());
		
		ServletContext context = request.getSession().getServletContext();
		context.removeAttribute("remindList");
		return new JsonSuccess("删除成功");
	}
}