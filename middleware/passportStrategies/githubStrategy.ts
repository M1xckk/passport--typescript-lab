import { Request } from 'express';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { createNewUser } from '../../controllers/userController';

require('dotenv').config()

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_ID ? process.env.GITHUB_ID : "",
        clientSecret: process.env.GITHUB_SECRET? process.env.GITHUB_SECRET : "",
        callbackURL: "http://localhost:800/auth/login/github/callback",
        passReqToCallback: true
    },

    /* done */
   
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
        const user = createNewUser(Number(profile.id), profile.displayName)
        console.log("PROFILE: ", user); 
        done(null, user);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};
export default passportGitHubStrategy;