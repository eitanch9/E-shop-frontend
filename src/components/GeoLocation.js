import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../store';

const GeoLocation = () => {
  const { state } = useContext(Store);
  const { cart: {shippingAddress} } = state;

  return (
    <div className="text-white">
      <p>{shippingAddress.city} {shippingAddress.address}</p>
    </div>
  );
};

export default GeoLocation;
