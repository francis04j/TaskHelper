import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

interface Item {
  name: string;
}

function SearchBar() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<Item[]>([
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Cherry' },
    { name: 'Mango' },
    { name: 'Orange' },
    { name: 'Pineapple' },
    { name: 'Strawberry' },
  ]);

  const handleOnSearch = (string: string, results: any) => {
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: any) => {
    return (
      <span className="block text-left">{item.name}</span>
    );
  };

  return (
    <ReactSearchAutocomplete
            items={items}
            onSearch={handleSearch}
            onHover={(handleOnHover)}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
              zIndex: 3,
              borderRadius: "24px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              height: "48px",
              border: "1px solid #dfe1e5",
              hoverBackgroundColor: "#f1f3f4",
              color: "#212121",
              fontSize: "16px",
              fontFamily: "Neue Plak, sans-serif",
              iconColor: "#14a800",
              lineColor: "#14a800",
              placeholderColor: "#5e6d55",
              clearIconMargin: "3px 14px 0 0",
              searchIconMargin: "0 0 0 16px"
            }}
            placeholder="What do you need help with?"
          />
  );
}