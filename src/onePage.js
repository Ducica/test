import React from "react";

const OnePage = ({ data }) => {
    const onePageList = data.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.nazev}</td>
                <td>{item.mesto}</td>
                <td>{item.psc}</td>
            </tr>
        );
    });
    return (
        <div className="list-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>PSČ</th>
                    </tr>
                </thead>
                <tbody>{onePageList}</tbody>
            </table>
        </div>
    );
};

export default OnePage;

// const FilterComponent = ({ data, onFilterClick }) => {
//     const filters = data.map((currentFilter, index) => (
//         <tr key={index}>
//             <td onClick={() => onFilterClick(currentFilter)}>
//                 {currentFilter}
//             </td>
//         </tr>
//     ));
//     return (
//         <div className="list-container">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>PSČ</th>
//                     </tr>
//                 </thead>
//                 <tbody>{filters}</tbody>
//             </table>
//         </div>
//     );
// };
