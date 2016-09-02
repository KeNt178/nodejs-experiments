var Server = require("upnpserver");

var server = new Server({ /* configuration, see below */ }, [
  '/Users/lapwat/Music'
  // { path: '/home/myDisk' }
  // { path: '/media/movies', mountPoint: '/My movies'},
  // { path: '/media/albums', mountPoint: '/Personnal/My albums', type: 'music' }
]);

server.start();
