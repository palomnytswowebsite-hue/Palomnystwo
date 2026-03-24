"use client";

export const ContactSection = () => {
  return (
    <div className="bg-[#FCF9EA] mt-10 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
        {/* IMAGE */}
        <img
          className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-xl shadow-lg"
          src="https://res.cloudinary.com/dwl1expbx/image/upload/v1772632619/photo_2026-03-04_14-51-37_oetbrc.jpg"
          alt="Ave Maria"
        />

        {/* CONTACT BLOCK */}
        <div className="flex flex-col md:flex-row gap-16">
          {/* PHONE */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Подзвоніть нам:</h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 hover:text-[#E2A16F] transition">
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_4_ndroff.png"
                  width="28"
                />
                <span>uasenja@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 hover:text-[#E2A16F] transition">
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                  width="28"
                />
                <span>+380501010742</span>
              </div>

              <div className="flex items-center gap-3 hover:text-[#E2A16F] transition">
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                  width="28"
                />
                <span>+380969355298</span>
              </div>

              <div className="flex items-center gap-3 hover:text-[#E2A16F] transition">
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773221269/pngwing.com_6_agw4bk.png"
                  width="28"
                />
                <span>+380507175304</span>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Напишіть нам:</h2>

            <div className="space-y-3">
              <a
                href="viber://chat?number=380501010742"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_5_uura35.png"
                  width="28"
                />
                Viber
              </a>
              <a
                href="https://t.me/+380507175304"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1774371268/telegram-svgrepo-com_sw9msi.svg"
                  width="28"
                />
                Telegram
              </a>
              <a
                href="https://wa.me/380501010742"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_3_wkq6jr.png"
                  width="28"
                />
                Whatsapp
              </a>

              <a
                href="https://www.instagram.com/avemaria.palomnyk"
                target="_blank"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215659/pngwing.com_1_osa6rz.png"
                  width="28"
                />
                Instagram
              </a>

              <a
                href="https://m.me/AVEMARIAUA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773216918/vecteezy_messenger-png-icon_16716477_elok8j.png"
                  width="28"
                />
                Messenger
              </a>

              <a
                href="https://www.facebook.com/AVEMARIAUA"
                target="_blank"
                className="flex items-center gap-3 hover:text-[#86B0BD] transition"
              >
                <img
                  src="https://res.cloudinary.com/dwl1expbx/image/upload/v1773215658/pngwing.com_2_lwvyxv.png"
                  width="28"
                />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
