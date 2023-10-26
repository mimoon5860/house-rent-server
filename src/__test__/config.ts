import App from "../app/app";

const app = new App(8000);

const getApp = () => {
  return app.app;
};

export default getApp;
