import React from 'react';
import NavBar from '../Components/NavBar';
import data from '../Data/Data.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useTable } from 'react-table';
import 'chart.js/auto';
import { FaUser,FaTools } from 'react-icons/fa';
import { SiRetool } from "react-icons/si";
import { AiFillHdd } from "react-icons/ai";

const Dashboard = () => {

  const assetTypesData = {
    labels: data.assetTypes.map(type => type.type),
    datasets: [{
      label: 'Asset Types',
      data: data.assetTypes.map(type => type.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)',
        'rgba(83, 102, 255, 0.6)',
        'rgba(233, 30, 99, 0.6)',
        'rgba(0, 200, 83, 0.6)'
      ]
    }]
  };

  const assetStatusData = {
    labels: data.assetStatus.map(status => status.status),
    datasets: [{
      label: 'Asset Status',
      data: data.assetStatus.map(status => status.count),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(83, 102, 255, 0.6)',
        'rgba(233, 30, 99, 0.6)'
      ]
    }]
  };

  // Table data
  const recentAssetActivityColumns = React.useMemo(() => [
    { Header: 'Asset', accessor: 'asset' },
    { Header: 'Employee', accessor: 'employee' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'Date', accessor: 'date' }
  ], []);

  const recentComponentActivityColumns = React.useMemo(() => [
    { Header: 'Component', accessor: 'component' },
    { Header: 'Asset', accessor: 'asset' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'Date', accessor: 'date' }
  ], []);

  const recentAssetActivityTable = useTable({
    columns: recentAssetActivityColumns,
    data: data.recentAssetActivity
  });

  const recentComponentActivityTable = useTable({
    columns: recentComponentActivityColumns,
    data: data.recentComponentActivity
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar className="fixed top-0 w-full z-10" />
      <div className="pt-16 p-4">
        
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <div class="bg-blue-400 p-4 rounded-lg shadow">
    <div class="flex items-center">
      <SiRetool size={40} />
      <div class="ml-4">
        <p class="text-sm text-zinc-600">Total Assets</p>
        <p class="text-xl font-bold">96</p>
      </div>
    </div>
    <div class="flex justify-end mt-4 cursor-pointer">
      <span>More Info</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div class="bg-yellow-400 p-4 rounded-lg shadow">
    <div class="flex items-center">
      <AiFillHdd className='' size={40} />
      <div class="ml-4">
        <p class="text-sm text-zinc-600">Total Component</p>
        <p class="text-xl font-bold">3,650</p>
      </div>
    </div>
    <div class="flex justify-end mt-4 ">
    <span className='cursor-pointer'>More Info</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div class="bg-rose-500 p-4 rounded-lg shadow">
    <div class="flex items-center">
      <FaTools size={40} />
      <div class="ml-4">
        <p class="text-md font-semibold text-zinc-900">Total Maintenance</p>
        <p class="text-xl font-bold">356</p>
      </div>
    </div>
    <div class="flex justify-end mt-4 ">
    <span className='cursor-pointer'>More Info</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div class="bg-cyan-400 p-4 rounded-lg shadow">
    <div class="flex items-center">
      <FaUser size={40} />
      <div class="ml-4">
        <p class="text-sm text-zinc-600">Total Employee</p>
        <p class="text-xl font-bold">696</p>
      </div>
    </div>
    <div class="flex justify-end mt-4 ">
    <span className='cursor-pointer'>More Info</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>

        <h1 className="text-center text-2xl font-bold my-4">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center text-xl font-semibold mb-2 h-[200pxs]">Asset by type</h2>
            <Bar data={assetTypesData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center text-xl font-semibold mb-2">Asset by status</h2>
            <Pie data={assetStatusData} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded shadow overflow-x-auto">
            <h2 className="text-center text-xl font-semibold mb-2">Recent asset activity</h2>
            <table {...recentAssetActivityTable.getTableProps()} className="min-w-full bg-white border border-gray-200">
              <thead>
                {recentAssetActivityTable.headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b">
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="text-left p-2">{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...recentAssetActivityTable.getTableBodyProps()}>
                {recentAssetActivityTable.rows.map(row => {
                  recentAssetActivityTable.prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="p-2">{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded shadow overflow-x-auto">
            <h2 className="text-center text-xl font-semibold mb-2">Recent component activity</h2>
            <table {...recentComponentActivityTable.getTableProps()} className="min-w-full bg-white border border-gray-200">
              <thead>
                {recentComponentActivityTable.headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b">
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="text-left p-2">{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...recentComponentActivityTable.getTableBodyProps()}>
                {recentComponentActivityTable.rows.map(row => {
                  recentComponentActivityTable.prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="p-2">{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
