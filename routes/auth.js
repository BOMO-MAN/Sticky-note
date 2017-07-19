var express = require('express');
var router = express.Router();

//  引入auth2 协议相关模块
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


//   序列化 session 
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

//  可以取到序列化后的session
passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

//  使用配置信息

passport.use(new GitHubStrategy({
    clientID: '760d13adc80864f45041',
    clientSecret: 'c1c1387bf3af5203bc9ee77fccfe2031fb313968',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


//  注销 路由跳转功能
router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

//  点击请求 GitHub
router.get('/github',
  passport.authenticate('github'));

//  Github 回调响应
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });



module.exports = router;
