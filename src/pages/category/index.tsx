import Head from "next/head";
import { Header } from "../../components/Header";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "../../components/ui/Input";

export default function Category() {
  const [name, setName] = useState("");

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    alert("Name: " + name);
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
