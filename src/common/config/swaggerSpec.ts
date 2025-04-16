import path from "path";
import YAML from "yamljs";
import jsDoc from "swagger-jsdoc";

const swaggerYAML = YAML.load(path.join(__dirname, "spec.yaml"));

const options = {
    definition: swaggerYAML,
    apis: ["../../resources/*/*.controller.ts"],
};

export const swaggerSpec = jsDoc(options);
