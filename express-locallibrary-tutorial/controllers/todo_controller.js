// 先從 model 引入 todos 資料
const todoModel = require("../models/todo_model")

// 建立一個 todoController 物件，透過方法來存取 model 的資料
const todoController = {
  // 傳入參數 req, res
  getAll: (req, res) => {
    todoModel.getAll()
    .then(todos => {
      res.render('todos', { todos });
    })
    .catch(err => {
      console.error('Error getting todos:', err);
      res.status(500).send('Error getting todos');
    });
  },

  get: (req, res) => {
    const id = req.params.id;
    todoModel.get(id)
    .then(todo => {
      res.render('todo', { todo });
    })
    .catch(err => {
      console.error('Error getting todo:', err);
      res.status(500).send('Error getting todo');
    });
  },
}

module.exports = todoController