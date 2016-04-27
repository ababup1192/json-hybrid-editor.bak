/// <reference path="../../typings/browser.d.ts" />

import Dispatcher from './dispatcher.ts'
import * as Bacon from 'baconjs'

const d = new Dispatcher();

export default class TextEditor {
    private editor: AceAjax.Editor;

    constructor() {
        this.editor = ace.edit("text-editor");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/javascript");

        Bacon.fromEvent($('#text-editor'), 'keyup').debounce(300)
            .map(() => this.getValue())
            .flatMap((text: string) => { try { return text == '' ? '' : JSON.parse(text) } catch (e) { return new Bacon.Error('parse error') } })
            .onValue((json) => d.stream('json').push(json)
            );
    }

    toProperty() {
        return d.stream('json').scan('', (_, newJson) => newJson);
    }

    setValue(text: string): void {
        this.editor.getSession().setValue(text);
    }

    getValue(): string {
        return this.editor.getSession().getValue();
    }

    selectedValue(): void {
        var selection = this.editor.getSelection();
        var range = selection.getRange();
        range.setStart(0, 0);
        range.setEnd(0, 100);
        this.editor.getSelection().setRange(range, false);
    }
}
