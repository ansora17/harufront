import fs from "fs";
import path from "path";

// Create backup directories
const backupDirs = [
  "src/backup/auth-system",
  "src/backup/auth-system/api",
  "src/backup/auth-system/components",
  "src/backup/auth-system/utils",
  "src/backup/auth-system/slices",
  "src/backup/auth-system/layout",
  "src/backup/auth-system/pages",
];

backupDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Files to backup
const filesToBackup = [
  // API files
  {
    src: "src/api/authIssueUserApi/memberApi.js",
    dest: "src/backup/auth-system/api/memberApi.js",
  },
  {
    src: "src/api/authIssueUserApi/authApi.js",
    dest: "src/backup/auth-system/api/authApi.js",
  },
  {
    src: "src/api/authIssueUserApi/userApi.js",
    dest: "src/backup/auth-system/api/userApi.js",
  },
  {
    src: "src/api/authIssueUserApi/issueApi.js",
    dest: "src/backup/auth-system/api/issueApi.js",
  },
  {
    src: "src/api/authIssueUserApi/axiosInstance.js",
    dest: "src/backup/auth-system/api/axiosInstance.js",
  },
  {
    src: "src/api/authIssueUserApi/tokenUtil.js",
    dest: "src/backup/auth-system/api/tokenUtil.js",
  },

  // Components
  {
    src: "src/components/mypage/useInitAuth.js",
    dest: "src/backup/auth-system/components/useInitAuth.js",
  },
  {
    src: "src/components/mypage/DebugAuthOverlay.jsx",
    dest: "src/backup/auth-system/components/DebugAuthOverlay.jsx",
  },
  {
    src: "src/components/mypage/useLogout.js",
    dest: "src/backup/auth-system/components/useLogout.js",
  },

  // Layout
  {
    src: "src/layout/Header.jsx",
    dest: "src/backup/auth-system/layout/Header.jsx",
  },

  // Pages
  {
    src: "src/pages/member/Login.jsx",
    dest: "src/backup/auth-system/pages/Login.jsx",
  },
  {
    src: "src/pages/community/Issue.jsx",
    dest: "src/backup/auth-system/pages/Issue.jsx",
  },
  {
    src: "src/components/community/issue/IssueWrite.jsx",
    dest: "src/backup/auth-system/components/IssueWrite.jsx",
  },
  {
    src: "src/components/community/issue/IssueDetail.jsx",
    dest: "src/backup/auth-system/components/IssueDetail.jsx",
  },
  {
    src: "src/components/community/issue/IssueUpdate.jsx",
    dest: "src/backup/auth-system/components/IssueUpdate.jsx",
  },

  // Slices
  {
    src: "src/slices/loginSlice.js",
    dest: "src/backup/auth-system/slices/loginSlice.js",
  },

  // Utils
  {
    src: "src/utils/memberJwtUtil/validatos.js",
    dest: "src/backup/auth-system/utils/validatos.js",
  },
  {
    src: "src/utils/memberJwtUtil/jwtUtilsOld.js",
    dest: "src/backup/auth-system/utils/jwtUtilsOld.js",
  },
  {
    src: "src/utils/memberJwtUtil/axiosConfigOld.js",
    dest: "src/backup/auth-system/utils/axiosConfigOld.js",
  },

  // Store
  { src: "src/store/store.js", dest: "src/backup/auth-system/store.js" },

  // App
  { src: "src/App.jsx", dest: "src/backup/auth-system/App.jsx" },
];

// Backup files
filesToBackup.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Backed up: ${src} -> ${dest}`);
  } else {
    console.log(`⚠️  File not found: ${src}`);
  }
});

// Create backup info file
const backupInfo = {
  timestamp: new Date().toISOString(),
  description: "Authentication system backup before cleanup",
  files: filesToBackup.map((f) => f.src),
  totalFiles: filesToBackup.length,
};

fs.writeFileSync(
  "src/backup/auth-system/backup-info.json",
  JSON.stringify(backupInfo, null, 2)
);

console.log("\n🎉 Backup completed successfully!");
console.log("📁 Backup location: src/backup/auth-system/");
console.log("📄 Backup info: src/backup/auth-system/backup-info.json");
