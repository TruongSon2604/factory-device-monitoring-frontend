
import React from 'react';
import InfoCard from './InfoCard';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { FaAndroid, FaApple, FaShoppingCart, FaBug } from 'react-icons/fa';

// ==========================
// 1. Dữ liệu biểu đồ
// ==========================
const visitsData = [
  { month: "Jan", users: 4000, orders: 2400 },
  { month: "Feb", users: 3000, orders: 1398 },
  { month: "Mar", users: 2000, orders: 9800 },
  { month: "Apr", users: 2780, orders: 3908 },
  { month: "May", users: 1890, orders: 4800 },
  { month: "Jun", users: 2390, orders: 3800 },
  { month: "Jul", users: 3490, orders: 4300 },
];

const pieData = [
  { name: "Asia", value: 400 },
  { name: "Europe", value: 300 },
  { name: "America", value: 300 },
  { name: "Africa", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// ==========================
// 2. Dữ liệu cards
// ==========================
const cardData = [
  { value: '714K', title: 'Weekly Sales', bgColor: 'bg-blue-50', icon: FaAndroid, iconColor: 'text-blue-500' },
  { value: '1.35M', title: 'New Users', bgColor: 'bg-cyan-50', icon: FaApple, iconColor: 'text-cyan-500' },
  { value: '1.72M', title: 'Item Orders', bgColor: 'bg-yellow-50', icon: FaShoppingCart, iconColor: 'text-yellow-500' },
  { value: '234', title: 'Bug Reports', bgColor: 'bg-red-50', icon: FaBug, iconColor: 'text-red-500' },
];


const MainDashboard = () => (
  <div className="p-8 bg-gray-50 flex-grow">
    {/* Header Greeting */}
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Hi, Welcome back</h1>

    {/* 1. Info Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardData.map((data, index) => (
        <InfoCard key={index} {...data} />
      ))}
    </div>

    {/* 2. Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-1 text-gray-800">Website Visits</h2>
        <p className="text-sm text-gray-500 mb-4">(+43% than last year)</p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitsData}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
              <Bar dataKey="orders" fill="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ 1/3: Pie Chart */}
      <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Visits</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  </div>
);

export default MainDashboard;
