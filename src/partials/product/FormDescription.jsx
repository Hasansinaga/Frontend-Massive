import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Icon } from "@iconify/react";

const CardDescription = () => {
  const [isDiscount, setIsDiscount] = useState(false);
  const [date, setDate] = useState("12/12/2020");
  const [time, setTime] = useState("12:00 PM");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Deskripsi Singkat menggunakan CKEditor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Singkat
        </label>
        <div className="border rounded-md p-2 bg-gray-50 mt-1">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
      </div>

      {/* Return Policy & Discount Toggle */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-gray-700">
          Return Policy
        </label>
        <div className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">Add Discount</span>
          <div
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${
              isDiscount ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setIsDiscount(!isDiscount)}
          >
            <span className="sr-only">Enable Discount</span>
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                isDiscount ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>
      </div>
      <div>
      <h2>Date Added</h2>
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center border rounded-md p-2 w-1/2 bg-gray-50">
          <Icon icon="mdi:calendar" className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent outline-none text-gray-700 w-full"
            placeholder="MM/DD/YYYY"
          />
        </div>
        <div className="flex items-center border rounded-md p-2 w-1/2 bg-gray-50">
          <Icon icon="mdi:clock" className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-transparent outline-none text-gray-700 w-full"
            placeholder="HH:MM AM/PM"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default CardDescription;
