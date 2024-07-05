## 大数据技术与实践期末复习

### 生态系统

每一张图片都值得思考，理清楚到底是什么！

![image-20240617195730069](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406171957070.png)

1.结构化数据（数据库里面的）：Sqoop（效率比较慢/隔一段时间抽取一次）

2.半结构化或者非结构化数据：Flume/Logstach（实时/消息队列（Kafaka））

3.Hbase（解决了小文件问题）基于HDFS

4.存储之后进行计算，使用mapReduce(慢一些)/Spark

5.Yarn相当于管理HDFS中节点的资源（CPU等等）

6.Hive/Pig将SQL转换成底层的mapReduce(通用计算)

7.Zookeeper（分布式的协调服务），可以来协调HDFS中的节点

8.Oozie和Azkaban是任务调度组件，调度计算任务（优先级）



### 大数据技术概述

>数据是对客观事物的观测（测量）或描述而得到的符号或数字集合。

数据使用的步骤：

数据清洗

数据管理

数据分析

信息技术为大数据时代提供技术支持

技术支撑：存储设备，CPU计算能力，网络带宽

大数据的概念：
数据量大，数据类型繁多，处理速度快，价值密度低

大数据的核心挑战：具有多源，异构，信息碎片化的特征。

大数据的应用领域：

数据分析与决策支持，推荐系统，运动训练，政治应用-投票选举，教育应用-大数据发现隐形贫困生，交通应用-拥堵预测

![image-20240619164629237](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191646338.png)

**两大核心技术：分布式存储，分布式处理**

![image-20240619164858570](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191648617.png)

![image-20240619164918963](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191649034.png)

### 大数据与其他新技术之间的关系

云计算

超大规模计算、虚拟化、高可靠性和安全性、通用性、动态扩展性、按需服务、降低成本。

IaaS、PaaS、SaaS

物联网

相关产业：

智能交通，智慧医疗，智能家居，环保监测，智能安防，智慧物流、智能电网、智慧农业，智能工业

![image-20240619170136128](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191701174.png)

大数据与人工智能的关系：

**人工智能需要数据来建立其智能，特别是机器学习**

**大数据技术为人工智能提供了强大的存储能力和计算能力**



区块链：去中心化记账

区块链技术是利用块链式数据结构来验证与存储数据,利用分布式节点共识算法 来生成和更新数据、利用密码学方式保证数据传输和访问安全、利用由自动化 脚本代码组成的智能合约来编程和操作数据的全新分布式基础架构与计算范式

大数据与区块链的关系：

![image-20240619170907524](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191709572.png)

### HDFS

#### 分布式文件系统

>分布式文件系统把文件分布存储到多个计算机节点上，成千上万的计算机节点构成计算机集群。
>
>![image-20240617203933131](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172039197.png)

#### **HDFS简介**

![image-20240617203950858](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172039935.png)

HDFS采用抽象的块概念带来的好处：

1.支持大规模文件存储（文件块存储）

2.简化系统设计

3.适合数据备份

**NameNode和DataNode**

![image-20240617204303590](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172043675.png)



#### HDFS相关概念

![image-20240617204601708](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172046815.png)

EditLog里面存储的相当于内存中的元数据存储到磁盘中，修改的日志

![image-20240617204826232](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172048327.png)



◼ 数据节点是分布式文件系统HDFS的工作节点，负责数据的存储和读取，会根据客户端或者是名称节点的调度来进行数据的存储和检索，并且向名称节点定期发送自己所存储的块的列表。

◼ 每个数据节点中的数据会被保存在各自节点的本地Linux文件系统中。

#### HDFS体系结构

![image-20240617201455592](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172014728.png)

>**通信协议**
>
>◼ HDFS是一个部署在集群上的分布式文件系统，因此，很多数据需要通过网络进行传输。
>
>◼ 所有的HDFS通信协议都是构建在TCP/IP协议基础之上的。
>
>◼ 客户端通过一个可配置的端口向名称节点主动发起TCP连接，并使用客户端协议与名称节点进行交互。
>
>◼ 名称节点和数据节点之间则使用数据节点协议进行交互。
>
>◼ 客户端与数据节点的交互是通过RPC（Remote Procedure Call）来实现的。在设计上，名称节点不会主动发起RPC，而是响应来自客户端和数据节点的RPC请求。



只设置一个NameNode节点的局限性：
1.命名空间的限制

2.性能的瓶颈

3.隔离问题

4.集群的可用性

#### HDFS存储原理

**冗余数据保存**

（1）**加快数据传输速度**

（2）**容易检查数据错误**

（3）**保证数据可靠性**

**数据存取策略**

调度管理

**数据错误与恢复**

1.namenode出错（secondaryNameNode备份最重要的两个数据结构-->FsImage和EditLog）

2.datanode出错 -- dataNode每隔一个时间段（3s）向nameNode上报信息（存储的内容，健康状态（负载状态））

3.数据出错：md5和sha1校验，客户端进行判断，定期检查和复制

文件上传之前要先切块（128M），然后存到dataNode（还要备份），保持每个3份

![image-20240617202008952](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172020101.png)

dataNode每隔一个时间段（3s）向nameNode上报信息（存储的内容，健康状态（负载状态））

#### HDFS数据读写过程

HDFS写操作：

![image-20240617202349446](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172023612.png)

`import java.io.BufferedReader;

 import java.io.InputStreamReader; 

import org.apache.hadoop.conf.Configuration;

import org.apache.hadoop.fs.FileSystem;

import org.apache.hadoop.fs.Path;

import org.apache.hadoop.fs.FSDataInputStream;

public class Chapter3 {

public static void main(String[] args) {

try {

Configuration conf = new Configuration();

conf.set("fs.defaultFS","hdfs://localhost:9000"); 

conf.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");

FileSystem fs = FileSystem.get(conf);

Path file = new Path("test"); 

FSDataInputStream getIt = fs.open(file);

BufferedReader d = new BufferedReader(new 

InputStreamReader(getIt));

String content = d.readLine(); //读取文件一行

System.out.println(content);

d.close(); //关闭文件

fs.close(); //关闭hdfs

} catch (Exception e) {

e.printStackTrace();

}

}`

读操作：

![image-20240617203339604](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172033718.png)

`import org.apache.hadoop.conf.Configuration; 

import org.apache.hadoop.fs.FileSystem;

import org.apache.hadoop.fs.FSDataOutputStream;

import org.apache.hadoop.fs.Path; 

public class Chapter3 { 

public static void main(String[] args) { 

try {

Configuration conf = new Configuration(); 

conf.set("fs.defaultFS","hdfs://localhost:9000");

conf.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");

FileSystem fs = FileSystem.get(conf);

byte[] buff = "Hello world".getBytes(); // 要写入的内容

String filename = "test"; //要写入的文件名

FSDataOutputStream os = fs.create(new Path(filename));

os.write(buff,0,buff.length);

System.out.println("Create:"+ filename);

os.close();

fs.close();

} catch (Exception e) { 

e.printStackTrace(); 

} 

} 

}`

> 进入到安全模式，就只能读取了

### HBase

#### 概述

> HBase是一个高可靠、高性能、面向列、可伸缩的分布式数据库。

HBase和传统的关系数据库的区别:
1.数据类型：将数据存储为未经解释的字符串。

2.数据操作：避免了复杂的表和表之间的关系。

3.存储模式：关系数据库是基于行模式存储的。HBase是基于列存

储的，每个列族都由几个文件保存，不同列族的文件是分离的。

4.数据索引（只有行键索引）

5.数据维护（保留旧版本）

6.可伸缩性（减少硬件数量来实现性能的伸缩）

#### HBase访问接口

![image-20240617210554622](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172105698.png)

#### HBase数据模型

![image-20240617210647790](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172106879.png)

![image-20240617210715726](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172107812.png)



#### HBase的实现原理

**HBase的实现包括三个主要的功能组件：**

– （1）库函数：链接到每个客户端

– （2）一个Master主服务器

– （3）许多个Region服务器

▪ 主服务器Master负责管理和维护HBase表的分区信息，维护Region服 务器列表，分配Region，负载均衡 

▪ Region服务器负责存储和维护分配给自己的Region，处理来自客户端 的读写请求

 ▪ 客户端并不是直接从Master主服务器上读取数据，而是在获得Region 的存储位置信息后，直接从Region服务器上读取数据 

▪ 客户端并不依赖Master，而是通过Zookeeper来获得Region位置信息 ，大多数客户端甚至从来不和Master通信，这种设计方式使得Master 负载很小

#### HBase运行机制

![image-20240617210926382](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172109466.png)

![image-20240617210955129](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172109263.png)

![image-20240617211002047](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172110137.png)

#### HBase应用方案

**HBase实际应用中的性能优化方法**

**行键**   **InMemory**   **Max Version**  **Time To Live**

**HBase性能监视**

•Master-status(自带)

•Ganglia

•OpenTSDB

•Ambar

**在HBase之上构建SQL引擎**

NoSQL区别于关系型数据库的一点就是NoSQL不使用SQL作为查询语言，

至于为何在NoSQL数据存储HBase上提供SQL接口，有如下原因：

1.**易使用**。使用诸如SQL这样易于理解的语言，使人们能够更加轻

松地使用HBase。

2.**减少编码**。使用诸如SQL这样更高层次的语言来编写，减少了编

写的代码量。

方案：

1.Hive整合HBase

2.Phoenix



**构建HBase二级索引**

HBase只有一个针对行健的索引

访问HBase表中的行，只有三种方式：

•通过单个行健访问

•通过一个行健的区间来访问

•全表扫描

使用其他产品为HBase行健提供索引功能：

•Hindex二级索引

•HBase+Redis

•HBase+solr

### MapReduce

#### 概述

![image-20240617211823894](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172118984.png)

#### MapReduce体系结构

MapReduce体系结构主要由四个部分组成，分别是：Client、JobTracker、TaskTracker以及Task。

![image-20240617211909877](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172119955.png)

#### MapReduce工作流程

shuffle过程对hash取模

![image-20240617212014903](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172120982.png)

![image-20240617212051812](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172120882.png)

![image-20240617212115708](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172121823.png)

![image-20240617212122852](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172121953.png)

![image-20240617212158867](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172121959.png)

![image-20240617222322998](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172223052.png)

四个阶段：split,map,shuffle,reduce

shuffle阶段会在内存与磁盘之间多次读取数据

#### 实例分析：WordCount ⭐⭐

![image-20240617221804134](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172218179.png)

![image-20240617212304667](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172123794.png)

![image-20240617212314190](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172123260.png)

![image-20240617212320033](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172123125.png)

![image-20240617212327488](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172123578.png)

![image-20240617212334680](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172123806.png)

#### MapReduce的具体应用

**MapReduce可以很好地应用于各种计算问题**

▪ **关系代数运算（选择、投影、并、交、差、连接）**

▪ **分组与聚合运算**

▪ **矩阵向量乘法**

▪ **矩阵乘法**

![image-20240617212457240](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172124331.png)

### Hive

> **Hive**是一个构建于Hadoop顶层的数据仓库工具。

#### **概述**

![image-20240617212723680](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172127778.png)

![image-20240617212709374](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172127442.png)

![image-20240617212816228](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172128317.png)





#### Hive系统架构

![image-20240617220955131](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172209166.png)

![image-20240617221010813](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172210844.png)



#### Hive的应用

#### **Impala**

![image-20240617233316100](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172333137.png)

批处理层和实时处理层

![image-20240617220810483](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172208523.png)



![image-20240617220821132](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172208171.png)

#### Hive编程实践

**Hive**有三种运行模式，单机模式、伪分布式模式、分布式模式。

![image-20240617220908057](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172209093.png)

![image-20240617220917079](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172209113.png)





### Spark

#### Spark概述

Spark具有如下几个主要特点：
•运行速度快：使用DAG执行引擎以支持循环数据流与内存计算
•容易使用：支持使用Scala、Java、Python和R语言进行编程，可以通过Spark Shell进行交互式编程
•通用性：Spark提供了完整而强大的技术栈，包括SQL查询、流式计算、机器学习和图算法组件
•运行模式多样：可运行于独立的集群模式中，可运行于Hadoop中，也可运行于Amazon EC2等云环境中，并且可以访问HDFS、Cassandra、HBase、Hive等多种数据源

![image-20240617221158024](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172211057.png)

![image-20240617221203266](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172212302.png)

#### Spark生态系统 

![image-20240617221302908](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172213945.png)

#### Spark运行架构 

RDD是只读的

RDD操作  Transformation和Action

RDD之间的依赖关系  宽依赖（走shuffle）窄依赖（一对一）

在yarn ，作业管理节点叫做application master

申请的资源叫做container   

在spark,作业管理节点叫做Driver

申请的资源叫做executor(可以运行多个task)

![image-20240617225250885](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172252933.png)



![image-20240617225657705](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172256771.png)

#### Spark SQL

####  Spark的部署和应用方式

####  Spark编程实践

### Flink

#### Flink简介

主要特性：批流一体化、精密的状态管理、事件时间支持、精确一次的状态一致性保障









####  为什么选择Flink 

流处理架构

**Flink具有以下优势：**

（1）同时支持高吞吐、低延迟、高性能

（2）同时支持流处理和批处理

（3）高度灵活的流式窗口

（4）支持有状态计算

（5）具有良好的容错性

（6）具有独立的内存管理

（7）支持迭代和增量迭代

#### Flink应用场景

事件驱动型应用

数据分析应用

数据流水线应用

####  Flink技术栈 

![image-20240617233455581](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172334614.png)

#### Flink体系架构 

![image-20240617233510244](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172335276.png)

#### Flink编程模型 

![image-20240617233519158](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406172335191.png)

#### Flink编程实践





### 数据理解

#### 数据理解的主要任务

**每个属性取值分布统计**

**多个属性取值分布统计**

**数据的总体质量评估**

#### 基于统计描述的数据理解方法

集中趋势度量（平均数，截尾均值等等）

散布程度度量（极值，方差，异众比率等等）

偏态度量

峰值度量

#### 数据可视化的传统方法

![image-20240619173133353](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191731385.png)

#### 高维数据的低维嵌入可视化方法

地图工具  时间线工具  高级分析工具（Python）

### 大数据技术综合应用

案例分析：电影推荐系统

![image-20240619172231408](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191722443.png)

算法设计：

**基于ALS矩阵分解的协同过滤算法**

![image-20240619172312145](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191723194.png)

![image-20240619172320464](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191723506.png)

![image-20240619172331079](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202406191723134.png)





## 重要知识点总结

### HDFS

关于Hadoop分布式文件系统（HDFS）的期末考试题，这里提供一些示例题目和答案：

#### 填空题

1. HDFS是Hadoop生态系统中用于存储大规模数据集的______文件系统。
   - 答案：分布式
2. HDFS设计用来在______上运行，并且能够处理应用程序数据的高吞吐量。
   - 答案：普通硬件
3. 在HDFS中，文件被分割成一系列的______，这些块默认大小为128MB或256MB。
   - 答案：块（Blocks）
4. HDFS的架构主要由两种节点组成：NameNode和______。
   - 答案：DataNode
5. HDFS提供了一个名为______的Java API，用于文件系统的交互。
   - 答案：FileSystem

#### 简答题

1. 描述HDFS的写数据流程。
   - 答案：当客户端想要写入数据到HDFS时，它会首先与NameNode通信以获取创建文件的权限。NameNode会检查文件是否已存在，并为新文件分配一个唯一的数据块ID。然后，客户端会从NameNode获取数据块的创建信息，包括数据块应该存储在哪些DataNode上。接着，客户端开始将数据流写入到指定的第一个DataNode。第一个DataNode会将数据复制到下一个DataNode，依此类推，直到所有的数据块都被复制到相应的DataNode上。
2. 解释HDFS的心跳机制及其重要性。
   - 答案：HDFS中的心跳机制是指DataNode定期向NameNode发送心跳信号，以表明自己仍然在线并正常工作。这种机制对于NameNode了解集群状态至关重要，它允许NameNode跟踪哪些DataNode是活跃的，以及数据块的当前位置。心跳信息还包括了DataNode上存储的数据块列表，这有助于NameNode进行数据块的复制和平衡。
3. HDFS如何保证数据的可靠性？
   - 答案：HDFS通过多个机制来保证数据的可靠性。首先，HDFS自动将每个数据块复制到多个DataNode上，默认是三个副本。这样即使某些DataNode失败，数据也不会丢失。其次，当客户端写入数据时，它会等待所有副本都被成功写入后才认为写操作完成。此外，NameNode会定期检查数据块的副本数量，如果副本数量低于预期，它会触发复制过程以恢复副本数量。
4. 什么是HDFS的快照功能，它如何帮助数据管理？
   - 答案：HDFS的快照功能允许用户在不中断文件系统操作的情况下，捕获文件系统在某一时刻的状态。快照可以用于数据备份、恢复和分析。用户可以创建快照，然后对文件系统进行修改，如果需要，可以恢复到快照时的状态。这为数据管理提供了灵活性和安全性。
5. 简述HDFS的NameNode和Secondary NameNode的区别。
   - 答案：NameNode是HDFS的主控节点，负责管理文件系统的命名空间和客户端对文件的访问。它存储了文件系统树和文件数据块的映射信息。Secondary NameNode并不是NameNode的备份，而是辅助节点，用于合并编辑日志和文件系统映像，以减少NameNode的负载。Secondary NameNode通过周期性地从NameNode获取文件系统的状态快照和编辑日志，然后合并它们，生成一个新的文件系统映像，并将这个映像发送回NameNode。这样，NameNode就不需要在每次修改时都写入完整的文件系统状态，从而提高了性能。



### HBase

#### 填空题

1. HBase是一个开源的非关系型分布式数据库（NoSQL），它构建在______之上。
   - 答案：Hadoop文件系统（HDFS）
2. HBase的数据模型基于______，这使得它能够提供快速的随机读写访问。
   - 答案：列族（Column Family）
3. 在HBase中，表是由行键、______和时间戳组成的。
   - 答案：行（Row）
4. HBase支持两种类型的数据压缩：______和Record。
   - 答案：Prefix
5. HBase的架构中，负责协调和管理集群的节点被称为______。
   - 答案：HMaster

#### 简答题

1. 描述HBase的写路径过程。
   - 答案：当数据写入HBase时，首先客户端会将数据发送到HMaster。HMaster会确定数据应该存储在哪个RegionServer上。然后，数据会被发送到相应的RegionServer。RegionServer会将数据写入到一个称为HLog的WAL（Write-Ahead Log）中，以确保数据的持久性。接下来，数据会被写入到MemStore，这是一个位于内存中的结构，用于快速访问。当MemStore达到一定大小后，会触发一个叫做Flush的过程，将数据持久化到HFile中。
2. 解释HBase中的Region和RegionServer的概念。
   - 答案：在HBase中，表被分割成多个连续的行键范围，这些范围被称为Region。每个Region由一个起始键和终止键定义，并且包含了一定数量的行。RegionServer负责管理一个或多个Region，处理对这些Region的所有读写请求，以及数据的存储和管理。
3. HBase如何实现数据的高可用性？
   - 答案：HBase通过RegionServer的HMaster监控和ZooKeeper实现高可用性。如果一个RegionServer失败，HMaster会检测到这个情况并重新分配Region到其他健康的RegionServer上。此外，HBase使用HLog进行数据的WAL记录，这样即使RegionServer失败，数据也可以从HLog中恢复。
4. 简述HBase的Coprocessor机制及其作用。
   - 答案：Coprocessor是HBase中的一种扩展机制，允许开发者在服务器端执行自定义代码。Coprocessor可以用于实现自定义的过滤器、观察者和终结器等。它们可以减少网络延迟，提高数据处理效率，并允许在数据靠近存储的地方进行处理。
5. HBase的Compaction和Major Compaction有什么区别？
   - 答案：在HBase中，Compaction是一种优化存储的过程，用于合并多个HFile并清除过期或被删除的细胞（Cells）。Minor Compaction是常规的合并过程，不会合并所有的HFile，而Major Compaction是一种更彻底的合并，会合并所有的HFile，包括那些包含删除标记的文件。Major Compaction会删除所有标记为删除的细胞，并且会消耗更多的资源，因此通常不会频繁执行。



### Hive

#### 填空题

1. Hive是建立在Hadoop之上的数据仓库工具，它提供了一种类似于SQL的语言，称为______。
   - 答案：HiveQL
2. Hive的元数据存储在______数据库中。
   - 答案：MySQL/PostgreSQL/Derby等
3. 在Hive中，表可以被分为两种类型：内部表和______表。
   - 答案：外部表
4. Hive支持多种数据文件格式，包括TextFile、SequenceFile、______等。
   - 答案：ORC/Parquet/Avro等
5. Hive中的分区（Partition）是一种数据组织方式，它允许用户根据表中的______列来存储和查询数据。
   - 答案：分区键（Partition Key）

#### 简答题

1. 描述Hive架构的主要组件。

   - 答案：Hive的主要组件包括Hive CLI（命令行接口）、Driver（驱动程序）、Compiler（编译器）、Execution Engine（执行引擎）、HDFS（存储层）和Metastore（元数据存储）。Hive CLI用于提交查询；Driver负责查询的解析、编译和优化；Compiler将HiveQL转换为一系列MapReduce、Tez或Spark作业；Execution Engine执行这些作业；HDFS用于存储数据；Metastore存储元数据信息。

2. 解释Hive中的数据分区和桶（Bucketing）的概念及其用途。

   - 答案：数据分区是Hive中一种数据组织方式，它允许用户将表中的数据根据某个或某些列的值分割成不同的分区。这有助于提高查询性能，因为查询可以仅扫描相关的分区而不是整个表。桶是一种更细粒度的数据组织方式，它允许用户将表中的数据均匀地分散到固定数量的桶中，每个桶可以独立地进行查询和处理。桶可以通过哈希函数分配数据，有助于数据的均匀分布和提高JOIN操作的性能。

3. Hive如何处理大数据量的查询？

   - 答案：Hive通过将查询分解为MapReduce、Tez或Spark作业来处理大数据量的查询。这些作业可以在Hadoop集群上并行执行，从而充分利用集群的计算资源。Hive还提供了优化器，它可以对查询进行优化，比如谓词下推、列裁剪等，以减少数据的移动和提高查询效率。

4. 简述Hive的索引机制及其作用。

   - 答案：Hive支持索引机制，允许用户为表中的列创建索引，以加速特定列的查询。索引可以是内置的，也可以是自定义的。内置索引包括位图索引和紧凑索引，它们可以显著提高查询性能。自定义索引允许用户实现自己的索引逻辑。索引可以减少查询需要扫描的数据量，从而提高查询速度。

5. Hive支持哪些数据类型，并且它们是如何分类的？

   - 答案：Hive支持多种数据类型，可以分为原始数据类型（如INT、STRING、BOOLEAN等）、复杂数据类型（如ARRAY、MAP、STRUCT等）和集合数据类型。原始数据类型是基本的数据类型，复杂数据类型允许用户存储结构化的数据，集合数据类型用于存储数据集合。

6. Hive转化到MapReduce的过程

   Hive 将查询转化成 MapReduce 作业的过程大致如下：

   1. **查询解析**：当提交一个 HiveQL 查询到 Hive 时，Hive 的编译器首先解析这个查询，检查语法是否正确，并将其转换成一个或多个逻辑执行计划。
   2. **语义分析**：Hive 接着进行语义分析，这包括验证查询中引用的表和列是否存在，以及用户的权限等。
   3. **逻辑优化**：Hive 使用自己的优化器或集成的 Calcite 框架来优化逻辑执行计划，比如通过谓词下推等技术减少数据的移动和处理。
   4. **物理计划**：逻辑计划被转换成物理执行计划，这一步确定了如何将查询映射到底层的计算框架，比如 MapReduce。
   5. **生成 MapReduce 作业**：Hive 将物理计划转换为一个或多个 MapReduce 作业。在这一步，Hive 会决定作业的输入输出格式、Map 和 Reduce 的类、以及其他配置。
   6. **作业配置**：Hive 配置 MapReduce 作业的各种参数，包括输入输出路径、数据的序列化和反序列化方式、合并文件的大小等。
   7. **提交作业**：生成的 MapReduce 作业被提交到 Hadoop 集群的作业调度系统中，等待资源分配和执行。
   8. **执行 MapReduce 作业**：
      - **Map 阶段**：输入数据被 HDFS 读取并分割成数据块，每个数据块由一个 Map 任务处理。Map 任务根据 Hive 的指令对数据进行处理，生成中间键值对。
      - **Shuffle 阶段**：Map 任务的输出被排序并传输到对应的 Reduce 任务。这个过程称为 Shuffle，它负责将数据按照键进行分组。
      - **Reduce 阶段**：Reduce 任务接收来自 Shuffle 的数据，并执行聚合操作或输出最终结果。
   9. **结果处理**：MapReduce 作业完成后，Hive 会处理这些结果，将它们写回到 HDFS 上的指定位置，或者返回给用户。
   10. **作业监控**：Hive 提供了作业监控工具，允许用户跟踪作业的进度和状态。







### MapReduce

#### 填空题

1. MapReduce是一种编程模型，用于处理和生成______数据集。
   - 答案：大规模
2. MapReduce的两个主要阶段是Map阶段和______阶段。
   - 答案：Reduce
3. 在MapReduce中，______负责将输入数据分割成数据块。
   - 答案：InputFormat
4. MapReduce框架中的______负责调度Map和Reduce任务。
   - 答案：JobTracker（在旧版Hadoop中）或ResourceManager（在YARN中）
5. MapReduce的输出结果通常存储在______中。
   - 答案：HDFS

#### 简答题

1. 描述MapReduce编程模型的工作流程。
   - 答案：MapReduce的工作流程包括以下步骤：首先，InputFormat将输入数据分割成多个数据块，每个数据块由一个Map任务处理。Map任务读取数据块，将其转换为键值对（key-value pairs），并将输出传递给Partitioner。Partitioner将Map的输出按照一定的规则分配给不同的Reduce任务。然后，Shuffle和Sort阶段将数据重新组织，使得每个Reduce任务接收到所有与特定键关联的值。最后，Reduce任务处理这些值，并将结果输出到HDFS中。
2. 解释MapReduce中的Shuffle和Sort阶段的作用。
   - 答案：Shuffle阶段是MapReduce过程中的一个关键步骤，它负责将Map任务的输出重新分布到不同的Reduce任务。在这个阶段，Map的输出首先被排序（Sort），然后根据Partitioner的规则被分配到对应的Reduce任务。这个过程确保了每个Reduce任务接收到所有与特定键关联的值，为Reduce阶段的聚合操作做准备。
3. MapReduce如何处理数据的局部性和网络传输？
   - 答案：MapReduce框架通过InputFormat将输入数据分割成数据块，并尽可能地将Map任务调度到存储这些数据块的节点上执行，以减少网络传输并利用数据的局部性。此外，Shuffle阶段也会尽量将数据在本地节点上进行处理，减少跨节点的数据传输。
4. 简述MapReduce框架中的JobTracker和TaskTracker的角色。
   - 答案：在旧版Hadoop中，JobTracker是MapReduce框架的中心协调者，负责接收作业请求，调度Map和Reduce任务，监控任务执行状态，并在任务失败时重新调度。TaskTracker是工作节点上的服务，负责执行JobTracker分配的任务，并向JobTracker报告任务的状态和进度。
5. MapReduce如何支持容错性？
   - 答案：MapReduce框架通过多种机制支持容错性。首先，每个Map和Reduce任务都会在不同的节点上执行多个副本，以防止节点故障导致任务失败。其次，MapReduce使用心跳机制监控节点的状态，如果发现节点失联，会重新调度任务。此外，MapReduce的中间数据在Shuffle阶段之前不会被删除，以确保在Map任务失败时可以从输入数据重新计算结果。



### Spark

#### 填空题

1. Apache Spark是一个开源的分布式计算系统，它支持______处理。
   - 答案：内存级
2. Spark的核心是RDD（弹性分布式数据集），它提供了______和容错性。
   - 答案：并行操作
3. Spark支持多种数据源，包括HDFS、S3、HBase和______。
   - 答案：Hive
4. Spark SQL是Spark的模块，它提供了______接口来处理结构化数据。
   - 答案：SQL
5. Spark Streaming是Spark的流处理模块，它支持______和更新状态的DStream。
   - 答案：有界

#### 简答题

1. 解释Spark中的RDD概念及其重要性。
   - 答案：RDD（弹性分布式数据集）是Spark中最基本的数据结构，它是一个不可变的、分布式的数据集合，支持并行操作。RDD的重要性在于它提供了高度的容错性，通过记录数据的转换操作来重新计算丢失的数据分区，而不是重新计算整个数据集。
2. Spark的宽依赖和窄依赖有什么区别？
   - 答案：在Spark中，依赖关系分为宽依赖和窄依赖。窄依赖指的是父RDD的每个分区只被子RDD的一个分区使用，这允许高效的数据局部性，因为子RDD的分区可以并行处理父RDD的分区。宽依赖则是指父RDD的分区可能被子RDD的多个分区使用，这通常需要进行数据的shuffle，可能会降低性能。
3. 描述Spark Streaming的工作原理。
   - 答案：Spark Streaming通过接收实时数据流，将其切分为一系列微小批次（即DStreams），然后使用Spark的批处理能力来处理这些数据。每个批次被当作一个RDD处理，可以应用各种Spark操作，包括转换和聚合。处理结果可以被推送到数据库、文件系统或实时仪表板。
4. Spark如何支持容错性？
   - 答案：Spark支持容错性主要通过RDD的不可变性和血统（lineage）。每个RDD都记录了其数据是如何从其他RDD转换而来的，如果某个RDD的某个分区丢失，Spark可以仅重新计算丢失的分区，而不是整个RDD，从而实现高效的容错。
5. Spark SQL如何优化查询性能？
   - 答案：Spark SQL通过多种方式优化查询性能，包括Catalyst查询优化器，它使用多种规则来优化查询计划；Tungsten项目，它是一个针对内存计算的底层物理引擎，优化了数据的存储和处理；以及通过支持多种数据源和索引，提高数据访问效率。
6. 描述Spark MLlib的主要功能和用途。
   - 答案：MLlib是Spark的机器学习库，它提供了一系列的机器学习算法和工具，包括分类、回归、聚类、协同过滤等。MLlib还提供了模型评估、数据导入和导出等工具，使得在Spark上进行大规模机器学习任务变得更加容易。

### Flink

#### 填空题

1. Apache Flink是一个开源的______计算框架，用于处理无界和有界数据流。
   - 答案：流式
2. Flink的时间概念包括事件时间、摄入时间和______。
   - 答案：处理时间
3. Flink提供了______状态和托管状态两种状态后端，用于状态管理。
   - 答案：值（Value）状态
4. Flink的窗口操作包括滚动窗口、滑动窗口和______窗口。
   - 答案：会话（Session）
5. Flink支持多种状态后端，包括______、RocksDB和内存状态后端。
   - 答案：FsStateBackend

#### 简答题

1. 解释Flink中的有界数据流和无界数据流的区别。
   - 答案：有界数据流是指数据的开始和结束都是已知的，例如批处理作业中的数据集。无界数据流则是指数据源是持续不断的，例如实时数据流。Flink能够处理这两种类型的数据流，并且提供了不同的API和操作来适应不同的场景。
2. 描述Flink中的Watermark机制及其作用。
   - 答案：Watermark在Flink中用于处理事件时间（event time）的数据流。它是一种特殊的时间戳，表示在这个时间戳之前的所有事件都已经到达。Watermark机制允许Flink处理乱序事件和延迟事件，确保即使在事件乱序到达的情况下，窗口计算和时间相关的操作也能正确执行。
3. Flink如何处理状态管理？
   - 答案：Flink提供了状态管理机制来存储和管理状态信息。状态可以是键控状态（Keyed State）或操作状态（Operator State）。Flink支持不同的状态后端，例如值状态后端、RocksDB等，它们可以存储状态信息在内存中或持久化存储中。Flink还提供了状态的一致性保证和容错机制。
4. 简述Flink的容错机制。
   - 答案：Flink的容错机制基于其分布式快照算法（Chandy-Lamport算法）。Flink周期性地对流处理的状态进行快照，并将快照存储在持久化存储中。如果发生故障，Flink可以从最近的快照中恢复状态，确保计算的一致性和准确性。
5. Flink的CEP（复杂事件处理）库是如何工作的？
   - 答案：Flink CEP是一个用于检测复杂事件模式的库。它允许用户定义事件模式，并将这些模式应用于数据流，以检测符合这些模式的复杂事件序列。CEP库使用NFA（非确定性有限自动机）或TGA（时间语法分析器）来匹配事件模式，提供了一种灵活的方式来处理和分析事件流。
6. 描述Flink SQL和Table API的作用和区别。
   - 答案：Flink SQL和Table API都是用于处理结构化数据流的接口。Flink SQL提供了类似于传统SQL的声明式接口，允许用户通过SQL语句来查询和转换数据流。Table API则提供了一种更灵活的编程接口，允许用户以编程方式操作表和进行复杂的数据转换。Table API在内部使用Flink SQL的优化器，可以提供更好的性能和优化。





















数据量大

数据类型多

处理速度快

价值密度低