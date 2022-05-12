
export function paginate(array, pageSize, pageNumber) {
// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export function colorPokemon(typepkmn){
  if(typepkmn === 'grass' || typepkmn === 'Grass'){return('#74cb48')}
  if(typepkmn === 'fire' || typepkmn === 'Fire'){return('#F57D31')}
  if(typepkmn === 'water' || typepkmn === 'Water'){return('#6493EB')}
  if(typepkmn === 'bug' || typepkmn === 'Bug'){return('#A7B723')}
  if(typepkmn === 'normal' || typepkmn === 'Normal'){return('#AAA67F')}
  if(typepkmn === 'poison' || typepkmn === 'Poison'){return('#a43e9e')}
  if(typepkmn === 'electric' || typepkmn === 'Electric'){return('#f9cf30')}
  if(typepkmn === 'ground' || typepkmn === 'Ground'){return('#dec16b')}
  if(typepkmn === 'ghost' || typepkmn === 'Ghost'){return('#70559b')}
  if(typepkmn === 'fighting' || typepkmn === 'Fighting'){return('#c12239')}
  if(typepkmn === 'psychic' || typepkmn === 'Psychic'){return('#fb5584')}
  if(typepkmn === 'rock' || typepkmn === 'Rock'){return('#B69e31')}
  if(typepkmn === 'ice' || typepkmn === 'Ice'){return('#9ad6df')}
  if(typepkmn === 'dragon' || typepkmn === 'Dragon'){return('#7037ff')}
  if(typepkmn === 'flying' || typepkmn === 'Flying'){return('#A891EC')}
  if(typepkmn === 'fairy' || typepkmn === 'Fairy'){return('#e69eac')}
  if(typepkmn === 'dark' || typepkmn === 'Dark'){return('#666666')}
  if(typepkmn === 'steel' || typepkmn === 'Steel'){return('#b7b9d0')}
}

export function getPkmnGen(idgen){
  let tempLimite = ''
  if(idgen === '1'){tempLimite = 'limit=151'}
  if(idgen === '2'){tempLimite = 'limit=100&offset=151'}
  if(idgen === '3'){tempLimite = 'limit=135&offset=251'}
  if(idgen === '4'){tempLimite = 'limit=107&offset=386'}
  if(idgen === '5'){tempLimite = 'limit=155&offset=494'}
  if(idgen === '6'){tempLimite = 'limit=72&offset=649'}
  if(idgen === '7'){tempLimite = 'limit=88&offset=721'}
  if(idgen === '8'){tempLimite = 'limit=89&offset=809'}

  return tempLimite
}

export function setZero(numberpkmn){
  if(numberpkmn < 10){return `#00${numberpkmn}`;}
  if(numberpkmn > 9 && numberpkmn < 100){return `#0${numberpkmn}`;}
  if(numberpkmn > 99){return `#${numberpkmn}`;}
}

export function capitalizeFirst(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function editDesc(strBase){
  var newDesc = strBase.replace('\f', ' ');
  newDesc = newDesc.replace('\f', ' ');
  newDesc = newDesc.replace('\n', ' ');
  newDesc = newDesc.replace('\n', ' ');
  newDesc = newDesc.replace('\n', ' ');
  newDesc = newDesc.replace('\n', ' ');
    return (newDesc);
  }
