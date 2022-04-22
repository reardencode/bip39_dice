# BIP39 Dice Word Selection

There have been many ways proposed to generate high quality random seeds,
including cutting out each word and drawing (with replacement) from a hat.

Previously [a method was presented](https://en.bitcoin.se/articles/create-your-own-wallet-seed-using-regular-dice)
for creating seeds directly from the rolls of D6s.

Here I provide tables for generating seed words directly from the rolls of
dice where each die has a power of 2 number of faces. Using this method, the
numeric value of the words in the BIP39 wordlist correspond to the binary
values produced by the dice. Eg. a 1d8+2d16 roll of 1-1-1 has bit value `000
0000 0000`, which corresponds to word 1 `abandon`. A roll of 8-16-16 has bit
value `111 1111 1111` which corresponds to word 2048 `zoo`. These translations
are a bit odd due to base1-&gt;base0-&gt;base1 conversion, but hopefully it
makes sense.

Because BIP39 mnemonics include a checksum, 12 or 24 words picked in this
fashion are not directly usable as a seed. You can use a 
[SeedSigner](https://github.com/SeedSigner/seedsigner/) to calculate a correct
last word. In SeedSigner < 0.5.1 you can use 11 or 23 words, and the device
generates a last word (this givs 121 or 253 bits of entropy instead of 128 or
256). 0.5.1 is expected to introduce ways to correct a last word, or to pick
the last few bits of entropy using coin flips. There is also a [downloadable
HTML tool](https://github.com/bitaps-com/mnemonic-offline-tool) that can
accept 12 or 24 words with an invalid checksum and correct the last word. MAKE
SURE YOU ONLY USE IT ON AN OFFLINE COMPUTER!

## Dice and randomness

We'd all like to think that whatever dice we're playing D&D with are
completely fair. In reality many dice have bias. Before using any of the
templates provided here, you _should_ analyze your own dice to your own
satisfaction for fairness.

See [chisq.py](./chisq.py)[^1] for a program that takes a file of die rolls (1
or more whitespace separate rolls per line) and calculates whether it's likely
that a fair die would produce those rolls.  When using this method, at least
`n-faces * 10` rolls should be used. The more you roll, the better the chance
of correctly detecting bias. ~95% of biased dice should be detected at
`n-faces * 10`. The default threshold is set to pass 80% of fair dice, so
don't be surprised if a die fails. Add more rolls, and if it doesn't start
passing by `n-faces * 100` it's probably actually biased.

As always, DYOR!

## Printable Look-up Tables

These tables can each be printed on either 2 sheets or one double sided sheet.
I recommend laminating them for easy handling.

### [3d16 or 1d8 + 2d16](./Dice%20Seed%20Words%20-%203d16.pdf)

This table allows selecting 1 word for every 3 dice rolled, which is quite
labor efficient. It does, however, require the use of d16s, which are not
common. When used with 3 d16, the highest bit of the first d16 in each word is
dropped. 3d16 produce 12 bits of entropy, and only 11 are used in each word.

### [1d4 + 3d8 or 4d8](./Dice%20Seed%20Words%20-%204d8.pdf)

This table allows selecting 1 word for every 4 dice rolled, using only
common RPG dice. When used with 4d8, the highest bit of the first d8 is
dropped. 4d8 produce 12 bits of entropy, and only 11 are used in each word.

### [1d8 + 4d4](./Dice%20Seed%20Words%20-%201d8%204d4.pdf)

This table allows selecting 1 word for every 5 dice rolled, using only
common RPG dice.

### [6d4 or 1coin + 5d4](./Dice%20Seed%20Words%20-%206d4.pdf)

This table allows selecting 1 word for 6 dice rolled, using only common RPG
dice. When used with 6d4, the highest bit of the first d4 is dropped. 6d4
produce 12 bits of entropy, and only 11 are used in each word.

## How were these made?

These were made using a [Google Sheet](https://docs.google.com/spreadsheets/d/1eADB_KVPwy1zvC3TRfMsNVTWb4hQr_LlGjN3MOzpHRs).
A [NodeJS script](./words.js)[^2] was used to generate the CSVs of words.
Headings and formatting were added using Google Sheets for printing.

[^1]: `pip install scipy` then `python chisq.py -h`
[^2]: `npm i bip39` then `node words.js`
