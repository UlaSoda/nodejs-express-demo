const { Sequelize, DataTypes } = require('sequelize');

// 建立連線池
const sequelize = new Sequelize('postgres', 'postgres', '1qaz@WSX', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
  define: {
    timestamps: false
}, 
  freezeTableName: true

});

// 定義模型
const Todos = sequelize.define('Todos', {
  id: {       // 欄位名稱
    type: Sequelize.STRING,  //  資料型態
    allowNull: false, // 能不能為空，預設是 true
    field: 'ID' ,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
  }
})

// 取得所有
const getAll = () => {
  return new Promise((resolve, reject) => {
    sequelize.sync()
      .then(() => {
        console.log('Database synced');
        // 执行查询
        Todos.findAll()
          .then(todos => {
            // 处理获取到的数据
            console.log(todos);
            resolve(todos);
          })
          .catch(err => {
            console.error('Error fetching todos:', err);
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error syncing database:', err);
        reject(err);
      });
  });
};
//取得指定ID
const get = (id) => {
  return new Promise((resolve, reject) => {
    sequelize.sync()
      .then(() => {
        console.log('Database synced');
        // 执行查询
        Todos.findOne({
          where: {
            ID: id
          }
        })
          .then(todo => {
            if (todo === null) {
              // 找不到
              reject('找不到ID');
            } else {
              // 找到回傳結果
              console.log(todo);
              resolve(todo);
            }
          })
          .catch(err => {
            console.error('Error fetching todos:', err);
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error syncing database:', err);
        reject(err);
      });
  });
};


module.exports = {
  getAll,
  get
};