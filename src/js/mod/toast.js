
// var $ = require('jquery');
require('less/toast.less');

function toast(msg, time){
  this.msg = msg;
  this.dismissTime = time||1000;  //ms
  this.createToast();
  this.showToast();
}
toast.prototype = {
  createToast: function(){
    var tpl = '<div class="toast">'+this.msg+'</div>';
    this.$toast = $(tpl);
    $('body').append(this.$toast);
  },
  showToast: function(){
    var self = this;
    this.$toast.fadeIn(300, function(){
      setTimeout(function(){
         self.$toast.fadeOut(300,function(){
           self.$toast.remove();
         });
      }, self.dismissTime);
    });

  }
};

function Toast(msg,time){
  return new toast(msg, time);
}

module.exports.Toast = Toast;
// function toast(msg,time) {
// 	time.msg = msg;
// 	this.dismissTime = time || 100;
// 	this.creatToast();
// 	this.showToast();
// }

// toast.prototype = {

// 	creatToast: function(){
// 		var tpl = '<div class="toast">' + this.msg +'</div>';
// 		this.$toast = $(tpl);
// 		$('body').append(this.$toast);
// 	},
// 	showToast: function() {
// 		var self = this;
// 		this.$toast.fadeIn(300, function() {
// 			setTimeout(function() {
// 				sefl.$toast.fadeOut(300,function() {
// 					self.$toast.remove();
// 				});
// 			},self.dismissTime);
// 		});
// 	}
// };

// function Toast(msg,time) {
// 	return new toast(msg,time);
// }


// module.exports.Toast = Toast;