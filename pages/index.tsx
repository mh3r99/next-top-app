import { withLayout } from "../layout/Layout";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

interface IHomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

function Home({ menu, firstCategory }: IHomeProps) {
  return <></>;
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    },
  );

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};
export default withLayout(Home);
