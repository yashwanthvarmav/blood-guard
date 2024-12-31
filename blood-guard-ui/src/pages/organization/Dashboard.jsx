import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";

import { getBloodCamps, getBloodCenters, getBloodCount } from "../../context/apis";
import { useAuth } from "../../context/AuthContext";

const OrganizationDashboard = () => {

  const data = {
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["O+", "A-", "B+", "AB-", "B-", "AB+", "A+", "O-"],
      },
      colors: [
        "#AEDFF7",
        "#FFC5B9",
        "#C6F7E2",
        "#FFF6A5",
        "#E2CFFC",
        "#FAD6A5",
        "#FFDFDF",
        "#CFE4FC",
      ],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 5,
        },
      },
      dataLabels: {
        style: {
          colors: ["#333"],
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      title: {
        text: "Blood Stock Levels",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#4A4A4A",
        },
      },
    },
    series: [
      {
        name: "Stock Count",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  const { profileDate } = useAuth();
const [bloodCounts,setBloodCounts]=useState(data)

  const cards = [
    { title: "Blood Requests", count: 25, bgColor: "bg-[#FEE2E2]", icon: "🩸" },
    { title: "New Donors", count: 12, bgColor: "bg-[#FFF7ED]", icon: "🤝" },
    { title: "Appointments", count: 8, bgColor: "bg-[#ECFDF5]", icon: "📅" },
    { title: "Notifications", count: 4, bgColor: "bg-[#F3E8FF]", icon: "🔔" },
  ];

 const getBloodCountList = async () => {
       try {
         const payload={organization_id:profileDate?.user?.id}
         
         const response = await getBloodCount(payload);
         const datas={}
         const bloods = response?.data?.length
         ? response.data.map((item) => {
             datas[item.blood_group] = item?.count; // Corrected assignment syntax
             return item;
           })
         : [];
        const series= [
          {
            name: "Stock Count",
            data: ["O+", "A-", "B+", "AB-", "B-", "AB+", "A+", "O-"]?.map(item=>datas?.[item]||0),
          },
        ]

          setBloodCounts(prev=>({...prev,series:series}));

       } catch (e) {
         console.log(e);
       }
     };


  useEffect(() => {
    getBloodCountList();
  }, []);

  return (
    <div className="w-full px-5 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cards?.length && cards?.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${card.bgColor}`}
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {card.count}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md mt-12">
        <Chart
          options={bloodCounts?.options}
          series={bloodCounts?.series}
          type="bar"
          height={550}
        />
      </div>

      

   

  
    </div>
  );
};

export default OrganizationDashboard;
