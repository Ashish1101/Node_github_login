const passport = require('passport')
const GitHubStrategy = require('passport-github2')
const keys = require('./keys')
const User = require('../model/user-model')


/*
serializing user to find id of that
 user in our database to generate a 
 cookie for that user
*/
passport.serializeUser((user, done) =>{
    done(null, user.id)
})

/* Deserializing user to decode that
 id and use user information to not 
 further login if it is already login
*/

passport.deserializeUser(async (id, done) =>{
    const user = await User.findOne({id:id})
    done(null, user)
})


passport.use(new GitHubStrategy({
    clientID: keys.Github.clientID,
    clientSecret: keys.Github.clientSecret,
    callbackURL: '/auth/github/redirect'
},  async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ githubId: profile._json.id })
        try {
            if (!currentUser) {
                const user = new User({
                    username: profile._json.login,
                    githubId: profile._json.id,
                    thumbnail: profile._json.avatar_url,
                    followers: profile._json.followers,
                    following: profile._json.following,
                    repo: profile._json.public_repos

                })

                await user.save()
                console.log('user is created' + user)
                done(null, user)

            } else {
                console.log('user already exists' + currentUser);
                done(null, currentUser)
            }
        } catch (err) {
               console.log(err)
        }

    }

));
