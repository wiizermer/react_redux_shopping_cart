import React from 'react'
import { Button, List, Row } from 'antd';
import { bindActionCreators } from "redux";
import * as defaultActions from "../actions";
import { connect } from 'react-redux';

class Cart extends React.Component {
    
    render() {
        const IconText = ({ type, text }) => (
            <span>
                {/* <Icon type={type} style={{ marginRight: 8 }} /> */}
                {text}
            </span>
        );
        return (
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={this.props.state.items}
                footer={
                    <div>
                        <h5>{'總個數：' + this.props.state.totalCount}</h5>
                        <h5>{'總金額：' + this.props.state.totalPrice}</h5>
                        <Row type="flex" justify="center">
                            <Button disabled={this.props.state.totalCount > 0 ? false : true} onClick={() => { this.props.actions.checkOut() }}>確認購買</Button>
                            <Button disabled={this.props.state.totalCount > 0 ? false : true} onClick={() => { this.props.actions.clearCart(this.props.state) }}>清空購物車</Button>
                        </Row>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText type="check-square" text={'個數：' + item.count + ' 個'} />,
                            <IconText type="dollar" text={'總額：' + item.subTotalPrice + '  NTD'} />,
                        ]}
                        extra={
                            <img
                                width={100}
                                height={100}
                                alt={item.name}
                                src={item.img}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={item.name}
                        />
                        <Button shape="circle" icon="plus" size="large" onClick={() => this.props.actions.addToCart(item.id)} />
                        <Button shape="circle" icon="minus" size="large" onClick={() => this.props.actions.removeFromCart(item.id)} />
                        <Button shape="circle" icon="close" size="large" onClick={() => this.props.actions.delFromCart(item.id)} />
                    </List.Item>

                )}
            />

        )
    }
}
const mapStateToProps = state => {
    return { state: state.cart }
}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(defaultActions, dispatch),
    dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);