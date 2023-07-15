
  mapboxgl.accessToken = 'pk.eyJ1Ijoic25laGlsMjAyNCIsImEiOiJjbGsxYTV1cXYwNXh2M2Nqa21sa2praWNrIn0.M7F2zdHXNHOJz-lpeTqYww';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [77.216721, 28.644800]
  });

  //Fetch stores from API
  async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [77.216721, 28.644800]
                },
                properties: {
                storeID: '0001',
                icon: 'shop'
                }
            }
    });
  }

  // Load map
  function loadMap(stores) {
        map.on('load', function() {
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: stores,
                // features:[ 
                //     {
                //         type: 'Feature',
                //         geometry: {
                //             type: 'Point',
                //             coordinates: [77.216721, 28.644800]
                //         },
                //         properties: {
                //             storeID: '0001',
                //             icon: 'shop'
                //         }
                //     }
                // ]
              }
            },
            layout: {
              'icon-image': '{icon}-15',
              'icon-size': 1.5,
              'text-field': '{storeID}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.9],
              'text-anchor': 'top'
            }
          });
        });
      }
      getStores();

