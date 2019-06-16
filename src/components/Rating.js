import React, { useEffect } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Wrapper = styled.div`
    width: 100%;
`;

const Star = styled(FaStar)`
    width: 1.5rem;
    height: 1.5rem;
`;

const HalfStar = styled(FaStarHalfAlt)`
    width: 1.5rem;
    height: 1.5rem;
`;
const EmptyStar = styled(FaRegStar)`
    width: 1.5rem;
    height: 1.5rem;
`;

const Rating = ({ rating }) => {
    const handleStars = rating => {
        const number = parseInt(rating.toString().split(".")[0]);
        const decimal = parseInt(rating.toString().split(".")[1]);
        const stars = Array(number).fill("star");
        if (decimal >= 5) {
            stars.push("halfStar");
        }
        while (stars.length !== 5) {
            stars.push("emptyStar");
        }
        return stars.map((star, i) => {
            if (star === "star") {
                return <Star key={i} />;
            } else if (star === "halfStar") {
                return <HalfStar key={i} />;
            } else {
                return <EmptyStar key={i} />;
            }
        });
    };

    return <Wrapper>{handleStars(rating)}</Wrapper>;
};

export default Rating;
