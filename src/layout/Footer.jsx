import React from "react";

function Footer() {
  return (
    <div className="bg-[#f7f7f7] ">
      {/* <div className="container m-auto flex flex-col justify-center items-center gap-3 px-3">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <p className="text-purple-500 text-xl sm:text-2xl font-semibold">
            전화 02-3667-0008
          </p>
          <p className="text-sm sm:text-base">
            서울특별시 구로구 경인로 557 삼영빌딩 4층
          </p>
        </div>

        <p className="text-gray-400 text-sm sm:text-base">
          © 하이미디어 구로캠버스 자바 풀스택 AI 융합 웹개발
        </p>
      </div> */}
      <footer className="w-[1020px] footer sm:footer-horizontal bg-base-200 text-base-content container mx-auto p-10">
        <nav>
          <h6 className="footer-title">회사 소개</h6>
          <a className="link link-hover">Harukcal 소개</a>
          <a className="link link-hover">채용</a>
          <a className="link link-hover">보안</a>
          <a className="link link-hover">서비스 상태</a>
        </nav>
        <nav>
          <h6 className="footer-title">서비스</h6>
          <a className="link link-hover">브랜딩</a>
          <a className="link link-hover">설계</a>
          <a className="link link-hover">마케팅</a>
          <a className="link link-hover">광고</a>
        </nav>
        <nav>
          <h6 className="footer-title">법률</h6>
          <a className="link link-hover">이용약관</a>
          <a className="link link-hover">개인정보 보호정책</a>
          <a className="link link-hover">쿠키 정책</a>
        </nav>
      </footer>
      <footer className="w-[1020px] footer bg-base-200 text-base-content border-base-300 container mx-auto border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          {/* <img src="public/haru.svg" alt="" className="w-10" /> */}
          {/* <p> */}
          <div>
            <p className="text-sm sm:text-base">
              서울특별시 구로구 경인로 557 삼영빌딩 4층
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              © 하이미디어 구로캠버스 자바 풀스택 AI 융합 웹개발
            </p>
          </div>
          {/* </p> */}
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
