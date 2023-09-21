## Informations I wish to remember

As the front end is now working, I am adding an authentification with oauth.
updating back end: changing for an https server, adding a certificate and key using openssl. The certificate and key work together to establish a secure and encrypted connection between your server and clients.
fs is required to read those two files

Without these components, a server would use regular HTTP, which means data could be intercepted and read by anyone. By using certificates and keys, you create a secure and trusted environment for communication over the internet.

Helmet: contains middelwares, helping to protect again security issues

google Cloud platform (google api console) to obtain oauth 2.0 client credentials. (client app can then request token from google authentification server, extracts token from the response, send token to google api that you want to access)

passport: authentication middleware for node. (expose a common approach to doing authentication regardless of which provider(facebook, twitter, google..etc))

client ID & client secret in our google console: connect node app with google, so google recognise it is our app requesting users to log in.
