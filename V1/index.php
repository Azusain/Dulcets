<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dulcets - 二次元音乐公司</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/gsap.min.js"></script>
</head>
<body>
    <!-- 加载动画 -->
    <div class="loader-container fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div class="loader-inner flex items-center">
            <div class="loader-icon">
                <span class="text-white text-4xl font-bold font-orbitron tracking-wider">
                    <span class="text-blue-400">D</span><span class="text-pink-500">ulcets</span>
                </span>
            </div>
            <div class="loader-line h-16 w-px bg-gradient-to-b from-blue-400 to-pink-500 mx-4"></div>
            <div class="loader-text text-white text-2xl font-orbitron" data-i18n="loading">加载中</div>
        </div>
    </div>
    <div id="main-content" class="opacity-0 duration-1000">
    <!-- 导航栏 -->
    <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-500">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <div class="text-white text-2xl font-bold font-orbitron tracking-wider">
                    <span class="text-blue-400">D</span><span class="text-pink-500">ulcets</span>
                </div>
            </div>
            <div class="hidden md:flex space-x-8 ml-auto">
                <a href="#about" class="nav-link text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.about">关于我们</a>
                <a href="#releases" class="nav-link text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.releases">音乐发布</a>
                <a href="#pricing" class="nav-link text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.pricing">价格表</a>
                <a href="#artworks" class="nav-link text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.artworks">绘画作品</a>
                <a href="#modeling" class="nav-link text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.modeling">3D建模</a>
            </div>
            <div class="hidden md:block ml-8">
                <select id="language-selector" class="bg-gray-800/80 text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors duration-300">
                    <option value="zh-CN">中文</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                </select>
            </div>
            <div class="md:hidden flex items-center space-x-4">
                <select id="language-selector-mobile" class="bg-gray-800/80 text-white border border-white/20 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-purple-500 transition-colors duration-300">
                    <option value="zh-CN">中文</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                </select>
                <button id="menu-toggle" class="text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- 移动端菜单 -->
        <div id="mobile-menu" class="hidden md:hidden bg-black/80 backdrop-blur-md">
            <div class="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <a href="#about" class="text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.about">关于我们</a>
                <a href="#releases" class="text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.releases">音乐发布</a>
                <a href="#pricing" class="text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.pricing">价格表</a>
                <a href="#artworks" class="text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.artworks">绘画作品</a>
                <a href="#modeling" class="text-white hover:text-blue-400 transition-colors duration-300" data-i18n="nav.modeling">3D建模</a>
            </div>
        </div>
    </nav>

    <!-- 英雄区域 -->
    <section id="hero" class="relative h-screen overflow-hidden">
        <div id="hero-background"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center relative z-10 text-center">
            <h1 class="text-[clamp(2.5rem,8vw,5rem)] font-bold font-orbitron text-white leading-tight mb-6 animate-float">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Dulcets</span>
            </h1>
            <p class="text-[clamp(1rem,3vw,1.5rem)] text-gray-200 max-w-3xl mb-10 animate-fade-in" data-i18n="hero.subtitle">
                探索二次元与科技融合的音乐世界，感受未来音乐的无限可能
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
                <a href="#artists" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300" data-i18n="hero.explore_artists">探索艺术家</a>
                    探索音乐
                </a>
                <a href="#releases" class="px-8 py-3 bg-transparent border-2 border-white/50 rounded-full text-white font-medium hover:bg-white/10 transform hover:scale-105 transition-all duration-300" data-i18n="hero.latest_releases">最新发布</a>
                    最新发布
                </a>
            </div>
        </div>
        <!-- 虚拟角色导航 -->
        <div id="character-nav" class="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:gap-16">
            <div class="character-icon" data-target="#artists">
                <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white/30 transform transition-all duration-300 hover:scale-110">
                    <img src="https://www.dmoe.cc/random.php" alt="艺术家" class="w-full h-full object-cover">
                </div>
            </div>
            <div class="character-icon" data-target="#releases">
                <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center overflow-hidden border-2 border-white/30 transform transition-all duration-300 hover:scale-110">
                    <img src="https://www.dmoe.cc/random.php" alt="音乐发布" class="w-full h-full object-cover">
                </div>
            </div>
            <div class="character-icon" data-target="#events">
                <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center overflow-hidden border-2 border-white/30 transform transition-all duration-300 hover:scale-110">
                    <img src="https://www.dmoe.cc/random.php" alt="活动" class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div class="container mx-auto px-6">

            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" data-i18n="about.title">关于我们</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="relative">
                    <div class="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg blur opacity-30"></div>
                    <div class="relative bg-gray-800/50 backdrop-blur-md p-8 rounded-lg border border-white/10">
                        <h3 class="text-2xl font-bold mb-4 text-blue-400" data-i18n="about.story_title">我们的故事</h3>
                        <p class="text-gray-300 mb-4" data-i18n="about.story_p1">
                            Dulcets成立于2023年，是一家专注于二次元音乐创作与虚拟艺人培养的创新型音乐公司。我们致力于打破传统音乐边界，将科技与艺术完美融合，打造独特的音乐体验。
                        </p>
                        <p class="text-gray-300 mb-4" data-i18n="about.story_p2">
                            我们相信音乐是连接现实与虚拟世界的桥梁，通过先进的技术和富有创意的团队，我们正在构建一个全新的音乐宇宙。
                        </p>
                        <div class="mt-8 flex space-x-4">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-400">20+</div>
                                <div class="text-gray-400 text-sm" data-i18n="about.stats.artists">虚拟艺人</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-pink-400">100+</div>
                                <div class="text-gray-400 text-sm" data-i18n="about.stats.releases">音乐作品</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-purple-400">5M+</div>
                                <div class="text-gray-400 text-sm" data-i18n="about.stats.fans">粉丝数量</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-pink-600/20 rounded-2xl transform rotate-3"></div>
                    <img src="https://www.dmoe.cc/random.php" alt="Dulcets工作室" class="relative rounded-2xl w-full h-auto shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                </div>
            </div>
        </div>
    </section>

    <!-- 音乐发布 -->
    <section id="releases" class="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500" data-i18n="releases.title">最新发布</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-6"></div>
                <p class="text-gray-400 max-w-2xl mx-auto" data-i18n="releases.desc">探索我们最新的音乐作品，感受未来音乐的魅力</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- 专辑卡片 1 -->
                <div class="album-card group relative rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div class="relative aspect-square overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="星际漫游" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button class="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300">星际漫游</h3>
                        <p class="text-gray-400 text-sm mb-2">星梦</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">2023-06-15</span>
                            <div class="flex space-x-2">
                                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 专辑卡片 2 -->
                <div class="album-card group relative rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    <div class="relative aspect-square overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="破界" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button class="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold mb-1 text-white group-hover:text-pink-400 transition-colors duration-300">破界</h3>
                        <p class="text-gray-400 text-sm mb-2">龙刃</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">2023-05-22</span>
                            <div class="flex space-x-2">
                                <a href="#" class="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 专辑卡片 3 -->
                <div class="album-card group relative rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <div class="relative aspect-square overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="数字梦境" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button class="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold mb-1 text-white group-hover:text-green-400 transition-colors duration-300">数字梦境</h3>
                        <p class="text-gray-400 text-sm mb-2">星梦</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">2023-04-10</span>
                            <div class="flex space-x-2">
                                <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 专辑卡片 4 -->
                <div class="album-card group relative rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <div class="relative aspect-square overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="燃烧的灵魂" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button class="w-16 h-16 rounded-full bg-yellow-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors duration-300">燃烧的灵魂</h3>
                        <p class="text-gray-400 text-sm mb-2">龙刃</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">2023-03-05</span>
                            <div class="flex space-x-2">
                                <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 音乐制作服务 -->
    <section id="production" class="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500" data-i18n="music_production">音乐制作服务</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-6"></div>
                <p class="text-gray-400 max-w-2xl mx-auto" data-i18n="music_production.desc">专业的音乐制作团队，为您打造高品质音乐作品</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-16">
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div class="w-16 h-16 bg-blue-600/30 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.12 2-2.5 2S4 20.105 4 19m10 0c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-white" data-i18n="music_production.services.recording.title">制作与录音</h3>
                    <ul class="space-y-4 mb-6">
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.recording.feature1">专业级录音设备与声学处理空间</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.recording.feature2">经验丰富的录音师全程指导</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.recording.feature3">多轨录音与精细后期处理</span>
                        </li>
                    </ul>
                </div>

                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    <div class="w-16 h-16 bg-pink-600/30 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-white" data-i18n="music_production.services.musicians.title">乐手与歌手准备</h3>
                    <ul class="space-y-4 mb-6">
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.musicians.feature1">专业乐手团队，涵盖各类乐器</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.musicians.feature2">歌手声乐指导与情感表达训练</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-pink-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300" data-i18n="music_production.services.musicians.feature3">个性化编曲与和声设计</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- 价位板块 -->
    <section id="pricing" class="py-20 bg-black text-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500" data-i18n="price_title">服务价位</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-yellow-500 mx-auto mb-6"></div>
                <p class="text-gray-400 max-w-2xl mx-auto">透明合理的价格体系，满足不同音乐制作需求</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <div class="p-6 border-b border-white/10">
                        <h3 class="text-xl font-bold text-white mb-2" data-i18n="basic_package">基础制作</h3>
                        <div class="text-3xl font-bold text-white">¥8,800<span class="text-sm font-normal text-gray-400">/首</span></div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.basic.feature1">3小时录音时间</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.basic.feature2">基础混音与母带处理</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.basic.feature3">1名录音师服务</span>
                            </li>
                            <li class="flex items-start text-gray-500">
                                <svg class="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                <span data-i18n="pricing.basic.limit1">乐手与歌手指导</span>
                            </li>
                            <li class="flex items-start text-gray-500">
                                <svg class="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                <span data-i18n="pricing.basic.limit2">著作权让渡</span>
                            </li>
                        </ul>
                        <a href="#" class="block w-full py-3 bg-purple-600/80 hover:bg-purple-500 transition-colors duration-300 rounded-lg text-center font-medium" data-i18n="pricing.choose_plan">选择此方案</a>
                    </div>
                </div>

                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-purple-500 transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] relative">
                    <div class="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1">推荐</div>
                    <div class="p-6 border-b border-white/10">
                        <h3 class="text-xl font-bold text-white mb-2" data-i18n="standard_package">专业制作</h3>
                        <div class="text-3xl font-bold text-white">¥18,800<span class="text-sm font-normal text-gray-400">/首</span></div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.standard.feature1">8小时录音时间</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.standard.feature2">高级混音与母带处理</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.standard.feature3">1名录音师+1名制作人</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.standard.feature4">基础乐手与歌手指导</span>
                            </li>
                            <li class="flex items-start text-gray-500">
                                <svg class="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                <span data-i18n="pricing.standard.limit1">著作权让渡</span>
                            </li>
                        </ul>
                        <a href="#" class="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity duration-300 rounded-lg text-center font-medium">选择此方案</a>
                    </div>
                </div>

                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <div class="p-6 border-b border-white/10">
                        <h3 class="text-xl font-bold text-white mb-2" data-i18n="premium_package">全能制作</h3>
                        <div class="text-3xl font-bold text-white">¥38,800<span class="text-sm font-normal text-gray-400">/首</span></div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.premium.feature1">无限录音时间</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.premium.feature2">顶级混音与母带处理</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.premium.feature3">全套制作团队服务</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.premium.feature4">专业乐手与歌手指导</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="pricing.premium.feature5">完整著作权让渡</span>
                            </li>
                        </ul>
                        <a href="#" class="block w-full py-3 bg-purple-600/80 hover:bg-purple-500 transition-colors duration-300 rounded-lg text-center font-medium">选择此方案</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 绘画作品展示板块 -->
    <section id="artworks" class="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500" data-i18n="artworks">绘画作品展示</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"></div>
                <p class="text-gray-400 max-w-2xl mx-auto">精选二次元风格绘画作品，展现独特的艺术视觉魅力</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="星际漫游概念图" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-pink-400 transition-colors duration-300" data-i18n="artworks.title1">星际漫游概念图</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category1">科幻 / 场景设计</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc1">未来宇宙飞船与行星景观的概念设计，融合科技与幻想元素</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2023.05</span>
                            <a href="#" class="text-pink-400 hover:text-pink-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>

                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="虚拟歌姬 - 星梦" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-purple-400 transition-colors duration-300" data-i18n="artworks.title2">虚拟歌姬 - 星梦</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category2">角色设计 / 二次元</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc2">原创虚拟歌姬角色设计，融合未来科技感与日系二次元风格</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2023.03</span>
                            <a href="#" class="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>

                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="赛博朋克城市夜景" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300" data-i18n="artworks.title3">赛博朋克城市夜景</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category3">场景插画 / 科幻</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc3">未来都市夜景插画，霓虹灯光与雨夜街道的氛围营造</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2023.01</span>
                            <a href="#" class="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>

                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="幻想森林精灵" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors duration-300" data-i18n="artworks.title4">幻想森林精灵</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category4">角色插画 / 奇幻</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc4">森林精灵角色插画，融合自然元素与梦幻色彩</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2022.12</span>
                            <a href="#" class="text-yellow-400 hover:text-yellow-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>

                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="机械少女" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-green-400 transition-colors duration-300" data-i18n="artworks.title5">机械少女</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category5">角色设计 / 机械朋克</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc5">融合机械元素与少女形象的角色设计，展现力量与美感</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2022.10</span>
                            <a href="#" class="text-green-400 hover:text-green-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>

                <div class="artwork-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <div class="aspect-[4/3] overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="未来都市街景" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold mb-1 text-white group-hover:text-red-400 transition-colors duration-300" data-i18n="artworks.title6">未来都市街景</h3>
                        <p class="text-gray-400 text-sm mb-3" data-i18n="artworks.category6">场景插画 / 未来主义</p>
                        <p class="text-gray-300 text-sm mb-4" data-i18n="artworks.desc6">未来都市的日常生活场景插画，展现科技与人文的融合</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">创作于 2022.09</span>
                            <a href="#" class="text-red-400 hover:text-red-300 text-sm transition-colors duration-300" data-i18n="artworks.view_details">查看详情</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 建模板块 -->
    <section id="modeling" class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-[clamp(1.8rem,5vw,3rem)] font-bold font-orbitron mb-4">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500" data-i18n="3d_modeling_title">3D建模服务</span>
                </h2>
                <div class="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6"></div>
                <p class="text-gray-400 max-w-2xl mx-auto" data-i18n="3d_modeling_desc">专业的3D建模团队，打造高质量虚拟角色与场景</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div class="modeling-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <div class="aspect-video overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="虚拟角色建模" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300" data-i18n="3d_modeling.character.title">虚拟角色建模</h3>
                        <p class="text-gray-300 mb-6" data-i18n="3d_modeling.character.desc">
                            从概念设计到完整3D模型，我们提供高质量虚拟角色建模服务，可用于动画、游戏和虚拟偶像直播。
                        </p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.character.feature1">高精度角色建模与纹理</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.character.feature2">骨骼绑定与动画设置</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.character.feature3">实时渲染优化</span>
                            </li>
                        </ul>
                        <a href="#" class="inline-block px-6 py-3 bg-yellow-600/80 hover:bg-yellow-500 transition-colors duration-300 rounded-lg text-white font-medium" data-i18n="3d_modeling.learn_more">了解更多</a>
                    </div>
                </div>

                <div class="modeling-card group relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <div class="aspect-video overflow-hidden">
                        <img src="https://www.dmoe.cc/random.php" alt="场景建模" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300" data-i18n="3d_modeling.scene.title">场景与道具建模</h3>
                        <p class="text-gray-300 mb-6" data-i18n="3d_modeling.scene.desc">
                            打造沉浸式虚拟场景与道具，为音乐MV、游戏和虚拟演出提供高质量3D环境资产。
                        </p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.scene.feature1">环境场景设计与建模</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.scene.feature2">高精度道具建模</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-red-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-gray-300" data-i18n="3d_modeling.scene.feature3">光照与材质设置</span>
                            </li>
                        </ul>
                        <a href="#" class="inline-block px-6 py-3 bg-red-600/80 hover:bg-red-500 transition-colors duration-300 rounded-lg text-white font-medium" data-i18n="3d_modeling.learn_more">了解更多</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-black text-white py-12 border-t border-white/10">
                <div class="container mx-auto px-6">
                    <div class="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div class="text-2xl font-bold font-orbitron tracking-wider mb-4">
                                <span class="text-blue-400">D</span><span class="text-pink-500">ulcets</span>
                            </div>
                            <p class="text-gray-400 mb-4" data-i18n="footer.company_desc">
                                探索二次元与科技融合的音乐世界，感受未来音乐的无限可能
                            </p>
                            <div class="flex space-x-4">
                                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm-3.603 13.998V19h6v-2.845c0-1.769 1.457-3.156 3.342-3.156.945 0 1.775.192 1.775.192v-5.657h-3.908v3.06h1.561v1.04h-1.561V13.1c-1.101-.341-1.805-1.224-1.805-2.354 0-1.701 1.411-2.741 3.424-2.741 1.954 0 3.384 1.081 3.384 2.668v3.446h-3.907v-1.559h-1.56v1.559h-1.553v5.635z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold mb-4 text-white" data-i18n="footer.quick_links">快速链接</h3>
                            <ul class="space-y-2">
                                <li><a href="#about" class="text-gray-400 hover:text-blue-400 transition-colors duration-300" data-i18n="nav.about">关于我们</a></li>
                                <li><a href="#releases" class="text-gray-400 hover:text-blue-400 transition-colors duration-300" data-i18n="nav.releases">音乐发布</a></li>
                                <li><a href="#pricing" class="text-gray-400 hover:text-blue-400 transition-colors duration-300" data-i18n="nav.pricing">价格表</a></li>
                                <li><a href="#artworks" class="text-gray-400 hover:text-blue-400 transition-colors duration-300" data-i18n="nav.artworks">绘画作品</a></li>
                                <li><a href="#modeling" class="text-gray-400 hover:text-blue-400 transition-colors duration-300" data-i18n="nav.modeling">3D建模</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold mb-4 text-white" data-i18n="footer.contact_us">联系我们</h3>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-gray-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span class="text-gray-400" data-i18n="footer.address">東京都豊島区駒込3－1－3　エコプレイス駒込Ａ－２１６</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span class="text-gray-400" data-i18n="footer.email">Dulcets.info@gmail.com</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span class="text-gray-400" data-i18n="footer.phone">090-3150-4067</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold mb-4 text-white" data-i18n="footer.subscribe_title">订阅更新</h3>
                            <p class="text-gray-400 mb-4" data-i18n="footer.subscribe_desc">
                                订阅我们的 newsletter，获取最新的音乐和活动信息
                            </p>
                            <form class="flex">
                                <input type="email" data-i18n-placeholder="footer.email_placeholder" class="px-4 py-2 bg-gray-800/50 border border-white/20 rounded-l-lg focus:outline-none focus:border-blue-500 text-white w-full">
                                <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors duration-300 rounded-r-lg" data-i18n="footer.subscribe_button">订阅</button>
                            </form>
                        </div>
                    </div>
                    <div class="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                        <p data-i18n="footer.copyright">&copy; 2025 Dulcets音乐公司. 保留所有权利.</p>
                    </div>
                </div>
            </footer>

            <script src="script.js"></script>
        <!-- 返回顶部按钮 -->
        <button id="back-to-top" class="fixed bottom-8 right-8 bg-purple-600/80 hover:bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 opacity-0 invisible">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </svg>
        </button>

            </div>
</body>
        </html>