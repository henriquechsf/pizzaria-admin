import Head from "next/head";
import { Header } from "../../components/Header";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "../../components/ui/Input";
import { toast } from "react-toastify";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (name === "") {
      toast.error("Digite o nome da catetoria");
      return;
    }

    try {
      await api.post("/category", {
        name: name,
      });

      toast.success(`Categoria cadastrada com sucesso!`);
      setName("");
    } catch (err) {
      toast.error("Erro ao cadastrar categoria!");
    }
  };

  return (
    <>
      <Head>
        <title>Nova Categoria - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <Input
              placeholder="Digite o nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
