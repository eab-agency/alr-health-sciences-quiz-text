/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMatchedSchool } from '@/components/helpers/getMatchedSchool';

import PageLayout from '@/components/PageLayout';
import Tabs from '@/components/Tabs';
import Stats from '@/components/Stats';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import StateSelect from '@/components/helpers/StateSelect';
import Form from '@/components/Form';
import { useRequest } from '@/hooks/useRequest';

const ExecutivePage = () => {
    const { data: results, error: resultsError } = useRequest('/quiz/results');
    const { data: schools, error: schoolsError } = useRequest('/quiz/schools');

    const { matchedSchool, setMatchedSchool } = useUser();

    const router = useRouter();
    const currentRoute = router.pathname.replace('/', '');

    //    wait for quizData to be populated and then set personalityData based on results.title
    const [personalityData, setPersonalityData] = useState(null);
    useEffect(() => {
        if (results) {
            const personalityDataInternal = results.find(
                (result) => result.title.toLowerCase() === currentRoute
            );
            setPersonalityData(personalityDataInternal);
        }
    }, [results, currentRoute]);

    const handleStateChange = (value) => {
        const matchedSchoolInternal = getMatchedSchool(value, schools);
        setMatchedSchool(matchedSchoolInternal);
    };

    // if no personalityData is found, return loading
    if (!personalityData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <h1>{personalityData.title}</h1>
            <p>{personalityData.detailedDescription}</p>
            <Tabs tabs={personalityData.tabs} className="personalityTabs" />
            <Form />
            <section className="career-path">
                <h2>
                    What's a common health care career path for The Executive?
                </h2>
                <h3>
                    Occupations that align with The Executive's career path tend
                    to establish plans and policies, direct business activities,
                    and oversee people, products, and services.
                </h3>
                <ul>
                    <li>
                        Administrative services and facilities managers: Plan,
                        direct, and coordinate activities that help a health
                        care facility run efficiently
                    </li>
                    <li>
                        Executives or administrators: Plan strategies and
                        policies to help organizations such as hospital systems
                        reach their goals.
                    </li>
                    <li>
                        Human resources manager: Plan, coordinate, and direct
                        the employee-focused functions of organizations such as
                        hospitals or clinics
                    </li>
                    <li>
                        Purchasing managers or agents: Buy products and services
                        such as medical supplies and equipment for hospitals or
                        clinics
                    </li>
                </ul>
                <Image
                    src="https://via.placeholder.com/526x284"
                    width={526}
                    height={284}
                    alt="placeholder"
                />
            </section>
            <Stats stats={personalityData.stats} />
            <section className="best-degrees">
                <h2>
                    What are the best health care degrees for The Executive?
                </h2>
                <h3>
                    For many roles in The Executive’s career path, a bachelor’s
                    degree is a minimum qualification. Master’s degrees are
                    common and often preferred, especially for more senior
                    management roles.
                </h3>
            </section>
            <Tabs tabs={personalityData.degreeTabs} className="degreeTabs" />
            <section className="best-schools">
                <Image
                    src="https://via.placeholder.com/342x252"
                    width={342}
                    height={252}
                    alt="placeholder"
                />
                <h3>
                    Does The Executive need a license, certification, or
                    registration?
                </h3>

                <p>
                    The need for a license or certification depends on the role.
                </p>
                <p>
                    All states require licensure for nursing home
                    administrators. The process often involves a state-approved
                    training program and national licensing exam, and varies by
                    state.
                </p>
                <p>
                    A license is not typically required in other areas of
                    medical and health services management, although some
                    positions do require a registered nurse or social worker
                    license.
                </p>
                <p>
                    While not required, certification can help your resume stand
                    out among your peers. You could become certified in many of
                    areas of practice, such as medical management or health
                    information management.
                </p>
            </section>
            <section className="keep-exploring">
                <h2>Keep exploring</h2>
                <p>
                    Much of the career, education, and salary information above
                    was sourced from the Bureau of Labor Statistics. You can
                    find state-specific job outlooks and salary details as well
                    as even more information on related careers on their
                    website.
                </p>
                <a
                    href="https://www.bls.gov/ooh/healthcare/home.htm"
                    target="_blank"
                    rel="noreferrer"
                >
                    Bureau of Labor Statistics
                </a>
            </section>
            {matchedSchool && (
                <>
                    <div>
                        {/* select input that has all the states */}
                        <StateSelect onSelect={handleStateChange} />
                    </div>
                    <UniversityMatch school={matchedSchool} />
                </>
            )}
        </div>
    );
};

ExecutivePage.PageLayout = PageLayout;
export default ExecutivePage;
