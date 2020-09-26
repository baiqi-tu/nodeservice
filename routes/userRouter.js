const express = require('express');
const router = express.Router();  //返回 一个路由对象的实例
const https = require('https');
var iconv = require("iconv-lite");
router.route('/denglu')
.get(function(req,res){
	 let uname=req.query.username;
	 let upwd=req.query.password;
	 console.log(uname)
	 console.log(upwd)
	 if (!/^\w{5,10}$/.test(uname)){//结果为假，在取值，及真、
	 	res.json({
			code:'4001',
			msg:'用户名规则不正确',
			data:[]
		})
	 } else if (!/^\w{6,10}$/.test(upwd)){
	 	res.json({
			code:'4002',
			msg:'密码规则不正确',
			data:[]
		})
	 } else if (uname==='123456'&&upwd==='1234567'){
	 	res.json({
			code:'200',
			msg:'成功',
			token:'token',
			data:[{id:1,uname:'123456'}]
		})
	 }else {
	 	res.json({
			code:'4003',
			mag:"用户名和密码不正确",
			token:'',
			data:[]
		})
	 }
	})
	router.route('/addTask')
		.post(function (req,res) {
			console.log(req.body)
			if (req.body.type!==undefined&&req.body.name!==undefined){
				res.json({
					code: 200,
					msg: '添加任务成功',
					data: []
				})
			} else {
				res.json({
					code: 4001,
					msg: '添加任务失败',
					data: []
				})
			}
		})
.post(function(req,res){
	let uname=req.body.username;
	let upwd=req.body.password;
	console.log(uname)
	console.log(upwd)
	if (!/^\w{5,10}$/.test(uname)){//结果为假，在取值，及真、
		res.json({
			code:'4001',
			msg:'用户名规则不正确',
			data:[]
		})
	} else if (!/^\w{6,10}$/.test(upwd)){
		res.json({
			code:'4002',
			msg:'密码规则不正确',
			data:[]
		})
	} else if (uname==='123456'&&upwd==='1234567'){
		res.json({
			code:'200',
			msg:'成功',
			token:'token',
			data:[{id:1,uname:'123456'}]
		})
	}else {
		res.json({
			code:'4003',
			mag:"用户名和密码不正确",
			token:'',
			data:[]
		})
	}
})
let scrollList=[
	{url: "/img/jiudian.png","id":1} ,
	{url: "/img/jiudian.png","id":2} ,
	{url: "/img/jiudian.png","id":3} ,
	{url: "/img/jiudian.png","id":4} ,
	{url: "/img/jiudian.png","id":5} ,
	{url: "/img/jiudian.png","id":6} ,
	{url: "/img/jiudian.png","id":7} ,
	{url: "/img/jiudian.png","id":8} ,
	{url: "/img/jiudian.png","id":9} ,
	{url: "/img/jiudian.png","id":10}
]
router.route('/yemian')
	.post(function (req,res) {
		console.log(req.body)
		if (req.body.pid!==undefined){
			res.json({
				code:200,
				msg:"yes",
				data:[scrollList[req.body.pid-1]]
			})
		}else {
			res.josn({
				code:4001,
				msg:"no",
				data:[]
			})
		}
	})
router.route('/getUserid')
	.post(function (req,response) {
		let code=req.boby.code;
		let appid='wxf483e99ff72019c2';
		let secret='b371266c799086d7224e0200f1db4cc5';
		let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
		https.get(url,(res)=>{
			var datas=[];
			var size=0;
			res.on('data',function (data) {
				datas.push(data)
				size+=data.lenght
			})
			res.on('end',()=>{
				var buff=Buffer.concant(datas.size);
				var result=iconv.decde(buff,'utf8');
				response.json({
					code:200,
					msg:'yes',
					data:[result]
				})
			})
		}).on('error',(e)=>{

		})
	})
router.route('/upload')
	.post(function(req,res){
          res.json({
			  'code':200,
			  'msg':'yes',
			  'data':[{
			  	"userPhoto":'/img/benzi.png'
			  }]
		  })
})
router.route('/touxiang')
	.post(function(req,res){
		console.log(req.body);
		if(req.body.pid !== undefined){
			res.json({
				code: 200,
				msg: '请求成功',
				data: [req.body.pid]
			})
		}	else{
			res.json({
				code: 4001,
				msg: '请求失败，没有找到商品',
				data: []
			})
		}
	});
router.route('/yemian')
	.post(function (req,res) {
		res.json({
			'code':200,
			'msg':'yes',
			'data':[]
		})
	})
module.exports = router;