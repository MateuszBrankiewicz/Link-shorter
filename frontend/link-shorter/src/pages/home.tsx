import React, { ChangeEvent, useState, useEffect } from 'react';
import Input from '../components/inputs';
import Button from '../components/button';
import Table from '../components/table';
import { useLocation } from 'react-router-dom';

interface ServerData {
  email: string;
  links: string[];
  shorted_links: string[];
}

const Home = () => {
  
  const [url, setUrlValue] = useState("");
  const [getData, setGetData] = useState<ServerData>({ email: "", links: [], shorted_links: [] });
  
  const [tableData, setTableData] = useState<{ url: string; shortUrl: string; }[]>([]);

  useEffect(() => {
    loadUrls();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  const createUrl = () => {
    if (url !== "") {
      const data = {
        email: email,
        url: url
      };
      fetch("http://localhost:5000/api/home/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseData => {
          setGetData(responseData);
         
        })
        .catch(error => {
          console.error("Fetch error:", error);
       
        });
    }
  };

  const loadUrls = () => {
    const data = {
      email: email,
    };
    fetch("http://localhost:5000/api/home", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        setGetData(responseData);
       console.log(responseData)
      })
      .catch(error => {
        console.error("Fetch error:", error);
        ; // Dodaj setLoading na false w przypadku błędu
      });
  };


  const location = useLocation();
  const { email, password } = location.state;

  useEffect(() => {
    
    if (getData && getData.links && getData.shorted_links) {
      const tableData = getData.links.map((link, index) => ({
        url: link,
        shortUrl: getData.shorted_links[index],
      }));
      setTableData(tableData);
      console.log(tableData)
    }
  }, [getData]);

 

  return (
    <div>
      <div>
        <Input
          msg='Enter a url'
          onChange={handleInputChange}
          inputValue={url}
          option='text'
        />
        <Button onClick={createUrl} msg='Create url' />
      </div>
      <div>
      {tableData.length > 0 ? (
    <Table data={tableData} />
  ) : (
    <p>Loading data...</p>
  )}
      </div>
    </div>
  );
};

export default Home;
