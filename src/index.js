import { ITwinPlatform, ITwinData, Viewer, Terrain, Cartesian3, HeadingPitchRoll } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

const serviceResponse = await fetch("https://api.cesium.com/itwin/token");
const { access_token: token } = await serviceResponse.json();

ITwinPlatform.defaultAccessToken = token;

// Set up viewer
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
  animation: false,
  sceneModePicker: false,
  geocoder: false,
  homeButton: false,
});
const scene = viewer.scene;
scene.debugShowFramesPerSecond = true;

// Create tilesets using the iModel ids
const surroundingArea = await ITwinData.createTilesetFromIModelId(
  "f856f57d-3d28-4265-9c4f-5e60c0662c15",
);
const station = await ITwinData.createTilesetFromIModelId(
  "669dde67-eb69-4e0b-bcf2-f722eee94746",
);
// Add the tilesets to the viewer
scene.primitives.add(surroundingArea);
scene.primitives.add(station);

// Create tileset of the reality data mesh
const iTwinId = "535a24a3-9b29-4e23-bb5d-9cedb524c743";
const realityMeshId = "85897090-3bcc-470b-bec7-20bb639cc1b9";
const realityMesh = await ITwinData.createTilesetForRealityDataId(
  iTwinId,
  realityMeshId,
);
scene.primitives.add(realityMesh);

const stationView = {
  destination: new Cartesian3(
    1255783.605894154,
    -4732864.394472763,
    4073433.975291202,
  ),
  orientation: new HeadingPitchRoll(
    5.646321670432638,
    -0.4736439399770642,
    0.00001691713303575426,
  ),
  duration: 0
};
viewer.scene.camera.flyTo(stationView);
