import React, { useEffect, useState } from 'react';
import Meta, { MetaProps } from '../../common/components/Meta';
import Input from './components/Input';
import JobCard, { JobCardProps } from './components/JobCard';
import data from './data';
import styles from './index.module.css';

export interface JobListingProps {}

const metaData: MetaProps = {
  title: 'Job listing App',
  desc: 'Job listing App using React Js',
  keywords:
    'Job Listing app, Job listing with React Js, Job Listing page design, Job Listing, React App',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=League+Spartan:wght@500&display=swap',
};

const JobListing: React.FC<JobListingProps> = () => {
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [jobData, setJobData] = useState<JobCardProps[]>(data);

  useEffect(() => {
    if (!searchTags.length) {
      setJobData(data);
    } else {
      const initialData = [...data];
      const newData = initialData.filter((vals) => {
        const { languages, tools, role, level } = vals;

        const dataArr = [
          ...languages.map((lang) => lang.toLowerCase()),
          ...tools.map((tool) => tool.toLowerCase()),
          role.toLowerCase(),
          level.toLowerCase(),
        ];

        if (searchTags.some((tags) => dataArr.includes(tags.toLowerCase()))) {
          return vals;
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
          {jobData.map((values) => (
            <JobCard key={`${values.company}-${values.id}`} {...values} />
          ))}
        </div>
      </main>
    </>
  );
};

export default JobListing;
