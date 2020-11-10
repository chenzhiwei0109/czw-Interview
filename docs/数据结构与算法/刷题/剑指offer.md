# 剑指offer
[TOC]
[[toc]]
## 1.二维数组中查找

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```js
function Find(target, array){
  return array.some(arr => {
    return arr.includes(target)
  })
}
```

## 2.替换空格

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

```js
function replaceSpace(str)
{
     return str.replace(/\s/g,'%20')
}
```

## 3.从尾到头打印链表

输入一个链表，按链表从尾到头的顺序返回一个ArrayList。

```js
function printListFromTailToHead(head)
{
  // write code here
  var arr = [];
  while(head){
    arr.push(head.val);
    head = head.next
  }
  return arr.reverse();
}
```

```js
function printListFromTailToHead(head)
{
    var arrayList = [];
    var node = head;
    while(node){
        arrayList.unshift(node.val);
        node = node.next;
    }
    return arrayList;
 
}
```

## 4.重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

**思路**

前序遍历：根→左→右
中序遍历：左→根→右

1. 由前序遍历序列pre={1,2,4,7,3,5,6,8}可知根结点是1；
2. 则在中序遍历序列in={4,7,2,1,5,3,8,6}中找到1，便可知1所在位置的左侧是左子树,1所在位置的右侧是右子树；
3. 递归调用：将左子树和右子树分别看成一颗树，将其前序遍历序列、中序遍历序列分别传入到该方法中，便可得到左子树的根结点、右子树的根结点。此时需要用第一步得到的根结点连接它们；
4. 递归调用的终止条件：直到传入数组为空，说明已经没有节点，直接返回null。

```js

```



## 5.用两个栈实现队列

```js
var inStack = []
var outStack = []
function push(node)
{
    inStack.push(node)
}
function pop()
{
    // write code here
    if(outStack.length){
        return outStack.pop()
    }else{
        while(inStack.length){
            outStack.push(inStack.pop())
        }
        return outStack.pop()
    }
}
```



## 03数组重复的数字

找出数组中重复的数字。
在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

**示例 1：**

```
输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 
```

**限制：**

```
2 <= n <= 100000
```

**利用对象**

把值作为对象名，判断是否存在。

**利用set**

```js
var findRepeatNumber = function(nums) {
  var s = new Set()
  for(var i=0;i<nums.length;i++){
    var curLength = s.size;
    s.add(nums[i]);
    if(s.size === curLength){
      return nums[i]
    }
  }
}
```

**利用map**

```js
var findRepeatNumber = function(nums) {
    let len = nums.length;
    let hash = new Map()
    for(let i=0;i<len;i++){
        if(hash.has(nums[i]))return nums[i]
        hash.set(nums[i],true)
    }
};

```

## 删除链表节点

```js
var deleteNode = function (head, val) {
    let pre = head
    let node = pre.next
    if (pre.val === val) {
        return head.next
    }
    while (node) {
        if (node.val === val) {
            pre.next = node.next
        }
        pre = node
        node = node.next
    }
    return head
};
```

