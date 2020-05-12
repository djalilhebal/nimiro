function myMetaphone(input) {
  const E_I = ['ES', 'EP', 'EB', 'EL', 'EY', 'IB', 'IL', 'IN', 'IE', 'EI', 'ER'];
  const result = [];
  let i, str, slavoGermanic;

  function encode() {
    while (i < str.length) {
      switch (str[i]) {
        case 'B':
          result.push('B');
          i += str[i + 1] === 'B' ? 2 : 1;
          break;

        case '\u00C7': // Ç
          result.push('S');
          i += 1;
          break;

        case 'C':
          handleC();
          break;

        case 'D':
          handleD();
          break;

        case 'F':
          result.push('F');
          i += str[i + 1] === 'F' ? 2 : 1;
          break;

        case 'G':
          handleG();
          break;

        case 'J': // used to handle Spanish words: "San Jose" => "San Hoze"
          result.push('J');
          i += str[i + 1] === 'J' ? 2 : 1;
          break;

        case 'K':
          result.push('K');
          i += str[i + 1] === 'K' ? 2 : 1;
          break;

        case 'L':
          result.push('L');
          i += str[i + 1] === 'L' ? 2 : 1;
          break;

        case 'M':
          result.push('M');
          i += conditionM0() ? 2 : 1;
          break;

        case 'N':
          result.push('N');
          i += str[i + 1] === 'N' ? 2 : 1;
          break;

        case '\u00D1':
        // N with a tilde
          result.push('N');
          i += 1;
          break;

        case 'P':
          if (str[i + 1] === 'H') {
            result.push('F');
            i += 2;
          } else {
            result.push('P');
            i += str[i + 1] === 'P' ? 2 : 1;
          }
          break;

        case 'Q':
          result.push('K');
          i += str[i + 1] === 'Q' ? 2 : 1;
          break;

        case 'R':
          result.push('R');
          i += str[i + 1] === 'R' ? 2 : 1;
          break;

        case 'S':
          handleS();
          break;

        case 'T':
          handleT();
          break;

        case 'V':
          result.push('V');
          i += str[i + 1] === 'V' ? 2 : 1;
          break;

        case 'X':
          handleX();
          break;

        case 'Z':
          result.push('S');
          i += str[i + 1] === 'Z' ? 2 : 1;
          break;

        default: // AEIOUY H W
          i += 1;
          break;
      }
    }

    return result;
  }

  // BEGIN HANDLERS

  function handleC() {
    if (conditionC0()) {
      result.push('K');
      i += 2;
    } else if (str[i + 1] === 'H') {
      handleCH();
    } else if (str[i + 1] === 'Z' && !sub(i - 2, 4, 'WICZ')) {
      // 'Czerny'
      result.push('S');
      i += 2;
    } else if (str[i + 1] === 'C' && !(i === 1 && str[0] === 'M')) {
      // double 'CC' but not 'McClelland'
      handleCC();
    } else if (sub(i, 2, ['CK', 'CG', 'CQ'])) { // 'suck'
      result.push('K');
      i += 2;
    } else if (sub(i, 2, ['CI', 'CE', 'CY'])) {
      if (sub(i, 3, ['CIO', 'CIE', 'CIA'])) {
        result.push('X');
      } else {
        result.push('S');
      }
      i += 2;
    } else {
      result.push('K');
      if (sub(i + 1, 2, [' C', ' Q', ' G'])) {
        // Mac Caffrey, Mac Gregor
        i += 3;
      } else if (sub(i + 1, 1, ['C', 'K', 'Q']) && !sub(i + 1, 2, ['CE', 'CI'])) {
        i += 2;
      } else {
        i += 1;
      }
    }
  }

  function conditionC0() {
    if (sub(i, 4, 'CHIA')) {
      return true;
    } else if (i <= 1) {
      return false;
    } else if (isVowel(str[i - 2])) {
      return false;
    } else if (!sub(i - 1, 3, 'ACH')) {
      return false;
    }
    return (str[i + 2] !== 'I' && str[i + 2] !== 'E') || sub(i - 2, 6, 'BACHER', 'MACHER');
  }

  function handleCC() {
    if (sub(i + 2, 1, ['I', 'E', 'H']) && !sub(i + 2, 2, 'HU')) {
      // 'bellocchio' but not 'bacchus'
      if ((i === 1 && str[i - 1] === 'A') ||
        sub(i - 1, 5, ['UCCEE', 'UCCES'])) {
        result.push('KS'); // 'accident', 'accede', 'succeed'
      } else {
        result.push('X'); // 'bacci', 'bertucci', other Italian
      }
      i += 3;
    } else { // Pierce's rule
      result.push('K');
      i += 2;
    }
  }

  function handleCH() {
    if (i + 2 < str.length && (conditionCH0() || conditionCH1())) {
      result.push('K'); // 'chemistry', 'chorus'
    } else {
      result.push('X');
    }
    i += 2;
  }

  function conditionCH0() {
    if (i !== 0) {
      return false;
    } else if (!sub(i + 1, 5, ['HARAC', 'HARIS']) &&
           !sub(i + 1, 3, ['HOR', 'HYM', 'HIA', 'HEM'])) {
      return false;
    } else if (sub(0, 5, 'CHORE')) {
      return false;
    }
    return true;
  }

  function conditionCH1() {
    return (sub(0, 3, 'SCH') || // 'school'
        sub(i - 2, 6, ['ORCHES', 'ARCHIT', 'ORCHID']) ||
        sub(i + 2, 1, ['T', 'S']) ||
        ((sub(i - 1, 1, 'AOUE'.split('')) || i === 0) &&
         (sub(i + 2, 1, 'LRNMBHFVW '.split('')) || i + 1 === str.length - 1)));
  }

  function handleD() {
    if (str[i + 1] === 'G' && sub(i + 2, 1, ['I', 'E', 'Y'])) {
      result.push('J'); // 'edge'
      i += 3;
    } else {
      result.push('D');
      i += str[i + 1] === 'D' ? 2 : 1;
    }
  }

  function handleG() {
    if (str[i + 1] === 'H') {
      handleGH(i);
    } else if (str[i + 1] === 'N') {
      if (i === 1 && isVowel(str[0]) && !slavoGermanic) {
        result.push('GN');
      } else if (!sub(i + 2, 2, 'EY') && str[i + 1] !== 'Y' && !slavoGermanic) {
        result.push('N');
      } else {
        result.push('GN');
      }
      i += 2;
    } else if (i === 0 && (str[i + 1] === 'Y' || sub(i + 1, 2, E_I))) {
      // -ges-, -gep-, -gel-, -gie- at beginning
      result.push('G');
      i += 2;
    } else if ((sub(i + 1, 2, 'ER') ||
          str[i + 1] === 'Y') && !sub(0, 6, ['DANGER', 'RANGER', 'MANGER']) &&
           !sub(i - 1, 1, ['E', 'I']) && !sub(i - 1, 3, ['RGY', 'OGY'])) {
      // -ger-, -gy-
      result.push('G');
      i += 2;
    } else if (sub(i + 1, 1, ['E', 'I', 'Y']) || sub(i - 1, 4, ['AGGI', 'OGGI'])) {
      result.push('J');
      i += 2;
    } else {
      result.push('G');
      i += str[i + 1] === 'G' ? 2 : 1;
    }
  }

  function handleGH() {
    if (i > 0 && !isVowel(str[i - 1])) {
      result.push('G');
      i += 2;
    } else if (i === 0) {
      if (str[i + 2] === 'I') {
        result.push('J');
      } else {
        result.push('G');
      }
      i += 2;
    } else if ((i > 1 && sub(i - 2, 1, 'BHD'.split(''))) ||
           (i > 2 && sub(i - 3, 1, 'BHD'.split(''))) ||
           (i > 3 && sub(i - 4, 1, ['B', 'H']))) {
      // Parker's rule (with some further refinements) - 'hugh'
      i += 2;
    } else {
      if (i > 2 && str[i - 1] === 'U' && sub(i - 3, 1, 'CGLRT'.split(''))) {
        // 'laugh', 'cough', 'gough', 'rough', 'tough'
        result.push('F');
      } else if (i > 0 && str[i - 1] !== 'I') {
        result.push('G');
      }
      i += 2;
    }
  }

  function handleS() {
    if (sub(i - 1, 3, ['ISL', 'YSL'])) {
      // special cases 'island', 'isle', 'carlisle', 'carlysle'
      i += 1;
    } else if (sub(i, 2, 'SH')) {
      result.push('X');
      i += 2;
    } else if (sub(i, 3, ['SIO', 'SIA']) || sub(i, 4, 'SIAN')) {
      // Italian and Armenian
      result.push('S');
      i += 3;
    } else if ((i === 0 && sub(i + 1, 1, 'MNLW'.split(''))) || str[i + 1] === 'Z') {
      // german & anglicisations, e.g. 'smith' match 'schmidt'
      result.push('S');
      i += str[i + 1] === 'Z' ? 2 : 1;
    } else if (sub(i, 2, 'SC')) {
      handleSC(i);
    } else {
      result.push('S');
      i += (str[i + 1] === 'Z' || str[i + 1] === 'S') ? 2 : 1;
    }
  }

  function handleSC() {
    if (str[i + 2] === 'H') {
      // Schlesinger's rule
      if (sub(i + 3, 2, ['OO', 'ER', 'EN', 'UY', 'ED', 'EM'])) {
        // Dutch origin, e.g. 'school', 'schooner'
        if (sub(i + 3, 2, ['ER', 'EN'])) {
          // 'schermerhorn', 'schenker'
          result.push('X');
        } else {
          result.push('SK');
        }
      } else if (i === 0 && !isVowel(str[i + 3]) && str[i + 3] !== 'W') {
        result.push('X');
      }
    } else if (sub(i + 2, 1, ['I', 'E', 'Y'])) {
      result.push('S');
    } else {
      result.push('SK');
    }
    i += 3;
  }

  function handleT() {
    if (sub(i, 4, 'TION') || sub(i, 3, ['TIA', 'TCH'])) {
      result.push('X');
      i += 3;
    } else if (str[i + 1] === 'H') { // 'faith'
      result.push('T');
      i += 2;
    } else {
      result.push('T');
      i += str[i + 1] === 'T' ? 2 : 1;
    }
  }

  function handleX() {
    if (i === 0) {
      result.push('S');
      i += 1;
    } else {
      if (!((i === str.length - 1) && (sub(i - 3, 3, 'IAU', 'EAU') ||
           sub(i - 2, 2, 'AU', 'OU')))) {
        // French e.g. breaux
        result.push('KS');
      }
      i += (str[i + 1] === 'C' || str[i + 1] === 'X') ? 2 : 1;
    }
  }

  // BEGIN COMPLEX CONDITIONS

  function conditionL0() {
    if (i === str.length - 3 && sub(i - 1, 4, ['ILLO', 'ILLA', 'ALLE'])) {
      return true;
    } else if ((sub(str.length - 2, 2, ['AS', 'OS']) ||
          sub(str.length - 1, 1, ['A', 'O'])) && sub(i - 1, 4, 'ALLE')) {
      return true;
    }
    return false;
  }

  function conditionM0() {
    if (str[i + 1] === 'M') return true;
    return sub(i - 1, 3, 'UMB') && (i + 2 === str.length || sub(i + 2, 2, 'ER'));
  }

  // BEGIN HELPER FUNCTIONS

  function isSlavoGermanic() {
    return ['W', 'K', 'CZ', 'WITZ'].some(x => str.includes(x));
  }

  function isVowel(c) {
    return 'AEIOUY'.indexOf(c) !== -1;
  }

  function isSilentStart() {
    return ['GN', 'KN', 'PN', 'WR', 'PS'].some(start => str.startsWith(start));
  }

  function sub(start, len, parts) {
    if (start >= 0 && start + len <= str.length) {
      const target = str.substring(start, start + len);
      if (typeof parts === 'string') return target === parts;
      return parts.some(part => part === target);
    }
    return false;
  }

  str = (input || '').toUpperCase().trim();
  if (!str) return '';

  slavoGermanic = isSlavoGermanic();
  i = isSilentStart() ? 1 : 0;
  return encode().join('');
}

module.exports = myMetaphone;
