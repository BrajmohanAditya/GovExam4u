// // data fetching,  insert in card and display cards

import React, { useEffect, useState } from "react";
import { MockCardStyle } from "./style";
import httpAction from "../user/utils/httpAction";
import apis from "./apis";
import { useNavigate } from "react-router-dom";

const MockCard = () => {
  const [cards, setCards] = useState([]);
 const navigate = useNavigate();

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
      {cards.map((card) => (
        <div
          key={card._id}
          className={MockCardStyle.card}
          onClick={() => navigate(`/card/${card._id}/updateDelete`)}
        >
          <div key={card._id} className={MockCardStyle.card}>
            <h3 className={MockCardStyle.title}>{card.name}</h3>
            <p className={MockCardStyle.subtitle}>{card.exam}</p>

            <a
              href={card.link}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className={MockCardStyle.link}
            >
              Visit Exam Link
            </a>

            <p className={MockCardStyle.lastDate}>Last Date: {card.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MockCard;

