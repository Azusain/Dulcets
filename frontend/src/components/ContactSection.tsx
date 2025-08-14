import React from 'react';
import { ComponentWithTranslation } from "@/components/MainPage";

export default function ContactSection({ t }: ComponentWithTranslation) {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Map */}
          <div className="order-2 lg:order-1">
            {/* Map */}
            <div>
              <h3 className="text-2xl font-light mb-6">Visit Us</h3>
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
              <h1 className="text-5xl font-light text-black mb-4">Contact</h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Get in touch with us for your next project. We're here to help bring your musical vision to life.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Get a Quote</h3>
                <p className="text-gray-700 mb-4">
                  Ready to start your project? Reach out to us for a personalized quote and consultation.
                </p>
                <a 
                  href="mailto:dulcets.info@gmail.com"
                  className="inline-flex items-center text-black hover:text-gray-700 transition-colors font-medium mb-4"
                >
                  dulcets.info@gmail.com
                  <span className="ml-2">→</span>
                </a>
                
                <div className="mt-4">
                  <a 
                    href="mailto:dulcets.info@gmail.com"
                    className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium rounded-lg"
                  >
                    Send us an Email
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-black mb-3">Follow Us</h3>
                <p className="text-gray-700 mb-6">
                  Stay connected and check out our latest work across our social platforms.
                </p>
                
                {/* Social Media Icons - Bigger */}
                <div className="flex flex-wrap gap-4">
                  {/* Gmail */}
                  <a 
                    href="mailto:dulcets.info@gmail.com"
                    className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group"
                    aria-label="Email"
                  >
                    <svg className="w-7 h-7 text-gray-700 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.727L12 10.845l8.637-7.024h1.727c.904 0 1.636.732 1.636 1.636z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://www.youtube.com/@Dulcets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors group"
                    aria-label="YouTube"
                  >
                    <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href="https://x.com/Dulcets_offical"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  </a>

                  {/* Bilibili */}
                  <a 
                    href="https://space.bilibili.com/3546744298146784"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors group"
                    aria-label="Bilibili"
                  >
                    <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM6.745 14.747V10.96c.018-.267.126-.474.32-.622.196-.148.41-.222.645-.222h8.58c.235 0 .449.074.645.222.194.148.302.355.32.622v3.787c-.018.267-.126.474-.32.622-.196.148-.41.222-.645.222h-8.58c-.235 0-.449-.074-.645-.222-.194-.148-.302-.355-.32-.622zm2.4-1.067v-.533h5.688v.533z"/>
                    </svg>
                  </a>

                  {/* NicoVideo */}
                  <a 
                    href="https://www.nicovideo.jp/user/134411796"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors group"
                    aria-label="NicoVideo"
                  >
                    <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.704c-.72 1.152-1.728 2.016-3.024 2.592-1.296.576-2.688.864-4.176.864s-2.88-.288-4.176-.864c-1.296-.576-2.304-1.44-3.024-2.592C2.736 15.552 2.304 14.304 2.304 12.96s.432-2.592 1.296-3.744c.72-1.152 1.728-2.016 3.024-2.592C7.92 6.048 9.312 5.76 10.8 5.76s2.88.288 4.176.864c1.296.576 2.304 1.44 3.024 2.592.864 1.152 1.296 2.4 1.296 3.744s-.432 2.592-1.296 3.744z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
