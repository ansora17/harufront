import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// axios 인스턴스 생성
const boardApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 인증 토큰 추가/
boardApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
boardApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API 에러:", error);
    return Promise.reject(error);
  }
);

// ===== 게시글 관련 API =====

// 전체 게시글 목록 조회
export const getAllBoards = async () => {
  try {
    const response = await boardApi.get("/boards");
    return response.data;
  } catch (error) {
    throw new Error("게시글 목록을 불러오는데 실패했습니다.");
  }
};

// 특정 게시글 조회
export const getBoardById = async (boardId) => {
  try {
    const response = await boardApi.get(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
};

// 회원별 게시글 조회 (백엔드 엔드포인트에 맞게 수정)
export const getBoardsByMemberId = async (memberId) => {
  try {
    const response = await boardApi.get(`/boards/member/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error("게시글 목록을 불러오는데 실패했습니다.");
  }
};

// 게시글 작성 (memberId를 쿼리 파라미터로 전송)
export const createBoard = async (memberId, boardData) => {
  try {
    const response = await boardApi.post(
      `/boards?memberId=${memberId}`,
      boardData
    );
    return response.data;
  } catch (error) {
    throw new Error("게시글 작성에 실패했습니다.");
  }
};

// 게시글 수정
export const updateBoard = async (boardId, boardData) => {
  try {
    const response = await boardApi.put(`/boards/${boardId}`, boardData);
    return response.data;
  } catch (error) {
    throw new Error("게시글 수정에 실패했습니다.");
  }
};

// 게시글 삭제
export const deleteBoard = async (boardId) => {
  try {
    const response = await boardApi.delete(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }
};

// ===== 댓글 관련 API =====

// 댓글 추가
export const addComment = async (boardId, memberId, commentData) => {
  try {
    const response = await boardApi.post(
      `/boards/${boardId}/comments?memberId=${memberId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw new Error("댓글 작성에 실패했습니다.");
  }
};

// 특정 게시글의 댓글 목록 조회
export const getCommentsByBoardId = async (boardId) => {
  try {
    const response = await boardApi.get(`/boards/${boardId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error("댓글 목록을 불러오는데 실패했습니다.");
  }
};

// 특정 댓글 조회
export const getCommentById = async (commentId) => {
  try {
    const response = await boardApi.get(`/boards/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }
};

// 특정 회원이 작성한 댓글 목록 조회
export const getCommentsByMemberId = async (memberId) => {
  try {
    const response = await boardApi.get(`/boards/comments/member/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error("댓글 목록을 불러오는데 실패했습니다.");
  }
};

// 댓글 수정
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await boardApi.put(
      `/boards/comments/${commentId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw new Error("댓글 수정에 실패했습니다.");
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await boardApi.delete(`/boards/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }
};

export default boardApi;
