import photo1 from "./photo1.jpg";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      {/* first part containing some text and a picture */}
      <div>
        <h1 className="mt-20 ml-16 text-5xl font-semibold">
          CarRental is system from which
        </h1>
        <h1 className="mt-5 ml-16 text-5xl font-semibold">
          you can rent a car in advance,
        </h1>
        <h1 className="mt-5 ml-16 text-5xl font-semibold">
          from wherever you are.
        </h1>
        <div className="mt-16">
          <img src={photo1} />
        </div>
      </div>

      {/* second part  */}
      <div className="grid grid-cols-2 m-28">
        <h1 className="font-bold text-6xl">About us</h1>
        <div>
          <p className="font-semibold text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
          <p className="font-semibold mt-4 text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivaada lacinia integer nunc posuere. Ut hendrerit
            semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.
          </p>
          <p className="font-semibold mt-4 text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.
          </p>
          <p className="font-semibold mt-4 text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vit lacinia integer nunc posuere. Ut hendrerit
            semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
