export const enum StyleTypes {
  primitive,
  array,
  object,
}

export const enum StyleIn {
  path,
  query,
  cookie,
  header,
}

export class Style {
  name: string;
  types: StyleTypes[];
  in: StyleIn[];

  constructor(name: string, types: StyleTypes[], ins: StyleIn[]) {
    this.name = name;
    this.types = types;
    this.in = ins;
  }
}

export let Styles = {
  matrix: new Style("matrix", [StyleTypes.primitive, StyleTypes.array, StyleTypes.object], [StyleIn.path]),
  label: new Style("label", [StyleTypes.primitive, StyleTypes.array, StyleTypes.object], [StyleIn.path]),
  form: new Style("form", [StyleTypes.primitive, StyleTypes.array, StyleTypes.object], [StyleIn.query, StyleIn.cookie]),
  simple: new Style("simple", [StyleTypes.primitive, StyleTypes.array, StyleTypes.object], [StyleIn.path, StyleIn.header]),
  spaceDelimited: new Style("spaceDelimited", [StyleTypes.array, StyleTypes.object], [StyleIn.query]),
  pipeDelimited: new Style("pipeDelimited", [StyleTypes.array, StyleTypes.object], [StyleIn.query]),
  deepObject: new Style("deepObject", [StyleTypes.object], [StyleIn.query]),
};

export function AllStyles() {
  return Object.values(Styles);
}

export function parseStyle(v: any): Style | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v !== "string") return undefined;
  if (Styles[v]) return Styles[v];
  return undefined;
}
