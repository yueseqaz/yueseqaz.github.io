var posts=["2024/11/09/jiami/","2024/12/23/dbreview/","2024/11/05/tomcat-tutorial/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"chatgpt","link":"https://chat.openai.com/","avatar":"https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp","descr":"人工智能平台，提供对话式聊天","siteshot":"https://bu.dusays.com/2024/11/03/672760fa4cde5.jpg"},{"name":"claude","link":"https://claude.ai/","avatar":"https://claude.ai/images/claude_app_icon.png","descr":"人工智能平台，提供对话式聊天","siteshot":"https://bu.dusays.com/2024/11/03/672760fa4cde5.jpg"},{"name":"16k","link":"https://www.16k.club/","avatar":"https://bu.dusays.com/2024/11/03/6727572648ee9.jpg","descr":"cosplay写真，一”网“打尽","siteshot":"https://bu.dusays.com/2024/11/03/672760fa4cde5.jpg","color":"vip","tag":"nsfw"},{"name":"sakura主页","link":"https://sakuralearnnote.serv00.net/","avatar":"https://bu.dusays.com/2024/11/03/6727572648ee9.jpg","descr":"隶属于Sakura的homepage","siteshot":"https://bu.dusays.com/2024/11/03/672760fa4cde5.jpg","color":"vip","tag":"homepage"},{"name":"ace机场","link":"https://ace-taffy.com/auth/register?code=QowZ","avatar":"https://bu.dusays.com/2024/11/03/6727572648ee9.jpg","descr":"速度快，稳定性好，性价比高，Sakura也在用","siteshot":"https://bu.dusays.com/2024/11/03/672760fa4cde5.jpg","color":"vip","tag":"机场"},{"name":"陆小启","link":"https://lxqxm.top/","avatar":"https://bu.dusays.com/2024/08/28/66ceb35deb5b1.webp","descr":"一个对你有帮助的圈子","siteshot":"https://bu.dusays.com/2024/11/03/6726f7c948163.png"},{"name":"KasumiTech","link":"https://sakurablogs.top/","avatar":"https://bu.dusays.com/2024/11/03/6727572648ee9.jpg","descr":"分享创造价值","siteshot":"https://bu.dusays.com/2024/11/06/672b02a9cc72d.png","recommend":true},{"name":"东方月初","link":"https://hexo.200038.xyz/","avatar":"https://serv.200038.xyz/2024/09/19/040857.webp","descr":"东方月初，涂山红红。","siteshot":"https://serv.200038.xyz/2024/09/23/930491.webp"},{"name":"晓寒","link":"https://xiaohan-kaka.me/","avatar":"https://xiaohan-kaka.me/_next/image?url=https%3A%2F%2Ff003.backblazeb2.com%2Ffile%2Fblog-v3%2F120887894_p1.jpg&w=384&q=75","descr":"醉后不知天在水，满船清梦压星河。","siteshot":"https://xiaohan-kaka.me/_next/image?url=https%3A%2F%2Ff003.backblazeb2.com%2Ffile%2Fblog-v3%2F120887894_p1.jpg&w=384&q=75"},{"name":"陌颜Hao","link":"https://blog.imoyan.top/","avatar":"https://bu.dusays.com/2024/10/12/6709ddf3513c5.jpg","descr":"愿永不忘初心！"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情"},{"name":"XingJi の Blog","link":"https://love.xingji.fun/","avatar":"https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg","descr":"迄今所有人生都大写着失败，但不妨碍我继续向前✨","siteshot":"https://i.p-i.vip/47/20240920-66ed7b6730ca9.png"},{"name":"Spark’s Blog","link":"https://www.aspark.cc","avatar":"https://www.aspark.cc/img/avatar.webp","descr":"星星之火，可以燎原。","siteshot":"https://www.aspark.cc/img/siteshot.webp"},{"name":"七七小栈","link":"https://blog.zsrooj.site/","avatar":"https://blog.zsrooj.site/favicon5.ico","descr":"一个个个人博客，记录生活与技术","siteshot":"https://blog.zsrooj.site/img/%E7%BD%91%E7%AB%99%E6%88%AA%E5%9B%BE.png"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };