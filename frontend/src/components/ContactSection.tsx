"use client";
import React, { useState } from 'react';
import { ComponentWithTranslation } from "@/components/MainPage";

export default function ContactSection({ t }: ComponentWithTranslation) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailClickMessage, setEmailClickMessage] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('dulcets.info@gmail.com');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleEmailClick = () => {
    setEmailClickMessage('Opening your default email application...');
    setTimeout(() => setEmailClickMessage(''), 3000);
  };
  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Map */}
          <div className="order-2 lg:order-1">
            {/* Map */}
            <div>
              <h3 className="text-2xl font-light mb-6">{t("contact.visit_us")}</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.8234!2d139.7459!3d35.7362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d64e4b71111%3A0x1234567890abcdef!2s3-1-3+Komagome%2C+Toshima+City%2C+Tokyo+170-0003%2C+Japan!5e0!3m2!1sen!2sus!4v1639234567890!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dulcets Location - Komagome, Toshima, Tokyo"
                ></iframe>
                <div className="p-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <p className="text-gray-900 font-medium">〒170-0003 東京都豊島区駒込3－1－3</p>
                      <p className="text-gray-600 text-sm">エコプレイス駒込Ａ－２１６</p>
                      <p className="text-gray-500 text-xs mt-1">Dulcets Professional Music Studio</p>
                      <p className="text-gray-500 text-xs">Komagome, Toshima City, Tokyo, Japan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h1 className="text-6xl font-light text-black mb-4">{t("contact.title")}</h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t("contact.description")}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-black mb-3">{t("contact.get_quote")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("contact.quote_description")}
                </p>
                <div className="text-2xl font-medium text-black my-16">
                  dulcets.info@gmail.com
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href="mailto:dulcets.info@gmail.com"
                    onClick={handleEmailClick}
                    className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium rounded-lg relative cursor-pointer"
                  >
                    {t("contact.send_email")}
                    {emailClickMessage && (
                      <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-10">
                        {emailClickMessage}
                      </span>
                    )}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="inline-block bg-gray-200 text-black px-8 py-3 hover:bg-gray-300 transition-colors font-medium rounded-lg relative cursor-pointer"
                  >
                    {t("contact.copy_email")}
                    {copySuccess && (
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-10">
                        {t("contact.email_copied")}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
