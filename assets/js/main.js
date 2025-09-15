// ====== ヘッダーナビ開閉 ======
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
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
