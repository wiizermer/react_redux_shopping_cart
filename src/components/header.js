import React from 'react';
import { Layout,  Row, Col } from 'antd';
import { Button } from 'antd';



const { Header } = Layout;

class Head extends React.Component {

    render() {
        return (
            <Header className="header container" theme="light" style={{ background: '#fff', borderBottom: '1px solid #e8e8e8', boxShadow: '0 2px -1px #e8e8e8' }}>
                <Row type="flex" justify="start">
                    <Col span={8} style={{ textAlign: "left", fontSize: '1rem' }}>
                        JFM
                    </Col>
                    <Col offset={5} span={11} >
                        <Row gutter={2} type="flex" justify='end'>
                            <Col span={8}>
                                <Button icon="user" shape="round">
                                    User
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button icon="shopping-cart" shape="round">
                                    Shopping Cart
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Header>
        )
    }

}


export default Head;