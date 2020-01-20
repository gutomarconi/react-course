import React, {Component} from 'react';

import Auxiliar from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerStateHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Auxiliar>
                <Toolbar sideDrawerToggled={this.sideDrawerStateHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerStateHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliar>
        )
    }
}

export default Layout;
