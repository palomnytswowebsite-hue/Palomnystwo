"use client";
import NavLinks from "../Components/navLinks";
import { NavMenu } from "../Components/navMenu";
import { FAB } from "../Components/FAB";
import { Footer } from "../Components/footer";

export default function ContactPage() {
  return (
    <section>
      <NavLinks />
      <NavMenu />
      <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
        Контакти
      </h1>
      <div className="flex flex-col md:flex-row justify-center  gap-8 p-8 bg-gray-200 mt-5">
        <img
          className="w-56 h-56 lg: w-80 h-80"
          src="https://res.cloudinary.com/dwl1expbx/image/upload/v1772632619/photo_2026-03-04_14-51-37_oetbrc.jpg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          // loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
        />
        <aside className="flex flex-col md:flex-row gap-6 text-black">
          <div className="">
            <h2 className="text-2xl font-bold mb-4">Подзвоніть нам:</h2>
            <p className="mb-2 flex justify-center items-center gap-1.5 text-black hover:text-[#E2A16F] transition-colors duration-300">
              <img
                src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_4_ndroff.png"
                alt="Email Icons"
                height={"30px"}
                width={"30px"}
              />{" "}
              uasenja@gmail.com
            </p>
            <p className="mb-2 flex justify-center items-center gap-1.5 text-black hover:text-[#E2A16F] transition-colors duration-300">
              <img
                src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                alt="Phone Icons"
                height={"30px"}
                width={"30px"}
              />{" "}
              050 101 07 42
            </p>
            <p className="mb-2 flex justify-center items-center gap-1.5 text-black hover:text-[#E2A16F] transition-colors duration-300">
              <img
                src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                alt="Phone Icons"
                height={"30px"}
                width={"30px"}
              />{" "}
              050 237 84 04
            </p>
            <p className="mb-2 flex justify-center items-center gap-1.5 text-black hover:text-[#E2A16F] transition-colors duration-300">
              <img
                src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                alt="Phone Icons"
                height={"30px"}
                width={"30px"}
              />{" "}
              096 935 5298
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl font-bold mb-4">Напишіть нам:</h2>
            <div className=" gap-2">
              <button
                type="submit"
                className="flex justify-center items-center gap-1.5"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_5_uura35.png"
                  alt="Viber Icons"
                  height={"30px"}
                  width={"30px"}
                />
                <a
                  href="http://"
                  target="_blank"
                  className="text-black hover:text-[#86B0BD]  transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  Viber
                </a>
              </button>
              <br />
              <button
                type="submit"
                className="flex justify-center items-center gap-1.5"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215659/pngwing.com_1_osa6rz.png"
                  alt="Instagram Icons"
                  height={"30px"}
                  width={"30px"}
                />
                <a
                  href="https://www.instagram.com/avemaria.palomnyk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="text-black hover:text-[#86B0BD] transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </button>
              <br />
              <button
                type="submit"
                className="flex justify-center items-center gap-1.5"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_3_wkq6jr.png"
                  alt="WhatsApp Icons"
                  height={"30px"}
                  width={"30px"}
                />
                <a
                  href="https://www.instagram.com/avemaria.palomnyk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="text-black hover:text-[#86B0BD] transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </button>
              <br />
              <button
                type="submit"
                className="flex justify-center items-center gap-1.5"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773216918/vecteezy_messenger-png-icon_16716477_elok8j.png"
                  alt="Messenger Icons"
                  height={"30px"}
                  width={"30px"}
                />
                <a
                  href="https://www.instagram.com/avemaria.palomnyk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="text-black hover:text-[#86B0BD] transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  Messenger
                </a>
              </button>
              <br />
              <button type="submit" className="">
                <a
                  href="https://www.facebook.com/AVEMARIAUA?locale=uk_UA"
                  target="_blank"
                  className="text-black flex justify-center items-center gap-1.5 hover:text-[#86B0BD] transition-colors duration-300"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_2_lwvyxv.png"
                    alt="Messenger Icons"
                    height={"30px"}
                    width={"30px"}
                  />
                  FaceBook
                </a>
              </button>
            </div>
          </div>
        </aside>
      </div>
      <FAB />
      <Footer />
    </section>
  );
}
