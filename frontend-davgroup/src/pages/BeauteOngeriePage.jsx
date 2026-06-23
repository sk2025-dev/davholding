import BeauteLayout from "../components/Beaute/BeauteLayout";
import BeauteServiceSection from "../components/Beaute/BeauteServiceSection";
import { nailServices } from "../components/Beaute/beauteData";

function BeauteOngeriePage() {
  return (
    <BeauteLayout>
      <BeauteServiceSection
        id="ongerie"
        eyebrow="Onglerie"
        title="Pose, nail art et"
        emphasis="manucure raffinée"
        services={nailServices}
      />
    </BeauteLayout>
  );
}

export default BeauteOngeriePage;
