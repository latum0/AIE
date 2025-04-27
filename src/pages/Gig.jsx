import React, { useState } from 'react'
import CardService from '../components/ui/CardService'
import { FaCheckCircle, FaClock, FaSyncAlt } from 'react-icons/fa';
import './Gig.css'
import GigDesc from '../components/ui/GigDesc';
import GigAbout from '../components/ui/GigAbout';
import SellerAbout from '../components/ui/SellerAbout';
import ComparePackage from '../components/ui/ComparePackage';
import ReviewsRate from '../components/ui/ReviewsRate';
import ReviewsComment from '../components/ui/ReviewsComment'


const sellerData = {
  profilePicture: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  username: "airb123",
  studioName: "Premium Digital Studio",
  rating: 4.9,
  feedbackCount: 974,
  location: "Sri Lanka",
  memberSince: "Aug 2019",
  responseTime: "1 hour",
  lastDelivery: "about 3 hours",
  languages: ["English"],
  description: `At Airbluesoft Premium Digital Studio we create all kinds of creative videos, specializing in Creating Promos (Website, Apps, Fashion, Real Estate, Youtube, NFT) and all other promos and all instructional videos.

We Create Basic To High-End Videos.

Creativity Beyond the Limits.
-Airbluesoft Premium Digital Studio-`
};

const comments = {
  user: {
    name: "marvinachi",
    initials: "M",
    country: "United States",
    avatar: "https://example.com/avatar.jpg",
    flag: "https://example.com/us-flag.png"
  },
  rating: 5,
  content: "Great work! I wanted a video to showcase my fitness app...",
  helpfulVotes: { yes: 12, no: 3 },
  response: {
    avatar: "https://example.com/seller-avatar.jpg",
    initials: "S",
    message: "Thank you so much!",
    timestamp: "2 months ago"
  }
};


const packageData = {
  headers: [
    {
      title: 'Basic',
      price: '1000.00 da',
      description: 'BASIC PROMO\nBasic Package Only Laptop-scenes Includes, Background Music, Logo, and 720HD Video',
      color: '#ff7c43',
      total: '1000.00da'
    },
    {
      title: 'Standard',
      price: '1500.00 da',
      description: 'STANDARD PROMO\nStandard Package Laptop,Tab-scenes includes , Logo, Background Music and 1080 HD Video',
      color: '#ff7c43',
      total: '1000.00da'
    },
    {
      title: 'Premium',
      price: '10000.00 da',
      description: 'PREMIUM PROMO\nPremium Package Laptop,Tab,Mobile Logo, Music, and 1080HD video and Screen Recording',
      color: '#ff7c43',
      total: '1000.00da'
    }
  ],
  rows: [
    {
      label: 'Screen recording',
      type: 'feature',
      values: [false, false, true]
    },
    {
      label: 'Add logo',
      type: 'feature',
      values: [true, true, true]
    },
    {
      label: 'Dynamic transitions',
      type: 'feature',
      values: [false, false, true]
    },
    {
      label: 'Number of captions',
      type: 'text',
      values: [8, 10, 15]
    },
    {
      label: 'Number of screenshots',
      type: 'text',
      values: [5, 7, 10]
    },
    {
      label: 'Running time (seconds)',
      type: 'text',
      values: [30, 40, 60]
    },
    {
      label: 'Revisions',
      type: 'text',
      values: [1, 2, 3]
    },
    {
      label: 'Delivery Time',
      type: 'text',
      values: ['4 days', '3 days', '2 days']
    }
  ]
};


const reviewData = {
  title: "Reviews",
  totalReviews: 902,
  averageRating: 4.9,
  starCounts: [852, 37, 9, 2, 2],
  ratingBreakdown: [
    { criteria: "Seller communication level", rating: 4.9 },
    { criteria: "Recommend to a friend", rating: 4.9 },
    { criteria: "Service as described", rating: 4.9 }
  ]
};


function Gig() {
  
  const packages = [
    {
      name: 'Basic',
      promoName: 'BASIC PROMO',
      price: '8000DA',
      description: 'Basic Package Only Laptop-scenes Includes, Background Music, Logo, and 720HD Video',
      deliveryDays: 4,
      revisions: 1,
      features: [
        { text: '8 captions', included: true, icon: 'FaCheckCircle' },
        { text: '5 screenshots', included: true, icon: 'FaCheckCircle' },
        { text: 'Screen recording', included: false, icon: 'FaTimesCircle' },
        { text: 'Add logo', included: true, icon: 'FaCheckCircle' },
        { text: 'Dynamic transitions', included: true, icon: 'FaCheckCircle' },
        { text: '30 seconds running time', included: true, icon: 'FaCheckCircle' },
      ]
    },
    {
      name: 'Standard',
      promoName: 'STANDARD PROMO',
      price: '1299DA',
      description: 'Standard Package Includes Full Scenes, HD Quality, and Unlimited Revisions',
      deliveryDays: 3,
      revisions: 'Unlimited',
      features: [
        { text: '12 captions', included: true, icon: 'FaCheckCircle' },
        { text: '10 screenshots', included: true, icon: 'FaCheckCircle' },
        { text: 'Screen recording', included: true, icon: 'FaCheckCircle' },
        { text: 'Custom animations', included: true, icon: 'FaCheckCircle' },
        { text: 'Voiceover', included: true, icon: 'FaCheckCircle' },
        { text: '1 minute runtime', included: true, icon: 'FaCheckCircle' },
      ]
    },
    {
      name: 'Premium',
      promoName: 'PREMIUM PROMO',
      price: '1999DA',
      description: 'Premium Package with Exclusive Features and Priority Support',
      deliveryDays: 2,
      revisions: 'Unlimited',
      features: [
        { text: '20 captions', included: true, icon: 'FaCheckCircle' },
        { text: '15 screenshots', included: true, icon: 'FaCheckCircle' },
        { text: 'Live streaming', included: true, icon: 'FaCheckCircle' },
        { text: '3D modeling', included: true, icon: 'FaCheckCircle' },
        { text: 'Priority support', included: true, icon: 'FaCheckCircle' },
        { text: '2 minutes runtime', included: true, icon: 'FaCheckCircle' },
      ]
    }
  ];



  const gigData = {
    title: "I will create an amazing website or app promo video",
    username: "airb123",
    profilePicture: "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/dossier/773/01-intro-773.jpg",
    rating: 4.8,
    feedbackCount: 902,
    queueCount: 3,
    images: [
      "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/dossier/773/01-intro-773.jpg",
      "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/dossier/773/01-intro-773.jpg",
      "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/dossier/773/01-intro-773.jpg",
      
    ]
  };


  const [dataGig, setDataGig] = useState({description: `Website,Apps,Fashion,Youtube,R
    eal Estate or any other ), you are at the right gig.
    We create Basic to High-End Promotion Videos , delivering the highest quality work.
    
    We can create all kinds of promotion videos ... We create the video according to your requirements. we can discuss everything and can arrange things according to your requirements.
    Our main focus is customer satisfaction, We will ensure 100% customer satisfaction.
    We highly concerned with the Premium Quality while providing the affordable service.
    
    We consider each project as a project for us and deliver the highest quality work.
    
    So why are you still waiting, contact us and we can start the work.
    
    What do i need in order to start work?
    Logo
    Text Descriptions
    Screen Images
    Video (If any related stock videos if you have only )
    Website Address
    
    FOR CUSTOM ORDERS
    If you want to create totally unique Customized video with Voice over (men/women voice)...Prices Vary. Just Contact US to discuss further.`});

  




 
    


  return (
    <div className="gig-container">
    <div className="left-column">
      <GigDesc data={gigData} />
      <GigAbout description={dataGig.description}/>
      <SellerAbout data={sellerData} />
      <ComparePackage data={packageData} />
      <ReviewsRate {...reviewData} />
      <ReviewsComment {...comments} />
    </div>
    <div className="right-column">
      <CardService packages={packages} />
      <button className="contact-seller">Contact Seller</button>
    </div>
  </div>
  )
}

export default Gig