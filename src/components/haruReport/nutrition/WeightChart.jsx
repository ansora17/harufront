import React, { useRef, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const WeightChart = ({ period }) => {
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

  // 임시 데이터 (나중에 API로 대체)
  const data = [
    { date: "6/1", weight: 70 },
    { date: "6/2", weight: 69.8 },
    { date: "6/3", weight: 69.5 },
    { date: "6/4", weight: 69.7 },
    { date: "6/5", weight: 69.3 },
    { date: "6/6", weight: 69.1 },
    { date: "6/7", weight: 69.0 },
  ];

  const targetWeight = 65; // 목표 체중 (나중에 사용자 설정값으로 대체)
  const currentWeight = data[data.length - 1].weight;

  return (
    <div ref={containerRef}>
      <div className="mb-4 flex justify-end">
        <span className="text-gray-600">현재 체중:</span>
        <span className="ml-2 font-bold text-lg">{currentWeight}kg</span>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip />
            <Legend
              formatter={(value) => (
                <span style={{ color: "black" }}>{value}</span>
              )}
            />
            <ReferenceLine
              y={targetWeight}
              label="목표 체중"
              stroke="#ff7300"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="체중"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeightChart;
