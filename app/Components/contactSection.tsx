"use client";

export const ContactSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center  gap-8 p-8 bg-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41954.990295633215!2d24.717129!3d48.911831400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c16c34b0381d%3A0xd6d32394e59e41c2!2z0IbQstCw0L3Qvi3QpNGA0LDQvdC60ZbQstGB0YzQuiwg0IbQstCw0L3Qvi3QpNGA0LDQvdC60ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCDQo9C60YDQsNGX0L3QsCwgNzYwMDA!5e0!3m2!1suk!2spl!4v1769176685110!5m2!1suk!2spl"
        width="350"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <aside className="flex flex-col md:flex-row gap-6 text-black">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Подзвоніть нам:</h2>
          <p className="mb-2">Email: palomnystwo@gmail.com</p>
          <p className="mb-2">Phone: +48 123 456 789</p>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Напишіть нам:</h2>
          <div className=" gap-2">
            <button type="submit">Viber</button>
            <br />
            <button type="submit">Telegram</button>
            <br />
            <button type="submit">WhatsApp</button>
            <br />
            <button>Messenger</button>
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Підпишіться на нас:</h2>
          <div className=" gap-2">
            <button type="submit">Viber</button>
            <br />
            <button type="submit">Telegram</button>
            <br />
            <button type="submit">WhatsApp</button>
            <br />
            <button>Messenger</button>
          </div>
        </div>
      </aside>
    </div>
  );
};
