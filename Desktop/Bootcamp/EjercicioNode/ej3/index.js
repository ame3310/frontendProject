import { esPar } from "./numeros.js";
import Logger from "logplease";

const logger = Logger.create("utils");
const arrayNums = [2, 3, 101, 201, 202, 100];

arrayNums.forEach((e) => {
  esPar(e) ? logger.info(e + " es par") : logger.error(e + " no es par");
});
