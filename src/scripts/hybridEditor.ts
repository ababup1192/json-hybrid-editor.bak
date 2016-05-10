import * as Bacon from 'baconjs'

import Dispatcher from './dispatcher.ts'
import TextEditor from './textEditor.ts'

export namespace HybridEditor {
    const d = new Dispatcher();
    let textEditor: TextEditor

    export function init(editor: TextEditor) {
        textEditor = editor;
    }

    export function writeTextEditor(json: any) {
        textEditor.setValue(String(json));
    }

    export function getText(): string {
        return textEditor.getValue();
    }
}
