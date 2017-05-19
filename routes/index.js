var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    // res.json(req.params);
    next();
}, function(req, res, next) {
    console.log('Request Type:', req.method);
    next();
});
router.use('/:id', function(req, res, next) {
    console.log(req.query, req.params)
    var id = req.params.id;
    var regex = /^\d+$/;
    if (!regex.test(id)) {
        res.statusCode = 404;
        next();
        return;
    }
    id = parseInt(id);
    var data = {
        id: id
    }
    res.render("room", data)
});
module.exports = router;