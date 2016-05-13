/// <reference path="../../typings/browser.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Bacon from 'baconjs'

import VisualEditorApp from './visualEditorApp.tsx'
import {HybridEditor} from './hybridEditor.ts'
import TextEditor from './textEditor.ts'
import {JsonTree} from './jsonTree.ts'

module Main {
    export function main() {
        $(() => {
            const textEditor = new TextEditor();
            HybridEditor.init(textEditor);
            const textP = textEditor.toProperty();

            const appState = Bacon.combineTemplate({
                json: textP
            });

            appState.onValue((state: { json: Object }) => {
                console.log(state);
                
                ReactDOM.render(<VisualEditorApp {...state}/>, document.getElementById('visual-editor'));

                JsonTree.view();
            });

        });
    }
}

Main.main();