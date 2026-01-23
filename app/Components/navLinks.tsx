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
      <section className=" flex flex-wrap lg: justify-between p-8 place-items-center bg-[#E8E8E8] sticky top-0">
        <ul className="example-2 ">
          <li className="icon-content ">
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              data-social="linkedin"
            >
              <div className="filled" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
                xmlSpace="preserve"
              >
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <div className="tooltip">LinkedIn</div>
          </li>
          <li className="icon-content ">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              data-social="facebook"
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
              href="https://www.instagram.com/"
              aria-label="Instagram"
              data-social="instagram"
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
              href="https://youtube.com/"
              aria-label="twiter"
              data-social="twiter"
            >
              <div className="filled" />

              <svg
                fill="currentColor"
                width={16}
                height={16}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-youtube"
                viewBox="-271 296.6 256.4 208.4"
                xmlSpace="preserve"
              >
                <path d="M-14.6,321.2c-9.4,4.2-19.6,7-30.2,8.3c10.9-6.5,19.2-16.8,23.1-29.1c-10.2,6-21.4,10.4-33.4,12.8 c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12c-43.7-2.2-82.5-23.1-108.4-55 c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6c0,25.5,18.1,46.8,42.2,51.6 c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5c-18,14.1-40.7,22.5-65.3,22.5 c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7c0-2.3,0-4.6-0.1-6.8 C-30.5,341-21.6,331.8-14.6,321.2"></path>{" "}
              </svg>
            </a>
            <div className="tooltip ">Twitter</div>
          </li>
          <li className="icon-content ">
            <a
              href="https://youtube.com/"
              aria-label="google"
              data-social="google"
            >
              <div className="filled" />

              <svg
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>google [currentColor]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-300.000000, -7399.000000)"
                      fill="currentColor"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386"
                          id="google-[currentColor]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </a>
            <div className="tooltip  ">Google</div>
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
            123-456-7890
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
            palomnystwo@gmail.com
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

  .example-2 .icon-content a[data-social="linkedin"] .filled,
  .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
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
`;

export default NavLinks;
