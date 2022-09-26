import Optional from "../../Optional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import { parseStyle, Style } from "../values/Styles";
import HeaderObject from "./HeaderObject";
import ReferenceObject from "./ReferenceObject";

export default class EncodingObject {
  $$raw: any;
  contentType: Optional<string>;
  headers: Optional<Map<string, HeaderObject | ReferenceObject>>;
  style: Optional<Style>;
  explode: Optional<boolean>;
  allowReserved: Optional<boolean>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<EncodingObject> {
    if (v === null || v === undefined) return Optional.empty();
    let o = new EncodingObject();
    o.$$raw = v;
    o.contentType = Optional.full(v.contentType);
    o.headers = parseCtxMap(ctx, v.headers, HeaderObject.parse);
    o.style = parseStyle(v.style);
    return Optional.full(o);
  }
}