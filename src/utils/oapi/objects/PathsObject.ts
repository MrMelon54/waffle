import Optional from "../../Optional";
import PathItemObject from "./PathItemObject";
import OpenApiContext from "../utils/OpenApiContext";
import ReferenceObject from "./ReferenceObject";
import { parseCtxMap } from "../utils/ObjectUtils";

export type PathsObject = Map<string, PathItemObject | ReferenceObject>;

export function parsePaths(ctx: OpenApiContext, v: any): Optional<PathsObject> {
  return parseCtxMap(ctx, v, PathItemObject.parse);
}