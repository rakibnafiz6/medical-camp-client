import React from 'react';
import Banner from '../../components/Banner/Banner';
import HighsParticipant from '../../components/HighsParticipant/HighsParticipant';
import HealthTips from '../../components/HealthTips/HealthTips';
import ShowFeedback from '../../components/ShowFeedback/ShowFeedback';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section className='mt-10'>
                <HighsParticipant></HighsParticipant>
            </section>
            <section className='mt-10'>
                <ShowFeedback></ShowFeedback>
            </section>
            <section className='mt-10'>
                <HealthTips></HealthTips>
            </section>
        </div>
    );
};

export default Home;