package com.cc.admin.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.admin.dto.Message;
import com.cc.admin.dto.Temperatures;
import com.cc.admin.service.MessageService;
import com.cc.base.BaseController;
import com.utils.json.JsonData;
import com.utils.json.JsonObject;
import com.utils.json.JsonSuccess;

@Controller
@RequestMapping("message")
public class MessageController extends BaseController {

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/queryPage", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject queryPage(
			@RequestParam(value = "noticeId", defaultValue = "1") int noticeId) {

		List<Message> list = this.messageService.queryPage(noticeId);

		return new JsonData(list);

	}
	
	@RequestMapping(value = "/add")
	@ResponseBody
	public JsonSuccess update( Message message) throws Exception {

		message.setTime(new Date());
		this.messageService.add(message);
		
		return new JsonSuccess("添加成功");
	}
	
	
}