import React from 'react';
import Hero from '../components/ui/Hero';
import Features from '../components/ui/Features';
import Freelancers from '../components/ui/Freelancers';
import Latest from '../components/ui/Latest';
import Category from '../components/ui/Category';
import Portfolios from '../components/ui/Portfolios';

import FadeIn from '../components/ui/FadeIn';
import './Home.css';

function Home() {
    return (
        <div className="Home-container">


            <FadeIn>
                <Hero />
            </FadeIn>

            <FadeIn>
                <Features />
            </FadeIn>

            <FadeIn>
                <Freelancers />
            </FadeIn>

            <FadeIn>
                <Latest />
            </FadeIn>

            <FadeIn>
                <Category />
            </FadeIn>

            <FadeIn>
                <Portfolios />
            </FadeIn>


        </div>
    );
}

export default Home;