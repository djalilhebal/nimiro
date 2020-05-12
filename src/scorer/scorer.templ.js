const matchTemplate = require('../templateMatcher.js');

function scoreByTemplates(words, tags) {
  const templates = [
    'be #adj',              // 'be happy'
    '#adv #adj',            // 'hopelessly hopeful'
    '#adv? #adj and #adj',  // 'very stylish and classy'
    'such #adj #N',      // 'such interesting alibi'
    '#adv? #V #N',    // 'always utilize Android'
    'what #D #adj #N',  // 'what an amazing man'
    '#D? #adv? #adj #N', // 'an awfully dirty place'
    '#D? #adj? #N #modal? #V #N?', // 'any calamity can darken kingdoms'
    '#D? #adj? #N and #D? #adj? #N', // 'handsome man and pretty woman'
  ];
  
  if (templates.some(t => matchTemplate(words, tags, `so? still? ${t}`)))
    return 1;
  else
    return 0;
}

module.exports = scoreByTemplates;
