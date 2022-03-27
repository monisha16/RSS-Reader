import React,{useState,useEffect} from 'react';
import styles from './emptyfeeds.module.scss';

const EmptyFeeds = ({type}) => {
    return (
        <>
            { type === 'myFeeds' ?
                <div className={styles.container}>
                    <h1>My Feed</h1>
                    <div className={styles.content}>
                        <div className={styles.content__text}>{"You currently don't have any feeds added."}</div>
                        <button> + Add New Feed </button>
                    </div>
                </div>
            :
                <div className={styles.container}>
                    <h1>Bookmarks</h1>
                    <div className={styles.content}>
                        <div className={styles.content__text}>{"You currently don't have any bookmarks"}</div>
                        <button> Go to My Feeds </button>
                    </div>
                </div>
            }
        </>
        
    );
};

export default EmptyFeeds;