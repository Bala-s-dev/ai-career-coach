// server/config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user's MongoDB ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach the full user object to req.user
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback', // Must match Google Console
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // This function is called after the user authenticates with Google
      try {
        let existingUser = await User.findOne({
          authProviderId: profile.id,
          provider: 'google',
        });

        if (existingUser) {
          // We already have a record with the given profile ID
          return done(null, existingUser);
        }

        // If it's a new user, create a new user record
        const newUser = new User({
          authProviderId: profile.id,
          provider: 'google',
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
