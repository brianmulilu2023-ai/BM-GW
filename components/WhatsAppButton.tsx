export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello! I'm interested in your portfolio and would like to connect.");
  const whatsappUrl = `https://wa.me/254798405726?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
    >
      WhatsApp
    </a>
  );
}