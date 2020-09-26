const express = require('express')

const logger = require('morgan');

const bodyParse = require('body-parser')

const session = require('express-session')

const userRouter = require('./routes/userRouter')

//2.创建服务器对象；
const app = express();

app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();
});
//配置session:
app.use(session({
    secret: '123456', // 密钥  MD5（123456）
    name: '_baijie176', // 如果没有明确name,使用connect.id来做cookie的name.
    cookie: {maxAge: 1000*5},  // maxAge: cookie的生命周期，以毫秒为单位；
    rolling: false, // 是否更新session-cookie失效时间；
    resave: false //重新保存
}))


app.set("views", __dirname + "/views");

app.set('view engine', 'ejs')

//3. 配置服务器
app.use(logger('dev'));

//3.8 配置非GET请求
app.use(bodyParse.urlencoded({extends: false}))  // lilmit:'2mb'
app.use(bodyParse.json())  //处理JSON数据请求。

app.use(userRouter)


//3.1 配置静态资源目录: __dirname:表示当前开发项目所以的根目录
app.use(express.static(__dirname + "/public" ));

//4. 设置服务器的监听端口
app.set('port',8100);

//5. 使用监听的端口

app.listen(app.get('port'), function () {
    console.log('后端NODE服务器正在运行中，端口为 8100.')
})


