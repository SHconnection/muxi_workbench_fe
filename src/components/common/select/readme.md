## Select——下拉选框


### 【props】

|  名称  |            描述            | type    |
|:------:|:--------------------------:|---------|
|  items |          select选项数据   （默认[]）      | array  |
| checkedIndex |       选中数据的数组索引 （默认0）          | number  |
|   onChange  |    选中项发生变化时触发的事件（参数为选中数据的数组索引,id）   | func  |

``onChange``是从父组件传来的参数，用于回调选择某个 option 之后的函数，一般情况下回调的参数是(index, id)...如果 item 有id的话，type 为 'file' 时，触发回调传递的参数是选择文件之后选中的文件对象。
**注意**⚠️️：input.file 组件的 onChange 和此处的 onChange 只是名字一样（当时取名字不够优雅，应该用 handleXXX 这样的名字。

### 【items格式】

|  名称  |            描述            | type    |
|:------:|:--------------------------:|---------|
|  id |          选项的id     | number  |
| value |       选项的值          | string  |
| type |       选项的类型（主要用于“文件上传的需求”）          | string  |

``item.type === 'file'`` 的时候，item 就是 <input type='file'> 类型，点击之后会调用文件选取，并隐藏 options （以后可以用 children 来重写 select 组件，这种写法还是不够好）

### 例子：

```jsx

...

groups: [
  {
    id: 1,
    value: '安卓组',
  },
  {
    id: 2,
    value: '前端组',
  },
  {
    id: 3,
    value: '后段组',
  },
  {
    id: 0,
    value: '全部成员',
  },
]

...

changeGroupCheck(index) {
  this.setState({
    groupCheckedIndex: index
  })
}

...

<Select items={groups} checkedIndex={groupCheckedIndex} onChange={this.changeGroupCheck} />

```

