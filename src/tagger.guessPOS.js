function guessPOS(input) {
  /// GUESS PART OF SPEECH: not a good thingy but... ~(-.-)~

  function guessPOSFromSuffix(word) {
    // RIGHT: really, clockwise, forward, always
    // WRONG: reply
    if (/\w(ly|wise|ward|ways)$/.test(word)) return 'ADV';

    // RIGHT: summarize, summarise, unify, terminate, fade, send, darken
    // WRONG: size, vise, comfy, gate, salade
    if (/\w(ize|ise|fy|ate|ade|end|en)$/.test(word)) return 'V';

    // RIGHT: Canada, emo, alibi, action, pression, statement, fitness, totalitarianism,
    //        calamity, bakery, maniac, dependence, lactase, attitude, technique, face
    // WRONG: overdo, mini, avoid, increment, harness, fruity, very, erase
    if (/\w(a|o|i|tion|sion|ment|ness|ism|ity|ery|ac|nce|ase|itude|ure|que|ace)$/.test(word)) return 'N';

    // politics, biology, telepathy, psychiatry, hologram, holograph, bibliography, microphage (sci stuff)
    if (/\w(ics|logy|pathy|iatry|gram|graph|graphy|phage|phagy|metry|gen|ium|one)$/.test(word)) return 'N';

    // catwoman, hardship, childhood, kingdom, stylometer, sociopath, analysis, stage
    if (/(man|ship|hood|dom|meter|path|sis|age)$/.test(word)) return 'N';

    // RIGHT: racist, actress, actor, doer, employee, showoff
    // WRONG: resist, caress, for, better, see
    if (/\w(ist|ess|or|er|ee|off)$/.test(word)) return 'N'; // (like agents)

    // RIGHT: lovable, edible, malicious, selfish, talkative, hopeless, useful, fearsome, 
    //        tax-free, uniform, human-like, poetic, central, unefficient, wasted, foxy
    // WRONG: bible, bless, give, vanish, steal, inform, cry
    if (/\w(able|ible|ous|ish|ive|less|ful|some|free|form|like|ic|al|ent|ed|y)$/.test(word)) return 'ADJ';

    if (/ing$/.test(word)) return 'GERUND'; // interesting, swimming

    return '*';
  }

  function guessPOSFromPrefix(word) {
    if (/^(half|semi)/.test(word)) return 'ADJ'; // half-awake, semi-open
    if (/^(well)/.test(word)) return 'ADV'; // well-formed
    if (/^([A-Z]|anti|mini|bio)/.test(word)) return 'N'; // antivirus, minibus
    if (/\w[-']\w/.test(word)) return 'N'; // spin-off, o'brien
    return '*';
  }

  function removeFinalS(word) {
    // cities -> city, simplifies -> simplify
    if (/ies$/.test(word)) return word.replace(/ies$/, 'y');
    // intentions -> intention, princesses -> princess
    return word.replace(/e?s$/, '');
  }

  function fromExceptions(word) {
    if (/^(must|can|will|may|might|would|could|should|shall)$/.test(word)) return 'MODAL';
    if (/^(so|no|not|more|most|less|all|very)$/.test(word)) return 'ADV';
    if (/^(good|bad|nice|lame)$/.test(word)) return 'ADJ';
    if (/^(an|the|this|that|those|these)$/.test(word)) return 'D';
    if (/^(us|me|him|her|it|they|boy|toy|she|joy)$/.test(word)) return 'N';
    if (/^(be|am|are|is|was|were|do|does|did|have|has|had)$/.test(word)) return 'V';
    if (/^(see|say|love|like|learn|know|talk)s?$/.test(word)) return 'V';
    return '*';
  }

  const word = (input || '').trim();

  let guess = fromExceptions(word);
  if (guess !== '*') return guess;

  if (word.length < 3) return '*';

  guess = guessPOSFromSuffix(word);
  if (guess !== '*') return guess;

  guess = guessPOSFromSuffix(removeFinalS(word));
  if (guess === 'N' || guess === 'V') return guess;

  guess = guessPOSFromPrefix(word);
  if (guess !== '*') return guess;

  return '*';
};

module.exports = guessPOS;
