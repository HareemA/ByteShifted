import Image from "next/image";
import { Navbar } from "@/components/NavBar/Navbar";
import { Header } from "@/components/Header/Header";
import { OurSolutions } from "@/components/OurSolutions/OurSolutions";
import { LifeAtByteShifted } from "@/components/LifeAtByteShifted/LifeAtByteShifted";
import { Hiring } from "@/components/Hiring/Hiring";
import { Special } from "@/components/Special/Special";
import { Connected } from "@/components/Connected/Connected";
import { CurrentOpenings } from "@/components/CurrentOpenings/CurrentOpenings";
import TalentForm from "@/components/TalentForm/TalentForm";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="bg-[#000000]">
      <Navbar />
      <Header />
      <OurSolutions />
      <LifeAtByteShifted />
      <Hiring />
      <Special />
      <Connected />
      <CurrentOpenings />
      <TalentForm />
      <Footer />
    </div>
  );
}
