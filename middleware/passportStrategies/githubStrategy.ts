import { Request } from 'express';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
        passReqToCallback: true,
    },
    
    /* done*/
    async (
        req: Request, 
        accessToken: string, 
        refreshToken: string, 
        profile: any, 
        done: (err?: Error | null, profile?:any) => void
        ) => {}
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
