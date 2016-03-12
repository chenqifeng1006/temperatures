package com.cc.admin.dto;

import java.util.Date;

public class Airs {
	private int id;
	
	private double air;

	private Date createtime;
	
	private String unit;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}



	public double getAir() {
		return air;
	}

	public void setAir(double air) {
		this.air = air;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
   
	
}
