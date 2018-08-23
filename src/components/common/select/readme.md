## Select——下拉选框


### 【props】

|  名称  |            描述            | type    |
|:------:|:--------------------------:|---------|
|  items |          select选项数据   （默认[]）      | array  |
| checkedIndex |       选中数据的数组索引 （默认0）          | number  |
|   onChange  |    选中项发生变化时触发的事件（参数为选中数据的数组索引）   | func  |

### 【items格式】

|  名称  |            描述            | type    |
|:------:|:--------------------------:|---------|
|  id |          选项的id     | number  |
| value |       选项的值          | string  |

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

