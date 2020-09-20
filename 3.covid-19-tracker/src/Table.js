import React from 'react';
import './Table.css';

const Table = ({ countries }) => {
    return (
        <table className="table">
            <tbody className="table__body">
                {countries.map(({ country, cases, countryInfo }) => (
                    <tr key={country}>
                        <td>
                            {country}
                        </td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
