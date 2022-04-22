const bip39 = require('bip39');
const fs = require('fs');
const words = bip39.wordlists.english;

function *gen_half_page_row(row) {
  for (let j = 0; j < 16; j++) {
    let box = row >> 6;
    box <<= 1;
    box += j < 8 ? 0 : 1;
    const col = j & 7;
    const box_row = row % 64;
    yield (box << 9) + (box_row << 3) + col;
  }
}

function *gen_row(row) {
  for (let col = 0; col < 16; col++) yield (row << 4) + col
}

function *to_words(index_gen) {
  for (index of index_gen) yield words[index];
}

function *make_rows(row_fn) {
  for (let row = 0; row < 128; row++)
    yield [...to_words(row_fn(row))].join(',');
}

function write_file(name, row_fn) {
  fs.writeFileSync(name, [...make_rows(row_fn)].join('\n'));
}

write_file('half_page_rows.csv', gen_half_page_row);
write_file('full_page_rows.csv', gen_row);
