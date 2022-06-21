import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://629636a1810c00c1cb718672.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (e) {
        alert("error take pizza");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) return <>"loading...";</>;

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} P </h4>
    </div>
  );
};

export default FullPizza;
