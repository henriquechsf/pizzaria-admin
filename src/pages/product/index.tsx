import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { Input, TextArea } from "../../components/ui/Input";
import { FiUpload } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ChangeEvent, useState } from "react";
import { setupAPIClient } from "../../services/api";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: Array<ItemProps>;
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  };

  const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategorySelected(Number(event.target.value));
  };

  return (
    <>
      <Head>
        <title>Novo produto - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={36} color="#FFF" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </select>

            <Input placeholder="Digite o nome do produto" />
            <Input placeholder="Digite o preco do produto" />

            <TextArea placeholder="Descreva seu produto" />

            <button className={styles.buttonAdd}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/category");

  console.log(response.data);

  return {
    props: {
      categoryList: response.data,
    },
  };
});
