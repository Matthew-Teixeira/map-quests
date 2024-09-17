import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const CreatMapModal = ({ map_name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrashClick = () => {
    setIsModalOpen(true); // Show the modal when the trashcan is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when needed
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleTrashClick}
      >
        Submit
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-semibold mb-4">Map Confirmation</h2>
            <p>You have successfully created a new map named {map_name}</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  closeModal(); // Close modal after action
                  window.location.assign("/dashboard");
                }}
              >
                To Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatMapModal;
