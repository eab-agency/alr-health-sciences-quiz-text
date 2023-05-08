/* eslint-disable react/no-danger */
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
import { useUser } from '@/context/context';
import form from '@/pages/api/form';

const validationSchema = Yup.object().shape({
    // validation schema here
    preferred_email: Yup.string().email('Invalid email'),
    // .required('Email is required'),
});

const generateField = (field, error, formData) => {
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

    const shouldHide = formData && Boolean(formData[alias]); // check if field is already populated in formData
    console.log('🚀 ~ file: Form.js:36 ~ generateField ~ formData:', formData);

    switch (type) {
        case 'text':
            return !shouldHide ? (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}
                    <Field
                        name={alias}
                        type="text"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                        value={formData && formData[alias]}
                    />
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            ) : (
                <Field
                    key={id}
                    name={alias}
                    type="hidden"
                    value={formData[alias]}
                />
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
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );
        case 'hidden':
            return <Field key={id} name={alias} type="hidden" />;
        case 'tel':
            return (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}
                    <Field
                        name={alias}
                        type="tel"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );
        case 'date':
            return (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}
                    <Field
                        name={alias}
                        type="date"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );
        case 'freehtml':
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: properties.text,
                    }}
                />
            );

        case 'select':
            return (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}
                    <Field
                        name={alias}
                        as="select"
                        className={error ? 'is-invalid' : ''}
                    >
                        <option value="">Select</option>
                        {properties.list.list.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Field>
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );

        case 'checkboxgrp':
            return (
                <>
                    <div id="checkbox-group">{label}</div>
                    <div role="group" aria-labelledby="checkbox-group">
                        <label>
                            {isRequired && <span className="required">*</span>}
                            {properties.optionlist.list.map((option) => (
                                <div key={option.value}>
                                    <Field
                                        name={alias}
                                        id={option.value}
                                        type="checkbox"
                                        value={option.value}
                                        className={error ? 'is-invalid' : ''}
                                    />
                                    <label htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </label>
                        {helpMessage && <small>{helpMessage}</small>}
                    </div>
                </>
            );

        default:
            return null;
    }
};

const AcquiaFormHandle = ({
    redirectTo,
    answers = {},
    user = {},
    id,
    school = {},
}) => {
    // keep track of whether the form has been submitted
    const [isSent, setIsSent] = useState(false);

    const [localQData] = useLocalStorage('eab-quiz-data');
    const { data: acsForm, error } = useForm(id);
    const [formValues, setFormValues] = useState({});

    const [theForm, setTheForm] = useState(null);
    const [theFields, setTheFields] = useState([]);

    const { location, setFormData, formData } = useUser();
    console.log('🤵🏼‍♂️🤵🏼‍♂️🤵🏼‍♂️ ~ file: Form.js:174 ~ formData:', formData);

    useEffect(() => {
        if (acsForm) {
            const { fields, ...otherFormProps } = acsForm.form;
            setTheFields(fields);
            setTheForm(otherFormProps);
        }
    }, [acsForm]);

    const router = useRouter();

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const theFormData = {
                ...values,
                formId: theForm.id,
                formName: theForm.name,
                messenger: 1,
                ip_address_state: location.region_iso_code,
                ip_address_zip: location.postal_code,
            };

            await axios
                .post(`/api/submit?formId=${theForm.id}`, {
                    mauticform: theFormData,
                })
                .then((res) => {
                    setFormData(theFormData);
                    setIsSent(true);
                })
                .catch((err) => {
                    console.log('err', err);
                });

            setSubmitting(false);
            // Redirect to the specified path on successful form submission
            // if (redirectTo) {
            //     router.push(redirectTo);
            // }
        } catch (error) {
            setSubmitting(false);
        }
    };

    const initialValues = {};

    const [fieldsProcessed, setFieldsProcessed] = useState(false);

    useEffect(() => {
        // console.log('theFields', theFields);
        if (theFields.length > 0 && !fieldsProcessed) {
            const newFormValues = {};
            theFields.forEach((field) => {
                if (field.alias === 'quiz_result') {
                    newFormValues[field.alias] =
                        answers.highestScorePersonality;
                } else if (
                    field.alias === 'paid_social_source_of_con' &&
                    localQData &&
                    localQData.utmSource
                ) {
                    newFormValues[field.alias] = localQData.utmSource;
                } else if (field.alias === 'school_carousel') {
                    newFormValues[field.alias] = school.title;
                } else {
                    newFormValues[field.alias] = field.defaultValue || '';
                    if (answers.answers) {
                        answers.answers.forEach((answer) => {
                            if (answer.associatedField === field.alias) {
                                newFormValues[
                                    field.alias
                                ] = `${answer.question} | ${answer.answer}`;
                            }
                        });
                    }
                }
                if (user) {
                    if (field.alias === 'preferred_email') {
                        newFormValues[field.alias] = user.email;
                    } else if (field.alias === 'first_name') {
                        newFormValues[field.alias] = user.fname;
                    } else if (field.alias === 'last_name') {
                        newFormValues[field.alias] = user.lname;
                    }
                }
            });
            setFormValues((prev) => ({
                ...prev,
                ...newFormValues,
            }));

            setFieldsProcessed(true);
        }
    }, [
        answers.answers,
        answers.highestScorePersonality,
        localQData,
        theFields,
        user,
        fieldsProcessed,
        school,
    ]);

    if (error) return <p>Error loading form.</p>;
    if (!acsForm) return <p className="loading">Loading...</p>;

    return (
        <Formik
            enableReinitialize
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, isSubmitting }) =>
                !isSent ? (
                    <Form className={styles.form}>
                        {theFields.map((field) => (
                            <div
                                className={`${styles.qGroup} ${
                                    field.type === 'hidden' ? styles.hidden : ''
                                }`}
                                key={field.id}
                            >
                                {generateField(
                                    field,
                                    errors[field.alias],
                                    formData
                                )}
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
                ) : (
                    <div className={styles.formSuccess}>
                        <h2>Thank you for your submission!</h2>
                    </div>
                )
            }
        </Formik>
    );
};

export default AcquiaFormHandle;
