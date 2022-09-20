import { GetGeocodeData } from "../api/geocode";

beforeEach(() => {
  fetch.mockClear();
});

it("did find location", async () => {
  fetch.mockResponseOnce(JSON.stringify({ "results" : [{ "formatted_address" : "1800 Ellis St, San Francisco, CA 94115, USA", "place_id" : "ChIJ4zPXqIiAhYAR31X3S64T6Uw" }], "status" : "OK" }));
  const locationData = await GetGeocodeData(37.785834, -122.406417);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(locationData.status).toEqual(undefined);
});
