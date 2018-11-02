package com.jianma.yxyp.util;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.aliyun.oss.OSSClient;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.http.ProtocolType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sts.model.v20150401.AssumeRoleRequest;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse;
import com.jianma.yxyp.model.Judge;
import com.jianma.yxyp.model.Production;

public class AliOssUtil {
	
    public static final String REGION_CN_HANGZHOU = "cn-hangzhou";

    public static final String STS_API_VERSION = "2015-04-01";
   
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
        IClientProfile profile = DefaultProfile.getProfile(REGION_CN_HANGZHOU, 
                accessKeyId, accessKeySecret);
        DefaultAcsClient client = new DefaultAcsClient(profile);

        final AssumeRoleRequest request = new AssumeRoleRequest();
        request.setVersion(STS_API_VERSION);
        request.setMethod(MethodType.POST);
        request.setProtocol(protocolType);
        request.setRoleArn(roleArn);
        request.setRoleSessionName(roleSessionName);
        request.setPolicy(policy);
        request.setDurationSeconds(expired);

        return client.getAcsResponse(request);
    }
    
    public static Object generatePresignedUrl(ConfigInfo configInfo,int type, Object object){
		
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
		final String dirPath = dir;
		if (object instanceof Production){
			Production production = (Production)object;
			
			production.setPimage(ossClient.generatePresignedUrl(bucket, dirPath + production.getPimage(), expiration).toString());
		}
		else if (object instanceof Judge){
			Judge judge = (Judge)object;
			judge.setHeadicon(ossClient.generatePresignedUrl(bucket, dirPath + judge.getHeadicon(), expiration).toString());
		}
		
		// 关闭OSSClient。
		ossClient.shutdown();
		
		return object;
	}
    
    public static List<?> generatePresignedUrl(ConfigInfo configInfo, int type, List<?> fileList){
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

		// 设置URL过期时间为30分钟。
		Date expiration = new Date(new Date().getTime() + 900 * 1000);
		// 生成以GET方法访问的签名URL，访客可以直接通过浏览器访问相关内容。
		final String dirPath = dir;
		
		fileList.forEach((object) -> {
			if (object instanceof Production){
				Production production = (Production)object;
				String[] imageArray = production.getPimage().split("\\,");
				StringBuilder sBuilder = new StringBuilder();
				Arrays.stream(imageArray).collect(Collectors.toList()).stream().forEach((fileName)->{
					sBuilder.append(ossClient.generatePresignedUrl(bucket, dirPath + fileName+ "?x-oss-process=style/thumb-200-200", expiration).toString() + ",");
				});
				
				production.setPimage(sBuilder.toString());
				
			}
			else if (object instanceof Judge){
				Judge judge = (Judge)object;
				judge.setHeadicon(ossClient.generatePresignedUrl(bucket, dirPath + judge.getHeadicon(), expiration).getPath());
			}
			
		});

		// 关闭OSSClient。
		ossClient.shutdown();
		
		return fileList;
	}
	
}
