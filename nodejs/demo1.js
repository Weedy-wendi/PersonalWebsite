const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const comment = require('../vue/test/src/components/data.json')

const fs = require('fs').promises;
const path = require('path');

var app = express()

app.use(cors())

app.use(bodyParser.json())


const user=[
  {
    id:1,
    username:'weedy',
    password:'114514'
  }]

app.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body;
    console.log(username, password)
    if(!username || !password){
      console.log('用户名或密码不能为空');
      return res.status(400).json({message:'用户名或密码不能为空'});
    }
    const users=user.find(u=>u.username===username)
    const isPasswordValid=user.find(u=>u.password===password)
    if(!users){
      console.log('用户不存在');
      return res.status(401).json({
        status:401,
        message:'用户名或密码错误'
      })
    }
    if(!isPasswordValid){
      console.log('密码错误');
      return res.status(401).json({
        status:401,
        message:'用户名或密码错误'
      })
    }
    console.log(users.id)
    res.status(200).json({
      status:200,
      message:'登录成功',
      user:{
        id:users.id,
        username:users.username
      }
    })
    console.log('登录成功');
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/addcomment',async(req,res)=>{
  try{
    const {content, time}=req.body

    const data=await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'))
    const jsondata=JSON.parse(data)

    const jsonlength=jsondata.data.length+1
    const idnumber=String(jsonlength).padStart(4,'0')

    const newcomment={
      "id":"comment"+idnumber,
      "date":time,
      "username":"weedy",
      "userimg":"#",
      "likeNum":0,
      "hateNum":0,
      "content":content,
      "isExpand":false,
      "reply":[],
    }
    jsondata.data.push(newcomment)

    console.log(jsondata)

    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:'评论成功'
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/like/:commentId',async(req,res)=>{
  try{
    const commentId=req.body;

    const data = await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'),'utf-8')
    const jsondata=JSON.parse(data)
    const comment=jsondata.data.find(c=>c.id===commentId.id)
    if(!comment){
      return res.status(404).json({
        status:404,
        message:'评论不存在'
      })
    }
    comment.likeNum+=1;
    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:'点赞成功'
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/hate/:commentId',async(req,res)=>{
  try{
    const commentId=req.body;
    console.log(commentId)
    const data = await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'),'utf-8')
    const jsondata=JSON.parse(data)

    const comment=jsondata.data.find(c=>c.id===commentId.id)
    if(!comment){
      return res.status(404).json({
        status:404,
        message:'评论不存在'
      })
    }
    comment.hateNum+=1;
    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:'点踩成功'
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/replylike/:commentId',async(req,res)=>{
  try{
    const commentId=req.body;
    const data = await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'),'utf-8')
    const jsondata=JSON.parse(data)
    const comment=jsondata.data.find(c=>c.id===commentId.parentid)
    const reply=comment.reply.find(r=>r.id===commentId.childid)

    if(!comment){
      return res.status(404).json({
        status:404,
        message:'父评论不存在'
      })
    }
    if(!reply){
      return res.status(404).json({
        status:404,
        message:'该回复不存在'
      })
    }
    reply.likeNum+=1;
    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:'点赞成功'
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/replyhate/:commentId',async(req,res)=>{
  try{
    const commentId=req.body;
    const data = await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'),'utf-8')
    const jsondata=JSON.parse(data)
    const comment=jsondata.data.find(c=>c.id===commentId.parentid)
    const reply=comment.reply.find(r=>r.id===commentId.childid)

    if(!comment){
      return res.status(404).json({
        status:404,
        message:'父评论不存在'
      })
    }
    if(!reply){
      return res.status(404).json({
        status:404,
        message:'该回复不存在'
      })
    }
    reply.hateNum+=1;
    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:'点踩成功'
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.post('/expand',async (req,res)=>{
  try{
    const commentId=req.body;

    const data=await fs.readFile(path.join(__dirname,'../vue/test/src/components/data.json'),'utf-8')
    const jsondata=JSON.parse(data)

    const comment=jsondata.data.find(c=>c.id===commentId.id)
    if(!comment){
      return res.status(404).json({
        status:404,
        message:'评论不存在'
      })
    }
    comment.isExpand=!comment.isExpand;
    await fs.writeFile(path.join(__dirname,'../vue/test/src/components/data.json'),JSON.stringify(jsondata,null,2),'utf-8')

    res.status(200).json({
      status:200,
      message:comment.isExpand
    })

  }catch(err){
    console.log(err)
    res.status(500).json({
      status:500,
      message:'服务器错误'
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})

/*async function test() {
  try {
    // 1. 读取文件
    const data1 = await fs.readFile('E:/PersonalWork/vue/test/src/components/data.ts', 'utf-8');
    console.log(data1);

    const code = 404;
    const status = 'Not Found';

    // 2. 正则匹配（假设格式是 `status: "...", code: xxx`）
    const regex = /(status:\s*["'])(成功)(["']\s*,\s*code:\s*)(200)/g;    const updated = data1.replace(regex, `$1${status}$3${code}`);

    // 3. 写入文件（⚠️ 不要加回调，直接用 await）
    await fs.writeFile('E:/PersonalWork/vue/test/src/components/data.ts', updated, 'utf-8');
    console.log('写入成功');
    const data2 = await fs.readFile('E:/PersonalWork/vue/test/src/components/data.ts', 'utf-8');
    console.log(data2); // 这行会在写入完成后执行
  } catch (err) {
    console.error('操作失败:', err);
  }
}

test();*/

async function test(){
  try{
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8');
  }catch{

  }
}