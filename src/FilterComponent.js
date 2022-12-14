import React from "react";

const FilterComponent = ({ data, onFilterClick, totalPages}) => {
    const filters = data.map((currentFilter, index) => (
        <tr key={index}>
            <td onClick={() => onFilterClick(currentFilter)}>
                {currentFilter}
            </td>
        </tr>
    ));
    return (
        <div className="list-container">
            <table>
                <thead>
                    <tr>
                        <th>Filter</th>
                    </tr>
                </thead>
                {totalPages > 1 && <tbody>{filters}</tbody>}
            </table>
        </div>
    );
};

export default FilterComponent
