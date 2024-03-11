import React from 'react';

const PostLoader = () => {
  return (
    <div className="bg-slate-100 shadow-md rounded-lg p-4 m-4 grid grid-cols-6 gap-4 animate-pulse">
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full mb-2"></div>
        <div className="w-8 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full mt-2"></div>
      </div>
      <div className="col-span-5">
        <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-60 bg-gray-300 rounded-md mb-4"></div>
        <div className="flex justify-between">
          <div className="w-1/3">
            <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="w-1/3">
            <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="w-1/3 flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
            <div className="h-4 w-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoader;
