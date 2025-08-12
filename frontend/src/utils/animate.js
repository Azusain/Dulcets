document.addEventListener('DOMContentLoaded', function () {
  // 导航栏滚动效果
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 移动端菜单切换
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        // 关闭移动菜单（如果打开）
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        // 添加点击动画效果
        createClickEffect(e.clientX, e.clientY);
      }
    });
  });

  // 角色导航点击事件
  document.querySelectorAll('.character-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        // 添加点击动画效果
        createClickEffect(event.clientX, event.clientY);
      }
    });
  });

  // 创建点击效果
  function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    document.body.appendChild(effect);

    // 添加样式
    effect.style.position = 'absolute';
    effect.style.width = '40px';
    effect.style.height = '40px';
    effect.style.borderRadius = '50%';
    effect.style.background = 'rgba(59, 130, 246, 0.5)';
    effect.style.transform = 'translate(-50%, -50%) scale(0)';
    effect.style.animation = 'clickEffect 0.6s ease-out forwards';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
            @keyframes clickEffect {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
        `;
    document.head.appendChild(style);

    // 移除元素
    setTimeout(() => {
      effect.remove();
      style.remove();
    }, 600);
  }

  // 初始化Three.js背景
  function initThreeJSBackground() {
    if (!window.THREE) return;

    const container = document.getElementById('hero-background');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 创建粒子
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // 粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff
    });

    // 创建粒子网格
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 添加发光线条
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 50;
    const linePosArray = new Float32Array(lineCount * 3 * 2);

    for (let i = 0; i < lineCount * 3 * 2; i += 6) {
      // 起点
      linePosArray[i] = (Math.random() - 0.5) * 10;
      linePosArray[i + 1] = (Math.random() - 0.5) * 10;
      linePosArray[i + 2] = (Math.random() - 0.5) * 10;
      // 终点
      linePosArray[i + 3] = linePosArray[i] + (Math.random() - 0.5) * 2;
      linePosArray[i + 4] = linePosArray[i + 1] + (Math.random() - 0.5) * 2;
      linePosArray[i + 5] = linePosArray[i + 2] + (Math.random() - 0.5) * 2;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePosArray, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.5
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 5;

    // 动画循环
    function animate() {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      lineMesh.rotation.x -= 0.0003;
      lineMesh.rotation.y -= 0.0003;

      renderer.render(scene, camera);
    }

    animate();

    // 窗口大小调整
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }



  // 初始化元素动画
  function initElementAnimations() {
    // 为元素添加滚动动画
    const animateOnScroll = function () {
      const elements = document.querySelectorAll('.artist-card, .album-card, .event-card, .community-card');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始检查
  }

  // 语言切换功能
  const translations = {
    'zh-CN': {
      'loading': '加载中',
      'nav': {
        'about': '关于我们',
        'artists': '艺术家',
        'releases': '音乐发布',
        'events': '活动',
        'community': '社区',
        'modeling': '3D建模'
      },
      'hero': {
        'subtitle': '探索二次元与科技融合的音乐世界，感受未来音乐的无限可能',
        'explore_artists': '探索艺术家',
        'latest_releases': '最新发布'
      },
      'about': {
        'title': '关于我们',
        'story_title': '我们的故事',
        'story_p1': 'Dulcets成立于2023年，是一家专注于二次元音乐创作与虚拟艺人培养的创新型音乐公司。我们致力于打破传统音乐边界，将科技与艺术完美融合，打造独特的音乐体验。',
        'story_p2': '我们相信音乐是连接现实与虚拟世界的桥梁，通过先进的技术和富有创意的团队，我们正在构建一个全新的音乐宇宙。',
        'stats': {
          'artists': '虚拟艺人',
          'releases': '音乐作品',
          'fans': '粉丝数量'
        }
      },
      'releases': {
        'title': '最新发布',
        'desc': '探索我们最新的音乐作品，感受未来音乐的魅力'
      },
      'music_production': {
        'title': '音乐制作服务',
        'desc': '专业的音乐制作团队，为您打造高品质音乐作品'
      },
      'price_title': '服务价位',
      'basic_package': '基础制作',
      'standard_package': '专业制作',
      'premium_package': '全能制作',
      'artworks': '绘画作品展示',
      '3d_modeling': {
        'title': '3D建模服务',
        'desc': '专业的3D建模团队，打造高质量虚拟角色与场景',
        'character': {
          'title': '虚拟角色建模',
          'desc': '从概念设计到完整3D模型，我们提供高质量虚拟角色建模服务，可用于动画、游戏和虚拟偶像直播。',
          'feature1': '高精度角色建模与纹理',
          'feature2': '骨骼绑定与动画设置',
          'feature3': '实时渲染优化'
        },
        'scene': {
          'title': '场景与道具建模',
          'desc': '打造沉浸式虚拟场景与道具，为音乐MV、游戏和虚拟演出提供高质量3D环境资产。',
          'feature1': '环境场景设计与建模',
          'feature2': '高精度道具建模',
          'feature3': '光照与材质设置'
        },
        'learn_more': '了解更多'
      },
      'footer': {
        'quick_links': '快速链接',
        'contact_us': '联系我们',
        'subscribe': '订阅更新',
        'subscribe_desc': '订阅我们的 newsletter，获取最新的音乐和活动信息',
        'email_placeholder': '输入您的邮箱',
        'subscribe_button': '订阅',
        'copyright': '© 2025 Dulcets音乐公司. 保留所有权利.',
        'address': '東京都豊島区駒込3－1－3　エコプレイス駒込Ａ－２１６',
        'email': 'Dulcets.info@gmail.com',
        'phone': '090-3150-4067',
        'subscribe_title': '订阅更新',
        'company_desc': '探索二次元与科技融合的音乐世界，感受未来音乐的无限可能'
      }
    },
    'en': {
      'loading': 'Loading',
      'nav': {
        'about': 'About Us',
        'artists': 'Artists',
        'releases': 'Releases',
        'events': 'Events',
        'community': 'Community',
        'modeling': '3D Modeling'
      },
      'hero': {
        'subtitle': 'Explore the music world where二次元 and technology merge, experience the infinite possibilities of future music',
        'explore_artists': 'Explore Artists',
        'latest_releases': 'Latest Releases'
      },
      'about': {
        'title': 'About Us',
        'story_title': 'Our Story',
        'story_p1': 'Founded in 2023, Dulcets is an innovative music company focusing on二次元 music creation and virtual artist development. We are committed to breaking traditional music boundaries and perfectly integrating technology with art to create unique music experiences.',
        'story_p2': 'We believe that music is a bridge connecting reality and virtual worlds. Through advanced technology and a creative team, we are building a brand new music universe.',
        'stats': {
          'artists': 'Virtual Artists',
          'releases': 'Music Works',
          'fans': 'Fans'
        }
      },
      'releases': {
        'title': 'Latest Releases',
        'desc': 'Explore our latest music works and feel the charm of future music'
      },
      'music_production': {
        'title': 'Music Production',
        'desc': 'Professional music production team to create high-quality music works for you'
      },
      'price_title': 'Pricing',
      'basic_package': 'Basic Package',
      'standard_package': 'Standard Package',
      'premium_package': 'Premium Package',
      'artworks': 'Artwork Gallery',
      '3d_modeling': {
        'title': '3D Modeling Services',
        'desc': 'Professional 3D modeling team to create high-quality virtual characters and scenes',
        'character': {
          'title': 'Virtual Character Modeling',
          'desc': 'From concept design to complete 3D models, we provide high-quality virtual character modeling services for animation, games, and virtual idol live broadcasts.',
          'feature1': 'High-precision character modeling and texturing',
          'feature2': 'Rigging and animation setup',
          'feature3': 'Real-time rendering optimization'
        },
        'scene': {
          'title': 'Scene and Prop Modeling',
          'desc': 'Create immersive virtual scenes and props, providing high-quality 3D environment assets for music MVs, games, and virtual performances.',
          'feature1': 'Environment scene design and modeling',
          'feature2': 'High-precision prop modeling',
          'feature3': 'Lighting and material setup'
        },
        'learn_more': 'Learn More'
      },
      'footer': {
        'quick_links': 'Quick Links',
        'contact_us': 'Contact Us',
        'subscribe': 'Subscribe',
        'subscribe_desc': 'Subscribe to our newsletter for the latest music and event information',
        'email_placeholder': 'Enter your email',
        'subscribe_button': 'Subscribe',
        'copyright': '© 2025 Dulcets Music. All rights reserved.',
        'address': '3-1-3 Komagome, Toshima-ku, Tokyo, Ecoplace Komagome A-216',
        'email': 'Dulcets.info@gmail.com',
        'phone': '090-3150-4067',
        'subscribe_title': 'Subscribe to Updates',
        'company_desc': 'Explore the music world where二次元 and technology merge, and experience the infinite possibilities of future music'
      }
    },
    'ja': {
      'loading': '読み込み中',
      'nav': {
        'about': '会社概要',
        'artists': 'アーティスト',
        'releases': 'リリース',
        'events': 'イベント',
        'community': 'コミュニティ',
        'modeling': '3Dモデリング'
      },
      'hero': {
        'subtitle': '二次元とテクノロジーが融合する音楽の世界を探索し、未来の音楽の無限の可能性を感じてください',
        'explore_artists': 'アーティストを探る',
        'latest_releases': '最新リリース'
      },
      'about': {
        'title': '会社概要',
        'story_title': '私たちの物語',
        'story_p1': 'Dulcetsは2023年に設立された、二次元音楽制作とバーチャルアーティスト育成に特化した革新的な音楽会社です。私たちは伝統的な音楽の境界を打ち破り、テクノロジーとアートを完璧に融合させ、独特の音楽体験を提供することに尽力しています。',
        'story_p2': '音楽は現実世界と仮想世界をつなぐ架け橋であると信じています。先進的な技術と創造的なチームにより、私たちはまったく新しい音楽宇宙を構築しています。',
        'stats': {
          'artists': 'バーチャルアーティスト',
          'releases': '音楽作品',
          'fans': 'ファン数'
        }
      },
      'releases': {
        'title': '最新リリース',
        'desc': '最新の音楽作品をご覧いただき、未来の音楽の魅力を感じてください'
      },
      'music_production': {
        'title': '音楽制作サービス',
        'desc': 'プロの音楽制作チームが高品質な音楽作品を制作いたします',
      },
      'price_title': '価格',
      'basic_package': '基本パッケージ',
      'standard_package': '標準パッケージ',
      'premium_package': 'プレミアムパッケージ',
      'artworks': 'アートワークギャラリー',
      '3d_modeling': {
        'title': '3Dモデリングサービス',
        'desc': 'プロの3Dモデリングチームが高品質なバーチャルキャラクターとシーンを作成',
        'character': {
          'title': 'バーチャルキャラクターモデリング',
          'desc': 'コンセプトデザインから完全な3Dモデルまで、アニメーション、ゲーム、バーチャルアイドルライブに使用できる高品質なバーチャルキャラクターモデリングサービスを提供します。',
          'feature1': '高精度キャラクターモデリングとテクスチャリング',
          'feature2': 'リギングとアニメーション設定',
          'feature3': 'リアルタイムレンダリング最適化'
        },
        'scene': {
          'title': 'シーンとプロップモデリング',
          'desc': '没入型の仮想シーンとプロップを作成し、音楽MV、ゲーム、バーチャルパフォーマンスのための高品質な3D環境アセットを提供します。',
          'feature1': '環境シーン設計とモデリング',
          'feature2': '高精度プロップモデリング',
          'feature3': '照明とマテリアル設定'
        },
        'learn_more': '詳細を見る'
      },
      'footer': {
        'quick_links': 'クイックリンク',
        'contact_us': 'お問い合わせ',
        'subscribe': '購読する',
        'subscribe_desc': 'ニュースレターを購読して、最新の音楽とイベント情報を入手してください',
        'email_placeholder': 'メールアドレスを入力',
        'subscribe_button': '購読',
        'copyright': '© 2025 Dulcets音楽. 全著作権所有.',
        'address': '東京都豊島区駒込3－1－3　エコプレイス駒込Ａ－２１６',
        'email': 'Dulcets.info@gmail.com',
        'phone': '090-3150-4067',
        'subscribe_title': '更新を購読',
        'company_desc': '二次元とテクノロジーが融合した音楽の世界を探索し、未来の音楽の無限の可能性を体感してください'
      }
    }
  };

  function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = translations[lang];

      // 遍历嵌套键
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      // 设置文本内容
      if (value && typeof value === 'string') {
        element.textContent = value;
      }
    });

    // 更新placeholder属性
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const keys = key.split('.');
      let value = translations[lang];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      if (value && typeof value === 'string') {
        element.placeholder = value;
      }
    });

    localStorage.setItem('preferred_language', lang);

    // 更新所有语言选择器
    document.querySelectorAll('#language-selector, #language-selector-mobile').forEach(selector => {
      selector.value = lang;
    });
  }

  function detectUserLanguage() {
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang) return savedLang;

    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) return 'zh-CN';
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('ja')) return 'ja';
    return 'zh-CN'; // 默认语言
  }

  // 返回顶部按钮功能
  function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 初始化所有功能
  function init() {
    initThreeJSBackground();
    initElementAnimations();

    // 初始化语言切换
    const initialLang = detectUserLanguage();
    const langSelectors = document.querySelectorAll('#language-selector, #language-selector-mobile');

    langSelectors.forEach(selector => {
      selector.value = initialLang;
      selector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    });

    setLanguage(initialLang);

    // 初始化返回顶部按钮
    initBackToTop();
  }

  // 启动初始化
  init();

  // 页面加载完成后处理加载动画
  window.onload = function () {
    setTimeout(() => {
      const loader = document.querySelector('.loader-container');
      const mainContent = document.getElementById('main-content');

      // 使用GSAP实现淡出效果
      gsap.to(loader, {
        opacity: 0, duration: 1, onComplete: () => {
          loader.style.display = 'none';
        }
      });

      // 淡入主内容
      gsap.to(mainContent, { opacity: 1, duration: 1 });
    }, 1500); // 显示加载动画1.5秒
  };
});