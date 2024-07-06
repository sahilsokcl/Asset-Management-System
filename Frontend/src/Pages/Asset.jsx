import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import logo from '../assets/logo.png';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import NavBar from '../Components/NavBar';

const dummyData = Array.from({ length: 231 }, (_, index) => ({
  id: index + 1,
  picture: logo,
  assetTag: `AST${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  name: `Asset ${index + 1}`,
  type: 'Hardware',
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
    setAssets(assets.filter(asset => asset.id !== assetId));
    setActionDropdown(null); // Close dropdown after action
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAsset = {
      id: selectedAsset ? selectedAsset.id : assets.length + 1,
      picture: formData.get('picture'),
      assetTag: formData.get('assetTag'),
      name: formData.get('name'),
      type: formData.get('type'),
      brand: formData.get('brand'),
      location: formData.get('location'),
    };

    if (selectedAsset) {
      setAssets(assets.map(asset => (asset.id === selectedAsset.id ? newAsset : asset)));
    } else {
      setAssets([...assets, newAsset]);
    }

    setIsModalOpen(false);
  };

  const toggleDropdown = (assetId) => {
    setActionDropdown(actionDropdown === assetId ? null : assetId);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageData = assets.slice(offset, offset + PER_PAGE);

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Asset List</h2>
        <div className="flex justify-end">
          <button onClick={handleAddData} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">+ Add Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
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
              {currentPageData.map((asset) => (
                <tr key={asset.id}>
                  <td className="py-2 px-4 border"><img src={asset.picture} alt="Asset" className="h-12 w-12 object-fit" /></td>
                  <td className="py-2 px-4 border">{asset.assetTag}</td>
                  <td className="py-2 px-4 border">{asset.name}</td>
                  <td className="py-2 px-4 border">{asset.type}</td>
                  <td className="py-2 px-4 border">{asset.brand}</td>
                  <td className="py-2 px-4 border">{asset.location}</td>
                  <td className="py-2 px-4 border relative">
                    <button onClick={() => toggleDropdown(asset.id)} className="relative z-10 focus:outline-none">
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
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={Math.ceil(assets.length / PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={'pagination flex justify-center items-center gap-2'}
            previousLinkClassName={'px-4 py-2 bg-gray-200 rounded'}
            nextLinkClassName={'px-4 py-2 bg-gray-200 rounded'}
            disabledClassName={'text-gray-400'}
            activeClassName={'bg-blue-500 text-white px-4 py-2 rounded'}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedAsset ? 'Edit Asset' : 'Add Asset'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">Picture</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="picture" name="picture" type="text" defaultValue={selectedAsset ? selectedAsset.picture : ''} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetTag">Asset Tag</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="assetTag" name="assetTag" type="text" defaultValue={selectedAsset ? selectedAsset.assetTag : ''} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" defaultValue={selectedAsset ? selectedAsset.name : ''} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" name="type" type="text" defaultValue={selectedAsset ? selectedAsset.type : ''} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="brand" name="brand" type="text" defaultValue={selectedAsset ? selectedAsset.brand : ''} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" name="location" type="text" defaultValue={selectedAsset ? selectedAsset.location : ''} />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{selectedAsset ? 'Update' : 'Add'}</button>
                <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetList;
