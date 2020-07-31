---
title: Android coder 需要理解的注解、反射和动态代理
tags:
  - Android
  - 注解
  - 反射
  - 动态代理
copyright: true
comments: true
date: 2020-07-28 06:33:01
categories: Java
top: 118
photos:
---

{% li https://cdn.lishaoy.net/annotations-reflect/annotations-reflect-proxy2.png, annotations reflect proxy, annotations reflect proxy %}

注解我们经常使用它，很多框架也提供了很多注解给我们使用，如 `ARouter` 的 `@Route(path = "/test/activity")` 、`butterknife` 的 `@BindView(R.id.user) EditText username;` 等，但是，你有没有自定义过注解，写过自己的注解处理器呢？反射听起来很高大上，但是实际上你真的了解他之后，只是一些API的调用而已；动态代理其实只是在静态代理(代理模式)基础上使用了反射技术；本篇文章将带领大家对注解、反射及动态代理有更清晰的认知。

<hr />

<!-- more -->

本篇文章的示例代码放在 [Github](https://github.com/persilee/android_practice) 上，所有知识点，如图：

<div style="width: 100%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/annotations-reflect/annotations-reflect-proxy.png "")

</div>

## 注解

注解(Annotations)，元数据的一种形式，提供有关于程序但不属于程序本身的数据。注解对它们注解的代码的操作没有直接影响。

注解有多种用途，例如：

- 为编译器提供信息：编译器可以使用注解来检查错误或抑制警告
- 编译或部署时处理：可以生成代码、XML、文件等
- 运行时处理：注解可以在运行时检查

### 注解的格式

注解的格式如下：

```java
@Persilee
class MyClass { ... }
```

注解已 `@` 开头后面跟上内容，注解可以包含元素，例如：

```java
@Persilee(id=666, value = "lsy")
class MyClass { ... }
```

如果，只有一个 `value` 元素，则可以省略该名称，如果，没有元素，则可以省略括号，例如

```java
@Persilee("lsy") // 只有一个 value 元素
class MyClass { ... }

@Persilee // 没有元素
class MyClass { ... }
```

如果，注解有相同的类型，则是重复注解，如

```java
@Persilee("lsy")
@Persilee("zimu")
class MyClass { ... }
```

### 注解声明

注解的定义类似于接口的定义，在关键字 `interface` 前加上 `@`，如：

```java
@interface Persilee {
    int id();
    String value();
}
```

### 注解类型

`int id()` 和 `String value()` 是注解类型(annotation type)，它们也可以定义可选的默认值，如：

```java
@interface Persilee {
    int id();
    String value() default "lsy";
}
```

在使用注解时，如果定义的注解的注解类型没有默认值，则必须进行赋值，如：

```java
@Persilee(id = 666) // id 必须要赋值，如，@Persilee 会提示 id 必须赋值
class MyClass { ... }
```

### 元注解

在注解上面的注解称为元注解(meta-annotations)，如

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.SOURCE)
@interface Persilee {
    int id();
    String value() default "lsy";
}
```

在 `java.lang.annotation` 中定义了几种元注解类型(常使用的是 @Retention、@Target)，如

**@Retention** 指定注解的存储方式，我们由 `RetentionPolicy.java` (是一个枚举)可知，如：

```java
public enum RetentionPolicy {
    SOURCE, // 标记的注解仅保留在源级别中，并被编译器忽略。
    CLASS, // 标记的注解在编译时由编译器保留，但 Java 虚拟机(JVM)会忽略。
    RUNTIME // 标记的注解由 JVM 保留，因此运行时环境可以使用它。
}
```

**@Target** 指定注解可以使用的范围，我们由 `ElementType.java` (是一个枚举)可知使用范围，如下：

```java
public enum ElementType {
    TYPE, // 类
    FIELD, // 字段或属性
    METHOD, // 方法
    PARAMETER, // 参数
    CONSTRUCTOR, // 构造方法
    LOCAL_VARIABLE, // 局部变量
    ANNOTATION_TYPE, // 也可以使用在注解上
    PACKAGE, // 包
    TYPE_PARAMETER, // 类型参数
    TYPE_USE // 任何类型
}
```

对于 `TYPE_PARAMETER` (类型参数) 、 `TYPE_USE` (任何类型名称) 可能不是很好理解，如果把 `Target` 设置成 `@Target({ElementType.TYPE_PARAMETER})`，表示可以使用在泛型(上篇文章有介绍过[泛型](https://h.lishaoy.net/generics.html))的类型参数上，如：

```java
public class TypeParameterClass<@Persilee T> {
    public <@Persilee T> T foo(T t) {
        return null;
    }
}
```

如果把 `Target` 设置成 `@Target({ElementType.TYPE_USE})`，表示可以使用在任何类型上，如：

```java
TypeParameterClass<@Persilee String> typeParameterClass = new TypeParameterClass<>();
@Persilee String text = (@Persilee String)new Object();
```

**@Documented** 注解表示使用了指定的注解，将使用 Javadoc 工具记录这些元素。

**@Inherited** 注解表示注解类型可以从超类继承。

**@Repeatable** 注解表明标记的注解可以多次应用于同一声明或类型使用。

### 注解应用场景

根据 `@Retention` 元注解定义的存储方式，注解一般可以使用在以下3种场景中，如：

|  级别  |  技术   |    说明    |
|:-----|:------|:---------|
| 源码 | APT | 在编译期能获取注解与注解声明的类和类中所有成员信息，一般用于生成额外的辅助类。|
| 字节码 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | 字节码增强 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 在编译出Class后，通过修改Class数据以实现修改代码逻辑目的，对于是否需要修改的区分或者修改为不同逻辑的判断可以使用注解。 |
| 运行时 |  反射  | 在程序运行时，通过反射技术动态获取注解与其元素，从而完成不同的逻辑判断。 |

### 小案例(使用注解实现语法检查)

我们定义一个 `weekDay` 字段，类型是 `WeekDay` 枚举类型，方便我们设置枚举中指定的值，如：

```java
class WeekDayDemo {

    private static WeekDay weekDay;

    enum WeekDay {
        SATURDAY,SUNDAY
    }

    public static WeekDay getWeekDay() {
        return weekDay;
    }

    public static void setWeekDay(WeekDay weekDay) {
        WeekDayDemo.weekDay = weekDay;
    }

    public static void main(String[] args) {
        setWeekDay(WeekDay.SATURDAY);
        System.out.println(getWeekDay());
    }
}
```

众所周知，在 Java 中枚举的实质是特殊的静态成员变量，在运行时候，所有的枚举会作为单例加载到内存中，非常消耗内存，那么，有没有什么优化的方案呢，在此，我们使用注解来取代枚举。

我们使用常量和 `@intDef` (语法检查)元注解去代替枚举，如：

```java
class IntdefDemo {

    private static final int SATURDAY = 0;
    private static final int SUNDAY = 1;

    private static int weekDay;

    @IntDef({SATURDAY, SUNDAY})
    @Target({ElementType.FIELD, ElementType.PARAMETER})
    @Retention(RetentionPolicy.SOURCE)
    @interface WeekDay { //自定义一个 WeekDay 注解

    }

    public static void setWeekDay(@WeekDay int weekDay) { // 使用 WeekDay 注解限制参数类型
        IntdefDemo.weekDay = weekDay;
    }

    public static void main(String[] args) {
        setWeekDay(SATURDAY); // 只能 传入 SATURDAY, SUNDAY
    }
}
```

### APT注解处理器

APT(Annotation Processor Tools) 注解处理器，用于处理注解，编写好的 Java 文件，需要经过 Javac 的编译，编译为虚拟机能够加载的字节码(Class)文件，注解处理器是 Javac 自带的一个工具，用来在编译时期处理注解信息。

上文中我们已自定义好了 `@Persilee` 注解，下面我们来编写一个简单的注解处理器来处理 `@Persilee` 注解，我们可以新建一个 Java 的 Module，创建一个 `PersileeProcessor` 的类，如：

```java
@SupportedAnnotationTypes("net.lishaoy.anreprdemo.Persilee")  //指定要处理的注解
public class PersileeProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {
        Messager messager = processingEnv.getMessager(); //
        messager.printMessage(Diagnostic.Kind.NOTE, "APT working ...");
        for (TypeElement typeElement: set) {
            messager.printMessage(Diagnostic.Kind.NOTE,"===>" + typeElement.getQualifiedName());
            Set<? extends Element> elements = roundEnvironment.getElementsAnnotatedWith(typeElement);
            for (Element element: elements) {
                messager.printMessage(Diagnostic.Kind.NOTE,"===>" + element.getSimpleName());
            }
        }

        return false;
    }
}
```

然后，在 `main` 目录下新建 `resources` 目录，如图：

<div style="width: 86%; margin:auto">

![annotation](https://cdn.lishaoy.net/annotations-reflect/annotations1.png "annotation")

</div>

这个目录结构是规定死的，必须这样写，然后在 `javax.annotation.processing.Processor` 文件里注册需要处理的注解处理器，如

```java
net.lishaoy.aptlib.PersileeProcessor
```

最后，在 `app` 的 `build.gradle` 文件引入模块，如

```java
dependencies {
  ...

  annotationProcessor project(':aptlib')
}
```

在你 Build 工程时候，会在 `Task :app:compileDebugJavaWithJavac` 任务打印我们在注解处理程序的日志信息，如：

```bash
注: APT working ...
注: ===>net.lishaoy.anreprdemo.Persilee
注: ===>MainActivity
```

因为，我们只在 `MainActivity` 中使用了 `@Persilee` 注解，如下：

```java
@Persilee(id = 666, value = "lsy")
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
    }
}
```

## 反射

一般情况下，我们使用某个类时必定知道它是什么类，用来做什么的。于是我们直接对这个类进行实例化，之后使用这个类对象进行操作。

```java
Cook cook = new Cook(); // 实例化一个对象，标准用法
cook.cookService("🍅");
```

反射是一开始并不知道初始化的类对象是什么，也不能使用 `new` 关键字来创建对象，反射是在运行的时才知道要操作的类是什么，并且可以在运行时获取类的完整构造，调用对应的方法。

Java 反射机制主要提供了以下功能:

- 在运行时构造任意一个类的对象
- 在运行时获取或修改任意一个类所具有的成员变量和方法
- 在运行时调用任意一个对象的方法(属性)

### Class类

Class是一个类，封装了当前对象所对应的类的信息，我们写的每一个类都可以看成一个对象，是 java.lang.Class 类的对象，Class是用来描述类的类。

### 获得Class对象

Class对象的获取有3种方式，如下：

- 通过类名获取 类名.class
- 通过对象获取 对象名.getClass()
- 通过全类名获取 Class.forName(全类名)

```java
Cook cook = new Cook();
Class cookClass = Cook.class;
Class cookClass1 = cook.getClass();
Class cookClass2 = Class.forName("net.lishaoy.reflectdemo.Cook");
```

### 创建实例

我们可以通过反射来生成对象的实例，如：

```java
Class cookClass = Cook.class;
Cook cook1 = (Cook) cookClass.newInstance();
```

### 获取构造器

获取构造器的方法有，如下：

- Constructor getConstructor(Class[] params)：获得使用特殊的参数类型的public构造函数(包括父类)
- Constructor[] getConstructors()：获得类的所有公共构造函数
- Constructor getDeclaredConstructor(Class[] params)：获得使用特定参数类型的构造函数(包括私有)
- Constructor[] getDeclaredConstructors()：获得类的所有构造函数(与接入级别无关)

我们来新建一个 `Person` ，以便我们的演示，如：

```java
public class Person {

    public String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
        super();
    }

    public String getName() {
        System.out.println("get name: " + name);
        return name;
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("set name: " + this.name);
    }

    public int getAge() {
        System.out.println("get age: " + age);
        return age;
    }

    public void setAge(int age) {
        this.age = age;
        System.out.println("set age: " + this.age);
    }

    private void privateMethod(){
        System.out.println("the private method!");
    }
}
```

很常规的一个类，里面有私有的属性和方法。

下面，我们新建一个 `GetConstructor` 的类来演示，获取构造器方法如何使用，如：

```java
class GetConstructor {

    public static void main(String[] args) throws
            ClassNotFoundException,
            NoSuchMethodException,
            IllegalAccessException,
            InvocationTargetException,
            InstantiationException {

        String className = "net.lishaoy.reflectdemo.entity.Person";
        Class<Person> personClass = (Class<Person>) Class.forName(className);

        //获取全部的constructor对象
        Constructor<?>[] constructors = personClass.getConstructors();
        for (Constructor<?> constructor: constructors) {
            System.out.println("获取全部的constructor对象: " + constructor);
        }

        //获取某一个constructor对象
        Constructor<Person> constructor = personClass.getConstructor(String.class, int.class);
        System.out.println("获取某一个constructor对象: " + constructor);

        //调用构造器的 newInstance() 方法创建对象
        Person person = constructor.newInstance("lsy", 66);
        System.out.println(person.getName() + ", " + person.getAge() );
    }

}
```

输出结果，如下：

```bash
获取全部的constructor对象: public net.lishaoy.reflectdemo.entity.Person(java.lang.String,int)
获取全部的constructor对象: public net.lishaoy.reflectdemo.entity.Person()
获取某一个constructor对象: public net.lishaoy.reflectdemo.entity.Person(java.lang.String,int)
lsy, 66
```

### 获取方法

获取方法的方法有，如下：

- Method getMethod(String name, Class[] params)：使用特定的参数类型，获得命名的公共方法
- Method[] getMethods()：获得类的所有公共方法
- Method getDeclaredMethod(String name, Class[] params)：使用特写的参数类型，获得类声明的命名的方法
- Method[] getDeclaredMethods()：获得类声明的所有方法

我们新创建一个 `GetMethod` 来演示如何来获取和调用方法，如：

```java
class GetMethod {

    public static void main(String[] args) throws
            ClassNotFoundException,
            NoSuchMethodException,
            IllegalAccessException,
            InstantiationException,
            InvocationTargetException {

        Class<?> aClass = Class.forName("net.lishaoy.reflectdemo.entity.Person");

        //获取所有的public方法(包含从父类继承的方法)
        Method[] methods = aClass.getMethods();
        for (Method method: methods) {
            System.out.println("获取所有public方法： " + method.getName() + "()");
        }

        System.out.println("===========================");

        //获取所有方法(不包含父类方法)
        methods = aClass.getDeclaredMethods();
        for (Method method: methods) {
            System.out.println("获取所有方法: " + method.getName() + "()");
        }

        System.out.println("===========================");

        //获取指定的方法
        Method method = aClass.getDeclaredMethod("setAge", int.class);
        System.out.println("获取指定的方法:" + method);

        //调用方法
        Object instance = aClass.newInstance();
        method.invoke(instance, 66);

        //调用私有方法
        method = aClass.getDeclaredMethod("privateMethod");
        method.setAccessible(true); // 需要调用此方法且设置为 true
        method.invoke(instance);

    }

}
```

运行结果，如下：

```bash
获取所有public方法： getName()
获取所有public方法： setName()
获取所有public方法： setAge()
获取所有public方法： getAge()
获取所有public方法： wait()
获取所有public方法： wait()
获取所有public方法： wait()
获取所有public方法： equals()
获取所有public方法： toString()
获取所有public方法： hashCode()
获取所有public方法： getClass()
获取所有public方法： notify()
获取所有public方法： notifyAll()
===========================
获取所有方法: getName()
获取所有方法: setName()
获取所有方法: setAge()
获取所有方法: privateMethod()
获取所有方法: getAge()
===========================
获取指定的方法:public void net.lishaoy.reflectdemo.entity.Person.setAge(int)
set age: 66
the private method!

BUILD SUCCESSFUL in 395ms
```

### 获取成员变量

获取成员变量的方法有，如下：

- Field getField(String name)：获得命名的公共字段
- Field[] getFields()：获得类的所有公共字段
- Field getDeclaredField(String name)：获得类声明的命名的字段
- Field[] getDeclaredFields()：获得类声明的所有字段

我们再来新建一个 `GetField` 的类来演示如何获取成员变量，如下：

```java
class GetField {

    public static void main(String[] args) throws
            ClassNotFoundException,
            NoSuchFieldException,
            IllegalAccessException,
            InstantiationException {

        Class<?> aClass = Class.forName("net.lishaoy.reflectdemo.entity.Person");

        // 获取所有字段(不包含父类字段)
        Field[] fields = aClass.getDeclaredFields();
        for (Field field: fields) {
            System.out.println("获取所有字段: " + field.getName());
        }

        System.out.println("================");

        // 获取指定字段
        Field name = aClass.getDeclaredField("name");
        System.out.println("获取指定字段: " + name.getName());

        // 设置指定字段的值
        Object instance = aClass.newInstance();
        name.set(instance, "per");

        // 获取指定字段的值
        Object o = name.get(instance);
        System.out.println("获取指定字段的值: " + o);

        // 设置和获取私有字段的值
        Field age = aClass.getDeclaredField("age");
        age.setAccessible(true); // 需要调用此方法且设置为 true
        age.set(instance, 66);
        System.out.println("获取私有字段的值: " + age.get(instance));

    }

}
```

运行结果，如下：

```bash
获取所有字段: name
获取所有字段: age
================
获取指定字段: name
获取指定字段的值: per
获取私有字段的值: 66

BUILD SUCCESSFUL in 395ms
```

## 使用注解和反射实现自动findViewById(案例)

我们已经对注解和反射有了更清晰的认知，下面我们通过一个小案例来巩固我们的学习：使用注解和反射完成类似 `butterknife` 的自动 `findViewById` 的功能。

新建一个空的 Android 工程，在工程目录下新建 **inject** 目录，在此目录下新建一个 `InjectView` 的类和 `BindView` 的自定义注解，如：

### 创建InjectView

`InjectView` 类通过反射完成 `findViewById` 功能：

```java
public class InjectView {

    public static void init(Activity activity) {
        // 获取 activity 的 class 对象
        Class<? extends Activity> aClass = activity.getClass();
        // 获取 activity 的所以成员变量
        Field[] declaredFields = aClass.getDeclaredFields();
        // 变量所以成员变量
        for (Field field: declaredFields) {
            // 判断属性是否加上了 @BindView 注解
            if(field.isAnnotationPresent(BindView.class)){
                // 获取注解 BindView 对象
                BindView bindView = field.getAnnotation(BindView.class);
                // 获取注解类型元素 id
                int id = bindView.value();
                // 通过资源 id 找到对应的 view
                View view = activity.findViewById(id);
                // 设置可以访问私有字段
                field.setAccessible(true);
                try {
                    // 给字段赋值
                    field.set(activity,view);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

### 创建@BindView注解

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface BindView {
    @IdRes int value(); // @IdRes 只能传 id 资源
}
```

### 使用@BindView注解

`MainActivity` 里使用 `@BindView` 注解，如：

```java
public class MainActivity extends AppCompatActivity {

    // 使用注解
    @BindView(R.id.text_view)
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        // 初始化 InjectView，完成自动 findViewById 功能
        InjectView.init(this);
        // 测试 R.id.text_view 是否自动赋值给 textView
        textView.setText("通过 @BindView 注解自动完成 findViewById");
    }
}
```

运行结果，如图：

<div style="width: 36%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/annotations-reflect/annotations2.png "small case")

</div>

是不是很简单，一个类就完成了自动 `findViewById` 的功能。

## 动态代理

在了解动态代理之前，我们先来回顾下静态代理。

### 静态代理

代理模式给某一个对象提供一个代理对象，并由代理对象控制对原对象的引用，如，我们生活中常见的中介。

代理模式一般会有3个角色，如图：

<div style="width: 86%; margin:26px auto;">

![no-shadow](https://cdn.lishaoy.net/annotations-reflect/annotations3.png "")

</div>

- 抽象角色：指代理角色和真实角色对外提供的公共方法，一般为一个接口
- 真实角色：需要实现抽象角色接口，定义了真实角色所要实现的业务逻辑，以便供代理角色调用
- 代理角色：需要实现抽象角色接口，是真实角色的代理，通过真实角色的业务逻辑方法来实现抽象方法，并可以附加自己的操作

### 为什么要使用代理模式

- 可以间接访问对象，防止直接访问对象来的不必要复杂性
- 通过代理对象对访问进行控制

### 静态代理案例

场景如下：

{% note info %} 小明可以在某网站上购买国内的东西，但是，不能买海外的东西，于是，他找了海外代购帮他买东西。 {% endnote %}

如何用代码描述呢？根据代理模式的3个角色，我们分别定义1个接口2个类，如：`OrderService` 接口(抽象角色)、`ImplJapanOrderService` 类(真实角色)、`ProxyJapanOrder` 类(代理角色)

`OrderService` 接口(抽象角色)，代码如下：

```java
public interface OrderService {
    int saveOrder();
}
```

`ImplJapanOrderService` 类(真实角色)，代码如下：

```java
// 实现抽象角色接口
public class ImplJapanOrderService implements OrderService {
    @Override
    public int saveOrder() {
        System.out.println("下单成功，订单号为：888888");
        return 888888;
    }
}
```

`ProxyJapanOrder` 类(代理角色)，代码如下：

```java
// 实现抽象角色接口
public class ProxyJapanOrder implements OrderService {

    private OrderService orderService; // 持有真实角色

    public OrderService getOrderService() {
        return orderService;
    }

    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public int saveOrder() {
        System.out.print("日本代购订单，");
        return orderService.saveOrder(); // 调用真实角色的行为方法
    }
}
```

在创建一个 `Client` 类来测试我们的代码，如下：

```java
public class Client {

    public static void main(String[] args) {
        // 日本代购订单
        OrderService orderJapan = new ImplJapanOrderService();
        ProxyJapanOrder proxyJapanOrder = new ProxyJapanOrder();
        proxyJapanOrder.setOrderService(orderJapan);
        proxyJapanOrder.saveOrder();
    }
}
```

运行结果，如下：

```bash
日本代购订单，下单成功，订单号为：888888

BUILD SUCCESSFUL in 1s
```

如果，需要购买韩国的东西，需要新增一个 `ImplKoreaOrderService` 类(韩国服务商) 和 `ProxyKoreaOrder` 类(韩国代理)，如还需要购买其他国家的东西，需要新增不同的类，则会出现静态代理对象量多、代码量大，从而导致代码复杂，可维护性差的问题，如是，我们需要使用动态代理。

### 动态代理

动态代理是在运行时才创建代理类和其实例，因此，我们可以传不同的真实角色，实现一个代理类完成多个真实角色的行为方法，当然，其效率比静态代理低。那么如何实现动态代理呢，JDK已为我们提供了 `Proxy` 类 和 `InvocationHandler` 接口来完成这件事情。

我们来创建一个 `ProxyDynamicOrder` 类(动态代理类)，代码如下：

```java
public class ProxyDynamicOrder implements InvocationHandler {

    private Object orderService; // 持有真实角色

    public Object getOrderService() {
        return orderService;
    }

    public void setOrderService(Object orderService) {
        this.orderService = orderService;
    }
    // 通过 Proxy 动态创建真实角色
    public Object getProxyInstance(){
        return Proxy.newProxyInstance(
                orderService.getClass().getClassLoader(),
                orderService.getClass().getInterfaces(),
                this
                );
    }

    @Override
    public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
        return method.invoke(orderService, objects); // 通过反射执行真实角色的行为方法
    }
}
```

在来看看，`Client` 类里如何调用，代码如下：

```java
public class Client {

    public static void main(String[] args) {

        // 静态代理模式
        // 国内订单
        OrderService order = new ImplOrderService();
        order.saveOrder();
        // 日本代购订单
        OrderService orderJapan = new ImplJapanOrderService();
        ProxyJapanOrder proxyJapanOrder = new ProxyJapanOrder();
        proxyJapanOrder.setOrderService(orderJapan);
        proxyJapanOrder.saveOrder();
        // 韩国代购订单
        OrderService orderKorea = new ImplKoreaOrderService();
        ProxyKoreaOrder proxyKoreaOrder = new ProxyKoreaOrder();
        proxyKoreaOrder.setOrderService(orderKorea);
        proxyKoreaOrder.saveOrder();

        // 动态代理模式
        // 国内订单
        ProxyDynamicOrder proxyDynamicOrder = new ProxyDynamicOrder();
        OrderService orderService = new ImplOrderService();
        proxyDynamicOrder.setOrderService(orderService);
        OrderService orderService1 = (OrderService) proxyDynamicOrder.getProxyInstance();
        orderService1.saveOrder();

        // 日本代购订单
        OrderService japanOrderService = new ImplJapanOrderService();
        proxyDynamicOrder.setOrderService(japanOrderService);
        OrderService japanOrderService1 = (OrderService) proxyDynamicOrder.getProxyInstance();
        japanOrderService1.saveOrder();

        // 韩国代购订单
        OrderService koreaOrderService = new ImplKoreaOrderService();
        proxyDynamicOrder.setOrderService(koreaOrderService);
        OrderService koreaOrderService1 = (OrderService) proxyDynamicOrder.getProxyInstance();
        koreaOrderService1.saveOrder();

        // 生成动态代理生成的class文件
        //ProxyUtil.generateClassFile(koreaOrderService.getClass(), koreaOrderService1.getClass().getSimpleName());

    }
}
```

运行结果，如下：

```bash
下单成功，订单号为：666666
日本代购订单，下单成功，订单号为：888888
韩国代购订单，下单成功，订单号为：666888
下单成功，订单号为：666666
下单成功，订单号为：888888
下单成功，订单号为：666888

BUILD SUCCESSFUL in 1s
```

只需要一个 `ProxyDynamicOrder` 代理类即可完成 `ImplOrderService` 、 `ImplJapanOrderService` 、`ImplKoreaOrderService` 真实角色提供的服务。


### 动态代理原理

我们在 `proxyDynamicOrder.getProxyInstance()` 代码上打个断点，通过调试模式发现，如图：

<div style="width: 100%; margin:auto">

![](https://cdn.lishaoy.net/annotations-reflect/annotations4.png "proxy")

</div>

代理类的名字是 `$Proxy0@507`，为什么是这个名字，我们在编译后的目录里也找不到 `$Proxy0@507` 类文件，如图：

<div style="width: 56%; margin:auto">

![](https://cdn.lishaoy.net/annotations-reflect/annotations5.png "proxy")

</div>

我们通过查看 `Proxy.newProxyInstance` 方法源码，可知，如：

```java
@CallerSensitive
public static Object newProxyInstance(ClassLoader var0, Class<?>[] var1, InvocationHandler var2) throws IllegalArgumentException {
    Objects.requireNonNull(var2);
    Class[] var3 = (Class[])var1.clone();
    SecurityManager var4 = System.getSecurityManager();
    if (var4 != null) {
        checkProxyAccess(Reflection.getCallerClass(), var0, var3);
    }
    // 获取代理类的 class 对象
    Class var5 = getProxyClass0(var0, var3);

    try {
        if (var4 != null) {
            checkNewProxyPermission(Reflection.getCallerClass(), var5);
        }
        // 获取代理类的构造器
        final Constructor var6 = var5.getConstructor(constructorParams);
        if (!Modifier.isPublic(var5.getModifiers())) {
            AccessController.doPrivileged(new PrivilegedAction<Void>() {
                public Void run() {
                    var6.setAccessible(true);
                    return null;
                }
            });
        }
        // 创建代理类的示例
        return var6.newInstance(var2);
    } catch (InstantiationException | IllegalAccessException var8) {
        throw new InternalError(var8.toString(), var8);
    } catch (InvocationTargetException var9) {
        Throwable var7 = var9.getCause();
        if (var7 instanceof RuntimeException) {
            throw (RuntimeException)var7;
        } else {
            throw new InternalError(var7.toString(), var7);
        }
    } catch (NoSuchMethodException var10) {
        throw new InternalError(var10.toString(), var10);
    }
}
```

然后，跟进 `getProxyClass0(var0, var3)` 看看是如何获取代理类的 class 对象的，点击进入，如下：

```java
private static Class<?> getProxyClass0(ClassLoader var0, Class<?>... var1) {
    if (var1.length > 65535) {
        throw new IllegalArgumentException("interface limit exceeded");
    } else {
        // 缓存了代理类的 class 对象
        return (Class)proxyClassCache.get(var0, var1);
    }
}
```

然后，我们来看看这个 `var1` 是个什么东西，我们往上找了找，果然发现，如下：

```java
// var1 就是我们实现的 InvocationHandler 接口
protected Proxy(InvocationHandler var1) {
    Objects.requireNonNull(var1);
    this.h = var1;
}
```

然后，我们点进 `proxyClassCache.get(var0, var1)` 方法，如图：

<div style="width: 100%; margin:auto">

![](https://cdn.lishaoy.net/annotations-reflect/annotations6.png "proxy")

</div>

使用关键代码 `this.subKeyFactory.apply(var1, var2)` 去获取我们的代理类的 class 对象，我们进入 `apply` 实现类 `ProxyClassFactory`，如：

```java
public Class<?> apply(ClassLoader var1, Class<?>[] var2) {
    IdentityHashMap var3 = new IdentityHashMap(var2.length);
    Class[] var4 = var2;
    int var5 = var2.length;

    ...

    if (var16 == null) {
        var16 = "com.sun.proxy.";
    }

    long var19 = nextUniqueNumber.getAndIncrement();
    // 生成代理类的类名
    String var23 = var16 + "$Proxy" + var19;
    // 生成代理类的字节码
    byte[] var22 = ProxyGenerator.generateProxyClass(var23, var2, var17);

    try {
        // 生成代理类的 class 对象
        return Proxy.defineClass0(var1, var23, var22, 0, var22.length);
    } catch (ClassFormatError var14) {
        throw new IllegalArgumentException(var14.toString());
    }
}
```

然后，我们点进 `Proxy.defineClass0` 方法，如下：

```java
private static native Class<?> defineClass0(ClassLoader var0, String var1, byte[] var2, int var3, int var4);
```

是一个 `native` 方法，所以涉及到 C 或 C++ ，我们就不往后追踪。


那么，代理的 Class 文件到底存在哪儿呢，由一个类的生命周期，如图：


<div style="width: 100%; margin:auto">

![no-shadow](https://cdn.lishaoy.net/annotations-reflect/annotations7.png "proxy")

</div>

代理的 Class 文件通过反射存在内存中，所以我们可以通过 `byte[]` 写入文件，我们新建一个工具类来把内存中的 class 字节码写入文件，如：

```java
public class ProxyUtil {

    public static void generateClassFile(Class aClass, String proxyName) {

        byte[] proxyClassFile = ProxyGenerator.generateProxyClass(
                proxyName,
                new Class[]{aClass}
        );
        String path = aClass.getResource(".").getPath();
        System.out.println(path);
        FileOutputStream outputStream = null;

        try {
            outputStream = new FileOutputStream(path + proxyName + ".class");
            outputStream.write(proxyClassFile);
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

通过输出的 `path` 路径，找到文件，如：

```bash
/Users/lishaoying/Documents/APP/Android/practice/annotation_reflect/anRePrDemo/proxyDemo/build/classes/java/main/net/lishaoy/proxydemo/service/impl/
```

文件代码，如下：

```java
// 继承了 Proxy 实现了 ImplKoreaOrderService 接口
public final class $Proxy0 extends Proxy implements ImplKoreaOrderService {

    // 生成了各种方法
    private static Method m1;
    private static Method m8;
    private static Method m3;
    private static Method m2;
    private static Method m5;
    private static Method m4;
    private static Method m7;
    private static Method m9;
    private static Method m0;
    private static Method m6;

    public $Proxy0(InvocationHandler var1) throws  {
        super(var1);
    }

    ...

    // 生成了 真实角色的 saveOrder 方法
    public final int saveOrder() throws  {
        try {
            // h 是什？，点进去发现就是我们 传入的 InvocationHandler 接口
            // m3 是什么？ 下面 static 代码块，就是我们的 saveOrder 方法
            return (Integer)super.h.invoke(this, m3, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    ...

    public final Class getClass() throws  {
        try {
            return (Class)super.h.invoke(this, m7, (Object[])null);
        } catch (RuntimeException | Error var2) {
            throw var2;
        } catch (Throwable var3) {
            throw new UndeclaredThrowableException(var3);
        }
    }

    ...

    static {
        try {
            m1 = Class.forName("java.lang.Object").getMethod("equals", Class.forName("java.lang.Object"));
            m8 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("notify");
            m3 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("saveOrder");
            m2 = Class.forName("java.lang.Object").getMethod("toString");
            m5 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("wait", Long.TYPE);
            m4 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("wait", Long.TYPE, Integer.TYPE);
            m7 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("getClass");
            m9 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("notifyAll");
            m0 = Class.forName("java.lang.Object").getMethod("hashCode");
            m6 = Class.forName("net.lishaoy.proxydemo.service.impl.ImplKoreaOrderService").getMethod("wait");
        } catch (NoSuchMethodException var2) {
            throw new NoSuchMethodError(var2.getMessage());
        } catch (ClassNotFoundException var3) {
            throw new NoClassDefFoundError(var3.getMessage());
        }
    }
}
```

## 使用注解、反射、动态代理完成简单的Retrofit

由于文章篇幅已经很长，且使用注解、反射、动态代理完成简单的 Retrofit 的案例代码过多，所以就不再这里展示，感兴趣的小伙伴可以去 [GitHub](https://github.com/persilee/android_practice) 查看源码。