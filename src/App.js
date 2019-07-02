import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from "./components/header"
import {Layout} from 'antd'
import Showcase from "./containers/showcase"
import Cart from './containers/cart'

const {Content,Sider} = Layout

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Layout className="container" theme="light" style={{padding:'0'}}>
          <Content style={{width:'50%'}}>
            <Showcase></Showcase>
          </Content>
          <Sider theme="light" width={'30%'} >
            <Cart/>
          </Sider>
        </Layout>
      </div>
    );
  }

}

export default App;
