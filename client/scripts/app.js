// YOUR CODE HERE:
var app = {};

$(function(){
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    rooms: {},
    lastObjectId: null,
    // Chatterbox methods:
    init: function(view){
      app.view = view;
      console.log('app.init()');
      // start getting message
      setInterval(app.fetch.bind(app),377);
    },
    send: function(message){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
      app.fetch();
    },
    fetch: function(rooms){
      //get messages
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        data: { order: '-createdAt' },
        contentType: 'application/json',
        success: function (data) {
          app.displayMessages(data.results);
          //console.log('chatterbox: Message recevied',data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to fetch');
        }
      });
    },
    messages: [],
    // input for displayMessages is an array of 100 objects
    displayMessages: function(messages) {
      // save first message's objectId for later.
      var firstObjectId = messages[0].objectId;
      app.messages = [];
      // iterate over messages
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        // update rooms
        app.rooms[message.roomname] = 1;

        // if we have seen this message before, break
        if(app.lastObjectId === message.objectId){
          break;
        }
        //append new messages
        app.messages.push(message);
      };
      // console.log(app.messages);
      // update sentinal
      app.lastObjectId = firstObjectId;

      // call view update method on newMessages.
      app.view.update(app);
    },
    examineAPI: function(){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: { order: '-createdAt' },
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent', data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    }

  };
});
