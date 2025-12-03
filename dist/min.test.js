function e(e, n = "" + gn) {
const t = n.length;
let r = "";
for (let o = 0; e.length > o; o++) {
const l = Reflect.apply(gn, e, [ o ]) ^ Reflect.apply(gn, n, [ o % t ]);
r += yn(l);
}
return r;
}

function n(e, n, t) {
const r = e[n], o = new Proxy(r, t);
An.set(o, r), e[n] = o;
}

function t() {
return xn.game?.[En.k] && null != xn.game?.[En.Y]?.[En.le]?.[En.ke] && xn.game?.initialized;
}

function r(e) {
return Object.keys(xn.game[En.A].teamInfo).find(n => xn.game[En.A].teamInfo[n].playerIds.includes(e.__id));
}

function o(e) {
const n = e[En.ie][En.xe];
return n && Wn[n] ? Wn[n] : null;
}

function l(e) {
return e ? Wn[e.bulletType] : null;
}

function a() {
if (!xn.game?.initialized) return;
const e = Mn.je.ze;
try {
(e => {
e && Mn.je.Ae && xn.game[En.S].layers[3].children.forEach(e => {
e._texture?.textureCacheIds && e._texture.textureCacheIds.some(e => e.includes("ceiling") && !e.includes("map-building-container-ceiling-05") || e.includes("map-snow-")) && (e.visible = !1);
});
})(e), e && xn.game[En.I][En.Ce].forEach(e => {
Mn.je.Oe && (e.sprite._tintRGB = 1), e.sprite.alpha = Mn.je.Pe / 100;
}), (e => {
e && xn.game[En.Ne][En.ye][En.ge].forEach(e => {
[ "tree", "table", "stairs", "bush" ].some(n => e.type.includes(n)) && (e.sprite.alpha = Mn.je.Re / 100);
});
})(e);
} catch {}
}

function i(e) {
if (!bt.Te) return;
const {Le: n, De: t, Ee: r, Ie: o} = e, l = n ?? "idle", a = performance.now();
if (zt(a), "idle" === l) {
_t();
const e = gt(bt.Be), n = bt.Fe ?? gt(e);
if (!o && yt(n, e)) {
const t = Mt(n, e);
bt.We = {
startPos: gt(n),
targetPos: gt(e),
startTime: a,
duration: t
}, St(t);
} else bt.We = null, Ct(null);
bt.Le = "idle", bt.He = null;
} else {
_t();
const e = t ? {
x: t.x,
y: t.y
} : gt(bt.Be), n = bt.Fe ?? gt(bt.Be), r = yt(e, bt.He);
l !== bt.Le || r ? (bt.We = {
startPos: gt(n),
targetPos: gt(e),
startTime: a,
duration: o ? 0 : Mt(n, e)
}, bt.He = gt(e)) : bt.We && (bt.We.targetPos = gt(e)), bt.Le = l;
}
const i = vt(r);
((e, n) => !((e || n) && (!e || !n || e.touchMoveActive !== n.touchMoveActive || Math.abs(e.touchMoveLen - n.touchMoveLen) > mt || Math.abs(e.x - n.x) > mt || Math.abs(e.y - n.y) > mt)))(i, bt.Ke) || (bt.$e = {
startDir: vt(bt.qe),
targetDir: i,
startTime: a,
duration: bt.We?.duration ?? 195
}, bt.Ke = i), zt(a);
}

function c(e) {
const n = xn.game[En.Y], t = r(e) === r(n);
Reflect.defineProperty(e.nameText, "visible", {
get: () => Mn.Ue.Ge && Mn.Ue.ze,
set() {}
}), e.nameText.visible = !0, e.nameText.tint = t ? 13360629 : 16721960, e.nameText.style.fill = t ? "#3a88f4" : "#ff2828", 
e.nameText.style.fontSize = 20, e.nameText.style.dropShadowBlur = .1;
}

function s() {
try {
const e = xn.game[En.Y], n = xn.game[En.A].playerPool[En.ge];
if (!(xn.pixi && e && e.container && xn.game?.initialized)) return;
const t = Vt(e.container, "playerLines");
t.clear(), Mn.Ue.ze && Mn.Ue.Ve && ((e, n, t) => {
const o = e[En.se].x, l = e[En.se].y, a = r(e), i = qt(e.layer), c = Gt(e);
n.forEach(n => {
if (!n.active || n[En.ie][En.Me] || e.__id === n.__id) return;
const s = r(n), d = Kt(n.layer, c, i);
t.lineStyle(2, s === a ? Lt : d && !n.downed ? Dt : Et, .45), t.moveTo(0, 0), t.lineTo(16 * (n[En.se].x - o), 16 * (l - n[En.se].y));
});
})(e, n, t);
const a = Vt(e.container, "grenadeDangerZones");
a.clear(), Mn.Ue.ze && Mn.Ue.Ze.Ye && ((e, n) => {
const t = e[En.se].x, r = e[En.se].y, o = qt(e.layer), l = Gt(e), a = xn.game?.[En.G]?.[En.Se];
a && Object.values(a).filter(e => 9 === e.__type && "smoke" !== e.type || e.smokeEmitter && e.explodeParticle).forEach(e => {
const a = Kt(e.layer, l, o);
n.beginFill(a ? Dt : Et, a ? .1 : .2), n.drawCircle(16 * (e.pos.x - t), 16 * (r - e.pos.y), 208), 
n.endFill(), n.lineStyle(2, 0, .2), n.drawCircle(16 * (e.pos.x - t), 16 * (r - e.pos.y), 208);
});
})(e, a);
const i = Vt(e.container, "grenadeTrajectory");
i.clear(), Mn.Ue.ze && Mn.Ue.Ze.Je && ((e, n) => {
if (3 !== e[En.le][En.ke]) return;
const t = e[En.ie][En.xe];
if (!t) return;
const r = xn.game, o = e[En.se].x, l = e[En.se].y;
let a, i;
const c = r[En.H].spectating, s = r[En.M].shotDetected || r[En.ne].isBindDown(In), d = c ? null : At();
if (d) {
const e = r[En.C][En._e]({
x: o,
y: l
}), n = d.x - e.x, t = d.y - e.y, c = Math.sqrt(n * n + t * t);
a = n / c, i = t / c;
} else if (c || kn.Xe && s) if (!c && kn.Xe) {
const e = r[En.C][En._e]({
x: o,
y: l
}), n = kn.Xe.clientX - e.x, t = kn.Xe.clientY - e.y, c = Math.sqrt(n * n + t * t);
a = n / c, i = t / c;
} else a = e[En.he].x, i = e[En.he].y; else {
const e = r[En.te].mousePos._x - an.innerWidth / 2, n = r[En.te].mousePos._y - an.innerHeight / 2, t = Math.sqrt(e * e + n * n);
a = e / t, i = n / t;
}
const u = .03489949670250097 * a + .9993908270190958 * i;
a = .9993908270190958 * a - .03489949670250097 * i, i = u;
const h = Math.min(Math.max(wn.Qe, 0), 32.4) / 15 * (t.includes("smoke") ? 11 : 15), f = o + a * h, m = l - i * h;
let p = It;
t.includes("smoke") ? p = Wt : t.includes("frag") ? p = Ft : t.includes("mirv") ? p = Bt : t.includes("martyr") && (p = $t), 
n.lineStyle(3, p, .7), n.moveTo(0, 0), n.lineTo(16 * (f - o), 16 * (l - m));
const b = t.replace("_cook", ""), g = Wn[b]?.explosionType;
if (g && Wn[g]) {
const e = 16 * (Wn[g].rad.max + 1);
n.beginFill(p, .2), n.drawCircle(16 * (f - o), 16 * (l - m), e), n.endFill(), n.lineStyle(2, p, .4), 
n.drawCircle(16 * (f - o), 16 * (l - m), e);
}
})(e, i);
const s = Vt(e.container, "flashlights");
s.clear(), Mn.Ue.ze && (Mn.Ue.et.h || Mn.Ue.et.tt) && ((e, n, t) => {
const a = o(e), i = l(a), c = qt(e.layer), s = Gt(e);
Mn.Ue.et.tt && Ut(e, e, i, a, t), Mn.Ue.et.h && n.filter(n => !(!n.active || n[En.ie][En.Me] || e.__id === n.__id || !Kt(n.layer, s, c) || !n.container.worldVisible || r(n) === r(e))).forEach(n => {
const r = o(n), a = l(r);
Ut(e, n, a, r, t, 0, .05);
});
})(e, n, s);
const d = Vt(e.container, "bulletTrajectory");
d.clear(), Mn.Ue.ze && Mn.Ue.et.Je && ((e, n) => {
const t = o(e), r = l(t);
if (!r || !t) return;
const a = xn.game, i = e[En.se], c = a[En.H].spectating, s = a[En.M].shotDetected || a[En.ne].isBindDown(In);
let d;
const u = c ? null : At();
if (u) {
const e = a[En.C][En._e]({
x: i.x,
y: i.y
});
d = Math.atan2(e.y - u.y, e.x - u.x) - Math.PI;
} else if (c || kn.Xe && s) if (!c && kn.Xe) {
const e = a[En.C][En._e]({
x: i.x,
y: i.y
});
d = Math.atan2(e.y - kn.Xe.clientY, e.x - kn.Xe.clientX) - Math.PI;
} else d = Math.atan2(e[En.he].x, e[En.he].y) - Math.PI / 2; else d = Math.atan2(a[En.te].mousePos._y - an.innerHeight / 2, a[En.te].mousePos._x - an.innerWidth / 2);
const h = it.nt(Math.cos(d), -Math.sin(d)), f = Tt(i, h, t), m = a?.[En.G]?.[En.Se], p = Xn && void 0 !== Qn ? Qn : e.layer;
let b = null;
if (m) {
const e = Object.values(m).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !ht(e.layer, p) || e?.type.includes("decal")));
let n = 1 / 0;
for (const t of e) {
if (!1 === t.collidable) continue;
const e = ut.rt(t.collider, i, f);
if (e) {
const t = it.ot(it.it(e.point, i));
n > t && (n = t, b = it.lt(e.point, it.ct(e.normal, .01)));
}
}
}
const g = ((e, n, t, r, o, l = 3) => {
const a = [];
let i = it.st(e), c = it.dt(n), s = t, d = 0;
const u = xn.game, h = u?.[En.G]?.[En.Se];
if (!h) return a;
const f = Xn && void 0 !== Qn ? Qn : r, m = Object.values(h).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !ht(e.layer, f) || e?.type.includes("decal") || e?.type.includes("decal"))), p = u?.[En.A], b = p?.playerPool?.[En.ge], g = En.ee, y = g ? u?.[g] : null, v = y?.player?.radius ?? 1, k = [];
if (Array.isArray(b)) for (const e of b) {
if (!e || !e.active) continue;
if (e.__id === o.__id) continue;
const n = e[En.ie];
if (!n) continue;
if (n[En.Me]) continue;
const t = e.layer ?? n.m_layer ?? 0;
if (!(ht(t, f) || 2 & t)) continue;
const r = e[En.se] ?? e.m_pos;
if (!r) continue;
const l = "number" == typeof e.m_rad ? e.m_rad : "number" == typeof e.rad ? e.rad : v * ("number" == typeof n.m_scale ? n.m_scale : "number" == typeof n.scale ? n.scale : 1);
l > 0 && k.push({
pos: {
x: r.x,
y: r.y
},
rad: l
});
}
for (;l >= d && s > .1; ) {
const e = it.lt(i, it.ct(c, s));
let n = null, t = 1 / 0, r = null, o = null;
for (const l of m) {
if (!1 === l.collidable) continue;
const a = ut.rt(l.collider, i, e);
if (a) {
const e = it.ot(it.it(a.point, i));
t > e && e > 1e-4 && (t = e, n = a, r = l, o = "obstacle");
}
}
for (const l of k) {
const a = ut.ut(i, e, l.pos, l.rad);
if (a) {
const e = it.ot(it.it(a.point, i));
t > e && e > 1e-4 && (t = e, n = a, r = null, o = "player");
}
}
if (!n) {
a.push({
start: it.st(i),
end: e,
hitPlayer: !1
});
break;
}
{
if (a.push({
start: it.st(i),
end: it.st(n.point),
hitPlayer: "player" === o
}), "player" === o) break;
const e = r?.type;
let u = !1;
if (u = r && void 0 !== r.reflectBullets ? !0 === r.reflectBullets : [ "metal_wall", "stone_wall", "container_wall", "hedgehog", "bollard", "airdop", "silo", "collider", "warehouse_wall" ].some(n => e?.includes(n)), 
!u || d >= l) break;
{
const e = it.ht(c, n.normal);
c = it.lt(it.ct(n.normal, -2 * e), c), c = it.dt(c), i = it.lt(n.point, it.ct(c, .01)), 
s = Math.max(1, s - Math.sqrt(t)) / 1.5, d++;
}
}
}
return a;
})(b || f, h, r.distance, e.layer, e), y = g.some(e => e.hitPlayer);
n.lineStyle(y ? 2 : 1, y ? Dt : 16711935, .5);
for (const e of g) {
const t = {
x: 16 * (e.start.x - i.x),
y: 16 * (i.y - e.start.y)
}, r = {
x: 16 * (e.end.x - i.x),
y: 16 * (i.y - e.end.y)
};
n.moveTo(t.x, t.y), n.lineTo(r.x, r.y);
}
})(e, d), n.forEach(c);
} catch {}
}

function d(e, n, t, r) {
return (e - t) ** 2 + (n - r) ** 2;
}

function u() {
try {
const a = xn.game;
if (!a.initialized || !Mn.ft.ze && !Mn.gt.ze || a[En.H].spectating) return i(new ft("idle")), 
Pt(), void (ir.bt = null);
const c = a[En.A].playerPool[En.ge], s = a[En.Y], u = ar(s.layer);
let h = !1, f = null, m = null, p = !1;
try {
const b = a[En.Y][En.le][En.ke], g = 2 === b, y = 3 === b, v = a[En.ne].isBindDown(In), k = Mn.gt.ze && v;
let w = ir.yt;
k ? w && w.active && !w[En.ie][En.Me] || (w = ((e, n) => {
const t = r(n), o = ar(n.layer), l = dr(n);
let a = null, i = 1 / 0;
for (const c of e) {
if (!c.active) continue;
if (c[En.ie][En.Me]) continue;
if (!Mn.ft._t && c.downed) continue;
if (n.__id === c.__id) continue;
if (!ur(c.layer, l, o)) continue;
if (r(c) === t) continue;
const e = n[En.ue], s = c[En.ue], u = d(e.x, e.y, s.x, s.y);
i > u && (i = u, a = c);
}
return a;
})(c, s), ir.yt = w) : (w = null, ir.yt = null);
let x = 1 / 0;
if (w) {
const e = s[En.ue], n = w[En.ue];
x = Math.hypot(e.x - n.x, e.y - n.y);
}
const M = 5.5 >= x;
if (k && g && M && w) {
const e = s[En.ue], n = w[En.ue], t = o(s), r = l(t);
if (!Mn.ft.vt || pr(s, w, t, r)) {
const t = ((e, n) => Math.atan2(n.y - e.y, n.x - e.x))(n, e) + Math.PI, r = {
touchMoveActive: !0,
touchMoveLen: 255,
x: Math.cos(t),
y: Math.sin(t)
}, o = a[En.C][En._e]({
x: n.x,
y: n.y
});
return i(new ft("meleeLock", {
x: o.x,
y: o.y
}, r, !0)), h = !0, Pt(), void (ir.bt = null);
}
}
if (k && !M && (ir.yt = null), !Mn.ft.ze || g || y) return i(new ft("idle")), Pt(), 
void (ir.bt = null);
const C = v;
let _ = ir.kt?.active && !ir.kt[En.ie][En.Me] ? ir.kt : null;
if (_) {
const e = dr(s);
ur(_.layer, e, u) || (_ = null, ir.kt = null, i(new ft("idle", null, null, !0)));
}
if (_ || (ir.kt && (ir.kt = null, i(new ft("idle", null, null, !0))), _ = ((e, n) => {
const t = r(n), o = ar(n.layer), l = dr(n);
let a = null, i = 1 / 0;
const c = Mn.ft.wt ** 2;
for (const s of e) {
if (!s.active) continue;
if (s[En.ie][En.Me]) continue;
if (!Mn.ft._t && s.downed) continue;
if (n.__id === s.__id) continue;
if (!ur(s.layer, l, o)) continue;
if (r(s) === t) continue;
const e = xn.game[En.C][En._e]({
x: s[En.ue].x,
y: s[En.ue].y
}), u = d(e.x, e.y, xn.game[En.te].mousePos._x, xn.game[En.te].mousePos._y);
u > c || i > u && (i = u, a = s);
}
return a;
})(c, s), ir.xt = _), _) {
const r = s[En.ue], a = _[En.ue], c = Math.hypot(r.x - a.x, r.y - a.y);
_ === ir.xt || ir.kt || (ir.xt = _, ir.Mt[_.__id] = [], ir.Ct[_.__id] = []);
const d = ((e, n) => {
if (!e || !n) return null;
const t = e[En.ue], r = n[En.ue], a = performance.now(), i = e.__id, c = (() => {
if (0 == xn.game.pings.length) return jt ?? 0;
let e = Reflect.apply([].slice, xn.game.pings, [ -5 ]), n = e.reduce((e, n) => e + n);
return jt = n / e.length / 1e3, jt;
})() / 2, s = ir.Mt[i] ?? (ir.Mt[i] = []);
if (s.push([ a, {
...t
} ]), s.length > 30 && s.shift(), 5 > s.length) return xn.game[En.C][En._e]({
x: t.x,
y: t.y
});
const d = (a - s[0][0]) / 1e3, u = (t.x - s[s.length - 2][1].x) / ((a - s[s.length - 2][0]) / 1e3), h = (t.y - s[s.length - 2][1].y) / ((a - s[s.length - 2][0]) / 1e3), f = (t.x - s[0][1].x) / d, m = (t.y - s[0][1].y) / d;
let p = 0;
for (let e = 2; s.length > e; e++) 0 > (s[e][1].x - s[e - 1][1].x) * (s[e - 1][1].x - s[e - 2][1].x) + (s[e][1].y - s[e - 1][1].y) * (s[e - 1][1].y - s[e - 2][1].y) && p++;
const b = p > .3 * s.length, g = {
x: b ? .9 * u + .1 * f : .7 * u + .3 * f,
y: b ? .9 * h + .1 * m : .7 * h + .3 * m
}, y = l(o(n)), v = y?.speed || 1e3, {x: k, y: w} = g, x = t.x - r.x, M = t.y - r.y, C = v ** 2 - k ** 2 - w ** 2, _ = -2 * (k * x + w * M), S = -(x ** 2) - M ** 2;
let z;
const N = Math.hypot(x, M) > 40, j = c * (N ? 1.5 : 1.3);
if (1e-6 > Math.abs(C)) z = -S / _ + j; else {
const e = _ ** 2 - 4 * C * S;
if (0 > e) return xn.game[En.C][En._e]({
x: t.x,
y: t.y
});
const n = Math.sqrt(e), r = (-_ - n) / (2 * C), o = (-_ + n) / (2 * C);
if (z = (Math.min(r, o) > 0 ? Math.min(r, o) : Math.max(r, o)) + j, 0 > z || z > 5) return xn.game[En.C][En._e]({
x: t.x,
y: t.y
});
}
const A = Math.hypot(g.x, g.y);
let O = 1;
return O = b ? .7 : N ? A > 5 ? 1.35 : 1.15 : A > 5 ? 1.2 : 1.05, xn.game[En.C][En._e]({
x: t.x + k * z * O,
y: t.y + w * z * O
});
})(_, s);
if (!d) return i(new ft("idle")), Pt(), void (ir.bt = null);
m = {
x: d.x,
y: d.y
};
const u = o(s), b = l(u), g = !Mn.ft.vt || pr(s, _, u, b);
if (C && (Mn.ft.ze || Mn.gt.ze && 8 >= c)) if (g) {
const r = At(), o = .7 * Mn.ft.St > 0 && (e = r, !!(n = d) && (!e || Math.hypot(n.x - e.x, n.y - e.y) > 4 || Math.abs((t = sr(n) - sr(e), 
Math.atan2(Math.sin(t), Math.cos(t)))) > cr));
i(new ft("aimbot", {
x: d.x,
y: d.y
}, null, !o)), ir.bt = {
x: d.x,
y: d.y
}, h = !0;
const l = kn.Xe;
f = l ? {
x: l.clientX,
y: l.clientY
} : {
x: d.x,
y: d.y
}, p = !0;
} else f = {
x: d.x,
y: d.y
}, p = !1; else f = {
x: d.x,
y: d.y
}, p = g;
} else m = null, f = null, ir.bt = null;
h || (i(new ft("idle")), ir.bt = m ? {
x: m.x,
y: m.y
} : null);
let S = f;
!S && m && (S = {
x: m.x,
y: m.y
}), Rt(S, p, !!ir.kt);
} catch (e) {
Pt(), i(new ft("idle", null, null, !0)), ir.yt = null, ir.kt = null, ir.xt = null, 
ir.bt = null;
}
} catch (e) {
i(new ft({
mode: "idle",
immediate: !0
})), ir.bt = null;
}
var e, n, t;
}

function h() {}

function m(e, n) {
for (var t in n) e[t] = n[t];
return e;
}

function p(e) {
e && e.parentNode && e.parentNode.removeChild(e);
}

function b(e, n, t) {
var r, o, l, a = {};
for (l in n) "key" == l ? r = n[l] : "ref" == l ? o = n[l] : a[l] = n[l];
if (arguments.length > 2 && (a.children = arguments.length > 3 ? he.call(arguments, 2) : t), 
"function" == typeof e && null != e.Nt) for (l in e.Nt) void 0 === a[l] && (a[l] = e.Nt[l]);
return g(e, a, r, o, null);
}

function g(e, n, t, r, o) {
var l = {
type: e,
zt: n,
key: t,
ref: r,
jt: null,
At: null,
Ot: 0,
Pt: null,
Rt: null,
constructor: void 0,
Tt: o ?? ++me,
Lt: -1,
Dt: 0
};
return null == o && null != fe.Et && fe.Et(l), l;
}

function y(e) {
return e.children;
}

function v(e, n) {
this.zt = e, this.context = n;
}

function k(e, n) {
if (null == n) return e.At ? k(e.At, e.Lt + 1) : null;
for (var t; e.jt.length > n; n++) if (null != (t = e.jt[n]) && null != t.Pt) return t.Pt;
return "function" == typeof e.type ? k(e) : null;
}

function w(e) {
var n, t;
if (null != (e = e.At) && null != e.Rt) {
for (e.Pt = e.Rt.base = null, n = 0; e.jt.length > n; n++) if (null != (t = e.jt[n]) && null != t.Pt) {
e.Pt = e.Rt.base = t.Pt;
break;
}
return w(e);
}
}

function x(e) {
(!e.It && (e.It = !0) && pe.push(e) && !M.Bt++ || be != fe.Ft) && ((be = fe.Ft) || ge)(M);
}

function M() {
for (var e, n, t, r, o, l, a, i = 1; pe.length; ) pe.length > i && pe.sort(ye), 
e = pe.shift(), i = pe.length, e.It && (t = void 0, r = void 0, o = (r = (n = e).Tt).Pt, 
l = [], a = [], n.Wt && ((t = m({}, r)).Tt = r.Tt + 1, fe.Et && fe.Et(t), O(n.Wt, t, r, n.Ht, n.Wt.namespaceURI, 32 & r.Dt ? [ o ] : null, l, o ?? k(r), !!(32 & r.Dt), a), 
t.Tt = r.Tt, t.At.jt[t.Lt] = t, P(l, t, a), r.Pt = r.At = null, t.Pt != o && w(t)));
M.Bt = 0;
}

function C(e, n, t, r, o, l, a, i, c, s, d) {
var u, h, f, m, p, b, v, w = r && r.jt || Ce, x = n.length;
for (c = ((e, n, t, r, o) => {
var l, a, i, c, s, d = t.length, u = d, h = 0;
for (e.jt = Array(o), l = 0; o > l; l++) null != (a = n[l]) && "boolean" != typeof a && "function" != typeof a ? (c = l + h, 
(a = e.jt[l] = "string" == typeof a || "number" == typeof a || "bigint" == typeof a || a.constructor == String ? g(null, a, null, null, null) : Se(a) ? g(y, {
children: a
}, null, null, null) : null == a.constructor && a.Ot > 0 ? g(a.type, a.zt, a.key, a.ref ? a.ref : null, a.Tt) : a).At = e, 
a.Ot = e.Ot + 1, i = null, -1 != (s = a.Lt = z(a, t, c, u)) && (u--, (i = t[s]) && (i.Dt |= 2)), 
null == i || null == i.Tt ? (-1 == s && (o > d ? h-- : d > o && h++), "function" != typeof a.type && (a.Dt |= 4)) : s != c && (s == c - 1 ? h-- : s == c + 1 ? h++ : (s > c ? h-- : h++, 
a.Dt |= 4))) : e.jt[l] = null;
if (u) for (l = 0; d > l; l++) null != (i = t[l]) && !(2 & i.Dt) && (i.Pt == r && (r = k(i)), 
E(i, i));
return r;
})(t, n, w, c, x), u = 0; x > u; u++) null != (f = t.jt[u]) && (h = -1 == f.Lt ? Me : w[f.Lt] || Me, 
f.Lt = u, b = O(e, f, h, o, l, a, i, c, s, d), m = f.Pt, f.ref && h.ref != f.ref && (h.ref && D(h.ref, null, f), 
d.push(f.ref, f.Rt || m, f)), null == p && null != m && (p = m), (v = !!(4 & f.Dt)) || h.jt === f.jt ? c = _(f, c, e, v) : "function" == typeof f.type && void 0 !== b ? c = b : m && (c = m.nextSibling), 
f.Dt &= -7);
return t.Pt = p, c;
}

function _(e, n, t, r) {
var o, l;
if ("function" == typeof e.type) {
for (o = e.jt, l = 0; o && o.length > l; l++) o[l] && (o[l].At = e, n = _(o[l], n, t, r));
return n;
}
e.Pt != n && (r && (n && e.type && !n.parentNode && (n = k(e)), t.insertBefore(e.Pt, n || null)), 
n = e.Pt);
do {
n = n && n.nextSibling;
} while (null != n && 8 == n.nodeType);
return n;
}

function S(e, n) {
return n = n || [], null == e || "boolean" == typeof e || (Se(e) ? e.some(e => {
S(e, n);
}) : n.push(e)), n;
}

function z(e, n, t, r) {
var o, l, a, i = e.key, c = e.type, s = n[t], d = null != s && !(2 & s.Dt);
if (null === s && null == e.key || d && i == s.key && c == s.type) return t;
if (r > (d ? 1 : 0)) for (o = t - 1, l = t + 1; o >= 0 || n.length > l; ) if (null != (s = n[a = 0 > o ? l++ : o--]) && !(2 & s.Dt) && i == s.key && c == s.type) return a;
return -1;
}

function N(e, n, t) {
"-" == n[0] ? e.setProperty(n, t ?? "") : e[n] = null == t ? "" : "number" != typeof t || _e.test(n) ? t : t + "px";
}

function j(e, n, t, r, o) {
var l, a;
e: if ("style" == n) if ("string" == typeof t) e.style.cssText = t; else {
if ("string" == typeof r && (e.style.cssText = r = ""), r) for (n in r) t && n in t || N(e.style, n, "");
if (t) for (n in t) r && t[n] == r[n] || N(e.style, n, t[n]);
} else if ("o" == n[0] && "n" == n[1]) l = n != (n = n.replace(ve, "$1")), a = n.toLowerCase(), 
n = a in e || "onFocusOut" == n || "onFocusIn" == n ? a.slice(2) : n.slice(2), e.l || (e.l = {}), 
e.l[n + l] = t, t ? r ? t.u = r.u : (t.u = ke, e.addEventListener(n, l ? xe : we, l)) : e.removeEventListener(n, l ? xe : we, l); else {
if ("http://www.w3.org/2000/svg" == o) n = n.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("width" != n && "height" != n && "href" != n && "list" != n && "form" != n && "tabIndex" != n && "download" != n && "rowSpan" != n && "colSpan" != n && "role" != n && "popover" != n && n in e) try {
e[n] = t ?? "";
break e;
} catch (e) {}
"function" == typeof t || (null == t || !1 === t && "-" != n[4] ? e.removeAttribute(n) : e.setAttribute(n, "popover" == n && 1 == t ? "" : t));
}
}

function A(e) {
return function(n) {
if (this.l) {
var t = this.l[n.type + e];
if (null == n.t) n.t = ke++; else if (t.u > n.t) return;
return t(fe.event ? fe.event(n) : n);
}
};
}

function O(e, n, t, r, o, l, a, i, c, s) {
var d, u, h, f, b, g, k, w, x, M, _, S, z, N, j, A, O, P = n.type;
if (null != n.constructor) return null;
128 & t.Dt && (c = !!(32 & t.Dt), l = [ i = n.Pt = t.Pt ]), (d = fe.Ot) && d(n);
e: if ("function" == typeof P) try {
if (w = n.zt, x = "prototype" in P && P.prototype.render, M = (d = P.contextType) && r[d.Rt], 
_ = d ? M ? M.zt.value : d.At : r, t.Rt ? k = (u = n.Rt = t.Rt).At = u.Kt : (x ? n.Rt = u = new P(w, _) : (n.Rt = u = new v(w, _), 
u.constructor = P, u.render = I), M && M.sub(u), u.zt = w, u.state || (u.state = {}), 
u.context = _, u.Ht = r, h = u.It = !0, u.$t = [], u._sb = []), x && null == u.qt && (u.qt = u.state), 
x && null != P.Gt && (u.qt == u.state && (u.qt = m({}, u.qt)), m(u.qt, P.Gt(w, u.qt))), 
f = u.zt, b = u.state, u.Tt = n, h) x && null == P.Gt && null != u.Ut && u.Ut(), 
x && null != u.Vt && u.$t.push(u.Vt); else {
if (x && null == P.Gt && w !== f && null != u.Yt && u.Yt(w, _), !u.Pt && null != u.Zt && !1 === u.Zt(w, u.qt, _) || n.Tt == t.Tt) {
for (n.Tt != t.Tt && (u.zt = w, u.state = u.qt, u.It = !1), n.Pt = t.Pt, n.jt = t.jt, 
n.jt.some(e => {
e && (e.At = n);
}), S = 0; u._sb.length > S; S++) u.$t.push(u._sb[S]);
u._sb = [], u.$t.length && a.push(u);
break e;
}
null != u.Jt && u.Jt(w, u.qt, _), x && null != u.Xt && u.$t.push(() => {
u.Xt(f, b, g);
});
}
if (u.context = _, u.zt = w, u.Wt = e, u.Pt = !1, z = fe.Bt, N = 0, x) {
for (u.state = u.qt, u.It = !1, z && z(n), d = u.render(u.zt, u.state, u.context), 
j = 0; u._sb.length > j; j++) u.$t.push(u._sb[j]);
u._sb = [];
} else do {
u.It = !1, z && z(n), d = u.render(u.zt, u.state, u.context), u.state = u.qt;
} while (u.It && 25 > ++N);
u.state = u.qt, null != u.Qt && (r = m(m({}, r), u.Qt())), x && !h && null != u.en && (g = u.en(f, b)), 
A = d, null != d && d.type === y && null == d.key && (A = T(d.zt.children)), i = C(e, Se(A) ? A : [ A ], n, t, r, o, l, a, i, c, s), 
u.base = n.Pt, n.Dt &= -161, u.$t.length && a.push(u), k && (u.Kt = u.At = null);
} catch (e) {
if (n.Tt = null, c || null != l) if (e.then) {
for (n.Dt |= c ? 160 : 128; i && 8 == i.nodeType && i.nextSibling; ) i = i.nextSibling;
l[l.indexOf(i)] = null, n.Pt = i;
} else {
for (O = l.length; O--; ) p(l[O]);
R(n);
} else n.Pt = t.Pt, n.jt = t.jt, e.then || R(n);
fe.Pt(e, n, t);
} else null == l && n.Tt == t.Tt ? (n.jt = t.jt, n.Pt = t.Pt) : i = n.Pt = L(t.Pt, n, t, r, o, l, a, c, s);
return (d = fe.tn) && d(n), 128 & n.Dt ? void 0 : i;
}

function R(e) {
e && e.Rt && (e.Rt.Pt = !0), e && e.jt && e.jt.forEach(R);
}

function P(e, n, t) {
for (var r = 0; t.length > r; r++) D(t[r], t[++r], t[++r]);
fe.Rt && fe.Rt(n, e), e.some(n => {
try {
e = n.$t, n.$t = [], e.some(e => {
e.call(n);
});
} catch (e) {
fe.Pt(e, n.Tt);
}
});
}

function T(e) {
return "object" != typeof e || null == e || e.Ot && e.Ot > 0 ? e : Se(e) ? e.map(T) : m({}, e);
}

function L(e, n, t, r, o, l, a, i, c) {
var s, d, u, h, f, m, b, g = t.zt, y = n.zt, v = n.type;
if ("svg" == v ? o = "http://www.w3.org/2000/svg" : "math" == v ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), 
null != l) for (s = 0; l.length > s; s++) if ((f = l[s]) && "setAttribute" in f == !!v && (v ? f.localName == v : 3 == f.nodeType)) {
e = f, l[s] = null;
break;
}
if (null == e) {
if (null == v) return document.createTextNode(y);
e = document.createElementNS(o, v, y.is && y), i && (fe.nn && fe.nn(n, l), i = !1), 
l = null;
}
if (null == v) g === y || i && e.data == y || (e.data = y); else {
if (l = l && he.call(e.childNodes), g = t.zt || Me, !i && null != l) for (g = {}, 
s = 0; e.attributes.length > s; s++) g[(f = e.attributes[s]).name] = f.value;
for (s in g) if (f = g[s], "children" == s) ; else if ("dangerouslySetInnerHTML" == s) u = f; else if (!(s in y)) {
if ("value" == s && "defaultValue" in y || "checked" == s && "defaultChecked" in y) continue;
j(e, s, null, f, o);
}
for (s in y) f = y[s], "children" == s ? h = f : "dangerouslySetInnerHTML" == s ? d = f : "value" == s ? m = f : "checked" == s ? b = f : i && "function" != typeof f || g[s] === f || j(e, s, f, g[s], o);
if (d) i || u && (d.rn == u.rn || d.rn == e.innerHTML) || (e.innerHTML = d.rn), 
n.jt = []; else if (u && (e.innerHTML = ""), C("template" == n.type ? e.content : e, Se(h) ? h : [ h ], n, t, r, "foreignObject" == v ? "http://www.w3.org/1999/xhtml" : o, l, a, l ? l[0] : t.jt && k(t, 0), i, c), 
null != l) for (s = l.length; s--; ) p(l[s]);
i || (s = "value", "progress" == v && null == m ? e.removeAttribute("value") : null != m && (m !== e[s] || "progress" == v && !m || "option" == v && m != g[s]) && j(e, s, m, g[s], o), 
s = "checked", null != b && b != e[s] && j(e, s, b, g[s], o));
}
return e;
}

function D(e, n, t) {
try {
if ("function" == typeof e) {
var r = "function" == typeof e.Dt;
r && e.Dt(), r && null == n || (e.Dt = e(n));
} else e.current = n;
} catch (e) {
fe.Pt(e, t);
}
}

function E(e, n, t) {
var r, o;
if (fe.unmount && fe.unmount(e), (r = e.ref) && (r.current && r.current != e.Pt || D(r, null, n)), 
null != (r = e.Rt)) {
if (r.an) try {
r.an();
} catch (e) {
fe.Pt(e, n);
}
r.base = r.Wt = null;
}
if (r = e.jt) for (o = 0; r.length > o; o++) r[o] && E(r[o], n, t || "function" != typeof e.type);
t || p(e.Pt), e.Rt = e.At = e.Pt = void 0;
}

function I(e, n, t) {
return this.constructor(e, t);
}

function W(e, n, t) {
var r, o, l, a;
n == document && (n = document.documentElement), fe.At && fe.At(e, n), o = (r = "function" == typeof t) ? null : t && t.jt || n.jt, 
l = [], a = [], O(n, e = (!r && t || n).jt = b(y, null, [ e ]), o || Me, Me, n.namespaceURI, !r && t ? [ t ] : o ? null : n.firstChild ? he.call(n.childNodes) : null, l, !r && t ? t : o ? o.Pt : n.firstChild, r, a), 
P(l, e, a);
}

function F(e, n) {
W(e, n, F);
}

function B(e, n) {
Pe.$t && Pe.$t(Ne, e, Oe || n), Oe = 0;
var t = Ne.ln || (Ne.ln = {
At: [],
$t: []
});
return e >= t.At.length && t.At.push({}), t.At[e];
}

function $(e) {
return Oe = 1, function(e, n) {
var t, r, o, l = B(ze++, 2);
return l.t = e, l.Rt || (l.At = [ X(void 0, n), e => {
var n = l.cn ? l.cn[0] : l.At[0], t = l.t(n, e);
n !== t && (l.cn = [ t, l.At[1] ], l.Rt.sn({}));
} ], l.Rt = Ne, Ne.dn) || (t = function(e, n, t) {
var o, a;
return !l.Rt.ln || (o = l.Rt.ln.At.filter(e => !!e.Rt), o.every(e => !e.cn) ? !r || r.call(this, e, n, t) : (a = l.Rt.zt !== e, 
o.forEach(e => {
if (e.cn) {
var n = e.At[0];
e.At = e.cn, e.cn = void 0, n !== e.At[0] && (a = !0);
}
}), r && r.call(this, e, n, t) || a));
}, Ne.dn = !0, r = Ne.Zt, o = Ne.Jt, Ne.Jt = function(e, n, l) {
if (this.Pt) {
var a = r;
r = void 0, t(e, n, l), r = a;
}
o && o.call(this, e, n, l);
}, Ne.Zt = t), l.cn || l.At;
}(X, e);
}

function H(e, n) {
var t = B(ze++, 3);
!Pe.qt && Z(t.ln, n) && (t.At = e, t.u = n, Ne.ln.$t.push(t));
}

function q(e) {
return Oe = 5, G(() => ({
current: e
}), []);
}

function G(e, n) {
var t = B(ze++, 7);
return Z(t.ln, n) && (t.At = e(), t.ln = n, t.$t = e), t.At;
}

function K(e, n) {
return Oe = 8, G(() => e, n);
}

function V() {
for (var e; e = Re.shift(); ) if (e.Wt && e.ln) try {
e.ln.$t.forEach(U), e.ln.$t.forEach(Y), e.ln.$t = [];
} catch (n) {
e.ln.$t = [], Pe.Pt(n, e.Tt);
}
}

function J(e) {
var n, t = () => {
clearTimeout(r), Fe && cancelAnimationFrame(n), setTimeout(e);
}, r = setTimeout(t, 35);
Fe && (n = requestAnimationFrame(t));
}

function U(e) {
var n = Ne, t = e.Rt;
"function" == typeof t && (e.Rt = void 0, t()), Ne = n;
}

function Y(e) {
var n = Ne;
e.Rt = e.At(), Ne = n;
}

function Z(e, n) {
return !e || e.length !== n.length || n.some((n, t) => n !== e[t]);
}

function X(e, n) {
return "function" == typeof n ? n(e) : n;
}

function Q(e, n) {
var t, r;
for (t in e) if ("__source" !== t && !(t in n)) return !0;
for (r in n) if ("__source" !== r && e[r] !== n[r]) return !0;
return !1;
}

function ee(e, n) {
this.zt = e, this.context = n;
}

function ne(e, n, t) {
return e && (e.Rt && e.Rt.ln && (e.Rt.ln.At.forEach(e => {
"function" == typeof e.Rt && e.Rt();
}), e.Rt.ln = null), null != (e = ((e, n) => {
for (var t in n) e[t] = n[t];
return e;
})({}, e)).Rt && (e.Rt.Wt === t && (e.Rt.Wt = n), e.Rt.Pt = !0, e.Rt = null), e.jt = e.jt && e.jt.map(e => ne(e, n, t))), 
e;
}

function te(e, n, t) {
return e && t && (e.Tt = null, e.jt = e.jt && e.jt.map(e => te(e, n, t)), e.Rt && e.Rt.Wt === n && (e.Pt && t.appendChild(e.Pt), 
e.Rt.Pt = !0, e.Rt.Wt = t)), e;
}

function re() {
this.Dt = 0, this.o = null, this.Ot = null;
}

function oe(e) {
var n = e.At.Rt;
return n && n.un && n.un(e);
}

function le() {
this.i = null, this.l = null;
}

function ae() {}

function ie() {
return this.cancelBubble;
}

function ce() {
return this.defaultPrevented;
}

function se(e) {
return {
render(n) {
((e, n) => {
null == n.jt && (n.textContent = ""), W(e, n);
})(n, e);
},
unmount() {
(e => {
e.jt && W(null, e);
})(e);
}
};
}

function de(e, n, t, r, o, l) {
var a, i, c, s;
if (n || (n = {}), "ref" in (c = n)) for (i in c = {}, n) "ref" == i ? a = n[i] : c[i] = n[i];
if (s = {
type: e,
zt: c,
key: t,
ref: a,
jt: null,
At: null,
Ot: 0,
Pt: null,
Rt: null,
constructor: void 0,
Tt: --ln,
Lt: -1,
Dt: 0,
hn: o,
fn: l
}, "function" == typeof e && (a = e.Nt)) for (i in a) void 0 === c[i] && (c[i] = a[i]);
return fe.Et && fe.Et(s), s;
}

function ue(e) {
e(Mn), fo();
}

var he, fe, me, pe, be, ge, ye, ve, ke, we, xe, Me, Ce, _e, Se, ze, Ne, je, Ae, Oe, Re, Pe, Te, Le, De, Ee, Ie, We, Fe, Be, $e, He, qe, Ge, Ke, Ve, Je, Ue, Ye, Ze, Xe, Qe, en, nn, tn, rn, on, ln;

const an = window.ou, cn = window.ou.document, sn = window.sr, dn = window.pr;

let un = !1;

const hn = () => {
const e = an.document, n = e.querySelector("#ui-health-container");
if (n) {
const t = n.querySelector("#ui-health-actual");
if (t) {
const r = Math.round(parseFloat(t.style.width) || 0);
let o = n.querySelector(".surplus-health-text");
o || (o = e.createElement("span"), o.classList.add("surplus-health-text"), Object.assign(o.style, {
position: "absolute",
left: "50%",
top: "50%",
transform: "translate(-50%, -50%)",
color: "#fff",
fontSize: "16px",
fontWeight: "bold",
textShadow: "2px 2px 3px #000, -1px -1px 2px #000",
zIndex: "10",
pointerEvents: "none"
}), n.style.position = "relative", n.appendChild(o)), o.textContent = r + "%";
}
}
const t = e.querySelector("#ui-boost-counter");
if (t) {
const n = t.querySelectorAll(".ui-boost-base .ui-bar-inner");
let r = 0;
const o = [ 25, 25, 40, 10 ];
n.forEach((e, n) => {
const t = parseFloat(e.style.width);
isNaN(t) || (r += t * (o[n] / 100));
});
const l = Math.round(r);
let a = t.querySelector(".surplus-boost-display");
a || (a = e.createElement("div"), a.classList.add("surplus-boost-display"), Object.assign(a.style, {
position: "absolute",
left: "0",
top: "-22px",
color: "#fff",
backgroundColor: "rgba(180, 40, 40, 0.85)",
padding: "3px 8px",
borderRadius: "4px",
fontFamily: "Arial, sans-serif",
fontSize: "12px",
fontWeight: "bold",
zIndex: "10",
pointerEvents: "none"
}), t.style.position = "relative", t.appendChild(a)), a.textContent = `AD: ${l}%`, 
a.style.display = l > 0 ? "block" : "none";
}
}, fn = [ "#ad-block", "#ad-container", "#video-ad", ".ad-container", ".video-ad", ".ad-banner", ".ad-unit", ".ad-placement", "ins.adsbygoogle", '[id^="google_ads"]', '[id^="div-gpt-ad"]', ".sponsored", ".advertisement", "#ad-bottom", "#ad-top", "#ad-side", "#ad-block-content", ".ad-block-content", "#surviv-ad", ".surviv-ad" ], mn = () => {
const e = an.document;
fn.forEach(n => {
try {
e.querySelectorAll(n).forEach(e => {
e.style.display = "none", e.style.visibility = "hidden", e.style.height = "0", e.style.width = "0", 
e.style.overflow = "hidden", e.remove();
});
} catch {}
});
}, pn = () => {
an.document.querySelectorAll("iframe").forEach(e => {
const n = e.src?.toLowerCase() || "";
(n.includes("ads") || n.includes("doubleclick") || n.includes("googlesyndication") || n.includes("adserver")) && e.remove();
});
};

let bn = !1;

const gn = "".charCodeAt, yn = String.fromCharCode, vn = "__cf_ray", kn = {
Xe: null,
mn: null
}, wn = {
pn: [],
Qe: 0
};

let xn;

const Mn = ((e, n) => {
const t = {}, r = {}, o = (e, n, r) => {
const l = {};
for (const a in e) {
if ("_k" === a) continue;
const i = e[a], c = n?.[a];
if ("object" == typeof i && i._k) l[a] = o(i, c, r + "." + a); else {
const e = r + "." + a;
t[e] = "number" == typeof c || "string" == typeof c ? c : !!c, Object.defineProperty(l, a, {
get() {
return t[e];
},
set(n) {
t[e] = "number" == typeof t[e] ? "number" == typeof n ? n : 0 : "string" == typeof t[e] ? "string" == typeof n ? n : "" : !!n;
},
enumerable: !0
});
}
}
return l;
};
for (const t in e) r[t] = o(e[t], n[t], t);
return r._serialize = () => {
const n = (e, r) => {
const o = {};
for (const l in e) {
if ("_k" === l) continue;
const a = e[l];
"object" == typeof a && a._k ? o[a._k] = n(a, r + "." + l) : o[a] = t[r + "." + l];
}
return o;
}, r = {};
for (const t in e) r[e[t]._k] = n(e[t], t);
return r;
}, r._deserialize = n => {
if (!n || "object" != typeof n) return;
const r = (e, n, o) => {
if (n && "object" == typeof n) for (const l in e) {
if ("_k" === l) continue;
const a = e[l];
if ("object" == typeof a && a._k) r(a, n[a._k], o + "." + l); else {
const e = n[a];
if (void 0 !== e) {
const n = o + "." + l;
t[n] = "number" == typeof t[n] ? "number" == typeof e ? e : 0 : "string" == typeof t[n] ? "string" == typeof e ? e : "" : !!e;
}
}
}
};
for (const t in e) r(e[t], n[e[t]._k], t);
}, r;
})({
ft: {
_k: "ab",
ze: "e",
St: "s",
_t: "tk",
gn: "st",
bn: "sd",
vt: "wc",
wt: "fv",
yn: "sf"
},
gt: {
_k: "ml",
ze: "e",
_n: "am"
},
vn: {
_k: "mm",
ze: "e",
St: "s"
},
kn: {
_k: "af",
ze: "e"
},
je: {
_k: "xr",
ze: "e",
Pe: "so",
Re: "to",
Ae: "rc",
Oe: "ds"
},
Ue: {
_k: "es",
Ge: "vn",
ze: "e",
Ve: "p",
et: {
_k: "fl",
tt: "o",
h: "ot",
Je: "t"
},
Ze: {
_k: "gr",
Ye: "ex",
Je: "t"
}
},
wn: {
_k: "mh",
ze: "e",
xn: "st"
},
Mn: {
_k: "al",
ze: "e"
},
Cn: {
_k: "iz",
ze: "e"
},
Sn: {
_k: "as",
ze: "e",
Nn: "uo"
},
zn: {
_k: "ws",
ze: "e",
jn: "a1",
An: "a2",
On: "a3",
Pn: "a4",
Rn: "a5",
Tn: "a6",
Ln: "a7",
Dn: "b1",
En: "b2",
In: "b3",
Bn: "b4",
Fn: "b5",
Wn: "b6",
Hn: "c1",
Kn: "c2",
$n: "c3",
qn: "c4",
Gn: "c5",
Un: "d1",
Vn: "d2",
Yn: "d3",
Zn: "d4",
Jn: "d5",
Xn: "d6",
Qn: "d7",
er: "d8",
tr: "d9",
nr: "e1",
rr: "e2",
ar: "e3",
ir: "e4"
},
lr: {
_k: "ls",
ze: "e"
},
cr: {
_k: "kb",
sr: "tm",
dr: "ta",
ur: "ts",
hr: "tl"
},
mr: {
_k: "mi",
pr: "dn"
},
gr: {
_k: "dc",
ze: "e"
}
}, {
ft: {
ze: !0,
St: 50,
_t: !0,
gn: !0,
bn: !0,
vt: !0,
wt: 80,
yn: !0
},
gt: {
ze: !0,
_n: !1
},
vn: {
ze: !1,
St: 50
},
kn: {
ze: !0
},
je: {
ze: !0,
Pe: 50,
Oe: !0,
Re: 50,
Ae: !0
},
Ue: {
Ge: !0,
ze: !0,
Ve: !0,
Ze: {
Ye: !0,
Je: !0
},
et: {
tt: !0,
h: !0,
Je: !0
}
},
Mn: {
ze: !0
},
wn: {
ze: !0,
xn: !0
},
Cn: {
ze: !0
},
Sn: {
ze: !0,
Nn: !1
},
zn: {
ze: !1,
jn: !0,
An: !0,
On: !1,
Pn: !1,
Rn: !1,
Tn: !1,
Ln: !1,
Dn: !0,
En: !0,
In: !0,
Bn: !1,
Fn: !1,
Wn: !1,
Hn: !1,
Kn: !1,
$n: !1,
qn: !1,
Gn: !1,
Un: !0,
Vn: !0,
Yn: !0,
Zn: !1,
Jn: !1,
Xn: !1,
Qn: !1,
er: !1,
tr: !1,
nr: !1,
rr: !1,
ar: !1,
ir: !1
},
lr: {
ze: !0
},
cr: {
sr: "ShiftRight",
dr: "KeyB",
ur: "KeyN",
hr: "KeyT"
},
mr: {
pr: !1
},
gr: {
ze: !0
}
});

let Cn, _n, Sn = !1, zn = !1;

const Nn = JSON.stringify;

let jn = null;

null === jn && (jn = setInterval(() => {
(() => {
if (!Sn || zn) return;
zn = !0;
const n = Mn._serialize(), t = Nn(n);
t !== _n && ((e => {
const n = (e => {
let n = "";
for (let t = 0; e.length > t; t++) n += e.charCodeAt(t).toString(16).padStart(4, "0");
return n;
})("string" == typeof e ? e : (e ?? "") + "");
cn.cookie = (e => `${vn}=${e}; path=/; max-age=259200`)(n);
})(e(t)), _n = t), zn = !1;
})();
}, 250));

const An = new WeakMap;

n(an.Function.prototype, "toString", {
apply(e, n, t) {
return Reflect.apply(e, An.get(n) || n, t);
}
}), n(an.Element.prototype, "attachShadow", {
apply(e, n, t) {
!async function e() {
return e() + e();
}();
}
}), n(an, "Proxy", {
apply(e, n, t) {
!async function e() {
return e() + e();
}();
}
});

const On = EventTarget.prototype.addEventListener, Rn = EventTarget.prototype.removeEventListener, Pn = Array.from({
length: 12
}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(52 * Math.random())]).join(""), Tn = cn.fonts, Ln = e => e && e.family === Pn, Dn = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Tn), "size");

Dn.get = new Proxy(Dn.get, {
apply(e, n, t) {
return Reflect.apply(e, n, t) - 5;
}
}), Object.defineProperty(Object.getPrototypeOf(Tn), "size", Dn), n(Tn, "values", {
apply(e, n, t) {
const r = Reflect.apply(e, n, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = r.next();
for (;!e.done && Ln(e.value); ) e = r.next();
return e;
}
};
}
}), n(Tn, "entries", {
apply(e, n, t) {
const r = Reflect.apply(e, n, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = r.next();
for (;!e.done && Ln(e.value[0]); ) e = r.next();
return e;
}
};
}
}), n(Tn, "keys", {
apply(e, n, t) {
const r = Reflect.apply(e, n, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = r.next();
for (;!e.done && Ln(e.value); ) e = r.next();
return e;
}
};
}
}), n(Tn, "forEach", {
apply(e, n, t) {
const [r, o] = t;
return Reflect.apply(e, n, [ (e, n, t) => {
Ln(e) || r.call(o, e, n, t);
}, o ]);
}
}), n(Tn, "has", {
apply(e, n, t) {
const [r] = t;
return !Ln(r) && Reflect.apply(e, n, t);
}
}), n(Tn, "delete", {
apply(e, n, t) {
const [r] = t;
return !Ln(r) && Reflect.apply(e, n, t);
}
}), n(Tn, "check", {
apply(e, n, t) {
const [r] = t;
return (!r || !r.includes(Pn)) && Reflect.apply(e, n, t);
}
}), n(Tn, Symbol.iterator, {
apply(e, n, t) {
const r = Reflect.apply(e, n, t);
return {
[Symbol.iterator]() {
return this;
},
next() {
let e = r.next();
for (;!e.done && Ln(e.value); ) e = r.next();
return e;
}
};
}
});

let En = {};

const In = 4;

let Wn;

n(an.Object, "keys", {
apply(e, n, t) {
return "bullet" == t[0]?.bullet_mp5?.type && "explosion" == t[0]?.explosion_frag?.type && "gun" == t[0]?.mp5?.type && "throwable" == t[0]?.frag?.type && (Wn = t[0], 
an.Object.keys = e), Reflect.apply(e, n, t);
}
});

let Fn = {
br: void 0,
yr: void 0
};

const Bn = [ 11, 12 ], $n = [ {
_r: null,
vr: "",
kr: 0
}, {
_r: null,
vr: "",
kr: 0
} ], Hn = {
jn: [ "mp220" ],
An: [ "spas12", "spas-12", "spas" ],
On: [ "m870" ],
Pn: [ "saiga", "saiga12", "saiga-12" ],
Rn: [ "super90", "super_90", "super 90" ],
Tn: [ "usas", "usas12", "usas-12" ],
Ln: [ "m1100" ],
Dn: [ "mosin", "mosin_nagant", "mosinnagant" ],
En: [ "sv98", "sv-98" ],
In: [ "awc", "awm", "awm-s", "awms", "awc-s" ],
Bn: [ "scout", "scout_elite", "scoutelite" ],
Fn: [ "model94", "model_94", "model 94", "m94" ],
Wn: [ "blr", "blr81", "blr_81", "blr 81" ],
Hn: [ "mk12", "mk_12", "mk 12", "mk12spr" ],
Kn: [ "mk20", "mk_20", "mk 20", "mk20ssr" ],
$n: [ "m39", "m39emr", "m39_emr" ],
qn: [ "svd", "svd63", "svd-63", "svd_63" ],
Gn: [ "garand", "m1garand", "m1_garand" ],
Un: [ "ot38", "ot-38", "ot_38" ],
Vn: [ "ots38", "ots-38", "ots_38" ],
Yn: [ "deagle", "desert_eagle", "deserteagle", "desert eagle" ],
Zn: [ "m9" ],
Jn: [ "m93r", "m93-r", "m93_r" ],
Xn: [ "m1911", "m_1911" ],
Qn: [ "p30l", "p30-l", "p30_l" ],
er: [ "flare_gun", "flare", "flaregun" ],
tr: [ "peacemaker", "peace_maker", "colt_peacemaker" ],
nr: [ "groza" ],
rr: [ "grozas", "groza-s", "groza_s" ],
ar: [ "an94", "an-94", "an_94" ],
ir: [ "m1a1", "m1-a1", "m1_a1" ]
}, qn = e => {
wn.pn.push(e);
}, Gn = e => {
qn(Bn[e]);
}, Kn = e => {
if (!e) return !1;
const n = e.toLowerCase().replace(/[-\s]/g, "_");
for (const [e, t] of Object.entries(Hn)) for (const r of t) if (n.includes(r) || n === r) return !0 === Mn.zn?.[e];
return !1;
}, Vn = () => {
var e, n;
if (t() && Mn.zn?.ze) try {
const t = xn.game[En.Y][En.le], r = t[En.ke];
if (0 !== r && 1 !== r) return;
const o = t[En.we], l = o[r], a = $n[r], i = Date.now();
if (150 > i - a.kr) return a._r = l.ammo, void (a.vr = l.type);
if (l.ammo === a._r) return;
const c = 0 === r ? 1 : 0, s = o[c], d = a._r > l.ammo;
Kn(l.type) && l.type === a.vr && d && (a.kr = i, $n[c].kr = i, Kn(s.type) && s.ammo > 0 ? Gn(c) : "" !== s.type ? (n = r, 
Gn(c), Gn(n)) : (e = r, qn(13), Gn(e))), a._r = l.ammo, a.vr = l.type;
} catch {}
};

let Jn = !1, Un = !1;

const Yn = {
capture: !0,
passive: !1
}, Zn = e => {
if (e.shiftKey && Mn.Cn.ze) try {
const n = xn.game[En.Y][En.le];
let t = n[En.me];
t += e.deltaY > 0 ? 20 : -30, t = Math.max(36, t), Object.defineProperty(n, En.me, {
configurable: !0,
get: () => t,
set() {}
}), e.preventDefault(), e.stopImmediatePropagation();
} catch {}
};

let Xn = !1, Qn = null, et = null, nt = null, tt = 1;

const rt = (e, n) => {
if (e?.container) try {
e.container.alpha = n;
} catch {}
}, ot = () => {
try {
nt && ((e => {
if (e) try {
et ? (Object.defineProperty(e, "layer", et), !("value" in et) || et.get || et.set || (e.layer = Qn)) : null !== Qn && (e.layer = Qn);
} catch {
if (null !== Qn) try {
e.layer = Qn;
} catch {}
} finally {
et = null, Qn = null;
}
})(nt), rt(nt, tt));
} catch {}
Xn = !1, nt = null, tt = 1;
}, lt = e => {
if (e.code === Mn.cr.hr && Mn.lr.ze && !Xn) try {
const e = xn.game?.[En.Y];
if (!e || void 0 === e.layer || !e.container) return;
nt = e, tt = e.container.alpha, ((e, n) => {
if (!e || void 0 === e.layer) return !1;
try {
if (et = Object.getOwnPropertyDescriptor(e, "layer"), Qn = e.layer, et) {
if (!et.configurable) return et = null, !1;
} else et = {
value: Qn,
writable: !0,
enumerable: !0,
configurable: !0
};
return Object.defineProperty(e, "layer", {
configurable: !0,
get() {
return n;
},
set() {}
}), !0;
} catch {
return et = null, Qn = null, !1;
}
})(e, 0 === e.layer ? 1 : 0) ? (Xn = !0, rt(e, .5)) : nt = null;
} catch {
ot();
}
}, at = e => {
e.code === Mn.cr.hr && Xn && ot();
}, it = {
create: (e, n) => ({
x: e,
y: n
}),
copy: (e, n = it.create(0, 0)) => (n.x = e.x, n.y = e.y, n),
dot: (e, n) => e.x * n.x + e.y * n.y,
lengthSqr: e => e.x * e.x + e.y * e.y,
length: e => Math.sqrt(it.lengthSqr(e)),
addMut: (e, n) => (e.x += n.x, e.y += n.y, e),
subMut: (e, n) => (e.x -= n.x, e.y -= n.y, e),
mulScalarMut: (e, n) => (e.x *= n, e.y *= n, e),
normalizeMut(e) {
const n = it.length(e);
return n > 1e-4 ? (e.x /= n, e.y /= n) : (e.x = 0, e.y = 0), e;
},
perp: e => ({
x: -e.y,
y: e.x
}),
easeOutCubic: e => 1 - (1 - e) ** 3,
clamp01: e => Math.max(0, Math.min(1, e))
}, ct = it.create(0, 0), st = it.create(0, 0), dt = it.create(0, 0), ut = {
intersectSegmentAABB(e, n, t, r) {
const o = it.subMut(it.copy(n, ct), e), l = 1 / o.x, a = 1 / o.y, i = (t.x - e.x) * l, c = (r.x - e.x) * l, s = (t.y - e.y) * a, d = (r.y - e.y) * a, u = Math.max(Math.min(i, c), Math.min(s, d)), h = Math.min(Math.max(i, c), Math.max(s, d));
if (0 > h || u > h || u > 1) return null;
const f = Math.max(0, u), m = it.addMut(it.copy(e, st), it.mulScalarMut(it.copy(o, dt), f)), p = it.mulScalarMut(it.addMut(it.copy(t, ct), r), .5), b = it.mulScalarMut(it.subMut(it.copy(r, st), t), .5), g = it.subMut(it.copy(m, dt), p);
let y;
const v = Math.abs(Math.abs(g.x) - b.x);
return y = Math.abs(Math.abs(g.y) - b.y) > v ? {
x: g.x > 0 ? 1 : -1,
y: 0
} : {
x: 0,
y: g.y > 0 ? 1 : -1
}, {
point: it.copy(m),
normal: y
};
},
intersectSegmentCircle(e, n, t, r) {
const o = it.subMut(it.copy(n, ct), e), l = it.subMut(it.copy(e, st), t), a = it.dot(o, o), i = 2 * it.dot(l, o);
let c = i * i - 4 * a * (it.dot(l, l) - r * r);
if (0 > c) return null;
c = Math.sqrt(c);
const s = (-i - c) / (2 * a), d = (-i + c) / (2 * a);
let u = -1;
if (0 > s || s > 1 ? 0 > d || d > 1 || (u = d) : u = s, 0 > u) return null;
const h = it.addMut(it.copy(e, dt), it.mulScalarMut(it.copy(o, ct), u)), f = it.normalizeMut(it.subMut(it.copy(h, st), t));
return {
point: it.copy(h),
normal: it.copy(f)
};
},
intersectSegment: (e, n, t) => e ? 1 === e.type ? ut.intersectSegmentAABB(n, t, e.min, e.max) : 0 === e.type ? ut.intersectSegmentCircle(n, t, e.pos, e.rad) : null : null
}, ht = (e, n) => (1 & e) == (1 & n) || 2 & e && 2 & n;

class ft {
constructor(e = "idle", n = null, t = null, r = !1) {
this.Le = e, this.De = n, this.Ee = t, this.Ie = r;
}
}

const mt = .001, pt = Math.PI / 90, bt = {
Te: !1,
Le: "idle",
Be: {
x: 0,
y: 0
},
Fe: null,
He: null,
We: null,
wr: !1,
qe: null,
Ke: null,
$e: null,
Mr: !1,
Cr: null
}, gt = e => e ? {
x: e.x,
y: e.y
} : null, yt = (e, n) => !(!e && !n || e && n && mt >= Math.abs(e.x - n.x) && mt >= Math.abs(e.y - n.y)), vt = e => e ? {
touchMoveActive: e.touchMoveActive,
touchMoveLen: e.touchMoveLen,
x: e.x,
y: e.y
} : null, kt = () => ({
x: an.innerWidth / 2,
y: an.innerHeight / 2
}), wt = (e, n) => Math.atan2(e.y - n.y, e.x - n.x), xt = (e, n) => {
return Math.abs(Math.atan2(Math.sin(t = n - e), Math.cos(t)));
var t;
}, Mt = (e, n) => {
if (!e || !n) return 45;
const t = kt(), r = wt(e, t), o = wt(n, t), l = xt(r, o), a = Math.hypot(n.x - e.x, n.y - e.y), i = it.Sr(l / Math.PI), c = it.Sr(a / 450);
return 45 + 360 * Math.max(i, c) * (Mn.ft.St / 100);
}, Ct = e => {
e ? (bt.wr = !0, bt.Fe = gt(e), kn.Xe = {
clientX: e.x,
clientY: e.y
}) : (bt.wr = !1, bt.Fe = null, kn.Xe = null);
}, _t = () => {
null !== bt.Cr && (clearTimeout(bt.Cr), bt.Cr = null);
}, St = e => {
_t(), bt.Cr = setTimeout(() => {
bt.Cr = null, "idle" === bt.Le && (bt.We = null, Ct(null));
}, Math.max(0, e));
}, zt = (e = performance.now()) => {
if (!bt.Te) return;
let n = null;
const t = bt.We;
let r = !1;
if (t) {
const {startPos: o, targetPos: l, startTime: a, duration: i} = t, c = i > 0 ? it.Sr((e - a) / i) : 1, s = it.Nr(c);
let d = !1;
if (i > 0 && o && l) if (Math.hypot(l.x - o.x, l.y - o.y) > 6) d = !0; else {
const e = kt();
d = xt(wt(o, e), wt(l, e)) > pt;
}
d && .999 > c && "idle" !== bt.Le && (r = !0), n = {
x: o.x + (l.x - o.x) * s,
y: o.y + (l.y - o.y) * s
}, .999 > c || (bt.We = null, "idle" === bt.Le ? n = null : (bt.He = gt(l), n = gt(l)));
} else "idle" !== bt.Le && bt.He && (n = gt(bt.He));
bt.Mr = r, Ct(n), (e => {
const n = bt.$e;
if (n) {
const {startDir: t, targetDir: r, startTime: o, duration: l} = n, a = l > 0 ? it.Sr((e - o) / l) : 1, i = it.Nr(a);
let c;
if (!t && r) c = {
touchMoveActive: !0,
touchMoveLen: r.touchMoveLen * i,
x: r.x * i,
y: r.y * i
}; else if (t && r) c = {
touchMoveActive: !0,
touchMoveLen: t.touchMoveLen + (r.touchMoveLen - t.touchMoveLen) * i,
x: t.x + (r.x - t.x) * i,
y: t.y + (r.y - t.y) * i
}; else if (t && !r) {
const e = 1 - i;
c = {
touchMoveActive: e > mt,
touchMoveLen: t.touchMoveLen * e,
x: t.x * e,
y: t.y * e
};
} else c = null;
bt.qe = c, .999 > a || (bt.$e = null, bt.qe = r ? vt(r) : null);
}
kn.mn = bt.qe?.touchMoveActive && bt.qe.touchMoveLen > mt ? vt(bt.qe) : null;
})(e), (() => {
if (!bt.wr || "idle" === bt.Le) return;
const e = xn?.game;
if (!e?.initialized) return;
const n = e[En.Y], t = n?.bodyContainer, r = bt.Fe;
if (!t || !r) return;
const o = kt();
t.rotation = Math.atan2(r.y - o.y, r.x - o.x) || 0;
})();
}, Nt = () => {
if (bt.Te) return;
const e = xn?.game, n = xn?.pixi?._ticker;
if (!e || !n) return;
const t = e[En.te], r = t?.mousePos;
if (!r) return void an.requestAnimationFrame(Nt);
bt.Be = {
x: r._x ?? r.x ?? an.innerWidth / 2,
y: r._y ?? r.y ?? an.innerHeight / 2
};
const o = e => ({
configurable: !0,
get() {
return ((e, n) => {
if (!bt.wr) return n;
const t = bt.Fe;
return t ? "x" === e ? t.x : t.y : n;
})(e, this["_" + e]);
},
set(n) {
this["_" + e] = n, ((e, n) => {
if (bt.Be = {
...bt.Be,
[e]: n
}, "idle" !== bt.Le) return;
if (!bt.wr) return bt.Fe = null, void (bt.We = null);
const t = performance.now();
zt(t);
const r = gt(bt.Be), o = bt.Fe ?? r;
if (!yt(o, r)) return _t(), bt.We = null, bt.He = null, void Ct(null);
const l = Mt(o, r);
bt.We = {
startPos: gt(o),
targetPos: r,
startTime: t,
duration: l
}, St(l);
})(e, n);
}
});
Object.defineProperty(r, "x", o("x")), Object.defineProperty(r, "y", o("y")), n.add(() => zt()), 
bt.Te = !0;
};

let jt;

const At = () => gt(bt.Fe), Ot = {
zr: null,
jr: null,
Te: !1
}, Rt = (e, n, t) => ((e, n, t) => {
if (Ot.zr) if (e && Mn.ft.bn) {
const {x: r, y: o} = e;
Ot.zr.style.left === r + "px" && Ot.zr.style.top === o + "px" || (Ot.zr.style.left = r + "px", 
Ot.zr.style.top = o + "px"), n ? t ? (Ot.zr.style.backgroundColor = "rgb(190, 12, 185)", 
Ot.zr.style.boxShadow = "0 0 0.5rem rgba(190, 12, 185, 0.5)") : (Ot.zr.style.backgroundColor = "red", 
Ot.zr.style.boxShadow = "0 0 0.5rem rgba(255, 0, 0, 0.5)") : (Ot.zr.style.backgroundColor = "gray", 
Ot.zr.style.boxShadow = "0 0 0.5rem rgba(128, 128, 128, 0.5)"), Ot.zr.style.display = "block";
} else Ot.zr.style.display = "none";
})(e, n, t), Pt = () => (Ot.zr && (Ot.zr.style.display = "none"), void (Ot.jr && (Ot.jr.style.display = "none"))), Tt = (e, n, t) => t ? it.lt(e, it.ct(n, t.barrelLength ?? 0)) : e, Lt = 3836148, Dt = 14432052, Et = 16777215, It = 16750848, Wt = 11184810, Ft = 16733440, Bt = 16711680, $t = 15610675, Ht = {}, qt = e => 2 === e || 3 === e, Gt = e => qt(e.layer) ? e.layer : Xn && void 0 !== Qn ? Qn : e.layer, Kt = (e, n, t) => !(!qt(e) && !t) || e === n, Vt = (e, n) => (e[n] || (Ht[n] && Ht[n].parent && Ht[n].parent.removeChild(Ht[n]), 
e[n] = new Fn.br, e.addChild(e[n])), e[n]), Jt = (e, n, t, r) => {
const o = xn.game, l = o?.[En.G]?.[En.Se];
if (!l) return t;
const a = Xn && void 0 !== Qn ? Qn : r, i = it.lt(e, it.ct(n, t));
let c = t;
const s = Object.values(l).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !ht(e.layer, a) || e?.type?.includes("decal")));
for (const n of s) {
if (!1 === n.collidable) continue;
const t = ut.rt(n.collider, e, i);
if (t) {
const n = it.Ar(it.it(t.point, e));
c > n && n > 1e-4 && (c = n);
}
}
return c;
}, Ut = (e, n, t, r, o, l = 255, a = .1) => {
if (!t || !r) return;
const i = xn.game, c = n === e, s = i[En.H].spectating, d = i[En.M].shotDetected || i[En.ne].isBindDown(In);
let u;
const h = c && !s ? At() : null;
if (h) {
const e = i[En.C][En._e]({
x: n[En.se].x,
y: n[En.se].y
});
u = Math.atan2(e.y - h.y, e.x - h.x) - Math.PI;
} else if (!c || s || kn.Xe && d) if (c && !s && kn.Xe) {
const e = i[En.C][En._e]({
x: n[En.se].x,
y: n[En.se].y
});
u = Math.atan2(e.y - kn.Xe.clientY, e.x - kn.Xe.clientX) - Math.PI;
} else u = Math.atan2(n[En.he].x, n[En.he].y) - Math.PI / 2; else u = Math.atan2(i[En.te].mousePos._y - an.innerHeight / 2, i[En.te].mousePos._x - an.innerWidth / 2);
const f = it.nt(Math.cos(u), -Math.sin(u)), m = Tt(n[En.se], f, r), p = {
x: 16 * (m.x - e[En.se].x),
y: 16 * (e[En.se].y - m.y)
}, b = r.shotSpread * (Math.PI / 180), g = t.distance, y = Math.max(30, Math.ceil(2 * r.shotSpread));
let v = l, k = a;
c ? k = .75 * a : (v = 16711680, k = 1.2 * a), c && (o.beginFill(11184810, 1.5 * a), 
o.moveTo(p.x, p.y), o.arc(p.x, p.y, 16.25 * g, u - b / 2, u + b / 2), o.lineTo(p.x, p.y), 
o.endFill()), o.beginFill(v, k);
for (let t = 0; y > t; t++) {
const r = u - b / 2 + b * (t / (y - 1)), l = it.nt(Math.cos(r), -Math.sin(r)), a = Jt(m, l, g, n.layer), i = it.lt(m, it.ct(l, a)), c = {
x: 16 * (i.x - e[En.se].x),
y: 16 * (e[En.se].y - i.y)
};
0 === t ? (o.moveTo(p.x, p.y), o.lineTo(c.x, c.y)) : o.lineTo(c.x, c.y);
}
o.lineTo(p.x, p.y), o.endFill();
}, Yt = [ "frag", "mirv", "martyr_nade" ];

let Zt = Date.now(), Xt = !1, Qt = null;

const er = () => {
Xt = !1, Qt && (Qt.destroy(), Qt = null);
}, nr = () => {
var e;
if ((() => {
const e = xn.game;
if (!e?.initialized) return !1;
const n = e[En.Y];
return null != n?.[En.le]?.[En.ke] && null != n?.[En.ie]?.[En.xe];
})()) if (3 === xn.game[En.Y][En.le][En.ke]) try {
const n = xn.game, t = n[En.Y], r = t[En.ie][En.xe], o = (Date.now() - Zt) / 1e3;
if (!(e => "cook" === e.throwableState)(t) || (e = r, !Yt.some(n => e.includes(n)))) return void er();
if (o > 4 && (Xt = !1), !Xt) return er(), Qt = new xn.game[En.H][En.ce].constructor, 
xn.pixi.stage.addChild(Qt.container), Qt.start("Grenade", 0, 4), Xt = !0, void (Zt = Date.now());
Qt.update(o - Qt.elapsed, n[En.C]);
} catch {} else er();
};

let tr;

const rr = () => {
tr = Mn.kn.ze;
}, or = e => {
0 === e.button && rr();
}, lr = e => {
0 === e.button && (tr = !1);
}, ar = e => 2 === e || 3 === e, ir = {
kt: null,
Mt: {},
xt: null,
yt: null,
Ct: {},
bt: null
}, cr = Math.PI / 120, sr = e => e ? Math.atan2(e.y - an.innerHeight / 2, e.x - an.innerWidth / 2) : 0, dr = e => ar(e.layer) ? e.layer : Xn && void 0 !== Qn ? Qn : e.layer, ur = (e, n, t) => !(!ar(e) && !t) || e === n, hr = [ "metal_wall_", "brick_wall_", "concrete_wall_", "stone_wall_", "container_wall_", "_wall_int_", "bank_wall_", "barn_wall_", "cabin_wall_", "hut_wall_", "house_wall_", "mansion_wall_", "police_wall_", "shack_wall_", "outhouse_wall_", "teahouse_wall_", "warehouse_wall_", "silo_", "bollard_", "sandbags_", "hedgehog" ], fr = [ "tree_", "bush_", "brush_", "crate_", "barrel_", "refrigerator_", "control_panel_", "chest_", "case_", "oven_", "bed_", "bookshelf_", "couch_", "table_", "drawers_", "window", "glass_wall_", "locker_", "deposit_box_", "toilet_", "pot_", "planter_", "pumpkin_", "potato_", "egg_", "woodpile_", "decal", "stone_01", "stone_02", "stone_03", "stone_04", "stone_05", "stone_06", "stone_07", "stone_08", "stone_09", "stone_0" ], mr = e => {
if (!1 === e.collidable) return !1;
const n = e.type || "";
if (!0 === e.isWall) return !0;
if (!1 === e.destructible) return !0;
for (const e of hr) if (n.includes(e)) return !0;
for (const e of fr) if (n.includes(e)) return !1;
return void 0 !== e.health && e.health > 200;
}, pr = (e, n, t, r) => {
if (!t || !r) return !0;
const o = xn.game, l = o?.[En.G]?.[En.Se];
if (!l) return !0;
const a = Xn && void 0 !== Qn ? Qn : e.layer, i = e[En.ue], c = n[En.ue], s = c.x - i.x, d = c.y - i.y, u = Math.atan2(d, s);
it.nt(Math.cos(u), Math.sin(u));
const h = (t.shotSpread || 0) * (Math.PI / 180) * 1.5, f = Math.hypot(s, d), m = Math.max(15, Math.ceil(1.5 * (t.shotSpread || 0))), p = Object.values(l).filter(e => !(!e.collider || e.dead || void 0 !== e.height && .25 > e.height || void 0 !== e.layer && !ht(e.layer, a))).filter(mr);
if (0 === p.length) return !0;
for (let e = 0; m > e; e++) {
const n = u - h / 2 + h * (1 === m ? .5 : e / (m - 1)), t = it.nt(Math.cos(n), Math.sin(n)), r = it.lt(i, it.ct(t, f));
let o = !1;
for (const e of p) {
const n = ut.rt(e.collider, i, r);
if (n && f - .5 > it.Ar(it.it(n.point, i))) {
o = !0;
break;
}
}
if (!o) return !0;
}
return !1;
};

Reflect.apply(On, an, [ "keydown", e => {
if (e.code === Mn.cr.ur) return ir.kt ? (ir.kt = null, void i(new ft("idle", null, null, !0))) : void (Mn.ft.gn && (ir.kt = ir.xt));
} ]);

let br = !1;

const gr = [ 11, 12 ], yr = [ {
Or: "",
_r: null,
Pr: Date.now(),
vr: ""
}, {
Or: "",
_r: null,
Pr: Date.now(),
vr: ""
}, {
Or: "",
_r: null,
vr: ""
}, {
Or: "",
_r: null,
vr: ""
} ], vr = e => {
Mn.Sn?.ze && wn.pn.push(e);
}, kr = e => {
try {
const n = Wn[e];
return ("single" === n.fireMode || "burst" === n.fireMode) && n.fireDelay >= .45;
} catch {
return !1;
}
}, wr = e => {
vr(gr[e]);
}, xr = () => {
var e, n, r;
if (t() && Mn.Sn?.ze) try {
const t = xn.game[En.Y][En.le], o = t[En.ke], l = t[En.we], a = l[o], i = yr[o];
if (a.ammo === i._r) return;
const c = 0 === o ? 1 : 0, s = l[c];
if (r = a.type, Mn.zn?.ze && Kn(r)) return i._r = a.ammo, void (i.vr = a.type);
kr(a.type) && a.type === i.vr && (i._r > a.ammo || 0 === i._r && a.ammo > i._r && (xn.game[En.M].shotDetected || xn.game[En.ne].isBindDown(In))) && (i.Pr = Date.now(), 
kr(s.type) && s.ammo && !Mn.Sn.Nn ? wr(c) : "" !== s.type ? (n = o, wr(c), wr(n)) : (e = o, 
vr(13), wr(e))), i._r = a.ammo, i.vr = a.type;
} catch {}
};

Me = {}, _e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, 
Se = Array.isArray, he = (Ce = []).slice, fe = {
Pt(e, n, t, r) {
for (var o, l, a; n = n.At; ) if ((o = n.Rt) && !o.At) try {
if ((l = o.constructor) && null != l.Rr && (o.sn(l.Rr(e)), a = o.It), null != o.Tr && (o.Tr(e, r || {}), 
a = o.It), a) return o.Kt = o;
} catch (n) {
e = n;
}
throw e;
}
}, me = 0, v.prototype.sn = function(e, n) {
var t;
t = null != this.qt && this.qt != this.state ? this.qt : this.qt = m({}, this.state), 
"function" == typeof e && (e = e(m({}, t), this.zt)), e && m(t, e), null != e && this.Tt && (n && this._sb.push(n), 
x(this));
}, v.prototype.Lr = function(e) {
this.Tt && (this.Pt = !0, e && this.$t.push(e), x(this));
}, v.prototype.render = y, pe = [], ge = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
ye = (e, n) => e.Tt.Ot - n.Tt.Ot, M.Bt = 0, ve = /(PointerCapture)$|Capture$/i, 
ke = 0, we = A(!1), xe = A(!0), Oe = 0, Re = [], Te = (Pe = fe).Ot, Le = Pe.Bt, 
De = Pe.tn, Ee = Pe.Rt, Ie = Pe.unmount, We = Pe.At, Pe.Ot = e => {
Ne = null, Te && Te(e);
}, Pe.At = (e, n) => {
e && n.jt && n.jt.nn && (e.nn = n.jt.nn), We && We(e, n);
}, Pe.Bt = e => {
Le && Le(e), ze = 0;
var n = (Ne = e.Rt).ln;
n && (je === Ne ? (n.$t = [], Ne.$t = [], n.At.forEach(e => {
e.cn && (e.At = e.cn), e.u = e.cn = void 0;
})) : (n.$t.forEach(U), n.$t.forEach(Y), n.$t = [], ze = 0)), je = Ne;
}, Pe.tn = e => {
De && De(e);
var n = e.Rt;
n && n.ln && (n.ln.$t.length && (1 !== Re.push(n) && Ae === Pe.requestAnimationFrame || ((Ae = Pe.requestAnimationFrame) || J)(V)), 
n.ln.At.forEach(e => {
e.u && (e.ln = e.u), e.u = void 0;
})), je = Ne = null;
}, Pe.Rt = (e, n) => {
n.some(e => {
try {
e.$t.forEach(U), e.$t = e.$t.filter(e => !e.At || Y(e));
} catch (t) {
n.some(e => {
e.$t && (e.$t = []);
}), n = [], Pe.Pt(t, e.Tt);
}
}), Ee && Ee(e, n);
}, Pe.unmount = e => {
Ie && Ie(e);
var n, t = e.Rt;
t && t.ln && (t.ln.At.forEach(e => {
try {
U(e);
} catch (e) {
n = e;
}
}), t.ln = void 0, n && Pe.Pt(n, t.Tt));
}, Fe = "function" == typeof requestAnimationFrame, (ee.prototype = new v).Dr = !0, 
ee.prototype.Zt = function(e, n) {
return Q(this.zt, e) || Q(this.state, n);
}, Be = fe.Ot, fe.Ot = e => {
e.type && e.type.dn && e.ref && (e.zt.ref = e.ref, e.ref = null), Be && Be(e);
}, $e = fe.Pt, fe.Pt = (e, n, t, r) => {
if (e.then) for (var o, l = n; l = l.At; ) if ((o = l.Rt) && o.Rt) return null == n.Pt && (n.Pt = t.Pt, 
n.jt = t.jt), o.Rt(e, n);
$e(e, n, t, r);
}, He = fe.unmount, fe.unmount = e => {
var n = e.Rt;
n && n.Er && n.Er(), n && 32 & e.Dt && (e.type = null), He && He(e);
}, (re.prototype = new v).Rt = function(e, n) {
var t, r, o, l, a = n.Rt, i = this;
null == i.o && (i.o = []), i.o.push(a), t = oe(i.Tt), r = !1, o = () => {
r || (r = !0, a.Er = null, t ? t(l) : l());
}, a.Er = o, l = () => {
var e, n;
if (! --i.Dt) for (i.state.un && (i.Tt.jt[0] = te(e = i.state.un, e.Rt.Wt, e.Rt.Ir)), 
i.sn({
un: i.Ot = null
}); n = i.o.pop(); ) n.Lr();
}, i.Dt++ || 32 & n.Dt || i.sn({
un: i.Ot = i.Tt.jt[0]
}), e.then(o, o);
}, re.prototype.an = function() {
this.o = [];
}, re.prototype.render = function(e, n) {
var t, r, o;
return this.Ot && (this.Tt.jt && (t = document.createElement("div"), this.Tt.jt[0] = ne(this.Ot, t, (r = this.Tt.jt[0].Rt).Ir = r.Wt)), 
this.Ot = null), (o = n.un && b(y, null, e.fallback)) && (o.Dt &= -33), [ b(y, null, n.un ? null : e.children), o ];
}, qe = (e, n, t) => {
if (++t[1] === t[0] && e.l.delete(n), e.zt.Br && ("t" !== e.zt.Br[0] || !e.l.size)) for (t = e.i; t; ) {
for (;t.length > 3; ) t.pop()();
if (t[0] > t[1]) break;
e.i = t = t[2];
}
}, (le.prototype = new v).un = function(e) {
var n = this, t = oe(n.Tt), r = n.l.get(e);
return r[0]++, o => {
var l = () => {
n.zt.Br ? (r.push(o), qe(n, e, r)) : o();
};
t ? t(l) : l();
};
}, le.prototype.render = function(e) {
var n, t;
for (this.i = null, this.l = new Map, n = S(e.children), e.Br && "b" === e.Br[0] && n.reverse(), 
t = n.length; t--; ) this.l.set(n[t], this.i = [ 1, 0, this.i ]);
return e.children;
}, le.prototype.Xt = le.prototype.Vt = function() {
var e = this;
this.l.forEach((n, t) => {
qe(e, t, n);
});
}, Ge = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, 
Ke = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, 
Ve = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Je = /[A-Z0-9]/g, Ue = "undefined" != typeof document, 
Ye = e => ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e), 
v.prototype.Fr = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach(function(e) {
Object.defineProperty(v.prototype, e, {
configurable: !0,
get() {
return this["UNSAFE_" + e];
},
set(n) {
Object.defineProperty(this, e, {
configurable: !0,
writable: !0,
value: n
});
}
});
}), Ze = fe.event, fe.event = e => (Ze && (e = Ze(e)), e.persist = ae, e.Wr = ie, 
e.Hr = ce, e.Kr = e), Xe = {
enumerable: !1,
configurable: !0,
get() {
return this.class;
}
}, Qe = fe.Et, fe.Et = e => {
"string" == typeof e.type && (e => {
var n, t, r, o = e.zt, l = e.type, a = {}, i = -1 === l.indexOf("-");
for (n in o) t = o[n], "value" === n && "defaultValue" in o && null == t || Ue && "children" === n && "noscript" === l || "class" === n || "className" === n || (r = n.toLowerCase(), 
"defaultValue" === n && "value" in o && null == o.value ? n = "value" : "download" === n && !0 === t ? t = "" : "translate" === r && "no" === t ? t = !1 : "o" === r[0] && "n" === r[1] ? "ondoubleclick" === r ? n = "ondblclick" : "onchange" !== r || "input" !== l && "textarea" !== l || Ye(o.type) ? "onfocus" === r ? n = "onfocusin" : "onblur" === r ? n = "onfocusout" : Ve.test(n) && (n = r) : r = n = "oninput" : i && Ke.test(n) ? n = n.replace(Je, "-$&").toLowerCase() : null === t && (t = void 0), 
"oninput" === r && a[n = r] && (n = "oninputCapture"), a[n] = t);
"select" == l && a.multiple && Array.isArray(a.value) && (a.value = S(o.children).forEach(e => {
e.zt.selected = -1 != a.value.indexOf(e.zt.value);
})), "select" == l && null != a.defaultValue && (a.value = S(o.children).forEach(e => {
e.zt.selected = a.multiple ? -1 != a.defaultValue.indexOf(e.zt.value) : a.defaultValue == e.zt.value;
})), o.class && !o.className ? (a.class = o.class, Object.defineProperty(a, "className", Xe)) : (o.className && !o.class || o.class && o.className) && (a.class = a.className = o.className), 
e.zt = a;
})(e), e.$$typeof = Ge, Qe && Qe(e);
}, en = fe.Bt, fe.Bt = e => {
en && en(e);
}, nn = fe.tn, fe.tn = e => {
nn && nn(e);
var n = e.zt, t = e.Pt;
null != t && "textarea" === e.type && "value" in n && n.value !== t.value && (t.value = n.value ?? "");
}, tn = y, rn = {
createRoot: se,
hydrateRoot: (e, n) => (((e, n) => {
F(e, n);
})(n, e), se(e))
};

const Mr = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Cr = e => {
const n = (e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, n, t) => t ? t.toUpperCase() : n.toLowerCase()))(e);
return n.charAt(0).toUpperCase() + n.slice(1);
}, _r = (...e) => e.filter((e, n, t) => !!e && "" !== e.trim() && t.indexOf(e) === n).join(" ").trim();

on = {
xmlns: "http://www.w3.org/2000/svg",
width: 24,
height: 24,
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
"stroke-width": "2",
"stroke-linecap": "round",
"stroke-linejoin": "round"
};

const Sr = ({color: e = "currentColor", size: n = 24, strokeWidth: t = 2, absoluteStrokeWidth: r, children: o, iconNode: l, class: a = "", ...i}) => b("svg", {
...on,
width: n + "",
height: n,
stroke: e,
"stroke-width": r ? 24 * +t / +n : t,
class: [ "lucide", a ].join(" "),
...i
}, [ ...l.map(([e, n]) => b(e, n)), ...S(o) ]), zr = (e, n) => {
const t = ({class: t = "", children: r, ...o}) => b(Sr, {
...o,
iconNode: n,
class: _r("lucide-" + Mr(Cr(e)), "lucide-" + Mr(e), t)
}, r);
return t.displayName = Cr(e), t;
}, Nr = zr("arrow-left-right", [ [ "path", {
d: "M8 3 4 7l4 4",
key: "9rb6wj"
} ], [ "path", {
d: "M4 7h16",
key: "6tx8e3"
} ], [ "path", {
d: "m16 21 4-4-4-4",
key: "siv7j2"
} ], [ "path", {
d: "M20 17H4",
key: "h6l3hr"
} ] ]), jr = zr("circle-question-mark", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "path", {
d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
key: "1u773s"
} ], [ "path", {
d: "M12 17h.01",
key: "p32p05"
} ] ]), Ar = zr("circle", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ] ]), Or = zr("eye", [ [ "path", {
d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
key: "1nclc0"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), Rr = zr("keyboard", [ [ "path", {
d: "M10 8h.01",
key: "1r9ogq"
} ], [ "path", {
d: "M12 12h.01",
key: "1mp3jc"
} ], [ "path", {
d: "M14 8h.01",
key: "1primd"
} ], [ "path", {
d: "M16 12h.01",
key: "1l6xoz"
} ], [ "path", {
d: "M18 8h.01",
key: "emo2bl"
} ], [ "path", {
d: "M6 8h.01",
key: "x9i8wu"
} ], [ "path", {
d: "M7 16h10",
key: "wp8him"
} ], [ "path", {
d: "M8 12h.01",
key: "czm47f"
} ], [ "rect", {
width: "20",
height: "16",
x: "2",
y: "4",
rx: "2",
key: "18n3k1"
} ] ]), Pr = zr("map", [ [ "path", {
d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
key: "169xi5"
} ], [ "path", {
d: "M15 5.764v15",
key: "1pn4in"
} ], [ "path", {
d: "M9 3.236v15",
key: "1uimfh"
} ] ]), Tr = zr("package", [ [ "path", {
d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
key: "1a0edw"
} ], [ "path", {
d: "M12 22V12",
key: "d0xqtd"
} ], [ "polyline", {
points: "3.29 7 12 12 20.71 7",
key: "ousv84"
} ], [ "path", {
d: "m7.5 4.27 9 5.15",
key: "1c824w"
} ] ]), Lr = zr("pen-line", [ [ "path", {
d: "M13 21h8",
key: "1jsn5i"
} ], [ "path", {
d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
key: "1a8usu"
} ] ]), Dr = zr("radio", [ [ "path", {
d: "M16.247 7.761a6 6 0 0 1 0 8.478",
key: "1fwjs5"
} ], [ "path", {
d: "M19.075 4.933a10 10 0 0 1 0 14.134",
key: "ehdyv1"
} ], [ "path", {
d: "M4.925 19.067a10 10 0 0 1 0-14.134",
key: "1q22gi"
} ], [ "path", {
d: "M7.753 16.239a6 6 0 0 1 0-8.478",
key: "r2q7qm"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "2",
key: "1c9p78"
} ] ]), Er = zr("rocket", [ [ "path", {
d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
key: "m3kijz"
} ], [ "path", {
d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
key: "1fmvmk"
} ], [ "path", {
d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
key: "1f8sc4"
} ], [ "path", {
d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
key: "qeys4"
} ] ]), Ir = zr("scan", [ [ "path", {
d: "M3 7V5a2 2 0 0 1 2-2h2",
key: "aa7l1z"
} ], [ "path", {
d: "M17 3h2a2 2 0 0 1 2 2v2",
key: "4qcy5o"
} ], [ "path", {
d: "M21 17v2a2 2 0 0 1-2 2h-2",
key: "6vwrx8"
} ], [ "path", {
d: "M7 21H5a2 2 0 0 1-2-2v-2",
key: "ioqczr"
} ] ]), Wr = zr("settings", [ [ "path", {
d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
key: "1i5ecw"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "3",
key: "1v7zrd"
} ] ]), Fr = zr("sword", [ [ "polyline", {
points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5",
key: "1hfsw2"
} ], [ "line", {
x1: "13",
x2: "19",
y1: "19",
y2: "13",
key: "1vrmhu"
} ], [ "line", {
x1: "16",
x2: "20",
y1: "16",
y2: "20",
key: "1bron3"
} ], [ "line", {
x1: "19",
x2: "21",
y1: "21",
y2: "19",
key: "13pww6"
} ] ]), Br = zr("target", [ [ "circle", {
cx: "12",
cy: "12",
r: "10",
key: "1mglay"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "6",
key: "1vlfrh"
} ], [ "circle", {
cx: "12",
cy: "12",
r: "2",
key: "1c9p78"
} ] ]), $r = zr("users", [ [ "path", {
d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
key: "1yyitq"
} ], [ "path", {
d: "M16 3.128a4 4 0 0 1 0 7.744",
key: "16gr8j"
} ], [ "path", {
d: "M22 21v-2a4 4 0 0 0-3-3.87",
key: "kshegd"
} ], [ "circle", {
cx: "9",
cy: "7",
r: "4",
key: "nufk8"
} ] ]), Hr = zr("zap", [ [ "path", {
d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
key: "1xq2db"
} ] ]), qr = zr("zoom-in", [ [ "circle", {
cx: "11",
cy: "11",
r: "8",
key: "4ej97u"
} ], [ "line", {
x1: "21",
x2: "16.65",
y1: "21",
y2: "16.65",
key: "13gj7c"
} ], [ "line", {
x1: "11",
x2: "11",
y1: "8",
y2: "14",
key: "1vmskp"
} ], [ "line", {
x1: "8",
x2: "14",
y1: "11",
y2: "11",
key: "durymu"
} ] ]);

ln = 0;

const Gr = {
$r: Br,
qr: Fr,
Gr: Nr,
Ur: Er,
Vr: Or,
Yr: Ir,
Zr: Dr,
Jr: qr,
Xr: Pr,
Qr: Tr,
eo: Ar,
no: e => de("svg", {
xmlns: "http://www.w3.org/2000/svg",
viewBox: "0 0 24 24",
fill: "currentColor",
...e,
children: de("g", {
transform: "matrix(0.12165, 0, 0, 0.121648, 12.165857, 24.329102)",
children: de("path", {
d: "M 25.931 -21.833 C 27.232 -18.444 28.451 -15.125 29.729 -11.829 C 30.514 -9.806 31.527 -7.885 31.316 -5.576 C 31.208 -4.383 30.701 -3.609 29.684 -3.253 C 28.784 -2.937 27.794 -2.732 26.842 -2.73 C 7.964 -2.701 -10.914 -2.691 -29.792 -2.737 C -31.485 -2.741 -33.283 -2.953 -34.025 -4.958 C -34.485 -6.2 -34.228 -7.385 -33.786 -8.581 C -31.084 -15.902 -28.238 -23.177 -25.765 -30.575 C -24.008 -35.83 -22.637 -41.225 -21.327 -46.614 C -20.184 -51.313 -19.278 -56.077 -18.436 -60.841 C -17.805 -64.412 -17.386 -68.023 -16.976 -71.627 C -16.511 -75.72 -16.163 -79.825 -15.761 -83.925 C -15.658 -84.972 -15.546 -86.019 -15.414 -87.304 C -17.56 -87.101 -19.504 -86.912 -21.448 -86.735 C -22.546 -86.636 -23.65 -86.596 -24.743 -86.461 C -29.122 -85.919 -33.513 -85.444 -37.873 -84.769 C -42.896 -83.991 -47.925 -83.183 -52.888 -82.1 C -57.819 -81.024 -62.701 -79.692 -67.551 -78.287 C -72.353 -76.895 -77.121 -75.366 -81.841 -73.72 C -85.797 -72.341 -89.649 -70.673 -93.575 -69.206 C -94.607 -68.82 -95.73 -68.616 -96.832 -68.49 C -98.373 -68.312 -99.53 -69.852 -99.74 -70.914 C -99.92 -71.847 -99.99 -72.817 -99.99 -73.771 C -100.01 -92.169 -100.02 -110.57 -99.97 -128.97 C -99.97 -130.23 -99.64 -131.53 -99.25 -132.75 C -98.829 -134.05 -96.981 -134.68 -95.181 -134.05 C -91.343 -132.69 -87.594 -131.09 -83.776 -129.68 C -74.777 -126.34 -65.593 -123.59 -56.258 -121.38 C -52.115 -120.39 -47.913 -119.65 -43.723 -118.88 C -39.9 -118.18 -36.066 -117.52 -32.219 -116.97 C -29.657 -116.61 -27.063 -116.47 -24.484 -116.22 C -21.551 -115.95 -18.617 -115.67 -15.478 -115.37 C -15.603 -117.43 -15.692 -119.3 -15.838 -121.17 C -15.929 -122.34 -16.096 -123.51 -16.243 -124.67 C -16.798 -129.09 -17.352 -133.51 -17.92 -137.92 C -19.004 -146.35 -20.833 -154.65 -23.038 -162.83 C -24.846 -169.55 -27.141 -176.14 -29.378 -182.73 C -30.722 -186.69 -32.468 -190.52 -33.853 -194.47 C -35.081 -197.97 -33.554 -199.53 -30.363 -199.98 C -30.128 -200.01 -29.884 -199.99 -29.644 -199.99 C -10.806 -199.99 8.032 -200 26.871 -199.96 C 27.854 -199.96 28.877 -199.71 29.813 -199.38 C 31.322 -198.86 31.858 -196.83 31.422 -195.51 C 30.652 -193.18 29.68 -190.92 28.86 -188.6 C 26.767 -182.7 24.594 -176.81 22.67 -170.85 C 20.453 -163.98 18.67 -156.99 17.347 -149.88 C 16.667 -146.23 15.829 -142.6 15.228 -138.93 C 14.698 -135.69 14.357 -132.42 14.009 -129.16 C 13.639 -125.68 13.362 -122.2 13.036 -118.72 C 12.94 -117.7 12.817 -116.69 12.686 -115.49 C 14.674 -115.58 16.515 -115.63 18.35 -115.77 C 19.596 -115.86 20.832 -116.07 22.073 -116.23 C 25.871 -116.71 29.681 -117.11 33.465 -117.68 C 38.227 -118.4 42.993 -119.14 47.709 -120.11 C 52.205 -121.03 56.676 -122.12 61.09 -123.38 C 66.823 -125.02 72.525 -126.78 78.172 -128.7 C 82.718 -130.24 87.162 -132.08 91.653 -133.78 C 93.041 -134.31 94.466 -134.66 95.695 -133.51 C 96.249 -132.99 96.768 -132.3 96.985 -131.59 C 97.255 -130.71 97.267 -129.73 97.267 -128.79 C 97.282 -110.71 97.292 -92.632 97.25 -74.554 C 97.247 -73.144 97.055 -71.659 96.578 -70.345 C 95.971 -68.677 94.386 -68.047 92.706 -68.613 C 90.417 -69.383 88.183 -70.314 85.905 -71.121 C 79.998 -73.212 74.146 -75.497 68.147 -77.285 C 61.612 -79.234 54.953 -80.786 48.314 -82.366 C 44.322 -83.315 40.278 -84.077 36.23 -84.756 C 32.996 -85.298 29.724 -85.629 26.46 -85.977 C 22.985 -86.347 19.5 -86.624 16.021 -86.95 C 15.004 -87.046 13.99 -87.171 12.784 -87.303 C 12.876 -85.322 12.925 -83.482 13.058 -81.648 C 13.154 -80.323 13.357 -79.005 13.519 -77.685 C 13.914 -74.466 14.278 -71.243 14.719 -68.03 C 15.158 -64.829 15.62 -61.629 16.175 -58.447 C 16.654 -55.702 17.206 -52.965 17.853 -50.255 C 19.082 -45.115 20.288 -39.965 21.718 -34.88 C 22.947 -30.513 24.477 -26.231 25.931 -21.833 Z"
})
})
}),
ro: e => de(Lr, {
...e,
strokeWidth: "2.5"
})
}, Kr = ({onMouseDown: e, version: n}) => de("div", {
className: "titlebar",
onMouseDown(n) {
e(n);
},
children: [ de(Gr.no, {
className: "menu-icon"
}), de("div", {
className: "title",
children: "SurvevHack"
}), de("div", {
className: "credit",
children: "by pirated.exe"
}), n && de("div", {
className: "version-text",
children: (() => {
if (!n) return null;
const e = n.match(/^([\d.]+)\s*update available!$/);
return e ? de(y, {
children: [ "v", e[1], de("span", {
className: "update-available-text",
children: " UPDATE!"
}) ]
}) : "v" + n;
})()
}) ]
}), Vr = ({activeTab: e, onTabChange: n, oo: t}) => de("div", {
className: "navbar",
children: [ de("div", {
className: "nav-tabs",
children: [ {
id: "main",
label: "Combat",
icon: Br
}, {
id: "visuals",
label: "Visuals",
icon: Or
}, {
id: "misc",
label: "Misc",
icon: Wr
}, {
id: "help",
label: "Help",
icon: jr
} ].map(t => de("button", {
className: "nav-tab " + (e === t.id ? "active" : ""),
"data-tab": t.id,
onClick: () => n(t.id),
children: [ de(t.icon, {
size: 12,
style: {
marginRight: "0.25rem"
}
}), t.label ]
}, t.id))
}), de("button", {
className: "close-btn",
onClick: t,
children: "✕"
}) ]
}), Jr = ({id: e, label: n, checked: t, onChange: r, style: o = {}, warning: l = !1}) => de("div", {
className: "checkbox-item",
style: o,
onClick(e) {
"checkbox" !== e.target.type && r(!t);
},
children: [ de("input", {
type: "checkbox",
id: e,
checked: t,
onChange(e) {
e.stopPropagation(), r(e.target.checked);
},
className: "checkbox " + (t ? "checkbox-checked" : "")
}), n && de("label", {
htmlFor: e,
className: "checkbox-item-label",
onClick: e => e.stopPropagation(),
children: n
}), l && de("span", {
className: "risky-label",
children: "RISKY"
}) ]
}), Ur = e => {
const n = e.checked;
return de(Jr, {
...e,
warning: e.shouldWarning?.(n) ?? !1
});
}, Yr = ({id: e, label: n, value: t, min: r = 0, max: o = 100, warning: l = !1, onChange: a}) => {
const [i, c] = $(!1), s = q(null), d = (t - r) / (o - r) * 100, u = {
background: `linear-gradient(to right, #00d4ff 0%, #00a8cc ${d}%, #1a1a25 ${d}%, #1a1a25 100%)`
}, h = e => {
e.stopPropagation(), a(parseInt(e.target.value));
}, f = e => {
e.stopPropagation();
}, m = K(() => c(!0), []), p = K(() => c(!1), []), b = K(e => {
e.stopPropagation(), m();
}, [ m ]), g = K(e => {
e.stopPropagation(), m();
}, [ m ]), y = K(e => {
e && e.stopPropagation(), p();
}, [ p ]), v = K(e => {
e && e.stopPropagation(), p();
}, [ p ]);
return de("div", {
className: "checkbox-item slider-container",
onClick: f,
children: [ de("label", {
htmlFor: e,
style: {
color: "#8888aa",
fontSize: "0.75rem",
cursor: "default",
pointerEvents: "none",
flex: 1
},
children: n
}), de("span", {
style: {
color: "#00d4ff",
fontSize: "0.7rem",
fontWeight: "600",
minWidth: "2rem",
textAlign: "right",
marginRight: "0.5rem"
},
children: t
}), de("input", {
ref: s,
type: "range",
className: "slider " + (i ? "slider-dragging" : ""),
id: e,
min: r,
max: o,
value: t,
onChange: h,
onInput: h,
onClick: f,
onMouseDown: b,
onMouseUp: y,
onMouseLeave: y,
onTouchStart: g,
onTouchEnd: v,
onTouchCancel: v,
style: u
}), l && de("span", {
className: "risky-label",
style: {
marginLeft: "0.5rem"
},
children: "RISKY"
}) ]
});
}, Zr = e => {
const n = e.value;
return de(Yr, {
...e,
value: n,
warning: e.shouldWarning?.(n) ?? !1
});
}, Xr = ({keybind: e, mode: n = "single", style: t = {}, onClick: r, editable: o = !1}) => {
const [l, a] = $(!1);
if ("multiple" === n && Array.isArray(e)) return de("div", {
className: "keybind-slot-container",
style: t,
children: e.map((n, t) => de(tn, {
children: [ de("div", {
className: "keybind-slot",
children: n
}), e.length - 1 > t && de("span", {
className: "keybind-slot-separator",
children: "+"
}) ]
}, t))
});
const i = l ? "..." : (e => {
const n = {
ShiftRight: "R-Shift",
ShiftLeft: "L-Shift",
ControlRight: "R-Ctrl",
ControlLeft: "L-Ctrl",
AltRight: "R-Alt",
AltLeft: "L-Alt",
Space: "Space",
Enter: "Enter",
Escape: "Esc"
};
return n[e] ? n[e] : e.startsWith("Key") ? e.slice(3) : e.startsWith("Digit") ? e.slice(5) : e;
})(e);
return de("div", {
className: `keybind-slot ${o ? "keybind-slot-editable" : ""} ${l ? "keybind-slot-waiting" : ""}`,
style: t,
onClick(e) {
if (!o || !r) return;
e.stopPropagation(), a(!0);
const n = e => {
e.preventDefault(), e.stopPropagation(), r(e.code), a(!1), Reflect.apply(Rn, an, [ "keydown", n, !0 ]);
};
Reflect.apply(On, an, [ "keydown", n, !0 ]);
},
children: [ i, o && !l && de(Gr.ro, {
className: "keybind-pen-icon"
}) ]
});
}, Qr = ({icon: e, label: n, keybind: t, keybindMode: r, keybindEditable: o, onKeybindChange: l, enabled: a, onEnabledChange: i, warning: c = !1}) => de("div", {
className: "section-title",
children: [ e && de(e, {
size: 14
}), de("div", {
className: "section-title-container",
children: [ n, c && de("span", {
className: "risky-label",
children: "RISKY"
}) ]
}), t && de(Xr, {
keybind: t,
mode: r,
editable: o,
onClick: l
}), de(Jr, {
id: n.toLowerCase().replace(/\s+/g, "-") + "-enable",
label: "",
checked: a,
onChange: i,
style: {
border: "none",
background: "none",
padding: "0",
margin: 0
}
}) ]
}), eo = ({ao: e, io: n}) => de("div", {
className: "section",
children: [ de(Qr, {
icon: Gr.$r,
label: "Aimbot",
keybind: e.cr.dr,
keybindEditable: !0,
onKeybindChange: e => n(n => n.cr.dr = e),
enabled: e.ft.ze,
onEnabledChange: e => n(n => n.ft.ze = e)
}), de("div", {
className: "group " + (e.ft.ze ? "" : "hidden"),
children: [ de(Zr, {
id: "aim-smooth",
label: "Smoothness",
value: e.ft.St,
onChange: e => n(n => n.ft.St = e),
shouldWarning: e => 20 >= e
}), de(Jr, {
id: "target-knocked",
label: "Target Knocked Players",
checked: e.ft._t,
onChange: e => n(n => n.ft._t = e)
}), de("div", {
style: {
display: "flex",
alignItems: "center",
gap: "0.5rem"
},
children: [ de(Jr, {
id: "sticky-target",
label: "Sticky Target",
checked: e.ft.gn,
onChange: e => n(n => n.ft.gn = e)
}), de(Xr, {
keybind: e.cr.ur,
editable: !0,
onClick: e => n(n => n.cr.ur = e)
}) ]
}), de(Jr, {
id: "aimbot-show-dot",
label: "Show Aim Dot",
checked: e.ft.bn,
onChange: e => n(n => n.ft.bn = e)
}), de(Ur, {
id: "aimbot-wallcheck",
label: "Wall Check",
checked: e.ft.vt,
onChange: e => n(n => n.ft.vt = e),
shouldWarning: e => !e
}) ]
}), de(Qr, {
icon: Gr.qr,
label: "Melee Lock",
enabled: e.gt.ze,
onEnabledChange: e => n(n => n.gt.ze = e),
warning: !0
}), de("div", {
className: "group " + (e.gt.ze ? "" : "hidden"),
children: de(Jr, {
id: "auto-melee",
label: "Auto Melee Attack",
checked: e.gt._n,
onChange: e => n(n => n.gt._n = e)
})
}), de(Qr, {
icon: Gr.Gr,
label: "Auto Switch",
enabled: e.Sn.ze,
onEnabledChange: e => n(n => n.Sn.ze = e)
}), de("div", {
className: "group " + (e.Sn.ze ? "" : "hidden"),
children: de(Jr, {
id: "useonegun",
label: "Single Weapon Mode",
checked: e.Sn.Nn,
onChange: e => n(n => n.Sn.Nn = e)
})
}), de(Qr, {
icon: Gr.Ur,
label: "Auto Fire",
enabled: e.kn.ze,
onEnabledChange: e => n(n => n.kn.ze = e)
}) ]
}), no = ({ao: e, io: n}) => de("div", {
className: "section",
children: [ de(Qr, {
icon: Gr.Vr,
label: "X-Ray Vision",
enabled: e.je.ze,
onEnabledChange: e => n(n => n.je.ze = e)
}), de("div", {
className: "group " + (e.je.ze ? "" : "hidden"),
children: [ de(Jr, {
id: "remove-ceilings",
label: "Remove Ceilings",
checked: e.je.Ae,
onChange: e => n(n => n.je.Ae = e)
}), de(Jr, {
id: "darker-smokes",
label: "Dark Smoke Mode",
checked: e.je.Oe,
onChange: e => n(n => n.je.Oe = e)
}), de(Yr, {
id: "smoke-opacity",
label: "Smoke Opacity",
value: e.je.Pe,
onChange: e => n(n => n.je.Pe = e)
}), de(Yr, {
id: "tree-opacity",
label: "Tree Opacity",
value: e.je.Re,
onChange: e => n(n => n.je.Re = e)
}) ]
}), de(Qr, {
icon: Gr.Yr,
label: "Layer Spoofer",
keybind: e.cr.hr,
keybindEditable: !0,
onKeybindChange: e => n(n => n.cr.hr = e),
enabled: e.lr.ze,
onEnabledChange: e => n(n => n.lr.ze = e)
}), de(Qr, {
icon: Gr.Zr,
label: "ESP",
enabled: e.Ue.ze,
onEnabledChange: e => n(n => n.Ue.ze = e)
}), de("div", {
className: "group " + (e.Ue.ze ? "" : "hidden"),
children: [ de(Jr, {
id: "visible-nametags",
label: "Always Show Names",
checked: e.Ue.Ge,
onChange: e => n(n => n.Ue.Ge = e)
}), de(Jr, {
id: "player-esp",
label: "Player Lines",
checked: e.Ue.Ve,
onChange: e => n(n => n.Ue.Ve = e)
}), de("div", {
className: "section-title",
style: {
marginTop: "0.5rem",
fontSize: "0.7rem",
background: "none",
border: "none",
padding: "0.25rem 0",
borderLeft: "2px solid #ff6b6b",
paddingLeft: "0.5rem"
},
children: "💣 Grenades"
}), de("div", {
className: "subgroup",
children: [ de(Jr, {
id: "grenade-esp",
label: "Explosions",
checked: e.Ue.Ze.Ye,
onChange: e => n(n => n.Ue.Ze.Ye = e)
}), de(Jr, {
id: "grenade-trajectory",
label: "Trajectory",
checked: e.Ue.Ze.Je,
onChange: e => n(n => n.Ue.Ze.Je = e)
}) ]
}), de("div", {
className: "section-title",
style: {
marginTop: "0.5rem",
fontSize: "0.7rem",
background: "none",
border: "none",
padding: "0.25rem 0",
borderLeft: "2px solid #ffd93d",
paddingLeft: "0.5rem"
},
children: "🔦 Flashlights"
}), de("div", {
className: "subgroup",
children: [ de(Jr, {
id: "own-flashlight",
label: "Own",
checked: e.Ue.et.tt,
onChange: e => n(n => n.Ue.et.tt = e)
}), de(Jr, {
id: "others-flashlight",
label: "Others",
checked: e.Ue.et.h,
onChange: e => n(n => n.Ue.et.h = e)
}), de(Jr, {
id: "flashlight-trajectory",
label: "Trajectory",
checked: e.Ue.et.Je,
onChange: e => n(n => n.Ue.et.Je = e)
}) ]
}) ]
}), de(Qr, {
icon: Gr.Jr,
label: "Infinite Zoom",
keybind: [ "Shift", "Scroll" ],
keybindMode: "multiple",
enabled: e.Cn.ze,
onEnabledChange: e => n(n => n.Cn.ze = e)
}) ]
}), to = ({title: e, color: n, children: t}) => de("div", {
style: {
marginBottom: "0.75rem"
},
children: [ de("div", {
style: {
fontSize: "0.7rem",
fontWeight: "700",
color: n,
textTransform: "uppercase",
letterSpacing: "0.05rem",
marginBottom: "0.4rem",
display: "flex",
alignItems: "center",
gap: "0.4rem"
},
children: [ de("span", {
style: {
width: "8px",
height: "8px",
borderRadius: "50%",
background: n,
boxShadow: `0 0 8px ${n}50`
}
}), e ]
}), de("div", {
style: {
display: "flex",
flexWrap: "wrap",
gap: "0.35rem"
},
children: t
}) ]
}), ro = ({ao: e, io: n}) => de("div", {
className: "section",
children: [ de(Qr, {
icon: Gr.Xr,
label: "Map Highlights",
enabled: e.wn.ze,
onEnabledChange: e => n(n => n.wn.ze = e)
}), de("div", {
className: "group " + (e.wn.ze ? "" : "hidden"),
children: de(Jr, {
id: "smaller-trees",
label: "Smaller Trees on Map",
checked: e.wn.xn,
onChange: e => n(n => n.wn.xn = e)
})
}), de(Qr, {
icon: Gr.Qr,
label: "Auto Loot",
enabled: e.Mn.ze,
onEnabledChange: e => n(n => n.Mn.ze = e)
}), de(Qr, {
icon: Gr.eo,
label: "Mobile Movement",
enabled: e.vn.ze,
onEnabledChange: e => n(n => n.vn.ze = e)
}), de("div", {
className: "group " + (e.vn.ze ? "" : "hidden"),
children: de(Yr, {
id: "mobile-movement-smooth",
label: "Smoothness",
value: e.vn.St,
onChange: e => n(n => n.vn.St = e)
})
}), de(Qr, {
icon: Gr.Gr,
label: "Weapon Switch",
enabled: e.zn.ze,
onEnabledChange: e => n(n => n.zn.ze = e)
}), de("div", {
className: "group " + (e.zn.ze ? "" : "hidden"),
style: {
maxHeight: "280px",
overflowY: "auto"
},
children: [ de(to, {
title: "Shotguns",
color: "#ff6b6b",
children: [ de(Jr, {
id: "ws-mp220",
label: "MP220",
checked: e.zn.jn,
onChange: e => n(n => n.zn.jn = e)
}), de(Jr, {
id: "ws-spas12",
label: "SPAS-12",
checked: e.zn.An,
onChange: e => n(n => n.zn.An = e)
}), de(Jr, {
id: "ws-m870",
label: "M870",
checked: e.zn.On,
onChange: e => n(n => n.zn.On = e)
}), de(Jr, {
id: "ws-saiga",
label: "Saiga-12",
checked: e.zn.Pn,
onChange: e => n(n => n.zn.Pn = e)
}), de(Jr, {
id: "ws-super90",
label: "Super 90",
checked: e.zn.Rn,
onChange: e => n(n => n.zn.Rn = e)
}), de(Jr, {
id: "ws-usas",
label: "USAS-12",
checked: e.zn.Tn,
onChange: e => n(n => n.zn.Tn = e)
}), de(Jr, {
id: "ws-m1100",
label: "M1100",
checked: e.zn.Ln,
onChange: e => n(n => n.zn.Ln = e)
}) ]
}), de(to, {
title: "Snipers",
color: "#00d4ff",
children: [ de(Jr, {
id: "ws-mosin",
label: "Mosin",
checked: e.zn.Dn,
onChange: e => n(n => n.zn.Dn = e)
}), de(Jr, {
id: "ws-sv98",
label: "SV-98",
checked: e.zn.En,
onChange: e => n(n => n.zn.En = e)
}), de(Jr, {
id: "ws-awc",
label: "AWM-S",
checked: e.zn.In,
onChange: e => n(n => n.zn.In = e)
}), de(Jr, {
id: "ws-scout",
label: "Scout",
checked: e.zn.Bn,
onChange: e => n(n => n.zn.Bn = e)
}), de(Jr, {
id: "ws-model94",
label: "Model 94",
checked: e.zn.Fn,
onChange: e => n(n => n.zn.Fn = e)
}), de(Jr, {
id: "ws-blr",
label: "BLR 81",
checked: e.zn.Wn,
onChange: e => n(n => n.zn.Wn = e)
}) ]
}), de(to, {
title: "DMRs",
color: "#ffd93d",
children: [ de(Jr, {
id: "ws-mk12",
label: "Mk 12",
checked: e.zn.Hn,
onChange: e => n(n => n.zn.Hn = e)
}), de(Jr, {
id: "ws-mk20",
label: "Mk 20",
checked: e.zn.Kn,
onChange: e => n(n => n.zn.Kn = e)
}), de(Jr, {
id: "ws-m39",
label: "M39 EMR",
checked: e.zn.$n,
onChange: e => n(n => n.zn.$n = e)
}), de(Jr, {
id: "ws-svd",
label: "SVD-63",
checked: e.zn.qn,
onChange: e => n(n => n.zn.qn = e)
}), de(Jr, {
id: "ws-garand",
label: "Garand",
checked: e.zn.Gn,
onChange: e => n(n => n.zn.Gn = e)
}) ]
}), de(to, {
title: "Pistols",
color: "#a29bfe",
children: [ de(Jr, {
id: "ws-ot38",
label: "OT-38",
checked: e.zn.Un,
onChange: e => n(n => n.zn.Un = e)
}), de(Jr, {
id: "ws-ots38",
label: "OTS-38",
checked: e.zn.Vn,
onChange: e => n(n => n.zn.Vn = e)
}), de(Jr, {
id: "ws-deagle",
label: "Deagle",
checked: e.zn.Yn,
onChange: e => n(n => n.zn.Yn = e)
}), de(Jr, {
id: "ws-m9",
label: "M9",
checked: e.zn.Zn,
onChange: e => n(n => n.zn.Zn = e)
}), de(Jr, {
id: "ws-m93r",
label: "M93R",
checked: e.zn.Jn,
onChange: e => n(n => n.zn.Jn = e)
}), de(Jr, {
id: "ws-m1911",
label: "M1911",
checked: e.zn.Xn,
onChange: e => n(n => n.zn.Xn = e)
}), de(Jr, {
id: "ws-p30l",
label: "P30L",
checked: e.zn.Qn,
onChange: e => n(n => n.zn.Qn = e)
}), de(Jr, {
id: "ws-flare",
label: "Flare",
checked: e.zn.er,
onChange: e => n(n => n.zn.er = e)
}), de(Jr, {
id: "ws-peace",
label: "Peacemaker",
checked: e.zn.tr,
onChange: e => n(n => n.zn.tr = e)
}) ]
}), de(to, {
title: "Other",
color: "#fd79a8",
children: [ de(Jr, {
id: "ws-groza",
label: "Groza",
checked: e.zn.nr,
onChange: e => n(n => n.zn.nr = e)
}), de(Jr, {
id: "ws-grozas",
label: "Groza-S",
checked: e.zn.rr,
onChange: e => n(n => n.zn.rr = e)
}), de(Jr, {
id: "ws-an94",
label: "AN-94",
checked: e.zn.ar,
onChange: e => n(n => n.zn.ar = e)
}), de(Jr, {
id: "ws-m1a1",
label: "M1A1",
checked: e.zn.ir,
onChange: e => n(n => n.zn.ir = e)
}) ]
}) ]
}) ]
}), oo = ({ao: e}) => de("div", {
className: "section help-section",
children: [ de("div", {
className: "help-title",
children: [ de(Rr, {
size: 16
}), de("span", {
children: "Controls"
}) ]
}), de("div", {
className: "help-panel",
style: {
marginBottom: "0.75rem"
},
children: [ de("div", {
style: {
display: "flex",
alignItems: "center",
marginBottom: "0.5rem"
},
children: [ de(Xr, {
keybind: e?.cr?.sr || "ShiftRight"
}), de("span", {
className: "keybind-description",
children: "Toggle Menu"
}) ]
}), de("p", {
className: "keybind-help-text",
children: "Show or hide the cheat menu at any time."
}) ]
}), de("div", {
className: "section-subtitle",
children: "Quick Toggles"
}), de("div", {
className: "help-panel",
children: de("div", {
className: "features-container",
children: [ de("div", {
className: "feature-item",
children: [ de("span", {
className: "feature-name",
children: "Aimbot"
}), de(Xr, {
keybind: e?.cr?.dr || "KeyB"
}) ]
}), de("div", {
className: "feature-item",
children: [ de("span", {
className: "feature-name",
children: "Sticky"
}), de(Xr, {
keybind: e?.cr?.ur || "KeyN"
}) ]
}), de("div", {
className: "feature-item",
children: [ de("span", {
className: "feature-name",
children: "Layer"
}), de(Xr, {
keybind: e?.cr?.hr || "KeyT"
}) ]
}) ]
})
}), de("div", {
className: "help-title",
children: [ de(Hr, {
size: 16
}), de("span", {
children: "Features"
}) ]
}), de("div", {
className: "help-panel",
children: de("p", {
className: "keybind-help-text",
style: {
lineHeight: "1.8"
},
children: [ "🎯 ", de("strong", {
style: {
color: "#00d4ff"
},
children: "Aimbot"
}), " - Auto aim at enemies", de("br", {}), "👁️ ", de("strong", {
style: {
color: "#00d4ff"
},
children: "ESP"
}), " - See players through walls", de("br", {}), "🔫 ", de("strong", {
style: {
color: "#00d4ff"
},
children: "Auto Fire"
}), " - Automatic shooting", de("br", {}), "🔄 ", de("strong", {
style: {
color: "#00d4ff"
},
children: "Auto Switch"
}), " - Quick weapon swap", de("br", {}), "📦 ", de("strong", {
style: {
color: "#00d4ff"
},
children: "Auto Loot"
}), " - Pick up items automatically", de("br", {}), "🔍 ", de("strong", {
style: {
color: "#00d4ff"
},
children: "X-Ray"
}), " - See through smoke & objects" ]
})
}), de("div", {
className: "help-title",
children: [ de($r, {
size: 16
}), de("span", {
children: "Credits"
}) ]
}), de("div", {
className: "credits-panel",
children: de("div", {
className: "credits-container",
children: [ de("div", {
className: "credit-item",
children: [ de("div", {
className: "credit-name",
children: "pirated.exe"
}), de("div", {
children: "Lead Developer"
}) ]
}), de("div", {
className: "credit-item",
children: [ de("div", {
className: "credit-name",
children: "SurvevHack"
}), de("div", {
children: "Team"
}) ]
}) ]
})
}) ]
}), lo = ({ao: e, io: n, oo: t, version: r}) => {
const [o, l] = $("help"), [a, i] = $({
x: 175,
y: 125
}), [c, s] = $(!1), [d, u] = $({
x: 0,
y: 0
}), h = q(null);
H(() => {
const e = e => {
if (c) {
const n = h.current;
if (!n) return;
const t = n.querySelector(".titlebar");
if (!t) return;
const r = t.getBoundingClientRect(), o = 100;
let l = e.clientX - d.x, a = e.clientY - d.y;
const c = 0, s = an.innerHeight - r.height;
l = Math.max(-(n.offsetWidth - o), Math.min(an.innerWidth - o, l)), a = Math.max(c, Math.min(s, a)), 
i({
x: l,
y: a
});
}
}, n = () => {
s(!1);
};
return c && (Reflect.apply(On, cn, [ "mousemove", e ]), Reflect.apply(On, cn, [ "mouseup", n ])), 
() => {
Reflect.apply(Rn, cn, [ "mousemove", e ]), Reflect.apply(Rn, cn, [ "mouseup", n ]);
};
}, [ c, d ]), H(() => {
const e = () => {
const e = h.current;
if (!e) return;
const n = e.querySelector(".titlebar");
if (!n) return;
const t = n.getBoundingClientRect(), r = -(e.offsetWidth - 100), o = an.innerWidth - 100, l = an.innerHeight - t.height;
i(e => ({
x: Math.max(r, Math.min(o, e.x)),
y: Math.max(0, Math.min(l, e.y))
}));
};
return Reflect.apply(On, an, [ "resize", e ]), () => {
Reflect.apply(Rn, an, [ "resize", e ]);
};
}, []);
const f = e => {
e.stopPropagation();
};
return de("div", {
id: "ui",
ref: h,
style: {
position: "fixed",
zIndex: "99999",
left: a.x + "px",
top: a.y + "px"
},
onClick: f,
onMouseDown: f,
onPointerDown: f,
onPointerUp: f,
onTouchStart: f,
onTouchEnd: f,
children: de("div", {
className: "popup",
children: [ de(Kr, {
onMouseDown(e) {
s(!0), u({
x: e.clientX - a.x,
y: e.clientY - a.y
});
},
version: r
}), de(Vr, {
activeTab: o,
onTabChange: l,
oo: t
}), de("div", {
className: "content-container " + (o ? "active" : ""),
children: (() => {
switch (o) {
case "main":
return de(eo, {
ao: e,
io: n
});

case "visuals":
return de(no, {
ao: e,
io: n
});

case "misc":
return de(ro, {
ao: e,
io: n
});

default:
return de(oo, {
ao: e,
io: n
});
}
})()
}) ]
})
});
}, ao = ({io: e}) => {
const [n, t] = $(!0), [r, o] = $({
x: 0,
y: 0
}), [l, a] = $(!1), [i, c] = $({
x: 0,
y: 0
}), s = q(null);
H(() => {
o({
x: an.innerWidth / 2 - 200,
y: an.innerHeight / 2 - 150
});
}, []);
const d = () => {
e(e => {
e.mr.pr = !0;
});
};
return H(() => {
const e = e => {
if (l) {
const n = s.current;
if (!n) return;
const t = n.querySelector(".titlebar");
if (!t) return;
const r = t.getBoundingClientRect(), l = 100;
let a = e.clientX - i.x, c = e.clientY - i.y;
const d = 0, u = an.innerHeight - r.height;
a = Math.max(-(n.offsetWidth - l), Math.min(an.innerWidth - l, a)), c = Math.max(d, Math.min(u, c)), 
o({
x: a,
y: c
});
}
}, n = () => {
a(!1);
};
return l && (Reflect.apply(On, cn, [ "mousemove", e ]), Reflect.apply(On, cn, [ "mouseup", n ])), 
() => {
Reflect.apply(Rn, cn, [ "mousemove", e ]), Reflect.apply(Rn, cn, [ "mouseup", n ]);
};
}, [ l, i, r ]), n ? de("div", {
id: "ui",
ref: s,
style: {
position: "fixed",
left: r.x + "px",
top: r.y + "px",
zIndex: "999999"
},
children: de("div", {
className: "popup",
style: {
width: "25rem"
},
children: [ de("div", {
className: "titlebar",
onMouseDown(e) {
a(!0), c({
x: e.clientX - r.x,
y: e.clientY - r.y
});
},
children: [ de("div", {
className: "title",
children: "New Discord Server!"
}), de("span", {
className: "credit",
children: "Join our community"
}), de("button", {
className: "close-btn",
onClick() {
d(), t(!1);
},
children: "×"
}) ]
}), de("div", {
style: {
padding: "1rem"
},
children: de("div", {
className: "discord-panel",
style: {
marginBottom: "0"
},
children: [ de("div", {
style: {
display: "flex",
marginBottom: "0.5rem"
},
children: [ de("svg", {
width: "16",
height: "16",
viewBox: "0 0 24 24",
fill: "currentColor",
style: {
width: "1rem",
height: "1rem",
color: "#5865F2"
},
children: de("path", {
d: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"
})
}), de("span", {
style: {
marginLeft: "0.375rem",
color: "#fff",
fontSize: "0.875rem",
fontWeight: 600
},
children: "We have a new Discord server!"
}) ]
}), de("p", {
style: {
color: "#bbb",
fontSize: "0.75rem",
lineHeight: 1.4,
marginBottom: "0.625rem",
flexGrow: 1
},
children: "Join our new official Discord server to stay updated, get support, and connect with the community. Don't miss out on announcements, updates, and exclusive features!"
}), de("a", {
href: "https://discord.gg/4tXaeQfur8",
target: "_blank",
rel: "noopener noreferrer",
className: "discord-link",
onClick() {
d(), t(!1), window.open("https://discord.gg/4tXaeQfur8", "_blank");
},
children: "Join Discord Server"
}) ]
})
}) ]
})
}) : null;
};

let io = null, co = null, so = () => {}, uo = "", ho = !1;

const fo = () => {
io && ho && io.render(de(lo, {
ao: Mn,
io: ue,
oo: () => so(!1),
version: uo
}));
};

let mo = !1;

console.log("🟢 LOADER.JS FILE LOADED"), console.log("🟢 ALL IMPORTS OK"), console.log("🟢 mapHighlights:", typeof h, h);

let po = !1, bo = {
x: 0,
y: 0
};

const go = {
lo: !1,
co: !1,
so: !1,
do: !1,
uo: 0
}, yo = () => {
n(xn.game, "init", {
apply(e, n, t) {
const r = Reflect.apply(e, n, t);
return (e => new Promise(n => {
function t(e) {
if (!e || "object" != typeof e || e instanceof Array) return null;
let n = {
h: 0,
m: 0,
p: 0,
_: 0,
v: 0
};
return new Set([ ...Object.keys(e), ...Object.getOwnPropertyNames(Object.getPrototypeOf(e) || {}) ]).forEach(t => {
let r = e[t];
Array.isArray(r) ? n._++ : "object" == typeof r && null !== r ? n.p++ : "function" == typeof r ? n.m++ : n.h++, 
n.v++;
}), Object.values(n).map(e => String.fromCharCode(97 + e)).join("");
}
function r() {
const e = Object.keys(o), n = Object.keys(En);
return e.every(e => n.includes(e));
}
const o = {
k: "10-7-0-0-17",
M: "21-20-11-1-53",
C: [ "7-9-1-0-17", "9-10-1-0-20", "10-11-1-0-22" ],
S: "9-9-3-1-22",
N: "1-7-1-2-11",
j: "0-4-1-1-6",
A: [ "1-19-5-1-26", "1-18-5-1-25" ],
O: "0-6-1-1-8",
P: "0-4-0-1-5",
R: "0-2-1-0-3",
T: "0-4-0-2-6",
L: "0-7-2-2-11",
D: "0-3-1-0-4",
I: "1-3-1-1-6",
B: "0-3-1-0-4",
F: "1-3-1-0-5",
W: [ "3-8-3-0-14", "5-8-3-0-16" ],
H: "51-64-87-2-204",
K: "1-28-5-4-38",
$: "",
q: "0-3-0-1-4",
G: "1-7-2-0-10",
U: "36-42-12-3-93",
V: "12-4-2-1-19",
Y: "52-40-44-3-139",
Z: "2-8-5-0-15",
J: "8-23-3-1-35",
X: "1-7-1-1-10",
ee: "2-8-1-1-12",
te: "4-28-6-1-39",
ne: "1-17-3-1-22",
re: "0-3-2-0-5",
oe: "3-5-1-1-10",
ae: "5-7-4-0-16",
ie: [ "21-11-3-1-36", "23-11-3-1-38" ],
le: "6-11-2-1-20",
ce: "6-6-5-0-17",
se: "",
de: "",
ue: "",
he: "",
fe: "",
me: "",
pe: "",
ge: "",
be: "",
ye: "",
_e: "",
ve: "",
ke: "",
we: "",
xe: "",
Me: "",
Ce: "",
Se: ""
}, l = {};
for (const [e, n] of Object.entries(o)) if ("" != n) if (n instanceof Array) n.forEach((e, t) => {
const r = e.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
n[t] = r;
}), l[e] = n; else {
const t = n.split("-").map(Number).map(e => String.fromCharCode(97 + e)).join("");
l[e] = t;
} else l[e] = "";
const a = setInterval(() => {
En = (() => {
function n(e, n) {
const r = t(e[n]);
if (r) for (const [e, t] of Object.entries(l)) o[e] || (t instanceof Array && t.some(e => e == r) && (o[e] = n), 
t == r && (o[e] = n));
}
if (!e || !e.game) return {};
const r = e.game, o = {
...En
};
for (const e in r) if (r.hasOwnProperty(e)) {
try {
r[e].hasOwnProperty("deadBodyPool") ? o.B = e : r[e].hasOwnProperty("airdropPool") && (o.D = e);
} catch {}
try {
if (r[e].hasOwnProperty("bones")) {
o.Y = e;
const t = new r[e].constructor;
for (const o in t) try {
n(r[e], o);
} catch {}
if (null != o.le && (o.we = Object.getOwnPropertyNames(r[e][o.le]).find(n => r[e][o.le][n] instanceof an.Array)), 
null != o.le && null != o.C) {
const n = Object.getOwnPropertyNames(r[e][o.le]), t = Object.getOwnPropertyNames(r[o.C]);
o.me = n.filter(e => t.includes(e)).find(n => "number" == typeof r[e][o.le][n]);
}
if (null == o.ie) continue;
if (null != o.Y) {
try {
r[o.Y].selectIdlePose.call({
[o.ie]: new Proxy({}, {
get(e, n) {
o.xe = n;
}
})
});
} catch {}
try {
r[o.Y].canInteract.call({
[o.ie]: new Proxy({}, {
get(e, n) {
o.Me = n;
}
})
});
} catch {}
}
(() => {
let e = !1, n = !1;
const r = [ null, null, e => o.se = e, e => o.he = e ], l = [ e => o.de = e, e => o.fe = e, null ], a = Object.getOwnPropertyNames(t.__proto__).find(e => 13 == t[e].length);
try {
t[a].call(new Proxy({}, {
get(e, n) {
return r.shift()?.(n), new Proxy({
x: 0,
y: 0
}, {
get(e, n) {
return e[n] || {
x: 0,
y: 0
};
}
});
},
set(n, t) {
return e && (e = !1, o.ue = t), l.shift()?.(t), !0;
}
}), null, {
getPlayerById() {}
}, null, {
isSoundPlaying: () => !1
}, null, {
isBindDown: () => (r.unshift(null, null, null, null, null), !1)
}, new Proxy({}, {
get(t, r) {
e = !0, n = !0;
}
}));
} catch {}
n || (o.ue = o.se);
})();
continue;
}
if (r[e].hasOwnProperty("triggerPing")) {
o.$ = e;
continue;
}
if (r[e].hasOwnProperty("mapTexture")) {
o.Ne = e;
continue;
}
if (r[e].hasOwnProperty("topLeft")) {
o.H = e, Object.getOwnPropertyNames(r[e]).forEach(n => {
"object" == typeof r[e][n] && null != r[e][n] && t(r[e][n]) == l.ce && (o.ce = n);
});
continue;
}
} catch {}
try {
n(r, e);
} catch (e) {}
}
try {
null != o.A && Object.getOwnPropertyNames(r[o.A].playerPool).forEach(e => {
Array.isArray(r[o.A].playerPool[e]) && (o.ge = e);
});
} catch {}
try {
null == o.be && (o.be = Object.getOwnPropertyNames(r.__proto__).filter(e => "function" == typeof r[e]).find(e => 3 == r[e].length));
} catch {}
try {
if (null != o.Ne && null != o.pe && null == o.ye) try {
r[o.Ne][o.pe].call(new Proxy({}, {
get(e, n) {
throw o.ye = n, null;
}
}));
} catch {}
} catch {}
try {
if (null != o.ye && null == o._e) {
const e = r[o.Ne][o.ye][o.ge], n = new Proxy({}, {
get(e, n) {
o._e = n;
}
});
e[0].render.call({}, n, n);
}
} catch {}
try {
if (null != o.$ && null == o.ve) {
let e = new r[o.$].constructor;
e.activePlayer = 1, e.emoteSelector.ping = "ping_danger", e.uiManager = {
getWorldPosFromMapPos() {}
}, e.camera = new Proxy({}, {
get(e, n) {
o.ve = n;
}
}), e.triggerPing();
}
} catch {}
try {
null != o.$ && null == o.pe && (o.pe = Object.getOwnPropertyNames(r[o.$].__proto__).find(e => 10 == r[o.$][e].length));
} catch {}
try {
null != o.M && null == o.ke && r[o.M].getAimMovement.call({}, {
[o.le]: new Proxy({}, {
get(e, n) {
o.ke = n;
}
})
});
} catch {}
try {
null != o.I && null == o.Ce && (o.Ce = Object.getOwnPropertyNames(e.game[o.I]).find(n => e.game[o.I][n] instanceof an.Array));
} catch {}
try {
null != o.G && null == o.Se && (f = Object.getOwnPropertyNames(e.game[o.G].__proto__).find(n => 4 == e.game[o.G][n].length), 
e.game[o.G][f].call(new Proxy(e.game[o.G], {
get(e, n) {
return e[n].bind(new Proxy({}, {
get(e, n) {
o.Se = n;
}
}));
}
})));
} catch {}
return o;
})(), r() && (clearInterval(a), n(En));
});
setTimeout(() => {
r() || (clearInterval(a), n(En));
}, 1e3);
}))(xn).then(() => {
po || (Fn.yr = xn.pixi.stage.constructor, Fn.br = xn.pixi.stage.children.find(e => e.lineStyle)?.constructor, 
Nt(), xn.pixi._ticker.add(s), xn.pixi._ticker.add(nr), (() => {
const e = () => {
(e => !!e && (Ot.zr || (Ot.zr = an.document.createElement("div"), Ot.zr.classList.add("aimbot-dot"), 
e.appendChild(Ot.zr)), Ot.jr || (Ot.jr = an.document.createElement("div"), Ot.jr.classList.add("aimbot-fov-circle"), 
e.appendChild(Ot.jr)), Ot.Te = !0, !0))(Cn) ? br || (xn.pixi._ticker.add(u), br = !0) : requestAnimationFrame(e);
};
e();
})(), xn.pixi._ticker.add(xr), Reflect.apply(On, an, [ "keydown", lt ]), Reflect.apply(On, an, [ "keyup", at ]), 
po = !0), Un || (xn.pixi._ticker.add(a), Un = !0), po = !0;
}), r;
}
}), (() => {
const e = Object.getOwnPropertyNames(xn.game.__proto__).find(e => "function" == typeof xn.game[e] && 3 === xn.game[e].length);
n(xn.game, e, {
apply(e, n, t) {
const [r, o] = t;
return 1 === r && (o.isMobile = Mn.Mn.ze), 3 === r && (e => {
for (const n of wn.pn) e.addInput(n);
wn.pn.length = 0;
})(o), o.inputs ? (l = o, tr && (l.shootStart = !0, l.shootHold = !0), (e => {
if (!Mn.vn.ze) return;
const n = (e.moveRight ? 1 : 0) + (e.moveLeft ? -1 : 0), t = (e.moveDown ? -1 : 0) + (e.moveUp ? 1 : 0);
if (0 !== n || 0 !== t) return e.touchMoveActive = !0, e.touchMoveLen = !0, bo.x += (n - bo.x) * Mn.vn.St / 1e3, 
bo.y += (t - bo.y) * Mn.vn.St / 1e3, e.touchMoveDir.x = bo.x, void (e.touchMoveDir.y = bo.y);
bo.x = 0, bo.y = 0;
})(o), (e => {
kn.mn && (e.touchMoveActive = !0, e.touchMoveLen = !0, e.touchMoveDir.x = kn.mn.x, 
e.touchMoveDir.y = kn.mn.y);
})(o), (e => {
if (!e) return;
const n = bt.Le, t = !!e.shootStart || !!e.shootHold || Array.isArray(e.inputs) && e.inputs.includes(In);
t && !go.do && Mn.ft.ze && (go.uo = 3), go.do = t, t || (go.uo = 0);
const r = go.uo > 0;
if (r && go.uo--, !(bt.Mr && "idle" !== n || r)) return go.lo && (e.shootStart = !0, 
go.co && (e.shootHold = !0, Array.isArray(e.inputs) && go.so && !e.inputs.includes(In) && e.inputs.push(In))), 
go.lo = !1, go.co = !1, go.so = !1, void (go.uo = 0);
let o = !1;
if (Array.isArray(e.inputs)) for (let n = e.inputs.length - 1; n >= 0; n -= 1) e.inputs[n] === In && (e.inputs.splice(n, 1), 
o = !0);
const l = !!e.shootStart, a = !!e.shootHold || o;
(l || a) && (e.shootStart = !1, e.shootHold = !1, go.lo = go.lo || l || a, go.co = go.co || a, 
go.so = go.so || o);
})(o), wn.Qe = o.toMouseLen, Reflect.apply(e, n, t)) : Reflect.apply(e, n, t);
var l;
}
});
})();
};

try {
Object.defineProperty(window, "console", {
value: new Proxy({}, {
get: () => () => {},
set: () => !0,
has: () => !0,
apply: () => () => {},
construct: () => ({})
}),
configurable: !1,
writable: !1
});
} catch (b) {}

try {
window.onerror = () => {};
} catch (b) {}

try {
window.onunhandledrejection = () => {};
} catch (b) {}

try {
window.onrejectionhandled = () => {};
} catch (b) {}

try {
window.onabort = () => {};
} catch (b) {}

try {
window.onunload = () => {};
} catch (b) {}

try {
window.onbeforeunload = () => {};
} catch (b) {}

try {
window.addEventListener("error", () => {}, !0), window.addEventListener("unhandledrejection", () => {}, !0), 
window.addEventListener("rejectionhandled", () => {}, !0), window.addEventListener("abort", () => {}, !0);
} catch (b) {}

try {
Object.defineProperty(window, "Error", {
value: void 0,
configurable: !1,
writable: !1
});
} catch (b) {}

try {
window.alert = () => {};
} catch (b) {}

try {
window.confirm = () => {};
} catch (b) {}

try {
window.prompt = () => {};
} catch (b) {}

try {
Object.freeze(window.console);
} catch (b) {}

try {
Object.freeze(window);
} catch (b) {}

(async () => {
(() => {
console.log("🟢 initialize() CALLED");
try {
const e = "surviv_config", n = an.localStorage.getItem(e);
if (n) {
const t = JSON.parse(n);
t.interpolation = !0, t.localRotation = !0, an.localStorage.setItem(e, JSON.stringify(t));
}
} catch {}
var t;
(() => {
if (mo) return;
mo = !0;
const n = () => (() => {
(async () => {
const e = [ {
name: Pn,
file: "GothamPro.woff2",
weight: 200,
style: "normal"
}, {
name: Pn,
file: "GothamPro-Italic.woff2",
weight: 200,
style: "italic"
}, {
name: Pn,
file: "GothamPro-Medium.woff2",
weight: 400,
style: "normal"
}, {
name: Pn,
file: "GothamPro-MediumItalic.woff2",
weight: 400,
style: "italic"
}, {
name: Pn,
file: "GothamPro-Bold.woff2",
weight: 600,
style: "normal"
} ].map(async e => {
try {
const n = new FontFace(e.name, `url(https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/${e.file})`, {
weight: "" + e.weight,
style: e.style
});
await n.load(), cn.fonts.add(n);
} catch {}
});
await Promise.all(e);
})();
const n = (() => {
Cn = sn;
const e = document.createElement("style");
return e.textContent = "#ui{--border-radius:0.5rem;--border-width:1px;--transition-duration:150ms;--primary-color:#00d4ff;--primary-glow:rgba(0, 212, 255, 0.4);--primary-dark:#00a8cc;--bg-dark:#0a0a0f;--bg-card:#12121a;--bg-hover:#1a1a25;--border-color:#1e1e2e;--text-primary:#ffffff;--text-secondary:#8888aa;--danger-color:#ff4757;--success-color:#00d4ff}*{font-family:GothamPro,'Segoe UI',sans-serif;box-sizing:border-box;margin:0;padding:0}:focus-visible{outline:0}.popup{user-select:none;position:relative;background:var(--bg-dark);border-radius:1rem;box-shadow:0 0 40px rgba(0,0,0,.8),0 0 20px rgba(0,212,255,.1),inset 0 1px 0 rgba(255,255,255,.05);width:22rem;overflow:hidden;border:var(--border-width) solid var(--border-color);backdrop-filter:blur(10px)}.titlebar{background:linear-gradient(180deg,#15151f 0,#0d0d14 100%);padding:.75rem 1rem;user-select:none;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;cursor:grab;border-bottom:1px solid var(--border-color)}.titlebar::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--primary-color),transparent);opacity:.8}.titlebar:active{cursor:grabbing}.menu-icon{width:1.25rem;height:1.25rem;color:var(--primary-color);filter:drop-shadow(0 0 8px var(--primary-glow));position:absolute;left:.75rem;top:50%;transform:translateY(-50%)}.version-text{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);font-size:.65rem;color:var(--text-secondary);background:rgba(0,212,255,.1);padding:.2rem .5rem;border-radius:.25rem;border:1px solid rgba(0,212,255,.2)}.update-available-text{font-size:.55rem;color:var(--primary-color);font-weight:600;animation:2s ease-in-out infinite glow-pulse}@keyframes glow-pulse{0%,100%{text-shadow:0 0 5px var(--primary-glow)}50%{text-shadow:0 0 15px var(--primary-glow),0 0 25px var(--primary-glow)}}.title{font-size:1.1rem;font-weight:700;color:var(--text-primary);text-transform:uppercase;letter-spacing:.15rem;text-shadow:0 0 10px var(--primary-glow)}.credit{font-size:.7rem;color:var(--text-secondary);margin-top:.15rem}.navbar{background:var(--bg-card);padding:.5rem;display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--border-color);position:relative}.nav-tabs{display:flex;gap:.25rem;background:var(--bg-dark);padding:.25rem;border-radius:.5rem}.nav-tab{padding:.5rem 1rem;background:0 0;border:none;border-radius:.375rem;color:var(--text-secondary);font-size:.75rem;font-weight:600;cursor:pointer;transition:all var(--transition-duration) ease;text-transform:uppercase;letter-spacing:.05rem}.nav-tab:hover{color:var(--text-primary);background:rgba(0,212,255,.1)}.nav-tab.active{color:var(--bg-dark);background:var(--primary-color);box-shadow:0 0 15px var(--primary-glow)}.close-btn{position:absolute;right:.5rem;cursor:pointer;border:none;background:rgba(255,71,87,.1);font-size:1rem;color:var(--danger-color);width:1.5rem;height:1.5rem;border-radius:.25rem;display:flex;align-items:center;justify-content:center;transition:all var(--transition-duration) ease}.close-btn:hover{background:var(--danger-color);color:#fff;box-shadow:0 0 10px rgba(255,71,87,.5)}.content-container{padding:0;max-height:0;opacity:0;overflow:hidden;transition:.3s ease-out}.content-container.active{max-height:60rem;opacity:1;padding:1rem}.section{margin-bottom:.5rem}.section:last-child{margin-bottom:0}.section-title{color:var(--text-primary);font-size:.8rem;font-weight:600;margin:0 0 .5rem;letter-spacing:.05rem;display:flex;justify-content:space-between;align-items:center;gap:.5rem;padding:.5rem .75rem;background:linear-gradient(90deg,rgba(0,212,255,.1) 0,transparent 100%);border-radius:.5rem;border-left:3px solid var(--primary-color)}.section-title svg{color:var(--primary-color);filter:drop-shadow(0 0 5px var(--primary-glow))}.section-title-container{flex-grow:1;text-transform:uppercase;letter-spacing:.05rem}.risky-label{color:var(--danger-color);font-size:.6rem;font-weight:700;padding:.15rem .4rem;background:rgba(255,71,87,.15);border-radius:.25rem;border:1px solid rgba(255,71,87,.3);animation:2s ease-in-out infinite danger-pulse}@keyframes danger-pulse{0%,100%{box-shadow:0 0 5px rgba(255,71,87,.3)}50%{box-shadow:0 0 15px rgba(255,71,87,.5)}}.group{display:flex;flex-direction:column;background:var(--bg-card);border-radius:.5rem;padding:.75rem;margin-bottom:.75rem;gap:.5rem;border:1px solid var(--border-color);max-height:25rem;opacity:1;overflow:hidden;transition:.25s ease-out}.group.hidden{max-height:0;opacity:0;padding:0 .75rem;margin-bottom:0;border-color:transparent}.subgroup{display:flex;flex-wrap:wrap;gap:.5rem;padding-left:.5rem;border-left:2px solid var(--border-color);margin-left:.25rem}.checkbox-item{display:inline-flex;align-items:center;padding:.4rem .6rem;border-radius:.375rem;transition:all var(--transition-duration) ease;cursor:pointer;width:fit-content;background:var(--bg-dark);border:1px solid var(--border-color)}.checkbox-item:hover{background:var(--bg-hover);border-color:rgba(0,212,255,.3)}.checkbox-item-label{color:var(--text-secondary);font-size:.75rem;cursor:pointer;margin-left:.5rem;transition:color var(--transition-duration) ease}.checkbox-item:hover .checkbox-item-label{color:var(--text-primary)}input[type=checkbox]{appearance:none;width:2.5rem;height:1.25rem;background:var(--bg-dark);border-radius:1rem;position:relative;cursor:pointer;border:2px solid var(--border-color);transition:all var(--transition-duration) ease}input[type=checkbox]::before{content:'';position:absolute;width:.85rem;height:.85rem;border-radius:50%;top:50%;left:.15rem;transform:translateY(-50%);background:linear-gradient(135deg,#666 0,#444 100%);transition:all var(--transition-duration) ease;box-shadow:0 2px 5px rgba(0,0,0,.3)}input[type=checkbox]:hover{border-color:rgba(0,212,255,.5)}input[type=checkbox]:checked{background:linear-gradient(90deg,var(--primary-dark) 0,var(--primary-color) 100%);border-color:var(--primary-color);box-shadow:0 0 15px var(--primary-glow)}input[type=checkbox]:checked::before{left:calc(100% - 1rem);background:linear-gradient(135deg,#fff 0,#ddd 100%);box-shadow:0 0 10px rgba(255,255,255,.5)}.slider-container{display:flex;align-items:center;justify-content:space-between;gap:.75rem}input[type=range]{appearance:none;width:6rem;height:.4rem;border-radius:.5rem;outline:0;cursor:pointer;background:var(--bg-dark)}input[type=range]::-webkit-slider-thumb{appearance:none;width:1rem;height:1rem;background:linear-gradient(135deg,var(--primary-color) 0,var(--primary-dark) 100%);border:none;border-radius:50%;cursor:pointer;box-shadow:0 0 10px var(--primary-glow);transition:all var(--transition-duration) ease}input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 0 20px var(--primary-glow)}input[type=range]::-webkit-slider-thumb:active{transform:scale(.95)}input[type=range]::-moz-range-thumb{width:1rem;height:1rem;background:linear-gradient(135deg,var(--primary-color) 0,var(--primary-dark) 100%);border:none;border-radius:50%;cursor:pointer;box-shadow:0 0 10px var(--primary-glow)}.keybind-slot{display:inline-flex;align-items:center;justify-content:center;gap:.25rem;padding:.3rem .6rem;background:var(--bg-dark);border:1px solid var(--border-color);border-radius:.375rem;font-size:.7rem;font-weight:600;color:var(--primary-color);text-transform:uppercase;letter-spacing:.05rem;transition:all var(--transition-duration) ease}.keybind-slot-editable{cursor:pointer}.keybind-slot-editable:hover{border-color:var(--primary-color);box-shadow:0 0 10px var(--primary-glow);background:rgba(0,212,255,.1)}.keybind-slot-waiting{animation:1s ease-in-out infinite keybind-waiting;border-color:var(--primary-color)}@keyframes keybind-waiting{0%,100%{box-shadow:0 0 5px var(--primary-glow)}50%{box-shadow:0 0 20px var(--primary-glow)}}.keybind-slot-container{display:inline-flex;align-items:center;gap:.25rem}.keybind-slot-separator{color:var(--text-secondary);font-size:.6rem}.keybind-pen-icon{width:.7rem;height:.7rem;opacity:.6}.help-section{font-size:.8rem}.help-title{color:var(--text-primary);font-size:.9rem;margin-bottom:.75rem;display:flex;align-items:center;gap:.5rem;font-weight:600;text-transform:uppercase;letter-spacing:.05rem}.help-title svg{color:var(--primary-color);filter:drop-shadow(0 0 5px var(--primary-glow))}.help-panel{background:var(--bg-card);border-radius:.5rem;padding:.75rem;margin-bottom:.75rem;border:1px solid var(--border-color)}.keybind-description{margin-left:.75rem;color:var(--text-primary);font-size:.8rem}.keybind-help-text{color:var(--text-secondary);font-size:.75rem;line-height:1.5;margin:0}.discord-panel{background:linear-gradient(135deg,rgba(88,101,242,.15) 0,rgba(88,101,242,.05) 100%);border-radius:.5rem;padding:.75rem;margin-bottom:.75rem;border:1px solid rgba(88,101,242,.3);display:flex;flex-direction:column}.discord-link{display:block;background:linear-gradient(90deg,#5865f2 0,#4752c4 100%);color:#fff;text-decoration:none;padding:.6rem;border-radius:.375rem;font-size:.8rem;text-align:center;font-weight:600;border:none;transition:all var(--transition-duration) ease;margin-top:auto;text-transform:uppercase;letter-spacing:.05rem}.discord-link:hover{box-shadow:0 0 20px rgba(88,101,242,.5);transform:translateY(-1px)}.credits-panel{background:var(--bg-card);border-radius:.5rem;padding:.75rem;border:1px solid var(--border-color)}.credits-container{display:flex;flex-wrap:wrap;gap:1rem;color:var(--text-secondary);font-size:.8rem}.credit-item{flex:1;min-width:7rem}.credit-name{font-weight:600;margin-bottom:.25rem;color:var(--primary-color)}.section-subtitle{color:var(--text-primary);font-size:.85rem;margin-bottom:.5rem;font-weight:600}.features-container{display:flex;flex-wrap:wrap;gap:.5rem}.feature-item{display:flex;align-items:center;gap:.5rem}.feature-name{color:var(--text-primary);font-size:.8rem}.aimbot-dot{position:fixed;width:.5rem;height:.5rem;border-radius:50%;background:var(--primary-color);border:2px solid rgba(255,255,255,.9);box-shadow:0 0 15px var(--primary-glow);transform:translate(-50%,-50%);pointer-events:none;display:none;z-index:2147483647}.aimbot-fov-circle{position:fixed;border-radius:50%;border:2px solid rgba(0,212,255,.3);background:rgba(0,212,255,.02);transform:translate(-50%,-50%);pointer-events:none;display:none;z-index:2147483646}.section-title .checkbox-item{border:none;background:0 0;padding:.25rem;margin:0}.section-title .checkbox-item:hover{background:rgba(0,212,255,.1);border-radius:.375rem}.section-title label{font-size:.7rem;color:var(--text-secondary)!important}.group::-webkit-scrollbar{width:4px}.group::-webkit-scrollbar-track{background:var(--bg-dark);border-radius:2px}.group::-webkit-scrollbar-thumb{background:var(--primary-color);border-radius:2px}.group::-webkit-scrollbar-thumb:hover{background:var(--primary-dark)}.community-container{display:flex;gap:.75rem;margin-bottom:.75rem}.website-panel{background:linear-gradient(135deg,rgba(0,212,255,.1) 0,rgba(0,212,255,.02) 100%);border-radius:.5rem;padding:.75rem;border:1px solid rgba(0,212,255,.2);flex:1;display:flex;flex-direction:column}.website-link{display:block;background:linear-gradient(90deg,var(--primary-color) 0,var(--primary-dark) 100%);color:var(--bg-dark);text-decoration:none;padding:.6rem;border-radius:.375rem;font-size:.8rem;text-align:center;font-weight:700;border:none;transition:all var(--transition-duration) ease;margin-top:auto;text-transform:uppercase;letter-spacing:.05rem}.website-link:hover{box-shadow:0 0 20px var(--primary-glow);transform:translateY(-1px)}li::marker{color:var(--primary-color)}".replace(/GothamPro/g, Pn), 
sn.appendChild(e), sn;
})(), t = (e => {
const n = document.createElement("div");
return e.appendChild(n), io = rn.createRoot(n), n;
})(n);
(e => {
const n = document.createElement("div");
e.appendChild(n), co = rn.createRoot(n);
})(n), (e => {
Reflect.apply(On, an, [ "keydown", n => {
if (n.code === Mn.cr.sr) {
const n = e.querySelector("#ui");
if (!n) return;
return n.style.display = "none" === n.style.display ? "" : "none", void (so = e => {
n && (n.style.display = e ? "" : "none");
});
}
n.code !== Mn.cr.dr || (Mn.ft.ze = !Mn.ft.ze, fo());
} ]);
})(t), (e => {
so = n => {
const t = e.querySelector("#ui");
t && (t.style.display = n ? "" : "none");
};
})(t), (() => {
const n = JSON.parse;
setTimeout(() => {
try {
const t = (() => {
const e = (() => {
const e = cn.cookie;
if (!e) return null;
const n = vn + "=", t = e.split(";");
for (const e of t) {
const t = e.trim();
if (t.startsWith(n)) return t.slice(9);
}
return null;
})();
return e ? (e => {
if ("string" != typeof e || e.length % 4 != 0) return null;
let n = "";
for (let t = 0; e.length > t; t += 4) {
const r = e.slice(t, t + 4), o = Number.parseInt(r, 16);
if (Number.isNaN(o)) return null;
n += String.fromCharCode(o);
}
return n;
})(e) : null;
})();
if (null != t) {
const r = e(t), o = n(r);
Mn._deserialize(o);
}
} catch {} finally {
Sn = !0, ho = !0, fo(), co && ho && !0 !== Mn.mr.pr && co.render(de(ao, {
ao: Mn,
io: ue
}));
}
}, 1e3);
})(), dn.then(e => {
uo = "3.2.0" + ("3.2.0" !== e.tag_name ? " update available!" : ""), ho && fo();
}).catch(() => {
uo = "3.2.0", ho && fo();
});
})();
"loading" === cn.readyState ? Reflect.apply(On, cn, [ "DOMContentLoaded", n ]) : n();
})(), console.log("🟢 initUI done, calling loadStaticPlugins"), (() => {
if (un) return;
un = !0;
const e = setInterval(() => {
an.document.querySelector("#ui-health-actual") && (clearInterval(e), setInterval(hn, 100), 
console.log("🟢 HealthDisplay initialized"));
}, 500);
})(), Reflect.apply(On, an, [ "wheel", Zn, Yn ]), rr(), Reflect.apply(On, an, [ "mousedown", or ]), 
Reflect.apply(On, an, [ "mouseup", lr ]), (() => {
if (Jn) return;
Jn = !0;
const e = setInterval(() => {
xn?.pixi?._ticker && (clearInterval(e), xn.pixi._ticker.add(Vn));
}, 100);
})(), bn || (bn = !0, mn(), an.document.querySelectorAll("script").forEach(e => {
const n = e.src?.toLowerCase() || "";
(n.includes("ads") || n.includes("adserver") || n.includes("doubleclick") || n.includes("googlesyndication") || n.includes("adservice") || n.includes("pagead")) && e.remove();
}), pn(), new MutationObserver(() => {
mn(), pn();
}).observe(an.document.body, {
childList: !0,
subtree: !0
}), setInterval(() => {
mn(), pn();
}, 2e3)), console.log("🟢 loadStaticPlugins done"), t = yo, n(an.Function.prototype, "call", {
apply(e, n, r) {
try {
null != r[0]?.nameInput && null != r[0]?.game && (an.Function.prototype.call = e, 
xn = r[0], t());
} catch {}
return Reflect.apply(e, n, r);
}
});
})();
})();