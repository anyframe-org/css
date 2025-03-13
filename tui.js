var j = Object.defineProperty;
var R = Object.getOwnPropertySymbols;
var z = Object.prototype.hasOwnProperty, S = Object.prototype.propertyIsEnumerable;
var V = (v, s, e) => s in v ? j(v, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : v[s] = e, W = (v, s) => {
  for (var e in s || (s = {}))
    z.call(s, e) && V(v, e, s[e]);
  if (R)
    for (var e of R(s))
      S.call(s, e) && V(v, e, s[e]);
  return v;
};
class _ {
  constructor({ property: s = {}, values: e = {}, classes: t = {}, aliases: n = {} } = {}) {
    this.property = W({
      moxie: ({ key: r }) => r
    }, s), this.values = e, this.classes = t, this.aliases = n;
  }
  toKebabCase(s) {
    if (/^(webkit|moz|ms|o)[A-Z]/.test(s)) {
      const e = s.match(/^(webkit|moz|ms|o)/);
      if (e) {
        const t = e[0];
        return `-${t}${s.slice(t.length).replace(/[A-Z]/g, (n) => `-${n.toLowerCase()}`)}`;
      }
    }
    return s.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
  }
  escapeCSSSelector(s) {
    return s.replace(/([ #{}.:;?%&,@+*~'"!^$[\]()=>|/])/g, "\\$1");
  }
  getAllClassNames(s) {
    if (!s) return [];
    const e = /* @__PURE__ */ new Set();
    return Object.entries(s).forEach(([t, n]) => {
      n && typeof n == "object" && Object.keys(n).forEach((r) => {
        e.add(r);
      });
    }), Array.from(e);
  }
  getTypePrefixes(s = []) {
    const e = this.property, t = this.classes, n = Object.keys(e);
    if (!t)
      return [...n, ...s].sort((i, l) => l.length - i.length).join("|");
    const c = [...this.getAllClassNames(t)];
    return [...n, ...c, ...s].sort((i, l) => l.length - i.length).join("|");
  }
  generateClassNameRegEx(s) {
    const e = this.getTypePrefixes(s), t = "\\[[^\\]]+\\]", n = "\\([^()]*(?:\\([^()]*\\)[^()]*)*\\)", r = "\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}", c = "(?:([a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+(?:-" + t + ")|" + // Direct bracket, parenthesis, or brace content
    t + "|" + n + "|" + r + "):)?", i = `(${e}|\\[[^\\]]+\\])`, l = "(?:-)?", h = "(-?(?:\\d+(?:\\.\\d+)?)|(?:[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*(?:-[a-zA-Z0-9_]+)*)|(?:#[0-9a-fA-F]+)|" + // Hex colors
    t + "|" + // Bracket content
    r + "|" + // Curly brace content
    n + "|(?:\\$[^\\s\\/]+))", p = "([a-zA-Z%]*)", a = "(?:\\/(-?(?:\\d+(?:\\.\\d+)?)|(?:[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*(?:-[a-zA-Z0-9_]+)*)|(?:#[0-9a-fA-F]+)|" + t + "|" + r + "|" + n + "|(?:\\$[^\\s\\/]+))([a-zA-Z%]*))?";
    return new RegExp(
      c + i + l + h + p + a
    );
  }
  parse(s, e) {
    if (Object.values(this.classes).some((f) => f == null ? void 0 : f[s]))
      return [void 0, s, "", "", void 0, void 0];
    const t = this.generateClassNameRegEx(e), n = (s + "-dummy").match(t);
    if (!n) return null;
    const [, r, c, i, l, h, p] = n, a = i === "dummy" ? "" : i.replace("-dummy", "");
    return [r, c, a, l || "", h, p];
  }
  // unique value parser
  processValue(s, e, t) {
    if (!s) return "";
    const n = (r) => r.replace(/\{([^}]+)\}/g, (c, i) => {
      const l = this.values, h = l !== null ? typeof l[t] == "object" ? l[t][i] : l[i] : void 0;
      return typeof h == "string" ? h : c;
    });
    if (typeof this.values == "object" && this.values !== null && (this.values[t] && typeof this.values[t] == "object" && this.values[t][s] || this.values[s]))
      return typeof this.values[t] == "object" && this.values[t] !== null ? this.values[t][s] : this.values[s];
    if (s.startsWith("$"))
      return `var(--${s.slice(1)})`;
    if (s.startsWith("[") && s.endsWith("]") || s.startsWith("(") && s.endsWith(")")) {
      const r = s.slice(1, -1).replace(/_/g, " ");
      return r.includes("{") ? n(r) : r.startsWith("--") ? `var(${r})` : r;
    }
    return s + (e || "");
  }
  processShorthand(s = "", e = "", t = "", n, r = "", c = "", i = !0) {
    const l = this.property[s], h = /^(?:\(|\[)([^:]+):(.+)(?:\)|\])$/;
    let p = null, a = e || "";
    const f = a.match(h);
    f && (p = f[1].trim(), a = f[2].trim());
    let y;
    e.includes(p + ":") ? y = e.startsWith("(") ? `(${a})` : `[${a}]` : y = e;
    const o = this.processValue(y, t, s), $ = this.processValue(r, c, s);
    if (s.startsWith("[") && s.endsWith("]")) {
      const C = s.slice(1, -1).split(",").map((m) => m.trim()).map((m) => {
        const u = this.property[m] || m;
        return `${typeof u == "string" && u.startsWith("--") ? String(u) : this.toKebabCase(String(u))}: ${o}`;
      }).join("; ");
      return {
        className: `${`[${s.slice(1, -1)}]${i ? "-" : ""}${e}${t}`}`,
        cssRules: C,
        // return css rules directly
        value: null,
        // and set value to null to prevent value duplication
        prefix: n
      };
    }
    if (l) {
      if (typeof l == "object" && "property" in l && "value" in l) {
        const C = l.group || s, m = this.values[C][o] ? this.values[C][o] : t ? e : o, u = typeof l.property == "function" ? l.property({
          value: m,
          unit: t,
          secondValue: c ? r : $,
          secondUnit: c,
          key: p
        }) : l.property, g = l.value;
        let A;
        if (typeof g == "function")
          A = g({
            value: m,
            unit: t,
            secondValue: c ? r : $,
            secondUnit: c,
            key: p,
            property: u
          });
        else if (g && typeof g == "string") {
          const x = this.processValue(y, t, C);
          A = this.values[y] || this.values[C][y] || y.includes("{") || g.includes("{") ? this.parseValuePattern(C, g, x, "", $, "") : o;
        } else A = null;
        return {
          className: `${s}${e ? `${i && i ? "-" : ""}${e}${t}` : ""}${r ? `/${r}${c}` : ""}`,
          cssRules: Array.isArray(u) || typeof u == "string" && u.includes(":") ? u : this.toKebabCase(String(u)),
          value: g === null ? null : e.startsWith("[") ? o : A,
          prefix: n
        };
      }
      const d = typeof l == "function" ? l({
        value: t ? e : o,
        unit: t,
        secondValue: c ? r : $,
        secondUnit: c,
        key: p
      }) : l;
      return {
        className: `${s}${e ? (i ? "-" : "") + e + t : ""}`,
        cssRules: Array.isArray(l) ? d : typeof d == "string" && d.startsWith("value:") ? d.slice(6) : this.toKebabCase(String(d)),
        value: typeof d == "string" && d.startsWith("value:") ? null : o,
        prefix: n
      };
    }
    return null;
  }
  parseValuePattern(s, e, t, n, r, c) {
    if (!e.includes("{0}") && !e.includes("{1") && !e.includes("||"))
      return e;
    const [i, l] = e.split("||").map((a) => a.trim()), h = this.processValue(t, n, s), p = this.processValue(r, c, s);
    if (e.includes("{0}") && e.includes("{1") || e.includes("{1")) {
      let a = i;
      if (t && (a = a.replace("{0}", h)), e.includes("{1")) {
        const f = a.match(/{1([^}]*)}/);
        if (e.includes("{1}"))
          r ? a = r.startsWith("[") ? p : a.replace("{1}", p) : a = l;
        else if (f) {
          const y = f[0], o = f[1].trim();
          let $ = p;
          !$ && o.includes("|") ? $ = o.split("|")[1].trim() : $ || ($ = ""), a = t.startsWith("[") ? h : a.replace(y, $);
        }
      }
      return t ? a : l || i;
    } else
      return t ? t.startsWith("[") ? h : i.replace("{0}", h) : l || i;
  }
  getParentClass(s) {
    return Object.keys(this.classes).filter(
      (e) => Object.prototype.hasOwnProperty.call(
        this.classes[e],
        s
      )
    );
  }
  processCustomClass(s, e = "", t = "", n = "", r = "", c = "", i = !0) {
    if (!s) return null;
    const l = this.getParentClass(s);
    if (l.length > 0) {
      const h = l.map((f) => {
        const y = this.classes[f];
        if (!y) return "";
        const o = this.parseValuePattern(
          s,
          y[s] || "",
          e,
          t,
          r,
          c
        );
        return `${this.toKebabCase(String(f))}: ${o}`;
      }).filter(Boolean).join("; "), p = s.slice(-(e + t).length), a = `${s}${e ? `${i ? "-" : ""}${e}${t}` : ""}${r ? `/${r}${c}` : ""}`;
      return {
        className: e === p ? s : a,
        cssRules: h,
        value: null,
        prefix: n
      };
    }
    return null;
  }
  processAlias(s, e = "") {
    const t = this.aliases[s];
    if (!t) return null;
    const n = t.split(" "), r = [];
    return n.forEach((c) => {
      const [i, l] = c.split(":"), h = l || i, p = l ? i : void 0, a = this.parse(c), f = a || [p, h, "", ""];
      if (!f) return;
      const [y, o, $, d, C, m] = f, u = this.processShorthand(o, $, d, void 0, C, m), g = this.processCustomClass(o, $, d, y, C, m);
      if (g) {
        const { cssRules: A } = g;
        r.push(A);
        return;
      }
      if (u) {
        const A = u.value !== null ? `: ${u.value}` : "";
        Array.isArray(u.cssRules) ? u.cssRules.forEach((P) => {
          r.push(`${this.toKebabCase(P)}${A}`);
        }) : r.push(`${u.cssRules}${A}`);
      }
    }), {
      className: s,
      cssRules: r.join("; "),
      value: null,
      prefix: e
    };
  }
  process(s) {
    const e = Array.isArray(s) ? s : s.split(/\s+/), t = [];
    return e.forEach((n) => {
      if (!n) return this;
      const [r, c] = n.split(":"), i = c || r, l = c ? r : void 0, h = this.processAlias(i, l);
      if (h) {
        const { className: P, cssRules: x } = h;
        t.push({
          className: P,
          cssRules: x,
          value: null,
          prefix: l
        });
        return;
      }
      const p = this.parse(n), a = p || [l, i, "", ""];
      if (!a) return this;
      const [f, y, o, $, d, C] = a, m = !n.includes((y || "") + (o || "")), u = this.getParentClass(`${y}${m ? "-" : ""}${o}`).length > 0 ? `${y}${m ? "-" : ""}${o}` : y, g = this.processCustomClass(
        u,
        o,
        $,
        f,
        d,
        C,
        m
      );
      if (g) {
        const { className: P, cssRules: x, prefix: b } = g;
        t.push({
          className: P,
          cssRules: x,
          value: null,
          prefix: b
        });
        return;
      }
      const A = this.processShorthand(y, o, $, f, d, C, m);
      if (A) {
        const { className: P, cssRules: x, value: b, prefix: Z } = A;
        t.push({
          className: P,
          cssRules: x,
          value: b,
          prefix: Z
        });
      }
    }), t;
  }
}
export {
  _ as TenoxUI,
  _ as default
};
//# sourceMappingURL=index.es.js.map
