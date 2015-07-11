var view = {};
$(function(){
  // set up submit message button handler
  $('button').on('click',function(){
    var username = window.location.search.match(/(&|\?)username=(\w*)/)[2];

    app.send({
      username: username,
      roomname: view.activeRoom,
      text: $('#message-input').val(),
      // room: room
    });
    $('#message-input').val('');
  });

  // DID NOT WORK HERE BECAUSE ATTACHED TO DOM THAT WAS LATER DROPPED
  // // set up room buttons handers
  // $('input:radio').on('click', function(){
  //   console.log('radio');
  // });

  // view delegates
  view = {

    update: function(app){
      view.updateRooms(app);
      view.updateMessages(app);
      // view.filterByRoom();
    },
    activeRoom: 'lobby',
    updateRooms: function(app){
      // get sorted list of current rooms
      var rooms = Object.keys(app.rooms).sort();

      // build new room DOM
      var $fragment = $(document.createDocumentFragment());
      rooms.forEach(function(room){
        // if (!room) return;
        // create node
        room = view.clean(room);
        var active = view.activeRoom === room ? 'active' : '';
        var $node = $(
          '<label class="btn btn-primary  btn-wrap ' + active + '">' + room
          + '<input type="radio" name="rooms" id="' + room + '" ></label>'
        );
        // attach handler
        $node.on('click', function(){
          // update activeRoom
          view.activeRoom = room;
        });

        //insert into DOM
        $fragment.append($node);

      });

      // add add room option
      var $node = $('<label class="btn btn-primary">+<input type="radio" name="rooms" id="btn-newroom" ></label>');
      // attach new room handler
      $node.on('click', function(){
        // prompt for roomname
        var room = view.clean(prompt('Where you wanna be, homey?'));
        app.rooms[room] = 1;
        // update activeRoom
        view.activeRoom = room;
      });
      $fragment.append($node);

      // dump room DOM
      $('.rooms').empty().append($fragment);
      // insert new room DOM

      // filter existing messages by new active room
      $('tr').each(function(i, message){
        var $message = $(message);
        if($message.data('room') === view.activeRoom) $message.fadeIn();
        else $message.fadeOut();
      });
    },
    // hide by room
    // on click
      // update active view.activeRoom
      // iterate over messages in dom
        // grab room name from dom element
        // filter message by roomname -- $.fadeToggle
    filterByRoom: function(){

    },

    // view update method
    updateMessages: function(app){
      var newMessages = app.messages;
      var $fragment = $(document.createDocumentFragment());
      // var message = { username: 'shawndrost', text: 'trololo', roomname: '4chan'};
      newMessages.forEach(function(message){
        if (!message || !message.text) return;
        // create node

        var text = view.clean(message.text);
        var roomname = view.clean(message.roomname);
        var username = view.clean(message.username);

        var $node = $('<tr class="message" data-room="' + roomname
          + '"><td class="username">' + username
          + '</td><td class="messagetext">' + text
          + '</td></tr>');

        //hide if not from active room
        if(roomname !== view.activeRoom) $node.hide();
        //insert into DOM
        $fragment.append($node);

      });
      $('.messages').prepend($fragment);
    },

    clean: function(str){
      if(!str) return '';
      return str.replace(/[^\w\s-]/g,function(ch){
          return '&#' + ch.charCodeAt() + ';';
      });
    }
  };
});
