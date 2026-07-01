import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Company from "../models/Company.js";
import Review from "../models/Review.js";

const companies = [
  {
    name: "Graffersid Web and App Development",
    location: "402, Onam Plaza, Vijay Nagar, Indore, Madhya Pradesh, India",
    city: "Indore",
    foundedOn: new Date("2016-03-12"),
    logoUrl: "",
    description:
      "Graffersid is a full-service web and mobile app development company helping startups and enterprises build digital products.",
  },
  {
    name: "Code Tech Company",
    location: "12, MG Road, Bengaluru, Karnataka, India",
    city: "Bengaluru",
    foundedOn: new Date("2014-07-01"),
    logoUrl: "",
    description:
      "Code Tech Company specializes in enterprise software solutions and cloud consulting.",
  },
  {
    name: "Pixel Forge Studio",
    location: "56, FC Road, Pune, Maharashtra, India",
    city: "Pune",
    foundedOn: new Date("2019-01-20"),
    logoUrl: "",
    description: "A design-first product studio crafting delightful digital experiences.",
  },
  {
    name: "Nimbus Cloud Systems",
    location: "9, Cyber Hub, Gurugram, Haryana, India",
    city: "Gurugram",
    foundedOn: new Date("2012-11-05"),
    logoUrl: "",
    description: "Cloud infrastructure and DevOps consulting for growing businesses.",
  },
];

const reviewTexts = [
  "The team was incredibly responsive and delivered exactly what we needed on time. Communication throughout the project was excellent and the quality of work exceeded our expectations.",
  "Great experience working with this company. They understood our requirements quickly and the final product was polished and bug-free. Would definitely recommend to others.",
  "Good service overall, though there were a few minor delays in the timeline. The support team was helpful in resolving issues and kept us updated regularly.",
  "Outstanding work from start to finish. The developers were skilled and proactive, suggesting improvements we hadn't even considered. Very happy with the outcome.",
  "Solid company to work with. Pricing was fair and transparent, and the project management process made it easy to track progress at every stage.",
];

const reviewers = [
  { fullName: "Jorgue Watson", subject: "Excellent development partner", rating: 5 },
  { fullName: "Jenny Kole", subject: "Great communication and quality", rating: 4 },
  { fullName: "Ayush Patel", subject: "Good experience overall", rating: 3 },
  { fullName: "Priya Sharma", subject: "Highly recommended team", rating: 5 },
  { fullName: "Daniel Craig", subject: "Reliable and professional", rating: 4 },
];

const run = async () => {
  await connectDB();

  await Review.deleteMany({});
  await Company.deleteMany({});

  const createdCompanies = await Company.insertMany(companies);

  const graffersid = createdCompanies[0];

  const reviews = reviewers.map((r, i) => ({
    company: graffersid._id,
    fullName: r.fullName,
    subject: r.subject,
    text: reviewTexts[i % reviewTexts.length],
    rating: r.rating,
    avatarUrl: "",
    likes: Math.floor(Math.random() * 20),
  }));

  await Review.insertMany(reviews);

  console.log(`Seeded ${createdCompanies.length} companies and ${reviews.length} reviews.`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
