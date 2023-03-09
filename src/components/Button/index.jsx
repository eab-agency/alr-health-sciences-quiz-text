import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdChevronRight } from 'react-icons/md';

export default function Button({ label, type, href }) {
    const [buttonType, setButtonType] = useState('default');

    useEffect(() => {
        if (type === 'primary') {
            setButtonType('button btn-primary');
        } else if (type === 'secondary') {
            setButtonType('button btn-secondary');
        } else {
            setButtonType('button');
        }
    }, [type]);

    return (
        <Link href={href} className={buttonType}>
            <span>{label}</span>
            <i>
                <MdChevronRight />
            </i>
        </Link>
    );
}
