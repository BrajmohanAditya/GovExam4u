import React, { useEffect, useState } from "react";
import { MockCardStyle } from "./style";
import httpAction from "../user/utils/httpAction";
import apis from "./apis";

const MockCard = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const data = {
      url: apis().getCards,
      method: "GET",
    };

    const result = await httpAction(data);
    if (result?.status) {
      setCards(result?.data);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className={MockCardStyle.cardContainer}>
      {cards.map((item) => (
        <div key={item._id} className={MockCardStyle.card}>
          <h3 className={MockCardStyle.title}>{item.name}</h3>
          <p className={MockCardStyle.subtitle}>{item.exam}</p>

          <a href={item.link} target="_blank" className={MockCardStyle.link}>
            Visit Exam Link
          </a>

          <p className={MockCardStyle.lastDate}>Last Date: {item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MockCard;
