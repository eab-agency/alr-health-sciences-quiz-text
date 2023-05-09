/* eslint-disable camelcase */
import { Field, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const GenerateField = ({ field, error, formData }) => {
    const [phoneHasValue, setPhoneHasValue] = useState(false);
    const {
        values: { phone_number },
        setFieldValue,
    } = useFormikContext();

    // if phone_number has a value, set phoneHasValue to true
    // if phone_number is empty, set phoneHasValue to false
    useEffect(() => {
        if (phone_number !== '') {
            setPhoneHasValue(true);
        } else {
            setPhoneHasValue(false);
        }
    }, [phone_number]);

    //  const [field, meta] = useField(props);
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
        case 'tel': {
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
        }
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
                    // eslint-disable-next-line react/no-danger
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

        case 'checkboxgrp': {
            if (alias === 'text_optin' && !phoneHasValue) {
                return null;
            }
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
        }

        default:
            return null;
    }
};

export default GenerateField;
