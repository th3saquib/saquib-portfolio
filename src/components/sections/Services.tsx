"use client";

import { services } from "@/data/services";
import Image from "next/image";

export function Services() {
    return (
        <div id="service" className="section-service flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div mb-0">
                <i className="icon icon-service" />
                Services
            </div>

            <div id="accordion-service">
                {services.map((s, idx) => {
                    const isOpen = idx === 0;

                    return (
                        <div
                            key={s.id}
                            className="service-accordion_item scrolling-effect effectBottom"
                        >
                            <a
                                href={`#${s.id}`}
                                className={`accordion-action${isOpen ? "" : " collapsed"}`}
                                data-bs-toggle="collapse"
                                data-bs-target={`#${s.id}`}
                                aria-expanded={isOpen ? "true" : "false"}
                                aria-controls={s.id}
                            >
                                <h4 className="text letter-space--2 text-black-72">
                                    {s.title}
                                </h4>

                                <div className="ic-wrap">
                                    <span className="ic-accordion-custom" />
                                </div>
                            </a>

                            <div
                                id={s.id}
                                className={`collapse${isOpen ? " show" : ""}`}
                                data-bs-parent="#accordion-service"
                            >
                                <div className="accordion-content">
                                    <div className="tf-grid-layout sm-col-2">
                                        {s.images.map((img) => (
                                            <div
                                                className="service-image"
                                                key={img}
                                            >
                                                <div className="wrap_image">
                                                    <Image
                                                        width={340}
                                                        height={206}
                                                        src={img}
                                                        alt={s.title}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="service-tag">
                                        {s.tags.map((tag) => (
                                            <a
                                                key={tag}
                                                href="#"
                                                className="tag-item text-body-3 fw-medium text-black-72 link"
                                            >
                                                {tag}
                                            </a>
                                        ))}
                                    </div>

                                    <p className="service-desc text-black-56">
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
