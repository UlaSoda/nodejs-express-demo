var express = require('express');
var router = express.Router();

// 引入 controller
const todoController = require('../controllers/todo_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express~' });
});

router.get('/bye', (req, res) => {
  res.render('hello')
})


router.get('/todos', todoController.getAll)
router.get('/todos/:id', todoController.get)


module.exports = router;
