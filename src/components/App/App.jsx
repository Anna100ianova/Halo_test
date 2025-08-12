import { Card } from "../Card/Card";
import { Container } from "../Container/Container";
import { StyledLink } from "../StyledLink/StyledLink";
import { useEffect, useState } from "react";
import { useDataStore } from "./DataStore";
import { Modal } from "../Modal/Modal";
import styles from "./App.module.css";

function App() {
  const data = useDataStore((state) => state.data);
  const loading = useDataStore((state) => state.loading);
  const fetchUser = useDataStore((state) => state.fetchData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No user data</p>;

  const openModal = () => {
    if (!isModalOpen) {
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const selectedCard = (name) => {
    const result = data.find((item) => item.name === name);
    if (result) {
      setSelectedItem(result);
    }
  };

  const buyCheapest = () => {
    const cheapestProduct = data.reduce((min, current) => {
      return current.price < min.price ? current : min;
    });
    setSelectedItem(cheapestProduct);
  };
  const handleClick = () => {
    buyCheapest();
    openModal();
  };

  return (
    <>
      <div className={styles.app_background}>
        <Container>
          <div className={styles.row}>
            {data.map((dataItem) => {
              return (
                <div key={dataItem.name} className={styles.row_item}>
                  <Card
                    data={dataItem}
                    openModal={openModal}
                    selectCard={selectedCard}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.app_btn}>
            <StyledLink onClick={handleClick}>Buy cheapest</StyledLink>
          </div>
        </Container>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
}

export default App;
