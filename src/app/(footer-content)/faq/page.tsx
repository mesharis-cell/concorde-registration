import { FooterContentLayout } from "@/components";

export default function Privacy() {
  const faqData = [
    {
      title: "QUESTION ITEM 1",
      content:
        "The Event Companion Microsite is your digital guide for this exclusive event. It provides real-time updates, event schedules, interactive features, and all the information you need to make the most of your experience."
    },
    {
      title: "QUESTION ITEM 2",
      content:
        "You can access the microsite through the QR code provided at the event, or by visiting the direct link shared with registered attendees. The site is optimized for mobile devices for easy access during the event."
    },
    {
      title: "QUESTION ITEM 3",
      content:
        "The microsite includes event schedules, interactive maps, real-time updates, photo sharing capabilities, networking features, and exclusive content. You can also access event-specific information and connect with other attendees."
    },
    {
      title: "QUESTION ITEM 4",
      content:
        "While the microsite works best with an internet connection, some features may be cached for offline access. We recommend connecting to the event's WiFi network for the best experience."
    },
    {
      title: "QUESTION ITEM 5",
      content:
        "You can access the microsite through the QR code provided at the event, or by visiting the direct link shared with registered attendees. The site is optimized for mobile devices for easy access during the event."
    },
    {
      title: "QUESTION ITEM 6",
      content:
        "The Event Companion Microsite is your digital guide for this exclusive event. It provides real-time updates, event schedules, interactive features, and all the information you need to make the most of your experience."
    }
  ];

  return (
    <FooterContentLayout subtitle="FAQS">
      <div className="space-y-6 pt-2 md:px-10">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="mb-2 text-lg font-bold text-black uppercase">{item.title}</h3>
            <p className="leading-relaxed text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
    </FooterContentLayout>
  );
}
