var moment = require('moment');

// Plex
//#################################
const PlexAPI = require("plex-api");
const client = new PlexAPI({
    hostname: "", // hostname where Plex Server runs
    port: 32400, // port number Plex Server is listening on (optional, default: 32400)
    https: true, // (optional, default: false)
    username: "", // plex.tv username (optional / required for PlexHome)
    password: "", // plex.tv password (optional / required for PlexHome)
    token: "", // plex.tv authentication token (optional)
    timeout: 6000, // timeout value in milliseconds to use when making requests (optional)
    options: {
        //override additional PlexHome options (optional, but recommended for PlexHome)
        identifier: "a35516f7-2d2e-42d2-b89d-4c2dfb5c5fb5", // A unique client identifier. Default is a generated uuid v4. Note: you should really provide this rather than let it get generated. Every time your app runs, a new "device" will get registered on your Plex account, which can lead to poor performance once hundreds or thousands of them get created. Trust me!
        product: "Node.js App", // The name of your application. Official Plex examples: Plex Web, Plex Home Theater, Plex for Xbox One. Default Node.js App
        version: "1.0", // The version of your app. Default 1.0
        deviceName: "Node.js", // The "name" of the device your app is running on. For apps like Plex Home Theater and mobile apps, it's the computer or phone's name chosen by the user. Default Node.js App
        platform: "Node.js", // The platform your app is running on. The use of this is inconsistent in the official Plex apps. It is not displayed on the web interface. Official Plex examples: Chrome, Plex Home Theater, Windows. Default is Node.js.
        platformVersion: "v8.11.3", // The platform version. Default is the version of Node running.
        device: "Windows" //The name of the type of computer your app is running on, usually the OS name. Official Plex examples: Windows, iPhone, Xbox One. Default is whatever os.platform() returns.
    }
});

// Plex Pin
//###############################
var PlexPin = require('plex-pin');
var fakeHeaders = {
  'X-Plex-Product': 'Plex+Web',
  'X-Plex-Version': '2.3.21',
  'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
  'X-Plex-Platform': 'Chrome',
  'X-Plex-Platform-Version': '41.0',
  'X-Plex-Device': 'Linux',
  'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
  'Accept-Language': 'en'
};

// Sonos
//##################################################
var sonos = require('node-sonos');
var Sonos = new sonos.Sonos('192.168.2.124', 1400);

// API Server
//##############################
var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.status(200).send("<h1>Welcome to our restful API!<br><span style='font-size: 16px; color: #555;'>" + moment().format('dddd, MMMM  Do[,] YYYY h:mm:ss a') + "</span></h1><hr>" +
        "<h3>Plex</h3>" +
        "<a href='/plex/plexinfo'>Plex Info</a><br>" +
        "<a href='/plex//getpin'>Get Plex Pin</a><br>" +
        "<h3>Sonos</h3>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/currentTrack'>currentTrack</a><br>" +
        "<a href='/sonos/deviceDescription'>deviceDescription</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>" +
        "<a href='/sonos/sonosinfo'>Sonos Info</a><br>");
    });

    
    // Plex
    //########################################
    app.get("/plex/plexinfo", function (req, res) {
        res.status(200).send(client);
    });
    
    var now;
    app.get("/plex/getpin", function (req, res) {
        // Request Pin
        var plexPin = new PlexPin(fakeHeaders);
        var requestId = '0000000000';
        plexPin.requestPin().then(function (result) {
            // PIN expires in 5 minutes
            plexPin.setExpireTime(result);
            plexPin.setPin(result);
            plexPin.setRequestId(result);
            now = moment();

            console.log('Code: %s', plexPin.getPin());
            console.log('Request Id: %s', plexPin.getRequestId());
            console.log('Expiration Time: %s', plexPin.getExpireTime());

            var data = ({
                pin: plexPin.getPin(),
                request_id: plexPin.getRequestId(),
                expire_time: plexPin.getExpireTime(),
                login: "https://plex.tv/link",
                confirm: "http://localhost:3000/checkpin/" + plexPin.getRequestId(),
            });
            res.status(200).send(data);
        }).catch(function (error) {
            console.error('Error requesting PIN: ' + error);
        });

    
        app.get("/checkpin/:id", function (req, res) {
            // Realtime applications put the following into an interval && end interval within 5 minutes.
            // Check Authorization of PIN
            now = moment();
            var requestId = req.params.id; 

            if (isFinite(requestId)) {
                plexPin.checkPin(requestId).then(function (result) {
                    // Looks for auth_token via regex & sets it
                    plexPin.setAuthToken(result);
                    // If token was not attached to PlexPin then one was not found
                    if (!plexPin.getAuthToken()) {
                        console.log('You are not authorized');
                        var data = ({
                            message: 'You are not authorized'
                        });
                        res.status(401).send(data);
                    } else {
                        // Notify user they are authorized
                        console.log('You are authorized!', '\n You can access the token via plexPin.getAuthToken()');
                        console.log('Token: %s', plexPin.getAuthToken());
                        var data = ({
                            message: 'You are authorized!',
                            token: plexPin.getAuthToken()
                        });
                        res.status(200).send(data);
                    }
                }).catch(function (error) {
                    console.error('Error Checking PIN: ' + error.statusCode);
                    if (error.statusCode === 404) {
                        console.log('Your pin has expired');
                    };
                    res.status(error.statusCode).send(error);
                });
            } else {
                console.log('Your pin expired.');
                var data = ({
                    message: 'Your pin expired.'
                });
                res.status(401).send(data);
            };
        });
        
    });

    // Sonos
    // #############################################
    app.get("/sonos/sonosinfo", function (req, res) {
        res.status(200).send(Sonos);
    });

    app.get("/sonos/currentTrack", function (req, res) {
        Sonos.currentTrack(function (err, result) {
            if(err) {
                res.status(500).send(JSON.stringify(err, null, 4));
            } else {
                res.status(200).send(JSON.stringify(result, null, 4));
            }       
        });
    }); //currentTrack()
    
    app.get("/sonos/deviceDescription", function (req, res) {
        Sonos.deviceDescription(function (err, result) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }       
        })
    }); //deviceDescription()
    
    app.get("/sonos/flush", function (req, res) {
        Sonos.flush().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //flush()
    
    app.get("/sonos/getCurrentState", function (req, res) {
        Sonos.getCurrentState().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getCurrentState()
    
    app.get("/sonos/getLEDState", function (req, res) {
        Sonos.getLEDState().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getLEDState()
    
    app.get("/sonos/getMusicLibrary", function (req, res) {
        console.log(req.body); // your JSON
        var json = req.body;
        var search = json.search;
        var options = json.options;
        Sonos.getMusicLibrary(search, options).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          });
    }); //getMusicLibrary(search, options)
    
    app.get("/sonos/getMuted", function (req, res) {
        Sonos.getMuted().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getMuted()
    
    app.get("/sonos/getAllGroups", function (req, res) {
        Sonos.getAllGroups().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getTopology() Doesn 't work if you upgraded to Sonos v9.1. Check-out getAllGroups() for some replacement.
    
    app.get("/sonos/getVolume", function (req, res) {
        Sonos.getVolume().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getVolume()
    
    app.get("/sonos/getZoneAttrs", function (req, res) {
        Sonos.getZoneAttrs().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getZoneAttrs()
    
    app.get("/sonos/getZoneInfo", function (req, res) {
        Sonos.getZoneInfo().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getZoneInfo()
    
    app.get("/sonos/getQueue", function (req, res) {
        Sonos.getQueue().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getQueue()
    
    app.get("/sonos/next", function (req, res) {
        Sonos.next().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //next()
    
    app.get("/sonos/parseDIDL/:didl", function (req, res) {
        var didl = req.body.didl;
        Sonos.parseDIDL(didl).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //parseDIDL(didl)
    
    app.get("/sonos/pause", function (req, res) {
        Sonos.pause().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //pause()
    
    app.get("/sonos/play/:uri", function (req, res) {
        var uri = req.body.uri;
        Sonos.play(uri).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //play(uri)
    
    app.get("/sonos/togglePlayback", function (req, res) {
        Sonos.togglePlayback().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //togglePlayback()
    
    app.get("/sonos/previous", function (req, res) {
        Sonos.previous().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //previous()
    
    app.get("/sonos/queue/:uri/:positionInQueue", function (req, res) {
        var uri = req.body.uri;
        var positionInQueue = req.body.positionInQueue;
        Sonos.queue(uri, positionInQueue).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //queue(uri, positionInQueue)
    
    app.get("/sonos/queueNext/:uri", function (req, res) {
        var uri = req.body.uri;
        Sonos.queueNext(uri).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //queueNext(uri)
    
    app.get("/sonos/request/:endpoint/:action/:body/:responseTag", function (req, res) {
        var endpoint = req.body.endpoint;
        var action = req.body.action;
        var body = req.body.body;
        var responseTag = req.body.responseTag;
        Sonos.request(endpoint, action, body, responseTag).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //request(endpoint, action, body, responseTag)
    
    app.get("/sonos/seek/:seconds", function (req, res) {
        var seconds = req.body.seconds;
        Sonos.seek(seconds).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //seek(seconds)
    
    app.get("/sonos/setLEDState/:state", function (req, res) {
        var desiredState = req.body.state;
        Sonos.setLEDState(desiredState).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //setLEDState(desiredState)
    
    app.get("/sonos/setMuted/:bool", function (req, res) {
        var mutes = req.body.muted;
        Sonos.setMuted(muted).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //setMuted(muted)
    
    app.get("/sonos/setName/:name", function (req, res) {
        var name = req.body.name;
        Sonos.setName(name).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //setName(name)
    
    app.get("/sonos/getPlayMode", function (req, res) {
        Sonos.getPlayMode().then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //getPlayMode()
    
    app.get("/sonos/setPlayMode/:mode", function (req, res) {
        var mode = req.body.mode;
        Sonos.setPlayMode(mode).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //setPlayMode(mode)
    
    app.get("/sonos/setVolume/:volume", function (req, res) {
        var volume = req.body.volume;
        Sonos.setVolume(volume).then(result => {
            res.status(200).send(result);
          }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
          })
    }); //setVolume(volume)
    
    app.get("/sonos/stop", function (req, res) {
        Sonos.stop().then(result => {
            res.status(200).send(result);
        }).catch(err => {
            console.log('Error fetch queue %j', err);
            res.status(500).send(err);
        })
    });//stop()
    
};

module.exports = appRouter;
