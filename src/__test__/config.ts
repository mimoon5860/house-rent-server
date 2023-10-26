import App from "../app/app";

const app = new App(8000);
// app.startServer();

const getApp = () => {
  return app.app;
};

export default getApp;
