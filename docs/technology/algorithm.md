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



## 限流

### 计数器法

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

- 思路简单，使用方便
- 会有**临界问题**，即所有流量在临界点前后流入，会导致tps激增为2倍的tps



### 滑动窗口

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





### 令牌桶算法



