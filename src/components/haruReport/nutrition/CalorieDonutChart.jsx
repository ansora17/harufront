import React, { useRef, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 식사 타입별 색상 정의
const MEAL_COLORS = {
  아침: "#fcd34d", // yellow-300
  점심: "#93c5fd", // blue-300
  저녁: "#fca5a5", // red-300
  간식: "#c4b5fd", // purple-300
};

const CalorieDonutChart = ({ data = [] }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  console.log("🔍 CalorieDonutChart 받은 데이터:", data);

  // 식사 타입별 칼로리 계산
  const processedData = (() => {
    if (!data || data.length === 0) {
      return [{ name: "데이터 없음", calories: 0, percentage: 100 }];
    }

    const mealTypeCalories = {
      아침: 0,
      점심: 0,
      저녁: 0,
      간식: 0,
    };

    // 각 식사 타입별 칼로리 합계 계산
    data.forEach((meal) => {
      const type = meal.type || "간식";
      const calories = meal.totalKcal || meal.calories || 0;
      if (mealTypeCalories.hasOwnProperty(type)) {
        mealTypeCalories[type] += calories;
      } else {
        mealTypeCalories["간식"] += calories;
      }
    });

    const totalCalories = Object.values(mealTypeCalories).reduce(
      (sum, cal) => sum + cal,
      0
    );

    if (totalCalories === 0) {
      return [{ name: "데이터 없음", calories: 0, percentage: 100 }];
    }

    return Object.entries(mealTypeCalories)
      .filter(([_, calories]) => calories > 0)
      .map(([type, calories]) => ({
        name: type,
        calories: calories,
        percentage: Math.round((calories / totalCalories) * 100),
      }));
  })();

  const totalCalories = processedData.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border rounded shadow p-2">
          <p className="font-semibold">{data.name}</p>
          <p>
            {data.calories}kcal ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        fontSize={14}
        fontWeight="semibold"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${processedData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div ref={containerRef}>
      <div className="w-full h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="85%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="calories"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {processedData.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={MEAL_COLORS[entry.name] || "#d1d5db"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span style={{ color: "black" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalorieDonutChart;
