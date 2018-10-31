package com.jianma.yxyp.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	/**
	 * date与当前时间比较大小，date>当前时间返回true 否则返回false
	 * 
	 * @param date
	 * @return
	 */
	public static boolean compareDate(String date) {
		Date d = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dateNowStr = df.format(d);

		try {
			Date dt1 = df.parse(date);
			Date dt2 = df.parse(dateNowStr);

			if (dt1.getTime() > dt2.getTime()) {
				return true;
			} else {
				return false;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	}

	public static String getTimeStampByDateString(String date) {
		String result = null;
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			result = String.valueOf(sd.parse(date).getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}

	public static String beforeDaytime(int day) {
		String t = "";
		DateFormat d = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.set(Calendar.DATE, c.get(Calendar.DATE) - 1);
		t = d.format(c.getTime());
		return t;
	}

	public static void main(String[] args) {
		// System.out.println(compareDate("2017-08-30"));
		System.out.println(getTimeStampByDateString("2018-10-01 18:33:53.805134"));
		System.out.println(getTimeStampByDateString("2018-10-01 18:03:53.805134"));
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateNowStr = df.format(new Date());
		System.out.println(getTimeStampByDateString(dateNowStr));
		System.out.println(beforeDaytime(1));
	}

}
