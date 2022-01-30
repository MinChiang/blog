## 排序

![排序算法属性](./images/排序算法属性.png)



### 冒泡排序

```java
/**
 * 冒泡排序算法
 *
 * @author MinChiang
 * @version 1.0.0
 * @date 2020-03-20 9:20
 */
public class BubbleSort<T extends Comparable<T>> extends AbstractSortable<T> {

    @Override
    public void doSort(T[] arr) {
        //外层是排序的趟数
        for (int i = 0; i < arr.length - 1; i++) {
            //内层当前趟数需要比较的次数
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }

}
```



### 插入排序

```java
/**
 * 插入排序算法
 *
 * @author MinChiang
 * @version 1.0.0
 * @date 2020-03-20 9:41
 */
public class InsertSort<T extends Comparable<T>> extends AbstractSortable<T> {

    @Override
    public void doSort(T[] arr) {
        //外层控制需要比较的元素
        for (int i = 1; i < arr.length; i++) {
            int index = i;
            //内层遍历比较后的元素
            for (int j = i - 1; j >= 0; j--) {
                if (arr[index].compareTo(arr[j]) < 0) {
                    swap(arr, index, j);
                    index = j;
                } else {
                    break;
                }
            }
        }
    }

}
```



### 选择排序

```java
/**
 * 选择排序算法
 *
 * @author MinChiang
 * @version 1.0.0
 * @date 2020-03-20 8:57
 */
public class SelectSort<T extends Comparable<T>> extends AbstractSortable<T> {

    @Override
    public void doSort(T[] arr) {
        //外层控制排序
        for (int i = 0; i < arr.length - 1; i++) {
            T min = arr[i];
            int minIndex = i;
            //内层遍历剩余可选择的元素
            for (int j = i + 1; j < arr.length; j++) {
                if (min.compareTo(arr[j]) > 0) {
                    min = arr[j];
                    minIndex = j;
                }
            }
            swap(arr, i, minIndex);
        }
    }

}
```



### 归并排序

```java
/**
 * 归并排序算法
 *
 * @author MinChiang
 * @version 1.0.0
 * @date 2020-03-20 11:24
 */
public class MergeSort<T extends Comparable<T>> extends AbstractSortable<T> {

    @Override
    public void doSort(T[] arr) {
        this.doInnerSort(arr, 0, arr.length - 1);
    }

    private void doInnerSort(T[] arr, int from, int to) {
        //当比较的元素仅有一个时，直接返回
        if (from == to) {
            return;
        }

        //分割数组
        int step = (to - from) / 2;

        //排序左边
        doInnerSort(arr, from, from + step);
        //排序右边
        doInnerSort(arr, from + step + 1, to);

        int arrLen = to - from + 1;
        //归并已经排序的数组
        Object[] tmp = new Object[arrLen];

        int left = from;
        int right = from + step + 1;

        //是否已经到达了结尾
        boolean reachEnd = false;
        //是否左边数组已经到达了结尾
        boolean leftEnd = false;
        for (int i = 0; i < arrLen; i++) {
            if (reachEnd) {
                if (leftEnd) {
                    tmp[i] = arr[right];
                    right++;
                } else {
                    tmp[i] = arr[left];
                    left++;
                }
            } else {
                if (((Comparable<T>) arr[left]).compareTo(arr[right]) < 0) {
                    tmp[i] = arr[left];
                    if (left == from + step) {
                        reachEnd = true;
                        leftEnd = true;
                    }
                    left++;
                } else {
                    tmp[i] = arr[right];
                    if (right == to) {
                        reachEnd = true;
                        leftEnd = false;
                    }
                    right++;
                }
            }

        }

        //把临时数组拷贝回来
        for (int i = 0; i < tmp.length; i++) {
            arr[from + i] = (T) tmp[i];
        }
    }

}
```



### 快速排序

```java
/**
 * 快速排序算法
 *
 * @author MinChiang
 * @version 1.0.0
 * @date 2020-03-20 8:57
 */
public class QuickSort<T extends Comparable<T>> extends AbstractSortable<T> {

    @Override
    public void doSort(T[] arr) {
        this.doInnerSort(arr, 0, arr.length - 1);
    }

    public void doInnerSort(T[] arr, int from, int to) {
        T pivot = arr[from];
        int pivotIndex = from;

        int left = pivotIndex;
        int right = pivotIndex;
        for (int i = from + 1; i <= to; i++) {
            int compare = pivot.compareTo(arr[i]);
            if (compare > 0) {
                if (right == pivotIndex) {
                    left = i;
                } else {
                    swap(arr, right, i);
                    left++;
                    right++;
                }
            } else if (compare < 0) {
                if (right == pivotIndex) {
                    right = i;
                }
            }
        }

        //比较完成，将left指针与pivot交换
        swap(arr, pivotIndex, left);
        pivotIndex = left;

        //排序左边
        if (from < pivotIndex) {
            doInnerSort(arr, from, pivotIndex - 1);
        }
        //排序右边
        if (pivotIndex < right) {
            doInnerSort(arr, pivotIndex + 1, to);
        }
    }

}
```



## BFS

```
result = []
def permute(已经选择的路径, 剩余选择列表):
    if 满足结束条件:
    	// 此时注意路径的可变动方式，若为数组或者列表需要new一个新的
        result.add(已经选择的路径)
        return

    for 选择 in 剩余选择列表:
        做选择（其实就是路径的变动，把剩余选择列表中变为路径）
        permute(路径, 选择列表)
        撤销选择（回滚路径的变动）
```

```java
/**
 * @author MinChiang
 * @version 1.0.0
 * @date 2021-02-20 15:40
 */
public class Permutations {

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> choice = new ArrayList<>();
        for (int num : nums) {
            choice.add(num);
        }
        permute(new ArrayList<>(), choice, result);
        return result;
    }

    // path表示【已经选择的路径】，choice表示【还未选择的路径】
    public void permute(List<Integer> path, List<Integer> choice, List<List<Integer>> result) {
        // 结束判定
        if (choice.size() == 0) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < choice.size(); i++) {
            // 做出选择，把未选择的路径转化为已选择的路径
            int c = choice.remove(i);
            path.add(c);

            // 递归
            permute(path, choice, result);

            // 撤销选择
            path.remove(path.size() - 1);
            choice.add(i, c);
        }
    }

}
```





## 限流

### 计数器法

思路简单，使用方便，会有**临界问题**，即所有流量在临界点前后流入，会导致tps激增为2倍的tps。

```java
public class Counter {

    //初始时间
    private long startTime;
    //流量计数
    private long count;
    //滑窗大小
    private long length;
    //单个滑窗内最大的并发数
    private long limit;

    public Counter(long length, long limit) {
        this.length = length;
        this.limit = limit;
        reset();
    }

    private void reset() {
        this.count = 0;
        this.startTime = System.currentTimeMillis();
    }

    public boolean require() {
        if (System.currentTimeMillis() <= startTime + length) {
            return ++count < limit;
        }

        reset();
        return ++count < limit;
    }

}
```



### 滑动窗口

滑动窗口使用一个固定大小的数组或者链表存放细分后的数据，数组内存放单位时间内的流量计数，流量进入时，若当前的时间戳大于最后一个数组元素的时间戳，则新建元素并推移时间窗口；然后统计流量总数，若大于流量总数，则直接返回超过流量；若小于流量总数，则流量总数加一并且返回成功。本质上来说，滑动窗口的数量越多，颗粒度越高，计算的资源也越多，也会越精确。

```java
public class RollingWindow {

    private static final int DEFAULT_WINDOW_SIZE = 10;

    //窗口大小，窗口越小流量越平滑
    private int windowSize = DEFAULT_WINDOW_SIZE;

    private final long maxTransaction;
    private final long milliseconds;

    private Window head;
    private Window tail;
    private int currentWindowLength;
    private long currentCount;
    private long startTime;

    public RollingWindow(long milliseconds, long maxTransaction, int windowSize) {
        this.windowSize = windowSize;
        this.milliseconds = milliseconds / windowSize;
        this.maxTransaction = maxTransaction;

        Window current = new Window(0);
        head = current;
        tail = current;
        currentWindowLength++;

        startTime = System.currentTimeMillis();
    }

    private void appendWindow() {
        Window current = new Window(0);
        if (currentWindowLength < windowSize) {
            currentWindowLength++;
        } else {
            currentCount -= head.count;
            head = head.next;
        }
        tail.next = current;
        tail = current;
        startTime = System.currentTimeMillis();
    }

    public boolean require() {
        if (System.currentTimeMillis() <= startTime + milliseconds) {
            if (currentCount >= maxTransaction) {
                return false;
            }
            tail.count++;
            currentCount++;
            return true;
        }

        appendWindow();
        if (currentCount >= maxTransaction) {
            return false;
        }
        tail.count++;
        currentCount++;
        return true;
    }

    private static class Window {

        long count;
        Window next;

        public Window(long count) {
            this.count = count;
        }

    }

}
```



### 漏桶算法

```java
public class LeakyBucket {

    private static final int DEFAULT_WINDOW_SIZE = 10;

    private int windowSize = DEFAULT_WINDOW_SIZE;
    private final long maxTransaction;
    private final long milliseconds;
    private final long singlePeriodTransaction;

    //时间执行器
    private final ScheduledExecutorService executor;
    //桶
    private final Queue<Water> queue;

    public LeakyBucket(long milliseconds, long maxTransaction, int windowSize) {
        this.windowSize = windowSize;
        this.milliseconds = milliseconds / windowSize;
        this.maxTransaction = maxTransaction;
        this.singlePeriodTransaction = maxTransaction / windowSize;
        
		//设置桶和桶大小
        queue = new LinkedBlockingQueue<>(new Long(maxTransaction).intValue());
        //单线程的任务执行器
        this.executor = Executors.newSingleThreadScheduledExecutor();
		//启动任务，循环漏水
        executor.scheduleAtFixedRate(() -> {
            int count = 0;
            while (count++ < singlePeriodTransaction) {
                Water water = queue.poll();
                if (water == null) {
                    return;
                }
                water.start();
            }
        }, 0, this.milliseconds, TimeUnit.MILLISECONDS);
    }

    /**
	* 注水
	* @param water 注入的水
	*/
    public void fillWater(Water water) {
        this.queue.add(water);
    }

    public static interface Water {

        void start();

    }

}
```



### 令牌桶算法

```java

```



## 随机算法

### 蓄水池采样算法

```java

```



### 洗牌算法

简单摘自Collections.shuffle

思路：

- 第0张牌随机交换下标为[0, 52)的牌
- 第1张牌随机交换下标为[1, 52)的牌
- 第2张牌随机交换下标为[2, 52)的牌
- ...
- 第50张牌随机交换下标为[51, 52)的牌

```java
    public static void shuffle(List<?> list, Random rnd) {
        int size = list.size();
        if (size < SHUFFLE_THRESHOLD || list instanceof RandomAccess) {
            for (int i=size; i>1; i--)
                swap(list, i-1, rnd.nextInt(i));
        } else {
            Object arr[] = list.toArray();

            // Shuffle array
            for (int i=size; i>1; i--)
                swap(arr, i-1, rnd.nextInt(i));

            // Dump array back into list
            // instead of using a raw type here, it's possible to capture
            // the wildcard but it will require a call to a supplementary
            // private method
            ListIterator it = list.listIterator();
            for (int i=0; i<arr.length; i++) {
                it.next();
                it.set(arr[i]);
            }
        }
    }
```

