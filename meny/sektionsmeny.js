$(document).ready(function () {

  var level = 0;
  var pageText;
  var h3Text;
  var prevText;

  var ul;
  var ulLevel;
  var ulParent;
  var ulParentsParent;
  var direction = 1;
  var width = 375;
  var position = 0;

  var linksArray = ['För patient'];

  // Navigate menu position
  function navigationPosition (level) {

    console.log('level: ' + level);

    if( direction === 0 && linksArray.length > 0 || direction === 1 ) {
      $('.prev').text(linksArray[level - 1]);
    }

    $('h3').text(linksArray[level]);

    // Go deep
    if( direction === 1 ) {
      position = width * level;
      $('.section-nav').children('ul').css({'transform':'translateX(-'+position+'px)'});
      $('.prev').removeClass('hide');
    }

    // Go up
    if( direction === 0 ) {
      position = position - width;
      if( linksArray.length > 0 ) {
        $('.section-nav').children('ul').css({'transform':'translateX(-'+position+'px)'});
      }
      if( linksArray.length < 2 ) {
        $('.prev').addClass('hide');
      }
    }

  }

  // <li> click
  $('li').click(function () {

    direction = 1;

    if( $(this).hasClass('dropdown') ) {

      linksArray.push($(this).children('a').text());
      $(this).children('ul').addClass('active');
      $(this).children('ul').addClass('show');
      $(this).parent().removeClass('show');

      level = $(this).children('ul').attr('data-level');
      navigationPosition(level);

      return false; // Stops click on element behind (li)
    }
  });

  //
  $('.prev').click(function () {

    if( linksArray.length <= 1 ) {
      return false;
    }

    direction = 0;
    linksArray.pop();

    console.log(linksArray);

    ul = $('ul.show');
    ulParent = ul.parent().parent();

    level = ulParent.attr('data-level');

    if( linksArray.length > 0 ) {
      console.log('Greta '+level);
      ulParent.addClass('show');
      ul.removeClass('show');
      ul.removeClass('active');

    } else {

    }
    navigationPosition(level);
  });

  // Link click
  $('a').click(function() {
    event.preventDefault();
    $('body').hide();
    pageText = $(this).text();

    setTimeout(function () {
      $('h1').text(pageText);
      $('body').show();
    }, 1000);
  });

});
