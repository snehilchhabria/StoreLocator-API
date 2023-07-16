
  mapboxgl.accessToken = 'pk.eyJ1Ijoic25laGlsMjAyNCIsImEiOiJjbGsxYTV1cXYwNXh2M2Nqa21sa2praWNrIn0.M7F2zdHXNHOJz-lpeTqYww';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-71.157895, 42.707741]
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
                coordinates: [
                    store.location.coordinates[0],
                     store.location.coordinates[0]
                    ]
                },
                properties: {
                storeID: store.storeID,
                icon: 'shop'
                }
            }
    });
    loadMap();
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

