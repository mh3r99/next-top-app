import { Rating } from "../components";
import { withLayout } from "../layout/Layout";

function Home() {
  return (
    <>
      <Rating rating={3} isEditable />
    </>
  );
}

export default withLayout(Home);
