// ComponentTable.js
import NavBar from '../Components/NavBar';
import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { componentData } from '../Data/Data.js';
import toast, { Toaster } from "react-hot-toast";
import jsPDF from 'jspdf';
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCopy,
  FaFileCsv,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";

const ComponentTable = () => {
  const [showAddDataPopup, setShowAddDataPopup] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);
  const data = useMemo(() => componentData, []);
  const columns = useMemo(() => [
    {
      Header: 'Picture',
      accessor: 'picture',
      Cell: ({ value }) => <img src={value} alt="No Image" className="w-16 h-16 object-cover" />
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Brand', accessor: 'brand' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Available Quantity', accessor: 'availableQuantity' },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <div className="relative">
          <button
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
            onClick={() => setActionMenuIndex(row.index === actionMenuIndex ? null : row.index)}
          >
            <FaEllipsisV />
          </button>
          {row.index === actionMenuIndex && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
              <button className="block px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleCheckout(row.original)}>Checkout</button>
              <button className="block px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleDetails(row.original)}>Details</button>
              <button className="block px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleEdit(row.original)}>Edit</button>
              <button className="block px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleDelete(row.original)}>Delete</button>
            </div>
          )}
        </div>
      )
    }
  ], [actionMenuIndex]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 5 }
  }, useGlobalFilter, usePagination);

  const handleCopy = () => {
    const assetText = componentData
      .map((component) => `${component.name} - ${component.type}`)
      .join("\n");
    navigator.clipboard
      .writeText(assetText)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy data");
      });
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      componentData
        .map(
          (component) =>
            `${component.picture},${component.name},${component.type},${component.brand},${component.quantity},${component.availableQuantity}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "components.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    let yPos = 10;

    componentData.forEach((component) => {
      doc.text(`Name: ${component.name}`, 10, yPos);
      doc.text(`Type: ${component.type}`, 10, yPos + 10);
      doc.text(`Brand: ${component.brand}`, 10, yPos + 20);
      doc.text(`Quantity: ${component.quantity}`, 10, yPos + 30);
      doc.text(`Available Quantity: ${component.availableQuantity}`, 10, yPos + 40);
      yPos += 50;

      if (yPos >= 280) {
        doc.addPage();
        yPos = 10;
      }
    });

    doc.save("components.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddData = (newData) => {
    // Logic to add new data
    console.log(newData);
    setShowAddDataPopup(false);
  };

  const handleCheckout = (component) => {
    console.log('Checkout:', component);
  };

  const handleDetails = (component) => {
    console.log('Details:', component);
  };

  const handleEdit = (component) => {
    console.log('Edit:', component);
  };

  const handleDelete = (component) => {
    console.log('Delete:', component);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <div className="bg-white p-4 rounded shadow">
       
<div className='flex justify-between p-4'> <h2 className="text-center text-3xl font-semibold mb-2">Component list</h2> <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setShowAddDataPopup(true)}>+ Add data</button></div>

        <div className="flex justify-between mb-2 border  p-2">
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-700 mx-2"
              title="Copy"
            >
              <FaCopy size={24} />
            </button>
            <button
              onClick={handleExportCsv}
              className="text-blue-500 hover:text-blue-700 mx-2"
              title="Export as CSV"
            >
              <FaFileCsv size={24} />
            </button>
            <button
              onClick={handleExportPdf}
              className="text-blue-500 hover:text-blue-700 mx-2"
              title="Export as PDF"
            >
              <FaFilePdf size={24} />
            </button>
            <button
              onClick={handlePrint}
              className="text-blue-500 hover:text-blue-700 mx-2"
              title="Print"
            >
              <FaPrint size={24} />
            </button>
          </div>

          <input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search..."
            className="border p-2 rounded border-gray-500"
          />
         
        </div>
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 border-b">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="text-left p-2 font-medium text-gray-700">{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-2">{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between mt-2">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-400 hover:bg-blue-600 p-2 rounded">Previous</button>
          <span>Page {pageIndex + 1}</span>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-400 hover:bg-blue-600 p-2 rounded">Next</button>
        </div>
      </div>

      {showAddDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-xl mb-4">Add New Component</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newData = Object.fromEntries(formData.entries());
              handleAddData(newData);
            }}>
              <div className="mb-2">
                <label className="block mb-1">Picture URL</label>
                <input name="picture" type="text" className="w-full border p-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Name</label>
                <input name="name" type="text" className="w-full border p-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Type</label>
                <input name="type" type="text" className="w-full border p-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Brand</label>
                <input name="brand" type="text" className="w-full border p-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Quantity</label>
                <input name="quantity" type="number" className="w-full border p-2 rounded" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Available Quantity</label>
                <input name="availableQuantity" type="number" className="w-full border p-2 rounded" required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="bg-gray-500 text-white p-2 rounded" onClick={() => setShowAddDataPopup(false)}>Cancel</button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ComponentTable;
