/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdChevronRight } from 'react-icons/md';
import styles from '@/styles/global/components/Form.module.scss';
import useForm from '@/hooks/useForm';
import { useUser } from '@/context/context';
import GenerateField from '@/lib/GenerateField';
import { DisplayFormikState } from '@/lib/helpers';
import isDevMode from '@/helpers/isDevMode';

// const validationSchema = Yup.object().shape({
//     // validation schema here
//     preferred_email: Yup.string()
//         .email('Invalid email')
//         .required('Email is required'),
// });

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

    const modifyFields = (fields) =>
        fields.map(
            (field) =>
                // if (
                //     field.conditions &&
                //     field.conditions.values &&
                //     field.conditions.values.length > 0
                // ) {
                //     return {
                //         ...field,
                //         initialHide: true,
                //     };
                // }
                field
        );

    useEffect(() => {
        if (acsForm) {
            const { fields, ...otherFormProps } = acsForm.form;
            const modifiedFields = modifyFields(fields);
            setTheFields(modifiedFields);
            setTheForm(otherFormProps);
        }
    }, [acsForm]);

    const router = useRouter();

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const theFormData = {
                ...values,
                formId: theForm.id,
                formName: theForm.name,
                messenger: 1,
                ip_address_state: location.region_iso_code,
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
            if (redirectTo) {
                !isDevMode() && router.push(redirectTo);
            }
        } catch (error) {
            setSubmitting(false);
        }
    };

    const initialValues = { ...formData };

    const [fieldsProcessed, setFieldsProcessed] = useState(false);
    const { utmSource } = useUser();

    useEffect(() => {
        // console.log('theFields', theFields);
        if (theFields.length > 0 && !fieldsProcessed) {
            // console.log('🚨 the fields', theFields);
            const newFormValues = {};
            theFields.forEach((field) => {
                if (field.alias === 'quiz_result') {
                    newFormValues[field.alias] =
                        answers.highestScorePersonality;
                } else if (field.alias === 'paid_social_source_of_con') {
                    console.log('localQData.utmSource', localQData);
                    console.log('utmSource', utmSource);
                    if (localQData && localQData.utmSource) {
                        newFormValues[field.alias] = localQData.utmSource;
                    } else if (utmSource) {
                        newFormValues[field.alias] = utmSource;
                    } else {
                        newFormValues[field.alias] = '';
                    }
                } else if (field.alias === 'school_carousel') {
                    newFormValues[field.alias] = school.title;
                } else if (field.alias === 'area_of_interest') {
                    // get answer for answers.areaOfInterest and set as value
                    newFormValues[field.alias] = answers.areaOfInterest;
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
        utmSource,
        answers.areaOfInterest,
    ]);

    if (error) return <p>Error loading form.</p>;
    if (!acsForm) return <p className="loading">Loading...</p>;

    // Assume `fields` is the array of form fields received from the API
    const validationSchema = Yup.object().shape(
        theFields.reduce((schema, field) => {
            // For each field, create a Yup validation object based on its validation rules
            let fieldValidation = '';

            if (field.type === 'text' || field.type === 'email') {
                fieldValidation = Yup.string();
            } else if (field.type === 'number') {
                fieldValidation = Yup.number();
            } else {
                fieldValidation = Yup.mixed(); // Initialize with a generic Yup type
            }

            if (field.isRequired) {
                fieldValidation = fieldValidation.required(
                    field.validationMessage || `${field.label} is required`
                );
            }

            if (field.type === 'email') {
                fieldValidation = fieldValidation.email('Invalid email');
            }

            // if field is a number, and field alias is zip_code, add min and max length
            if (field.alias === 'zip_code') {
                fieldValidation = fieldValidation.test(
                    'len',
                    'Zip Code needs to be excatly 5 digits',
                    (val) => !val || val.toString().length === 5
                );
            }

            // Add more validation rules here as needed

            // Add the validation object to the schema object using the field's alias as the key
            // schema[field.alias] = fieldValidation;
            return { ...schema, [field.alias]: fieldValidation };
            // return schema;
        }, {})
    );

    return (
        <Formik
            enableReinitialize
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ errors, isSubmitting, isValid, dirty }) =>
                !isSent ? (
                    <Form className={styles.form}>
                        {theFields.map((field) => (
                            <GenerateField
                                field={field}
                                error={errors[field.alias]}
                                formData={theFields}
                                key={field.id}
                            />
                        ))}

                        {/* <DisplayFormikState {...values} /> */}
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
