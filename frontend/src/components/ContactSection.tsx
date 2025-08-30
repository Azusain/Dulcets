"use client";
import React, { useState } from "react";
import { ComponentWithTranslation } from "@/components/MainPage";

export default function ContactSection({ t }: ComponentWithTranslation) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailClickMessage, setEmailClickMessage] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("dulcets.info@gmail.com");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleEmailClick = () => {
    setEmailClickMessage(t("contact.opening_email_app"));
    setTimeout(() => setEmailClickMessage(""), 3000);
  };
  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Right side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h1 className="text-6xl font-light text-black mb-4">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t("contact.description")}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-black mb-3">
                  {t("contact.get_quote")}
                </h3>
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
                    className="inline-block text-white px-8 py-3 transition-colors font-medium rounded-lg relative cursor-pointer"
                    style={{
                      backgroundColor: "#5865F2",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4752C4";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#5865F2";
                    }}
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
