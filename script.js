// 熊猫乌托邦交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 为卡片添加淡入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有卡片
    const cards = document.querySelectorAll('.panda-card, .habitat-card, .gallery-item, .fact-item');
    cards.forEach(card => observer.observe(card));

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏活动状态
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 为熊猫卡片添加随机颜色渐变
    const pandaCards = document.querySelectorAll('.panda-card');
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];

    pandaCards.forEach((card, index) => {
        const container = card.querySelector('.panda-image-container');
        if (container) {
            const gradient = gradients[index % gradients.length];
            container.style.background = gradient;
        }
    });

    // 为统计标签添加随机颜色
    const stats = document.querySelectorAll('.stat');
    const statColors = [
        'linear-gradient(135deg, #2ecc71, #27ae60)',
        'linear-gradient(135deg, #3498db, #2980b9)',
        'linear-gradient(135deg, #9b59b6, #8e44ad)',
        'linear-gradient(135deg, #e74c3c, #c0392b)',
        'linear-gradient(135deg, #f39c12, #d68910)',
        'linear-gradient(135deg, #1abc9c, #16a085)'
    ];

    stats.forEach(stat => {
        const randomColor = statColors[Math.floor(Math.random() * statColors.length)];
        stat.style.background = randomColor;
    });

    // 为嵌入视频添加智能播放控制
    const pandaVideos = document.querySelectorAll('.panda-video');
    
    // Intersection Observer 用于视频懒加载和自动播放/暂停
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // 视频进入视口时尝试播放
                video.play().catch(e => {
                    // 自动播放失败（浏览器策略），保持静音
                    console.log('自动播放受限，视频已准备好手动播放');
                });
            } else {
                // 视频离开视口时暂停
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // 视频50%可见时触发
    });

    pandaVideos.forEach(video => {
        // 观察每个视频
        videoObserver.observe(video);
        
        // 添加悬停控制
        const container = video.closest('.panda-video-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                video.setAttribute('controls', 'controls');
            });
            
            // 可选：鼠标离开时隐藏控制条（如果想要更简洁的外观）
            // container.addEventListener('mouseleave', () => {
            //     video.removeAttribute('controls');
            // });
        }
    });

    // 为画廊项目添加点击放大效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            
            // 创建模态框
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
                border: 4px solid #2ecc71;
                animation: zoomIn 0.3s ease;
            `;
            
            // 添加关闭按钮
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute;
                top: 30px;
                right: 30px;
                font-size: 3rem;
                color: white;
                cursor: pointer;
                background: rgba(46, 204, 113, 0.8);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            `;
            
            closeBtn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(46, 204, 113, 1)';
                this.style.transform = 'scale(1.1) rotate(90deg)';
            });
            
            closeBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(46, 204, 113, 0.8)';
                this.style.transform = 'scale(1) rotate(0deg)';
            });
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            // 点击关闭
            modal.addEventListener('click', function() {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
    });

    // 添加必要的CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        .nav-links a.active {
            background: var(--bamboo-green);
            box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3);
        }
    `;
    document.head.appendChild(style);

    // 添加滚动进度条
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(90deg, #2ecc71, #27ae60, #f39c12);
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 2px 5px rgba(46, 204, 113, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 添加返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '🐼';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        border: none;
        font-size: 32px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(360deg)';
        this.style.boxShadow = '0 6px 20px rgba(46, 204, 113, 0.6)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 4px 15px rgba(46, 204, 113, 0.4)';
    });

    // 鼠标点击时出现熊猫头
    document.addEventListener('click', function(e) {
        // 创建多个熊猫头（3-5个）
        const pandaCount = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < pandaCount; i++) {
            createPandaHead(e.clientX, e.clientY, i);
        }
    });
    
    // 创建熊猫头
    function createPandaHead(x, y, index) {
        const panda = document.createElement('div');
        panda.innerHTML = '🐼';
        
        // 随机方向和距离
        const angle = (Math.PI * 2 / 5) * index + Math.random() * 0.5;
        const distance = Math.random() * 100 + 80;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        const rotation = Math.random() * 360;
        const size = Math.random() * 20 + 30; // 30-50px
        
        panda.style.cssText = `
            position: fixed;
            font-size: ${size}px;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%) rotate(${rotation}deg);
            animation: pandaBurst ${Math.random() * 0.5 + 1}s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(panda);
        
        setTimeout(() => {
            document.body.removeChild(panda);
        }, 1500);
    }

    // 添加飘落的竹叶效果（装饰性背景）
    function createBambooLeaf() {
        const leaf = document.createElement('div');
        leaf.innerHTML = '🍃';
        leaf.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 20}px;
            left: ${Math.random() * 100}vw;
            top: -50px;
            opacity: ${Math.random() * 0.5 + 0.3};
            pointer-events: none;
            z-index: 1;
            animation: fall ${Math.random() * 10 + 10}s linear;
        `;
        
        document.body.appendChild(leaf);
        
        setTimeout(() => {
            document.body.removeChild(leaf);
        }, 20000);
    }

    // 添加飘落动画
    const fallAnimation = document.createElement('style');
    fallAnimation.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pandaBurst {
            0% {
                transform: translate(-50%, -50%) rotate(0deg) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(calc(-50% + var(--end-x) * 0.5), calc(-50% + var(--end-y) * 0.5)) rotate(180deg) scale(1.2);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) rotate(360deg) scale(0.3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fallAnimation);

    // 每隔一段时间创建背景竹叶
    setInterval(createBambooLeaf, 3000);

    // 为标题添加打字机效果
    const title = document.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let index = 0;
        const typeWriter = setInterval(() => {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeWriter);
            }
        }, 150);
    }

    console.log('🐼 欢迎来到熊猫乌托邦！');
});
