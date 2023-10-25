import LiveMatches from "../components/LiveMatches/LiveMatches";
import { ComplexNavbar } from "../components/Navbar";

import { TabsCustomAnimation } from "../components/SportArticles";

export default function Home() {
  return (
    <>
      <ComplexNavbar />
      <LiveMatches />
      <TabsCustomAnimation />
    </>
  );
}
