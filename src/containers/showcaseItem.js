import React from 'react'
import {Card,Icon} from 'antd'
import { bindActionCreators } from "redux";
import * as defaultActions from "../actions";
import { connect } from 'react-redux';

const { Meta } = Card;

class ShowcaseItem extends React.Component{
    render(){
        return(
            <Card 
                style={{ width: '100%' }}
                cover={
                    <img
                        alt={this.props.name}
                        src={this.props.img}
                    />
            }
            actions={[<Icon type="plus-circle" onClick={() => { this.props.actions.addToCart(this.props.id)}}/>]}>
                <Meta title={this.props.name} description={`庫存：`+this.props.inventory+' |  單價 :'+ this.props.price } />
            </Card>
        );
    }
} 
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(defaultActions, dispatch),
    dispatch
});
export default connect(null, mapDispatchToProps)(ShowcaseItem);