/**
 * Adds extended special ability dependencies if the passed entry is a style
 * special ability or adds the passed special ability's ID to a free slot of a
 * style dependency if it is an extended special ability.
 */
let addAllStyleRelatedDependencies:
  (Static.SpecialAbility.t, Hero.t) => Hero.t;

/**
 * Removes extended special ability dependencies if the passed entry is a
 * style special ability or removes the passed special ability's ID from a
 * used slot of a style dependency if it is an extended special ability.
 */
let removeAllStyleRelatedDependencies:
  (Static.SpecialAbility.t, Hero.t) => Hero.t;

/**
 * Calculates a list of available Extended Special Abilties. The availability is
 * only based on bought Style Special Abilities, so (other) prerequisites have
 * to be checked separately.
 */
let getAllAvailableExtendedSpecialAbilities:
  list(list(Hero.styleDependency)) => list(int);

/**
 * Checks if the passed special ability is a style and if it is valid to
 * remove based on registered active extended special abilities.
 */
let isStyleValidToRemove: (Hero.t, Static.SpecialAbility.t) => bool;