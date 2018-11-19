import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
//import AA from './aaa.jsx'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
},
{
  title: 'eact',
  url: 'https://facebook.github.io/',
  author: 'J',
  num_comments: 3,
  points: 4,
  objectID: 1,
},
{
  title: 'eact',
  url: 'https://facebook.github.io/',
  author: 'Ja',
  num_comments: 3,
  points: 4,
  objectID: 2,
},
];
class App extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      list:list,  //这里缩写成list
    };
    //重要，为什么绑定，因为类方法不会绑定到this实例上
    this.onDismiss = this.onDismiss.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId); //filter返回为真值的所有元素true ,保留在列表，否则从列表过滤
    this.setState({ list: updatedList });//设置新的列表
  
  }
  onAdd(){
    //ref获取真实的dom节点，设置ref属性，然后this.refs.[refName]返回真实节点值
    let newItem = this.refs.input.value;  
    console.log(newItem);
    this.refs.input.value=null;
    //原写法是this.state.list
    let {list} = this.state; 
    let objectID = list[list.length-1].objectID+1;
    // this.state.list.push(newItem)
    list.push({
      title: newItem,
      url: 'https://facebook.github.io/react/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: objectID,
    })
// this.setState({list:this.state.list })　
    this.setState({
      list
    })　
    
    //输入框的值
     //this.setState({list:event.target.value});

  }
  render() {
    return (
      <div className="App">
        <form>
        <input type = "text" ref="input"  />
        <button type="button" onClick={this.onAdd}>添加</button>
        </form> 
        
        { this.state.list.map(iterm =>
        <div key={iterm.objectID}>
            <span>
            <a href={iterm.url}>{iterm.title}</a>
            </span>
            <span>{iterm.author}</span>
            <span>{iterm.num_comments}</span>
            <span>{iterm.points}</span>
            <span>
                <button 
                //传给事件处理器的必须是函数
                onClick = {()=>this.onDismiss(iterm.objectID)}
                type = "button"
                >
                Dismiss
                </button>
            </span>
        </div>
        
        )  
       }
      </div>
    );
  }
}

export default App;
