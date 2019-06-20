import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";

import { ThemeContext } from "../context/themeContext";

const SortBy = ({ option, setOption }) => {
    const { theme } = useContext(ThemeContext);
    const [color1, setColor1] = useState();
    const [color2, setColor2] = useState();
    const [color3, setColor3] = useState();

    useEffect(() => {
        if (theme.dark) {
            setColor1("#6B8FB2");
            setColor2("#BBB1D1");
            setColor3("#BED5DD");
        } else {
            setColor1("#FDFDFD");
            setColor2("#1C2630");
            setColor3("#BBB1D1");
        }
    }, [theme.dark]);

    function handleChange(selectedOption) {
        setOption(selectedOption);
    }

    return (
        <Select
            theme={theme => ({
                ...theme,
                borderRadius: 5,
                width: "50",
                colors: {
                    ...theme.colors,
                    primary25: color3,
                    primary: color2,
                    neutral0: color1
                }
            })}
            value={option}
            onChange={handleChange}
            options={options}
            isSearchable={false}
        />
    );
};

const options = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "vote_average.desc", label: "Votes Average" },
    { value: "original_title.asc", label: "Title" },
    { value: "release_date.desc", label: "Release Date" }
];

export default SortBy;
