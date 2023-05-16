/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Field, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';

const GenerateField = ({ field, error, formData }) => {
    const [phoneHasValue, setPhoneHasValue] = useState(false);
    const {
        values,
        values: { phone_number },
        isSubmitting,
        isValid,
        dirty,
    } = useFormikContext();

    // if phone_number has a value, set phoneHasValue to true
    // if phone_number is empty, set phoneHasValue to false
    useEffect(() => {
        if (phone_number !== undefined && phone_number !== '') {
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

    // const shouldHide = formData && Boolean(formData[alias]); // check if field is already populated in formData
    // setting to false for now to show all fields b/c I haven't figured out how to populate fields correctly
    const shouldHide = false;

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
                    />
                    {error && <span>{error}</span>}
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            ) : (
                <Field key={id} name={alias} type="hidden" />
            );
        case 'email':
            return !shouldHide ? (
                <>
                    <label htmlFor={alias}>{label}</label>
                    {isRequired && <span className="required">*</span>}

                    <Field
                        name={alias}
                        type="email"
                        placeholder={properties.placeholder}
                        className={error ? 'is-invalid' : ''}
                    />
                    {error && <span>{error}</span>}
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            ) : (
                <Field key={id} name={alias} type="hidden" />
            );
        case 'hidden':
            return <Field key={id} name={alias} type="hidden" />;
        case 'button':
            return (
                <button
                    className="button btn-primary"
                    type="submit"
                    disabled={isSubmitting && isValid && dirty}
                >
                    {label}
                    <MdChevronRight />
                </button>
            );
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
                    {error && error}
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
                    {error && error}
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );
        case 'freetext':
        case 'freehtml':
            return (
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: properties.text,
                    }}
                />
            );

        case 'select': {
            const hasUnitedStates =
                properties.list.list.hasOwnProperty('United States');

            const renderStateOptions = () => {
                const states = properties.list.list['United States'];
                return Object.entries(states).map(([key, value]) => (
                    <option key={key} value={value}>
                        {key}
                    </option>
                ));
            };

            const selectOptions = hasUnitedStates
                ? renderStateOptions()
                : properties.list.list.map((option) => (
                      <option key={option.value} value={option.value}>
                          {option.label}
                      </option>
                  ));

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
                        {selectOptions}
                    </Field>
                    {error && error}
                    {helpMessage && <small>{helpMessage}</small>}
                </>
            );
        }
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
                        {error && error}
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
