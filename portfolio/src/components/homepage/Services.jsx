import ServiceUi from "../ui/ServiceUi";
import Heading from "../ui/Heading";

export default function Services() {
  const expertiseItems = [
    "Strategic Consulting",
    "Project Management",
    "Business Analysis",
    "Product Strategy",
    "Process Optimization",
    "Team Leadership",
    "Agile Methodologies",
    "Revenue Growth",
  ];

  const toolBoxItems = [
    "Strategic Planning",
    "Agile & Scrum",
    "Risk Management",
    "Stakeholder Management",
    "Business Intelligence",
    "Process Improvement",
    "Change Management",
    "Performance Analytics",
  ];

  return (
    <section id="services" className="my-[10%]" aria-label="services">
      <Heading title="services" />
      <div className="space-y-14">
        <ServiceUi
          title="my strategic expertise."
          description="I focus on strategic consulting, project management, and business transformation. With each engagement, my goal is to deliver impactful solutions that drive innovation and sustainable growth for organizations."
          items={expertiseItems}
        />
        <ServiceUi
          title="my consulting toolkit."
          description="These are my core competencies and methodologies that enable successful project delivery and business transformation. I continuously expand my expertise to stay ahead of industry trends and emerging technologies."
          items={toolBoxItems}
        />
      </div>
    </section>
  );
}
