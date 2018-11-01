package com.jianma.yxyp.util;

import java.net.URL;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.aliyun.oss.OSSClient;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.http.ProtocolType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sts.model.v20150401.AssumeRoleRequest;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse;

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
	
	// 目前只有"cn-hangzhou"这个region可用, 不要使用填写其他region的值
    public static final String REGION_CN_HANGZHOU = "cn-hangzhou";
    // 当前 STS API 版本
    public static final String STS_API_VERSION = "2015-04-01";
    // STS服务必须为 HTTPS
    public static final ProtocolType STS_PROTOCOL_TYPE = ProtocolType.HTTPS;
    
    public static AssumeRoleResponse assumeRole(String accessKeyId,String accessKeySecret, String roleArn, 
            String roleSessionName) throws ClientException {
        return assumeRole(accessKeyId, accessKeySecret, roleArn, roleSessionName, null, 3600, 
                STS_PROTOCOL_TYPE);
    }
    
    public static AssumeRoleResponse assumeRole(String accessKeyId,String accessKeySecret, String roleArn, 
            String roleSessionName, String policy) throws ClientException {
        return assumeRole(accessKeyId, accessKeySecret, roleArn, roleSessionName, policy, 3600, 
                STS_PROTOCOL_TYPE);
    }

    public static AssumeRoleResponse assumeRole(String accessKeyId,String accessKeySecret, String roleArn, 
            String roleSessionName, String policy, long expired, ProtocolType protocolType)
                    throws ClientException {
        // 创建一个 Aliyun Acs Client, 用于发起 OpenAPI 请求
        IClientProfile profile = DefaultProfile.getProfile(REGION_CN_HANGZHOU, 
                accessKeyId, accessKeySecret);
        DefaultAcsClient client = new DefaultAcsClient(profile);

        // 创建一个 AssumeRoleRequest 并设置请求参数
        final AssumeRoleRequest request = new AssumeRoleRequest();
        request.setVersion(STS_API_VERSION);
        request.setMethod(MethodType.POST);
        request.setProtocol(protocolType);
        request.setRoleArn(roleArn);
        request.setRoleSessionName(roleSessionName);
        request.setPolicy(policy);
        request.setDurationSeconds(expired);

        // 发起请求，并得到response
        return client.getAcsResponse(request);
    }
	
}
