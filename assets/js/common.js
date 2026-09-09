/* 公共脚本：侧边栏交互、通用占位提示 */

document.addEventListener('DOMContentLoaded', function () {
  var sideToast = document.getElementById('sideToast');
  var sideToastMessages = {
    publish: '发布需求（占位）',
    cart: '购物车（占位）',
    service: '联系客服（占位）'
  };
  var toastTimer = null;

  function showToast(msg) {
    if (!sideToast) return;
    sideToast.textContent = msg;
    sideToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      sideToast.classList.remove('show');
    }, 2000);
  }

  // 侧边栏悬浮按钮
  Array.prototype.forEach.call(document.querySelectorAll('.side-item'), function (item) {
    item.addEventListener('click', function () {
      showToast(sideToastMessages[item.dataset.action] || '占位功能');
    });
  });

  // 带 data-toast 的元素：点击弹出占位提示
  Array.prototype.forEach.call(document.querySelectorAll('[data-toast]'), function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast(el.dataset.toast);
    });
  });

  /* ===== 数据资源 / 数据产品 列表页交互 ===== */

  // 筛选标签：同组内单选
  Array.prototype.forEach.call(document.querySelectorAll('.cat-filter-tags'), function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.cat-tag'), function (tag) {
      tag.addEventListener('click', function () {
        Array.prototype.forEach.call(group.querySelectorAll('.cat-tag'), function (t) {
          t.classList.remove('active');
        });
        tag.classList.add('active');
      });
    });
  });

  // 筛选区：展开 / 收缩整个筛选区
  var filtersToggle = document.getElementById('filtersToggle');
  var filtersWrap = document.querySelector('.cat-filters');
  if (filtersToggle && filtersWrap) {
    filtersToggle.addEventListener('click', function () {
      var collapsed = filtersWrap.classList.toggle('collapsed');
      filtersToggle.innerHTML = collapsed ? '展开 <span class="caret">∨</span>' : '收缩 <span class="caret">∧</span>';
    });
  }

  // 智能问数开关
  Array.prototype.forEach.call(document.querySelectorAll('.cat-toggle'), function (tg) {
    tg.addEventListener('click', function () {
      tg.classList.toggle('on');
    });
  });

  // 排序：单选高亮
  Array.prototype.forEach.call(document.querySelectorAll('.cat-sort'), function (sort) {
    Array.prototype.forEach.call(sort.querySelectorAll('.cat-sort-btn'), function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(sort.querySelectorAll('.cat-sort-btn'), function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
  });

  // 分页：单选高亮
  Array.prototype.forEach.call(document.querySelectorAll('.cat-pages'), function (pages) {
    Array.prototype.forEach.call(pages.querySelectorAll('.cat-page-btn'), function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(pages.querySelectorAll('.cat-page-btn'), function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
  });

  // 热门搜索：点击填入搜索框
  var catSearchInput = document.querySelector('.cat-search input');
  Array.prototype.forEach.call(document.querySelectorAll('.cat-hot-tag'), function (t) {
    t.addEventListener('click', function () {
      if (catSearchInput) catSearchInput.value = t.textContent.trim();
    });
  });

  // 副标题数据翻页卡片
  var statsCarousel = document.getElementById('statsCarousel');
  if (statsCarousel) {
    var sSlides = statsCarousel.querySelectorAll('.odometer-slide');
    var sDots = document.querySelectorAll('#statsDots .cat-stats-dot');
    var sIdx = 0;
    var sTimer = null;
    function showStats(i) {
      sIdx = (i + sSlides.length) % sSlides.length;
      Array.prototype.forEach.call(sSlides, function (s, j) { s.classList.toggle('active', j === sIdx); });
      Array.prototype.forEach.call(sDots, function (d, j) { d.classList.toggle('active', j === sIdx); });
    }
    function startAuto() {
      stopAuto();
      sTimer = setInterval(function () { showStats(sIdx + 1); }, 4000);
    }
    function stopAuto() {
      if (sTimer) { clearInterval(sTimer); sTimer = null; }
    }
    Array.prototype.forEach.call(sDots, function (d, j) {
      d.addEventListener('click', function () { showStats(j); startAuto(); });
    });
    statsCarousel.addEventListener('mouseenter', stopAuto);
    statsCarousel.addEventListener('mouseleave', startAuto);
    if (sSlides.length > 1) startAuto();
  }

  /* ===== 关于我们：图库 Tab 切换 ===== */
  var aboutGallery = document.getElementById('aboutGallery');
  if (aboutGallery) {
    var aboutTabs = aboutGallery.querySelectorAll('.about-tab');
    var aboutPanels = aboutGallery.querySelectorAll('.about-panel');
    Array.prototype.forEach.call(aboutTabs, function (tab, i) {
      tab.addEventListener('click', function () {
        Array.prototype.forEach.call(aboutTabs, function (t) { t.classList.remove('active'); });
        Array.prototype.forEach.call(aboutPanels, function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        aboutPanels[i].classList.add('active');
      });
    });
  }
});
