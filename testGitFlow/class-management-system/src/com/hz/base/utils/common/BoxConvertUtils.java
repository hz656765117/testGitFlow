package com.hz.base.utils.common;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * 对apache的ConvertUtils简单封装
 *
 * @author yulewei on 2016/9/28
 */
public class BoxConvertUtils {

	/**
	 * 默认按逗号“,”分割，返回数组。null或者空串 "" 将返回大小为 0 的数组
	 */
	public static <O> O[] convert2Arr(String str, Class clazz) {
		return BoxConvertUtils.convert2Arr(str, ",", clazz);
	}

	public static <O> O[] convert2Arr(String str, String separator, Class clazz) {
		if (StringUtils.isBlank(str)) {
			return (O[]) Array.newInstance(clazz, 0);
		}
		str = str.trim().replaceAll(separator + "{2,}", separator).replaceAll("^" + separator + "|" + separator + "$", "");
		if (str.isEmpty()) {
			return (O[]) Array.newInstance(clazz, 0);
		}
		String[] strArr = str.split(separator);
		return (O[]) ConvertUtils.convert(strArr, clazz);
	}

	public static <O> List<O> convert(String str, String separator, Class clazz) {
		return Arrays.asList((O[]) BoxConvertUtils.convert2Arr(str, separator, clazz));
	}

	/**
	 * 默认按逗号“,”分割，返回list。null或者空串 "" 将返回大小为 0 的 list
	 */
	public static <O> List<O> convert(String str, Class clazz) {
		return BoxConvertUtils.convert(str, ",", clazz);
	}

	public static void main(String[] args) {
		List<Integer> list = BoxConvertUtils.convert("-12--24-", "-", Integer[].class);
		System.out.println(StringUtils.join(list, ';'));
		Integer[] arr = (Integer[]) ConvertUtils.convert("12,23".split(","), Integer[].class);
		System.out.println(StringUtils.join(arr, ';'));

		arr = BoxConvertUtils.convert2Arr(",aa,", Integer.class);
		System.out.println(arr.length);
		list = BoxConvertUtils.convert("", Integer.class);
		System.out.println(list.size());
	}
}
