
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
