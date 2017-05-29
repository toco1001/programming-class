
    $(function() {
    var nav = $('.nav');
    //navの位置    
    var navTop = nav.offset().top;
    //スクロールするたびに実行
    $(window).scroll(function () {
      var winTop = $(this).scrollTop();
      //スクロール位置がnavの位置より下だったらクラスfixedを追加
      if (winTop >= navTop) {
        nav.addClass('fixed')
      } else if (winTop <= navTop) {
        nav.removeClass('fixed')
      }
    });
  });

