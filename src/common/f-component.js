import React from "react";

export class FComponent extends React.Component {
    onUnmounts = [];
    onChangeds = [];
    onMounts = [];
    mounted = false;

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.mounted = true;
        this.onMounts.forEach((l) => l());
    }

    componentWillUnmount() {
        this.mounted = false;
        this.onUnmounts.forEach((l) => l());
    }

    componentDidUpdate(prevProps) {
        this.onChangeds.forEach((l) => l(prevProps));
    }

    setState(newState, cb) {
        if (this.mounted) {
            super.setState(newState, cb);
        } else {
            this.state = Object.assign(this.state, newState);
            cb && cb();
        }
    }

    forceUpdate() {
        if (this.mounted) {
            super.forceUpdate();
        }
    }

    onMount(f) {
        this.onMounts.push(f);
    }

    onUnmount(f) {
        this.onUnmounts.push(f);
    }

    onChanged(f) {
        this.onChangeds.push(f);
    }

}