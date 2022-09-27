import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { OrderItemProps } from "../../pages/dashboard";
import styles from "./styles.module.scss";

interface ModalOrderProps {
  isOpen: boolean;
  order: OrderItemProps[];
  onClose: VoidFunction;
  onConfirm: (id: string) => void;
}

export function ModalOrder({
  isOpen,
  onClose,
  order,
  onConfirm,
}: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1D1D2E",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button
        type="button"
        onClick={onClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#F34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>

        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - <strong>{item.product.name}</strong>
            </span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}

        <button
          className={styles.buttonOrder}
          onClick={() => onConfirm(order[0].order_id)}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
