import React, { useMemo } from "react";
import Tags from "./Tags";
import styles from './jobcard.module.css';

export interface JobCardProps {
    id: number;
    company: string;
    logo: string;
    new: boolean;
    featured: boolean;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
};

const JobCard: React.FC<JobCardProps> = (props) => {

    const { company,contract, featured, languages,level,location,logo, new: newTag ,position,postedAt, role,tools } = props;
    
    const languageData: string[] = useMemo(() => {
        return [role,level, ...languages, ...tools];
    }, [languages, level, role, tools]);

    return(
        <div className={`${styles.job_card} ${featured && styles.featured} mb-4`}>
            <div className="row">

                <div className="col-lg-2 d-flex align-items-center justify-content-center img_area">
                    <img src={logo} className={styles.org_img} alt="orgicon" height={90} width={90} />
                </div>

                <div className={`${styles.content_area} col-lg-4 d-flex flex-column justify-content-between align-items-start`}>
                    <div className="tag_header">
                        <span className={styles.org_name}> {company} </span>
                        <Tags newTag={newTag} /> <Tags featured={featured} />
                    </div>
                    <div className={`${styles.role} text-capitalize fw-bold`}>
                       {position}
                    </div>
                    <div className={`${styles.status_footer} d-flex align-items-center justify-content-between`}>
                        <div> {postedAt} </div>
                        <span className={styles.dot_separator}></span>
                        <div className="text-capitalize"> {contract} </div>
                        <span className={styles.dot_separator}></span>
                        <div> {location} </div>
                    </div>
                </div>

                <hr className={`${styles.divider} w-75 my-3`} />

                <div className={`${styles.tag_area} col-lg-6 d-flex align-items-center justify-content-end`}>
                    <Tags languages={languageData} />
                </div>
            </div>
        </div>
    )
}

export default JobCard;