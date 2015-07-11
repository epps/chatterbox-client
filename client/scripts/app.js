// YOUR CODE HERE:
var app = {};

$(function(){
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    rooms: {},
    lastObjectId: null,
    // Chatterbox methods:
    init: function(){
      console.log('app.init()');
      // start getting message
      setInterval(app.fetch.bind(app),3077);
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
          // call displayMessages on data.results
          //update list of rooms
          //console.log('chatterbox: Message recevied',data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to fetch');
        }
      });
    },
    // input for displayMessages is an array of 100 objects
    displayMessages: function(messages) {
      // create list of unique room names

      //filter messages by room
      //filter by existing message
      //append new messages
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
