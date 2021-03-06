import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([      
      { route: ['', 'users'], name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }
    ]);

    this.router = router;
  }
}
