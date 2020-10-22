

import React from 'react';

// Source:
// https://www.diyaudioandvideo.com/Calculator/ContourNetwork/
// https://www.diyaudioandvideo.com/Calculator/ContourNetwork/Help/

export default class CountourNetwork extends React.Component{

    constructor(){
        super();

        this.fields=[
            {
                'name': 'f',
                'unit': 'Hz',
                'description': 'Frequency where signal begins to rise'
            },
            {
                'name': 'fm',
                'unit': 'Hz',
                'description': 'Frequency at maximum attenuation'
            },
            {
                'name': 'At',
                'unit': 'db',
                'description': 'Maximum attenuation at fm'
            },
            {
                'name': 'Rd',
                'unit': 'Ohms',
                'description': 'Total driver impedance'
            }
        ]

        this.state={
            values: {},
            result: {},
            network: 'rc',
        };

        this.onCalcSelect = this.onCalcSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resultCalculated(){

        if(!this.state.result){
            return false;
        }

        if(!('c' in this.state.result)){
            return false;
        }
        if(!('r' in this.state.result)){
            return false;
        }

        if((this.state.result['c'].length < 1) || (this.state.result['r'].length < 1)){
            return false;
        }

        return true;
    }

    fieldsFilledOut(){
        for(var i = 0; i < this.fields.length; i++){
            const f = this.fields[i].name;
            if(!(f in this.state.values)){
                return false;

            // Field is not empty and field is a number
            } else if((this.state.values[f].length < 1) || !this.state.values[f].match(/^[0-9]+$/)){
                return false;
            }
        }
        return true;
    }

    calculate(){
        var res = this.state.result;
        const k = 15916;

        const c = (k/ this.state.values['f']);
        console.log('c = ', c);

        const x = (1/(2 * Math.PI * this.state.values['fm'] * c)) * 100000;
        console.log('x = ', x);

        const z = (this.state.values['Rd'] * (Math.pow(10, (this.state.values['At']/20)))) - this.state.values['Rd'];
        console.log('z = ', z);

        const r = Math.sqrt(Math.pow(x, 2)/ ((Math.pow(x, 2)/ Math.pow(z, 2)) - 1));
        console.log('r = ', r);


        res['c'] = c;
        res['x'] = x;
        res['z'] = z;
        res['r'] = r;

        this.setState({result: res});
    }

    onCalcSelect(c){
        this.setState({network:c});
    }

    handleChange(e){
        var values = this.state.values;
        values[e.target.name] = e.target.value;
        this.setState({values:values});
    }

    handleSubmit(e){
        e.preventDefault();

        if(this.fieldsFilledOut()){
            this.calculate()
        }
    }


    renderForm(){

        var fields = [];

        for(var i = 0; i < this.fields.length; i++){
            const k = i;

            const f = (
                <label key={k}>
                    {this.fields[k].description} ({this.fields[k].name})
                    <input name={this.fields[k].name} onChange={(e) => this.handleChange(e)}>
                    </input>
                </label>
                );

            fields.push(f);
        }

        var btnClassName = null;
        if(this.fieldsFilledOut()){
            btnClassName = "btn btn-primary";
        } else{
            btnClassName = "btn btn-primary disabled"
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {fields}
                    <button type="submit" className={btnClassName}>
                        <i className="material-icons">speaker</i>
                        Calculate
                    </button>

                </form>
            </div>
        )

    }

    renderResult(){


        if(!this.resultCalculated()){
            return;
        }



        return(
            <div>
                Capacitor: {this.state.result['c'].toFixed(2)} uF <br/>
                Resistor: {this.state.result['r'].toFixed(2)} Ohms <br/>
            </div>
        )


    }

    render(){


        return(
            <div>
                <h3>Contour Network</h3>

                    <div className="row" style={{width: '300px', marginLeft:'0px'}}>
                        <div className="col s12">
                          <ul className="tabs">
                              <li className="tab col s6">
                                  <a className={this.state.network === 'rc'? 'active': null} href="#" onClick={()=>this.onCalcSelect('rc')}>RC
                                      <i className="material-icons">keyboard_arrow_up</i>
                                  </a>
                              </li>

                            <li className="tab col s6">
                                <a className={this.state.network === 'rl'? 'active': null} href="#" onClick={()=>this.onCalcSelect('rl')}>RL
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </a>
                            </li>

                          </ul>
                        </div>

                      </div>

                <div className='flex-direction'>
                    <div style={{width: '300px'}}>
                        {this.renderForm()}
                    </div>
                    <div style={{width: '300px'}}>
                        {this.renderResult()}
                    </div>
                </div>

            </div>
        )
    }
}
