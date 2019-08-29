import React from 'react';
import { withFormik, Form, Field } from "formik";
import "./Form.css";
import axios from "axios";
import * as Yup from "yup";

function SignInForm({errors, touched}) {

    return(
        <div class="container">
            

            <Form className="form signInForm">
            <p>Sign In</p>
                <lable> Email </lable>
                    <Field className="input"
                        type="email"
                        name="email"
                        placeholder="email@example.com" />

                <lable> Password </lable>
                    <Field className="input"
                        type="password"
                        name="password" 
                        placeholder="Must have 8 characters" />

                <button type="submit">Let's Go!</button>
                {touched.email && errors.email && <p class="error">{errors.email}</p>}
                {touched.password && errors.password && <p class="error">{errors.password}</p>}
                
            </Form>
        </div>
    )
}

const FormikSignInForm = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(8)
          .required(),
      }),
  
    handleSubmit(values) {
        console.log(values);
        axios   
            .post("https://artportfoliobw.herokuapp.com/login", values)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    }
})(SignInForm);

export default FormikSignInForm