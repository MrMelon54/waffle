import Optional from "../../Optional";
import { parseArray, parseCtxArray, parseCtxMap, parseMap } from "../utils/ObjectUtils";
import { parseStyle, Style } from "../values/Styles";
import ExampleObject from "./ExampleObject";
import ReferenceObject from "./ReferenceObject";
import SchemaObject from "./SchemaObject";
import MediaTypeObject from "./MediaTypeObject";
import OpenApiContext from "../utils/OpenApiContext";

export default class ParameterObject {
  $$raw: any;
  name: string;
  in: string;
  description: Optional<string>;
  required: Optional<boolean>;
  deprecated: Optional<boolean>;
  allowEmptyValue: Optional<boolean>;

  // Simpler scenarios
  style: Optional<Style>;
  explode: Optional<boolean>;
  allowReserved: Optional<boolean>;
  schema: Optional<SchemaObject>;
  example: Optional<any>;
  examples: Optional<Map<string, ExampleObject | ReferenceObject>>;

  // Complex scenarios
  content: Optional<Map<string, MediaTypeObject>>;

  private constructor() {}

  static parseArray(ctx: OpenApiContext, v: any): Optional<ParameterObject[]> {
    return parseCtxArray(ctx, v, this.parse);
  }

  static parse(ctx: OpenApiContext, v: any): Optional<ParameterObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new ParameterObject();
    o.$$raw = v;
    o.name = v.name;
    o.in = v.in;
    o.description = Optional.full(v.description);
    o.required = Optional.full(v.required);
    o.deprecated = Optional.full(v.deprecated);
    o.allowEmptyValue = Optional.full(v.allowEmptyValue);

    // Simplier scenarios
    o.style = parseStyle(v.style);
    o.explode = Optional.full(v.explode);
    o.allowReserved = Optional.full(v.allowReserved);
    o.schema = SchemaObject.parse(v.schema);
    o.example = Optional.full(v.example);
    o.examples = parseMap(v.examples, ExampleObject.parse);

    // Complex scenarios
    o.content = parseCtxMap(ctx, v.content, MediaTypeObject.parse);
    return Optional.full(o);
  }
}