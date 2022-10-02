import React, { useEffect } from "react";
import Meta, { MetaProps } from "../../components/common/Meta";
import './index.css';

export interface StatsPreviewCardProps { }

const metaData:MetaProps = {
    title: 'Stats Preview Card Component',
    desc: 'Stats Preview component UI using React Js',
    keywords: 'Stats Preview Card, Stats Card Component, Preview Card component'
}

const StatsPreviewCard: React.FC<StatsPreviewCardProps> = () => {

    return (
        <>
            <Meta {...metaData} />
            <div className="body-wrapper">
                <div className="box-wrapper">
                        <div className="text-wrapper">
                            <h1>Get<span> insights </span>that help your business grow.</h1>
                            <p>
                                Discover the benefits of data analytics and make better decisions
                                regarding revenue, customer experience, and overall efficiency.
                            </p>
                            <div className="updates-container">
                                <div className="update-text">
                                    <h1>10k+</h1>
                                    <p>COMPANIES</p>
                                </div>
                                <div className="update-text">
                                    <h1>314</h1>
                                    <p>TEMPLATES</p>
                                </div>
                                <div className="update-text">
                                    <h1>12M+</h1>
                                    <p>QUERIES</p>
                                </div>
                            </div>
                        </div>
                    <div className="box-img-section">
                        <div className="img-overlay"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatsPreviewCard;