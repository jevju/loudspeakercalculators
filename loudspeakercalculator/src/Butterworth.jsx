import React from 'react';


export default class Butterworth extends React.Component{
    constructor(){
        super();

        this.fields=[
            {
                'name': 'fc',
                'unit': 'Hz',
                'description': 'Cutoff frequency'
            },
            {
                'name': 'Z0',
                'unit': 'Ohm',
                'description': 'Impedance'
            },
            {
                'name': 'n',
                'unit': '(1-10)',
                'description': 'Order'
            }
        ]

        this.state={
            values: {},
            result: {},
            type: 'lp' //LowPass/ HighPass/ BandPass
        };

        this.onCalcSelect = this.onCalcSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return;
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
        this.setState({type:c});
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


    renderTabs(){


        return(
            <div>
                <div className="row" style={{width: '300px', marginLeft:'0px'}}>
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6">
                                <a className={this.state.type === 'hp'? 'active': null} href="#" onClick={()=>this.onCalcSelect('hp')}>High Pass
                                </a>
                            </li>

                            <li className="tab col s6">
                                <a className={this.state.type === 'lp'? 'active': null} href="#" onClick={()=>this.onCalcSelect('lp')}>Low Pass
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        )

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

    render(){


        return(
            <div>
                <h3>Butterworth</h3>
                <div style={{width: '300px'}}>{this.renderTabs()}</div>
                <div style={{width: '300px'}}>
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}
