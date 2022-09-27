import Optional from "../../Optional";
import StaticOptional from "../../StaticOptional";
import { parseCtxMap } from "../utils/ObjectUtils";
import OpenApiContext from "../utils/OpenApiContext";
import MediaTypeObject from "./MediaTypeObject";

export default class RequestBodyObject {
  $$raw: any;
  description: Optional<string>;
  content: Map<string, MediaTypeObject>;
  required: Optional<boolean>;

  private constructor() {}

  static parse(ctx: OpenApiContext, v: any): Optional<RequestBodyObject> {
    if (v === null || v === undefined) return StaticOptional.empty();
    let o = new RequestBodyObject();
    o.$$raw = v;
    o.description = StaticOptional.full(v.description);
    let content = parseCtxMap<string, MediaTypeObject>(ctx, v.content, MediaTypeObject.parse);
    if (content.isEmpty() || content.hasError()) return StaticOptional.emptyWithError(`RequestBodyObject with invalid content: ${content.errorReason() ?? "No reason"}`);
    o.content = content.get();
    o.required = StaticOptional.full(v.required);
    return StaticOptional.full(o);
  }
}
