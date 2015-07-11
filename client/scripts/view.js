
var view = {};
$(function(){
  // set up submit message button handler
  $('button').on('click',function(){
    var username = window.location.search.match(/(&|\?)username=(\w*)/)[2];
    app.send({
      username: username,
      text: $('input').val(),
      // room: room
    });
  });

  // view delegates
  view = {


    // hide by room


    // view update method
    update: function(app){
      var newMessages = app.messages;
      var rooms = app.rooms;
      var $fragment = $(document.createDocumentFragment());
      // var message = { username: 'shawndrost', text: 'trololo', roomname: '4chan'};
      newMessages.forEach(function(message){
        if (!message || !message.text) return;
        // create node

        var text = view.clean(message.text)
        var roomname = view.clean(message.roomname);
        var username = view.clean(message.username);

        var $node = $('<div class="col-md-12 message" data-room="' + roomname
          + '"><span class="username">' + username
          + '</span><span class="messagetext">' + text
          + '</span></div>');
        //insert into DOM
        $fragment.append($node);

      });
      $('.messages').prepend($fragment);
    },
    clean: function(str){
      if(!str) return '';
      return str.replace(/\W/g,function(ch){
          return '&#' + ch.charCodeAt() + ';';
      });
    }
  }
});
