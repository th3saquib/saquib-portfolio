import { ImageSwitch } from "@/components/ImageSwitch";
import { educationItems } from "@/data/education";

export function Education() {
  return (
    <div id="education" className="section-education-experience flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu" />
        Education & Experience
      </div>
      <div className="timeline scroll-down">
        <div className="timeline-line">
          <div className="prg-line" />
        </div>
        {educationItems.map((item, i) => (
          <div className="timeline-item effectFade fadeUp no-div" key={i}>
            <p className="timeline-date text-black-56">{item.period}</p>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="icon">
                <ImageSwitch
                  light={item.icon.light}
                  dark={item.icon.dark}
                  width={item.icon.width}
                  height={item.icon.height}
                />
              </div>
              <p className="timeline-role fw-medium text-black-72">{item.role}</p>
              <p className="timeline-desc text-body-3 text-black-56" style={{ whiteSpace: "pre-line" }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
