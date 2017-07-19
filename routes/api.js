var express = require('express');
var router = express.Router();
var Note = require('../model/note.js')

/* 获取所有的 notes */

router.get('/notes', function(req, res, next) {
  
  var opts = {raw: true}
  if(req.session && req.session.user){
    opts.where = {uid:req.session.user.id }
  }


  //  从数据库获取
  Note.findAll(opts).then(function(notes) {
    console.log(notes)
    res.send({status: 0, data: notes});
  })
});

/*新增note*/
router.post('/notes/add', function(req, res, next){
   //  判断是否登录过，权限设置
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请先登录'})
  }

  var uid = req.session.user.id
  var note = req.body.note
  console.log(note)
  Note.create({text: note, uid: uid}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1, errorMsg: '数据库出错，没能添加数据'})
  })
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
  //  判断是否登录过，权限设置
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  var uid = req.session.user.id
  var note = req.body.note 
  var noteId = req.body.id
  Note.update({text: note}, {where:{id: noteId, uid: uid}}).then(function(lists){
    console.log(arguments)
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常'});
  })
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
  //  判断是否登录过，权限设置
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请先登录'})
  }
  var uid = req.session.user.id
  var note = req.body.note 
  var noteId = req.body.id
  Note.destroy({where:{id:noteId, uid:uid}}).then(function(deleteLen){
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;
