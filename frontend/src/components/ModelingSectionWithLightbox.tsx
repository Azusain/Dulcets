'use client';

import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../styles/lightbox.css';

interface Model {
  id: number;
  title: string;
  image: string;
}

const models: Model[] = [
  { id: 1, title: '3D作品 1', image: '/images/modeling/model1.jpg' },
  { id: 2, title: '3D作品 2', image: '/images/modeling/model2.jpg' },
  { id: 3, title: '3D作品 3', image: '/images/modeling/model3.jpg' },
  { id: 4, title: '3D作品 4', image: '/images/modeling/model4.jpg' },
  { id: 5, title: '3D作品 5', image: '/images/modeling/model5.jpg' },
  { id: 6, title: '3D作品 6', image: '/images/modeling/model6.jpg' },
  { id: 7, title: '3D作品 7', image: '/images/modeling/model7.jpg' },
  { id: 8, title: '3D作品 8', image: '/images/modeling/model8.jpg' },
];

const PolaroidPhoto = ({ model, onClick, index }: { model: Model; onClick: () => void; index: number }) => {
  const rotations = [-8, 5, -3, 12, -5, 8, -10, 3];
  
  return (
    <div
      className="polaroid-photo"
      style={{
        transform: `rotate(${rotations[index % rotations.length]}deg)`,
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={onClick}
    >
      <div className="polaroid-frame">
        <img src={model.image} alt={model.title} />
      </div>

      <style jsx>{`
        .polaroid-photo {
          width: 200px;
          height: 240px;
          background: white;
          padding: 15px 15px 45px 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform-origin: center;
          flex-shrink: 0;
        }

        .polaroid-photo:hover {
          transform: rotate(0deg) scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          z-index: 10;
        }

        .polaroid-frame {
          width: 100%;
          height: 170px;
          overflow: hidden;
          background: #f8f8f8;
        }

        .polaroid-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(var(--initial-rotation));
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(var(--initial-rotation));
          }
        }
      `}</style>
    </div>
  );
};

export default function ModelingSectionWithLightbox() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightboxImages = models.map(model => ({
    src: model.image,
    alt: model.title,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="modeling-section">
      <div className="container">
        <h2 className="section-title">3D建模服务</h2>
        
        <div className="polaroid-container">
          <div className="polaroid-scroll">
            {models.map((model, index) => (
              <PolaroidPhoto
                key={model.id}
                model={model}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={currentImageIndex}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          }}
        />
      )}

      <style jsx>{`
        .modeling-section {
          min-height: 40vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
          padding: 50px 0;
        }

        .modeling-section::before {
          content: '';
          position: absolute;
          top: 20%;
          left: -10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
        }

        .modeling-section::after {
          content: '';
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .section-title {
          font-size: 4rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          text-shadow: 
            8px 8px 0px #06b6d4,
            16px 16px 0px #a855f7;
          letter-spacing: 2px;
        }

        .polaroid-container {
          display: flex;
          justify-content: center;
          width: 100%;
          overflow-x: auto;
          padding: 20px 0;
        }

        .polaroid-scroll {
          display: flex;
          gap: 30px;
          padding: 0 20px;
          align-items: center;
          min-width: max-content;
        }

        .polaroid-container::-webkit-scrollbar {
          height: 8px;
        }

        .polaroid-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.6);
          border-radius: 4px;
        }

        .polaroid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
            text-shadow: 
              4px 4px 0px #06b6d4,
              8px 8px 0px #a855f7;
          }
          
          .modeling-section {
            min-height: 35vh;
            padding: 30px 0;
          }
        }
      `}</style>
    </section>
  );
}
