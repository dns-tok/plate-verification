import { IoLogoWhatsapp } from "react-icons/io";

export default function WhatsAppButton({
  phone = "5511942227953",
  className = "",
  title = "Chat on WhatsApp",
}) {
  const href = `https://wa.me/${phone}`;
  const baseClasses =
    "fixed bottom-20 md:bottom-10 text-green-500 md:text-5xl text-4xl cursor-pointer z-[100] hover:scale-110 transition-all duration-300 whatsapp-icon";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
    >
      <IoLogoWhatsapp className={`${baseClasses} ${className}`} />
    </a>
  );
}
