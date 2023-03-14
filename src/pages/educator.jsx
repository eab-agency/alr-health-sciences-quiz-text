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
// import Form from '@/components/Form';
import { useRequest } from '@/hooks/useRequest';
import { BiLinkExternal } from 'react-icons/bi';

import styles from '@/styles/global/layouts/FinalPage.module.scss';
import Accordion from '@/components/Accordion';

const EducatorPage = () => {
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
        <div className={styles.container}>
            <div className={styles.content}>
                <span className="intro-title">
                    Your ideal role could be ...
                </span>
                <section className={styles['intro-section']}>
                    <h1>{personalityData.title}</h1>
                    <p>{personalityData.detailedDescription}</p>
                </section>
                <Tabs tabs={personalityData.tabs} />
                <section className={styles['career-path']}>
                    <div className={styles['path-intro']}>
                        <h2>
                            What's a common health care career path for The
                            Executive?
                        </h2>
                        <p>
                            Occupations that align with The Educator’s career
                            path tend to teach people about behaviors that
                            promote wellness, developing strategies to improve
                            the well-being of individuals and communities.
                        </p>
                    </div>
                    <div className={styles['executive-path']}>
                        <div>
                            <p>
                                A health education specialist’s duties differ
                                based on where they work:
                            </p>
                            <ul>
                                <li>
                                    <strong>Healthcare facilities:</strong> Work
                                    one-on-one with patients or their families
                                    to understand their diagnoses and treatment
                                    options. Organize education programs for the
                                    community about health-related topics.
                                </li>
                                <li>
                                    <strong>
                                        Executives or administrators:
                                    </strong>{' '}
                                    Plan strategies and policies to help
                                    organizations such as hospital systems reach
                                    their goals.
                                </li>
                                <li>
                                    <strong>Human resources manager:</strong>{' '}
                                    Plan, coordinate, and direct the
                                    employee-focused functions of organizations
                                    such as hospitals or clinics
                                </li>
                                <li>
                                    <strong>
                                        Purchasing managers or agents:
                                    </strong>{' '}
                                    Buy products and services such as medical
                                    supplies and equipment for hospitals or
                                    clinics
                                </li>
                            </ul>
                        </div>
                        <figure>
                            <Image
                                src="/images/executive.jpg"
                                width={478}
                                height={284}
                                alt="Executive woman smiling in front of a laptop"
                            />
                            <figcaption>Nonprofit Worker</figcaption>
                        </figure>
                    </div>
                    <div className={styles['executive-path']}>
                        <figure>
                            <Image
                                src="/images/executive.jpg"
                                width={478}
                                height={284}
                                alt="Executive woman smiling in front of a laptop"
                            />
                            <figcaption>Professor</figcaption>
                        </figure>
                        <div>
                            <ul>
                                <li>
                                    <strong>Community health workers</strong>{' '}
                                    tend to have a more local focus, deeply
                                    understanding the communities they serve.
                                    They identify health-related issues, collect
                                    data, and discuss health concerns with the
                                    community. They work with health education
                                    specialists and social services to inform
                                    programs that address the health and
                                    wellness needs of their community.
                                </li>
                                <li>
                                    <strong>Medical educators</strong> often
                                    work in either universities or hospitals to
                                    support medical students or trainee doctors,
                                    or in a public health role in a local
                                    authority. Most university-based medical
                                    educators have transferred from a clinical
                                    career or continue to balance a clinical
                                    career with a research and teaching career
                                    as clinical academics.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <Stats
                    stats={personalityData.stats}
                    source={personalityData.statsSource}
                />
                <section className={styles['best-degrees']}>
                    <div className={styles['degrees-intro']}>
                        <h2>
                            What are the best health care degrees for The
                            Executive?
                        </h2>
                        <p>
                            The type of degree needed for various careers in The
                            Educator’s path vary. Health education specialists
                            usually need at least a bachelor’s degree, community
                            health workers often only need a high school
                            diploma, and medical educators often require at
                            least a master’s degree.
                        </p>
                    </div>
                    <Tabs
                        tabs={personalityData.degreeTabs}
                        className="degreeTabs"
                    />
                </section>
                <section className={styles.certificates}>
                    <Accordion title="Does The Educator need a license, certification, or registration?">
                        <figure>
                            <Image
                                src="/images/certificate-image.svg"
                                width={478}
                                height={284}
                                alt="Medical records"
                            />
                        </figure>
                        <div>
                            <p>
                                The need for a license or certification depends
                                on the role.
                            </p>
                            <p>
                                Employers may require or prefer that health
                                education specialists obtain a Certified Health
                                Education Specialist (CHES) credential or the
                                Certified Diabetes Care and Education Specialist
                                (CDCES) credential.
                            </p>
                            <p>
                                Some states also offer certification for
                                community health workers, which may include
                                completing a training program on the job.
                            </p>
                            <p>
                                If you’re interested in helping your resume
                                stand out, many universities also offer a
                                Certificate in Public Health that can often be
                                completed online and either part-time or in half
                                the time of a full master’s degree. A
                                certificate is often hyper-focused on the skills
                                you need to excel in your career.
                            </p>
                        </div>
                    </Accordion>
                </section>
                <section className={styles['keep-exploring']}>
                    <div className={styles.sourceContent}>
                        <h2>Keep exploring</h2>
                        <p>
                            Much of the career, education, and salary
                            information above was sourced from the Bureau of
                            Labor Statistics. You can find state-specific job
                            outlooks and salary details as well as even more
                            information on related careers on their website.
                        </p>
                        <a
                            href="https://www.bls.gov/ooh/healthcare/home.htm"
                            target="_blank"
                            rel="noreferrer"
                            className="button btn-secondary"
                        >
                            Bureau of Labor Statistics{' '}
                            <i>
                                <BiLinkExternal />
                            </i>
                        </a>
                    </div>
                </section>
                {matchedSchool && (
                    <section className={styles['matched-school']}>
                        <UniversityMatch school={matchedSchool} />
                    </section>
                )}
            </div>
        </div>
    );
};

EducatorPage.PageLayout = PageLayout;
export default EducatorPage;
