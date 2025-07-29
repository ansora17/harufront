import axios from "./axiosInstance";

const API_BASE = "/api/members";

// 회원 가입 (multipart: data + profileImage)
export const signupMember = async (memberData, profileImage) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(memberData)], { type: "application/json" })
  );
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }
  return axios.post(`${API_BASE}/multipart`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 로그인 (cookie-based)
export const loginMember = async (nickname, password, retryCount = 0) => {
  try {
    const res = await axios.post(
      `${API_BASE}/login`,
      { nickname, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    console.error("❌ loginApi error:", err.response?.data || err.message);

    // Retry logic for network errors (max 2 retries)
    if (retryCount < 2 && (err.message === "Network Error" || !err.response)) {
      console.log(`🔄 Retrying login attempt ${retryCount + 1}/2...`);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1))
      ); // Exponential backoff
      return loginMember(nickname, password, retryCount + 1);
    }

    throw err;
  }
};

// 로그아웃 (cookie-based)
export const logoutMember = async () => {
  try {
    console.log("📡 Calling backend logout endpoint...");
    const response = await axios.post(`${API_BASE}/logout`);
    console.log("✅ Backend logout response:", response.status);
    return response;
  } catch (error) {
    console.error(
      "❌ Backend logout error:",
      error.response?.status,
      error.response?.data
    );
    // Don't throw the error - let the frontend continue with logout
    // The backend might not have a logout endpoint yet
    return null;
  }
};

// 현재 로그인된 사용자 정보 가져오기
export const fetchCurrentMember = async () => {
  const res = await axios.get(`${API_BASE}/me`);
  return res.data;
};

// 프로필 이미지 변경
export const updateProfileImage = async (id, profileImage) => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return axios.patch(`${API_BASE}/${id}/profile-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Supabase에서 받은 public URL을 백엔드로 전송 (MySQL에 저장됨)
export const updatePhoto = async (photoUrl) => {
  try {
    const response = await axios.patch(`${API_BASE}/me/profile-image`, {
      photoUrl: photoUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};

// 회원 탈퇴 (내 계정)
export const deleteAccount = async () => {
  return axios.delete(`${API_BASE}/me`).then((res) => res.data);
};

// 이메일 중복 확인
export const checkEmailExists = async (email) => {
  return axios.get(`${API_BASE}/check-email`, { params: { email } });
};

// 닉네임 중복 확인
export const checkNicknameExists = async (nickname) => {
  return axios.get(`${API_BASE}/check-nickname`, { params: { nickname } });
};

// 닉네임 찾기 (이름+이메일)
export const searchNickname = async (form) => {
  return axios.post(`${API_BASE}/search-nickname`, form);
};

// 비밀번호 재설정 요청
export const requestPasswordReset = async ({ name, email }) => {
  return axios.post(`${API_BASE}/reset-password`, { name, email });
};

// 프로필 검색 (닉네임/이메일)
export const searchProfiles = async ({ query }) => {
  return axios
    .get(`${API_BASE}/search`, { params: { query } })
    .then((res) => res.data);
};
// 프로필 정보 수정 (general profile update without image)
export const updateProfile = async (profileData) => {
  console.log("Profile update requested:", profileData);

  try {
    // Use axios (which is your configured axiosInstance)
    const response = await axios.put(`/api/members/me`, profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Profile update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile update error:", error);

    if (error.response?.status === 405) {
      alert(
        "프로필 수정 기능이 백엔드에서 아직 구현되지 않았습니다.\n\n" +
          "백엔드 개발자에게 다음 사항을 요청해주세요:\n" +
          "• MemberController에 PUT /api/members/me 엔드포인트 추가\n" +
          "• 프로필 업데이트 서비스 메서드 구현\n\n" +
          "Spring 로그: 'Request method PUT is not supported'"
      );
    } else if (error.response?.status === 401) {
      alert("인증이 필요합니다. 다시 로그인해주세요.");
    } else if (error.response?.status === 403) {
      alert("접근 권한이 없습니다.");
    } else {
      const message =
        error.response?.data?.message || "프로필 수정에 실패했습니다.";
      alert(message);
    }

    throw error;
  }
};

// 회원 정보 수정 (multipart: data + profileImage)
export const updateMemberWithImage = async (id, memberData, profileImage) => {
  console.log("Profile update with image requested:", {
    id,
    memberData,
    hasImage: !!profileImage,
  });

  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(memberData)], { type: "application/json" })
  );
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  try {
    // Use axios (which is your configured axiosInstance)
    const response = await axios.put(`/api/members/${id}/multipart`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Profile update with image successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile update with image error:", error);

    if (error.response?.status === 401) {
      alert("인증이 필요합니다. 다시 로그인해주세요.");
    } else if (error.response?.status === 403) {
      alert("접근 권한이 없습니다.");
    } else if (error.response?.status === 404) {
      alert("회원을 찾을 수 없습니다.");
    } else {
      const message =
        error.response?.data?.message || "프로필 수정에 실패했습니다.";
      alert(message);
    }

    throw error;
  }
};
