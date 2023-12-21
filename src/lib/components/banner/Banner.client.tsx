"use client";

import React, { useState } from "react";

export const Banner: React.FC<{
  headerText?: string;
  bodyText?: string;
  action?: React.ReactNode;
}> = ({ headerText, bodyText, action }) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      id="marketing-banner"
      tabIndex={-1}
      className={`fixed z-50 flex flex-col md:flex-row justify-between 
        w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border 
        border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-20 
        dark:bg-gray-700 dark:border-gray-600 ${isHidden ? "hidden" : ""}`}
    >
      <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
        <a
          href="https://flowbite.com/"
          className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
        >
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            {headerText}
          </span>
        </a>
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          {bodyText}
        </p>
      </div>
      <div className="flex items-center flex-shrink-0">
        {action && action}
        <button
          data-dismiss-target="#marketing-banner"
          type="button"
          onClick={() => {
            setIsHidden(true);
          }}
          className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};
