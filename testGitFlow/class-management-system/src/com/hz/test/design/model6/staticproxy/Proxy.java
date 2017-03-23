package com.hz.test.design.model6.staticproxy;
/**
 * 其实每个模式名称就表明了该模式的作用，代理模式就是多一个代理类出来，
 * 替原对象进行一些操作，比如我们在租房子的时候回去找中介，
 * 为什么呢？因为你对该地区房屋的信息掌握的不够全面，
 * 希望找一个更熟悉的人去帮你做，此处的代理就是这个意思。
 * 再如我们有的时候打官司，我们需要请律师，
 * 因为律师在法律方面有专长，可以替我们进行操作，
 * 表达我们的想法。先来看看关系图：
 * @author huangzhuo
 *
 */
public class Proxy implements Sourceable{
	private Source source;
	

	public Proxy() {
		this.source = new Source();
	}

	public void method1() {
		System.out.println("1111111111");
		source.method1();
		System.out.println("2222222222");
	}

	public void method2() {
		System.out.println("3333333333");
		source.method2();
		System.out.println("4444444444");
	}

}
