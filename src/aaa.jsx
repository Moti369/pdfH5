
import React from 'react';
import { observer } from 'mobx-react';
import { observable, action, toJS } from 'mobx';
 
let store = new class {
    constructor() {
        console.log(this.arys, this.opt.arys, this.arys === this.opt.arys);
    }
 
    // @observable arys = [1, 2, 3];
 
    // @observable opt = {
    //     arys: this.arys
    // };
    arys = [1, 2, 3];
    opt = {
            arys: this.arys
        };

    @action
    click1 = () => {
        this.arys[0] = 100;
        console.log(this.arys, this.opt.arys, this.arys === this.opt.arys);
    };
 
    @action
    click2 = () => {
        this.arys = [4, 5, 6];
        console.log(this.arys, this.opt.arys, this.arys === this.opt.arys);
    };
 
    @action
    click3 = () => {
        this.arys.replace([4, 5, 6]);
        console.log(this.arys, this.opt.arys, this.arys === this.opt.arys);
    };
}();
@observer
export default class Main extends React.PureComponent {
    render() {
        console.log('main render');
        let arys = typeof store.opt.arys === 'function' ? store.opt.arys() : store.opt.arys;
        return (
            <div>
                <button onClick={store.click1}>click1</button>
                <button onClick={store.click2}>click2</button>
                <button onClick={store.click3}>click3</button>
                <Child arys={arys} />
            </div>
        );
    }
}
@observer
class Child extends React.PureComponent {
    render() {
        console.log('child render');
        return <div>{toJS(this.props.arys).join(' , ')}</div>;
    }
}