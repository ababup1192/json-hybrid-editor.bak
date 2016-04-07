/// <reference path="../../typings/browser.d.ts" />

export class Editor {
    private editor: AceAjax.Editor;

    constructor() {
        this.editor = ace.edit("editor");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/javascript");
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
