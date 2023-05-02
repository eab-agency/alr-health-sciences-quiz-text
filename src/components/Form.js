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

const validationSchema = Yup.object().shape({
    // validation schema here
    preferred_email: Yup.string().email('Invalid email'),
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
                    {helpMessage && <small>{helpMessage}</small>}
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

        default:
            return null;
    }
};

const AcquiaFormHandle = ({ redirectTo, answers = {}, user = {}, id }) => {
    // keep track of whether the form has been submitted
    const [isSent, setIsSent] = useState(false);

    const [location] = useLocalStorage('489hLocation', null);
    const [localQData] = useLocalStorage('eab-quiz-data');
    const { data: acsForm, error } = useForm(id);
    const [formValues, setFormValues] = useState({});

    const [theForm, setTheForm] = useState(null);
    const [theFields, setTheFields] = useState([]);

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
            const formData = {
                ...values,
                formId: theForm.id,
                formName: theForm.name,
                messenger: 1,
                ip_address_state: location.region_iso_code,
            };

            await axios
                .post(`/api/submit?formId=${theForm.id}`, {
                    mauticform: formData,
                })
                .then((res) => {
                    setIsSent(true);
                })
                .catch((err) => {
                    console.log('err', err);
                });

            setSubmitting(false);
            // Redirect to the specified path on successful form submission
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            setSubmitting(false);
        }
    };

    const initialValues = {};

    useEffect(() => {
        // console.log('theFields', theFields);
        if (theFields.length > 0) {
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
        }
    }, [
        answers.answers,
        answers.highestScorePersonality,
        localQData,
        theFields,
        user,
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
