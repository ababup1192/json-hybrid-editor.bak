/// <reference path="../../typings/browser.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HybridEditor} from './hybridEditor.ts'

export default class VisualEditorApp extends React.Component<{ json: Object }, any>{

    render() {
        const json = this.props.json;
        if (typeof json === 'boolean') {
            return <ToggleButtonComponent key={ new Date().getDate() } checked={ json as boolean } />;
        } else if (typeof json === 'number') {
            return <NumberInputComponent key={ new Date().getDate() } value={ json as number } />;
        } else if (typeof json === 'string') {
            if (HybridEditor.getText() === "") {
                return null;
            } else {
                return <StringInputComponent key={ new Date().getDate() } value={ json as string } />;
            }
        } else if (json === null) {
            return <span className="btn btn-default">null</span>
        } else {
            return null;
        }
    }
};

interface StringInputProps extends React.Props<any> {
    value: string;
}

class StringInputComponent extends React.Component<StringInputProps, StringInputProps> {
    constructor() {
        super();
        this.state = { value: "abc" };
    }

    // State 前処理
    componentDidMount() {
        this.setState({ value: this.props.value });
    }

    // 後 Render処理
    componentWillReceiveProps(nextProps: StringInputProps) {
        this.setState({ value: nextProps.value });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        HybridEditor.writeTextEditor(JSON.stringify(e.target.value));
    }

    render() {
        const id = "text" + String(new Date().toTimeString());
        return <div className="input-group">
            <span className="glyphicon glyphicon-text-background input-group-addon" id={id} aria-hidden="true"></span>
            <input className='form-control' type='text' aria-describedby={id}
                value={ this.state.value } onChange={this.handleChange.bind(this) } />
        </div>;
    }
}

interface NumberInputProps extends React.Props<any> {
    value: number;
}

class NumberInputComponent extends React.Component<NumberInputProps, NumberInputProps> {
    constructor() {
        super();
        this.state = { value: 0 };
    }

    // State 前処理
    componentDidMount() {
        this.setState({ value: this.props.value });
    }

    // 後 Render処理
    componentWillReceiveProps(nextProps: NumberInputProps) {
        this.setState({ value: nextProps.value });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        HybridEditor.writeTextEditor(e.target.value);
    }

    render() {
        const id = "number" + String(new Date().toTimeString());
        return <div className="input-group">
            <span className="glyphicon glyphicon-sort-by-order input-group-addon" id={id} aria-hidden="true"></span>
            <input className='form-control' type='number' aria-describedby={id}
                value={ this.state.value } onChange={this.handleChange.bind(this) } />
        </div>;
    }
}

interface ToggleButtonProps extends React.Props<any> {
    checked: boolean;
}

class ToggleButtonComponent extends React.Component<ToggleButtonProps, ToggleButtonProps> {
    constructor() {
        super();
        this.state = { checked: false };
    }

    // State 前処理
    componentDidMount() {
        this.setState({ checked: this.props.checked });
    }

    // 後 Render処理
    componentWillReceiveProps(nextProps: ToggleButtonProps) {
        this.setState({ checked: nextProps.checked });
    }

    handleChange() {
        this.setState({ checked: !this.state.checked });
        HybridEditor.writeTextEditor(!this.state.checked);
    }

    render() {
        return <div>
            <input className='tgl tgl-skewed' type='checkbox'
                checked={ this.state.checked } />
            <label className='tgl-btn' data-tg-off='false' data-tg-on='true'
                onClick={ this.handleChange.bind(this) } />
        </div>;
    }
}