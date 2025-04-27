import React from 'react';
import './ComparePackage.css';

const ComparePackage = ({ data }) => {
  return (
    <div className="compare-package">
      <h3 className="title">Comparer les forfaits</h3>
      
      <table>
        <thead>
          <tr>
            <th>Forfait</th>
            {data.headers.map(header => (
              <th key={header.title}>
                <div className="price">{header.price}</div>
                <div className="name">{header.title}</div>
                <div className="description">{header.description}</div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {data.rows.map(row => (
            <tr key={row.label} className={row.type === 'feature' ? 'feature-row' : ''}>
              <td>{row.label}</td>
              {row.values.map((value, index) => (
                <td key={index}>
                  {typeof value === 'boolean' ? (
                    <span 
                      className={`checkmark ${value ? 'active' : ''}`}
                      style={{ color: data.headers[index].color }}
                    >
                      ✓
                    </span>
                  ) : (
                    <span>{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          
          <tr className="total-row">
            <td>Total</td>
            {data.headers.map(header => (
              <td key={header.title}>{header.total}</td>
            ))}
          </tr>
          
          <tr className="button-row">
            <td></td>
            {data.headers.map(header => (
              <td key={header.title}>
                <button 
                  className="select-button"
                  style={{ backgroundColor: header.color }}
                >
                  Sélectionner
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparePackage;