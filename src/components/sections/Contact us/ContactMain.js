import React from "react";
import RatingSection from "./RatingSection";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactMain() {
  return (
    <div className="min-h-screen bg-black">
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-white text-6xl font-bold mb-4">
              Contact <span className="text-red-600">Us</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions or feedback? We're here to help! Reach out to us
              and share your experience with our services.
            </p>
          </div>
          {/* First Section - Just Rating Stars */}
          <div className="max-w-4xl mx-auto mb-12">
            <RatingSection />
          </div>
          {/* Second Section - Contact Form with Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
