// DEPENDENCIES
// Require the needed npm packages
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token
// from each of the requests sent by clients
const { Strategy, ExtractJwt } = require('passport-jwt')

// User model import, accessed by JWT verify function
const {User} = require('../models/User')

// CONFIGURATION


// Create a secret to be used to encrypt/decrypt the token
// This can be any string value you want -- even gibberish.

const secret = process.env.JWT_SECRET || 'project3pleasework'

// Minimum required options for passport-jwt

const opts = {
		
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		
    secretOrKey: secret
}


// AUTHENTICATION FUNCTIONALITY


const verify = async (jwt_payload, done) => {
		// In the callback we run our custom code. With the data extracted from
	  // the token that we're passed as jwt_payload we'll have the user's id.
	  // Using Mongoose's `.findById()` method, we find the user in our database
    try {
				
        const home = await User.findById(jwt_payload.id)
        return done(null, home)
    }catch(err){
				// If there was an error, we pass it to done so it is eventually handled
		    // by error handlers in Express
       return done(err)
    }

}



const strategy = new Strategy(opts,verify)

// Now that we've constructed the strategy, we 'register' it so that
// passport uses it when we call the `passport.authenticate()`
// method later in our routes
passport.use(strategy)

// Initialize the passport middleware based on the above configuration
passport.initialize()

// Create a variable that holds the authenticate method so we can
// export it for use in our routes
const requireToken = passport.authenticate('jwt', {session: false})

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, home) => {
	  
		if(
			!home ||
			!req.body.password ||
			!bcrypt.compareSync(req.body.password, home.password)
			){
	        const error = new Error("The provided username or password is incorrect")
	        error.statusCode = 422
	        throw error
    }

		// If no error was thrown, we create the token from user's id and
	  // return the token
    return jwt.sign({id: home._id},secret,{expiresIn: 36000 })
}
const handleValidateOwnership = (req, document) => {
    const ownerId = document.owner._id || document.owner;
    
      // Check if the current user is also the owner of the document
    
      if (!req.home._id.equals(ownerId)) {
      throw Error("Unauthorized Access");
    } else {
      return document;
    }
  };
  
  

module.exports = {
    requireToken,
    createUserToken,
    handleValidateOwnership
}