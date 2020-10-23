import React from 'react';
import './App.css';


import M from 'materialize-css';

import Calculators from './Calculators';

export default class App extends React.Component{



    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }



    render(){

        return (
            <div style={
                    {
                        // paddingTop: '5%'
                    }
                }>

                <nav>
                    <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                </nav>

                <ul id="slide-out" className="sidenav">

                    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="subheader">Subheader</a></li>
                    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <Calculators/>

            </div>
        );
    }

}
