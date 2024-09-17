import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const EditWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrashClick = () => {
    setIsModalOpen(true); // Show the modal when the trashcan is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when needed
  };

  return (
    <div className="relative">
      {/* Trashcan Icon */}
      <CiEdit
        className="absolute left-0 cursor-pointer transition-transform duration-200 scale-100 hover:scale-110"
        onClick={handleTrashClick}
        size={22}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
            <p>Would you like to edit this map?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  // Place delete logic here
                  closeModal(); // Close modal after action
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWithModal;
