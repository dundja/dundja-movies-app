import React from "react";
import styled from "styled-components";
import { FaHeart, FaChartBar, FaCalendar } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const StyledItem = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.4rem;
    line-height: 1.1rem;
    text-transform: capitalize;
    padding: 1rem;
    width: 100%;
    border-radius: 15px;
    ${({ selected }) =>
        selected
            ? `&:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid var(--color-lightMiddleBlue);
    }`
            : null};

    &:hover {
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid var(--color-lightMiddleBlue);
        }
    }
`;

const Text = styled.span`
    margin-left: 0.5rem;
`;

const IconHeart = styled(FaHeart)`
    margin-left: 1rem;
    width: 1.4rem;
    height: 1.4rem;
`;

const IconChart = styled(FaChartBar)`
    margin-left: 1rem;
    width: 1.4rem;
    height: 1.4rem;
`;

const IconCalendar = styled(FaCalendar)`
    margin-left: 1rem;
    width: 1.4rem;
    height: 1.4rem;
`;

const IconMovie = styled(MdMovie)`
    margin-left: 1rem;
    width: 1.4rem;
    height: 1.4rem;
`;

const MenuItem = ({ title, selected }) => {
    const renderIcon = title => {
        switch (title) {
            case "Popular":
                return <IconHeart />;
            case "Top Rated":
                return <IconChart />;
            case "Upcoming":
                return <IconCalendar />;
            default:
                return <IconMovie />;
        }
    };

    return (
        <StyledItem selected={selected}>
            {renderIcon(title)}
            <Text>{title}</Text>
        </StyledItem>
    );
};

export default MenuItem;
