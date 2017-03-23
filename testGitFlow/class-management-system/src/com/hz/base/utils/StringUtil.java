package com.hz.base.utils;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public final class StringUtil extends StringUtils {

	private static Map<Integer, String> NumStringMapping = new HashMap<Integer, String>();
	public static final String DEFAULT_PATH_SEPARATOR = ",";
	static {
		NumStringMapping.put(Integer.valueOf(2), "0");
		NumStringMapping.put(Integer.valueOf(3), "00");
		NumStringMapping.put(Integer.valueOf(4), "000");
		NumStringMapping.put(Integer.valueOf(5), "0000");
		NumStringMapping.put(Integer.valueOf(6), "00000");
		NumStringMapping.put(Integer.valueOf(7), "000000");
		NumStringMapping.put(Integer.valueOf(8), "0000000");
		NumStringMapping.put(Integer.valueOf(9), "00000000");
		NumStringMapping.put(Integer.valueOf(10), "000000000");
	}

	public static String hexByte(byte b) {
		return hexByte(b, 2);
	}

	public static String hexByte(byte b, int l) {
		final String prefix = "000000000000";
		String s = prefix + Integer.toHexString(b);
		if (s.length() >= l) {
			return s.substring(s.length() - l).toUpperCase();
		} else {
			return s.toUpperCase();
		}
	}

	public static String hexByte(byte[] src, String delimiter) {
		if (ArrayUtil.isEmpty(src)) {
			return null;
		}
		String sb = new String();
		for (int i = 0; i < src.length; i++) {
			sb = StringUtil.append(sb, hexByte(src[i]), delimiter);
		}
		return sb;
	}

	public static int compareTo(String str1, String str2) {
		return str1 == null ? (str2 == null ? 0 : -str2.length()) : str1.compareTo(defaultIfEmpty(str2, EMPTY));
	}

	public static int compareToIgnoreCase(String str1, String str2) {
		return str1 == null ? (str2 == null ? 0 : -str2.length()) : str1.compareToIgnoreCase(defaultIfEmpty(str2, EMPTY));
	}

	public static String getStringByNum(int digNum) {
		return isEmpty((String) NumStringMapping.get(Integer.valueOf(digNum))) ? "0000" : (String) NumStringMapping.get(Integer.valueOf(digNum));
	}

	public static String getStringByLong(long num, int digNum) {
		String numStr = String.valueOf(num);
		numStr = getStringByNum(digNum) + numStr;
		numStr = numStr.substring(numStr.length() - digNum);
		return numStr;
	}

	public static String getUTF8String(String srcStr) {
		try {
			if (isEmpty(srcStr)) {
				return srcStr;
			}
			return new String(srcStr.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 字符串是否为空
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		return (str == null) || (str.equals(""));
	}

	/**
	 * 增强的isEmpty，对数字类型的0也做了处理
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		}
		if ((obj instanceof String)) {
			return isEmpty((String) obj);
		}
		if ((obj instanceof String[])) {
			for (String s : (String[]) obj) {
				if (!isEmpty(s)) {
					return false;
				}
			}
			return true;
		}
		if ((obj instanceof Long)) {
			return ((Long) obj).longValue() == 0L;
		}
		if ((obj instanceof Integer)) {
			return ((Integer) obj).intValue() == 0;
		}
		if ((obj instanceof Float)) {
			return ((Float) obj).floatValue() == 0.0F;
		}
		return false;
	}

	public static String fromLongarrayToString(long[] src) {
		if (isEmpty(src)) {
			return "";
		}
		StringBuffer sb = new StringBuffer();
		long[] arrayOfLong = src;
		int j = src.length;
		for (int i = 0; i < j; i++) {
			long srId = arrayOfLong[i];
			sb.append(srId).append(",");
		}
		return sb.substring(0, sb.length() - 1);
	}

	public static String fromStringarrayToString(String[] src) {
		if (isEmpty(src)) {
			return "";
		}
		StringBuffer sb = new StringBuffer();
		String[] arrayOfString = src;
		int j = src.length;
		for (int i = 0; i < j; i++) {
			String srId = arrayOfString[i];
			if (!isNotEmpty(srId)) continue;
			sb.append(srId).append(",");
		}
		return sb.substring(0, sb.length() - 1);
	}

	public static String constructQueryStr(String srcString) {
		if (srcString.length() == 0) {
			return "(-1)";
		}
		StringBuffer checkQueryStr = new StringBuffer();
		if (srcString.endsWith(",")) {
			checkQueryStr.append("(").append(srcString.substring(0, srcString.length() - 1)).append(")");
		} else {
			checkQueryStr.append("(").append(srcString).append(")");
		}
		return checkQueryStr.toString();
	}

	public static String constructQueryStr(long[] ids) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < ids.length; i++) {
			if (i != 0) {
				sb.append(",");
			}
			long id = ids[i];
			sb.append(id);
		}
		return constructQueryStr(sb.toString());
	}

	public static String constructQueryStr(Long[] ids) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < ids.length; i++) {
			if (i != 0) {
				sb.append(",");
			}
			long id = ids[i].longValue();
			sb.append(id);
		}
		return constructQueryStr(sb.toString());
	}

//	public static String[] processDifferentStrings(String[] str1, String[] str2) {
//		Assert.notSameLengthArray(str1, str2, "两个数组长度不一致!");
//		Set<String> list = new HashSet<String>();
//		for (int i = 0; i < str1.length; i++) {
//			String s1 = str1[i];
//			String s2 = str2[i];
//			list.add(s1);
//			if (s1.equals(s2)) continue;
//			list.add(s2);
//		}
//		return (String[]) list.toArray(new String[0]);
//	}

	public static boolean isMobileNoValid(String mobileNo) {
		Pattern p = Pattern.compile("^1[3,5]{1}[0-9]{1}[0-9]{8}$");
		Matcher matcher = p.matcher(mobileNo);
		return (mobileNo != null) && (!"".equals(mobileNo)) && (matcher.find());
	}

	public static String constructQueryStrByList(List<Long> idList) {
		StringBuffer idStr = new StringBuffer("(");
		if ((idList != null) && (idList.size() > 0)) {
			for (int i = 0; i < idList.size(); i++) {
				idStr.append(idList.get(i)).append(",");
			}
			idStr.deleteCharAt(idStr.length() - 1).append(")");
		} else {
			idStr.append("-1)");
		}
		return idStr.toString();
	}

	public static String replaceDelimiter(String src, String oriDeli, String destDeli) {
		List<String> list = StringTokenAnaly.getStringList(src, oriDeli);
		StringBuffer ret = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			String str = (String) list.get(i);
			if (i != 0) {
				ret.append(destDeli);
			}
			ret.append(str);
		}
		return ret.toString();
	}

	public static String toFirstUpperCase(String str) {
		if ((str == null) || (str.length() == 0)) {
			return str;
		}
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}

	public static String getCodeByNativeId(long id, int digNum) {
		String str = getStringByNum(digNum);
		String ids = str + String.valueOf(id);
		return ids.substring(ids.length() - digNum);
	}

	public static String getShortStrWhileOthercharReplaceWith3Dots(String srcStr, int maxWidth) {
		return StringUtils.abbreviate(srcStr, maxWidth);
	}

	public static String[] strToStrArray(String str) {
		return strToStrArrayManager(str, ",");
	}

	public static String[] strToStrArray(String str, String separator) {
		return strToStrArrayManager(str, separator);
	}

	private static String[] strToStrArrayManager(String str, String separator) {
		StringTokenizer strTokens = new StringTokenizer(str, separator);
		String[] strArray = new String[strTokens.countTokens()];
		int i = 0;
		while (strTokens.hasMoreTokens()) {
			strArray[i] = strTokens.nextToken().trim();
			i++;
		}
		return strArray;
	}

	public static String trimLeft(String value) {
		String result = value;
		if (result == null) {
			return result;
		}
		char[] ch = result.toCharArray();
		int index = -1;
		for (int i = 0; i < ch.length; i++) {
			if (!Character.isWhitespace(ch[i])) break;
			index = i;
		}
		if (index != -1) {
			result = result.substring(index + 1);
		}
		return result;
	}

	public static String trimRight(String value) {
		String result = value;
		if (result == null) {
			return result;
		}
		char[] ch = result.toCharArray();
		int endIndex = -1;
		for (int i = ch.length - 1; i > -1; i--) {
			if (!Character.isWhitespace(ch[i])) break;
			endIndex = i;
		}
		if (endIndex != -1) {
			result = result.substring(0, endIndex);
		}
		return result;
	}

	public static String delString(String inputString, String delStrs) {
		if ((inputString == null) || (inputString.length() == 0)) {
			return inputString;
		}
		String[] strs = strToStrArray(delStrs);
		for (int i = 0; i < strs.length; i++) {
			if (strs[i].equals("")) {
				inputString = inputString.replaceAll(" ", "");
			} else if (strs[i].compareTo("a") >= 0) {
				inputString = replace(inputString, strs[i], "");
			} else {
				inputString = inputString.replaceAll("\\" + strs[i], "");
			}
		}
		if (subCount(delStrs, ",") > strs.length) {
			inputString = inputString.replaceAll("\\,", "");
		}
		return inputString;
	}

	public static int subCount(String parentStr, String subStr) {
		int count = 0;
		for (int i = 0; i < parentStr.length() - subStr.length(); i++) {
			String tempString = parentStr.substring(i, i + subStr.length());
			if (!subStr.equals(tempString)) continue;
			count++;
		}
		return count;
	}

	public static boolean isInteger(String str) {
		Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
		return pattern.matcher(str).matches();
	}

	public static boolean isDouble(String str) {
		Pattern pattern = Pattern.compile("^[-\\+]?[.\\d]*$");
		return pattern.matcher(str).matches();
	}

	public static String processStringAsInClause(String inData) {
		if (inData.endsWith(",")) {
			return inData.substring(0, inData.length() - 1);
		}
		return inData;
	}

	public static String append(String src, String append, String delimiter) {
		if (isEmpty(src)) {
			return isEmpty(append) ? StringUtil.EMPTY : append;
		} else {
			return isEmpty(append) ? src : new StringBuilder(src).append(isEmpty(delimiter) ? StringUtil.EMPTY : delimiter).append(append).toString();
		}
	}

	public static String prepend(String src, String prepend, String delimiter) {
		if (isEmpty(src)) {
			return isEmpty(prepend) ? StringUtil.EMPTY : prepend;
		} else {
			return isEmpty(prepend) ? src : new StringBuilder(prepend).append(isEmpty(delimiter) ? StringUtil.EMPTY : delimiter).append(src).toString();
		}
	}

	public static String[] splitEnhanced(String srcString, char delimiter) {
		StringBuffer processAfterString = new StringBuffer();
		boolean dlimiterOcur = false;
		for (int i = 0; i < srcString.length(); i++) {
			char c = srcString.charAt(i);
			if ((c == delimiter) && (dlimiterOcur)) {
				dlimiterOcur = true;
				processAfterString.append(" ").append(c);
			} else if (c == delimiter) {
				dlimiterOcur = true;
				processAfterString.append(c);
			} else {
				dlimiterOcur = false;
				processAfterString.append(c);
			}
		}
		return StringTokenAnaly.getStringArray(processAfterString.toString(), String.valueOf(delimiter));
	}

	public static String defaultIfEmpty(Object obj, String defValue) {
		try {
			return obj.toString();
		} catch (Exception ex) {
			return defValue;
		}
	}

	public static String valueOf(Object obj) {
		return defaultIfEmpty(obj, StringUtil.EMPTY);
	}

	/**
	 * 去重并集
	 * 
	 * @param arr1
	 * @param arr2
	 * @return
	 */
	public static String[] union(String[] arr1, String[] arr2) {
		List<String> list1 = ArrayUtil.getListByArrays(minus(arr1, arr2));
		list1.addAll(ArrayUtil.getListByArrays(arr2));
		Collections.sort(list1);
		return list1.toArray(new String[list1.size()]);
	}

	/**
	 * 差集
	 * 
	 * @param arr1
	 * @param arr2
	 * @return
	 */
	public static String[] minus(String[] arr1, String[] arr2) {
		List<String> list1 = ArrayUtil.getListByArrays(arr1);
		List<String> list2 = ArrayUtil.getListByArrays(arr2);
		list1.removeAll(list2);
		return list1.toArray(new String[list1.size()]);
	}

	/**
	 * 交集
	 * 
	 * @param arr1
	 * @param arr2
	 * @return
	 */
	public static String[] intersect(String[] arr1, String[] arr2) {
		List<String> list1 = ArrayUtil.getListByArrays(arr1);
		List<String> list2 = ArrayUtil.getListByArrays(arr2);
		list1.retainAll(list2);
		return list1.toArray(new String[list1.size()]);
	}

	public static void main(String[] args) {
		System.out.println(splitEnhanced("2,3,4,,, ", ','));
		System.out.println(isDouble("2222.0"));
		System.out.println(processStringAsInClause("2,3,4,5,6,7"));
		System.out.println(compareTo("1231", "1234"));
		System.out.println(compareTo("1231", ""));
		System.out.println(compareTo(null, "12"));
		System.out.println(compareTo("12", " "));
		System.out.println(compareTo("", "adb"));
		System.out.println(compareTo("Adb", "adb"));
		System.out.println(compareToIgnoreCase("Adb", "adb"));
		System.out.println(compareToIgnoreCase("2012-04-20", "2012-04-27"));
		String minus[] = minus(splitEnhanced("2,3,4,,, ", ','), splitEnhanced("1,2,3", ','));
		System.out.println("----");
		for (String str : minus) {
			System.out.println(str);
		}
		String union[] = union(splitEnhanced("2,3,4,,, ", ','), splitEnhanced("1,2,3", ','));
		System.out.println("----");
		for (String str : union) {
			System.out.println(str);
		}
		String intersect[] = intersect(splitEnhanced("2,3,4,,, ", ','), splitEnhanced("4,5,6", ','));
		System.out.println("----");
		for (String str : intersect) {
			System.out.println(str);
		}
	}
	
	
	private static final double EARTH_RADIUS = 6378.137;
	private static double rad(double d){
        return d * Math.PI / 180.0;
    }
	
	/**
	 * 
	 * @param long1
	 * @param lat1
	 * @param long2
	 * @param lat2
	 * @return
	 */
	public static double getDistance(double long1, double lat1, double long2, double lat2) {
        double a, b, d, sa2, sb2;
        lat1 = rad(lat1);
        lat2 = rad(lat2);
        a = lat1 - lat2;
        b = rad(long1 - long2);

        sa2 = Math.sin(a / 2.0);
        sb2 = Math.sin(b / 2.0);
        d = 2   * EARTH_RADIUS
                * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1)
                * Math.cos(lat2) * sb2 * sb2));
        return 1000*d;
    }
}
