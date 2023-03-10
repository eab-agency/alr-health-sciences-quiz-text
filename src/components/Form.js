/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdChevronRight } from 'react-icons/md';
import styles from '@/styles/global/components/Form.module.scss';
// import fields from './arrayOfFieldObjects';

const fields = [
    {
        id: 5,
        label: 'First Name',
        showLabel: true,
        alias: 'first_name1',
        type: 'text',
        defaultValue: null,
        isRequired: false,
        validationMessage: 'Please complete the required field',
        helpMessage: null,
        order: 1,
        properties: {
            placeholder: null,
        },
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 7,
        label: 'Last Name',
        showLabel: true,
        alias: 'last_name1',
        type: 'text',
        defaultValue: null,
        isRequired: false,
        validationMessage: 'Please complete the required field',
        helpMessage: null,
        order: 2,
        properties: {
            placeholder: null,
        },
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 8,
        label: 'Preferred Email',
        showLabel: true,
        alias: 'preferred_email1',
        type: 'email',
        defaultValue: null,
        isRequired: true,
        validationMessage: 'Please complete the required field',
        helpMessage: null,
        order: 3,
        properties: {
            placeholder: null,
        },
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 9,
        label: 'Education Journey',
        showLabel: true,
        alias: 'education_journey',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 4,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 10,
        label: 'QuizResponse1',
        showLabel: true,
        alias: 'quizresponse1',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 5,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 11,
        label: 'QuizResponse2',
        showLabel: true,
        alias: 'quizresponse2',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 6,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 12,
        label: 'QuizResponse3',
        showLabel: true,
        alias: 'quizresponse3',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 7,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 13,
        label: 'QuizResponse4',
        showLabel: true,
        alias: 'quizresponse4',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 8,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 14,
        label: 'QuizResponse5',
        showLabel: true,
        alias: 'quizresponse5',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 9,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 15,
        label: 'QuizResponse6',
        showLabel: true,
        alias: 'quizresponse6',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 10,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 16,
        label: 'Quiz Result',
        showLabel: true,
        alias: 'quiz_result',
        type: 'hidden',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 11,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: null,
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: 'contact',
        mappedField: null,
    },
    {
        id: 6,
        label: 'Submit',
        showLabel: true,
        alias: 'submit',
        type: 'button',
        defaultValue: null,
        isRequired: false,
        validationMessage: null,
        helpMessage: null,
        order: 12,
        properties: [],
        validation: [],
        parent: null,
        conditions: [],
        labelAttributes: null,
        inputAttributes: 'class="btn btn-default"',
        containerAttributes: null,
        leadField: null,
        saveResult: true,
        isAutoFill: false,
        mappedObject: null,
        mappedField: null,
    },
];
const validationSchema = Yup.object().shape({
    // validation schema here
    preferred_email1: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});

const generateField = (field, error) => {
    const {
        id,
        label,
        alias,
        type,
        defaultValue,
        isRequired,
        validationMessage,
        helpMessage,
        properties,
    } = field;

    switch (type) {
        case 'text':
            return (
                <React.Fragment key={id}>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}

                    <Field
                        name={alias}
                        type="text"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                </React.Fragment>
            );
        case 'email':
            return (
                <React.Fragment key={id}>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}

                    <Field
                        name={alias}
                        type="email"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                </React.Fragment>
            );
        case 'hidden':
            return <Field key={id} name={alias} type="hidden" />;
        default:
            return null;
    }
};

const AcquiaFormHandle = ({ redirectTo, answers = {} }) => {
    const [location] = useLocalStorage('489hLocation', null);

    const initialValues = {};
    const router = useRouter();

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const formData = {
                ...values,
                formId: 2,
                formName: 'quizformquizform',
                messenger: 1,
                ip_address_state: location.region_iso_code,
            };

            const { data } = await axios.post(
                '/api/submit?formId=2',
                {
                    mauticform: formData,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // console.log(data);
            setSubmitting(false);
            // Redirect to the specified path on successful form submission
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            // console.log(error);
            setSubmitting(false);
        }
    };

    fields.forEach((field) => {
        if (field.alias === 'quiz_result') {
            initialValues[field.alias] = answers.highestScorePersonality;
        } else {
            initialValues[field.alias] = field.defaultValue || '';
            if (answers.answers) {
                answers.answers.forEach((answer) => {
                    if (answer.associatedField === field.alias) {
                        initialValues[
                            field.alias
                        ] = `${answer.question} | ${answer.answer}`;
                    }
                });
            }
        }
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, isSubmitting }) => (
                <Form className={styles.form}>
                    {fields.map((field) => (
                        <div className={styles.qGroup} key={field.id}>
                            {generateField(field, errors[field.alias])}
                            <ErrorMessage name={field.alias} component="span" />
                        </div>
                    ))}

                    <button
                        className="button btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                        <MdChevronRight />
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AcquiaFormHandle;
