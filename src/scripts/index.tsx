/// <reference path="../../typings/browser.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Bacon from 'baconjs'

import {Editor} from './editor.tsx'

interface Variable {
    selectorName: string;
    selector: JQuery;

}

abstract class VariableCreator {
    protected static count: number = 0;

    abstract create(): Variable;

    protected setSelector(variable: Variable): void {
        variable.selectorName = this.createNextName();
        variable.selector = $(variable.selectorName);
    }

    private createNextName(): string {
        return '#var-' + VariableCreator.count++;
    }
}

class BoolTypeCreator extends VariableCreator {
    create(): Variable {
        let varible = new BoolType();
        this.setSelector(varible);
        ReactDOM.render(React.createElement('div', { id: varible.selectorName }, "hello"),
            document.getElementById("content")
        );
        // console.log(React.DOM.div(null, { id: varible.selectorName }));
        // .var-box#var1
        // input#bool-var(type='checkbox' checked data-toggle='toggle' data-size='small'
        // data-on='true' data-off='false')

        return varible;
    }
}

class BoolType implements Variable {
    selectorName: string;
    selector: JQuery;


}

module Main {
    export function main() {
        $(() => {
            let editor = new Editor();
            let boolVar = new BoolTypeCreator().create();
            /*
            let boolVar = $('#bool-var');
            let stringVar = $('#string-var');
    
            boolVar.prop('disabled', true);
            stringVar.prop('disabled', true);
    
            editor.setValue(`true\n""`);
    
            let nonSelected = () => {
                stringVar.prop('disabled', true);
                boolVar.prop('disabled', true);
                $('.var-box').css('border', '');
            };
    
            Bacon.fromEvent($('.visual-editor'), 'click')
                .filter(() => $('.var-box:hover').length == 0).onValue(() => nonSelected());
    
            // bool value
            let var1Click = Bacon.fromEvent($('.var-box#var1'), 'click');
            let var2Click = Bacon.fromEvent($('.var-box#var2'), 'click');
            let boxClickHandler = (e: any) => { nonSelected(); e.currentTarget.style.border = "1px solid grey"; };
    
            var1Click.onValue(boxClickHandler);
            var2Click.onValue(boxClickHandler);
    
            var1Click.bufferWithTime(250).map((xs) => xs.length)
                .filter((n) => n === 2).onValue(() => {
                    boolVar.prop('disabled', false);
                    boolVar.prop('checked', !boolVar.prop('checked')).change();
                });
    
            var2Click.bufferWithTime(250).map((xs) => xs.length)
                .filter((n) => n === 2).onValue(() => {
                    stringVar.prop('disabled', false);
                    stringVar.focus();
                });
    
            let checked = Bacon.fromEvent(boolVar, 'change').map((e: any) => e.target.checked);
    
            checked.onValue((v) => {
                editor.setValue(v.toString());
                editor.selectedValue();
            });
    
            // editor event
            let checkedText = Bacon.fromEvent($('#editor'), 'keyup')
                .map(() => editor.getValue()).filter((v) => /^(true|false)$/.test(v))
                .map((v) => JSON.parse(v)).filter((v) => v != boolVar.prop('checked'));
    
            checkedText.onValue((v) => {
                $('.var-box').css('border', "1px solid grey");
                boolVar.prop('disabled', false);
                boolVar.prop('checked', v).change();
            });
            */
        });
    }
}

Main.main();