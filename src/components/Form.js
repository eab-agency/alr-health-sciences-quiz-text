import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const initialValues = {
    first_name: '',
    last_name: '',
    preferred_email: '',
    education_journey: '',
    quizresponse1: '',
    quiz_result: '',
    formId: 2,
    formName: 'quizformquizform',
    messenger: 1,
};

const onSubmit = async (values, { setSubmitting }) => {
    try {
        const formData = new FormData();
        formData.append('mauticform[first_name]', values.first_name);
        formData.append('mauticform[last_name]', values.last_name);
        formData.append('mauticform[middle_name]', 'bingo');
        formData.append('mauticform[formId]', values.formId);
        formData.append('mauticform[formName]', 'quizformquizform');
        formData.append('mauticform[messenger]', 1);

        const { data } = await axios.post('/api/submit?formId=2', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(data);
        setSubmitting(false);
    } catch (error) {
        console.log(error);
        setSubmitting(false);
    }
};

const AcquiaFormHandle = () => (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
            <Form>
                <label htmlFor="first_name">First Name:</label>
                <Field type="text" name="first_name" />

                <label htmlFor="last_name">Last Name:</label>
                <Field type="text" name="last_name" />

                <label htmlFor="preferred_email">Preferred Email:</label>
                <Field type="email" name="preferred_email" />

                <label htmlFor="education_journey">Education Journey:</label>
                <Field as="select" name="education_journey">
                    <option value="Professional">Professional</option>
                </Field>

                <label htmlFor="quizresponse1">Quiz Response 1:</label>
                <Field type="text" name="quizresponse1" />

                <label htmlFor="quiz_result">Quiz Result:</label>
                <Field type="text" name="quiz_result" />

                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
    </Formik>
);

export default AcquiaFormHandle;
