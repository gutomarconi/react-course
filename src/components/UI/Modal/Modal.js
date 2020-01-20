import React, {Component} from 'react';
import classes from './Modal.css';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import Backdrop from './../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children);
    }

    //Debug log
    componentWillUpdate(nextProps, nextState, nextContext) {
        //console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <Auxiliar>
                <Backdrop show={this.props.showModal} clicked={this.props.closeModal}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showModal ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliar>

        )
    }
};

export default Modal;
