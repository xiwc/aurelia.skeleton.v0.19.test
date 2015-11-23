import {
    default as CodeMirror
}
from 'codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import '//cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch';
import 'codemirror/addon/merge/merge';

export class CodeMirror2 {

    panes = 3;
    highlight = true;
    connect = 'align';
    collapse = true;

    attached() {

        var value = `
export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([{
            route: ['welcome'],
            name: 'welcome',
            moduleId: 'welcome',
            nav: true,
            title: 'Welcome'
        }, {
            route: ['code-mirror'],
            name: 'code-mirror',
            moduleId: 'code-mirror',
            nav: true,
            title: 'CodeMirror'
        }, {
            route: ['parent/:id'],
            name: 'parent',
            moduleId: 'parent',
            nav: false,
            title: 'Parent',
            href: 'parent'
        }, {
            route: 'users',
            name: 'users',
            moduleId: 'users',
            nav: true,
            title: 'Github Users'
        }, {
            route: 'child-router',
            name: 'child-router',
            moduleId: 'child-router',
            nav: true,
            title: 'Child Router'
        }, {
            route: '',
            redirect: 'welcome1'
        }]);

        this.router = router;
    }
}`;

        var orig1 = `
export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([{
            route: ['welcome1'],
            name: 'welcome',
            moduleId: 'welcome',
            nav: true,
            title: 'Welcome'
        }, {
            route: ['code-mirror'],
            name: 'code-mirror',
            moduleId: 'code-mirror',
            nav: true,
            title: 'CodeMirror'
        }, {
            route: ['parent/:ids'],
            name: 'parent',
            moduleId: 'parent',
            nav: false,
            title: 'Parent',
            href: 'parent'
        }, {
            route: 'users',
            name: 'users',
            moduleId: 'users',
            nav: true,
            title: 'Github Users'
        }, {
            route: 'child-router',
            name: 'child-router',
            moduleId: 'child-router',
            nav: true,
            title: 'Child Router'
        }, {
            route: '',
            redirect: 'welcome'
        }]);

        this.router = router;
    }
}`;

        var orig2 = `
export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([{
            route: ['welcome'],
            name: 'welcome',
            moduleId: 'welcome',
            nav: true,
            title: 'Welcome'
        }, {
            route: ['code-mirror'],
            name: 'code-mirror',
            moduleId: 'code-mirror',
            nav: true,
            title: 'CodeMirror'
        }, {
            route: ['parent/:ids'],
            name: 'parent',
            moduleId: 'parent',
            nav: false,
            title: 'Parent',
            href: 'parent'
        }, {
            route: 'users',
            name: 'users',
            moduleId: 'users',
            nav: true,
            title: 'Github Users'
        }, {
            route: 'child-router',
            name: 'child-router',
            moduleId: 'child-router',
            nav: true,
            title: 'Child Router'
        }, {
            route: '',
            redirect: 'welcome'
        }]);

        this.router = router;
    }
}`;

        var target = document.getElementById("view");

        target.innerHTML = "";

        this.dv = CodeMirror.MergeView(target, {
            value: value,
            origLeft: this.panes == 3 ? orig1 : null,
            orig: orig2,
            lineNumbers: true,
            mode: "text/html",
            highlightDifferences: this.highlight,
            connect: this.connect,
            collapseIdentical: this.collapse
        });

    }

    mergeViewHeight(mergeView) {
        function editorHeight(editor) {
            if (!editor) return 0;
            return editor.getScrollInfo().height;
        }
        return Math.max(editorHeight(mergeView.leftOriginal()),
            editorHeight(mergeView.editor()),
            editorHeight(mergeView.rightOriginal()));
    }

    resize(mergeView) {
        var height = mergeViewHeight(mergeView);
        for (;;) {
            if (mergeView.leftOriginal())
                mergeView.leftOriginal().setSize(null, height);
            mergeView.editor().setSize(null, height);
            if (mergeView.rightOriginal())
                mergeView.rightOriginal().setSize(null, height);

            var newHeight = mergeViewHeight(mergeView);
            if (newHeight >= height) break;
            else height = newHeight;
        }
        mergeView.wrap.style.height = height + "px";
    }

}
