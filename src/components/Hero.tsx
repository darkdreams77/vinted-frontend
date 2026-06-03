import bannerImg from "../assets/img/banner.jpg";
import { CallToAction } from "./CallToAction";

export const Hero = () => {
  return (
    <div className="full-bleed relative h-150 mb-16">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0">
        <img
          src={bannerImg}
          alt=""
          className="w-full h-full object-cover z-0"
        />
      </div>
      <CallToAction />
    </div>
  );
};
