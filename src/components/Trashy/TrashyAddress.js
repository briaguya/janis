import React from 'react';
import Downshift from 'downshift';

const TrashyAddress = ({ suggestions, setAddress, getSuggestions }) => (
  <Downshift
    onChange={selection => setAddress(selection)}
    itemToString={item => (item ? item.name : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <label {...getLabelProps()}>Type your street address in the box</label>
        <input
          {...getInputProps({
            onChange: e => getSuggestions(e.target.value),
          })}
        />
        {isOpen ? (
          <div>
            {suggestions
              .filter(item => !inputValue || item.name.includes(inputValue))
              .map((item, index) => (
                <div
                  className="coa-Trashy__autosuggestion"
                  {...getItemProps({
                    key: item.parcel_id,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.name}
                </div>
              ))}
          </div>
        ) : null}
      </div>
    )}
  </Downshift>
);

export default TrashyAddress;
