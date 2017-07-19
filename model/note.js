//  操作数据库
var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined,{
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') 
});


// 测试数据库链接状态
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


  //  creat 四个参数 id text createdAt updatedAt
  const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    }
  });

  /*
  // force: true will drop the table if it already exists
  Note.sync().then(() => {
    // Table created 创建表
    return Note.create({
      text: ' hello John 10086',
    });
  }); 

  //  checked
  Note.findAll({raw: true}).then(notes => {
    console.log(notes)
  })
  */
  //  从table查找 ID 为5的数据
  Note.findAll({raw:true, where:{id: 5}}).then(function(notes){
    console.log(notes)
  })


  //  导出
  module.exports = Note