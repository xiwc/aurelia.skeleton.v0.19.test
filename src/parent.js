import {
    activationStrategy
}
from 'aurelia-router';

export class Parent {

    // determineActivationStrategy() {
    //     return activationStrategy.replace;
    // }

    configureRouter(config, router) {
        config.map([{
            route: ['welcome'],
            name: 'welcome',
            moduleId: 'welcome',
            nav: true,
            title: 'Welcome'
        }, {
            route: 'users',
            name: 'users',
            moduleId: 'users',
            nav: true,
            title: 'Github Users'
        }, {
            route: '',
            redirect: 'welcome'
        }]);

        this.router = router;
    }
}
