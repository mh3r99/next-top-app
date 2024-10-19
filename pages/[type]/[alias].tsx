import { withLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers";
import TopPageComponents from "../../page-components/TopPageComponents/TopPageComponents";
import { API } from "../../helpers/api";

interface ITopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

function TopPage({ firstCategory, page, products }: ITopPageProps) {
  return (
    <TopPageComponents
      firstCategory={firstCategory}
      page={page}
      products={products}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      API.topPage.find,
      {
        firstCategory: m.id,
      },
    );
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)),
    );
  }

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route == params.type,
  );

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(
   API.topPage.find,
    {
      firstCategory: firstCategoryItem.id,
    },
  );

  const { data: page } = await axios.get<TopPageModel>(
   API.topPage.byAlias + params.alias,
  );

  const { data: products } = await axios.post<ProductModel[]>(
    API.product.find,
    {
      category: page.category,
      limit: 10,
    },
  );

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
      page,
      products,
    },
  };
};

export default withLayout(TopPage);
