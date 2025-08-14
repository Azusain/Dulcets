"use client";

import { useState } from 'react';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export const ServiceCard = ({ image, title, description, href = "#", delay = 0 }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="service-card group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} className="block relative w-full h-full">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
          />
          
          {/* Clean hover effect - subtle scale only */}
          <div 
            className={`absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isHovered 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-0 transform scale-75'
            }`}
          >
            <svg 
              className="w-4 h-4 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        
        {/* Content Below Image */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};

// Services Grid Component
export const ServicesGrid = () => {
  const services = [
    {
      image: "https://www.dmoe.cc/random.php?service1",
      title: "音楽制作",
      description: "オリジナル楽曲からカバー作品まで、多様なジャンルの音楽制作をプロフェッショナルなクオリティでお届けします。",
    },
    {
      image: "https://www.dmoe.cc/random.php?service2", 
      title: "動画・映像制作",
      description: "MV制作から企業プロモーション映像まで、クリエイティブな映像コンテンツを制作いたします。",
    },
    {
      image: "https://www.dmoe.cc/random.php?service3",
      title: "イラスト制作", 
      description: "キャラクターデザインから背景イラストまで、二次元風格の美しいアートワークを制作します。",
    },
    {
      image: "https://www.dmoe.cc/random.php?service4",
      title: "3D建模服务",
      description: "虚拟角色から環境モデリングまで、高品質な3Dコンテンツ制作をトータルサポートします。",
    },
    {
      image: "https://www.dmoe.cc/random.php?service5",
      title: "ミキシング・マスタリング",
      description: "プロフェッショナルな音響処理により、楽曲の完成度を最高レベルまで引き上げます。",
    },
    {
      image: "https://www.dmoe.cc/random.php?service6",
      title: "Live2D制作",
      description: "キャラクターに生命を吹き込む高品質なLive2Dモデル制作とアニメーション制作。",
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-500 bg-white px-4 py-2">
              Services
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            クリエイティブサービス
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            音楽・映像・アートなど多岐にわたるクリエイティブ制作の経験をもとに、
            お客様の課題に真摯に向き合い、結果の出せるクリエイティブをご提案します。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
