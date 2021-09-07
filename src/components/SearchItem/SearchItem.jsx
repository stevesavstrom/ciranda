import React from "react";

function SearchItem(props) {
  let acceptedMaterial = props.company.item;
  console.log("The materials accepted are:", acceptedMaterial);

  // TODO: need to loop through items
  return (
    <li>
      <h1>{props.company.name}</h1>
      <p>Address: {props.company.address}</p>
      <p>Contact information:</p>
      <p>Phone: {props.company.phone}</p>
      <p>Email: {props.company.email}</p>
      <p>Materials accepted:</p>
      <p>{props.company.item}</p>
    </li>
  );
}

export default SearchItem;
