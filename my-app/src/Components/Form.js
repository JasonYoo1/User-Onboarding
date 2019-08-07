import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const LiveForm = ({errors, touched, values, }) => {
  return (
    <div className="form">
      <h1>Form</h1>
      <Form>
        {/*Name field with error notification*/}
        <Field type="text" name="name" placeholder="Full Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        {/*Email field with error notification*/}
        <Field Component="email" name="email" placeholder="Email" />
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



        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues(values, terms) {
    return {
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
        terms: terms || false
    };
  },

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
export default FormikForm;
