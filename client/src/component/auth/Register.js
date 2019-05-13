import React, { Component } from "react";
import Link from "react-router-dom";


class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
    }

    onChange = e => {
        this.ListeningStateChangedEvent({
            [e.target.id]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser)
    }

    render(){
        const {errors} = this.state
        return(
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">Keyboard_backspace</i> Back to Home
                        </Link>
                    <div className="col s12" style={{
                        paddingLeft: "11.250px"
                    }}>
                        <h4>
                            <b>Register</b> Bellow
                        </h4>
                        <p classNmae="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Log In</Link>
                        </p>
                    </div>

                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="input-field col s12">
                        <input >

                        </input>
                      </div>  
                    </form>

                    </div>
                </div>
            </div>
        )
    }

    

}

export default Register;