'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">Contact</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">Get in Touch</h1>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-navy-900">Contact Information</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-navy-900">Email</h4>
                  <p className="mt-1 text-base text-gray-500">
                    <a
                      href="mailto:fengyun.yu@stud.uni-heidelberg.de"
                      className="text-navy-600 hover:text-navy-500"
                    >
                      fengyun.yu@stud.uni-heidelberg.de
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-navy-900">LinkedIn</h4>
                  <p className="mt-1 text-base text-gray-500">
                    <a
                      href="https://www.linkedin.com/in/fengyun-yu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-600 hover:text-navy-500"
                    >
                      linkedin.com/in/fengyun-yu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-900">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-900">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-900">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 