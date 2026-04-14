import Image from "next/image";

const logos = [
  "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b383aad0e27a6bad7e5fa2_Logo%20(1).svg",
  "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b383aa4c03cecaab9c8cd4_Logo%20(8).svg",
  "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b383aa0f5b95bfbd9dc00a_Logo%20(7).svg",
  "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b383aad9bd6601d5169c07_Logo%20(9).svg",
  "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b383aae86b0b10ea8f97e0_Logo%20(6).svg"
];

export function Partners() {
  return (
    <section className="partners-section">
      <div className="container">
        <p className="partners-title">Wspolpraca z markami, ktore stawiaja na jakosc designu</p>
        <div className="partners-marquee" aria-label="Logotypy partnerow">
          <div className="partners-track">
            <div className="partners-row">
              {logos.map((logo, index) => (
                <Image
                  key={`a-${logo}-${index}`}
                  src={logo}
                  alt="Logo partnera"
                  width={158}
                  height={34}
                  className="partner-logo"
                />
              ))}
            </div>
            <div className="partners-row" aria-hidden="true">
              {logos.map((logo, index) => (
                <Image
                  key={`b-${logo}-${index}`}
                  src={logo}
                  alt=""
                  width={158}
                  height={34}
                  className="partner-logo"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
