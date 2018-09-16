const FileTree = {
  root: 
    {
      folder: true,
      id: 0,
      name: "全部文件",
      child: [
        {
          folder: true,
          id: 1,
          name: "文件夹1",
          child: [
            {
              folder: true,
              id: 11,
              name: "文件夹1-1",
              child: [
                {
                  folder: true,
                  id: 111,
                  name: "文件夹1-1-1",
                  child: []
                },
                {
                  folder: false,
                  id: 112,
                  name: "文件1-1-2.txt"
                }
              ]
            },
            {
              id: 12,
              name: "文件夹1-2",
              child: []
            }
          ]
        },
        {
          folder: true,
          id: 2,
          name: "文件夹2",
          child: [
            {
              folder: true,
              id: 21,
              name: "文件夹2-1",
              child: []
            },
            {
              folder: false,
              id: 22,
              name: "文件2-2.pdf"
            }
          ]
        },
        {
          folder: true,
          id: 3,
          name: "文件夹3",
          child: []
        },
        {
          folder: false,
          id: 4,
          name: "文件0-1.txt"
        },
        {
          folder: false,
          id: 5,
          name: "文件0-2.pdf"
        },
        {
          folder: false,
          id: 6,
          name: "文件0-3.psd"
        }
      ]
    }
}



export default FileTree;