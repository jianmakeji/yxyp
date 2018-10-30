package com.jianma.yxyp.model;

public class ProductUserModel {

	private int pId;
	private String title;
	private String thumb;
	private String realname;
	private String mobile;
	private String address;
	private byte groupNum;
	private byte subGroupNum;
	private String title_en;
	private String content_en;
	private String adviser;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getThumb() {
		return thumb;
	}
	public void setThumb(String thumb) {
		this.thumb = thumb;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public int getpId() {
		return pId;
	}
	public void setpId(int pId) {
		this.pId = pId;
	}
	public byte getGroupNum() {
		return groupNum;
	}
	public void setGroupNum(byte groupNum) {
		this.groupNum = groupNum;
	}
	public byte getSubGroupNum() {
		return subGroupNum;
	}
	public void setSubGroupNum(byte subGroupNum) {
		this.subGroupNum = subGroupNum;
	}
	public String getTitle_en() {
		return title_en;
	}
	public void setTitle_en(String title_en) {
		this.title_en = title_en;
	}
	public String getContent_en() {
		return content_en;
	}
	public void setContent_en(String content_en) {
		this.content_en = content_en;
	}
	public String getAdviser() {
		return adviser;
	}
	public void setAdviser(String adviser) {
		this.adviser = adviser;
	}
	
	
}
