const { Pool } = require('pg');

// 建立 todos data
const todos = [
  'first todo', 'second todo', 'third todo'
]


// 定義模型
class Todo {
  constructor(id, name) {
    this.ID = id;
    this.Name = name;
  }
}

// 建立連線池
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1qaz@WSX',
  port: 5432, // PostgreSQL 的預設端口是 5432
});

// 取得所有
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        done();
        reject(err);
        return;
      }
      client.query('SELECT * FROM todos', (err, result) => {
        done();
        if (err) {
          reject(err);
          return;
        }
        const todos = result.rows.map(row => new Todo(row.ID, row.Name));
        resolve(todos);
      });
    });
  });
};

//取得指定ID
const get = (id) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done();
          reject(err);
          return;
        }
        client.query('SELECT * FROM todos WHERE "ID" = $1 LIMIT 1', [id], (err, result) => {
          done();
          if (err) {
            reject(err);
            return;
          }
          if (result.rows.length === 0) {
            resolve(null); 
            return;
          }
          const todo = new Todo(result.rows[0].ID, result.rows[0].Name);
          resolve(todo);
        });
      });
    });
};


module.exports = {
  getAll,
  get
};