package com.jianma.yxyp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.ProtocolType;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse.Credentials;
import com.jianma.yxyp.exception.ServerException;
import com.jianma.yxyp.model.News;
import com.jianma.yxyp.model.ResultModel;
import com.jianma.yxyp.service.JudgeService;
import com.jianma.yxyp.service.NewsService;
import com.jianma.yxyp.service.UserService;
import com.jianma.yxyp.util.AliOssUtil;
import com.jianma.yxyp.util.ConfigInfo;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController extends DcController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	@Qualifier(value = "newsServiceImpl")
	private NewsService newsServiceImpl;

	@Autowired
	@Qualifier(value = "userServiceImpl")
	private UserService userServiceImpl;

	@Autowired
	@Qualifier(value = "judgeServiceImpl")
	private JudgeService judgeServiceImpl;

	@Autowired
	@Qualifier(value = "configInfo")
	private ConfigInfo configInfo;

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(Locale locale, Model model,HttpServletRequest request) {
		try {
			int top = 0;
			if(request.getParameter("top") != null){
				top = Integer.parseInt(request.getParameter("top"));
			}
			
			List<News> newsList = newsServiceImpl.getTopNews(top);
			ModelAndView modelView = new ModelAndView();
			modelView.setViewName("/frontend/index");
			modelView.addObject(newsList);
			return modelView;
		} catch (Exception e) {
			throw new ServerException(400, "鏈嶅姟鍣ㄥ唴閮ㄥ嚭閿欎簡");
		}
	}

	@RequestMapping(value = "/login")
	public String login(HttpServletRequest request, Model model) {
		return "/frontend/login";
	}

	@RequestMapping(value = "/org")
	public String org(HttpServletRequest request, Model model) {
		return "/frontend/org";
	}
	
	@RequestMapping(value = "/error")
	public String error(HttpServletRequest request, Model model) {
		return "error";
	}
	
	@RequestMapping(value = "/home")
	public String home(HttpServletRequest request, Model model) {
		return "home";
	}

	@RequestMapping(value = "/index")
	public ModelAndView index(HttpServletRequest request, Model model) {
		try {
			int top = 0;
			if(request.getParameter("top") != null){
				top = Integer.parseInt(request.getParameter("top"));
			}
			
			List<News> newsList = newsServiceImpl.getTopNews(top);
			ModelAndView modelView = new ModelAndView();
			modelView.setViewName("/frontend/index");
			modelView.addObject(newsList);
			return modelView;
		} catch (Exception e) {
			throw new ServerException(400, "鏈嶅姟鍣ㄥ唴閮ㄥ嚭閿欎簡");
		}
	}

	@RequestMapping(value = "/dologin")
	public String doLogin(HttpServletRequest request, Model model) {
		String msg = "";
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		token.setRememberMe(true);
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(token);
			if (subject.isAuthenticated()) {

				try {
					subject.checkRole("绠＄悊鍛�");
					return "redirect:/news/newsMgr";
				} catch (AuthorizationException e) {
					try {
						subject.checkRole("璇勫");
						return "redirect:/review/judgeIndex";
					} catch (AuthorizationException ex) {
						return "redirect:/production/works";
					}

				}
			} else {
				return "/frontend/login";
			}
		} catch (IncorrectCredentialsException e) {
			msg = "鐧诲綍瀵嗙爜閿欒.";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (ExcessiveAttemptsException e) {
			msg = "鐧诲綍澶辫触娆℃暟杩囧";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (LockedAccountException e) {
			msg = "甯愬彿宸茶閿佸畾.";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (DisabledAccountException e) {
			msg = "甯愬彿宸茶绂佺敤. ";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (ExpiredCredentialsException e) {
			msg = "甯愬彿宸茶繃鏈�.";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (UnknownAccountException e) {
			msg = "甯愬彿涓嶅瓨鍦�.鎴栬�呮湭婵�娲�";
			model.addAttribute("error", msg);
			System.out.println(msg);
		} catch (UnauthorizedException e) {
			msg = "鎮ㄦ病鏈夊緱鍒扮浉搴旂殑鎺堟潈锛�";
			model.addAttribute("error", msg);
			System.out.println(msg);
		}
		return "/frontend/login";
	}

	@RequestMapping(value = "/reviewLogin")
	public String reviewLogin(HttpServletRequest request, Model model) {
		String msg = "";
		String username = request.getParameter("email");
		String validCode = request.getParameter("validCode");
		String password = judgeServiceImpl.findJudgePwdByEmail(username, validCode);
		
		int round = Integer.parseInt(request.getParameter("round").toString());

		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		token.setRememberMe(false);
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(token);
			if (subject.isAuthenticated()) {

				try {
					
					subject.checkRole("璇勫");
					System.out.println("璇勫椤甸潰");
					return "redirect:/review/judgeIndex/" + round;
				} catch (AuthorizationException ex) {
					return "error";
				}

			} else {
				return "/frontend/login";
			}
		} catch (IncorrectCredentialsException e) {
			msg = "鐧诲綍瀵嗙爜閿欒.";
			model.addAttribute("error", msg);
		} catch (ExcessiveAttemptsException e) {
			msg = "鐧诲綍澶辫触娆℃暟杩囧";
			model.addAttribute("error", msg);
		} catch (LockedAccountException e) {
			msg = "甯愬彿宸茶閿佸畾.";
			model.addAttribute("error", msg);
		} catch (DisabledAccountException e) {
			msg = "甯愬彿宸茶绂佺敤. ";
			model.addAttribute("error", msg);
		} catch (ExpiredCredentialsException e) {
			msg = "甯愬彿宸茶繃鏈�.";
			model.addAttribute("error", msg);
		} catch (UnknownAccountException e) {
			msg = "甯愬彿涓嶅瓨鍦�.鎴栬�呮湭婵�娲�";
			model.addAttribute("error", msg);
		} catch (UnauthorizedException e) {
			msg = "鎮ㄦ病鏈夊緱鍒扮浉搴旂殑鎺堟潈锛�";
			model.addAttribute("error", msg);
		} catch (AuthorizationException e) {
			msg = "璁よ瘉澶辫触锛�";
			model.addAttribute("error", msg);
		}catch(AuthenticationException e){
			e.printStackTrace();
			msg = "璁よ瘉澶辫触锛佹垨鑰呰杞鏈粦瀹氳瘎濮旓紒";
			model.addAttribute("error", msg);
		}
		return "/frontend/login";
	}

	@RequestMapping(value = "/logout")
	public String doLogout(HttpServletRequest request, Model model) {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		return "/frontend/login";
	}

	@ResponseBody
	@RequestMapping(value = "/countDown", method = RequestMethod.GET)
	public ResultModel countDown(HttpServletRequest request, Model model) {
		ResultModel resultModel = new ResultModel();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date smdate = null;
		Date bdate = null;
		int countDown = 0;
		try {
			smdate = sdf.parse(sdf.format(new Date()));
			bdate = sdf.parse(configInfo.contribute_end_time);
			Calendar cal = Calendar.getInstance();
			cal.setTime(smdate);
			long time1 = cal.getTimeInMillis();
			cal.setTime(bdate);
			long time2 = cal.getTimeInMillis();
			long between_days = (time2 - time1) / (1000 * 3600 * 24);
			countDown = Integer.parseInt(String.valueOf(between_days));
			if (countDown < 0){
				countDown = 0;
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		resultModel.setObject(countDown);
		return resultModel;
	}
	
	@RequestMapping(value = "/judge", method = RequestMethod.GET)
	public ModelAndView judgeView(Locale locale, Model model) {
		try {
			ModelAndView modelView = new ModelAndView();
			modelView.setViewName("/frontend/judge/judge");
			//modelView.addObject(newsList);
			return modelView;
		} catch (Exception e) {
			throw new ServerException(400, "鏈嶅姟鍣ㄥ唴閮ㄥ嚭閿欎簡");
		}
	}
		
	@RequestMapping(value = "/sigUploadKey/{type}", method = RequestMethod.GET)
	public @ResponseBody  Map<String, String> sigUploadKey(HttpServletRequest request,HttpServletResponse response,Locale locale, Model model, @PathVariable int type) {
		
		String endpoint = configInfo.endpoint;
        String accessId = configInfo.accessId;
        String accessKey = configInfo.accessKey;
        String bucket = configInfo.bucket;
        String dir = "";
        String roleArn = "acs:ram::1455326322404332:role/cidic-oss-role";
        String roleSessionName = "cidic-oss-role";
        
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
        
        String host = "http://" + bucket + "." + endpoint;
       
        String policy = null;
        try {
        	 long expired = 3600;
        	AssumeRoleResponse assumeResponse = AliOssUtil.assumeRole(accessId,accessKey, roleArn, 
                    roleSessionName, policy, expired, ProtocolType.HTTPS);
            Credentials credentials = assumeResponse.getCredentials();
           
            Map<String, String> respMap = new LinkedHashMap<String, String>();
            respMap.put("accessKeyId", credentials.getAccessKeyId());
            respMap.put("accessKeySecret", credentials.getAccessKeySecret());
            respMap.put("securityToken", credentials.getSecurityToken());
            respMap.put("dir", dir);
            respMap.put("host", host);
            return respMap;
        } catch (ClientException e) {
        	e.printStackTrace();
    	}
        
        
        return null;
	}
	
}
