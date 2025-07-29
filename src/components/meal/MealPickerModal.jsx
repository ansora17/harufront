import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMeal } from "../../slices/mealSlice";

function MealPickerModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedMeal = useSelector((state) => state.meal.selectedMeal);

  const meals = ["아침", "점심", "저녁", "간식"];

  const handleConfirm = () => {
    if (!selectedMeal) return alert("식사 타입을 선택하세요.");
    console.log("선택한 식사 타입:", selectedMeal);
    setOpen(false);
    navigate("/dashboard/analyis"); // 'analyis'로 수정 (라우터에 맞춤)
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* fixed 추가 */}
      <button
        className="btn text-white rounded-full bg-purple-500 text-xl sm:text-3xl border-none w-13 h-13 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        <span className="text-2xl">+</span>
      </button>

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">식사 타입 선택</h3>
            <div className="flex flex-col gap-2">
              {meals.map((meal) => (
                <button
                  key={meal}
                  className={`btn btn-ghost border-none ${
                    selectedMeal === meal
                      ? "text-purple-500 font-bold bg-purple-50"
                      : ""
                  }`}
                  onClick={() => dispatch(setSelectedMeal(meal))}
                >
                  {meal}
                </button>
              ))}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className="btn bg-purple-500 text-white hover:bg-purple-700"
                onClick={handleConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MealPickerModal;
