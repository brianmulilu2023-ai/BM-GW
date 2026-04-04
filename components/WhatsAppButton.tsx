export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi, I'm interested in your work");
  const whatsappUrl = `https://wa.me/1234567890?text=${message}`; // Replace with actual number

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