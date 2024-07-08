import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import logo from "../assets/logo.png";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCopy,
  FaFileCsv,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";
import NavBar from "../Components/NavBar";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dummyData = Array.from({ length: 231 }, (_, index) => ({
  id: index + 1,
  picture: logo,
  assetTag: `AST${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  name: `Asset ${index + 1}`,
  type: "Hardware",
  brand: `Brand ${index % 5}`,
  location: `Location ${index % 10}`,
}));

const PER_PAGE = 10;

const AssetList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState(dummyData);
  const [actionDropdown, setActionDropdown] = useState(null); // State to track which dropdown is open
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAddData = () => {
    setIsModalOpen(true);
    setSelectedAsset(null);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
    setActionDropdown(null); // Close dropdown after action
  };

  const handleDelete = (assetId) => {
    setAssets(assets.filter((asset) => asset.id !== assetId));
    setActionDropdown(null); // Close dropdown after action
  };

  const handleCopy = () => {
    const assetText = assets
      .map((asset) => `${asset.assetTag} - ${asset.name}`)
      .join("\n");
    navigator.clipboard
      .writeText(assetText)
      .then(() => {
        console.log("Assets copied to clipboard");
        toast.success("copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy assets", err);
      });
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      assets
        .map(
          (asset) =>
            `${asset.assetTag},${asset.name},${asset.type},${asset.brand},${asset.location}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assets.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    let yPos = 10;

    assets.forEach((asset) => {
      doc.text(`Asset Tag: ${asset.assetTag}`, 10, yPos);
      doc.text(`Name: ${asset.name}`, 10, yPos + 10);
      doc.text(`Type: ${asset.type}`, 10, yPos + 20);
      doc.text(`Brand: ${asset.brand}`, 10, yPos + 30);
      doc.text(`Location: ${asset.location}`, 10, yPos + 40);
      yPos += 50;

      if (yPos >= 280) {
        doc.addPage();
        yPos = 10;
      }
    });

    doc.save("assets.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAsset = {
      id: selectedAsset ? selectedAsset.id : assets.length + 1,
      picture: formData.get("picture"),
      assetTag: formData.get("assetTag"),
      name: formData.get("name"),
      type: formData.get("type"),
      brand: formData.get("brand"),
      location: formData.get("location"),
    };

    if (selectedAsset) {
      setAssets(
        assets.map((asset) =>
          asset.id === selectedAsset.id ? newAsset : asset
        )
      );
    } else {
      setAssets([...assets, newAsset]);
    }

    setIsModalOpen(false);
  };

  const toggleDropdown = (assetId) => {
    setActionDropdown(actionDropdown === assetId ? null : assetId);
  };

  const offset = currentPage * PER_PAGE;
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredAssets = assets.filter(
    (asset) =>
      asset.assetTag.toLowerCase().includes(normalizedSearchQuery) ||
      asset.name.toLowerCase().includes(normalizedSearchQuery) ||
      asset.type.toLowerCase().includes(normalizedSearchQuery) ||
      asset.brand.toLowerCase().includes(normalizedSearchQuery) ||
      asset.location.toLowerCase().includes(normalizedSearchQuery)
  );

  const currentPageData = filteredAssets.slice(offset, offset + PER_PAGE);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Asset List</span>
          <div>
            <button
              onClick={handleAddData}
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
              + Add Data
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border" colSpan="7">
                  <div className="flex justify-between items-center bg-gray-100 rounded-full px-3 py-2">
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
                    <div className="">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Picture</th>
                <th className="py-2 px-4 border">Asset Tag</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Brand</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((asset) => (
                  <tr key={asset.id}>
                    <td className="py-2 px-4 border">
                      <img
                        src={asset.picture}
                        alt="Asset"
                        className="h-12 w-12 object-fit"
                      />
                    </td>
                    <td className="py-2 px-4 border">{asset.assetTag}</td>
                    <td className="py-2 px-4 border">{asset.name}</td>
                    <td className="py-2 px-4 border">{asset.type}</td>
                    <td className="py-2 px-4 border">{asset.brand}</td>
                    <td className="py-2 px-4 border">{asset.location}</td>
                    <td className="py-2 px-4 border relative">
                      <button
                        onClick={() => toggleDropdown(asset.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEllipsisV />
                      </button>
                      {actionDropdown === asset.id && (
                      <div className="absolute right-10 mt-2  bg-white border rounded shadow-xl z-20">
                        <button onClick={() => handleEdit(asset)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2">
                          <FaEdit className='text-green-600' /> Edit
                        </button>
                        <button onClick={() => handleDelete(asset.id)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2">
                          <FaTrash className='text-red-600'/> Delete
                        </button>
                      </div>
                    )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
        <div className="mt-4 flex pr-20 justify-end">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(assets.length / PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={
              "pagination flex justify-center items-center gap-6"
            }
            previousLinkClassName={"px-4 py-2 bg-gray-200 rounded"}
            nextLinkClassName={"px-4 py-2 bg-gray-200 rounded"}
            disabledClassName={"text-gray-400"}
            activeClassName={"bg-blue-500 text-white px-4 py-2 rounded"}
          />
        </div>
     

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">
                {selectedAsset ? "Edit Asset" : "Add Asset"}
              </h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="picture"
                >
                  Picture URL
                </label>
                <input
                  id="picture"
                  name="picture"
                  type="text"
                  defaultValue={selectedAsset?.picture || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="assetTag"
                >
                  Asset Tag
                </label>
                <input
                  id="assetTag"
                  name="assetTag"
                  type="text"
                  defaultValue={selectedAsset?.assetTag || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={selectedAsset?.name || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  defaultValue={selectedAsset?.type || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="brand"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  defaultValue={selectedAsset?.brand || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  defaultValue={selectedAsset?.location || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetList;
