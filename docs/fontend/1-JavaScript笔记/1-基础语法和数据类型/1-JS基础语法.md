# 基本语法

## 1.语句

JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。

语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句。

```
var a = 1 + 3;
```

`1 + 3`叫做表达式（expression）

## 2.标识符

标识符(identifier)是变量、属性名、函数、函数的参数。

命名规则:

- 由字母、数字、下划线(用于lodash等外部库引入、私有属性)、或者$(jq、原型上的方法)组成
- 不能以数字开头。
- 不能使用关键字、保留字作为标识符.

合法标识符:

```js
arg0
_tmp
$elem
π
var 临时变量 = 1;
```

下面这些则是不合法的标识符。

```js
1a  // 第一个字符不能是数字
23  // 同上
***  // 标识符不能包含星号
a+b  // 标识符不能包含加号
-d  // 标识符不能包含减号或连词线
```

> JavaScript 有一些保留字，不能用作标识符：arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。

## 3.变量

JS是变量是松散类型，可以保存任何数据，每个变量只是一个保存值的占位符。变量是对“值”的具名引用。

变量就是为“值”起名，然后引用这个名字，就等同于引用这个值。

## 4.条件语句

- if(   truly变量或falsely变量   )..else

- switch  严格相等 fruit   === "banana"

  ```js
  switch (fruit) {
    case "banana":
      // ...
      break;
    case "apple":
      // ...
      break;
    default:
      // ...
  }
  ```

- 三元运算

  ```
  (条件) ? 表达式1 : 表达式2
  ```

  ```js
  var msg = '数字' + n + '是' + (n % 2 === 0 ? '偶数' : '奇数');
  ```

## 5.循环语句

- break和continue可以用于for和while

- while循环

  ```js
  var i = 0;
  
  while (i < 100) {
    console.log('i 当前为：' + i);
    i = i + 1;
  }
  上面的代码将循环100次，直到i等于100为止。
  ```

- for循环

  ```js
  for (初始化表达式; 条件; 递增表达式)
    语句
  
  // 或者
  
  for (初始化表达式; 条件; 递增表达式) {
    语句
  }
  ```

  ```
  let a=0;
  for(;a<1;a++){
  
  }
  ```

- label

  ```js
  top:
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (i === 1 && j === 1) break top;
        console.log('i=' + i + ', j=' + j);
      }
    }
  // i=0, j=0
  // i=0, j=1
  // i=0, j=2
  // i=1, j=0
  ```

  上面代码为一个双重循环区块，`break`命令后面加上了`top`标签（注意，`top`不用加引号），满足条件时，直接跳出双层循环。如果`break`语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

  标签也可以用于跳出代码块。

  ```
  foo: {
    console.log(1);
    break foo;
    console.log('本行不会输出');
  }
  console.log(2);
  // 1
  // 2
  ```

  上面代码执行到`break foo`，就会跳出区块。

## 6.undefined和null

Brendan Eich 觉得表示“无”的值最好不是对象。其次，那时的 JavaScript 不包括错误处理机制，Brendan Eich 觉得，如果`null`自动转为0，很不容易发现错误。

因此，他又设计了一个`undefined`。区别是这样的：`null`是一个表示“空”的对象，转为数值时为`0`；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。

## 7.布尔值

下列运算符会返回布尔值：

- 前置逻辑运算符： `!` (Not)
- 相等运算符：`===`，`!==`，`==`，`!=`
- 比较运算符：`>`，`>=`，`<`，`<=`

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为`false`，其他值都视为`true`。

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- `""`或`''`（空字符串）