import React, { useEffect, useState } from "react";
import Meta, { MetaProps } from "../../components/common/Meta";
import styles from './index.module.css';
import data from './data';
import JobCard, { JobCardProps } from "./components/JobCard";
import Input from "./components/Input";

export interface JobListingProps {};

const metaData: MetaProps = {
    title: "Job listing App",
    desc: "Job listing App using React Js",
    keywords: "Job Listing app, Job listing with React Js, Job Listing page design, Job Listing, React App",
    fontUrl: "https://fonts.googleapis.com/css2?family=League+Spartan:wght@500&display=swap"
}

const JobListing:React.FC<JobListingProps> = () => {

    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [jobData, setJobData] = useState<JobCardProps[]>(data);

    useEffect(() => {
        if(!searchTags || !searchTags.length){
            setJobData(data);
        }else{
            const initialData = [...data];
            const newData = initialData.filter((vals) => {
                const items = searchTags?.filter((name) => {
                    const lowerCaseName = name.toLowerCase();
                    if (vals.languages.find((language) => language.toLowerCase() === lowerCaseName)) {
                        return vals;
                    }
                    if (vals.tools.find((tool) => tool.toLowerCase() === lowerCaseName)) {
                        return vals;
                    }
                    if (vals.role.toLowerCase() === name || vals.level.toLowerCase() === lowerCaseName) {
                        return vals;
                    }
                    return null;
                });
                if (items.length) {
                    return items;
                }
                return null;
            });
            setJobData(newData);
        }
    }, [searchTags]);

    useEffect(() => {
        const storageItems = window.localStorage.getItem('tags');
        if (storageItems) {
            const searchItems: string[] = JSON.parse(storageItems);
            setSearchTags(searchItems);
        }
    }, []);

    return (
        <>
        <Meta {...metaData} />
            <header className={styles.hero_bg}>
                <div className="container-lg h-100 position-relative">
                    <Input tags={searchTags} setTags={setSearchTags} />
                </div>
            </header>
            <main className={`${styles.jobs_body}`}>
                <div className="container-lg">
                    {jobData.map((values) => {
                        return(
                            <JobCard key={`${values.company}-${values.id}`} {...values} />
                        )
                    })}
                </div>
            </main>
        </>
    )
} 

export default JobListing;