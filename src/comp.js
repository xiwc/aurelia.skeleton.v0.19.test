import {
    bindable
}
from 'aurelia-framework';

export class Comp {

    @
    bindable
    parent = null;

    created(view) {
        console.log(view);
    }

    bind(bindingContext) {
        console.log(bindingContext);
    }

    attached() {
        console.log('comp attached');
    }
}
