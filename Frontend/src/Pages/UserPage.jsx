import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import VerticalTimeline from "../Components/VerticalLine";

const UserDashboard = () => {
  // Dummy data for assigned items, complaints, and growth analytics
  const [assignedItems] = useState([
    {
      id: 1,
      name: "Laptop",
      photo: "https://placehold.co/48x48",
      warrantyDate: "2024-12-31",
      insuranceDate: "2024-12-31",
      assignedDate: "2024-07-08",
      complaintReceivedDate: "2024-07-10",
      complaintResolvedDate: "2024-07-12",
    },
    // Add more assigned items as needed
  ]);

  const [complaints] = useState([
    {
      id: 1,
      title: "Slow laptop performance",
      description: "Laptop is lagging frequently",
      status: "Resolved",
      receivedDate: "2024-07-10",
      resolvedDate: "2024-07-12",
    },
    // Add more complaints as needed
  ]);

  // Sample data for growth analytics chart (Bar chart)
  const growthAnalyticsData = {
    labels: ["Laptop", "Printer", "Monitor", "Keyboard", "Mouse"],
    datasets: [
      {
        label: "Warranty",
        backgroundColor: "#3182CE",
        borderColor: "#3182CE",
        borderWidth: 1,
        hoverBackgroundColor: "#3182CE",
        hoverBorderColor: "#3182CE",
        data: [5, 7, 3, 6, 4],
      },
      {
        label: "Insurance",
        backgroundColor: "#38A169",
        borderColor: "#38A169",
        borderWidth: 1,
        hoverBackgroundColor: "#38A169",
        hoverBorderColor: "#38A169",
        data: [3, 2, 6, 5, 8],
      },
    ],
  };

  // Sample options for growth analytics chart
  const growthAnalyticsOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <NavBar />
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex items-center space-x-4">
          <button className="text-muted-foreground">All Teams</button>
          <button className="text-muted-foreground">
            <FaSearch />
          </button>
          <button className="text-muted-foreground">
            <FaBell />
          </button>
          <button className="text-muted-foreground">
            <FaCog />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src="https://avatars.githubusercontent.com/u/132883472?v=4"
              alt="Profile Picture"
            />
            <div>
              <h2 className="text-lg font-semibold">Susanta Swain</h2>
              <p className="text-muted-foreground">Susnatas@okcl.org</p>
              <p className="text-muted-foreground">
                Intern
              </p>
            </div>
          </div>
          <h3 className="text-md font-medium mb-2">Growth Analyst</h3>
          {/* Growth Analytics Chart */}
          <div className="h-64">
            <Bar data={growthAnalyticsData} options={growthAnalyticsOptions} />
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-md font-medium mb-2">Assigned Items</h3>
            {/* Display assigned items */}
            {assignedItems.map((item) => (
              <div key={item.id} className="mb-4">
                <img
                  className="w-12 h-12 rounded-full mb-2"
                  src={item.photo}
                  alt={item.name}
                />
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-muted-foreground">
                  Warranty Date: {item.warrantyDate}
                </p>
                <p className="text-muted-foreground">
                  Insurance Date: {item.insuranceDate}
                </p>
                <p className="text-muted-foreground">
                  Assigned Date: {item.assignedDate}
                </p>
                <p className="text-muted-foreground">
                  Complaint Received: {item.complaintReceivedDate}
                </p>
                <p className="text-muted-foreground">
                  Complaint Resolved: {item.complaintResolvedDate}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-card p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-md font-medium mb-2">Complaint Progress Tracker</h3>
            {/* Display vertical timeline for complaints */}
            <VerticalTimeline complaints={complaints} />
          </div>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium">Date Asset Assigned</h3>
          <div className="flex items-center space-x-4">
            <button className="text-muted-foreground">Show: 1 Week</button>
            <button className="text-muted-foreground">←</button>
            <button className="text-muted-foreground">→</button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-muted-foreground mb-4">
          {/* Calendar or date representation */}
          <div>7 Tue</div>
          <div>8 Wed</div>
          <div>9 Thu</div>
          <div>10 Fri</div>
          <div>11 Sat</div>
          <div>12 Sun</div>
          <div>13 Mon</div>
        </div>
        {/* List of events or assignments */}
        <div className="space-y-4">
          <div className="bg-zinc-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="text-md font-medium">2021 Strategy for Bundle</h4>
              <p className="text-muted-foreground">Business Team</p>
            </div>
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8 rounded-full" src="https://placehold.co/32x32" alt="Member 1" />
              <img className="w-8 h-8 rounded-full" src="https://placehold.co/32x32" alt="Member 2" />
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="text-md font-medium">Product roadmap consideration</h4>
              <p className="text-muted-foreground">Product Team</p>
            </div>
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8 rounded-full" src="https://placehold.co/32x32" alt="Member 1" />
            </div>
          </div>
          <div className="bg-zinc-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="text-md font-medium">Test for 2.31</h4>
              <p className="text-muted-foreground">Product</p>
            </div>
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8 rounded-full" src="https://placehold.co/32x32" alt="Member 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
