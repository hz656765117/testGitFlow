package com.hz.base.utils.common;

import java.util.regex.Pattern;


/**
 * @author yulewei on 2016/10/20
 */
public class BoxStringUtils {

	/**
	 * 对SQL的like查询特殊匹配字符 "%" 和 "_" 做转义 <br>
	 * \% matches one “%” character; \_ matches one “_” character.
	 * <p>
	 * 参见：http://dev.mysql.com/doc/refman/5.7/en/string-comparison-functions.html
	 *
	 * @param likeStr
	 * @return
	 */
	public static String sqlLikeEscape(String likeStr) {
		if (likeStr == null)
			return null;
		return likeStr.replace("%", "\\%").replace("_", "\\_");
	}
//
//	public static String faceUnEscape(String content) {
//		String[] arr = {"[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[大哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[酷]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]"};
//		for (int i = 0; i < arr.length; i++) {
//			String realFace = String.format("<img src=\"%sstatic/images/face/%s.png\" style=\"width:20px;height:20px;\" />", Config.getString("webPath"), i);
//			content = Pattern.compile(arr[i], Pattern.LITERAL).matcher(content).replaceAll(realFace);
//		}
//		return content;
//	}
//
//	public static void main(String[] args) {
//		System.out.println(BoxStringUtils.faceUnEscape("2456[微笑] [撇嘴]"));
//	}
}
