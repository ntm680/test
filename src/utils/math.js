/**
 * Les opérations vectorielles 2D (v2) sont optimisées pour la performance.
 * Les fonctions se terminant par 'Mut' (Mutable) modifient directement le premier argument (le vecteur 'a').
 * Cela réduit considérablement les allocations de mémoire (moins de travail pour le Garbage Collector).
 */
export const v2 = {
  // --- Fonctions de base et de création ---

  /** Crée un nouveau vecteur {x, y}. */
  create: (x, y) => ({ x, y }),

  /** Copie les valeurs de 'v' dans 'out'. Si 'out' n'est pas fourni, un nouveau vecteur est créé. */
  copy: (v, out = v2.create(0, 0)) => {
    out.x = v.x;
    out.y = v.y;
    return out;
  },

  /** Produit scalaire (Dot product). */
  dot: (a, b) => a.x * b.x + a.y * b.y,

  /** Longueur au carré. */
  lengthSqr: (v) => v.x * v.x + v.y * v.y,

  /** Longueur réelle. */
  length: (v) => Math.sqrt(v2.lengthSqr(v)),

  // --- Fonctions Mutables (Utilisées pour les calculs internes) ---

  /** Ajoute b à a, stockant le résultat dans 'a'. */
  addMut: (a, b) => {
    a.x += b.x;
    a.y += b.y;
    return a;
  },

  /** Soustrait b de a, stockant le résultat dans 'a'. */
  subMut: (a, b) => {
    a.x -= b.x;
    a.y -= b.y;
    return a;
  },

  /** Multiplie a par un scalaire 's', stockant le résultat dans 'a'. */
  mulScalarMut: (a, s) => {
    a.x *= s;
    a.y *= s;
    return a;
  },

  /** Normalise a (le rend de longueur 1), stockant le résultat dans 'a'. */
  normalizeMut: (a) => {
    const len = v2.length(a);
    if (len > 0.0001) {
      a.x /= len;
      a.y /= len;
    } else {
      a.x = 0;
      a.y = 0;
    }
    return a;
  },

  // --- Fonctions d'utilité (Immuables) ---

  /** Calcule le vecteur perpendiculaire à 'v' (crée un nouveau vecteur). */
  perp: (v) => ({ x: -v.y, y: v.x }),

  easeOutCubic: (t) => 1 - (1 - t) ** 3,
  clamp01: (value) => Math.max(0, Math.min(1, value)),
};

// --- Variables temporaires pour les calculs internes de collision ---
// Ces variables sont réutilisées par les fonctions de collision pour éviter les allocations.
const tempV1 = v2.create(0, 0);
const tempV2 = v2.create(0, 0);
const tempV3 = v2.create(0, 0);


/**
 * Outils de collision pour les tests Segment vs Collider.
 */
export const collisionHelpers = {
  /**
   * Teste l'intersection d'un segment [a, b] avec une AABB (boîte alignée sur les axes) [min, max].
   */
  intersectSegmentAABB: (a, b, min, max) => {
    const dir = v2.subMut(v2.copy(b, tempV1), a); // dir = b - a
    const invDir = { x: 1 / dir.x, y: 1 / dir.y };

    const t1 = (min.x - a.x) * invDir.x;
    const t2 = (max.x - a.x) * invDir.x;
    const t3 = (min.y - a.y) * invDir.y;
    const t4 = (max.y - a.y) * invDir.y;

    const tmin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
    const tmax = Math.min(Math.max(t1, t2), Math.max(t3, t4));

    if (tmax < 0 || tmin > tmax || tmin > 1) return null;

    const t = Math.max(0, tmin);

    // point = a + dir * t
    const point = v2.addMut(v2.copy(a, tempV2), v2.mulScalarMut(v2.copy(dir, tempV3), t));

    const center = v2.mulScalarMut(v2.addMut(v2.copy(min, tempV1), max), 0.5);
    const extent = v2.mulScalarMut(v2.subMut(v2.copy(max, tempV2), min), 0.5);
    const localPt = v2.subMut(v2.copy(point, tempV3), center);

    let normal;
    const dx = Math.abs(Math.abs(localPt.x) - extent.x);
    const dy = Math.abs(Math.abs(localPt.y) - extent.y);

    if (dx < dy) {
      normal = { x: localPt.x > 0 ? 1 : -1, y: 0 };
    } else {
      normal = { x: 0, y: localPt.y > 0 ? 1 : -1 };
    }

    // NOTE: Les résultats (point, normal) sont des NOUVEAUX objets ici car ils sont retournés à l'appelant.
    return { point: v2.copy(point), normal };
  },

  /**
   * Teste l'intersection d'un segment [a, b] avec un cercle [pos, rad].
   */
  intersectSegmentCircle: (a, b, pos, rad) => {
    const d = v2.subMut(v2.copy(b, tempV1), a); // d = b - a
    const f = v2.subMut(v2.copy(a, tempV2), pos); // f = a - pos

    const aa = v2.dot(d, d);
    const bb = 2 * v2.dot(f, d);
    const c = v2.dot(f, f) - rad * rad;

    let discriminant = bb * bb - 4 * aa * c;
    if (discriminant < 0) return null;

    discriminant = Math.sqrt(discriminant);
    const t1 = (-bb - discriminant) / (2 * aa);
    const t2 = (-bb + discriminant) / (2 * aa);

    let t = -1;
    if (t1 >= 0 && t1 <= 1) t = t1;
    else if (t2 >= 0 && t2 <= 1) t = t2;

    if (t < 0) return null;

    // point = a + d * t
    const point = v2.addMut(v2.copy(a, tempV3), v2.mulScalarMut(v2.copy(d, tempV1), t));

    // normal = normalize(point - pos)
    const normal = v2.normalizeMut(v2.subMut(v2.copy(point, tempV2), pos));

    // NOTE: Les résultats (point, normal) sont des NOUVEAUX objets ici car ils sont retournés.
    return { point: v2.copy(point), normal: v2.copy(normal) };
  },

  /**
   * Fonction d'interface pour tester l'intersection avec n'importe quel collider.
   */
  intersectSegment: (collider, a, b) => {
    if (!collider) return null;

    if (collider.type === 1) { // Boîte (AABB)
      return collisionHelpers.intersectSegmentAABB(a, b, collider.min, collider.max);
    } else if (collider.type === 0) { // Cercle
      return collisionHelpers.intersectSegmentCircle(a, b, collider.pos, collider.rad);
    }

    return null;
  },
};

/**
 * Utilité pour les filtres de calque (layers).
 */
export const sameLayer = (a, b) => {
  return (a & 0x1) === (b & 0x1) || (a & 0x2 && b & 0x2);
};