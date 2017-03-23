package com.hz.base.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 时间处理类
 * @author gaoqingbao
 */
public class DateUtil
{
	private static String datePattern = "yyyy-MM-dd";
	private static String timePattern = "HH:mm";
	private static int TIME_12HR = 1;
	private static int TIME_24HR = 2;
	/** 用来全局控制 上一周，本周，下一周的周数变化 */
	private static int weeks = 0;
	private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);

	public DateUtil()
	{
	}

	/**
	 * Return 缺省的日期格式 (yyyy/MM/dd)
	 * 
	 * @return 在页面中显示的日期格式
	 */
	public static String getDatePattern()
	{
		return datePattern;
	}

	/**
	 * 根据日期格式，返回日期按datePattern格式转换后的字符串
	 * @param aDate 日期对象
	 * @return 格式化后的日期的页面显示字符串
	 */
	public static final String getDate(Date aDate)
	{
		SimpleDateFormat df = null;
		String returnValue = StringUtil.EMPTY;
		if (aDate != null)
		{
			df = new SimpleDateFormat(datePattern);
			returnValue = df.format(aDate);
		}
		return (returnValue);
	}

	public static final String getDate(String pattern)
	{
		Date date = new Date();
		return getDate(date, pattern);
	}

	public static final String getDate(Date date, String pattern)
	{
		SimpleDateFormat df = null;
		String returnValue = StringUtil.EMPTY;
		if (date != null)
		{
			df = new SimpleDateFormat(pattern);
			returnValue = df.format(date);
		}
		return (returnValue);
	}

	public static Date getDate(String dateString, String pattern)
	{
		SimpleDateFormat df = null;
		Date date = new Date();
		if (dateString != null)
		{
			try
			{
				df = new SimpleDateFormat(pattern);
				date = df.parse(dateString);
			}
			catch (Exception e)
			{
			}
		}
		return date;
	}

	/**
	 * 按照日期格式，将字符串解析为日期对象
	 * 
	 * @param aMask 输入字符串的格式
	 * @param strDate 一个按aMask格式排列的日期的字符串描述
	 * 
	 * @return Date 对象
	 * @see java.text.SimpleDateFormat
	 * @throws ParseException
	 */
	public static final Date convertStringToDate(String aMask, String strDate)
	{
		SimpleDateFormat df = null;
		Date date = null;
		df = new SimpleDateFormat(aMask);
		try
		{
			date = df.parse(strDate);
		}
		catch (ParseException pe)
		{
		}
		return (date);
	}

	/**
	 * This method returns the current date time in the format: yyyy/MM/dd HH:MM
	 * @param theTime the current time
	 * @return the current date/time
	 */
	public static String getTimeNow(Date theTime)
	{
		return getDateTime(timePattern, theTime);
	}

	/**
	 * This method returns the current date in the format: yyyy/MM/dd
	 * 
	 * @return the current date
	 * @throws ParseException
	 */
	public static Calendar getToday() throws ParseException
	{
		Date today = new Date();
		SimpleDateFormat df = new SimpleDateFormat(datePattern);
		String todayAsString = df.format(today);
		Calendar cal = new GregorianCalendar();
		cal.setTime(convertStringToDate(todayAsString));
		return cal;
	}

	/**
	 * This method generates a string representation of a date's date/time in the format you specify on input
	 * 
	 * @param aMask the date pattern the string is in
	 * @param aDate a date object
	 * @return a formatted string representation of the date
	 * 
	 * @see java.text.SimpleDateFormat
	 */
	public static final String getDateTime(String aMask, Date aDate)
	{
		SimpleDateFormat df = null;
		String returnValue = StringUtil.EMPTY;
		if (aDate == null)
		{
			logger.warn("aDate is null!");
		}
		else
		{
			df = new SimpleDateFormat(aMask);
			returnValue = df.format(aDate);
		}
		return (returnValue);
	}

	/**
	 * 根据日期格式，返回日期按datePattern格式转换后的字符串
	 * 
	 * @param aDate Date
	 * @return String
	 */
	public static final String convertDateToString(Date aDate)
	{
		return getDateTime(datePattern, aDate);
	}

	/**
	 * 根据日期格式，返回日期按datePattern格式转换后的字符串
	 * 
	 * 
	 * @param aDate Date
	 * @return String
	 */
	public static final String convertDateToString(String pattern, Date aDate)
	{
		if (StringUtils.isNotBlank(pattern))
			return getDateTime(pattern, aDate);
		else
			return getDateTime(datePattern, aDate);
	}

	/**
	 * 按照日期格式，将字符串解析为日期对象
	 * @param strDate String
	 * @return Date
	 * @throws ParseException
	 */
	public static Date convertStringToDate(String strDate)
	{
		Date aDate = null;
		aDate = convertStringToDate(datePattern, strDate);
		return aDate;
	}

	public static String getYear()
	{
		Date date = new Date();
		return getDate(date, "yyyy");
	}

	public static String getMonth()
	{
		Date date = new Date();
		return getDate(date, "MM");
	}

	public static String getDay()
	{
		Date date = new Date();
		return getDate(date, "dd");
	}

	/**
	 * 返回小时
	 * @param date 日期
	 * @return 返回小时
	 */
	public static int getHour(java.util.Date date)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(date);
		return c.get(java.util.Calendar.HOUR_OF_DAY);
	}

	/**
	 * 返回分钟
	 * @param date 日期
	 * @return 返回分钟
	 */
	public static int getMinute(java.util.Date date)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(date);
		return c.get(java.util.Calendar.MINUTE);
	}

	/**
	 * 返回秒钟
	 * @param date 日期
	 * @return 返回秒钟
	 */
	public static int getSecond(java.util.Date date)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(date);
		return c.get(java.util.Calendar.SECOND);
	}

	/**
	 * 返回毫秒
	 * @param date 日期
	 * @return 返回毫秒
	 */
	public static long getMillis(java.util.Date date)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(date);
		return c.getTimeInMillis();
	}

	/**
	 * 日期相加
	 * @param date 日期
	 * @param day 天数
	 * @return 返回相加后的日期
	 */
	public static java.util.Date addDate(java.util.Date date, int day)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTimeInMillis(getMillis(date) + ((long) day) * 24 * 3600 * 1000);
		return c.getTime();
	}

	/**
	 * 返回date经过minute分钟后的时间
	 * @author lisz
	 * @date 2009-1-9
	 */
	public static java.util.Date addMinute(java.util.Date date, int minute)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTimeInMillis(getMillis(date) + ((long) minute) * 60 * 1000);
		return c.getTime();
	}

	/**
	 * 日期相减
	 * @param date 日期
	 * @param day 天数
	 * @return 返回相减后的日期
	 */
	public static java.util.Date redDate(java.util.Date date, int day)
	{
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTimeInMillis(getMillis(date) - ((long) day) * 24 * 3600 * 1000);
		return c.getTime();
	}

	/**
	 * 日期相减
	 * @param date 日期
	 * @param date1 日期
	 * @return 返回相减后的日期
	 */
	public static int diffDate(java.util.Date date, java.util.Date date1)
	{
		return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
	}

	public static int diffDateToHour(Date date, Date date1)
	{
		return (int) ((getMillis(date) - getMillis(date1)) / (1000 * 60 * 60));
	}

	/** 获得当前日期与本周一相差的天数 */
	private static int getMondayPlus()
	{
		Calendar cd = Calendar.getInstance();
		/** 获得今天是一周的第几天，星期日是第一天，星期二是第二天 */
		int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK);
		if (dayOfWeek == 1)
		{
			return -6;
		}
		else
		{
			return 2 - dayOfWeek;
		}
	}

	/** 获得上周星期一的日期 */
	public String getPreviousMonday()
	{
		weeks--;
		int mondayPlus = DateUtil.getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		return preMonday;
	}

	/** 获得本周星期一的日期 */
	public static String getCurrentMonday()
	{
		weeks = 0;
		int mondayPlus = getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus);
		Date monday = currentDate.getTime();
		/*DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);*/
		SimpleDateFormat df =new SimpleDateFormat(datePattern);
		String preMonday = df.format(monday);
		return preMonday;
	}

	/** 获得下周星期一的日期 */
	public static String getNextMonday()
	{
		// weeks++;
		int mondayPlus = getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * 1);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		return preMonday;
	}

	/** 获得相应周的周日的日期 */
	public static String getSunday()
	{
		int mondayPlus = DateUtil.getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks + 6);
		Date monday = currentDate.getTime();
		/*DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);*/
		SimpleDateFormat df =new SimpleDateFormat(datePattern);
		String preMonday = df.format(monday);
		return preMonday;
	}

	/** 获得下周的周五的日期 */
	public static String getNextFriday()
	{
		// weeks++;
		int mondayPlus = DateUtil.getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * 1 + 4);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		return preMonday;
	}

	/**
	 * <p>
	 * </p>
	 * @author gaoqingbao
	 * @return
	 */
	public String getFormatCurrentStartMonth()
	{
		SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM");
		String datetime = tempDate.format(new java.util.Date());
		Date convertStringToDate = convertStringToDate(datetime + "-01");
		String formatDate = convertDateToString(convertStringToDate);
		return formatDate;
	}

	/**
	 * <p>
	 * </p>
	 * @author gaoqingbao
	 * @return
	 */
	public String getFormatCurrentEndMonth()
	{
		SimpleDateFormat tempDate = new SimpleDateFormat("yyyyMM");
		String datetime = tempDate.format(new java.util.Date());
		String yy = datetime.substring(0, 4);
		String mm = datetime.substring(4, 6);
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, Integer.valueOf(yy));
		c.set(Calendar.MONTH, Integer.valueOf(mm));
		return yy + "-" + mm + "-" + c.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * <p>
	 * 获得本周时间的起始时间,既本周一的时间
	 * </p>
	 * @author gaoqingbao
	 * @return
	 */
	public String getFormatCurrentMonday()
	{
		weeks = 0;
		int mondayPlus = this.getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		Date convertStringToDate = convertStringToDate(preMonday);
		String formatDate = convertDateToString(convertStringToDate);
		return formatDate;
	}

	/**
	 * <p>
	 * 获得本周时间的截止时间,既本周日的时间
	 * </p>
	 * @author gaoqingbao
	 * @return 格式化的时间
	 */
	public String getFormatCurrentSunday()
	{
		int mondayPlus = this.getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks + 6);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		Date convertStringToDate = convertStringToDate(preMonday);
		String formatDate = convertDateToString(convertStringToDate);
		return formatDate;
	}

	/**
	 * 返回某天所在周的周一（一周从周一开始，到周日结束）
	 * @author linzongxue
	 */
	public static Date getMondayOfTheWeek(Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int week = cal.get(Calendar.DAY_OF_WEEK);
		if (week == Calendar.SUNDAY)
			cal.add(Calendar.DAY_OF_MONTH, -7);
		cal.set(Calendar.DAY_OF_WEEK, 2);// 周一
		return cal.getTime();
	}

	/**
	 * 返回某天所在周的周日（一周从周一开始，到周日结束）
	 * @author linzongxue
	 */
	public static Date getSundayOfTheWeek(Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int week = cal.get(Calendar.DAY_OF_WEEK);
		if (week == Calendar.SUNDAY)
			cal.add(Calendar.DAY_OF_MONTH, -7);
		cal.set(Calendar.DAY_OF_WEEK, 7); // 周六
		cal.add(Calendar.DAY_OF_MONTH, 1);// 再往后一天
		return cal.getTime();
	}

	/**
	 * 返回某天所在月的第一天
	 * 
	 * @author linzongxue
	 */
	public static Date getFirstDayOfTheMonth(Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMinimum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	/**
	 * 返回某天所在月的最后一天
	 * 
	 * @author linzongxue
	 */
	public static Date getLastDayOfTheMonth(Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	/**
	 * 取时间差
	 * 
	 * @param timestamp1
	 * @param timestamp2
	 * @param showSecond 是否显示秒
	 * 
	 * @return
	 */
	public static String getTimeInterval(Timestamp timestamp1, Timestamp timestamp2, boolean showSecond)
	{
		if (timestamp1 == null || timestamp2 == null)
			return StringUtil.EMPTY;
		StringBuffer buf = new StringBuffer();
		long time1 = timestamp1.getTime();
		long time2 = timestamp2.getTime();
		long time = Math.abs(time1 - time2) / 1000L;
		// day
		long day = time / (24 * 60 * 60);
		// hour
		time = time - day * 24 * 60 * 60;
		long hour = time / (60 * 60);
		// minute
		time = time - hour * 60 * 60;
		long minute = time / 60;
		// second
		time = time - minute * 60;
		long second = time;
		if (day > 0 && minute > 30) // 如果超过一天，不显示分钟，小时四舍五入
			hour += 1;
		if (day != 0)
		{
			buf.append(day + "天");
		}
		if (hour != 0)
		{
			buf.append(hour + "小时");
		}
		if (day == 0 && minute != 0)
		{ // 不够一天，才显示分钟
			buf.append(minute + "分");
		}
		if (showSecond || buf.length() == 0)
		{
			if (second != 0)
			{
				buf.append(second + "秒");
			}
			else
			{
				buf.append(1 + "秒");
			}
		}
		return buf.toString();
	}

	/**
	 * @see #getTimeInterval(Timestamp, Timestamp, boolean)
	 * @param timestamp1
	 * @param timestamp2
	 * @return
	 */
	public static String getTimeInterval(Timestamp timestamp1, Timestamp timestamp2)
	{
		return getTimeInterval(timestamp1, timestamp2, false);
	}

	/**
	 * beforeTime 较早时间 afterTime 较迟时间 minute 分钟 返回：较迟时间afterTime-较早时间beforeTime>minute分钟时，返回true，否则，返回false
	 * @author lisz
	 * @date 2009-1-9
	 */
	public static boolean judgeTimeInterval(Date beforeDate, Date afterDate, long minute)
	{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp beforeTime = Timestamp.valueOf(df.format(beforeDate));
		Timestamp afterTime = Timestamp.valueOf(df.format(afterDate));
		long before = beforeTime.getTime();
		long after = afterTime.getTime();
		return (after - before) >= minute * 60 * 1000L;
	}

	public static long timeInterval(Date beforeDate, Date afterDate)
	{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp beforeTime = Timestamp.valueOf(df.format(beforeDate));
		Timestamp afterTime = Timestamp.valueOf(df.format(afterDate));
		long before = beforeTime.getTime();
		long after = afterTime.getTime();
		if (after <= before)
			return 0;
		else
			return (after - before) / (60 * 1000L);
	}

	public static Date coverStrToDate(String dateStr)
	{
		Date aDate = null;
		aDate = convertStringToDate("yyyy-MM-dd HH:mm:ss", dateStr);
		return aDate;
	}

	/**
	 * 在默认日期格式的字符串上加上或减去几天
	 * @return 返回运算后的日期字符串
	 * @例子:将日期字串"2008-11-24"加二天:addDate("2008-11-24",2);
	 * @例子:将日期字串"2008-11-24"减二天:addDate("2008-11-24",-2);
	 * @author niezhenzhi
	 */
	public static String addDate(String date, int day)
	{
		Calendar c = Calendar.getInstance();
		c.setTime(convertStringToDate(date));
		c.add(Calendar.DAY_OF_MONTH, day);
		return convertDateToString(c.getTime());
	}

	/**
	 * 得到默认日期格式的字串是星期几
	 * 
	 * @param date
	 * @return 返回Calendar的星期常量
	 */
	public static int getWeekIntByDateStr(String date)
	{
		Calendar c = Calendar.getInstance();
		c.setTime(convertStringToDate(date));
		int week = c.get(Calendar.DAY_OF_WEEK);
		return week;
	}

	/**
	 * 判断是否为周六或周日
	 * @param date
	 * @return 是周未则为true.
	 */
	public static boolean isWeekEnd(Date date)
	{
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int week = c.get(Calendar.DAY_OF_WEEK);
		if (week == Calendar.SUNDAY || week == Calendar.SATURDAY)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * 使用Date格式的时间差计算方法
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static long getMinuteTime(Date date1, Date date2)
	{
		if (date1 == null || date2 == null)
			return 0;
		long time1 = date1.getTime();
		long time2 = date2.getTime();
		long time = Math.abs(time1 - time2);
		long minute = time / (60 * 1000L);
		return minute;
	}

	/**
	 * 使用Timestamp格式的时间差计算方法
	 * @param timestamp1
	 * @param timestamp2
	 * @return
	 */
	public static long getMinuteTime(Timestamp timestamp1, Timestamp timestamp2)
	{
		if (timestamp1 == null || timestamp2 == null)
			return 0;
		long time1 = timestamp1.getTime();
		long time2 = timestamp2.getTime();
		long time = Math.abs(time1 - time2);
		long minute = time / (60 * 1000L);
		return minute;
	}

	/**
	 * 根据时间截格式字串，求出两者分钟数之差，支持12小时制，24小时制
	 * @param time1
	 * @param time2
	 * @return
	 */
	public static long getMinuteTime(String time1, String time2, int timeSystem)
	{
		if (StringUtils.isBlank(time1) || StringUtils.isBlank(time2))
			return 0;
		switch (timeSystem)
		{
		case 1:
			return getMinuteTime(Timestamp.valueOf(time1), Timestamp.valueOf(time2));
		case 2:
		{
			SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date1 = null;
			Date date2 = null;
			try
			{
				date1 = fmt.parse(time1);
				date2 = fmt.parse(time2);
			}
			catch (ParseException e)
			{
			}
			return getMinuteTime(date1, date2);
		}
		default:
			return 0;
		}
	}

	/**
	 * 根据timetamp格式字串，求出两者分钟数之差
	 * @param time1 yyyy-mm-dd hh:mm:ss
	 * @param time2 yyyy-mm-dd hh:mm:ss
	 * @return
	 */
	public static long getMinuteTime(String time1, String time2)
	{
		return getMinuteTime(time1, time2, TIME_24HR);
	}
}
