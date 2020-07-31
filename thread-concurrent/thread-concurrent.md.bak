---
title: Android coder 并发编程你了解多少
tags:
  - Java
  - Thread
copyright: true
comments: true
date: 2020-07-28 23:59:17
categories: Java
top: 119
photos:
---

{% li https://cdn.lishaoy.net/thread-concurrent/concurrent1.png, concurrent,concurrent %}

对于 **Android** 开发人员来说，并发编程知识的使用并不是那么频繁(相对于 **Java** 开发者而言)，但是，我们想写一些框架或者阅读开源框架源码都需要掌握并发编程的相关知识，而且，并发编程相关知识也是面试高频问题之一，所以，我们也要全面的掌握并发编程知识，本篇文章将从浅入深概述并发编程知识。

<hr />

<!-- more -->

本篇文章的示例代码放在 [Github](https://github.com/persilee/android_practice) 上，所有知识点，如图：

<div style="width: 100%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/concurrent.xmind.png "")

</div>

## 基础概念

在理解并发编程之前，我需要理解一些相关的基本概念，我们先从一些相关的基本概念开始。

### CPU核心数和线程数的关系

**多核心:** 是物理上的，单核、双核、多核，指的就是物理核心的数目。

**多线程:** 是逻辑上的，简单的说就是模拟出的 CPU 核心数；

**核心数和线程数的关系:** 目前主流 CUP 有双核、三核和四核，增加核心数目就是为了增加线程数,因为操作系统是通过线程来执行任务的，一般情况下它们是1:1对应关系，也就是说四核CPU一般拥有四个线程。但 Intel 引入超线程技术后,使核心数与线程数形成1:2的关系。

### CPU时间片轮转机制

我们平时在开发的时候，感觉并没有受cpu核心数的限制，想启动线程就启动线程，哪怕是在单核CPU上，为什么？这是因为操作系统提供了一种CPU时间片轮转机制。

时间片轮转调度是一种最古老、最简单、最公平且使用最广的算法,又称RR(Round-Robin，RR)调度。根据先进先出原则，排成队列(就绪队列)，调度时，将 CPU 分配给队首进程，让其执行一个时间段(称为：时间片)，时间片通常为 10-100ms 数量级，当执行的时间片用完时，会由计时器发出时钟中断请求，调度程序便据此来停止该进程的执行，并将它排到队列末尾，然后再把 CPU 重新分配给当前队列的队首进程，同理如此往复。

### 什么是进程和线程

**进程是程序运行资源分配的最小单位**，其中资源包括：CPU、内存空间、磁盘等,同一进程中的多个线程共享该进程中的全部系统资源，而进程和进程之间是相互独立的。进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动,进程是系统进行资源分配和调度的一个独立单位。

进程是程序在计算机上的一次执行活动。当你运行一个程序，你就启动了一个进程。显然，程序是死的、静态的，进程是活的、动态的。进程可以分为系统进程和用户进程，凡是用于完成操作系统的各种功能的进程就是系统进程，它们就是处于运行状态下的操作系统本身，用户进程就是所有由你启动的进程。

**线程是 CPU 调度的最小单位,必须依赖于进程而存在**，线程是进程的一个实体，是 CPU 调度和分派的基本单位，它是比进程更小的、能独立运行的基本单位。线程自己基本上不拥有系统资源，只拥有一点在运行中必不可少的资源(如程序计数器，一组寄存器和栈),但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。

### 并行和并发

我们举个例子，如果有条高速公路A上面并排有6条车道，公路中间有个收费站，那么，在某一时刻，同时通过此收费站的，就是并行；在单位时间内通过此收收费站的，就是并发。

当谈论并发的时候一定要加个单位时间，也就是说单位时间内并发量是多少，离开了单位时间其实是没有意义的。

**并行:** ：指在同一时刻，有多条指令在多个处理器上同时执行。

**并发:** ：指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行。

## 线程(Thread)

### 线程的启动

启动线程的方式有，如下：

- className extends Thread，重新 `run()` 方法
- className implements Runnable，然后，由 `Thread` 运行
- className implements Callable，然后，由 `Thread` 运行

代码如下：

```java
public class NewThread {

    /**
     * 继承 Thread，重写 run() 方法
     */
    private static class UseThread extends Thread {

        @Override
        public void run() {
            super.run();

            System.out.println("extends Thread");
        }
    }

    /**
     * 实现 Runnable 接口
     */
    private static class UseRunnable implements Runnable {

        @Override
        public void run() {
            System.out.println("implements Runnable");
        }
    }

    /**
     * 实现 Callable 接口
     */
    private static class UseCallable implements Callable<String> {

        @Override
        public String call() throws Exception {
            System.out.println("implements Callable");
            return "return UseCallable";
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 使用 Thread 创建线程
        UseThread useThread = new UseThread();
        useThread.start();
        // 使用 Runnable 创建线程
        UseRunnable useRunnable = new UseRunnable();
        new Thread(useRunnable).start();
        // 使用 Callable 创建线程
        UseCallable useCallable = new UseCallable();
        FutureTask<String> task = new FutureTask<>(useCallable);
        new Thread(task).start();
        System.out.println(task.get()); // 通过 get 获取返回结果

    }

}
```

运行结果，如下：

```bash
extends Thread
implements Runnable
implements Callable
return UseCallable

BUILD SUCCESSFUL in 753ms
```

{% note primary %} 继承 Thread 的方式和实现 Runnable 的方式，执行完成后无法返回结果，实现 Callable 的方式，执行完成后可以返回结果。 (md partial supported) {% endnote %}

### run()和start()的区别

我们通过 `new Thread()` 只是 `new` 出一个 Thread 的示例，并没有和操作系统中的真正的线程挂钩，只有执行 `start()` 方法后，才真正的启动线程。

进入 `start()` 方法查看源码，可得知最终是调用了 `private native void start0()`，是一个 `native` 方法，是由 C 或 C++ 来操作系统(分配CPU等操作)，之后才调用 `run()` 方法，且 `start()` 方法不能重复调用。

`run()` 只是类的一个成员方法，和普通方法并无区别，可重复执行(如单独执行 run() 方法，并不会启动线程)。

示例代码如下：

```java
class StartRunMethod {

    public static class StartAndRun extends Thread {

        @Override
        public void run() {
            System.out.println("run: This is " + Thread.currentThread().getName()); // 获取当前线程名
        }

        public void runMethod() {
            System.out.println("runMethod: This is " + Thread.currentThread().getName()); // 获取当前线程名
        }
    }

    public static void main(String[] args) {

        StartAndRun startAndRun = new StartAndRun();
        startAndRun.setName("ThreadRun"); // 设置线程的名字
        startAndRun.start(); // 真正启动名字为 ThreadRun 的线程
        startAndRun.run();  // 只是一个普通方法，和 runMethod() 没有区别
        startAndRun.runMethod(); // 输出结果和 startAndRun.run() 相同

    }
}
```

运行结果如下：

```bash
run: This is main
runMethod: This is main
run: This is ThreadRun

BUILD SUCCESSFUL in 381ms
```

### 线程的中止

线程的终止，要么是 `run()` 执行完成，要么是抛出异常导致线程结束，我们也可以手动的中止线程，线程 Thread 的 API 给我们提供了 `stop()`、`resume()`、`suspend()` 方法，但是，他们都被标记为 `@deprecated`，也就是过期的，不建议使用，因为这些方法，在调用后，线程不会释放已经占有的资源，所以，容易导致死锁问题。

安全的中止线程，我们可以用 `interrupt()` 方法，此方法是一种协作的，也就是说它只是发送一个中断信号，不代表线程会立即停止，需要线程通过 `isInterrupted()` 方法进行判断是否中止线程。

示例代码如下：

```java
class InterruptThread {

    private static class MyThread extends Thread {

        @Override
        public void run() {
            String threadName = Thread.currentThread().getName(); // 获取当前线程名
           while (!isInterrupted()) { // 判断是否需要中止
               System.out.println(threadName + " running ...");
           }
        }
    }

    public static void main(String[] args) throws InterruptedException {

        MyThread myThread = new MyThread();
        myThread.start();
        Thread.sleep(6);
        myThread.interrupt(); // 发出中断信号

    }
}
```

### 按顺序执行线程

我们来新建一个类，代码如下：

```java
class JoinThread {

    private static class JoinMethod extends Thread {

        private Thread thread;

        public JoinMethod(Thread thread) {
            this.thread = thread;
        }

        @Override
        public void run() {
            for (int i = 0; i < 6; i++) {
                System.out.println(thread.getName() + " running ... ");
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {

        JoinMethod joinMethod = new JoinMethod(new Thread());
        JoinMethod joinMethod1 = new JoinMethod(new Thread());
        joinMethod.start();
        joinMethod1.start();
    }
}
```

运行结果，如下：

```bash
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 

BUILD SUCCESSFUL in 213ms
2 actionable tasks: 1 executed, 1 up-to-date
11:31:47 PM: Task execution finished 'JoinThread.main()'.
```

发现，joinMethod 线程和 joinMethod1 线程是随机交替执行的，那么如何让它们按顺序执行呢，我们可以使用 `join()` 方法，如下：

```java
public static void main(String[] args) throws InterruptedException {

    JoinMethod joinMethod = new JoinMethod(new Thread());
    JoinMethod joinMethod1 = new JoinMethod(new Thread());
    joinMethod.start();
    joinMethod.join(); // 使用 join() 方法，由 joinMethod 执行完成之后才让出执行权
    joinMethod1.start();

}
```

输出结果，如下：

```bash
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-0 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 
Thread-2 running ... 

BUILD SUCCESSFUL in 482ms
2 actionable tasks: 2 executed
11:36:17 PM: Task execution finished 'JoinThread.main()'.
```

### 线程的状态

在 Java 中线程的状态分为 6 中：

- 初始(NEW)：新创建了一个线程对象，但还没有调用 `start()` 方法。
- 运行(RUNNABLE)：Java 线程中将就绪(ready)和运行中(running)两种状态笼统的称为“运行”。线程对象创建后，其他线程(比如main线程)调用了该对象的 `start()` 方法。该状态的线程位于可运行线程池中，等待被线程调度选中，获取 CPU 的使用权，此时处于就绪状态(ready)。就绪状态的线程在获得 CPU 时间片后变为运行中状态(running)。
- 阻塞(BLOCKED)：表示线程阻塞于锁。
- 等待(WAITING)：进入该状态的线程需要等待其他线程做出一些特定动作（通知或中断）。1
- 超时等待(TIMED_WAITING)：该状态不同于WAITING，它可以在指定的时间后自行返回。
- 终止(TERMINATED)：表示该线程已经执行完毕。

状态之间的变迁，如图：

<div style="width: 86%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/thread.png "")

</div>

## 线程间的共享和协作

Java 支持多个线程同时访问一个对象或者访问一个对象里的成员变量，这个就是线程间的共享，共享的资源有，如：

- 堆：由于堆是在进程空间中开辟出来的，所以它是理所当然地被共享的，因此new出来的都是共享的
- 全局变量：它是与具体某一方法无关的，所以也与特定线程无关；因此也是共享的
- 静态变量：是共享的
- 文件等公用资源：是共享的

独享的资源有：栈和寄存器

### 线程的同步(Synchronization)

但是，线程间的共享存在一些问题，例如(让两个线程操作一个 count 变量进行累加)：

```java
class SharedThread {

    private int count = 0;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void addCount(){
        count++;
    }

    private static class CountThread extends Thread {

        private SharedThread sharedThread;

        public CountThread(SharedThread sharedThread) {
            this.sharedThread = sharedThread;
        }

        @Override
        public void run() {
            for (int i = 0; i < 6666; i++) {
                sharedThread.addCount();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SharedThread sharedThread = new SharedThread();
        CountThread countThread = new CountThread(sharedThread);
        CountThread countThread1 = new CountThread(sharedThread);
        countThread.start();
        countThread1.start();
        Thread.sleep(66);
        System.out.println(sharedThread.getCount());
        System.out.println(6666 * 2);
    }
}
```

运行结果，如下：

```java
7045
13332

BUILD SUCCESSFUL in 247ms
```

运行了几次，都是小于 13332(6666 * 2)，这就是线程间共享的同步问题，解决此问题我们需要使用 `synchronized`。

所以，我们把以上代码稍作修改，如：

```java
class SharedThread {

    ...

    public synchronized void addCount(){
        count++;
    }

    ...
}
```

运行结果，如下：

```bash
13332
13332

BUILD SUCCESSFUL in 324ms
```

我们也可以使用，这种方式，如下：

```java
class SharedThread {

    private int count = 0;
    private Object object = new Object(); // 使用 Object 作为锁

    ...

    public void addCount(){
        synchronized (object) {
            count++;
        }
    }

    ...
}
```

这两种方式并没有任何的差别，都是对象锁。

### 类锁和对象锁

我们来创建一个类 `ClassObjectLock` 来演示类锁和对象锁，如下：

```java
class ClassObjectLock {

    private static class ClassLock extends Thread {
        @Override
        public void run() {
            System.out.println("Class Lock is running ...");
            lockClass();
        }
    }

    private static class ObjectLock extends Thread {
        private ClassObjectLock classObjectLock;

        public ObjectLock(ClassObjectLock classObjectLock) {
            this.classObjectLock = classObjectLock;
        }

        @Override
        public void run() {
            System.out.println("Object Lock is running ...");
            classObjectLock.lockObject();
        }
    }

    private static class ObjectLock1 extends Thread {
        private ClassObjectLock classObjectLock;

        public ObjectLock1(ClassObjectLock classObjectLock) {
            this.classObjectLock = classObjectLock;
        }

        @Override
        public void run() {
            System.out.println("Object Lock1 is running ...");
            classObjectLock.lockObject1();
        }
    }

    // 对象锁
    private synchronized void lockObject() {
        SleepTool.second(2);
        System.out.println("Object Lock use");
        SleepTool.second(2);
        System.out.println("Object Lock end");
    }

    // 对象锁
    private synchronized void lockObject1() {
        SleepTool.second(2);
        System.out.println("Object Lock1 use");
        SleepTool.second(2);
        System.out.println("Object Lock1 end");
    }

    // 类锁，实际是锁类的class对象
    private static synchronized void lockClass() {
        SleepTool.second(2);
        System.out.println("Class Lock use");
        SleepTool.second(2);
        System.out.println("Class Lock end");
    }

    public static void main(String[] args) {
        ClassObjectLock classObjectLock = new ClassObjectLock();
        ObjectLock objectLock = new ObjectLock(classObjectLock);

        ClassObjectLock classObjectLock1 = new ClassObjectLock();
        ObjectLock1 objectLock1 = new ObjectLock1(classObjectLock1);
        objectLock.start();
        objectLock1.start();

        ClassLock classLock = new ClassLock();
        classLock.start();
    }
}
```

运行结果如下：

```bash
Object Lock is running ...
Object Lock1 is running ...
Class Lock is running ...
Object Lock use
Object Lock1 use
Class Lock use
Class Lock end
Object Lock end
Object Lock1 end

BUILD SUCCESSFUL in 4s
```

由运行结果可知，对象锁和对象锁之前是互不影响的，对象锁和类锁之前也是互不影响的。

### 等待和通知(wait、notify)

等待和通知就是属于线程间的协作，一般有等待方获取锁之后进行条件检查，条件满足，则执行逻辑代码，否则不执行；而通知方获取锁之后进行修改条件，之后通知等待方，实例代码，如下：

```java
public class WaitNotify {

    public final static String CITY = "beijing";
    private int km;
    private String site;

    public WaitNotify(int km, String site) {
        this.km = km;
        this.site = site;
    }

    // 改变公里数，并通知
    public synchronized void changeKm() {
        this.km = 66;
        notifyAll();
    }

    // 改变公站点，并通知
    public synchronized void changeSite() {
        this.site = "guangzhou";
        notifyAll();
    }

    // 如果公里数小于 66，就等待
    public synchronized void waitKm() throws InterruptedException {
        while (this.km < 66) {
            wait();
            System.out.println("check km thread: " + Thread.currentThread().getName());
        }
        System.out.println("km is " + this.km);
    }

    // 如果站点是beijing，就等待
    public synchronized void waitSite() throws InterruptedException {
        while (CITY.equals(this.site)) {
            wait();
            System.out.println("check site thread: " + Thread.currentThread().getName());
        }
        System.out.println("site is " + this.site);
    }
}
```

再新建一个测试类，如下：

```java
class Client {

    private static WaitNotify waitNotify = new WaitNotify(0, WaitNotify.CITY);

    private static class CheckKm extends Thread {

        @Override
        public void run() {
            try {
                waitNotify.waitKm();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private static class CheckSite extends Thread {
        @Override
        public void run() {
            try {
                waitNotify.waitSite();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 2; i++) {
            new CheckKm().start();
        }
        for (int i = 0; i < 2; i++) {
            new CheckSite().start();
        }

        Thread.sleep(1000);
        waitNotify.changeKm();
    }
}
```

运行结果如下：

```bash
check site thread: Thread-3
check site thread: Thread-2
check km thread: Thread-1
km is 66
check km thread: Thread-0
km is 66
```

可知 `notifyAll()` 方法会唤醒所有的线程，而 `notify()` 只会唤醒一个线程，且这个线程不一定是我们想唤醒的线程，所有，我们在使用时最好使用 `notifyAll()` 方法。

如上代码 `changeKm()`、`waitKm()`、`changeSite()`、`waitSite()` 方法都是对象锁，且锁的是同一个对象，如果有多个线程执行方法，那么他们之间不是有冲突吗？他们之间不会有冲突，因为，调用 `wait()` 方法之后，会释放锁，其他方法就可以获取锁。

## 显示锁(Lock)

`synchronized` 也被称作内置锁，因为 `synchronized` 的使用有些局限性，如：无法中断、无法实现尝试获取锁等，所以，Java 给我们提供了 **Lock** 也称为显示锁。

`Lock` 是一个接口，需要我们手动获取或释放锁，`Lock` 拥有 `synchronized` 所没有的功能，可以被中断 `lockInterruptibly()`，可以尝试获取锁 `tryLock()`等。

`Lock` 既然是一个接口，必然有实现，`Lock` 的使用有6个，如图：

<div style="width: 100%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/lock.png "")

</div>

常用的有 `ReadLock`、`WriteLock`、`ReentrantLock` 读写锁和可重入锁。

一般我们会这样使用它，如下：

```java
class LockDemo {

    private int count = 0;
    private Lock lock = new ReentrantLock();

    public void add() {
        lock.lock();
        try {
            count ++;
        } finally {
            lock.unlock(); // 在 finally 里释放锁，确保一定可以执行
        }
    }
}
```

### 可重入锁(ReentrantLock)

可重入锁就是可以重复获取锁，`synchronized` 本身就实现了可重入的功能，所以它也是可重入锁，可重入锁可以防止我们在递归调用时避免自己把自己锁死，如：

```java
public synchronized void add() {
    count ++;
    add();
}
```

### 公平锁和非公平锁

公平锁就是在多个线程申请获取锁时，先申请的一定先拿到，非公平锁就是当多个线程去申请获取锁时，后申请的反而先获取到锁。`synchronized` 在内部实现上是一个非公平锁，`ReentrantLock` 在默认也是非公平锁，一般非公平锁要比公平锁性能好，因为公平锁需要频繁的挂起和唤醒线程，存在大量的上下文切换。

## ThreadLocal的原理

### ThreadLocal和synchronized区别

`ThreadLocal` 和 `synchronized` 都用于解决多线程并发访问，它们的区别在于 `synchronized` 是利用锁机制，使变量在某一时刻仅被一个线程访问，而 `ThreadLocal` 是为每个线程都提供了变量的副本，使每个线程在某一时刻访问到的并非同一对象，隔离了多个线程对数据的共享。

### ThreadLocal的使用

`ThreadLocal` 就提供了线程的局部变量，每个线程都可以通过 `set()` 和 `get()` 来操作这个局部变量，不会和其他线程的局部变量产生冲突，实现了线程的数据隔离。

我们来看下不使用 `ThreadLocal` 的一个案例，如下：

```java
class UseThreadLocal {

    static Integer count = new Integer(1);

    // 启动 3 个线程
    public void StartThread() {
        Thread[] threads = new Thread[3];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(new RunnableThread(i));
        }
        for (int i = 0; i < threads.length; i++) {
            threads[i].start();
        }
    }

    // 希望每个线程单独操作自己 count 变量
    public static class RunnableThread implements Runnable {
        int id;

        public RunnableThread(int id) {
            this.id = id;
        }

        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName() + " start");
            count = count + id;
            System.out.println(Thread.currentThread().getName() + " count " + count);
        }
    }

    public static void main(String[] args) {
        UseThreadLocal threadLocal = new UseThreadLocal();
        threadLocal.StartThread();
    }

}
```

运行结果，如下：

```bash
Thread-0 start
Thread-0 count 1
Thread-2 start
Thread-1 start
Thread-1 count 4
Thread-2 count 3

BUILD SUCCESSFUL in 169ms
```

并不是我们设想的那样，这是因为，count 变量是3个线程所共享的数据导致，我们再来使用 `ThreadLocal`，如下：

```java
class UseThreadLocal {
    // 使用 ThreadLocal
    static ThreadLocal<Integer> count = new ThreadLocal<Integer>(){
        @Override
        protected Integer initialValue() {
            return 0;
        }
    };

    // 启动 3 个线程
    public void StartThread() {
        Thread[] threads = new Thread[3];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(new RunnableThread(i));
        }
        for (int i = 0; i < threads.length; i++) {
            threads[i].start();
        }
    }

    // 希望每个线程单独操作自己 count 变量
    public static class RunnableThread implements Runnable {
        int id;

        public RunnableThread(int id) {
            this.id = id;
        }

        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName() + " start");
            Integer integer = count.get(); // 获取 ThreadLocal 里的值
            integer = integer + id;
            count.set(integer); // 如果下次还有使用，需要 set 值
            System.out.println(Thread.currentThread().getName() + " count " + integer);
        }
    }

    public static void main(String[] args) {
        UseThreadLocal threadLocal = new UseThreadLocal();
        threadLocal.StartThread();
    }

}
```

运行结果，如下：

```bash
Thread-0 start
Thread-2 start
Thread-1 start
Thread-0 count 0
Thread-2 count 2
Thread-1 count 1

BUILD SUCCESSFUL in 530ms
```

这样就保证了每个线程操作自己的变量的副本，实现了线程的数据隔离。

### ThreadLocal原理解析

我们先可以进入 `ThreadLocal` 的 `set()` 方法查看源码，如下

```java
public void set(T var1) {
    Thread var2 = Thread.currentThread(); // 获取当前线程
    ThreadLocal.ThreadLocalMap var3 = this.getMap(var2); // 调用了 getMap() 方法，返回的是 ThreadLocal.ThreadLocalMap
    if (var3 != null) {
        var3.set(this, var1);
    } else {
        this.createMap(var2, var1);
    }

}
```

我们再进入 `ThreadLocal.ThreadLocalMap` 里，如下：

```java
static class ThreadLocalMap {
  private static final int INITIAL_CAPACITY = 16;
  private ThreadLocal.ThreadLocalMap.Entry[] table;  // 持有 Entry[] 数组
  private int size;
  private int threshold;

  ...
}
```

我们再来看看这个数组的定义，如下：

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    Object value;
    // Entry 又持有 ThreadLocal 和 Object 成员变量
    Entry(ThreadLocal<?> var1, Object var2) {
        super(var1);
        this.value = var2;
    }
}
```

也就是当我们去 `new ThreadLocal` 它就在当前线程里创建了一个 `ThreadLocalMap`且这个 Map 里持有多个 `Entry[]` 型的数组，而每个 `Entry` 持有成员 `ThreadLocal` 和 `Object`，结构如图：

<div style="width: 66%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/threadlocal1.png "threadlocal")

</div>

那么，为什么用数组保存 `Entry` 呢，因为可能有多个变量需要线程隔离。

其实，上面我们使用 `ThreadLocal` 时，用其实例 `count.get()` 就是获取到每个线程独有的 `ThreadLocalMap`，然后通过其实例获取到对应的 `Entry`，就可以获取返回值。

## CAS(Compare And Swap)

### 什么是原子操作

在编程中，atomic(原子) 动作是一次性完全发生的动作，原子动作不能在中间停止：它要么完全发生，要么根本不发生。

假设有两个操作 A 和 B (A 和 B 可能都很复杂)，如果从执行 A 的线程来看，当另一个线程执行 B 时，要么将 B 全部执行完成，要么全部执行不完成，那么 A 和 B 对彼此来说是原子的。

### 如何实现原子操作

实现原子操作可以使用锁，锁机制可以满足基本需求，比如：`synchronized` 所包围的代码就是一个原子操作，Java 也我我们提供了很多原子变量类，如：`Atomic` 开头的一些类

<div style="width: 66%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/atomic.png "atomic")

</div>

在现代 CUP 里基本都提供了一个 Compare And Swap (CAS)的指令，每个 CAS 操作都包含3个运算符：内存地址、期望值、新值，操作时如果这个地址存放的值等于期望值，则将地址的上的值赋为新增，否则不做任何操作，重新获取值，再来一次，直到成功，如图：

<div style="width: 56%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/cas.png "CAS")

</div>

### CAS原子操作的三大问题

#### ABA问题

因为CAS需要在操作值的时候，检查值有没有发生变化，如果没有发生变化则更新，但是如果一个值原来是 A，变成了 B，又变成了 A，那么使用 CAS 进行检查时会发现它的值没有发生变化，但是实际上却变化了。

ABA 问题的解决思路就是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加1，那么A→B→A 就会变成 1A→2B→3A。举个通俗点的例子，你倒了一杯水放桌子上，干了点别的事，然后同事把你水喝了又给你重新倒了一杯水，你回来看水还在，拿起来就喝，如果你不管水中间被人喝过，只关心水还在，这就是ABA问题。

#### 开销问题

因为，Java 实现 CAS 操作是使用自旋机制，如果 Compare 长时间不相等，会重复执行，给 CPU 带来非常大的开销。

#### 只能保证一个共享变量的原子操作

因为，CAS 是对地址上的值进行操作，因此它只能操作一个变量，如果我们需要同时操作多个变量 CAS 就无法保证操作的原子性。

### 原子操作类的使用

`AtomicInteger` 的使用，如下:

```java
class AtomicInt {

    static AtomicInteger atomicInteger = new AtomicInteger(6);

    public static void main(String[] args) {
        atomicInteger.getAndDecrement(); // 自增1，返回之前的值
        System.out.println(atomicInteger);
        atomicInteger.incrementAndGet(); // 自增1，返回新增
        System.out.println(atomicInteger);
        System.out.println(atomicInteger.addAndGet(6));
        System.out.println(atomicInteger.getAndAdd(6));
    }

}
```

`AtomicReference` 的使用，如下：

```java
class UseAtomicReference {

    static AtomicReference<UserInfo> reference; // 原子更新引用类型

    public static void main(String[] args) {
        UserInfo user = new UserInfo("lsy", 66);
        reference = new AtomicReference(user);
        UserInfo updateUser = new UserInfo("per",36);
        reference.compareAndSet(user,updateUser);

        System.out.println(reference.get());
        System.out.println(user);
    }

    //定义一个实体类
    static class UserInfo {
        private volatile String name;
        private int age;
        public UserInfo(String name, int age) {
            this.name = name;
            this.age = age;
        }
        public String getName() {
            return name;
        }
        public int getAge() {
            return age;
        }

        @Override
        public String toString() {
            return "UserInfo{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }

}
```

运行结果，如下：

```java
UserInfo{name='per', age=36}
UserInfo{name='lsy', age=66}

BUILD SUCCESSFUL in 552ms
```

Jdk中相关原子操作类有如下：

更新基本类型类：AtomicBoolean，AtomicInteger，AtomicLong
更新数组类：AtomicIntegerArray，AtomicLongArray，AtomicReferenceArray
更新引用类型：AtomicReference，AtomicMarkableReference，AtomicStampedReference

大部分用法都是类似的，在此，就不一一演示，感兴趣的小伙伴可以自行尝试。

## 阻塞队列

### 队列

队列(queue)是一种采用先进先出(FIFO)策略的抽象数据结构，即最先进队列的数据元素，同样要最先出队列。

在队列中插入一个队列元素称为入队，从队列中删除一个队列元素称为出队，因为队列只允许在一端插入，在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除，故队列又称为先进先出(FIFO—first in first out)线性表。

### 什么是阻塞队列

- 支持阻塞的插入方法：当队列满时，队列会阻塞插入元素的线程，直到队列空余。
- 支持阻塞的移除方法：当队列为空时，获取元素的线程会等待队列为非空。

在并发编程中使用生产者和消费者模式可以解决大多数并发问题，该模式通过平衡生产线程和消费线程的工作能力来提高程序处理数据的速度。

在线程世界里，生产者就是生产数据的线程，消费者就是消费数据的线程。在多线程开发中，如果生产者处理速度很快，而消费者处理速度很慢，那么生产者就必须等待消费者处理完，才能继续生产数据。同样的道理，如果消费者的处理能力大于生产者，那么消费者就必须等待生产者。

为了解决这种生产消费能力不均衡的问题，便有了生产者和消费者模式。生产者和消费者模式是通过一个容器来解决生产者和消费者的强耦合问题。生产者和消费者彼此之间不直接通信，而是通过阻塞队列来进行通信，所以生产者生产完数据之后不用等待消费者处理，直接扔给阻塞队列，消费者不找生产者要数据，而是直接从阻塞队列里取，阻塞队列就相当于一个缓冲区，平衡了生产者和消费者的处理能力。

在 Java 中阻塞队列有一个专门的接口 `BlockingQueue`，如图

<div style="width: 66%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/BlockingQueue.png "BlockingQueue")

</div>

它定义了一些方法，但是这些方法不是所有的都是阻塞的，如：`add()`、`remove()` 方法都是非阻塞的，`put()`、`take()` 方法是阻塞的。

### 常用的阻塞队列

以下的阻塞队列都实现了 `BlockingQueue` 接口，也都是线程安全的，如：

- ArrayBlockingQueue：一个由数组结构组成的有界阻塞队列。
- LinkedBlockingQueue：一个由链表结构组成的有界阻塞队列。
- PriorityBlockingQueue：一个支持优先级排序的无界阻塞队列。
- DelayQueue：一个使用优先级队列实现的无界阻塞队列。
- SynchronousQueue：一个不存储元素的阻塞队列。
- LinkedTransferQueue：一个由链表结构组成的无界阻塞队列。
- LinkedBlockingDeque：一个由链表结构组成的双向阻塞队列。

### 有界无界阻塞队列

有界队列就是长度有限，满了以后生产者会阻塞，无界队列就是里面能放无数的东西而不会因为队列长度限制被阻塞，当然空间限制来源于系统资源的限制，如果处理不及时，导致队列越来越大。所以，在我们实际开发中尽量使用有界阻塞队列。

无界也会阻塞，因为阻塞不仅仅体现在生产者放入元素时会阻塞，消费者拿取元素时，如果没有元素，同样也会阻塞。

## AQS(AbstractQueuedSynchronizer)

队列同步器 AbstractQueuedSynchronizer(简称同步器或AQS)，是用来构建锁或者其他同步组件的基础框架，它使用了一个 `int` 成员变量表示同步状态，通过内置的 FIFO 队列来完成资源获取线程的排队工作。

### AQS使用方式

AQS 的主要使用方式是继承，子类通过继承 AQS 并实现它的抽象方法来管理同步状态，在 AQS 里由一个`int` 型的 `state` 来代表这个状态，在抽象方法的实现过程中对同步状态进行更改，这时就需要使用同步器提供的3个方法 `getState()`、`setState(int newState)` 和 `compareAndSetState(int expect,int update)` 来进行操作，因为它们能够保证状态的改变是安全的。

AQS 是实现锁的关键，锁是面向使用者，它定义了使用者与锁交互的接口，隐藏了实现细节；AQS 面向的是锁的实现者，它简化了锁的实现方式，屏蔽了同步状态管理、线程的排队、等待、唤醒等底层操作。

实现者需要继承 AQS 并重写指定方法，然后将 AQS 组合在自定义同步组件的实现中，并调用 AQS 提供的模板方法，而这些模板方法将会调用使用者重写的方法。

### 模板方法设计模式

AQS 的设计师基于模板方法设计模式，模板方法设计模式是定义一个操作的算法的架子，而将一些步骤的实现延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

例如，我们想要做蛋糕，我们需要一个模型，每个人想做什么蛋糕，由他自己实现，代码，如下：

```java
// 蛋糕的模型，定义好了做蛋糕的步骤方法
public abstract class AbstractCake {

    protected abstract void mould(); // 制作形状
    protected abstract void butter(); // 涂抹奶油
    protected abstract void toast(); // 烤面包

    public final void making() {
        this.mould();
        this.butter();
        this.toast();
    }
}
```

子类去继承它，重写这些方法，如下：

```java
public class CheeseCake extends AbstractCake {

    @Override
    protected void mould() {
        System.out.println("芝士蛋糕制作形状 ...");
    }

    @Override
    protected void butter() {
        System.out.println("芝士蛋糕涂抹奶油 ...");
    }

    @Override
    protected void toast() {
        System.out.println("芝士蛋糕烤面包 ...");
    }
}
```

### CLH队列锁

CLH 队列锁也是一种基于链表的可扩展、高性能、公平的自旋锁，线程仅仅在本地变量上自旋，不断轮询前驱的状态，发现前驱释放了锁就结束自旋。

当一个线程需要获取锁时：

- 创建一个 QNode，将其中的 locked 设为 true 表示获取锁，如图：

<div style="width: 30%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/qnode.png "")

</div>

myPred 表示前驱节点的引用。

- 线程 A 对 tail 域调用 `getAndSet` 方法，使自己成为队列的尾部，同时获取一个指向前驱节点的引用 myPred，如图：

<div style="width: 46%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/qnode1.png "")

</div>

线程 B 需要获得锁，于是，也需要按照相同的流程，如图：

<div style="width: 56%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/qnode2.png "")

</div>

- 线程就在前驱的节点的 locked 字段上自旋，直到前驱节点释放锁
- 当一个线程需要释放锁时，会将当前节点的 locked 域设置为 false，同时回收前驱节点，如图

<div style="width: 56%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/thread-concurrent/qnode3.png "")

</div>

前驱节点释放锁后，线程 A 的 myPred 所指向的前驱节点的 locked 字段变为 false，线程 A 就可以获取锁。AQS 就是 CLH 队列锁的一种变体实现。
