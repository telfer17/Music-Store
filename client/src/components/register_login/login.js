import React, { Component } from 'react';
import FormField from '../utils/form/formfield';
import { connect } from 'react-redux';
import { update } from '../utils/form/formActions';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData:{
      email:{
        element: 'input',
        value: '',
        config:{
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password:{
        element: 'input',
        value: '',
        config:{
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = () => {

  }

  render(){
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event)=> this.submitForm(event)}>

          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={(element)=> this.updateForm(element)}
          />

          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={(element)=> this.updateForm(element)}
          />
        </form>
      </div>
    );
  }
}

export default connect()(Login);
