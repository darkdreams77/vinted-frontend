import { Container } from "./layout/Container";

export const CallToAction = () => {
  return (
    <Container>
      <div className="relative z-10 rounded-sm bg-white w-100 p-10 top-40 flex flex-col gap-2">
        <h1 className="text-2xl mb-8">
          Prêt à faire du tri dans tes placards ?
        </h1>
        <button className="button w-full filled py-3">
          Commencer à vendre
        </button>
        <button className="button w-full blank py-3">
          Découvrir comment ça marche
        </button>
      </div>
    </Container>
  );
};
