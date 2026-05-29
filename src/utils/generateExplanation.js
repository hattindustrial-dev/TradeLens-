const TYPE_NAMES = {
  fillet: 'fillet weld',
  vgroove: 'V-groove weld',
  bevel: 'bevel groove weld',
  square: 'square groove weld',
  ugroove: 'U-groove weld',
  jgroove: 'J-groove weld',
  flarev: 'flare-V groove weld',
  flarebevel: 'flare-bevel groove weld',
  plug: 'plug weld',
  slot: 'slot weld',
  spot: 'spot weld',
  seam: 'seam weld',
  surfacing: 'surfacing (overlay) weld',
};

const SIDE_TEXT = {
  arrow: 'on the arrow side of the joint',
  other: 'on the far (other) side of the joint',
  both: 'on both sides of the joint',
};

const CONTOUR_TEXT = {
  flush: 'flush with the base metal',
  convex: 'convex (slightly crowned)',
  concave: 'concave (slightly hollow)',
};

const FINISH_TEXT_CWB = {
  G: 'grinding',
  M: 'machining',
  C: 'chipping',
  R: 'rolling',
  H: 'hammer peening',
};

const FINISH_TEXT_AWS = { ...FINISH_TEXT_CWB };

const GROOVE_TYPES = ['vgroove', 'bevel', 'square', 'ugroove', 'jgroove', 'flarev', 'flarebevel'];
const CJP_TYPES = ['vgroove', 'bevel', 'ugroove', 'jgroove'];

export function generateExplanation(state, standard) {
  const {
    weldType,
    side,
    size,
    length,
    pitch,
    angle,
    rootOpening,
    supplementary = [],
    contour,
    finish,
    unit,
  } = state;

  if (!weldType || !side) {
    return 'Select a weld type and side to generate an explanation.';
  }

  const u = unit === 'mm' ? ' mm' : '"';
  const isCWB = standard === 'CWB';
  const finishText = isCWB ? FINISH_TEXT_CWB : FINISH_TEXT_AWS;
  const sentences = [];

  // --- Intro: weld type + size + side ---
  let intro = 'Install a';
  if (size) intro += ` ${size}${u}`;
  intro += ` ${TYPE_NAMES[weldType] || weldType} ${SIDE_TEXT[side]}.`;
  sentences.push(intro);

  // --- Groove prep ---
  if (GROOVE_TYPES.includes(weldType)) {
    const details = [];
    if (angle) details.push(`${angle}° included angle`);
    if (rootOpening) details.push(`${rootOpening}${u} root opening`);

    if (details.length > 0) {
      sentences.push(`Joint preparation: ${details.join(', ')}.`);
    }

    if (CJP_TYPES.includes(weldType)) {
      sentences.push(
        isCWB
          ? 'Complete joint penetration (CJP) is required — weld the full depth of the joint per CSA W59.'
          : 'Complete joint penetration (CJP) is required per AWS D1.1 unless otherwise noted.'
      );
    }
  }

  // --- Plug/slot specifics ---
  if (weldType === 'plug') {
    if (size) sentences.push(`Hole diameter: ${size}${u}.`);
    if (angle) sentences.push(`Hole wall taper angle: ${angle}°.`);
    sentences.push('Fill the hole flush with the surface unless depth is specified.');
  }
  if (weldType === 'slot') {
    if (size) sentences.push(`Slot width: ${size}${u}.`);
    sentences.push('Fill the slot to the specified depth or flush with the surface.');
  }

  // --- Spot/seam ---
  if (weldType === 'spot' && size) {
    sentences.push(
      isCWB
        ? `Weld nugget diameter: ${size}${u}.`
        : `Minimum shear strength or weld nugget diameter: ${size}${u}.`
    );
  }

  // --- Surfacing ---
  if (weldType === 'surfacing') {
    if (size) sentences.push(`Overlay thickness (after finishing): ${size}${u}.`);
    sentences.push('Apply weld metal to restore dimension, increase hardness, or add wear/corrosion resistance.');
  }

  // --- Length and pitch ---
  if (weldType !== 'plug' && weldType !== 'spot' && weldType !== 'surfacing') {
    if (length && pitch) {
      const sep = isCWB ? 'centre-to-centre' : 'center-to-center';
      sentences.push(`Intermittent welds: ${length}${u} long, ${pitch}${u} ${sep} spacing.`);
    } else if (length) {
      sentences.push(`Weld length: ${length}${u}.`);
    } else {
      sentences.push('Weld continuously for the full joint length unless otherwise noted.');
    }
  } else if (weldType === 'plug' && pitch) {
    const sep = isCWB ? 'centre-to-centre' : 'center-to-center';
    sentences.push(`Plug spacing: ${pitch}${u} ${sep}.`);
  } else if (weldType === 'spot' && pitch) {
    const sep = isCWB ? 'centre-to-centre' : 'center-to-center';
    sentences.push(`Spot spacing: ${pitch}${u} ${sep}.`);
  }

  // --- Contour + finish ---
  if (contour && contour !== 'none') {
    let cStr = `Finish the weld face ${CONTOUR_TEXT[contour]}`;
    if (finish && finish !== 'none') {
      cStr += ` by ${finishText[finish]}`;
    }
    cStr += '.';
    sentences.push(cStr);
  } else if (finish && finish !== 'none') {
    sentences.push(`Finish the weld surface by ${finishText[finish]}.`);
  }

  // --- Supplementary symbols ---
  if (supplementary.includes('allaround')) {
    sentences.push(
      'All-around symbol: this weld runs completely around the perimeter of the joint without interruption.'
    );
  }
  if (supplementary.includes('field')) {
    sentences.push(
      isCWB
        ? 'Field weld — do not complete in the fabrication shop. Weld on site during erection or installation.'
        : 'Field weld — complete at the job site, not in the fabrication shop.'
    );
  }
  if (supplementary.includes('backing')) {
    sentences.push(
      isCWB
        ? 'A backing bar (backing strip) is required. Install at the root face before welding. Specify removal separately if required.'
        : 'Backing (B) required. Install backing material at the root prior to welding. Removal specified separately.'
    );
  }
  if (supplementary.includes('meltthrough')) {
    sentences.push(
      'Melt-through required — the weld root must fully penetrate and produce visible root reinforcement on the far side. Verify by visual inspection.'
    );
  }
  if (supplementary.includes('spacer')) {
    sentences.push('A spacer strip is required at the root of the joint before welding. Remove after weld cools unless specified to remain.');
  }

  // --- Standard footer ---
  sentences.push(
    isCWB
      ? 'Verify WPS qualification and welder certification per CWB / CSA W47.1 and CSA W59.'
      : 'Verify WPS and welder qualification per AWS D1.1 and applicable code.'
  );

  return sentences.join(' ');
}

export function buildSummary(state, standard) {
  const {
    weldType,
    side,
    size,
    length,
    pitch,
    angle,
    rootOpening,
    supplementary = [],
    contour,
    finish,
    unit,
  } = state;

  const u = unit === 'mm' ? ' mm' : '"';
  const rows = [];

  if (weldType) rows.push({ label: 'Weld Type', value: TYPE_NAMES[weldType] });
  if (side) rows.push({ label: 'Side', value: SIDE_TEXT[side] });
  if (size) rows.push({ label: 'Size', value: `${size}${u}` });
  if (length) rows.push({ label: 'Length', value: `${length}${u}` });
  if (pitch) rows.push({ label: 'Pitch', value: `${pitch}${u}` });
  if (angle) rows.push({ label: 'Groove Angle', value: `${angle}°` });
  if (rootOpening) rows.push({ label: 'Root Opening', value: `${rootOpening}${u}` });
  if (contour && contour !== 'none') rows.push({ label: 'Contour', value: contour });
  if (finish && finish !== 'none') rows.push({ label: 'Finish', value: finish });
  if (supplementary.length > 0) {
    rows.push({
      label: 'Supplementary',
      value: supplementary.join(', '),
    });
  }
  rows.push({ label: 'Standard', value: standard === 'CWB' ? 'CWB / CSA W59' : 'AWS D1.1' });

  return rows;
}
