import React from 'react'
import {Row, Col} from 'antd'
import Item from './showcaseItem'
import { connect } from 'react-redux';

class Showcase extends React.Component {
    render(){
       return (
        <Row type="flex" justify="start">
           {this.props.state.map((item,index)=>{
               return (
                <Col span={6} key={index}>
                   <Item id={item.id} name={item.name} img={item.img} inventory={item.inventory} price={item.price}>
                    </Item>
                </Col>
               )
           })}
        </Row>
       )
    }
}
const mapStateToProps = state => {
    return {state:state.showcase}
}
export default connect(mapStateToProps)(Showcase);