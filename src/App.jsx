import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { getPeople, getVehicles, getPlanets } from "../Services/api";
import { FavoritesContext } from "./FavoritesContext";

function App() {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  // Object mapping UIDs to image URLs for each category
  const images = {
    people: {
      "1": "https://upload.wikimedia.org/wikipedia/commons/6/67/Luke_Skywalker_-_Welcome_Banner_%28Cropped%29.jpg",
      "2": "https://images.squarespace-cdn.com/content/51b3dc8ee4b051b96ceb10de/1372481047952-76YYYWBLAFFWXXDOD9LA/C3PO+Tape.png?content-type=image%2Fpng",
      "3": "https://i1.sndcdn.com/artworks-AXnTX8vaGfkmLrhF-xGpExg-t500x500.jpg",
      "4": "https://media.tenor.com/UU0l4sIgtOQAAAAM/paul-birthday.gif",
      "5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOuWgpIPiNePDWFp4LsYUj-VRtprThpNpSng&s",
      "6": "https://pm1.aminoapps.com/6956/341d4af1646db654cf56cdd72ea71747a930840cr1-377-388v2_uhq.jpg",
      "7": "https://pm1.aminoapps.com/6168/6201034bae0783810a78a3bb1e19dde44176ae49_00.jpg",
      "8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKK7OipSyvEogR4AhxGmSxFeCKLH9CCz5ow&s",
      "9": "https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=352%2C0%2C1170%2C878",
      "10": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2017/08/254335-disney-confirma-que-habra-pelicula-obi-wan-kenobi.jpg?tf=3840x",
    },
    vehicles: {
      "4": "https://www.brickfanatics.com/wp-content/uploads/LEGO-Star-wars-sandcrawler-moc-2.jpg",
      "7": "https://netrinoimages.s3.eu-west-2.amazonaws.com/2005/05/06/1656/127695/star_wars_x34_landspeeder_luk_howercraft_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1519436_m.jpg",
      "6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVwJNWMFMTslaGgZa7lq4rGpBX-Rft75WhA&s",
      "8": "https://media.sketchfab.com/models/be87d79b75be4c06bf7b70f477fceb44/thumbnails/6674546ea7bc4490a40bde2ee0840746/8a3a729f2e42475c9aea2f1299543657.jpeg",
      "14": "https://atlas-content-cdn.pixelsquid.com/stock-images/snowspeeder-speeder-RJEree9-600.jpg",
      "18": "https://wallpapers.com/images/hd/at-at-1024-x-768-wallpaper-c8u4wa6yupezxv6z.jpg",
      "16": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrkpQuER17caV3HMFNdMN8ZqN57NVuyB8yg&s",
      "19": "https://p.turbosquid.com/ts-thumb/mv/AaJShg/of/atst_sq_image_1/png/1730711751/300x300/sharp_fit_q85/40b4fcbe885d88cf0037bc30956d6992ecd6629d/atst_sq_image_1.jpg",
      "20": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0dc8eb0-7eb3-4716-b7a1-4364a45acdc0/d94b64o-e3d2ebdc-5d29-4077-9667-a644ee603bd6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwZGM4ZWIwLTdlYjMtNDcxNi1iN2ExLTQzNjRhNDVhY2RjMFwvZDk0YjY0by1lM2QyZWJkYy01ZDI5LTQwNzctOTY2Ny1hNjQ0ZWU2MDNiZDYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cFh2g2xUlImPZc9uYnFvfEmGeAZ2xm7MI9OE6av02r4",
      "24": "https://www.brickfanatics.com/wp-content/uploads/2023/03/Star-Wars-Return-of-the-Jedi-Jabbas-Sail-Barge.jpg",
    },
    planets: {
      "1": "https://img.freepik.com/fotos-premium/escenario-planeta-tatooine-rodaje-star-wars-tunez_664825-282.jpg",
      "2": "https://www.zonammorpg.com/wp-content/uploads/2009/11/SS_20091127_Alderaan01_full.jpg",
      "3": "https://frikipolis.com/wp-content/uploads/2022/03/1OcJFCKRdBvi0lDLpA59n2bIgcsJIv_ZBnie20vquOE.jpg",
      "4": "https://frikipolis.com/wp-content/uploads/2021/07/unnamed-file-54.jpg",
      "5": "https://img.freepik.com/fotos-premium/fondo-selva-dibujos-animados-dagobah_915071-73050.jpg",
      "6": "https://wallpapers.com/images/hd/bespin-1936-x-1090-wallpaper-p71v5atfxoc7bz9c.jpg",
      "7": "https://frikipolis.com/wp-content/uploads/2022/08/ddfba4u-55eccc09-f132-4fca-af19-a80ea4056881.png",
      "8": "https://i.etsystatic.com/20317338/r/il/5e28fa/3395855914/il_fullxfull.3395855914_5lb8.jpg",
      "9": "https://frikipolis.com/wp-content/uploads/2021/12/STAR-WARS-SW_Coruscant.jpg",
      "10": "https://frikipolis.com/wp-content/uploads/2022/05/HD-wallpaper-star-wars-star-wars-battlefront-ii-2017-kamino-star-wars.jpg",
    },
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleData, vehiclesData, planetsData] = await Promise.all([
          getPeople(),
          getVehicles(),
          getPlanets(),
        ]);

        setPeople(peopleData);
        setVehicles(vehiclesData);
        setPlanets(planetsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding or removing favorites
  const handleFavorite = (item, type) => {
    if (favorites.some((fav) => fav.uid === item.uid && fav.type === type)) {
      removeFavorite(item.uid); // Remove favorites
    } else {
      addFavorite({ ...item, type }); // Add in favorites
    }
  };

  // Render the application
  return (
    <div className="App">
      <h1>Star Wars App</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Characters</h2>
          <div className="card-container">
            {people.map((person) => (
              <Card
                key={person.uid}
                item={person}
                onFavorite={() => handleFavorite(person, "people")}
                isFavorite={favorites.some((fav) => fav.uid === person.uid && fav.type === "people")}
                imageUrl={images.people[person.uid]}
              />
            ))}
          </div>

          <h2>Vehicles</h2>
          <div className="card-container">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.uid}
                item={vehicle}
                onFavorite={() => handleFavorite(vehicle, "vehicles")}
                isFavorite={favorites.some((fav) => fav.uid === vehicle.uid && fav.type === "vehicles")}
                imageUrl={images.vehicles[vehicle.uid]}
              />
            ))}
          </div>

          <h2>Planets</h2>
          <div className="card-container">
            {planets.map((planet) => (
              <Card
                key={planet.uid}
                item={planet}
                onFavorite={() => handleFavorite(planet, "planets")}
                isFavorite={favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets")}
                imageUrl={images.planets[planet.uid]}
              />
            ))}
          </div>
        </>
      )}

      <h2>Favorites</h2>
      <div className="card-container">
        {favorites.map((fav) => {
          // Get the image URL based on the type and UID
          const imageUrl = images[fav.type]?.[fav.uid];

          return (
            <Card
              key={`${fav.type}-${fav.uid}`} // Unique key to avoid conflicts
              item={fav}
              onFavorite={() => handleFavorite(fav, fav.type)}
              isFavorite={true}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;