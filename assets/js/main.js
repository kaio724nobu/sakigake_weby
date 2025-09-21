// ====== ヘッダーナビ開閉（モバイル対応強化） ======
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
if (menuToggle && navList) {
  const setMenu = (open) => {
    navList.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    navList.toggleAttribute("hidden", !open);
  };

  // 初期状態
  setMenu(false);

  // トグル押下
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = !navList.classList.contains("open");
    setMenu(open);
  });

  // リンク押下で閉じる（内部リンク/外部リンクともに）
  navList.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.closest && t.closest("a")) {
      setMenu(false);
    }
  });

  // 外側クリックで閉じる
  document.addEventListener("click", (e) => {
    if (!navList.classList.contains("open")) return;
    const withinNav = navList.contains(e.target) || menuToggle.contains(e.target);
    if (!withinNav) setMenu(false);
  });

  // Escキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}

// ====== 年表示 ======
const y = document.getElementById("year");
if (y) y.textContent = String(new Date().getFullYear());

// ====== プライバシーポリシー ======
const openPrivacy = document.getElementById("openPrivacy");
const closePrivacy = document.getElementById("closePrivacy");
const privacyDialog = document.getElementById("privacyDialog");
if (openPrivacy && closePrivacy && privacyDialog) {
  openPrivacy.addEventListener("click", (e) => {
    e.preventDefault();
    privacyDialog.showModal();
  });
  closePrivacy.addEventListener("click", () => privacyDialog.close());
}

// 連絡フォームは外部フォームに変更のため、JS処理は不要

// ====== キャンペーン価格（簡易切替） ======
// 使い方:
// 1) enabled を true にし、期間(start/end)と各プランの regular/sale を設定
// 2) index.html 側の価格要素に id="price-light" / id="price-standard" を付与済み
// 3) 必要に応じて #campaign-note に注記を表示
(function () {
  const campaign = {
    enabled: false, // ← 有効化する場合は true
    start: "2025-09-20", // 例: YYYY-MM-DD（開始日）
    end: "2025-10-31",   // 例: YYYY-MM-DD（終了日）
    plans: {
      light: { regular: 15000, sale: 12000, label: "キャンペーン" },
      standard: { regular: 30000, sale: 24000, label: "キャンペーン" }
    },
    note: "キャンペーン実施中！期間限定価格です。"
  };

  // URLクエリで ?campaign=1 を付ければ一時的に有効化（確認用）
  const params = new URLSearchParams(location.search);
  const queryEnabled = params.get("campaign") === "1";

  if (!campaign.enabled && !queryEnabled) return;

  const today = new Date();
  const inPeriod = (startStr, endStr) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    return today >= s && today <= e;
  };
  if (!inPeriod(campaign.start, campaign.end) && !queryEnabled) return;

  const fmt = (n) => n.toLocaleString("ja-JP");

  const applySale = (planKey, elId) => {
    const cfg = campaign.plans[planKey];
    const el = document.getElementById(elId);
    if (!cfg || !el) return;
    // 価格表示を 旧価格 + 新価格 に差し替え
    el.innerHTML = `<span class="old-price"><span>¥</span>${fmt(cfg.regular)}</span><span class="now"><span>¥</span>${fmt(cfg.sale)}</span>`;
    // バッジ追加（カードの見出しの横）
    const card = el.closest("[data-plan]");
    if (card) {
      const h3 = card.querySelector("h3");
      if (h3 && !h3.querySelector('.sale-badge')) {
        const b = document.createElement("span");
        b.className = "sale-badge";
        b.textContent = cfg.label || "SALE";
        h3.appendChild(b);
      }
    }
  };

  applySale("light", "price-light");
  applySale("standard", "price-standard");

  const note = document.getElementById("campaign-note");
  if (note) {
    note.style.display = "block";
    const end = new Date(campaign.end);
    const endTxt = `${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日まで`;
    note.textContent = `${campaign.note}（${endTxt}）`;
  }
})();
