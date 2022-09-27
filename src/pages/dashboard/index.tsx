import Head from "next/head";
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { ModalOrder } from "../../components/ModalOrder";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: Array<OrderProps>;
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = async (id: string) => {
    const apiClient = setupAPIClient();
    const response = await apiClient.get(`/order/${id}`);

    setModalItem(response.data);
    setModalVisible(true);
  };

  const handleFinishOrder = async (id: string) => {
    const apiClient = setupAPIClient();
    await apiClient.patch(`order/${id}/finish`);

    handleRefreshOrders();

    setModalVisible(false);
  };

  const handleRefreshOrders = async () => {
    const apiClient = setupAPIClient();

    const response = await apiClient.get("/order");
    setOrderList(response.data);
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw color="#3FFFA3" size={25} />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto encontrado...
              </span>
            )}

            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            order={modalItem}
            onClose={handleCloseModal}
            onConfirm={handleFinishOrder}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/order");

  return {
    props: {
      orders: response.data,
    },
  };
});
