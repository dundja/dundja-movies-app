import React, { useContext } from "react";
import styled from "styled-components";
import { GenresContext } from "../context/genresContext";

const Wrapper = styled.div`
    flex: 1;

    display: grid;
    grid-template-columns: repeat(3, 15rem);
    grid-template-rows: repeat(3, 15rem);
    grid-gap: 1rem;
`;

const ImgWrapper = styled.div`
    height: 15rem;
    width: 15rem;
`;

const Img = styled.img`
    max-height: 100%;
`;

const PersonGallery = ({ images }) => {
    const { genresState } = useContext(GenresContext);
    const { secure_base_url } = genresState.config.images;
    const { logo_sizes } = genresState.config.images;

    const handleImages = images => {
        const firstSix = images.slice(0, 9);
        return firstSix.map(img => (
            <ImgWrapper>
                <Img
                    src={`${secure_base_url}/${logo_sizes[3]}/${img.file_path}`}
                    alt="actor photo"
                />
            </ImgWrapper>
        ));
    };

    return <Wrapper>{handleImages(images)}</Wrapper>;
};

export default PersonGallery;
