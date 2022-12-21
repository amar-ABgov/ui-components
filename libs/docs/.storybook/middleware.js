require("../../../.storybook/middleware");
const path = require('path');

const passport = require('passport')
  , KeyCloackStrategy = require('./strategy');

const strategy = new KeyCloackStrategy({
  host: 'https://access.alberta.ca',
  authorizationURL: 'https://access.alberta.ca/auth/realms/4da91474-2790-4cb7-9b62-8544fbbcfcba/protocol/openid-connect/auth',
  tokenURL: 'https://access.alberta.ca/auth/realms/4da91474-2790-4cb7-9b62-8544fbbcfcba/protocol/openid-connect/token',
  userInfoURL: 'https://access.alberta.ca/auth/realms/4da91474-2790-4cb7-9b62-8544fbbcfcba/protocol/openid-connect/userinfo',
  clientID: 'localtest',
  clientSecret: 'YkmQl1v0q6ILti6eKO4qM6KlLwJ5Zpgd',
  callbackURL: 'http://localhost:4400/admin'
},
function (accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile)
  done();
});


passport.use('provider', strategy);

/**
 * Middleware injected into the backend express app
 * running the storybook.
 * Any changes to the file will require a restart of the server
 */
const expressMiddleWare = router => {
  router.use('/admin', (req, res) => {
    const reqPath = req.url;
    if(reqPath === "/") {
      res.sendFile('index.html', {
        root: path.join(__dirname, '../cms/admin')
      }, function (err) {
        if (err) {
          res.status(404)
          console.error('Error rendering CMS page');
        }
        res.end();
      });
    } else {
      res.sendFile(reqPath.slice(1), {
        root: path.join(__dirname, '../cms/admin')
      }, function (err) {
        if (err) {
          res.status(404)
          console.error(`Error rendering CMS page for ${reqPath}`);
        }
        res.end();
      });
    }


  });

  // Redirect the user to the OAuth 2.0 provider for authentication.  When
  // complete, the provider will redirect the user back to the application at
  //     /auth/provider/callback
  router.get('/auth/provider', passport.authenticate('provider'));

  // The OAuth 2.0 provider has redirected the user back to the application.
  // Finish the authentication process by attempting to obtain an access
  // token.  If authorization was granted, the user will be logged in.
  // Otherwise, authentication has failed.
  router.get('/auth/provider/callback',
    passport.authenticate('provider', {
      successRedirect: '/admin',
      failureRedirect: '/admin'
    }));

};


module.exports = expressMiddleWare;
