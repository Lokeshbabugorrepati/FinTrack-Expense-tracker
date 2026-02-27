import colors from "colors";

export const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toLocaleString();

  let coloredMethod;
  switch (method) {
    case "GET":
      coloredMethod = method.green;
      break;
    case "POST":
      coloredMethod = method.yellow;
      break;
    case "PUT":
      coloredMethod = method.blue;
      break;
    case "DELETE":
      coloredMethod = method.red;
      break;
    default:
      coloredMethod = method;
  }

  console.log(`${coloredMethod} ${url.cyan} - ${timestamp.grey}`);
  next();
};
