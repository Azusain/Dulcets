import { ComponentWithTranslation } from "@/components/MainPage";

// Polaroid component with interactive effects (CSS-only)
const PolaroidPhoto = ({ src, alt, className, style, delay = 0 }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) => {
  return (
    <div 
      className={`polaroid-photo group ${className}`} 
      style={{
        ...style,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="polaroid-frame bg-white shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 group-hover:shadow-2xl group-hover:z-20 relative">
        <div className="polaroid-image-container p-3 pb-16">
          <img 
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-center">
          <p className="text-sm text-gray-600 font-handwriting">{alt}</p>
        </div>
      </div>
    </div>
  );
};

export default function ArtworksSection({ t }: ComponentWithTranslation) {
  return (
    <>
      <style jsx>{`
        .polaroid-photo {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .polaroid-frame {
          border-radius: 2px;
          cursor: pointer;
        }
        
        .font-handwriting {
          font-family: 'Kalam', cursive;
        }
        
        .scattered-photos {
          position: relative;
          min-height: 600px;
        }
        
        @media (max-width: 768px) {
          .scattered-photos {
            min-height: 400px;
          }
        }
      `}</style>
      
      <section className="overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-black relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-12 md:grid-cols-none gap-x-8">
            {/* Text Content - Left Side */}
            <div className="col-start-1 col-end-5 py-24 xl:col-end-6 md:col-auto md:pb-0 md:pt-16">
              <div className="w-fit rounded-full py-2 px-4 text-xs font-medium uppercase leading-none tracking-wider text-pink-700 bg-white/70 backdrop-blur-sm border border-pink-200">
                ✨ Artwork
              </div>
              <h2 className="mt-6 text-9xl font-bold leading-none xl:text-8xl md:text-7xl sm:text-6xl relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 relative">
                  绘画作品
                  <span className="absolute inset-0 text-pink-300 -z-10 translate-x-3 translate-y-3 opacity-40">绘画作品</span>
                </span><br />
                <span className="text-gray-800">展示</span>
              </h2>
              <p className="mr-12 mt-8 text-lg leading-relaxed xl:mr-0 xl:text-base md:mt-6 md:max-w-xl text-gray-700">
                精选二次元风格绘画作品，融合传统艺术与现代数字创作技术，展现独特的艺术视觉魅力和创意表达。
              </p>
              <div className="mt-8 space-y-4 xl:mt-6 md:mt-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">角色设计与概念艺术</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">场景插画与环境设计</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">数字绘画与传统艺术</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 mt-8 xl:mt-6 md:mt-4" href="#">
                查看作品集
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Scattered Polaroid Photos - Right Side */}
            <div className="col-start-5 col-end-13 py-12 xl:col-start-6 md:col-auto md:py-8">
              <div className="scattered-photos relative">
                {/* Photo 1 - Top Left */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?1"
                  alt="角色设计"
                  className="absolute top-0 left-0 w-48 md:w-36 sm:w-32"
                  style={{ transform: 'rotate(-8deg)' }}
                  delay={100}
                />
                
                {/* Photo 2 - Top Right */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?2"
                  alt="场景插画"
                  className="absolute top-12 right-8 w-56 md:w-40 sm:w-36"
                  style={{ transform: 'rotate(12deg)' }}
                  delay={300}
                />
                
                {/* Photo 3 - Middle Left */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?3"
                  alt="概念艺术"
                  className="absolute top-48 left-16 w-52 md:w-38 sm:w-34"
                  style={{ transform: 'rotate(3deg)' }}
                  delay={500}
                />
                
                {/* Photo 4 - Bottom Right */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?4"
                  alt="数字绘画"
                  className="absolute bottom-8 right-0 w-44 md:w-34 sm:w-30"
                  style={{ transform: 'rotate(-15deg)' }}
                  delay={700}
                />
                
                {/* Photo 5 - Center (partially hidden) */}
                <PolaroidPhoto
                  src="https://www.dmoe.cc/random.php?11"
                  alt="环境设计"
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 md:w-32 sm:w-28 opacity-80"
                  style={{ transform: 'translateX(-50%) rotate(-2deg)', zIndex: -1 }}
                  delay={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
