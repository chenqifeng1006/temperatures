package com.cc.admin.dto;

import java.util.Date;

public class Temperatures {
	private int id;
	
	private double temperture;

	private Date createtime;
	
	private String unit;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getTemperture() {
		return temperture;
	}

	public void setTemperture(double temperture) {
		this.temperture = temperture;
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
