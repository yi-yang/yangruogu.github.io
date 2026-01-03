// ============================================
// 灌篮高手风格 - JavaScript 交互效果
// ============================================

(function() {
    'use strict';

    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {

        // ============================================
        // 平滑滚动
        // ============================================
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // ============================================
        // 滚动动画 - 元素进入视口时显示
        // ============================================
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll('.about-card, .post-card');
        animatedElements.forEach(el => observer.observe(el));

        // ============================================
        // 导航栏滚动效果
        // ============================================
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.background = 'rgba(26, 35, 126, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'linear-gradient(180deg, rgba(26, 35, 126, 0.95) 0%, rgba(26, 35, 126, 0) 100%)';
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });

        // ============================================
        // 篮球弹跳效果
        // ============================================
        const basketball = document.querySelector('.basketball');

        if (basketball) {
            // 添加鼠标悬停效果
            basketball.addEventListener('mouseenter', function() {
                this.style.animation = 'bounce 0.5s ease-in-out';
            });

            basketball.addEventListener('animationend', function() {
                this.style.animation = 'float 6s ease-in-out infinite';
            });

            // 添加点击效果
            basketball.addEventListener('click', function() {
                this.style.animation = 'spin 0.6s ease-in-out';
            });
        }

        // ============================================
        // 按钮点击涟漪效果
        // ============================================
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // ============================================
        // 页面加载进度条
        // ============================================
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b35, #d32f2f);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });

        // ============================================
        // 打字机效果 - Hero 标题
        // ============================================
        const heroTitle = document.querySelector('.hero-subtitle');
        if (heroTitle && heroTitle.textContent) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let i = 0;

            setTimeout(() => {
                const typeWriter = setInterval(() => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeWriter);
                    }
                }, 50);
            }, 1000);
        }

        // ============================================
        // 文章卡片悬停3D效果
        // ============================================
        const postCards = document.querySelectorAll('.post-card');

        postCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // ============================================
        // 数字动画 - 文章编号
        // ============================================
        const postNumbers = document.querySelectorAll('.post-num');

        postNumbers.forEach(num => {
            const targetValue = parseInt(num.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            const duration = 1000;
            const stepTime = duration / 30;

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    num.textContent = String(targetValue).padStart(2, '0');
                    clearInterval(counter);
                } else {
                    num.textContent = String(Math.floor(currentValue)).padStart(2, '0');
                }
            }, stepTime);
        });

        // ============================================
        // 随机速度线动画
        // ============================================
        const speedLines = document.querySelector('.speed-lines');

        if (speedLines) {
            setInterval(() => {
                const randomAngle = Math.random() * 360;
                speedLines.style.transform = `rotate(${randomAngle}deg)`;
            }, 3000);
        }

        // ============================================
        // 性能优化 - 防抖函数
        // ============================================
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // ============================================
        // 响应式导航菜单（移动端）
        // ============================================
        const navMenu = document.querySelector('.nav-menu');
        let isMenuOpen = false;

        // 检查是否在移动视图
        function checkMobileView() {
            if (window.innerWidth <= 768) {
                if (!isMenuOpen) {
                    navMenu.style.display = 'none';
                }
            } else {
                navMenu.style.display = 'flex';
            }
        }

        // 初始检查和窗口调整时检查
        checkMobileView();
        window.addEventListener('resize', debounce(checkMobileView, 250));

        // ============================================
        // 添加 CSS 动画关键帧
        // ============================================
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-30px); }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // ============================================
        // 控制台彩蛋
        // ============================================
        console.log('%c🏀 灌篮高手风格博客', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
        console.log('%cARE YOU READY?', 'font-size: 18px; color: #d32f2f;');
        console.log('%c热爱技术，持续学习', 'font-size: 14px; color: #1a237e;');

    });
})();

// ============================================
// 页面加载完成
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
