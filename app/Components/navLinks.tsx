"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NavLinks = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If page already loaded, hide skeleton immediately
    if (typeof window !== "undefined" && document.readyState === "complete") {
      setLoading(false);
      return;
    }

    const onLoad = () => setLoading(false);
    window.addEventListener("load", onLoad);

    // Fallback: hide skeleton after 1s if load doesn't fire
    const t = setTimeout(() => setLoading(false), 1000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  return (
    <StyledWrapper className={loading ? "loading" : ""}>
      <section className=" flex flex-wrap gap-4 lg: justify-between p-8 place-items-center bg-[#E8E8E8] sticky top-0">
        <ul className="example-2 ">
          <li className="icon-content ">
            <a
              href="https://www.tiktok.com/@uasenjaua?is_from_webapp=1&sender_device=pc"
              aria-label="Instagram"
              data-social="instagram"
              target="_blank"
            >
              <div className="filled" />
              <svg
                viewBox="0 0 32 32"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-instagram"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>{" "}
                </g>
              </svg>
            </a>
            <div className="tooltip">Tiktok</div>
          </li>
          <li className="icon-content ">
            <a
              href="https://www.facebook.com/AVEMARIAUA?locale=uk_UA"
              aria-label="Facebook"
              data-social="facebook"
              target="_blank"
            >
              <div className="filled" />

              <svg
                fill="currentColor"
                width={16}
                height={16}
                version="1.1"
                className="bi bi-facebook"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-337 273 123.5 256"
                xmlSpace="preserve"
              >
                <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path>{" "}
              </svg>
            </a>
            <div className="tooltip">Facebook</div>
          </li>
          <li className="icon-content ">
            <a
              href="https://www.instagram.com/avemaria.palomnyk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              aria-label="Instagram"
              data-social="instagram"
              target="_blank"
            >
              <div className="filled" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-instagram"
                viewBox="0 0 16 16"
                xmlSpace="preserve"
              >
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                  fill="currentColor"
                />
              </svg>
            </a>
            <div className="tooltip">Instagram</div>
          </li>

          <li className="icon-content ">
            <a
              href="https://www.youtube.com/@aveisusimaria"
              aria-label="youtube"
              data-social="youtube"
              target="_blank"
            >
              <div className="filled" />

              <svg
                fill="currentColor"
                version="1.1"
                width={16}
                height={16}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96.875 96.875"
                xmlSpace="preserve"
                className="bi bi-youtube"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M95.201,25.538c-1.186-5.152-5.4-8.953-10.473-9.52c-12.013-1.341-24.172-1.348-36.275-1.341 c-12.105-0.007-24.266,0-36.279,1.341c-5.07,0.567-9.281,4.368-10.467,9.52C0.019,32.875,0,40.884,0,48.438 C0,55.992,0,64,1.688,71.336c1.184,5.151,5.396,8.952,10.469,9.52c12.012,1.342,24.172,1.349,36.277,1.342 c12.107,0.007,24.264,0,36.275-1.342c5.07-0.567,9.285-4.368,10.471-9.52c1.689-7.337,1.695-15.345,1.695-22.898 C96.875,40.884,96.889,32.875,95.201,25.538z M35.936,63.474c0-10.716,0-21.32,0-32.037c10.267,5.357,20.466,10.678,30.798,16.068 C56.434,52.847,46.23,58.136,35.936,63.474z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </a>
            <div className="tooltip">Youtube</div>
          </li>
        </ul>
        <ul className="flex  flex-row gap-1.5 text-black">
          <li className="flex items-center ml-1.5 place-items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            050 101 07 42
          </li>
          <li className="flex items-center place-items-center ml-1.5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            uasenja@gmail.com
          </li>
        </ul>
      </section>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ul {
    list-style: none;
  }

  .example-2 {
    display: flex;
  }
  .example-2 .icon-content {
    margin: 0 5px;
    position: relative;
  }
  .example-2 .icon-content .tooltip {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    padding: 6px 5px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    font-size: 10px;
    transition: all 0.3s ease;
  }
  .example-2 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: -30px;
  }
  .example-2 .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #4d4d4d;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
  }
  .example-2 .icon-content a:hover {
    box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
  }
  .example-2 .icon-content a svg {
    position: relative;
    z-index: 1;
    width: 20px;
    height: 20px;
  }
  .example-2 .icon-content a:hover {
    color: white;
  }
  .example-2 .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: all 0.3s ease-in-out;
  }
  .example-2 .icon-content a:hover .filled {
    height: 100%;
  }

  /* Skeleton styles when loading */
  &.loading .skeleton .tooltip {
    display: none;
  }

  &.loading .skeleton a svg {
    opacity: 0;
  }

  &.loading .skeleton a .filled {
    height: 100%;
    background: linear-gradient(90deg, #e6e6e6 25%, #f5f5f5 50%, #e6e6e6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
  }

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  .example-2 .icon-content a[data-social="facebook"] .filled,
  .example-2 .icon-content a[data-social="facebook"] ~ .tooltip {
    background-color: #162456;
  }
  .example-2 .icon-content a[data-social="instagram"] .filled,
  .example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
    background: linear-gradient(
      45deg,
      #405de6,
      #5b51db,
      #b33ab4,
      #c135b4,
      #e1306c,
      #fd1f1f
    );
  }
  .example-2 .icon-content a[data-social="twiter"] .filled,
  .example-2 .icon-content a[data-social="twiter"] ~ .tooltip {
    background-color: #2baed5;
  }
  .example-2 .icon-content a[data-social="google"] .filled,
  .example-2 .icon-content a[data-social="google"] ~ .tooltip {
    background-color: #d88b2b;
  }
  .example-2 .icon-content a[data-social="youtube"] .filled,
  .example-2 .icon-content a[data-social="youtube"] ~ .tooltip {
    background-color: #ff0000;
  }
`;

export default NavLinks;
