import React from "react";

export const FAB = () => {
  return (
    <div>
      <div className="fab">
        {/* MAIN FAB BUTTON */}
        <div
          tabIndex={0}
          role="button"
          className="bg-amber-50 rounded-3xl btn-lg btn-circle btn-secondary"
        >
          {/* CHAT ICON */}
          {/* <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M13.19 6H6.79C3.35 6.27 2 7.86 2 10.79V14.79C2 18.79 3.6 19.58 6.79 19.58H7.19C7.41 19.58 7.7 19.73 7.83 19.9L9.03 21.5C9.56 22.21 10.42 22.21 10.95 21.5L12.15 19.9C12.3 19.7 12.54 19.58 12.79 19.58H13.19C16.12 19.58 17.71 18.24 17.94 15.54V10.79C17.98 7.6 16.38 6 13.19 6Z" />
          </svg> */}
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full mb-1.5 ml-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.19 6H6.79C6.53 6 6.28 6.01 6.04 6.04C3.35 6.27 2 7.86 2 10.79V14.79C2 18.79 3.6 19.58 6.79 19.58H7.19C7.41 19.58 7.7 19.73 7.83 19.9L9.03 21.5C9.56 22.21 10.42 22.21 10.95 21.5L12.15 19.9C12.3 19.7 12.54 19.58 12.79 19.58H13.19C16.12 19.58 17.71 18.24 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.6 16.38 6 13.19 6ZM6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14ZM9.99 14C9.43 14 8.99 13.55 8.99 13C8.99 12.45 9.44 12 9.99 12C10.54 12 10.99 12.45 10.99 13C10.99 13.55 10.55 14 9.99 14ZM13.49 14C12.93 14 12.49 13.55 12.49 13C12.49 12.45 12.94 12 13.49 12C14.04 12 14.49 12.45 14.49 13C14.49 13.55 14.04 14 13.49 14Z"
              fill="#292D32"
            ></path>
          </svg>
        </div>

        {/* PHONE */}
        <a
          href="tel:+380501010742"
          className="btn btn-lg btn-circle bg-green-500"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        {/* MESSENGER */}
        <a
          href="https://m.me/AVEMARIAUA"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-circle bg-blue-600"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.64 1.28 5.02 3.32 6.68V22l4.04-2.22c.84.23 1.72.36 2.64.36 5.52 0 10-4.02 10-9S17.52 2 12 2Zm1.12 11.88-2.55-2.72-4.98 2.72 5.48-5.82 2.6 2.72 4.9-2.72-5.45 5.82Z" />
          </svg>
        </a>

        {/* VIBER */}
        <a
          href="https://invite.viber.com/?g=YOUR_GROUP_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lg btn-circle bg-purple-600"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.5 1.32 4.76 3.44 6.36V22l4.08-2.16c.8.2 1.64.3 2.48.3 5.52 0 10-3.94 10-8.8S17.52 2 12 2Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
