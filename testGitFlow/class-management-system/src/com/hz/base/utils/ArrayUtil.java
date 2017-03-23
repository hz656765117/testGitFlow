package com.hz.base.utils;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;

public class ArrayUtil extends ArrayUtils {

	public static <T> T[] getSubArray(T[] array, int startIncluded, int endExcluded) {
		return (T[]) ArrayUtils.subarray(array, startIncluded, endExcluded);
	}

	/**
	 * 数组转换成列表（数据中的null或空字符串将被忽略）
	 * @param array
	 * @return list
	 */
	public static <T> List<T> getListByArrays(T[] array) {
		List<T> list = new ArrayList<T>();
		if ((array == null) || (array.length == 0)) {
			return list;
		}
		T[] arrayOfObject = array;
		int j = array.length;
		for (int i = 0; i < j; i++) {
			T t = arrayOfObject[i];
			if (t == null || t instanceof String && StringUtil.isEmpty((String) t)) continue;
			list.add(t);
		}
		return list;
	}
}
