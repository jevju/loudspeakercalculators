import React from 'react';

import ContourNetwork from './ContourNetwork';
import Butterworth from './Butterworth';

export default class Calculators extends React.Component{
    constructor(){
        super();

        this.calculators = [

            {name: 'Filter Design', items: [
                {
                    id: 'butterworth',
                    name: 'Butterworth'
                },
                {
                    id: 'contour',
                    name: 'Contour Network'
                },
            ]},
            {name: 'Thiele/ Small', items: [
                {
                    id: 'test',
                    name: 'test'
                },
                {
                    id: 'test',
                    name: 'test'
                },
            ]},
            {name: 'Enclosure', items: [
                {
                    id: 'test',
                    name: 'test'
                },
                {
                    id: 'test',
                    name: 'test'
                },
            ]},
        ];


        this.state={
            active: 'butterworth'
        };

        this.setActiveCalculator = this.setActiveCalculator.bind(this);
    }

    setActiveCalculator(c){
        this.setState({active:c});
    }


    renderSidenav(){
        var subHeaderStyle = {};
        subHeaderStyle['color'] = 'rgba(0, 0, 0, 0.54)';
        subHeaderStyle['cursor'] = null;

        var items = [];

        var k = 0;

        for(var i = 0; i < this.calculators.length; i++){
            k += 1;
            items.push(<div key={k} className="divider"></div>);
            k += 1;
            const groupName = this.calculators[i].name;
            items.push(<div key={k} className="list-item sub-header">{groupName}</div>)
            for(var j = 0; j < this.calculators[i].items.length; j++){
                k += 1;
                const id = this.calculators[i].items[j].id;
                const name = this.calculators[i].items[j].name;

                const className = (id === this.state.active) ? "list-item active": "list-item";
                console.log(className);
                items.push(
                    <div key={k}className={className} onClick={()=>this.setActiveCalculator(id)}>{name}</div>
                );
            }
        }



        return (
            <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '100%',
                    left: '0',
                    margin: '0',
                    paddingTop: '20px'
                }}>

                {items}

            </div>
        )
    }

    renderCalculator(){

        var calculator = null;

        switch (this.state.active) {
            case 'butterworth':
                calculator = <Butterworth/>;
                break;

            case 'contour':
                calculator = <ContourNetwork/>;
                break;



        }

        return (
            <div style={{
                    marginLeft: '240px',
                    paddingTop: '20px'
                }}>
                {calculator}
            </div>
        )
    }



    render(){
        return (
            <div>
                {this.renderSidenav()}
                {this.renderCalculator()}

            </div>
        )
    }


}
