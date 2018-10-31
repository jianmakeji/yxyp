package com.jianma.yxyp.util;

import java.net.URL;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.aliyun.oss.OSSClient;

public class AliOssUtil {

	@Autowired
	@Qualifier(value = "configInfo")
	private ConfigInfo configInfo;
	
	public String generatePresignedUrl(int type, String objectName){
		
		String endpoint = configInfo.endpoint;
        String accessId = configInfo.accessId;
        String accessKey = configInfo.accessKey;
        String bucket = configInfo.bucket;
        String dir = "";
        if (type == 1){
        	dir = "product/";
        }
        else if (type == 2){
        	dir = "news/";
        }
        else if (type == 3){
        	dir = "judges/";
        }
        else if (type == 4){
        	dir = "others/";
        }
        else if (type == 5){
        	dir = "attachment/";
        }
        
		OSSClient ossClient = new OSSClient(endpoint, accessId, accessKey);

		// 设置URL过期时间为1小时。
		Date expiration = new Date(new Date().getTime() + 1800 * 1000);
		// 生成以GET方法访问的签名URL，访客可以直接通过浏览器访问相关内容。
		URL url = ossClient.generatePresignedUrl(bucket, dir + objectName, expiration);

		// 关闭OSSClient。
		ossClient.shutdown();
		
		return url.getPath();
	}
	
}
