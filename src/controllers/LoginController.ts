import { Request, Response } from 'express';
import { get, controller, post, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    console.log('hi');
    res.send(`
        <form method="POST">
        <div><label>Email</label><input name="email"/></div>
        <div><label>Password</label><input name="password"/></div>
        <button>Submit</button>
        </form>
        `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.status(422).send('Invalid eail or password');
    }
  }
  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}