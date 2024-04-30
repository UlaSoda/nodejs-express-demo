var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express~' });
});

router.get('/bye', (req, res) => {
  res.render('hello')
})

// 建立 todos data
const todos = [
  'first todo', 'second todo', 'third todo'
]

router.get('/todos', (req, res) => {
  // 第二個參數可傳入資料
  res.render('todos', {
    todos     // todos: todos 一樣的話可省略寫法
  })
})

// 加上 :id 代表不確定的參數
router.get('/todos/:id', (req, res) => {
  // params: 可拿到網址列上指定的參數
  const id = req.params.id
  const todo = todos[id]
  res.render('todo', {
    todo
  })
})

module.exports = router;
