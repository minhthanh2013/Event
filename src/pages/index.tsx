import Head from 'next/head';
import * as React from 'react';

const Home = props => {
    console.log(props)
    const { title } = props;
    return (
        <><Head>
            <title>{title}</title>
        </Head><h1>Home {title}</h1></>
    );
};

export default Home;