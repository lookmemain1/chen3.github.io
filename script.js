/* ============================================
   陈锦秀 个人主页 - 交互脚本
   功能：导航高亮 / 移动端菜单 / 表单提示 / 入场动效
   ============================================ */

// 等 DOM 加载完毕再执行
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1. 移动端汉堡菜单 ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // 点击导航链接后自动关闭移动端菜单
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    /* ---------- 2. 滚动时导航栏样式变化 ---------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(42, 157, 143, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(42, 157, 143, 0.08)';
        }
    });

    /* ---------- 3. 滚动时高亮当前 section 对应的导航项 ---------- */
    const sections = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let currentId = '';
        const scrollPos = window.scrollY + 120; // 加个偏移量，让切换更自然

        sections.forEach(function (section) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(function (anchor) {
            // 先移除所有 active 类
            anchor.classList.remove('active');
            // 给匹配的那个加上 active
            if (anchor.getAttribute('href') === '#' + currentId) {
                anchor.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 页面加载时先执行一次

    /* ---------- 4. 卡片入场动画（滚动到可视区时淡入） ---------- */
    const skillCards = document.querySelectorAll('.skill-card');

    // 如果浏览器支持 IntersectionObserver，就用它；不支持就直接显示
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // 已动画过就不再观察
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(function (card, index) {
            // 初始状态：透明、下移
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
            observer.observe(card);
        });
    }

    /* ---------- 5. 留言表单提交提示 ---------- */
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止默认提交（这里没有后端）

        // 获取输入的值
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // 简单校验
        if (!name || !email || !message) {
            alert('请把所有信息都填好哦～');
            return;
        }

        // 简单的邮箱格式校验
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('邮箱格式好像不太对，请再检查一下～');
            return;
        }

        // 提交成功提示（演示用，没有真正发送到服务器）
        alert('谢谢你的留言，' + name + '！我会尽快回复你的 🎉');
        form.reset(); // 清空表单
    });

    /* ---------- 6. 让导航 active 样式生效（补充一点 CSS） ---------- */
    // 动态给 <head> 加一段样式，让 .nav-links a.active 有颜色
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--color-primary, #2a9d8f);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

});
