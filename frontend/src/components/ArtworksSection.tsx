"use client";
import { HomePageInterface } from "@/components/MainPage";

export default function ArtworksSection({ t }: HomePageInterface) {
  const artworks = [
    {
      id: 1,
      title: "星际漫游概念图",
      category: "科幻 / 场景设计",
      description: "未来宇宙飞船与行星景观的概念设计，融合科技与幻想元素",
      date: "2023.05",
      hoverColor: "rgba(236,72,153,0.3)"
    },
    {
      id: 2,
      title: "虚拟歌姬 - 星梦",
      category: "角色设计 / 二次元",
      description: "原创虚拟歌姬角色设计，融合未来科技感与日系二次元风格",
      date: "2023.03",
      hoverColor: "rgba(139,92,246,0.3)"
    },
    {
      id: 3,
      title: "赛博朋克城市夜景",
      category: "场景插画 / 科幻",
      description: "未来都市夜景插画，霓虹灯光与雨夜街道的氛围营造",
      date: "2023.01",
      hoverColor: "rgba(59,130,246,0.3)"
    },
    {
      id: 4,
      title: "幻想森林精灵",
      category: "角色插画 / 奇幻",
      description: "森林精灵角色插画，融合自然元素与梦幻色彩",
      date: "2022.12",
      hoverColor: "rgba(245,158,11,0.3)"
    },
    {
      id: 5,
      title: "机械少女",
      category: "角色设计 / 机械朋克",
      description: "融合机械元素与少女形象的角色设计，展现力量与美感",
      date: "2022.10",
      hoverColor: "rgba(16,185,129,0.3)"
    },
    {
      id: 6,
      title: "未来都市街景",
      category: "场景插画 / 未来主义",
      description: "未来都市的日常生活场景插画，展现科技与人文的融合",
      date: "2022.09",
      hoverColor: "rgba(239,68,68,0.3)"
    }
  ];

  return (
    <section id="artworks" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">绘画作品展示</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">精选二次元风格绘画作品，展现独特的艺术视觉魅力</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => {
            const getHoverColorClass = (color: string) => {
              switch (color) {
                case 'rgba(236,72,153,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]';
                case 'rgba(139,92,246,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]';
                case 'rgba(59,130,246,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]';
                case 'rgba(245,158,11,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]';
                case 'rgba(16,185,129,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]';
                case 'rgba(239,68,68,0.3)':
                  return 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]';
                default:
                  return 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]';
              }
            };
            
            return (
            <div 
              key={artwork.id}
              className={`artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 ${getHoverColorClass(artwork.hoverColor)}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://www.dmoe.cc/random.php" 
                  alt={artwork.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 text-white group-hover:text-pink-400 transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{artwork.category}</p>
                <p className="text-gray-300 text-sm mb-4">{artwork.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">创作于 {artwork.date}</span>
                  <a 
                    href="#" 
                    className="text-pink-400 hover:text-pink-300 text-sm transition-colors duration-300"
                  >
                    查看详情
                  </a>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
