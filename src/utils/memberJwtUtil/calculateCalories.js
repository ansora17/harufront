import dayjs from "dayjs";

export const calculateCalories = ({
  birthAt,
  height,
  weight,
  activityLevel,
  gender,
}) => {
  const age = dayjs().diff(birthAt, "year");
  let bmr =
    10 * weight + 6.25 * height - 5 * age + (gender === "FEMALE" ? -161 : 5);
  const factor = {
    LOW: 1.2,
    MEDIUM: 1.375,
    HIGH: 1.55,
  }[activityLevel];
  return Math.round(bmr * factor);
};
