import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Auth from "../../utils/auth";

const TrashcanWithModal = ({ map_id }) => {
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userToken = Auth.getToken();
    setToken(userToken);
    if (!userToken) {
      window.location.assign("/login");
    }
  }, []);

  const handleTrashClick = () => {
    setIsModalOpen(true); // Show the modal when the trashcan is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when needed
  };

  const delete_map = async () => {
    try {
      const response = await fetch(`/api/maps/remove_map/${map_id}`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        // window.location.assign("/dashboard");
      } else throw new Error(data.error);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative">
      {/* Trashcan Icon */}
      <FaRegTrashAlt
        className="absolute right-0 cursor-pointer transition-transform duration-200 scale-100 hover:scale-110"
        onClick={handleTrashClick}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
            <p>Are you sure you want to delete this map?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  delete_map();
                  closeModal(); // Close modal after action
                  window.location.assign("/dashboard");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashcanWithModal;
