import * as React from "react";
import {HybridEditor} from "./hybridEditor.ts";

function traverse(element: any): JSX.Element {
    "use strict";
    if (Array.isArray(element)) {
        return <RootArrayComponent key={ new Date().getDate() }  array={ element as any[]}/>;
    } else if (typeof element === "object") {
        return <RootObjectComponent key={ new Date().getDate() } object={element as {}} />;
    } else {
        return innerTraverse(element);
    }
}

function innerTraverse(element: any, name: string = ""): JSX.Element {
    "use strict";
    if (typeof element === "number") {
        return <NumberInputComponent key={ new Date().getDate() + name } value={element} name={name}/>;
    } else if (typeof element === "string") {
        if (HybridEditor.getText() === "") {
            return null;
        } else {
            return <StringInputComponent key={ new Date().getDate() + name } value={ element as string } name={name} />;
        }
    } else if (typeof element === "boolean") {
        return <ToggleButtonComponent key={ new Date().getDate() + name } checked={ element as boolean } name={name} />;
    } else if (Array.isArray(element)) {
        return <ArrayComponent key={ new Date().getDate() + name }  array={ element as any[]} name={name}/>;
    } else if (typeof element === "object") {
        return <ObjectComponent key={ new Date().getDate() + name } object={element as {}} name={name} />;
    } else {
        return null;
    }
}

export default class VisualEditorApp extends React.Component<{ json: Object }, any> {
    public render(): JSX.Element {
        const json: Object = this.props.json;
        return traverse(json);
    }
};

interface IStringInputProps extends React.Props<any> {
    value: string;
    name: string;
}

class StringInputComponent extends React.Component<IStringInputProps, { value: string }> {
    constructor() {
        super();
        this.state = { value: "abc" };
    }

    // state 前処理
    public componentDidMount(): void {
        this.setState({ value: this.props.value });
    }

    // 後 Render処理
    public componentWillReceiveProps(nextProps: IStringInputProps): void {
        this.setState({ value: nextProps.value });
    }

    public handleChange(e: any): void {
        this.setState(e.target.value);
        HybridEditor.writeTextEditor(JSON.stringify(e.target.value));
    }

    public render(): JSX.Element {
        const id: string = "text" + String(new Date().toTimeString());
        return <div>
            { this.props.name !== "" ? <span className="tree-element tree-index">
                <i className="icon-leaf"></i> {this.props.name}: </span> : "" }
            <div className="input-group">
                <span className="glyphicon glyphicon-text-background input-group-addon" id={id} aria-hidden="true"></span>
                <input className="form-control" type="text" aria-describedby={id}
                    value={ this.state.value } onChange={this.handleChange.bind(this) } />
            </div>
        </div>;
    }
}

interface INumberInputProps extends React.Props<any> {
    value: number;
    name: string;
}

class NumberInputComponent extends React.Component<INumberInputProps, { value: number }> {
    constructor() {
        super();
        this.state = { value: 0 };
    }

    // state 前処理
    public componentDidMount(): void {
        this.setState({ value: this.props.value });
    }

    // 後 Render処理
    public componentWillReceiveProps(nextProps: INumberInputProps): void {
        this.setState({ value: nextProps.value });
    }

    public handleChange(e: any): void {
        this.setState(e.target.value);
        HybridEditor.writeTextEditor(e.target.value);
    }

    public render(): JSX.Element {
        const id: string = "number" + String(new Date().toTimeString());
        return <div>
            {this.props.name !== "" ? <span className="tree-element tree-index">
                <i className="icon-leaf"></i> {this.props.name}: </span> : ""}
            <div className="input-group">
                <span className="glyphicon glyphicon-sort-by-order input-group-addon" id={id} aria-hidden="true"></span>
                <input className="form-control" type="number" aria-describedby={id}
                    value={ this.state.value } onChange={this.handleChange.bind(this) } />
            </div>
        </div>;
    }
}

interface IToggleButtonProps extends React.Props<any> {
    checked: boolean;
    name: string;
}

class ToggleButtonComponent extends React.Component<IToggleButtonProps, { value: boolean }> {
    constructor() {
        super();
        this.state = { value: false };
    }

    // state 前処理
    public componentDidMount(): void {
        this.setState({ value: this.props.checked });
    }

    // 後 Render処理
    public componentWillReceiveProps(nextProps: IToggleButtonProps): void {
        this.setState({ value: nextProps.checked });
    }

    public handleChange(): void {
        this.setState({ value: !this.state.value });
        HybridEditor.writeTextEditor(!this.state.value);
    }

    public render(): JSX.Element {
        return <div>
            {this.props.name !== "" ? <span className="tree-element tree-index">
                <i className="icon-leaf"></i> {this.props.name}: </span> : ""}
            <div className="toggle-button">
                <input className="tgl tgl-skewed" type="checkbox"
                    checked={ this.state.value } />
                <label className="tgl-btn" data-tg-off="false" data-tg-on="true"
                    onClick={ this.handleChange.bind(this) } />
            </div>
        </div>;
    }
}

interface IRootArrayProps extends React.Props<any> {
    array: any[];
}

interface IArrayProps extends React.Props<any> {
    array: any[];
    name: string;
}

class RootArrayComponent extends React.Component<IRootArrayProps, any> {
    constructor() {
        super();
    }

    public render(): JSX.Element {
        return <div className="tree wall">
            <ul>
                <li>
                    <span className="tree-element"><i className="icon-folder-open-"></i> Array[]</span>
                    <ul>
                        {this.props.array.map((elm: any, idx: number) => {
                            return <li>
                                {innerTraverse(elm, idx.toString()) }
                            </li>;
                        }) }
                    </ul>
                </li>
            </ul>
        </div>;
    }
}

class ArrayComponent extends React.Component<IArrayProps, any> {
    constructor() {
        super();
    }

    public render(): JSX.Element {
        return <div className="array">
            <span className="tree-element"><i className="icon-minus-sign"></i>{this.props.name}: Array[]</span>
            <ul>
                {this.props.array.map((elm: any, idx: number) => {
                    return <li>
                        {innerTraverse(elm, idx.toString()) }
                    </li>;
                }) }
            </ul>
        </div>;
    }
}

interface IRootObjectProps extends React.Props<any> {
    object: {};
}

interface IObjectProps extends React.Props<any> {
    object: {};
    name: string;
}

class RootObjectComponent extends React.Component<IRootObjectProps, any> {
    constructor() {
        super();
    }

    public render(): JSX.Element {
        return <div className="tree wall">
            <ul>
                <li>
                    <span className="tree-element"><i className="icon-folder-open-"></i> Object{ }</span>
                    <ul>
                        {Object.keys(this.props.object as {}).map((key: string) => {
                            return <li>
                                {innerTraverse(this.props.object[key], key) }
                            </li>;
                        }) }
                    </ul>
                </li>
            </ul>
        </div>;
    }
}

class ObjectComponent extends React.Component<IObjectProps, any> {
    constructor() {
        super();
    }

    public render(): JSX.Element {
        return <div className="array">
            <span className="tree-element"><i className="icon-minus-sign"></i>{this.props.name}: Object{ }</span>
            <ul>
                {Object.keys(this.props.object as {}).map((key: string) => {
                    return <li>
                        {innerTraverse(this.props.object[key], key) }
                    </li>;
                }) }
            </ul>
        </div>;
    }
}
