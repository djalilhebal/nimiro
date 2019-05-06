# Nimiro::Pronouncer

Uses CMUDict and falls back to MyMetaphone

## MyMetaphone

Similar to DoubleMetaphone, except:
- No vowel (including 'H') is preserved, not even at the beginning of words.
- Voiced/unvoiced consonant pairs (e.g. 'b' and 'p') are treated as different sounds.
- 0 is treated as 'T'.
- No fixed size.
- Only the primary approximate pronounciation is returned.
