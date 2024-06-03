"use client"
import Switch from "@/views/components/switch";
import CardComponent from "@/views/components/card";
import { useEffect, useState } from "react";
import Loading from "@/views/components/loading";
import HttpService from "@/services/http.service";
import useStore from "@/state-management-v2/useStore";
import Button from "@/views/components/button";

const http = new HttpService()

export default function Home() {
  const [data, setData] = useState<any[]>([])
  const [checked, setStatus] = useState<boolean>(true)
  const [state, updateState] = useStore();
  const [loading, setLoading] = useState<boolean>(false)
  const [spiece, setSpiece] = useState<string>('mammal')

  function getPlanetsWithReptileResidents(props: getPlanetsWithReptileResidentsProps) {
    return new Promise<Planet[]>((resolve, reject) => {
      const planetsWithReptileResidents: Planet[] = [];

      http.get("/planets")
        .then((response: any) => {
          const planets: Planet[] = response.results;
          const residentPromises: Promise<void>[] = [];

          planets.forEach((planet) => {
            // Check if the planet has appeared in at least one movie and has residents
            if (planet.films.length > 0 && planet.residents.length > 0) {
              planet.residents.forEach((residentUrl) => {
                const residentPromise = http.get(residentUrl)
                  .then((residentResponse: any) => {
                    const resident: Resident = residentResponse;
                    const speciesPromises: Promise<void>[] = resident.species.map((speciesUrl) => {
                      return http.get(speciesUrl)
                        .then((speciesResponse: any) => {
                          const species: Species = speciesResponse;
                          // Check if the species classification matches the specified reptile species
                          if (species.classification === props.specie) {
                            planetsWithReptileResidents.push(planet);
                          }
                        });
                    });
                    // Return a promise that resolves when all species promises have resolved
                    return Promise.all(speciesPromises).then(() => { });
                  });
                residentPromises.push(residentPromise);
              });
            }
          });

          return Promise.all(residentPromises);
        })
        .then(() => {
          // Removing duplicate planets
          const uniquePlanets = Array.from(new Set(planetsWithReptileResidents.map(p => p.name)))
            .map(name => planetsWithReptileResidents.find(p => p.name === name)!);

          // Fetch films data for each planet
          const filmPromises = uniquePlanets.map((planet) => {
            const filmDataPromises = planet.films.map((filmUrl) => {
              return http.get(filmUrl)
                .then((filmResponse: any) => filmResponse);
            });

            // Replace film URLs with film data
            return Promise.all(filmDataPromises).then((films) => {
              planet.films = films;
            });
          });
          return Promise.all(filmPromises).then(() => uniquePlanets);
        })
        .then((uniquePlanets) => {
          resolve(uniquePlanets);
        })
        .catch((error) => {
          reject(new Error(`Error fetching planets with reptile residents: ${error.message}`));
        });
    });
  }

  function getData(props: getDataProps) {
    setData([])
    setLoading(true);
    getPlanetsWithReptileResidents({ specie: props.specie })
      .then((planets: any) => {
        console.log('planets:', planets);
        setData(planets);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  // Example usage
  useEffect(() => {
    getData({ specie: spiece })
  }, [spiece])

  console.log(data);

  return (
    <main className="flex w-full min-h-screen flex-col items-center gap-8 p-4 min[800px]:p-24 max[800px]:p-4">
      <h2>manual / FETCH DATA / auto</h2>
      <div className="flex row justify-cenetr items-center gap-4">
        <Switch checked={checked} setChecked={setStatus} />
      </div>
      <div className="flex row justify-cenetr items-center gap-4">
        <Button bg={spiece === 'mammal'} name="mammal" onClick={() => { setSpiece('mammal') }} />
        <Button bg={spiece === 'reptile'} name="reptile" onClick={() => { setSpiece('reptile') }} />
        <Button bg={spiece === 'amphibian'} name="amphibian" onClick={() => { setSpiece('amphibian') }} />
      </div>
      <div className="mb-32 grid w-full text-center lg:mb-0 lg:w-full gap-6 lg:max-w-5xl lg:text-left">
        <div>
          <div className="flex justify-center items-center">
            {!checked && <button
              className="bg-[#2196F3] text-[black] pr-3 pl-3 pt-1 pb-1 rounded-lg"
              onClick={() => {
                getData({ specie: spiece })
                updateState({ count: state.count + 1 })
              }}
            >
              Get Data {state.count}
            </button>}
          </div>
        </div>
        {data.map((item: any) => {
          return <CardComponent
            created={item.created}
            name={item.name}
            climate={item.climate}
            films={item.films}
            population={item.population}
          />
        })}
        {!loading && data.length === 0 && <div className="flex justify-center"><h2>Not found</h2></div>}
        {loading &&
          <div className="flex w-full">
            <Loading />
          </div>
        }
      </div>
    </main>
  );
}
