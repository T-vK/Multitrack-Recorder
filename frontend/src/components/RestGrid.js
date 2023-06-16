import React, { useEffect, useState } from 'react';
import { UIRoot, UIGenerator } from '@ui-schema/ui-schema';
import axios from 'axios';

const RestGrid = (entityName, baseUrl='http://localhost:3001/api/v1') => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/${entityName}`);
      setData(response.data);
    };

    fetchData();
  }, []);

  const handleAdd = async (newData) => {
    const response = await axios.post(`${baseUrl}/${entityName}`, newData);
    setData([...data, response.data]);
  };

  const handleUpdate = async (updatedData) => {
    await axios.put(`${baseUrl}/${entityName}/${updatedData.id}`, updatedData);
    const updatedList = data.map((item) => (item.id === updatedData.id ? updatedData : item));
    setData(updatedList);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/${entityName}/${id}`);
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  };

  return (
    <div>
      <h1>Audio Input Devices</h1>
      <UIRoot>
        <UIGenerator
          schema={{
            $ref: `../../common/schemas/{entityName}.json`,
          }}
          data={data}
          onChange={setData}
          widgets={{
            Table: {
              TableAdd: ({ onAdd }) => (
                <button onClick={onAdd}>Add Row</button>
              ),
              TableRemove: ({ onRemove }) => (
                <button onClick={onRemove}>Remove Row</button>
              ),
            },
          }}
          t={{}}
          // Custom cell renderer for the ID field
          // Adjust this based on your requirements
          cellRenderer={({ column, row }) => {
            if (column.id === 'id') {
              return <span>ID: {row[column.id]}</span>;
            }
            return <span>{row[column.id]}</span>;
          }}
          showValidity
          actions={{
            handleAdd,
            handleUpdate,
            handleDelete,
          }}
        />
      </UIRoot>
    </div>
  );
};

export default RestGrid;