import React from "react";
import Slider from "react-slick";
import Loader from "./Loader";
import CastItem from "./CastItem";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Wrapper = styled.div`
    margin-bottom: 1rem;
`;

const Header = styled.h2`
    font-size: 1.6rem;
    color: ${props =>
        props.dark
            ? "var(--color-darkDarkBlue)"
            : "var(--color-lightDarkBlue)"};
    margin-bottom: 1rem;
`;

const Cast = ({ cast, baseUrl, dark }) => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    if (!cast) {
        return <Loader />;
    }

    return (
        <Wrapper>
            <Header dark={dark}>Cast</Header>
            <Slider {...settings}>
                {cast[0].map(person => (
                    <CastItem
                        person={person}
                        baseUrl={baseUrl}
                        key={person.id}
                    />
                ))}
            </Slider>
        </Wrapper>
    );
};

function NextArrow({ onClick }) {
    return (
        <IoIosArrowForward
            style={{
                right: "-15px",
                position: "absolute",
                top: "50%",
                display: "block",
                width: "12px",
                height: "12px",
                padding: "0",
                transform: "translate(0, -50%)",
                cursor: "pointer",
                color: "white"
            }}
            onClick={onClick}
            icon={"chevron-right"}
            size="1x"
        />
    );
}

function PrevArrow({ onClick }) {
    return (
        <IoIosArrowBack
            style={{
                left: "-15px",
                position: "absolute",
                top: "50%",
                display: "block",
                width: "12px",
                height: "12px",
                padding: "0",
                transform: "translate(0, -50%)",
                cursor: "pointer",
                color: "white"
            }}
            onClick={onClick}
            icon={"chevron-left"}
            size="1x"
        />
    );
}

export default Cast;
