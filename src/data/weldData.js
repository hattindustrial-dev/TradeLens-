export const WELD_TYPES = [
  {
    id: 'fillet',
    label: 'Fillet',
    desc: 'Triangle cross-section at joint',
    dims: { size: true, length: true, pitch: true, angle: false, root: false },
  },
  {
    id: 'vgroove',
    label: 'V-Groove',
    desc: 'Full-penetration V preparation',
    dims: { size: true, length: true, pitch: false, angle: true, root: true },
  },
  {
    id: 'bevel',
    label: 'Bevel Groove',
    desc: 'Single-bevel, one side prepared',
    dims: { size: true, length: true, pitch: false, angle: true, root: true },
  },
  {
    id: 'square',
    label: 'Square Groove',
    desc: 'No bevel prep, butt joint',
    dims: { size: false, length: true, pitch: false, angle: false, root: true },
  },
  {
    id: 'ugroove',
    label: 'U-Groove',
    desc: 'Curved U preparation, both sides',
    dims: { size: true, length: true, pitch: false, angle: true, root: true },
  },
  {
    id: 'jgroove',
    label: 'J-Groove',
    desc: 'Curved J prep, one side',
    dims: { size: true, length: true, pitch: false, angle: true, root: true },
  },
  {
    id: 'flarev',
    label: 'Flare-V',
    desc: 'Between two curved surfaces',
    dims: { size: true, length: true, pitch: false, angle: false, root: false },
  },
  {
    id: 'flarebevel',
    label: 'Flare-Bevel',
    desc: 'Curved surface meets flat',
    dims: { size: true, length: true, pitch: false, angle: false, root: false },
  },
  {
    id: 'plug',
    label: 'Plug',
    desc: 'Fill a hole drilled in one member',
    dims: { size: true, length: false, pitch: true, angle: true, root: false },
  },
  {
    id: 'slot',
    label: 'Slot',
    desc: 'Fill a slot in one member',
    dims: { size: true, length: true, pitch: true, angle: false, root: false },
  },
  {
    id: 'spot',
    label: 'Spot',
    desc: 'Fusion spot between lapped members',
    dims: { size: true, length: false, pitch: true, angle: false, root: false },
  },
  {
    id: 'seam',
    label: 'Seam',
    desc: 'Continuous spot-type weld',
    dims: { size: true, length: true, pitch: true, angle: false, root: false },
  },
  {
    id: 'surfacing',
    label: 'Surfacing',
    desc: 'Build-up or hardfacing overlay',
    dims: { size: true, length: false, pitch: false, angle: false, root: false },
  },
];

export const SIDES = [
  {
    id: 'arrow',
    label: 'Arrow Side',
    desc: 'Symbol below reference line',
    note: 'Weld the side the arrow points to',
  },
  {
    id: 'other',
    label: 'Other Side',
    desc: 'Symbol above reference line',
    note: 'Weld the far side from the arrow',
  },
  {
    id: 'both',
    label: 'Both Sides',
    desc: 'Symbols on both sides of line',
    note: 'Weld both sides of the joint',
  },
];

export const SUPPLEMENTARY = [
  {
    id: 'allaround',
    label: 'All-Around',
    desc: 'Circle at arrow junction — weld runs all the way around',
    code: '○',
  },
  {
    id: 'field',
    label: 'Field Weld',
    desc: 'Flag symbol — do not weld in shop, weld on site',
    code: '⚑',
  },
  {
    id: 'backing',
    label: 'Backing Bar',
    desc: 'Backing strip required at root before welding',
    code: 'B',
  },
  {
    id: 'meltthrough',
    label: 'Melt-Through',
    desc: 'Filled circle — root must fully penetrate far side',
    code: '●',
  },
  {
    id: 'spacer',
    label: 'Spacer',
    desc: 'Spacer strip required at root of joint',
    code: '═',
  },
];

export const CONTOURS = [
  { id: 'none', label: 'None', desc: 'No contour specified' },
  { id: 'flush', label: 'Flush', desc: 'Flat — level with base metal surface' },
  { id: 'convex', label: 'Convex', desc: 'Crowned — raised above surface' },
  { id: 'concave', label: 'Concave', desc: 'Hollow — slightly below surface' },
];

export const FINISHES = [
  { id: 'none', label: 'None', desc: 'No finish method required' },
  { id: 'G', label: 'Grind', desc: 'Angle grinder or flap disc' },
  { id: 'M', label: 'Machine', desc: 'Mill, lathe, or planer' },
  { id: 'C', label: 'Chip', desc: 'Chipping hammer or needle gun' },
  { id: 'R', label: 'Roll', desc: 'Peening or rolling' },
  { id: 'H', label: 'Hammer', desc: 'Hammer peening' },
];

export const STANDARDS = [
  {
    id: 'CWB',
    label: 'CWB / CSA',
    desc: 'CSA W59 — Canadian standard',
    defaultUnit: 'mm',
  },
  {
    id: 'AWS',
    label: 'AWS',
    desc: 'AWS D1.1 — American standard',
    defaultUnit: 'in',
  },
];
