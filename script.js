document.addEventListener('DOMContentLoaded', () => {
    const dataPath = 'data.json'; // JSON 数据文件路径
    const iconBasePath = 'images/icons/'; // 图标基础路径
    const defaultIcon = 'default.png'; // 默认图标文件名

    // --- Helper Functions ---

    /**
     * 从 URL 获取查询参数
     * @param {string} name 参数名
     * @returns {string|null} 参数值或 null
     */
    const getQueryParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    /**
     * 获取网站图标路径，处理不存在的情况
     * @param {string} iconName 图标文件名 (来自 JSON)
     * @returns {string} 完整的图标路径
     */
    const getIconPath = (iconName) => {
        // 注意：这里我们假设图标存在。更健壮的方式是检查文件存在性或在构建时处理。
        // 为了简单起见，我们直接拼接路径。如果 iconName 为空或 null，使用默认图标。
        return `${iconBasePath}${iconName ? iconName : defaultIcon}`;
    };

     /**
     * 获取并解析 JSON 数据
     * @returns {Promise<object>} 解析后的 JSON 数据
     */
    const fetchData = async () => {
        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("无法加载或解析数据:", error);
            // 可以在页面上显示错误信息
            const loadingElements = document.querySelectorAll('.loading-text');
            loadingElements.forEach(el => el.textContent = '数据加载失败，请稍后重试。');
            return null; // 返回 null 表示失败
        }
    };

    /**
     * 使用 anime.js 应用入场动画
     * @param {string} targets CSS 选择器
     * @param {number} delay 初始延迟 (ms)
     * @param {number} stagger 子元素交错延迟 (ms)
     */
    const applyEntranceAnimation = (targets, delay = 100, stagger = 80) => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: targets,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(stagger, { start: delay }),
                duration: 800,
                easing: 'easeOutExpo'
            });
        } else {
            // anime.js 未加载时的回退，直接显示元素
             document.querySelectorAll(targets).forEach(el => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            });
        }
    };

    // --- Theme Management ---
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    };

    // --- Search Functionality ---
    const initSearch = () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="search" id="search-input" placeholder="搜索..." class="search-input">
        `;

        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.insertBefore(searchContainer, headerContent.firstChild);
        }

        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            // 在首页搜索板块
            const categoryBlocks = document.querySelectorAll('.category-block');
            if (categoryBlocks.length > 0) {
                categoryBlocks.forEach(block => {
                    const title = block.querySelector('h3').textContent.toLowerCase();
                    const description = block.querySelector('p')?.textContent.toLowerCase() || '';
                    const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
                    block.style.display = isMatch ? 'block' : 'none';
                });
            }

            // 在板块页搜索网站
            const siteCards = document.querySelectorAll('.site-card');
            if (siteCards.length > 0) {
                siteCards.forEach(card => {
                    const title = card.querySelector('h4').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
                    card.style.display = isMatch ? 'flex' : 'none';
                });
            }
        });
    };

    // --- Page Specific Logic ---

    /**
     * 初始化首页 (index.html)
     */
    const initIndexPage = async () => {
        const categoryGrid = document.getElementById('category-grid');
        if (!categoryGrid) return; // 确保元素存在

        const data = await fetchData();
        if (!data || !data.categories) return; // 获取数据失败或格式不对

        categoryGrid.innerHTML = ''; // 清空加载提示

        data.categories.forEach(category => {
            const categoryBlock = document.createElement('a');
            categoryBlock.href = `category.html?category=${category.id}`;
            categoryBlock.className = 'category-block'; // CSS 类名
            categoryBlock.innerHTML = `
                <h3>${category.name}</h3>
                ${category.description ? `<p>${category.description}</p>` : ''}
            `;
            categoryGrid.appendChild(categoryBlock);
        });

        // 应用动画
        applyEntranceAnimation('.category-block');
    };

    /**
     * 初始化板块页 (category.html)
     */
    const initCategoryPage = async () => {
        const categoryId = getQueryParam('category');
        const categoryTitleElement = document.getElementById('category-title');
        const siteGrid = document.getElementById('site-grid');

        if (!categoryId || !categoryTitleElement || !siteGrid) return;

        const data = await fetchData();
        if (!data || !data.categories) return;

        const category = data.categories.find(cat => cat.id === categoryId);

        if (!category) {
            categoryTitleElement.textContent = '分类未找到';
            siteGrid.innerHTML = '<p>无法找到您请求的分类，请返回首页。</p>';
            document.title = '分类未找到';
            return;
        }

        // 更新页面标题和 H1
        document.title = `${category.name} - 板块详情`;
        categoryTitleElement.textContent = category.name;

        siteGrid.innerHTML = ''; // 清空加载提示

        if (category.sites && category.sites.length > 0) {
            // 分页配置
            const pageSize = 24; // 增加每页显示的网站数量
            let currentPage = 1;
            let isLoading = false;
            let hasMore = true;

            // 加载数据的函数
            const loadMoreSites = () => {
                if (isLoading || !hasMore) return;
                
                isLoading = true;
                
                const start = (currentPage - 1) * pageSize;
                const end = start + pageSize;
                const sitesToLoad = category.sites.slice(start, end);
                
                if (sitesToLoad.length === 0) {
                    hasMore = false;
                    isLoading = false;
                    return;
                }

                // 使用 setTimeout 模拟异步加载，避免阻塞主线程
                setTimeout(() => {
                    sitesToLoad.forEach(site => {
                        const siteCard = createSiteCard(site);
                        siteGrid.appendChild(siteCard);
                    });

                    // 应用动画
                    applyEntranceAnimation('.site-card:nth-last-child(-n+' + sitesToLoad.length + ')');

                    currentPage++;
                    isLoading = false;
                    
                    // 检查是否还有更多数据
                    if (end >= category.sites.length) {
                        hasMore = false;
                    }
                }, 100);
            };

            // 初始加载第一页
            loadMoreSites();

            // 监听滚动到底部
            const handleScroll = () => {
                // 当用户滚动到距离底部200px时触发加载，提前加载更多内容
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
                    loadMoreSites();
                }
            };

            // 使用节流函数优化滚动事件
            let scrollTimeout;
            const throttledScroll = () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 100);
            };

            window.addEventListener('scroll', throttledScroll);

        } else {
            siteGrid.innerHTML = '<p>该板块下暂无网站。</p>';
        }
    };

    /**
     * 初始化关于页面 (about.html)
     */
    const initAboutPage = () => {
        const masonryGrid = document.querySelector('.masonry-grid');
        if (!masonryGrid) return;
        
        // 预加载图片
        const images = masonryGrid.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    };

    // --- Router (根据当前页面文件名判断执行哪个初始化函数) ---
    const currentPage = window.location.pathname.split('/').pop();

    // 初始化主题和搜索功能
    initTheme();
    initSearch();

    if (currentPage === 'index.html' || currentPage === '') {
        initIndexPage();
    } else if (currentPage === 'category.html') {
        initCategoryPage();
    } else if (currentPage === 'about.html') {
        initAboutPage();
    }

    // 添加瀑布流布局功能
    function initMasonry() {
        const grid = document.querySelector('.masonry-grid');
        if (!grid) return;

        const items = grid.querySelectorAll('.masonry-item');
        items.forEach(item => {
            item.addEventListener('load', () => {
                grid.style.opacity = '1';
            });
        });
    }

    // 页面加载完成后初始化瀑布流
    document.addEventListener('DOMContentLoaded', initMasonry);

    /**
     * 创建网站卡片
     * @param {Object} site - 网站数据对象
     * @returns {HTMLElement} 网站卡片元素
     */
    const createSiteCard = (site) => {
        const card = document.createElement('a');
        card.href = site.url;
        card.className = 'site-card';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        // 创建图标容器
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon';

        // 创建图标元素
        const icon = document.createElement('img');
        icon.alt = `${site.name} icon`;
        
        // 检查是否有图标URL
        if (site.icon) {
            icon.src = site.icon;
            icon.onerror = () => {
                // 如果图标加载失败，创建文字图标
                createTextIcon(iconContainer, site.name);
            };
            iconContainer.appendChild(icon);
        } else {
            // 如果没有图标URL，直接创建文字图标
            createTextIcon(iconContainer, site.name);
        }

        // 创建内容容器
        const content = document.createElement('div');
        content.className = 'content';

        // 创建标题
        const title = document.createElement('h4');
        title.textContent = site.name;

        // 创建描述
        const description = document.createElement('p');
        description.textContent = site.description || '暂无描述';

        // 组装内容
        content.appendChild(title);
        content.appendChild(description);

        // 组装卡片
        card.appendChild(iconContainer);
        card.appendChild(content);

        return card;
    };

    /**
     * 创建文字图标
     * @param {HTMLElement} container - 图标容器元素
     * @param {string} name - 网站名称
     */
    const createTextIcon = (container, name) => {
        // 清空容器
        container.innerHTML = '';
        
        // 获取网站名称的第一个字
        const firstChar = name.charAt(0);
        
        // 创建文字图标元素
        const textIcon = document.createElement('div');
        textIcon.className = 'text-icon';
        textIcon.textContent = firstChar;
        
        // 添加到容器
        container.appendChild(textIcon);
    };

});