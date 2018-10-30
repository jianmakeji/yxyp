package com.jianma.yxyp.model;

import java.util.List;

public class ListResultModel {
	
	private boolean success;
	private int iTotalRecords;
	private Object aaData;
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public int getiTotalRecords() {
		return iTotalRecords;
	}
	public void setiTotalRecords(int iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}
	public Object getAaData() {
		return aaData;
	}
	public void setAaData(Object aaData) {
		this.aaData = aaData;
	}
	
}
