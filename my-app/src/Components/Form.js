import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { styled } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
  
  const styles = {
    form: {
      background: 'red',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  };

const LiveForm = ({errors, touched, values, }) => {
  

  return (
    <div className="form">

                <h1>Form</h1>
                <Form>

                    {/*Name field with error notification*/}
                    <Field type="text" name="name" placeholder="Full Name"  />
                    {touched.name && errors.name && <p className="error">{errors.name}</p>}
                    {/*Email field with error notification*/}
                    <Field type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && <p className="error">{errors.email}</p>}
                    {/*Password field with error notification*/}
                    <Field type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && <p className="error">{errors.password}</p>}
                    {/*CheckBox field with error notification*/}
                    <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                    </label>
                    </Form>
        <MyButton type="submit">Submit!</MyButton>

    </div>
  );
};

//Formik creates another component from another component?
const FormikForm = withFormik({
  mapPropsToValues(values, terms) {
    return {
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
        terms: terms || false
    };
  },
//
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),

  }),

  handleSubmit(values) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  }
})(LiveForm);

export default withStyles(styles)(FormikForm)
