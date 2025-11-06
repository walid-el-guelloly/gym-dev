import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-white text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-400">Your message has been sent successfully</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black-800 border-2 border-gray-600 rounded-lg p-8">
      <h2 className="text-white text-3xl font-bold mb-2">Get in Touch</h2>
      <p className="text-gray-400 mb-8">We'd love to hear from you. Send us a message!</p>
      <div className="space-y-6">
        <div>
          <label className="text-white text-sm mb-2 block">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-black border border-gray-700 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
          />
        </div>
        <div>
          <label className="text-white text-sm mb-2 block">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-black border border-gray-700 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
          />
        </div>
        <div>
          <label className="text-white text-sm mb-2 block">Message</label>
          <textarea
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows="6"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition resize-none"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
