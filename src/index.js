import dva from "dva";
import router from "./router";
import feedListModel from "./models/feedList";
import statusListModel from "./models/statusList";
import registerServiceWorker from "./registerServiceWorker";

const app = dva();

app.model(feedListModel);
app.model(statusListModel);

app.router(router);

app.start("#root");

registerServiceWorker();
