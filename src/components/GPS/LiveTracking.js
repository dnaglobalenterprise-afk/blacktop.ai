import React, { useEffect, useRef } from 'react';

const LiveTracking = () => {
  const mapRef = useRef(null);
  const apiKey = "AIzaSyAVGJvFa610GTPA9weuu5DAVOnpO_DouXQ"; // Using your provided key

  useEffect(() => {
    const loadMap = () => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.0902, lng: -95.7129 }, // Center of USA
        zoom: 4,
        styles: [ { "stylers": [ { "invert_lightness": true }, { "saturation": -100 } ] } ] // Dark Mode Map
      });

      // Demo Marker for a Truck
      new google.maps.Marker({
        position: { lat: 32.7767, lng: -96.7970 },
        map,
        title: "T-502 - John Doe",
        icon: 'http://maps.google.com/mapfiles/ms/icons/truck.png'
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  return (
    <div className="gps-container">
      <h3>Live GPS Command (Micropoint Mode)</h3>
      <div ref={mapRef} style={{ width: '100%', height: '600px', borderRadius: '8px' }}></div>
      <div className="history-tray">
        <button>Pull 10-Day History Report</button>
      </div>
    </div>
  );
};

export default LiveTracking;