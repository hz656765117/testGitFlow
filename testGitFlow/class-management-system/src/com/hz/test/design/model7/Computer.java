package com.hz.test.design.model7;
/**
 * 外观模式是为了解决类与类之间的依赖关系的，像spring一样，
 * 可以将类和类之间的关系配置到配置文件中，
 * 而外观模式就是将他们的关系放在一个Facade类中，
 * 降低了类类之间的耦合度，该模式中没有涉及到接口。
 * @author huangzhuo
 *
 */
public class Computer {
	private Cpu cpu;
	private Memory memory;
	private Disk disk;
	public Computer() {
		this.cpu = new Cpu();
		this.memory = new Memory();
		this.disk = new Disk();
	}
	
	public void startUp(){
		this.cpu.startUp();
		this.memory.startUp();
		this.disk.startUp();
	}
	
	public void shunDown(){
		this.cpu.shutDown();
		this.memory.shutDown();
		this.disk.shutDown();
	}
	
}
