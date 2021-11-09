import { Router } from "express";
import { AppointmentController } from "./controllers/AppointmentController";
import { DatabaseController } from "./controllers/DatabaseController";
import { UserController } from "./controllers/UserController";
import { ensureAuthenticated } from "./middleware/EnsureAuthenticate";

const router = Router();

router.get("/init-database", new DatabaseController().handle);

router.post("/authenticate", new UserController().login);

router.post("/register", new UserController().create);
router.put("/user", ensureAuthenticated, new UserController().update);
router.get("/user", ensureAuthenticated, new UserController().get);
router.delete("/user", ensureAuthenticated, new UserController().delete);

router.get(
  "/appointment/list",
  ensureAuthenticated,
  new AppointmentController().listAppointments
);
router.post(
  "/appointment/start",
  ensureAuthenticated,
  new AppointmentController().startAppointment
);
router.get(
  "/appointment/:appointmentId",
  ensureAuthenticated,
  new AppointmentController().getAppointment
);
router.put(
  "/appointment/:appointmentId",
  ensureAuthenticated,
  new AppointmentController().updateAppointment
);
router.delete(
  "/appointment/:appointmentId",
  ensureAuthenticated,
  new AppointmentController().deleteAppointment
);

router.post(
  "/appointment/message",
  ensureAuthenticated,
  new AppointmentController().insertMessage
);
router.delete(
  "/appointment/message/:messageId",
  ensureAuthenticated,
  new AppointmentController().deleteMessage
);

export { router };
