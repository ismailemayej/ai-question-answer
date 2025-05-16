"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6  border-gray-800">
      <div className="container mx-auto px-4">
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Islamic Q&A AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Developed with ❤️ for the Ummah
          </p>
        </div>

        {/* Scholarly Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-300 bangla">
            এই সাইটটি একটি গবেষণা প্রকল্প এবং এটি ইসলামী আইনজীবী দ্বারা
            পর্যালোচনা করা হয়নি। এটি শুধুমাত্র তথ্যের উদ্দেশ্যে এবং এটি ইসলামী
            আইন বা ফতোয়া হিসাবে বিবেচিত হওয়া উচিত নয়। ইসলামিক আইন সম্পর্কিত
            কোনও প্রশ্নের জন্য একজন যোগ্য ইসলামী পণ্ডিতের সাথে পরামর্শ করুন।
          </p>
        </div>
      </div>
    </footer>
  );
}
