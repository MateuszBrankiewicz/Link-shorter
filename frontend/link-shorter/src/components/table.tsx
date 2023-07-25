// components/table.tsx
import React from 'react';
import '../styles/table.css'
interface TableProps {
  data: { url: string; shortUrl: string }[];
  // Dodaj nowy prop dataKey
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Shortened URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.url}</td>
            <td>{item.shortUrl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
