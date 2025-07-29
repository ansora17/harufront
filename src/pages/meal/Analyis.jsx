import React, { useRef, useState, useEffect } from "react";
import SubLayout from "../../layout/SubLayout";
import { useSelector, useDispatch } from "react-redux";
import { setMealRecords } from "../../slices/mealSlice";
import axios from "axios";

function Analyis() {
  const fileInputRef = useRef(null);
  const [timestamp, setTimestamp] = useState(null); //날짜, 시간
  const selectedMeal = useSelector((state) => state.meal.selectedMeal);
  // const [image, setImage] = useState(null);
  const [resultData, setResultData] = useState([]); //음식 이름 저장
  const [isLoading, setIsLoading] = useState(false); //로딩창
  const [images, setImages] = useState([]); //추가 이미지
  const mealRecords = useSelector((state) => state.meal.mealRecords);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimestamp(new Date());
  }, []);

  const handleImageClick = (e) => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const newImage = {
        file,
        url: base64, // 여기에 base64 저장
      };

      setImages((prev) => {
        const newArr = [...prev, newImage];
        sendImageToBackend(file, newArr.length - 1);
        return newArr;
      });

      setTimestamp(new Date());
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setResultData((prev) => prev.filter((_, i) => i !== index));
  };

  const sendImageToBackend = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/food/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const text = res.data.result;
      const parsed = parseNutritionData(text);

      setResultData((prev) => {
        const updated = [...prev];
        updated[index] = parsed;
        return updated;
      });
    } catch (err) {
      console.error("이미지 분석 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalNutrition = resultData.reduce(
    (acc, cur) => {
      acc.kcal += cur.kcal || 0;
      acc.carbs += cur.carbs || 0;
      acc.protein += cur.protein || 0;
      acc.fat += cur.fat || 0;
      acc.sodium += cur.sodium || 0;
      return acc;
    },
    { kcal: 0, carbs: 0, protein: 0, fat: 0, sodium: 0 }
  );

  const parseNutritionData = (text) => {
    const get = (label) => {
      const regex = new RegExp(`${label}:\\s*(\\d+(\\.\\d+)?)`);
      const match = text.match(regex);
      return match ? parseFloat(match[1]) : 0;
    };

    return {
      foodName: text.match(/요리명:\s*(.+)/)?.[1] || "알 수 없음",
      kcal: get("칼로리"),
      carbs: get("탄수화물"),
      protein: get("단백질"),
      fat: get("지방"),
      sodium: get("나트륨"),
      fiber: get("식이섬유"),
      gram: text.match(/총량:\s*(.+)/)?.[1] || "알 수 없음",
    };
  };

  const handleSaveMeal = () => {
    const record = {
      id: Date.now(),
      imageUrl: images[0]?.url,
      mealType: selectedMeal,
      timestamp: timestamp.toISOString(),
      kcal: totalNutrition.kcal,
      carbs: totalNutrition.carbs,
      protein: totalNutrition.protein,
      fat: totalNutrition.fat,
    };

    // Redux에 저장
    dispatch(setMealRecords([...mealRecords, record]));
    alert("식사 기록이 저장되었습니다.");
  };
  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-4">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="날짜를 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            placeholder="시간을 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={selectedMeal}
            readOnly
            className="input input-bordered flex-1 text-center"
          />
        </div>

        <div className="border-b border-gray-300">
          {/* 이미지 업로드 */}
          <div
            className="relative bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6 cursor-pointer"
            onClick={handleImageClick}
          >
            {images.length > 0 ? (
              <>
                <img
                  src={images[0].url}
                  alt="업로드된 이미지"
                  className="object-cover w-full h-full rounded-xl"
                />
                {resultData[0]?.foodName && (
                  <div className="absolute top-4 left-4 bg-purple-500/90 text-white text-xl font-bold px-4 py-2 rounded-full">
                    {resultData[0].foodName}
                  </div>
                )}
              </>
            ) : (
              <span className="text-4xl text-gray-400">＋</span>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* 총 섭취량 */}
          <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
            <div className="flex justify-between font-bold text-lg mb-6 px-10">
              <h2>총 섭취량</h2>
              <div className="flex">
                <p>{totalNutrition.kcal || 0}</p>
                <span className="text-purple-500">kcal</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
              {[
                ["탄수화물", totalNutrition.carbs],
                ["단백질", totalNutrition.protein],
                ["지방", totalNutrition.fat],
                ["나트륨", Math.round((totalNutrition.sodium ?? 0) * 10) / 10],
              ].map(([label, value], i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {value ?? 0}
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl pt-7 pr-7 pb-3 ps-0">
          <div className="flex justify-between font-bold text-2xl ">
            <h2 className="text-lg sm:text-xl font-semibold">음식 정보 수정</h2>
          </div>
        </div>

        {/* 이미지 카드 수평 슬라이드 */}
        <div className="overflow-x-auto no-scrollbar mb-8">
          <div className="flex gap-4 w-max px-1">
            {/* 이미지 추가 버튼 */}
            <div
              className="min-w-[44px] h-56 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl cursor-pointer"
              onClick={handleImageClick}
            >
              +
            </div>

            {/* 이미지 카드만 */}
            {images.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-[200px] h-[200px] bg-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={img.url}
                    alt={`uploaded-${i}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {resultData[i]?.foodName || "요리명"}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* 이미지별 분석 결과는 아래쪽에 세로로 나열 */}
        {resultData.map((data, i) => (
          <div key={i} className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">{data.foodName || "요리명"}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {data.gram || "총량 정보 없음"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                  −
                </button>
                <div className="w-10 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                  1
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold text-purple-500">
                  ＋
                </button>
                {/* <span className="ml-2 text-sm text-gray-500">100g</span> */}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-8">
          <button
            className="btn bg-purple-500 text-white w-full rounded-lg py-6 text-base"
            onClick={handleSaveMeal}
          >
            기록하기
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
            <span className="loader border-4 border-purple-500 border-t-transparent rounded-full w-8 h-8 animate-spin" />
            <p className="text-lg font-bold text-purple-700">
              분석 중입니다...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Analyis;
