const FileTree = {
  root: 
    {
      id: 0,
      name: "全部文件",
      child: {
        folder: [
          {
            id: 1,
            name: "文件1",
            child: {
              folder: [
                {
                  id: 11,
                  name: "文件夹1-1",
                  child: {
                    folder: [],
                    file: []
                  }
                },
                {
                  id: 12,
                  name: "文件夹1-2",
                  child: {
                    folder: [
                      {
                        id: 121,
                        name: "文件夹1-2-1",
                        child: {
                          folder: [],
                          file: []
                        }
                      }
                    ],
                    file: []
                  }
                }
              ],
              file: []
            }
          },
          {
            id: 2,
            name: "文件夹2",
            child: {
              folder: [],
              file: [
                {
                  id: 21,
                  name: "文件2.txt"
                },
                {
                  id: 22,
                  name: "文件3.pdf"
                }
              ]
            }
          }
        ],
        file: [
          {
            id: 3,
            name: "文件4.psd"
          }
        ]
      }
    }
}



export default FileTree;