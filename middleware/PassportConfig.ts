import passport from 'passport';

import { PassportStrategy } from '../interfaces';

export default class PassportConfig {
    /*
      have done
    */
   constructor(strategies: PassportStrategy[]) {
this.addStrategies(strategies);
}
    addStrategies(strategies: PassportStrategy[]): void {
        strategies.forEach((passportStrategy: PassportStrategy) => {
            passport.use(passportStrategy.name, passportStrategy.strategy);
        });
    }
}
