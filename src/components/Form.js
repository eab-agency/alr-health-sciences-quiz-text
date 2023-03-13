/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdChevronRight } from 'react-icons/md';
import styles from '@/styles/global/components/Form.module.scss';
import useForm from '@/hooks/useForm';

const validationSchema = Yup.object().shape({
    // validation schema here
    preferred_email1: Yup.string().email('Invalid email'),
    // .required('Email is required'),
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
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}

                    <Field
                        name={alias}
                        type="text"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                </>
            );
        case 'email':
            return (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}

                    <Field
                        name={alias}
                        type="email"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                </>
            );
        case 'hidden':
            return <Field key={id} name={alias} type="hidden" />;
        default:
            return null;
    }
};

const AcquiaFormHandle = ({ redirectTo, answers = {}, user = {}, id }) => {
    const [location] = useLocalStorage('489hLocation', null);
    const { data: acsForm, error } = useForm('2');

    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (acsForm) {
            setFields(acsForm.form.fields);
        }
    }, [acsForm]);

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

            setSubmitting(false);
            // Redirect to the specified path on successful form submission
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            setSubmitting(false);
        }
    };

    const initialValues = useMemo(() => ({}), []);

    useEffect(() => {
        if (fields.length > 0) {
            fields.forEach((field) => {
                if (field.alias === 'quiz_result') {
                    initialValues[field.alias] =
                        answers.highestScorePersonality;
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
                if (user) {
                    if (field.alias === 'preferred_email1') {
                        initialValues[field.alias] = user.email;
                    } else if (field.alias === 'first_name1') {
                        initialValues[field.alias] = user.fname;
                    } else if (field.alias === 'last_name1') {
                        initialValues[field.alias] = user.lname;
                    }
                }
            });
        }
    }, [fields, answers, user, initialValues]);

    if (error) return <p>Error loading form.</p>;
    if (!acsForm) return <p className="loading">Loading...</p>;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, isSubmitting }) => (
                <Form className={styles.form}>
                    {fields &&
                        fields.map((field) => (
                            <div
                                className={`${styles.qGroup} ${
                                    field.type === 'hidden' ? styles.hidden : ''
                                }`}
                                key={field.id}
                            >
                                {generateField(field, errors[field.alias])}
                                <ErrorMessage
                                    name={field.alias}
                                    component="span"
                                />
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
