package com.jianma.yxyp.service;

import java.util.List;

import com.jianma.yxyp.model.FileInfo;

public interface FileInfoService {

	public void createFile(FileInfo file);
	
	public void deleteFile(int id);
	
	public void updateFile(FileInfo file);
	
	public List<FileInfo> getAllFile();
	
	public List<FileInfo> getFileByType(int type);
}
