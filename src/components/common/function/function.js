const Func = {
  transferMsgMem(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem || []
    });
  },

  selAll() {
    this.setState(prevState => {
      const { members: arr } = prevState;
      let num = 0;

      if (arr) {
        arr.map(i => {
          if (i.selected) num += 1;
          return true;
        });

        if (num === arr.length) {
          arr.map(i => {
            const j = i;
            j.selected = false;
            return j;
          });
        } else {
          arr.map(i => {
            const j = i;
            j.selected = true;
            return j;
          });
        }
      }

      return { members: arr };
    });
  },

  selAllo(sel) {
    this.setState(prevState => {
      const { members: arr } = prevState;
      if (arr) {
        if (!sel) {
          arr.forEach(i => {
            const j = i;
            j.selected = false;
            // return j;
          });
        } else {
          arr.forEach(i => {
            const j = i;
            j.selected = true;
            // return j;
          });
        }
      }
      return { members: arr };
    });
  },

  save() {
    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);
  },

  del(mem1) {
    const mem = mem1;
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;

    if (!mem.dealed) mem.dealed = true;

    transferMsg(arr1, arr2);
  },

  transferMsgDel(del) {
    this.setState({
      deleteX: del
    });
  },
  willUnmount() {
    const { members: arr, transferMsg } = this.props;

    arr.filter(item => !item.dealed);

    transferMsg(arr);
  }
};
export default Func;
