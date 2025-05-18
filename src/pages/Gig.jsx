"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardService from "../components/ui/CardService";
import "./gig.css";
import GigDesc from "../components/ui/GigDesc";
import GigAbout from "../components/ui/GigAbout";
import SellerAbout from "../components/ui/SellerAbout";
import ComparePackage from "../components/ui/ComparePackage";
import ReviewsRate from "../components/ui/ReviewsRate";
import ReviewsComment from "../components/ui/ReviewsComment";

const sellerData = {
  profilePicture:
    "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
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
-Airbluesoft Premium Digital Studio-`,
};

const comments = {
  user: {
    name: "marvinachi",
    initials: "M",
    country: "United States",
    avatar: "https://example.com/avatar.jpg",
    flag: "https://example.com/us-flag.png",
  },
  rating: 5,
  content:
    "Great work! I wanted a video to showcase my fitness app and the seller delivered exactly what I needed. The communication was excellent throughout the process, and they were very responsive to my feedback. The final video looks professional and has already helped increase downloads. Highly recommended!",
  helpfulVotes: { yes: 12, no: 3 },
  response: {
    avatar: "https://example.com/seller-avatar.jpg",
    initials: "S",
    message:
      "Thank you so much for your kind words! It was a pleasure working on your fitness app promo. I'm thrilled to hear that it's already helping with downloads. If you need any updates or new videos in the future, don't hesitate to reach out!",
    timestamp: "2 months ago",
  },
};

const packageData = {
  headers: [
    {
      title: "Basic",
      price: "1000.00 da",
      description:
        "BASIC PROMO\nBasic Package Only Laptop-scenes Includes, Background Music, Logo, and 720HD Video",
      color: "#ff7c43",
      total: "1000.00da",
    },
    {
      title: "Standard",
      price: "1500.00 da",
      description:
        "STANDARD PROMO\nStandard Package Laptop,Tab-scenes includes , Logo, Background Music and 1080 HD Video",
      color: "#ff7c43",
      total: "1000.00da",
    },
    {
      title: "Premium",
      price: "10000.00 da",
      description:
        "PREMIUM PROMO\nPremium Package Laptop,Tab,Mobile Logo, Music, and 1080HD video and Screen Recording",
      color: "#ff7c43",
      total: "1000.00da",
    },
  ],
  rows: [
    {
      label: "Screen recording",
      type: "feature",
      values: [false, false, true],
    },
    {
      label: "Add logo",
      type: "feature",
      values: [true, true, true],
    },
    {
      label: "Dynamic transitions",
      type: "feature",
      values: [false, false, true],
    },
    {
      label: "Number of captions",
      type: "text",
      values: [8, 10, 15],
    },
    {
      label: "Number of screenshots",
      type: "text",
      values: [5, 7, 10],
    },
    {
      label: "Running time (seconds)",
      type: "text",
      values: [30, 40, 60],
    },
    {
      label: "Revisions",
      type: "text",
      values: [1, 2, 3],
    },
    {
      label: "Delivery Time",
      type: "text",
      values: ["4 days", "3 days", "2 days"],
    },
  ],
};

const reviewData = {
  title: "Reviews",
  totalReviews: 902,
  averageRating: 4.9,
  starCounts: [852, 37, 9, 2, 2],
  ratingBreakdown: [
    { criteria: "Seller communication level", rating: 4.9 },
    { criteria: "Recommend to a friend", rating: 4.9 },
    { criteria: "Service as described", rating: 4.9 },
  ],
};

function Gig() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loadingGig, setLoadingGig] = useState(true);
  const [loadingSeller, setLoadingSeller] = useState(true);

  // Fetch gig data from the backend.
  useEffect(() => {
    fetch(`http://localhost:5000/api/gigs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch gig data, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure images is always an array.
        setGig({ ...data, images: data.images || [] });
        setLoadingGig(false);
      })
      .catch((err) => {
        console.error("Error fetching gig data:", err);
        setGig({ images: [], description: "" });
        setLoadingGig(false);
      });
  }, [id]);

  // Fetch seller/freelancer data using gig.userId from the freelancer endpoint.
  useEffect(() => {
    if (gig && gig.userId) {
      fetch(`http://localhost:5000/api/users/${gig.userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch freelancer data, status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // If a seller exists in the response, use it; otherwise, set to null.
          setSeller(data.user ? data.user : null);
          setLoadingSeller(false);
        })
        .catch((err) => {
          console.error("Error fetching freelancer data:", err);
          setSeller(null);
          setLoadingSeller(false);
        });
    } else {
      setSeller(null);
      setLoadingSeller(false);
    }
  }, [gig]);
  useEffect(() => {
  if (gig && gig.userId) {
    fetch(`http://localhost:5000/api/users/${gig.userId}`)
      .then(res => res.json())
      .then(sellerData => {
        setSeller({
          profilePicture: sellerData.image || "/placeholder.svg",
          username: sellerData.name,
          studioName: sellerData.address?.city ? `Studio de ${sellerData.address.city}` : "Studio Indépendant",
          rating: 4.9, // Valeur par défaut
          feedbackCount: sellerData.completedOrders || 0,
          location: sellerData.address?.country || "Localisation inconnue",
          memberSince: new Date(sellerData.createdAt).toLocaleDateString("fr-FR"),
          responseTime: "1-2 heures", // Valeur par défaut
          lastDelivery: "N/A", // Valeur par défaut
          languages: [sellerData.address?.country === "Algeria" ? "Arabe" : "Français"],
          description: sellerData.description || "Aucune description fournie"
        });
      })
      .catch(() => setSeller(null));
  }
}, [gig]);

  const loading = loadingGig || loadingSeller;
  if (loading) return <div>Loading...</div>;

  // Build dynamic package data for ComparePackage from gig.packages – fallback to static packageData.
  const dynamicPackageData =
    gig && gig.packages
      ? {
          headers: [
            {
              title: "Basic",
              price: gig.packages.basic.price + " da",
              description: gig.packages.basic.description,
              color: "#ff7c43",
              total: gig.packages.basic.price + " da",
            },
            {
              title: "Standard",
              price: gig.packages.standard.price + " da",
              description: gig.packages.standard.description,
              color: "#ff7c43",
              total: gig.packages.standard.price + " da",
            },
            {
              title: "Premium",
              price: gig.packages.premium.price + " da",
              description: gig.packages.premium.description,
              color: "#ff7c43",
              total: gig.packages.premium.price + " da",
            },
          ],
          rows: [
            {
              label: "Included Services",
              type: "text",
              values: [
                (gig.packages.basic.includedServices || []).join(", "),
                (gig.packages.standard.includedServices || []).join(", "),
                (gig.packages.premium.includedServices || []).join(", "),
              ],
            },
          ],
        }
      : packageData;

  // Build dynamic CardService packages from gig.packages.
  const cardServicePackages =
    gig && gig.packages
      ? ["basic", "standard", "premium"].map((pkgName) => {
          const pkg = gig.packages[pkgName];
          return {
            name: pkgName.charAt(0).toUpperCase() + pkgName.slice(1),
            promoName: pkgName.toUpperCase() + " PROMO",
            price: pkg.price + " da",
            description: pkg.description,
            deliveryDays: pkg.deliveryDays || 3,
            revisions: pkg.revisions || 1,
            features: (pkg.includedServices || []).map((service) => ({
              text: service,
              included: true,
              icon: "FaCheckCircle",
            })),
          };
        })
      : [];

  // Compute dynamic review data from seller.reviews if available.
  let dynamicReviewData = reviewData;
  if (seller && seller.reviews && seller.reviews.length > 0) {
    const reviewsArray = seller.reviews;
    const totalReviews = reviewsArray.length;
    const averageRating =
      reviewsArray.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
    const starCounts = [0, 0, 0, 0, 0];
    reviewsArray.forEach((r) => {
      const index = r.rating - 1;
      if (index >= 0 && index < 5) starCounts[index]++;
    });
    dynamicReviewData = {
      title: "Reviews",
      totalReviews,
      averageRating: averageRating.toFixed(1),
      starCounts,
      ratingBreakdown: reviewData.ratingBreakdown,
    };
  }

  return (
    <div className="gig-container">
      <div className="left-column">
        <GigDesc data={gig || {}} seller={seller} />
        <GigAbout description={gig?.description || "No description available"} />
        {seller ? (
          <SellerAbout data={seller} />
        ) : (
          <div>No seller available</div>
        )}
        <ComparePackage data={dynamicPackageData} />
        <ReviewsRate {...dynamicReviewData} />
        <ReviewsComment {...comments} />
      </div>
      <div className="right-column">
        <CardService packages={cardServicePackages} gigId={id} />
        <button className="contact-seller">Contact Seller</button>
      </div>
    </div>
  );
}

export default Gig;
