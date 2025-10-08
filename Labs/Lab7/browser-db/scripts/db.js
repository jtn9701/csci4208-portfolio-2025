let _adapter = null;
let _doc = null;

// choose storage engine
export function useAdapter(adapter) {
  _adapter = adapter;
}

// ID generator
export const uid = () => crypto.randomUUID().slice(0, 8);

/* =========================
Scaffold & Boot
========================= */

// load the app document via the adapter and cache it
export async function boot() {
  if (!_adapter) throw new Error("No adapter set. Call useAdapter(...) first.");
  _doc = await _adapter.load();
  return _doc;
}

/* =========================
CREATE
========================= */
// insert a new record into collection `col`
export async function insertOne(col, data) {
  const d = getDoc();
  const rec = { id: uid(), ...data };
  d[col].push(rec);
  await _adapter.save(d);
  _doc = d;
  return rec;
}

/* =========================
READ
========================= */
// get a safe copy of the cached doc
export function getDoc() {
  // Return a safe copy so callers can't mutate the cached doc directly
  return structuredClone(_doc);
}

// read many
export function findMany(col, pred = () => true) {
  return getDoc()[col].filter(pred);
}

// read one
export function findOne(col, pred) {
  return getDoc()[col].find(pred) || null;
}

/* =========================
UPDATE
========================= */
// apply shallow patch; arrays are replaced
export async function updateOne(col, id, patch) {
  const d = getDoc();
  const i = d[col].findIndex((r) => r.id === id);
  if (i === -1) return 0;
  d[col][i] = { ...d[col][i], ...patch };
  await _adapter.save(d);
  _doc = d;
  return 1;
}

/* =========================
DELETE
========================= */
export async function deleteOne(col, id) {
  const d = getDoc();
  const before = d[col].length;
  d[col] = d[col].filter((r) => r.id !== id);
  const deleted = before - d[col].length;
  if (deleted) {
    await _adapter.save(d);
    _doc = d;
  }
  return deleted; // 0 or 1
}
