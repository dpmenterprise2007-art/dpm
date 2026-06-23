import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Stop pulsing after 10 seconds
    const pulseTimer = setTimeout(() => {
      setIsPulsing(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Namaste Dharmendra Bhaiya,\n\nI am interested in DPM Enterprise services:\n\n✅ Corporate Interior Design\n✅ Turnkey Projects\n✅ Furniture Manufacturing\n✅ Modular Kitchen\n✅ Government Projects (GeM)\n\nPlease share your catalog and pricing.\n\nThank you!`
  );

  const whatsappLink = `https://wa.me/919930998063?text=${whatsappMessage}`;

  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contact us on WhatsApp"
      >
        {/* Main Button */}
        <div
          className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all duration-300 hover:scale-110 ${
            isPulsing ? 'animate-bounce' : ''
          }`}
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-9 h-9 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>

          {/* Pulsing Ring */}
          {isPulsing && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
          )}

          {/* "NEW" Badge */}
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg animate-pulse">
            LIVE
          </span>
        </div>

        {/* Tooltip on Hover */}
        <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl whitespace-nowrap text-sm font-bold">
            💬 Chat on WhatsApp
            <div className="text-xs text-gray-300 mt-1 font-normal">
              Get instant response!
            </div>
            {/* Arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </div>
      </a>

      {/* Mobile Bottom Bar - Alternative CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gradient-to-r from-green-600 to-green-700 shadow-2xl border-t-4 border-green-400 animate-in slide-in-from-bottom duration-500">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-4 py-4 text-white"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-sm font-black uppercase tracking-wide">
              💬 Chat on WhatsApp
            </span>
            <span className="text-xs font-semibold text-green-100">
              Get Instant Quote • Free Consultation
            </span>
          </div>
          <span className="ml-auto bg-yellow-400 text-green-900 text-xs font-black px-3 py-1 rounded-full">
            FREE
          </span>
        </a>
      </div>
    </>
  );
}
