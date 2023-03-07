/* eslint-disable react/no-danger */
import Image from 'next/image';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css'

const TabComponent = ({ tabs }) => (
    <Tabs>
        <TabList>
            {tabs.map((tab, index) => (
                <Tab key={index}>
                    <span className={tab.icon}>{tab.title}</span>
                </Tab>
            ))}
        </TabList>

        {tabs.map((tab, index) => (
            <TabPanel key={index}>
                {tab.icon && (
                    <Image
                        src="https://via.placeholder.com/200"
                        alt="placeholder"
                        width={200}
                        height={200}
                    />
                )}
                <h3>{tab.title}</h3>
                <p
                    className="tab-content"
                    dangerouslySetInnerHTML={{ __html: tab.content }}
                />
            </TabPanel>
        ))}
    </Tabs>
);

export default TabComponent;
