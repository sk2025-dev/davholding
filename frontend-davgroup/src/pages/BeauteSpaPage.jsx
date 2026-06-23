import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeauteServiceSection from "../components/Beaute/BeauteServiceSection";
import { spaServices } from "../components/Beaute/beauteData";

function BeauteSpaPage() {
  return (
    <BeauteLayout>
      <BeauteServiceSection
        id="spa"
        eyebrow="Spa & Soins"
        title="Détente et bien-être"
        emphasis="au quotidien"
        services={spaServices}
      />
    </BeauteLayout>
  );
}

export default BeauteSpaPage;
