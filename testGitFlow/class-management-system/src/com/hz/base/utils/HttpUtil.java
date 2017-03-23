package com.hz.base.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.util.Iterator;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 
 * 
 * @author 作者 E-mail <a href="mailto:szg@51box.cn">石志刚</a>
 * @version 创建时间：2013-7-22
 * 
 */
public class HttpUtil {

	private static Log log = LogFactory.getLog(HttpUtil.class);

	public static void main(String[] args) {
		//String data = "{\"touser\": \"hz656765117\",\"toparty\": \"\",\"totag\": \"\",\"msgtype\": \"text\",\"agentid\": \"1\",\"text\":{\"content\": \"测试一下后台推送消息到自主开发的应用中，给所有关注用户\"},\"safe\":\"0\"}";
//		String data ="{\"touser\": \"@all\",\"toparty\": \"\",\"totag\": \"\",\"msgtype\": \"text\", \"agentid\": 1,\"text\": { \"content\": \"测试一下后台推送消息到自主开发的应用中，给所有关注用户\"}, \"safe\":\"0\"}";
//		System.out.println(data);
//		JSONObject ret = HttpUtil.httpsRequest("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=qELjFmPziDYIqCX_hSEsivP_-lX2DlRyR_Rde_CDkzMBjdXSAI2aYGQZ7UfdoPYv","POST", data);
//		System.out.println(ret.toString());
		
		// 取得access_token
	//	String res = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx3b73804be4d2d4a4&corpsecret=IMgrPmBbx9BgvDT4FwfIQl1XFfwhiOnnSds0VXEohjYrI8zMSAD538xq5wplL9Mv");
		//System.out.println(res);
		
		//获取应用信息
//		String info = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq&agentid=13");
//		System.out.println(info);
		
		//获取应用信息概况
		
//		String list = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq");
//		System.out.println(list);
		
		//获取回调模式应用的菜单
//		String menu = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/menu/get?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq&agentid=13");
//		System.out.println(menu);
		
		//获取指定部门及其下的子部门
//		String deptlist = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq&id=1");
//		System.out.println(deptlist);
		
	//	https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=ACCESS_TOKEN
		
		//创建成员
//		String data ="{\"userid\": \"zhangsan\", \"name\": \"张三\",\"department\": [1, 2],\"position\": \"产品经理\",\"mobile\": \"15913215421\", \"gender\": \"1\", \"email\": \"zhangsan@gzdev.com\",\"weixinid\": \"zhangsan4dev\",\"extattr\":{\"attrs\":[{\"name\":\"爱好\",\"value\":\"旅游\"},{\"name\":\"卡号\",\"value\":\"1234567234\"}]}}";
//		System.out.println(data);
//		JSONObject createPerson = HttpUtil.httpsRequest("https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq","POST", data);
//		System.out.println(createPerson.toString());
		//获取成员
//		String UserInfo = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=IgTuPD4ew3Mlz6HY-OmxShfW63Kbd_FNw1pxOCRapRSqSEgNsM3X8D65WizwS-Fq&userid=hz656765117");
//		System.out.println(UserInfo.toString());
			String res = HttpUtil.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx3b73804be4d2d4a4&corpsecret=IMgrPmBbx9BgvDT4FwfIQl1XFfwhiOnnSds0VXEohjYrI8zMSAD538xq5wplL9Mv");
		System.out.println(res);
	}

	/**
	 * http请求
	 * 
	 * @param url
	 *            请求地址
	 * @param charset
	 *            字符编码
	 * @param params
	 *            传递参数
	 * @return 網頁源代碼
	 */
	public static Object post(String url, String charset, Map params) {
		HttpClient client = new HttpClient();
		
		PostMethod method = new PostMethod(url);
		// 设置参数
		if (params != null) {
			Iterator it = params.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry entry = (Map.Entry) it.next();
				String _n = entry.getKey().toString();
				String _v = entry.getValue().toString();
				method.addParameter(_n, _v);
			}
		}
		method.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,
				charset);
		method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler(3, false));
		try {
			int statusCode = client.executeMethod(method);
			System.out.println(statusCode+"========================================");
			method.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, charset);
			if (statusCode != HttpStatus.SC_OK
					&& statusCode != HttpStatus.SC_MOVED_TEMPORARILY) {
			}
			byte[] responseBody = method.getResponseBody();
			return new String(responseBody, charset);
		} catch (HttpException e) {
		} catch (IOException e) {
		} finally {
			method.releaseConnection();
		}
		return null;
	}

	public static String get(String url) {
		String sCurrentLine = "";
		String sTotalString = "";
		try {
			URL l_url = new URL(url);
			HttpURLConnection l_connection = (HttpURLConnection) l_url
					.openConnection();
			/*
			 * l_connection.setRequestProperty("x-up-calling-line-id",
			 * "18958003200");
			 * l_connection.setRequestProperty("HTTP_X_UP_BEAR_TYPE", "gprs");
			 * l_connection.setRequestProperty("Accept", "vnd.wap.wml");
			 */
			l_connection.connect();
			InputStream l_urlStream;
			l_urlStream = l_connection.getInputStream();
			BufferedReader l_reader = new BufferedReader(new InputStreamReader(
					l_urlStream, "utf-8"));
			// sCurrentLine = l_reader.readLine();
			while ((sCurrentLine = l_reader.readLine()) != null) {
				sTotalString += sCurrentLine + "\r\n";
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sTotalString;
	}

	// 在在在
	public static JSONObject httpsRequest(String requestUrl,
			String requestMethod, String outputContent) {
//		String s  = System.setProperty("https.protocols", "TLSv1");
		JSONObject jsonObject = null;
		StringBuffer buffer = new StringBuffer();
		HttpsURLConnection httpUrlConn = null;
		OutputStream outputStream = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader bufferedReader = null;
		try {
			TrustManager[] tm = { new MyX509TrustManager() };
			SSLContext sslContext = SSLContext.getInstance("SSL");
			sslContext.init(null, tm, new SecureRandom());
			SSLSocketFactory ssf = sslContext.getSocketFactory();
			URL url = new URL(requestUrl);
			httpUrlConn = (HttpsURLConnection) url.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);
			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			httpUrlConn.setRequestMethod(requestMethod);
			httpUrlConn.setConnectTimeout(5000);// 5秒
			httpUrlConn.connect();
			if (StringUtil.isNotEmpty(outputContent)) {
				outputStream = httpUrlConn.getOutputStream();
				outputStream.write(outputContent.getBytes("UTF-8"));
			}
			inputStreamReader = new InputStreamReader(
					httpUrlConn.getInputStream(), "utf-8");
			bufferedReader = new BufferedReader(inputStreamReader);
			String str = null;
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			log.error("请求返回结果：" + buffer.toString());
			jsonObject = JSONObject.fromObject(buffer.toString());
		} catch (ConnectException ce) {
			log.error("http连接异常：", ce);
		} catch (Exception e) {
			log.error("http异常：", e);
		} finally {
			if(bufferedReader!=null)
				try {
					bufferedReader.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			if(inputStreamReader!=null)
				try {
					inputStreamReader.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			if(outputStream!=null)
				try {
					outputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			if(httpUrlConn!=null)httpUrlConn.disconnect();
		}
		return jsonObject;
	}
	// private static String APPSECRET="5ea108bad776c0ff024d14fb3fed3505";
	// private static String APPID="wxabc0f1f7ff05cfe8";
	// private static final String
	// WEIXIN_ACCESSTOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;
	// public static void main(String[] args) {
	// String url =
	// "https://qyapi.weixin.qq.com/cgi-bin/service/get_agent?suite_access_token=Ad9MaTNvXWTaWjL5AEM5dkEntWm9mhtq8vpGnn02oeRLR_rV0wLbl4x7ENEkZTiS";
	// StringBuffer data = new StringBuffer();
	// data.append("{");
	// data.append("\"suite_id\":\"").append("tj369a681625246bff").append("\",");
	// data.append("\"auth_corpid\":\"").append("wx2ae3559c083822f4").append("\",");
	// data.append("\"permanent_code\":\"").append("VVXxwRwD_5DuWAPTWCn9BhaR18ZpR613yA2Yk3kWenJe1a61ex4hoIq8mKbAyvej").append("\",");
	// data.append("\"agentid\":\"").append("103").append("\"}");
	//
	//
	//
	// System.out.println(httpsRequest(url, "GET", data.toString()).toString());
	// }
	
	
	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl 请求地址
	 * @param requestMethod 请求方式（GET、POST）
	 * @param outputStr 提交的数据
	 * @return JSONObject(通过JSONObject.get(key)的方式获取json对象的属性值)
	 */
	public static JSONObject httpRequest(String requestUrl, String requestMethod, String outputStr) {
		JSONObject jsonObject = null;
		StringBuffer buffer = new StringBuffer();
		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化
			TrustManager[] tm = { new MyX509TrustManager() };
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);

			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);

			if ("GET".equalsIgnoreCase(requestMethod))
				httpUrlConn.connect();

			// 当有数据需要提交时
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

			String str = null;
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			bufferedReader.close();
			inputStreamReader.close();
			// 释放资源
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();
			jsonObject = JSONObject.fromObject(buffer.toString());
		} catch (ConnectException ce) {
			log.error("Weixin server connection timed out.");
		} catch (Exception e) {
			log.error("https request error:{}", e);
		}
		return jsonObject;
	}
	
	
	
	// 在在在
		public static String httpsRequestStr(String requestUrl,String requestMethod, String outputContent) {
//			String s  = System.setProperty("https.protocols", "TLSv1");
			String jsonStr = null;
			StringBuffer buffer = new StringBuffer();
			HttpsURLConnection httpUrlConn = null;
			OutputStream outputStream = null;
			InputStreamReader inputStreamReader = null;
			BufferedReader bufferedReader = null;
			try {
				TrustManager[] tm = { new MyX509TrustManager() };
				SSLContext sslContext = SSLContext.getInstance("SSL");
				sslContext.init(null, tm, new SecureRandom());
				SSLSocketFactory ssf = sslContext.getSocketFactory();
				URL url = new URL(requestUrl);
				httpUrlConn = (HttpsURLConnection) url.openConnection();
				httpUrlConn.setSSLSocketFactory(ssf);
				httpUrlConn.setDoOutput(true);
				httpUrlConn.setDoInput(true);
				httpUrlConn.setUseCaches(false);
				httpUrlConn.setRequestMethod(requestMethod);
				httpUrlConn.setConnectTimeout(5000);// 5秒
				httpUrlConn.connect();
				if (StringUtil.isNotEmpty(outputContent)) {
					outputStream = httpUrlConn.getOutputStream();
					outputStream.write(outputContent.getBytes("UTF-8"));
				}
				inputStreamReader = new InputStreamReader(
						httpUrlConn.getInputStream(), "utf-8");
				bufferedReader = new BufferedReader(inputStreamReader);
				String str = null;
				while ((str = bufferedReader.readLine()) != null) {
					buffer.append(str);
				}
				log.error("请求返回结果：" + buffer.toString());
				jsonStr = buffer.toString();
			} catch (ConnectException ce) {
				log.error("http连接异常：", ce);
			} catch (Exception e) {
				log.error("http异常：", e);
			} finally {
				if(bufferedReader!=null)
					try {
						bufferedReader.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				if(inputStreamReader!=null)
					try {
						inputStreamReader.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				if(outputStream!=null)
					try {
						outputStream.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				if(httpUrlConn!=null)httpUrlConn.disconnect();
			}
			return jsonStr;
		}
	
	
}
