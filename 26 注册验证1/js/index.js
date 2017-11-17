

$(function(){
   // 个人中心-下拉菜单
   $('.member').hover(function(){
       $(this).css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').show().animate({
            t: 30,
            step: 10,
            mul: {
               o:100,
               h:110
            }
          })
   },function(){
       $(this).css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').animate({
            t: 30,
            step: 10,
            mul: {
               o:0,
               h:0
            },
            fn:function(){
              $('.member_ul').hide();
            }
          })
   });

   //遮罩画布
   var screen = $('#screen');

   //登录框
   var login = $('#login');
   login.center(350,250).resize(function(){
        //login.center(350,250);
        if(login.css('display') == 'block'){
           screen.lock();
        }
   });
   $('.login').click(function(){
        login.center(350,250).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target: 30,
            t: 30,
            step: 10
        });
   });
   $('#login .close').click(function(){
        login.css('display','none');
        screen.animate({
            attr : 'o',
            target: 0,
            t: 30,
            step: 10,
            fn:function(){
               screen.unlock()
            }
        });
   });

   //注册框
   var reg = $('#reg');
   reg.center(600,550).resize(function(){
        //login.center(350,250);
        if(reg.css('display') == 'block'){
           screen.lock();
        }
   });
   $('.reg').click(function(){
        reg.center(600,550).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target: 30,
            t: 30,
            step: 10
        }); 
   });
   $('#reg .close').click(function(){
        reg.css('display','none');
        screen.animate({
            attr : 'o',
            target: 0,
            t: 30,
            step: 10,
            fn:function(){
               screen.unlock()
            }
        });
   });


   //拖拽
   login.drag([$('#login h2').ge(0)]);
   reg.drag([$('#reg h2').ge(0)]);

   //百度分享初始化位置
   $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2 + 'px');

   // addEvent(window,'scroll',function(){
   //   $('#share').animate({
   //       attr: 'y',
   //       target: getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2
   //   })
   // })

   $(window).bind('scroll',function(){
       $('#share').animate({
            attr: 'y',
            target: getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2
        })
   })
   
   //百度分享收缩效果
   $('#share').hover(function(){
         $(this).animate({
             'attr':'x',
             'target': 0
         })
   },function(){
         $(this).animate({
             'attr':'x',
             'target': -211
         })
   })

   //滑动导航
   $('#nav .about li').hover(function(){
         var target = $(this).first().offsetLeft;
         //alert(target);
         $('#nav .nav_bg').animate({
            attr:'x',
            target:target + 20,
            time:30,
            step:10,
            fn:function(){
               $('#nav .white').animate({
                    attr:'x',
                    target:-target,
               })
            }
         })
   },function(){
         $('#nav .nav_bg').animate({
            attr:'x',
            target:20,
            time:30,
            step:10,
            fn:function(){
               $('#nav .white').animate({
                    attr:'x',
                    target:0,
               })
            }
         })
   })

   
   //菜单伸缩
   $('#sidebar h2').toggle(function(){
        $(this).next().animate({
             mul:{
               h:0,
               o:0
             }
        });
   },function(){
        $(this).next().animate({
             mul:{
               h:150,
               o:100
             }
        });
   })


   //表单验证
   //alert($('form').first().user.value)
   //$('form').form('user').value('888');
   //alert($('form').form('user').value())
   $('form').form('user').bind('focus',function(){
        //alert()
        $('#reg .info_user').show();
        $('#reg .succ_user').hide();
        $('#reg .error_user').hide();
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_user').hide();
            $('#reg .succ_user').hide();
            $('#reg .error_user').hide();
        }else if(!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))){
            $('#reg .error_user').show();
            $('#reg .info_user').hide();
            $('#reg .succ_user').hide();
        }else{
            $('#reg .succ_user').show();
            $('#reg .info_user').hide();
            $('#reg .error_user').hide();
        }
   })
   
   //密码验证
   $('form').form('pass').bind('focus',function(){
        //alert()
        $('#reg .info_pass').show();
        $('#reg .succ_pass').hide();
        $('#reg .error_pass').hide();
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            //$('#reg .info_pass').hide();
        }
   })

   //密码强度验证
   $('form').form('pass').bind('keyup',function(){
        var value = trim($(this).value());
        var value_length = value.length;
        var code_length = 0;
        

        //第一个条件6-20位之间
        if(value_length >= 6 && value_length <= 20){
            $('#reg .info_pass .q1').html('●').css('color','green');
        } else {
            $('#reg .info_pass .q1').html('○').css('color','#666');
        }

        //第二个必须条件的验证
        if(value_length > 0 && !/\s/.test(value)){
            $('#reg .info_pass .q2').html('●').css('color','green');
        } else {
            $('#reg .info_pass .q2').html('○').css('color','#666');
        }

        //第三个必须条件 大写字母 小写字母 数字 非空字符 任意两种混拼即可
        if(/[0-9]/.test(value)){
            code_length++;
        }
        if(/[a-z]/.test(value)){
            code_length++;
        }
        if(/[A-Z]/.test(value)){
            code_length++;
        }
        //console.log(/[^0-9a-zA-Z]/.test(value))
        if(/[^0-9a-zA-Z]/.test(value)){
            code_length++;
        }
        //console.log(code_length);
        if(code_length >= 2){
            $('#reg .info_pass .q3').html('●').css('color','green');
        }else {
            $('#reg .info_pass .q3').html('○').css('color','#666');
        }


   })

})
