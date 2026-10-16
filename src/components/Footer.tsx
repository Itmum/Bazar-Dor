import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 gap-4">
          <div>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</div>

          <div className="text-gray-400 text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
